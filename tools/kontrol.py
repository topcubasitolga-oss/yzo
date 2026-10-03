#!/usr/bin/env python3
"""Site kalite kontrolü: kırık bağlantı taraması + tarayıcıda ekran görüntüsü ve etkileşim denemesi.
Çalıştır: python3 tools/kontrol.py   (docs/ derlenmiş olmalı)
Çıktı: tools/ekran/ altına PNG'ler; konsol hataları ve kırık bağlantılar raporlanır."""
import asyncio, http.server, os, re, sys, threading, functools
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
DOCS = KOK / "docs"
CIKTI = KOK / "tools" / "ekran"
CIKTI.mkdir(parents=True, exist_ok=True)

# 1) Bağlantı taraması
hatalar = []
for html in DOCS.rglob("*.html"):
    metin = html.read_text(encoding="utf-8")
    for m in re.finditer(r'(?:href|src)="([^"]+)"', metin):
        u = m.group(1)
        if u.startswith(("http", "mailto:", "#", "data:")):
            continue
        u = u.split("#")[0]
        if not u:
            continue
        hedef = (html.parent / u).resolve()
        if not hedef.exists():
            hatalar.append(f"{html.relative_to(DOCS)} → {u}")
print(f"Bağlantı taraması: {len(hatalar)} kırık")
for hta in hatalar:
    print("  KIRIK", hta)

# 2) Tarayıcı
PORT = 8765
def sunucu():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(DOCS))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    httpd.serve_forever()
threading.Thread(target=sunucu, daemon=True).start()

async def main():
    from playwright.async_api import async_playwright
    konsol = []
    async with async_playwright() as p:
        b = await p.chromium.launch()
        async def sayfa(genislik, yukseklik=900):
            ctx = await b.new_context(viewport={"width": genislik, "height": yukseklik}, device_scale_factor=1, locale="tr-TR")
            pg = await ctx.new_page()
            pg.on("console", lambda m: konsol.append(f"[{m.type}] {m.text}") if m.type in ("error", "warning") else None)
            pg.on("pageerror", lambda e: konsol.append(f"[pageerror] {e}"))
            return ctx, pg

        hedefler = [
            ("index.html", "ana"),
            ("bant/i1/index.html", "bant-i1"),
            ("e/i1-2-1/index.html", "etkinlik-i1-2-1"),
            ("e/oo-2-1/index.html", "etkinlik-oo-2-1-yakinda"),
            ("k/oo-1-1/index.html", "kagit-oo-1-1"),
            ("k/i2-5-1/index.html", "kagit-i2-5-1"),
            ("ogretmen/index.html", "ogretmen"),
            ("arastirma/index.html", "arastirma"),
        ]
        for genislik, etiket in ((390, "mobil"), (1280, "masaustu")):
            ctx, pg = await sayfa(genislik)
            for yol, ad in hedefler:
                await pg.goto(f"http://127.0.0.1:{PORT}/{yol}", wait_until="networkidle")
                await pg.screenshot(path=str(CIKTI / f"{ad}-{etiket}.png"), full_page=True)
            await ctx.close()

        # Etkileşim denemeleri (masaüstü)
        ctx, pg = await sayfa(1100, 800)
        # oo-1-1: 8 kartı oyna
        await pg.goto(f"http://127.0.0.1:{PORT}/e/oo-1-1/ekran.html", wait_until="networkidle")
        for i in range(8):
            await pg.click(".oyun .secimler .secim >> nth=0")
            await pg.click(".oyun .alt-dugmeler .secim")
        sonuc = await pg.text_content(".oyun .sonuc .buyuk")
        print("oo-1-1 sonuç:", sonuc)
        await pg.screenshot(path=str(CIKTI / "oyun-oo-1-1-sonuc.png"))
        await pg.goto(f"http://127.0.0.1:{PORT}/e/oo-1-1/ekran.html", wait_until="networkidle")
        await pg.click(".oyun .secimler .secim >> nth=0")
        await pg.screenshot(path=str(CIKTI / "oyun-oo-1-1-kart.png"))

        # i1-2-1: 2 örnekle sına, sonra 8 örnekle sına
        await pg.goto(f"http://127.0.0.1:{PORT}/e/i1-2-1/ekran.html", wait_until="networkidle")
        async def ogret(cesit, etiket):
            await pg.click(f".oyun .tezgah .meyve >> nth={cesit}")
            await pg.click(".oyun .etiketler .secim >> nth={}".format(0 if etiket == "elma" else 1))
        await ogret(0, "elma"); await ogret(2, "armut")
        await pg.screenshot(path=str(CIKTI / "oyun-i1-2-1-ogret.png"))
        await pg.click("text=Robot'u sına")
        s1 = await pg.text_content(".oyun .sonuc .buyuk"); y1 = await pg.text_content(".oyun .sonuc p")
        print("i1-2-1 2 örnek:", s1, "|", y1)
        await pg.screenshot(path=str(CIKTI / "oyun-i1-2-1-sinav1.png"))
        await pg.click("text=Daha çok öğret")
        for c, e in ((0, "elma"), (1, "elma"), (1, "elma"), (2, "armut"), (3, "armut"), (3, "armut"), (1, "elma"), (0, "elma")):
            await ogret(c, e)
        await pg.click("text=Robot'u sına")
        s2 = await pg.text_content(".oyun .sonuc .buyuk"); y2 = await pg.text_content(".oyun .sonuc p")
        print("i1-2-1 10 örnek:", s2, "|", y2)
        await pg.screenshot(path=str(CIKTI / "oyun-i1-2-1-sinav2.png"))

        # i1-3-1: 6 kart
        await pg.goto(f"http://127.0.0.1:{PORT}/e/i1-3-1/ekran.html", wait_until="networkidle")
        for i in range(6):
            await pg.click(".oyun .secimler .secim >> nth=0")
            if i == 0:
                await pg.screenshot(path=str(CIKTI / "oyun-i1-3-1-kart.png"))
            await pg.click(".oyun .alt-dugmeler .secim")
        print("i1-3-1 sonuç:", await pg.text_content(".oyun .sonuc .buyuk"))

        # bant sekmesi süzme
        await pg.goto(f"http://127.0.0.1:{PORT}/bant/i2/index.html#dunya-4", wait_until="networkidle")
        gorunen = await pg.eval_on_selector_all("#etkinlik-listesi .satir:not(.gizli)", "els => els.length")
        print("bant i2 dünya 4 süzme → görünen satır:", gorunen)
        await ctx.close()
        await b.close()
    print(f"Konsol uyarı/hata: {len(konsol)}")
    for k in konsol[:20]:
        print("  ", k)

asyncio.run(main())
