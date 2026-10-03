// Ortak yardımcılar: kaçış, Robot simgesi, dünya simgeleri, sayfa iskeleti.
'use strict';

const h = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Özgün, basit bir Robot başı. Marka kararı verilince değiştirilecek.
function robotSvg(sinif = '', boyut = 64) {
  return `<svg class="${h(sinif)}" width="${boyut}" height="${boyut}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <line x1="32" y1="6" x2="32" y2="14" stroke="#1F2A48" stroke-width="3" stroke-linecap="round"/>
  <circle cx="32" cy="6" r="4" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>
  <rect x="10" y="14" width="44" height="40" rx="14" fill="#FFFFFF" stroke="#1F2A48" stroke-width="3"/>
  <rect x="4" y="28" width="6" height="12" rx="3" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>
  <rect x="54" y="28" width="6" height="12" rx="3" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>
  <circle cx="23" cy="31" r="5" fill="#1F2A48"/>
  <circle cx="41" cy="31" r="5" fill="#1F2A48"/>
  <circle cx="24.5" cy="29.5" r="1.6" fill="#FFFFFF"/>
  <circle cx="42.5" cy="29.5" r="1.6" fill="#FFFFFF"/>
  <circle cx="17" cy="40" r="3" fill="#FADFE4"/>
  <circle cx="47" cy="40" r="3" fill="#FADFE4"/>
  <path d="M24 42 Q32 49 40 42" fill="none" stroke="#1F2A48" stroke-width="3" stroke-linecap="round"/>
</svg>`;
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
<script src="${kok}assets/site.js"></script>
${ekSon}
</body>
</html>
`;
}

module.exports = { h, robotSvg, dunyaSimge, iskelet, FONTLAR };
