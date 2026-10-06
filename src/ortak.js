// Ortak yardımcılar: kaçış, ARF simgesi, dünya simgeleri, sayfa iskeleti.
'use strict';

const h = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ARF = require('../assets/arf.js');
// Sitedeki karakter: Kapsül ARF. robotSvg adı geriye uyum için korunuyor.
function robotSvg(sinif = '', boyut = 64, ruh = 'merakli') {
  return ARF.svg(ruh, { boy: boyut, sinif, defter: boyut >= 70, tebesir: boyut >= 70 });
}

// Dünya simgeleri (emoji değil, çizgi): her dünyanın tek bir sembolü var.
const dunyaSimge = {
  1: '🔍', // Tanı
  2: '🌱', // Nasıl öğrenir
  3: '🧩', // Sınırlar
  4: '🛡️', // Güvenli ve adil
  5: '🎨', // Birlikte üret
};

const FONTLAR = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Andika:ital,wght@0,400;0,700;1,400&display=swap';

function iskelet({ baslik, aciklama = '', kok = '', aktif = '', govde, ekBas = '', ekSon = '', govdeSinif = '', site }) {
  const nav = [
    ['oyunlar', 'Oyunlar', `${kok}oyunlar/index.html`],
    ['atolye', 'ARF Atölyesi', `${kok}atolye/index.html`],
    ['ogretmen', 'Öğretmen köşesi', `${kok}ogretmen/index.html`],
    ['kitap', 'Kitap', `${kok}kitap/index.html`],
    ['arastirma', 'Araştırma', `${kok}arastirma/index.html`],
  ];
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h(baslik)}</title>
<meta name="description" content="${h(aciklama)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTLAR}">
<link rel="stylesheet" href="${kok}assets/site.css">
${ekBas}
</head>
<body class="${h(govdeSinif)}">
<header class="ust">
  <div class="sarmal">
    <a class="marka" href="${kok}index.html">${robotSvg('', 38)}<span>${h(site.ad)}<small>${h(site.altBaslik)}</small></span></a>
    <nav class="gezinti" aria-label="Site">
      ${nav.map(([id, ad, href]) => `<a href="${href}"${aktif === id ? ' aria-current="page"' : ''}>${h(ad)}</a>`).join('\n      ')}
    </nav>
  </div>
</header>
<main class="sarmal">
${govde}
</main>
<footer class="alt">
  <div class="sarmal">
    <p>${h(site.ad)}, sürüm ${h(site.surum)}. Taslak: etkinlikler ve karakter değişebilir.</p>
    <p>${h(site.sahip)}</p>
  </div>
</footer>
<script src="${kok}assets/arf.js"></script>
<script src="${kok}assets/ses.js"></script>
<script src="${kok}assets/site.js"></script>
${ekSon}
</body>
</html>
`;
}

module.exports = { h, robotSvg, dunyaSimge, iskelet, FONTLAR };
