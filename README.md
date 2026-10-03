# YZO Havuzu

Okul öncesi ve ilkokul için yapay zekâ okuryazarlığı etkinlik havuzu. Statik web sitesi; bağımlılık yok.

- **İçerik tek yerde:** `data/etkinlikler.json` (dünyalar, yaş bantları, 15 etkinlik: künye, çalışma kâğıdı, öğretmen notu).
- **Şablonlar:** `src/` (sayfalar, çalışma kâğıdı üreticisi, ortak parçalar).
- **Tasarım ve betikler:** `assets/` (`site.css`, `kagit.css`, `site.js`, `etkilesim/` altında ekran oyunları).
- **Çıktı:** `docs/` (derlenmiş site; GitHub Pages buradan yayınlar).

## Derleme

```bash
node build.js          # data + src + assets → docs/
python3 tools/kontrol.py   # isteğe bağlı: kırık bağlantı taraması, ekran görüntüleri, oyun denemesi
```

`docs/` her derlemede silinip yeniden yazılır; elle düzenlemeyin.

## Yayınlama (GitHub Pages)

Depo ayarları → Pages → "Deploy from a branch" → dal `main`, klasör `/docs`. Birkaç dakika içinde `https://<kullanıcı>.github.io/yzo/` adresinde yayınlanır. Kendi alan adı aynı ekrandan bağlanır.

## Adres şeması

| Sayfa | Yol |
| --- | --- |
| Ana sayfa | `index.html` |
| Yaş bandı | `bant/oo/`, `bant/i1/`, `bant/i2/` |
| Etkinlik | `e/<slug>/` (örn. `e/i1-2-1/`) |
| Tam ekran oyun | `e/<slug>/ekran.html` (yalnız ekranı hazır olanlar) |
| Çalışma kâğıdı (A4, yazdırılabilir) | `k/<slug>/` |
| Öğretmen köşesi, Kitap, Araştırma | `ogretmen/`, `kitap/`, `arastirma/` |

Etkinlik kodu `YZO-<bant>-<dünya>.<sıra>` (örn. `YZO-İ1-2.1`), slug `i1-2-1`. Kitaptaki QR kodu `e/<slug>/` adresine gider.

## Yeni etkinlik ekleme

`data/etkinlikler.json` içindeki `etkinlikler` dizisine bir nesne ekleyin. Zorunlu alanlar:

`kod, slug, bant (oo|i1|i2), dunya (1–5), ad, soru, sure, duzey, ozet, kazanim{cocuk, akademik}, program{ad, alan, cikti}, malzeme[], hazirlik, ekran{durum: hazir|yakinda, modul, aciklama}, kagit{baslik, yonerge, bloklar[]}, not{giris, etkinlik, kapanis, sorular[3], yanilgilar[], degerlendirme, kolay, zor, aile}`

### Çalışma kâğıdı blok tipleri

| tip | alanlar | ne çizer |
| --- | --- | --- |
| `iki-kutu` | `sol{ad,simge}`, `sag{ad,simge}`, `ogeler[{emoji,ad}]` | öğe kartları + iki büyük kutu |
| `cizim` | `baslik` | boş çizim alanı |
| `iki-cizim` | `sol`, `sag` | yan yana iki çizim alanı |
| `kartlar` | `baslik`, `ogeler[{emoji,ad}]` | kesilecek kartlar |
| `sayac` | `baslik`, `adet` | boyanacak daireler |
| `sahneler` | `ogeler[{emoji,ad}]` | hatalı sahne + "doğrusunu çiz" |
| `serit` | `ogeler[{saat,emoji,ad}]` | gün şeridi |
| `satirlar` | `baslik`, `adet` | yazı satırları |
| `tablo` | `basliklar[]`, `satirlar[][]` ya da `satir` (boş satır sayısı) | tablo |
| `isaretle` | `baslik`, `secenekler[]` | kutucuklu liste |
| `secim-metin` | `ogeler[{metin, secenekler[]}]` | metin + daire seçenekler |
| `kanvas` | `kutular[]` | proje kanvası (ilk kutu tam genişlik) |
| `metin` | `icerik` | düz metin |

### Ekran etkileşimi ekleme

1. `assets/etkilesim/<slug>.js` dosyası: `YZO.kaydet('<slug>', function (kutu, Y) { ... })`. `Y.el`, `Y.robot()`, `Y.tohum()`, `Y.karistir()`, `Y.yildizlar()`, `Y.sayili()` yardımcıları `motor.js` içinde.
2. JSON'da `ekran.durum = "hazir"`, `ekran.modul = "<slug>"`.
3. `node build.js`.

Hazır olanlar: `oo-1-1` (sınıflama), `i1-2-1` (eğit ve sına), `i1-3-1` (kart çevir).

## İlkeler

- Çocuk hesabı yok, veri saklanmaz, çerez yok.
- Her etkinlik donanımsız uygulanabilir; ekran zenginleştirir.
- Kâğıtlar A4 ve siyah-beyaz baskıya uygun; okul öncesinde yazı yok.
- Karakter adı ("Robot") yer tutucudur; marka kararıyla değişecek.
- Yazı tipleri: Fredoka (başlık), Andika (metin). Çevrimdışı sürümde kendi sunucudan verilecek.

Sürüm 0.1, taslak. Dr. Tolga Topçubaşı, İstanbul 29 Mayıs Üniversitesi.
