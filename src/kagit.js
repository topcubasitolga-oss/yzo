'use strict';
// Çalışma kâğıdı üreticisi: JSON'daki blok tiplerini A4 HTML'e çevirir.
const { h, robotSvg, FONTLAR } = require('./ortak');

const blokUreticiler = {
  'iki-kutu': (b) => `
<div class="blok">
  <div class="ogeler">${b.ogeler.map(o => `<div class="oge"><span class="resim" aria-hidden="true">${o.emoji}</span>${h(o.ad)}</div>`).join('')}</div>
  <div class="kutular">
    <div class="kutu sol"><div class="kutu-baslik"><span class="simge" aria-hidden="true">${h(b.sol.simge)}</span>${h(b.sol.ad)}</div></div>
    <div class="kutu sag"><div class="kutu-baslik"><span class="simge" aria-hidden="true">${h(b.sag.simge)}</span>${h(b.sag.ad)}</div></div>
  </div>
</div>`,

  'cizim': (b) => `
<div class="blok"><div class="cizim"><span class="etiket">${h(b.baslik)}</span></div></div>`,

  'iki-cizim': (b) => `
<div class="blok"><div class="iki-cizim">
  <div class="cizim"><span class="etiket">${h(b.sol)}</span></div>
  <div class="cizim"><span class="etiket">${h(b.sag)}</span></div>
</div></div>`,

  'kartlar': (b) => `
<div class="blok">
  <h2>${h(b.baslik)}</h2>
  <div class="kartlar">${b.ogeler.map(o => `<div class="kart"><span class="resim" aria-hidden="true">${o.emoji}</span>${h(o.ad)}</div>`).join('')}</div>
  <p class="kes-notu">Kesik çizgiden kes. Kartları Robot'a tek tek göster.</p>
</div>`,

  'sayac': (b) => `
<div class="blok">
  <h2>${h(b.baslik)}</h2>
  <div class="sayac">${'<i></i>'.repeat(b.adet || 10)}</div>
</div>`,

  'sahneler': (b) => `
<div class="blok"><div class="sahneler">${b.ogeler.map(o => `
  <div class="sahne">
    <div class="resimli"><div><span class="resim" aria-hidden="true">${o.emoji}</span>${h(o.ad)}</div></div>
    <div class="cizim-alani">Doğrusunu çiz</div>
  </div>`).join('')}</div></div>`,

  'serit': (b) => `
<div class="blok"><div class="serit">${b.ogeler.map(o => `
  <div class="an"><span class="saat">${h(o.saat)}</span><span class="resim" aria-hidden="true">${o.emoji}</span>${h(o.ad)}</div>`).join('')}</div></div>`,

  'satirlar': (b) => `
<div class="blok satirlar">
  <h2>${h(b.baslik)}</h2>
  ${'<div class="satir"></div>'.repeat(b.adet || 3)}
</div>`,

  'tablo': (b) => {
    const satirlar = b.satirlar || Array.from({ length: b.satir || 4 }, () => b.basliklar.map(() => ''));
    return `
<div class="blok">
  ${b.baslik ? `<h2>${h(b.baslik)}</h2>` : ''}
  <table class="tablo">
    <thead><tr>${b.basliklar.map(x => `<th>${h(x)}</th>`).join('')}</tr></thead>
    <tbody>${satirlar.map(s => `<tr>${s.map(c => `<td class="${c ? '' : 'bos'}">${h(c)}</td>`).join('')}</tr>`).join('')}</tbody>
  </table>
</div>`;
  },

  'isaretle': (b) => `
<div class="blok isaretle">
  <h2>${h(b.baslik)}</h2>
  <ul>${b.secenekler.map(s => `<li>${h(s)}</li>`).join('')}</ul>
</div>`,

  'secim-metin': (b) => `
<div class="blok secim-metin">${b.ogeler.map(o => `
  <div class="madde">
    <div class="metin">${h(o.metin)}</div>
    <div class="secenekler">${o.secenekler.map(s => `<span>${h(s)}</span>`).join('')}</div>
  </div>`).join('')}</div>`,

  'kanvas': (b) => `
<div class="blok"><div class="kanvas">${b.kutular.map(k => `<div class="kutucuk">${h(k)}</div>`).join('')}</div></div>`,

  'metin': (b) => `
<div class="blok metin-blok">${h(b.icerik)}</div>`,
};

function blokUret(b) {
  const f = blokUreticiler[b.tip];
  if (!f) throw new Error(`Bilinmeyen blok tipi: ${b.tip}`);
  return f(b);
}

function kagitSayfasi(veri, e, kok = '../../') {
  const { site, dunyalar } = veri;
  const d = dunyalar.find(x => x.id === e.dunya);
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h(e.kagit.baslik)} (${h(e.kod)}): çalışma kâğıdı</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTLAR}">
<link rel="stylesheet" href="${kok}assets/kagit.css">
</head>
<body>
<div class="arac-cubugu">
  <a href="${kok}e/${e.slug}/index.html">Etkinliğe dön</a>
  <span class="ipucu">Yazdır penceresinden "PDF olarak kaydet" de seçilebilir.</span>
  <button type="button" onclick="window.print()">Yazdır</button>
</div>
<div class="sayfa">
  <div class="kagit-ust">
    ${robotSvg('', 52)}
    <div>
      <h1>${h(e.kagit.baslik)}</h1>
      <div class="kod">${h(e.kod)}, ${h(d.ad)}, ${h(e.ad)}</div>
    </div>
  </div>
  <div class="ad-tarih"><span>Ad:</span><span>Tarih:</span></div>
  <div class="yonerge">${h(e.kagit.yonerge)}</div>
  ${e.kagit.bloklar.map(blokUret).join('\n')}
  <div class="kagit-alt"><span>${h(site.ad)}</span><span>${h(e.kod)}</span></div>
</div>
</body>
</html>
`;
}

module.exports = { kagitSayfasi, blokUret };
