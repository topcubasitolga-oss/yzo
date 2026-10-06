'use strict';
const { h, robotSvg, dunyaSimge, iskelet, FONTLAR } = require('./ortak');

const bantSlug = (e) => e.bant; // oo | i1 | i2
const etkinlikYolu = (kok, e) => `${kok}e/${e.slug}/index.html`;
const kagitYolu = (kok, e) => `${kok}k/${e.slug}/index.html`;
const bantYolu = (kok, b) => `${kok}bant/${b}/index.html`;

function dunyaNoktalari(dunyalar) {
  return `<span class="dunya-noktalar" aria-hidden="true">${dunyalar.map(d => `<i class="d-${d.id}" style="background:var(--dunya)"></i>`).join('')}</span>`;
}

function etkinlikSatiri(kok, e, d) {
  const ekran = e.ekran.durum === 'hazir'
    ? '<li class="cip cip-hazir">Ekran hazır</li>'
    : '<li class="cip cip-yakinda">Ekran yakında</li>';
  return `<li class="satir d-${d.id}" data-dunya="${d.id}">
  <div class="serit" aria-hidden="true"></div>
  <div class="govde">
    <span class="kod">${h(e.kod)}</span>
    <h3><a href="${etkinlikYolu(kok, e)}">${h(e.ad)}</a></h3>
    <span class="soru">${h(e.soru)}</span>
    <p>${h(e.ozet)}</p>
    <ul class="cipler">
      <li class="cip cip-dunya">${h(d.ad)}</li>
      <li class="cip">${h(e.sure)}</li>
      ${ekran}
    </ul>
  </div>
</li>`;
}

/* ---------------- Ana sayfa ---------------- */
function anaSayfa(veri, kok = '') {
  const { site, dunyalar, bantlar, etkinlikler } = veri;
  const say = (b) => etkinlikler.filter(e => e.bant === b).length;
  const govde = `
<section class="giris">
  <div class="giris-dizilim">
    <div>
      <h1>Çocuklar yapay zekâyı oynayarak tanısın.</h1>
      <p class="oncu">Okul öncesi ve ilkokul için hazır etkinlikler: tahtada oynanan kısa bir ekran oyunu, yazdırılacak bir çalışma kâğıdı, bir sayfalık öğretmen notu. Hepsi ücretsiz.</p>
      <p><a class="dugme" href="${kok}oyunlar/index.html">Oyunları aç (${etkinlikler.filter(e => e.ekran.durum === 'hazir').length})</a></p>
    </div>
    <div class="robot-balon">
      ${robotSvg('', 84)}
      <div class="balon">Bana örnek gösterirsen öğrenirim. Ama bazen yanılırım, sen kontrol et!</div>
    </div>
  </div>
  <ul class="bant-kartlar">
    ${bantlar.map(b => `<li><a class="bant-kart" href="${bantYolu(kok, b.id)}">
      <span class="yas">${h(b.yas)}</span>
      <h2>${h(b.ad)}</h2>
      <p>${h(b.aciklama)}</p>
      <span class="say">${say(b.id)} etkinlik, ${dunyalar.length} dünya</span>
      ${dunyaNoktalari(dunyalar)}
    </a></li>`).join('\n    ')}
  </ul>
</section>

<section class="adimlar" aria-labelledby="nasil">
  <h2 id="nasil">Üç dokunuşta derse hazır</h2>
  <ol>
    <li><h3>Yaş bandını seç</h3><p>Okul öncesi, 1–2 ya da 3–4. sınıf. Her bantta aynı beş dünya, farklı derinlikte.</p></li>
    <li><h3>Dünyayı seç</h3><p>Çocuğun sorusuyla adlandırılmış beş konu. Renkli sekmelerden birine dokun.</p></li>
    <li><h3>Etkinliği aç</h3><p>Ekranı tahtada oynat, kâğıdı yazdır, notu bir kez oku. Hazırlık en çok 10 dakika.</p></li>
  </ol>
</section>

<section class="dunyalar-bolum" aria-labelledby="dunyalar">
  <h2 id="dunyalar">Beş dünya, beş çocuk sorusu</h2>
  <p>Her etkinlik bir dünyaya bağlıdır. Dünyalar uluslararası yapay zekâ okuryazarlığı çerçevelerinden türetildi ve çocuğun diline çevrildi.</p>
  <ul class="dunya-kartlar">
    ${dunyalar.map(d => `<li class="dunya-kart d-${d.id}"><span class="soru">${h(d.soru)}</span><span class="ad">${h(d.ad)}</span><p>${h(d.aciklama)}</p></li>`).join('\n    ')}
  </ul>
</section>

<section class="ogretmen-teaser">
  <div>
    <h2>Öğretmen köşesi</h2>
    <p>Bütün çalışma kâğıtları tek listede, yıllık plan taslağı ve materyal ilkeleri. Hesap gerekmez.</p>
  </div>
  <a class="dugme" href="${kok}ogretmen/index.html">Öğretmen köşesine git</a>
</section>`;
  return iskelet({ baslik: `${site.ad}: ${site.altBaslik}`, aciklama: site.altBaslik, kok, aktif: '', govde, site });
}

/* ---------------- Bant sayfası ---------------- */
function bantSayfasi(veri, bant, kok = '../../') {
  const { site, dunyalar, etkinlikler } = veri;
  const liste = etkinlikler.filter(e => e.bant === bant.id);
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>${h(bant.ad)}</p>
<header class="sayfa-baslik">
  <p class="ust-yazi">Yaş bandı</p>
  <h1>${h(bant.ad)} <span style="font-weight:500;color:var(--kursun)">(${h(bant.yas)})</span></h1>
  <p class="oncu">${h(bant.aciklama)}</p>
  <ul class="cipler">
    <li class="cip">Düzey: ${h(bant.duzey)}</li>
    <li class="cip">Süre: ${h(bant.sure)}</li>
    <li class="cip">${liste.length} etkinlik</li>
  </ul>
  ${(veri.yillik || {})[bant.id] ? `<p style="margin-top:14px"><a class="dugme" href="${kok}plan/${bant.id}/index.html">36 haftalık yıllık planı aç</a></p>` : ''}
</header>

<div class="sekmeler" role="tablist" aria-label="Dünya seç">
  <button class="sekme sekme-tumu" role="tab" aria-selected="true" data-dunya="0"><span class="nokta"></span>Tümü</button>
  ${dunyalar.map(d => `<button class="sekme d-${d.id}" role="tab" aria-selected="false" data-dunya="${d.id}"><span class="nokta"></span>${h(d.ad)}</button>`).join('\n  ')}
</div>

<ul class="liste" id="etkinlik-listesi">
  ${liste.map(e => etkinlikSatiri(kok, e, dunyalar.find(d => d.id === e.dunya))).join('\n  ')}
</ul>
<p class="bos-liste" id="bos-liste" hidden>Bu dünyada bu bant için henüz etkinlik yok.</p>`;
  return iskelet({ baslik: `${bant.ad}: ${site.ad}`, aciklama: bant.aciklama, kok, aktif: '', govde, site });
}

/* ---------------- Etkinlik sayfası ---------------- */
function kagitOnizleme(e) {
  const ilk = e.kagit.bloklar[0] || {};
  let ic = '';
  if (ilk.tip === 'iki-kutu') ic = '<div class="mini-satir"></div><div class="mini-satir" style="width:70%"></div><div class="mini-kutular"><div class="mini-kutu"></div><div class="mini-kutu"></div></div>';
  else if (ilk.tip === 'tablo' || ilk.tip === 'serit') ic = '<div class="mini-kutu" style="height:14px"></div><div class="mini-kutu" style="height:14px;margin-top:4px"></div><div class="mini-kutu" style="height:14px;margin-top:4px"></div>';
  else if (ilk.tip === 'kanvas') ic = '<div class="mini-kutu"></div><div class="mini-kutular"><div class="mini-kutu"></div><div class="mini-kutu"></div></div>';
  else if (ilk.tip === 'iki-cizim') ic = '<div class="mini-kutular"><div class="mini-kutu" style="height:70px"></div><div class="mini-kutu" style="height:70px"></div></div>';
  else ic = '<div class="mini-satir"></div><div class="mini-satir" style="width:80%"></div><div class="mini-kutu" style="height:60px"></div>';
  return `<span class="mini-baslik">${h(e.kagit.baslik)}</span>${ic}`;
}

function etkinlikSayfasi(veri, e, kok = '../../') {
  const { site, dunyalar, bantlar, etkinlikler } = veri;
  const d = dunyalar.find(x => x.id === e.dunya);
  const b = bantlar.find(x => x.id === e.bant);
  const sira = etkinlikler.filter(x => x.bant === e.bant);
  const idx = sira.findIndex(x => x.slug === e.slug);
  const onceki = sira[idx - 1], sonraki = sira[idx + 1];
  const hazir = e.ekran.durum === 'hazir';

  const ekranIc = hazir
    ? `<div class="ekran-icerik" data-modul="${h(e.ekran.modul)}"></div>`
    : `<div class="ekran-icerik ekran-yakinda"><div class="buyuk" aria-hidden="true">${dunyaSimge[d.id]}</div><p><strong>Ekran etkileşimi hazırlanıyor.</strong><br>${h(e.ekran.aciklama)}</p><p>Bu etkinlik ekransız da uygulanır: kâğıt ve öğretmen notu yeterlidir.</p></div>`;

  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span><a href="${bantYolu(kok, b.id)}">${h(b.ad)}</a><span>›</span>${h(e.ad)}</p>

<header class="etkinlik-baslik d-${d.id}">
  <div class="renk-bant">
    <span>${h(e.kod)}</span>
    <a href="${bantYolu(kok, b.id)}#dunya-${d.id}">${dunyaSimge[d.id]} ${h(d.ad)}</a>
    <a href="${bantYolu(kok, b.id)}">${h(b.ad)}</a>
  </div>
  <div class="icerik">
    <div>
      <h1>${h(e.ad)}</h1>
      <p class="ozet">${h(e.ozet)}</p>
      <ul class="cipler">
        <li class="cip">${h(e.sure)}</li>
        <li class="cip">${h(b.yas)}</li>
        <li class="cip">Düzey: ${h(e.duzey)}</li>
        <li class="cip">Hazırlık: ${h(e.hazirlik.split(':')[0])}</li>
      </ul>
    </div>
    <div class="robot-balon">
      ${robotSvg('', 72)}
      <div class="balon">${h(e.soru)}</div>
    </div>
  </div>
</header>

<nav class="bolum-nav" aria-label="Etkinlik bölümleri">
  ${e.sunum ? '<a href="#akis">Ders akışı</a><a href="#oyunlar">Oyunlar</a>' : '<a href="#ekran">Ekran</a>'}
  <a href="#kagit">Çalışma kâğıdı</a>
  <a href="#not">Öğretmen notu</a>
  <a href="#kunye">Künye</a>
</nav>

${e.sunum ? akisBolumu(e, d, kok) : ''}
${e.sunum ? '' : `<section class="bolum d-${d.id}" id="ekran" aria-labelledby="ekran-baslik">
  <h2 id="ekran-baslik"><span class="simge" aria-hidden="true">▶</span>Ekran etkileşimi</h2>
  <p class="aciklama">${h(e.ekran.aciklama)} Akıllı tahtada ya da tablette, 3–6 dakika. Hiçbir sonuç saklanmaz.</p>
  <div class="ekran-kutu">
    <div class="ekran-ust"><span>${h(e.ad)}</span>${hazir ? `<a class="dugme dugme-ikincil" href="${kok}e/${e.slug}/ekran.html">Tam ekran aç</a>` : '<span class="cip cip-yakinda">Yakında</span>'}</div>
    ${ekranIc}
  </div>
</section>`}

<section class="bolum d-${d.id}" id="kagit" aria-labelledby="kagit-baslik">
  <h2 id="kagit-baslik"><span class="simge" aria-hidden="true">✎</span>Çalışma kâğıdı</h2>
  <div class="kagit-yan">
    <a class="kagit-onizleme" href="${kagitYolu(kok, e)}" aria-label="Çalışma kâğıdını aç: ${h(e.kagit.baslik)}">${kagitOnizleme(e)}</a>
    <div class="kagit-bilgi">
      <h3>${h(e.kagit.baslik)}</h3>
      <p><strong>Yönerge:</strong> ${h(e.kagit.yonerge)}</p>
      <p>A4, siyah-beyaz baskıya uygun. Tarayıcıdan yazdır ya da PDF olarak kaydet.</p>
      <div class="dugmeler">
        <a class="dugme" href="${kagitYolu(kok, e)}">Kâğıdı aç ve yazdır</a>
      </div>
    </div>
  </div>
</section>

<section class="bolum d-${d.id}" id="not" aria-labelledby="not-baslik">
  <h2 id="not-baslik"><span class="simge" aria-hidden="true">☰</span>Öğretmen notu</h2>
  <div class="not-dizilim">
    <div class="not-kutu tam">
      <h3>Akış (${h(e.sure)})</h3>
      <ol class="akis">
        <li><span class="etiket">Giriş</span><span>${h(e.not.giris)}</span></li>
        <li><span class="etiket">Etkinlik</span><span>${h(e.not.etkinlik)}</span></li>
        <li><span class="etiket">Kapanış</span><span>${h(e.not.kapanis)}</span></li>
      </ol>
    </div>
    <div class="not-kutu">
      <h3>Sorulacak üç soru</h3>
      <ol>${e.not.sorular.map(s => `<li>${h(s)}</li>`).join('')}</ol>
    </div>
    <div class="not-kutu">
      <h3>Sık yanılgılar</h3>
      <ul>${e.not.yanilgilar.map(s => `<li>${h(s)}</li>`).join('')}</ul>
    </div>
    <div class="not-kutu">
      <h3>Değerlendirme</h3>
      <p>${h(e.not.degerlendirme)}</p>
    </div>
    <div class="not-kutu">
      <h3>Farklılaştırma</h3>
      <p><strong>Kolaylaştır:</strong> ${h(e.not.kolay)}</p>
      <p><strong>Zorlaştır:</strong> ${h(e.not.zor)}</p>
    </div>
    <div class="not-kutu aile-notu tam">
      <h3>Aileye not</h3>
      <p>${h(e.not.aile)}</p>
    </div>
  </div>
</section>

<section class="bolum d-${d.id}" id="kunye" aria-labelledby="kunye-baslik">
  <h2 id="kunye-baslik"><span class="simge" aria-hidden="true">#</span>Künye</h2>
  <table class="kunye">
    <tr><th>Kod</th><td>${h(e.kod)}</td></tr>
    <tr><th>Dünya</th><td>${h(d.ad)}: ${h(d.aciklama)}</td></tr>
    <tr><th>Yaş bandı ve düzey</th><td>${h(b.ad)} (${h(b.yas)}), ${h(e.duzey)}</td></tr>
    <tr><th>Kazanım (çocuk dilinde)</th><td>${h(e.kazanim.cocuk)}</td></tr>
    <tr><th>Kazanım (akademik)</th><td>${h(e.kazanim.akademik)}</td></tr>
    <tr><th>Program eşleştirmesi</th><td>${h(e.program.ad)}. ${h(e.program.alan)}${e.program.cikti ? ` Öğrenme çıktısı: ${h(e.program.cikti)}` : ' <em>Öğrenme çıktısı kodu öğretmen tarafından eklenecek.</em>'}</td></tr>
    <tr><th>Malzeme</th><td><ul>${e.malzeme.map(m => `<li>${h(m)}</li>`).join('')}</ul></td></tr>
    <tr><th>Hazırlık</th><td>${h(e.hazirlik)}</td></tr>
  </table>
</section>

<div class="sonraki">
  ${onceki ? `<a class="dugme dugme-ikincil" href="${etkinlikYolu(kok, onceki)}">Önceki: ${h(onceki.ad)}</a>` : ''}
  ${sonraki ? `<a class="dugme dugme-ikincil" href="${etkinlikYolu(kok, sonraki)}">Sonraki: ${h(sonraki.ad)}</a>` : ''}
  <a class="dugme dugme-sade" href="${bantYolu(kok, b.id)}">${h(b.ad)} listesine dön</a>
</div>`;

  const ekSon = (hazir && !e.sunum) ? `<script src="${kok}assets/etkilesim/motor.js"></script>\n<script src="${kok}assets/etkilesim/${h(e.ekran.modul)}.js"></script>` : '';
  return iskelet({ baslik: `${e.ad} (${e.kod}): ${site.ad}`, aciklama: e.ozet, kok, aktif: '', govde, ekSon, site });
}


/* ---------------- Ders akışı (sunum + plan + oyunlar) ---------------- */
const SLAYT_AD = { kapak: 'Giriş', soru: 'Isınma sorusu', konusma: 'ARF anlatıyor', kartlar: 'Kavram kartları', ikili: 'Karşılaştırma', oyun: 'Etkinlik (oyun)', tartisma: 'Tartışma', kagit: 'Çalışma kâğıdı', kapanis: 'Kapanış', rozet: 'Rozet' };
function slaytBasligi(s) { return s.baslik || s.soru || ''; }
function akisBolumu(e, d, kok) {
  const sl = e.sunum.slaytlar;
  return `<section class="bolum d-${d.id}" id="akis" aria-labelledby="akis-baslik">
  <h2 id="akis-baslik"><span class="simge" aria-hidden="true">▶</span>Ders akışı</h2>
  <div class="akis-ust">
    <p class="aciklama">Sunumu akıllı tahtada açın; ${sl.length} slayt, yaklaşık ${h(e.sure)}. Sunumun içinde etkinlik oyunları da var. Öğretmen notunu sunum sırasında <strong>N</strong> tuşuyla ya da alttaki "Öğretmen notu" düğmesiyle açabilirsiniz.</p>
    <a class="dugme dugme-buyuk" href="${kok}e/${e.slug}/sunum.html">Sunumu başlat</a>
  </div>
  <h3>Ders planı</h3>
  <div class="tablo-sarmal">
  <table class="tablo plan-tablo">
    <thead><tr><th>Slayt</th><th>Süre</th><th>Öğretmen ne yapar</th><th>Çocuklar ne yapar</th></tr></thead>
    <tbody>
      ${sl.map((s, i) => `<tr${s.tip === 'oyun' ? ' class="oyun-satir"' : ''}>
        <td><a href="${kok}e/${e.slug}/sunum.html#${i + 1}"><strong>${i + 1}</strong></a><span class="slayt-tur">${h(SLAYT_AD[s.tip] || s.tip)}</span><span class="slayt-ad">${h(slaytBasligi(s))}</span></td>
        <td>${h((s.plan || {}).sure)}</td>
        <td>${h((s.plan || {}).ogretmen)}</td>
        <td>${h((s.plan || {}).cocuk)}</td>
      </tr>`).join('')}
    </tbody>
  </table>
  </div>
</section>

<section class="bolum d-${d.id}" id="oyunlar" aria-labelledby="oyunlar-baslik">
  <h2 id="oyunlar-baslik"><span class="simge" aria-hidden="true">✋</span>Etkinlik oyunları</h2>
  <p class="aciklama">Sunumun içinde de açılırlar. Ayrı açmak için bir karta dokunun; akıllı tahtada tam ekran açılır.</p>
  <ul class="oyun-kartlar">
    ${(e.oyunlar || []).map((o, i) => `<li><a class="oyun-kart d-${d.id}" href="${kok}e/${e.slug}/oyun-${i + 1}.html">
      <span class="ust-serit"><span>Oyun ${i + 1}</span><span>${h(o.tur)}</span></span>
      <span class="oyun-ad">${h(o.ad)}</span>
      <span class="oyun-aciklama">${h(o.aciklama)}</span>
      <span class="oyna">Oyna</span>
    </a></li>`).join('')}
  </ul>
</section>`;
}

function sunumSayfasi(veri, e, kok = '../../') {
  const d = veri.dunyalar.find(x => x.id === e.dunya);
  const moduller = [...new Set(e.sunum.slaytlar.filter(s => s.tip === 'oyun').map(s => s.modul))];
  const json = JSON.stringify({ kod: e.kod, dunya: d.ad, kagitBaslik: e.kagit.baslik, kagitYolu: `${kok}k/${e.slug}/index.html`, slaytlar: e.sunum.slaytlar.map(s => { const { plan, ...r } = s; return { ...r, plan }; }) }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${h(e.ad)}: sunum</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTLAR}">
<link rel="stylesheet" href="${kok}assets/site.css">
<link rel="stylesheet" href="${kok}assets/sunum.css">
</head>
<body class="d-${d.id}">
<div id="sahne"><div id="slayt" class="slayt"></div></div>
<div id="not" role="note"></div>
<div id="cubuk">
  <a href="${kok}e/${e.slug}/index.html">Kapat</a>
  <span class="bosluk"></span>
  <button type="button" id="geri" aria-label="Önceki slayt">◀</button>
  <span id="sayac"></span>
  <button type="button" id="ileri" aria-label="Sonraki slayt">▶</button>
  <span class="bosluk"></span>
  <button type="button" class="ses-dugme" data-ses-dugme>🔊 Ses açık</button>
  <button type="button" id="not-dugme">Öğretmen notu</button>
  <button type="button" id="tam">Tam ekran</button>
</div>
<script type="application/json" id="sunum-veri">${json}</script>
<script src="${kok}assets/arf.js"></script>
<script src="${kok}assets/ses.js"></script>
<script src="${kok}assets/etkilesim/motor.js"></script>
${moduller.map(m => `<script src="${kok}assets/etkilesim/${h(m)}.js"></script>`).join('\n')}
<script src="${kok}assets/sunum.js"></script>
</body>
</html>
`;
}

function oyunSayfasi(veri, e, o, i, kok = '../../') {
  return ekranSayfasi(veri, { ...e, ad: o.ad, ekran: { ...e.ekran, modul: o.modul } }, kok);
}

/* ---------------- Tam ekran sayfası ---------------- */
function ekranSayfasi(veri, e, kok = '../../') {
  const { site } = veri;
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${h(e.ad)}: tam ekran</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Andika:ital,wght@0,400;0,700;1,400&display=swap">
<link rel="stylesheet" href="${kok}assets/site.css">
<style>body{background:#fff}.tam-ust{position:fixed;top:10px;right:10px;z-index:9}.tam-ust a{font-size:.9rem;padding:6px 12px;box-shadow:none}</style>
</head>
<body class="oyun-tam">
<div class="tam-ust"><button type="button" class="dugme dugme-ikincil ses-dugme" data-ses-dugme>🔊 Ses açık</button> <a class="dugme dugme-ikincil" href="${kok}e/${e.slug}/index.html">Etkinliğe dön</a></div>
<div class="ekran-icerik" data-modul="${h(e.ekran.modul)}"></div>
<script src="${kok}assets/arf.js"></script>
<script src="${kok}assets/ses.js"></script>
<script src="${kok}assets/site.js"></script>
<script src="${kok}assets/etkilesim/motor.js"></script>
<script src="${kok}assets/etkilesim/${h(e.ekran.modul)}.js"></script>
</body>
</html>
`;
}

/* ---------------- Oyunlar ---------------- */
function oyunlarSayfasi(veri, kok = '../') {
  const { site, dunyalar, bantlar, etkinlikler } = veri;
  const hazir = etkinlikler.filter(e => e.ekran.durum === 'hazir');
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>Oyunlar</p>
<header class="sayfa-baslik">
  <h1>Oyunlar</h1>
  <p class="oncu">Akıllı tahtada ya da tablette açın, sınıfça oynayın. Bir karta dokunun, oyun tam ekran açılır. Hiçbir sonuç saklanmaz.</p>
</header>
${hazir.filter(e => e.ekran.oneCikan).map(e => `<a class="one-cikan" href="${kok}e/${e.slug}/ekran.html">
  <div>
    <p class="ust-yazi" style="margin:0 0 4px;font-family:var(--f-baslik);font-weight:600;color:var(--kiraz)">Yeni oyun</p>
    <h2>${h(e.ad)}</h2>
    <p>Her turda üç resim, biri yapay zekânın hatalı çizdiği resim. Bozuk yazıyı, fazla parmağı, ters gölgeyi bul. Kolay, orta ve zor seviye.</p>
    <span class="dugme">Oyna</span>
  </div>
  <div class="kucuk-resimler" aria-hidden="true"><span>A</span><span>B</span><span>C</span></div>
</a>`).join('')}
<h2 style="margin-top:36px">Bütün oyunlar</h2>
<ul class="oyun-kartlar">
  ${hazir.filter(e => !e.ekran.oneCikan).map(e => {
    const d = dunyalar.find(x => x.id === e.dunya);
    const b = bantlar.find(x => x.id === e.bant);
    return `<li><a class="oyun-kart d-${d.id}" href="${kok}e/${e.slug}/ekran.html">
      <span class="ust-serit"><span>${dunyaSimge[d.id]} ${h(d.ad)}</span><span>${h(b.yas)}</span></span>
      <span class="oyun-ad">${h(e.ad)}</span>
      <span class="oyun-aciklama">${h(e.ekran.aciklama)}</span>
      <span class="oyna">Oyna</span>
    </a></li>`;
  }).join('\n  ')}
</ul>
<p class="bos-liste" style="margin-top:20px">${etkinlikler.length - hazir.length} etkinliğin oyunu hazırlanıyor. O etkinlikler kâğıt ve öğretmen notuyla ekransız uygulanabilir.</p>`;
  return iskelet({ baslik: `Oyunlar: ${site.ad}`, aciklama: 'Sınıfta akıllı tahtada oynanacak yapay zekâ okuryazarlığı oyunları.', kok, aktif: 'oyunlar', govde, site });
}


/* ---------------- Yıllık plan ---------------- */
function planSayfasi(veri, bant, kok = '../../') {
  const { site, dunyalar, etkinlikler } = veri;
  const haftalar = (veri.yillik || {})[bant.id] || [];
  const durum = (w) => {
    const e = w.slug && etkinlikler.find(x => x.slug === w.slug);
    if (e && e.sunum) return ['hazir', 'Hazır', e];
    if (e) return ['taslak', 'Etkinlik var, sunum hazırlanıyor', e];
    return ['plan', 'Planlanıyor', null];
  };
  const hazirSay = haftalar.filter(w => durum(w)[0] === 'hazir').length;
  const uniteler = dunyalar.map(d => ({ d, h: haftalar.filter(w => w.dunya === d.id) })).filter(u => u.h.length);
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span><a href="${kok}bant/${bant.id}/index.html">${h(bant.ad)}</a><span>›</span>Yıllık plan</p>
<header class="sayfa-baslik">
  <p class="ust-yazi">${h(bant.ad)} · ${h(bant.yas)}</p>
  <h1>Yıllık plan: 36 hafta</h1>
  <p class="oncu">Haftada bir ders, ${h(bant.sure)}. Beş ünite; her ünite dersler ve bir meydan okuma haftasıyla biter, sınıf bir rozet kazanır. ${hazirSay} hafta hazır.</p>
  <div class="plan-ilerleme" role="img" aria-label="${hazirSay} / 36 hafta hazır"><span style="width:${(hazirSay / 36 * 100).toFixed(1)}%"></span></div>
</header>
${uniteler.map(({ d, h: hs }) => `<section class="plan-unite d-${d.id}" aria-labelledby="u-${d.id}">
  <h2 id="u-${d.id}"><span class="nokta" aria-hidden="true"></span>${d.id}. ünite: ${h(d.ad)} <small>Hafta ${hs[0].hafta}–${hs[hs.length - 1].hafta}${hs[hs.length - 1].rozet ? ' · Rozet: ' + h(hs[hs.length - 1].rozet) : ''}</small></h2>
  <ol class="plan-haftalar">
    ${hs.map(w => { const [k, et, e] = durum(w); const ic = `<span class="hafta-no">Hafta ${w.hafta}</span><span class="hafta-ad">${h(w.ad)}</span><span class="hafta-durum ${k}">${et}</span>`;
      return `<li class="hafta ${k}${w.meydan ? ' meydan' : ''}">${e ? `<a href="${kok}e/${e.slug}/index.html">${ic}</a>` : `<div>${ic}</div>`}</li>`; }).join('\n    ')}
  </ol>
</section>`).join('\n')}`;
  return iskelet({ baslik: `Yıllık plan, ${bant.ad}: ${site.ad}`, aciklama: '36 haftalık yapay zekâ okuryazarlığı programı.', kok, aktif: '', govde, site });
}


/* ---------------- ARF Atölyesi ---------------- */
const ATOLYE_OYUNLAR = [
  { modul: 'atolye-gorsel', yol: 'gorsel', ad: 'ARF\'la Resim Yapalım', aciklama: 'Kartlarla istem kur, ARF çizsin; incele, düzelt, beyan et.', tur: 'Görsel atölyesi', yas: '1–4. sınıf (okul öncesinde öğretmenle)' },
  { modul: 'atolye-odev', yol: 'odev', ad: 'Ödevde Yapay Zekâ: Trafik Işığı', aciklama: 'Ödevde hangi kullanım yeşil, hangisi sarı, hangisi kırmızı?', tur: 'Sürükle-bırak', yas: '3–4. sınıf, veli ve öğretmen' }
];
function atolyeSayfasi(veri, kok = '../') {
  const { site } = veri;
  const adimlar = [
    ['Düşün', 'Önce sen düşünürsün. Fikir senindir; ARF\'a gitmeden ne istediğini bilirsin.'],
    ['İste', 'İstediğini açıkça yazarsın: kim, ne yapıyor, nerede, nasıl. Kişisel bilgi yazmazsın.'],
    ['İncele', 'Sonuca bakarsın: istediğim gibi mi, doğru mu, herkes için uygun mu?'],
    ['Düzelt', 'Beğenmediğin yeri değiştirirsin. Son karar senindir.'],
    ['Beyan et', 'Paylaşırken yapay zekânın yardım ettiğini yazarsın.']
  ];
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>ARF Atölyesi</p>
<header class="sayfa-baslik atolye-giris">
  <div>
    <p class="ust-yazi">Üretken yapay zekâ ile üretmek</p>
    <h1>ARF Atölyesi</h1>
    <p class="oncu">Metin, resim ve video üretirken yapay zekâyı doğru kullanmayı öğreniyoruz: fikir bizden, yardım ARF'tan, son karar yine bizden. Ödevde ve projede nasıl kullanılacağı da burada.</p>
  </div>
  <div class="robot-balon">${robotSvg('', 110, 'sevincli')}<div class="balon">Ben yardım ederim. Ama fikir senin!</div></div>
</header>

<section class="bolum" aria-labelledby="dongu">
  <h2 id="dongu"><span class="simge" aria-hidden="true">↻</span>Her üretimde beş adım</h2>
  <ol class="uretim-dongu">
    ${adimlar.map(([a, t], i) => `<li><span class="no">${i + 1}</span><strong>${h(a)}</strong><span>${h(t)}</span></li>`).join('')}
  </ol>
</section>

<section class="bolum" aria-labelledby="atolyeler">
  <h2 id="atolyeler"><span class="simge" aria-hidden="true">✋</span>Atölyeler</h2>
  <ul class="oyun-kartlar">
    ${ATOLYE_OYUNLAR.map(o => `<li><a class="oyun-kart d-5" href="${kok}atolye/${o.yol}.html"><span class="ust-serit"><span>${h(o.tur)}</span><span>Hazır</span></span><span class="oyun-ad">${h(o.ad)}</span><span class="oyun-aciklama">${h(o.aciklama)} <em>${h(o.yas)}</em></span><span class="oyna">Oyna</span></a></li>`).join('')}
    <li><div class="oyun-kart planli"><span class="ust-serit"><span>Metin atölyesi</span><span>Hazırlanıyor</span></span><span class="oyun-ad">ARF'la Hikâye Yazalım</span><span class="oyun-aciklama">Hikâyenin başını çocuk yazar, ARF devam önerir; çocuk seçer, değiştirir, sonunu kendisi bağlar. Bilmece ve mektup da var.</span></div></li>
    <li><div class="oyun-kart planli"><span class="ust-serit"><span>Video atölyesi</span><span>Hazırlanıyor</span></span><span class="oyun-ad">Karakterimi Konuşturuyorum</span><span class="oyun-aciklama">Çocuk karakterini çizer, sınıf repliğini yazar; öğretmen video aracıyla canlandırır. Sahne sahne istem yazmayı öğrenir.</span></div></li>
  </ul>
</section>

<section class="bolum" aria-labelledby="yas">
  <h2 id="yas"><span class="simge" aria-hidden="true">👥</span>Kim, nasıl kullanır?</h2>
  <p class="aciklama">Yaygın üretken yapay zekâ araçlarının çoğu kullanım koşullarında 13 yaş altını kabul etmez. Bu yüzden ilkokulda çocuk kendi hesabıyla araç kullanmaz; öğretmen kendi hesabında, tahtada, sınıfla birlikte üretir.</p>
  <div class="tablo-sarmal"><table class="tablo">
    <thead><tr><th>Bant</th><th>Kim kullanır?</th><th>Çocuk ne yapar?</th></tr></thead>
    <tbody>
      <tr><td>Okul öncesi</td><td>Öğretmen, tahtada</td><td>Fikir verir, sonucu beğenir ya da değiştirtir, kendi resmiyle karşılaştırır.</td></tr>
      <tr><td>1–2. sınıf</td><td>Öğretmen, sınıfla birlikte</td><td>Sınıfça istem kurar, sonucu inceler, düzeltir; beyan etiketini birlikte yazar.</td></tr>
      <tr><td>3–4. sınıf</td><td>Öğretmen gözetiminde gruplar</td><td>Grup istemini yazar, sonucu kaynakla kontrol eder; ödevde kullandıysa beyan eder.</td></tr>
    </tbody>
  </table></div>
</section>

<section class="bolum" aria-labelledby="odev">
  <h2 id="odev"><span class="simge" aria-hidden="true">🚦</span>Ödevde yapay zekâ: trafik ışığı</h2>
  <div class="trafik">
    <div class="isik yesil"><strong>🟢 Kullanabilirim</strong><ul><li>Konu için fikir almak</li><li>Yazım hatalarını kontrol ettirmek</li><li>Anlamadığım bir şeyi açıklatmak (kitaptan da kontrol ederek)</li></ul></div>
    <div class="isik sari"><strong>🟡 Dikkat, beyan et</strong><ul><li>Sunuma yapay zekâyla resim yapmak</li><li>Taslağa öneri almak; son hâli kendi sözcüklerimle yazmak</li><li>Yardım aldığımı öğretmenime söylemek</li></ul></div>
    <div class="isik kirmizi"><strong>🔴 Yapmam</strong><ul><li>Ödevin tamamını yaptırmak</li><li>Yapay zekânın yazdığını kendim yazdım demek</li><li>Adres, okul, fotoğraf gibi kişisel bilgileri yazmak</li></ul></div>
  </div>
  <p class="aciklama" style="margin-top:14px">Bu tablo öğretmenin sınıf kuralı, velinin ev rehberi ve çocuğun oyunu olarak kullanılır. Okul isterse kendi kurallarına göre uyarlayabilir.</p>
</section>

<section class="bolum" aria-labelledby="proje">
  <h2 id="proje"><span class="simge" aria-hidden="true">📚</span>Dönem projesi: Sınıfımızın resimli masal kitabı</h2>
  <ol class="akis">
    <li><span class="etiket">1. hafta</span><span>Sınıf masalın konusunu ve kahramanlarını seçer; her çocuk kendi kahraman çizimini yapar.</span></li>
    <li><span class="etiket">2. hafta</span><span>Gruplar masalın bölümlerini kendi sözcükleriyle yazar. ARF yalnız fikir ve yazım kontrolü için kullanılır.</span></li>
    <li><span class="etiket">3. hafta</span><span>Her bölüm için sınıf istem yazar, öğretmen görselleri üretir; çocuklar inceler, düzelttirir, çocuk çizimleriyle karşılaştırır.</span></li>
    <li><span class="etiket">4. hafta</span><span>Kitap birleştirilir; her sayfada beyan etiketi bulunur. Velilerle sergi; "ARF Üreticisi" belgesi.</span></li>
  </ol>
</section>`;
  return iskelet({ baslik: `ARF Atölyesi: ${site.ad}`, aciklama: 'Üretken yapay zekâyı metin, görsel ve video üretiminde ve ödevde doğru kullanmak.', kok, aktif: 'atolye', govde, site });
}
function atolyeOyunSayfasi(veri, o, kok = '../') {
  return ekranSayfasi(veri, { slug: '__atolye__', ad: o.ad, ekran: { modul: o.modul } }, kok).replace(`href="${kok}e/__atolye__/index.html">Etkinliğe dön`, `href="${kok}atolye/index.html">Atölyeye dön`);
}

/* ---------------- Öğretmen köşesi ---------------- */
function ogretmenSayfasi(veri, kok = '../') {
  const { site, dunyalar, bantlar, etkinlikler } = veri;
  const satir = (e) => {
    const d = dunyalar.find(x => x.id === e.dunya);
    const b = bantlar.find(x => x.id === e.bant);
    return `<tr class="d-${d.id}">
      <td>${h(e.kod)}</td>
      <td><a href="${etkinlikYolu(kok, e)}">${h(e.ad)}</a></td>
      <td>${h(b.ad)}</td>
      <td><span class="nokta" aria-hidden="true"></span>${h(d.ad)}</td>
      <td>${h(e.sure)}</td>
      <td>${e.ekran.durum === 'hazir' ? 'Hazır' : 'Yakında'}</td>
      <td><a href="${kagitYolu(kok, e)}">Yazdır</a></td>
    </tr>`;
  };
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>Öğretmen köşesi</p>
<header class="sayfa-baslik">
  <h1>Öğretmen köşesi</h1>
  <p class="oncu">Hesap yok, kayıt yok. Etkinliği seç, kâğıdı yazdır, notu bir kez oku.</p>
</header>

<section class="adimlar" aria-labelledby="kullanim" style="margin-top:8px">
  <h2 id="kullanim">Bir etkinlik nasıl kullanılır</h2>
  <ol>
    <li><h3>Notu oku</h3><p>Bir sayfa: giriş, etkinlik, kapanış; üç soru; sık yanılgılar. Beş dakika yeter.</p></li>
    <li><h3>Kâğıdı yazdır</h3><p>A4, siyah-beyaz. Tarayıcının yazdır penceresinden PDF olarak da kaydedebilirsin.</p></li>
    <li><h3>Ekranı tahtada aç</h3><p>Hazır etkileşimler tam ekran açılır; sınıf birlikte oynar. Sonuç saklanmaz.</p></li>
  </ol>
</section>

<section class="metin-sayfa" aria-labelledby="hepsi">
  <h2 id="hepsi">Bütün çalışma kâğıtları</h2>
  <p>${etkinlikler.length} etkinlik, ${bantlar.length} yaş bandı, ${dunyalar.length} dünya. Liste bant sırasıyla.</p>
  <div class="tablo-sarmal">
  <table class="tablo">
    <thead><tr><th>Kod</th><th>Etkinlik</th><th>Bant</th><th>Dünya</th><th>Süre</th><th>Ekran</th><th>Kâğıt</th></tr></thead>
    <tbody>
      ${etkinlikler.map(satir).join('\n      ')}
    </tbody>
  </table>
  </div>

  <h2>Materyal ilkeleri</h2>
  <ul>
    <li>Her etkinlik donanımsız uygulanabilir; ekran dersi zenginleştirir, zorunlu kılmaz.</li>
    <li>Çocuk hesabı yok, çocuk adı girilmez, hiçbir sonuç saklanmaz. Üretken araçlar yalnız öğretmen hesabıyla ve tahtada kullanılır.</li>
    <li>Çalışma kâğıtları siyah-beyaz baskıya uygundur; okul öncesi kâğıtlarında yazma yoktur.</li>
    <li>Kavram adı yerine çocuk sözcüğü: "veri" değil "örnekler", "algoritma" değil "tarif". Teknik ad 3–4. sınıfta ve deneyimden sonra verilir.</li>
    <li>Her etkinliğin kodu sabittir (${h(etkinlikler[0].kod)} gibi); kitaptaki QR kodu aynı etkinliğe götürür.</li>
  </ul>

  <h2>Yıllık plan</h2>
  <p>Hazırlanıyor: her bant için 15 haftalık bir dağılım ve Hayat Bilgisi öğrenme alanlarıyla eşleştirme tablosu. Şimdilik her etkinliğin künyesindeki program eşleştirmesi kullanılabilir.</p>
</section>`;
  return iskelet({ baslik: `Öğretmen köşesi: ${site.ad}`, aciklama: 'Bütün çalışma kâğıtları, kullanım adımları ve materyal ilkeleri.', kok, aktif: 'ogretmen', govde, site });
}

/* ---------------- Kitap ---------------- */
function kitapSayfasi(veri, kok = '../') {
  const { site } = veri;
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>Kitap</p>
<header class="sayfa-baslik">
  <h1>Kitap</h1>
  <p class="oncu">Kitap, bu havuzun basılı hâlidir. Her etkinliğin yanındaki QR kodu, sitedeki aynı etkinliğe götürür: ekran, kâğıt ve not.</p>
</header>
<section class="metin-sayfa">
  <div class="kitap-kartlar">
    <div class="kitap-kart">
      <span class="durum">Hazırlanıyor</span>
      <h3>Okul öncesi kitabı</h3>
      <p>4–6 yaş için bilgisayarsız etkinlikler, kesilecek kartlar ve öğretmen rehberi. Yazı gerektirmeyen çalışma sayfaları.</p>
    </div>
    <div class="kitap-kart">
      <span class="durum">Hazırlanıyor</span>
      <h3>İlkokul kitabı</h3>
      <p>1–4. sınıf için beş dünyada etkinlikler, çalışma kâğıtları, Hayat Bilgisi eşleştirmeleri ve değerlendirme araçları.</p>
    </div>
  </div>
  <h2>Kitap ile site nasıl çalışır</h2>
  <ul>
    <li>Kitaptaki her etkinliğin kodu sitedeki kodla aynıdır; QR kodu doğrudan etkinlik sayfasını açar.</li>
    <li>Sitedeki ekran etkileşimleri ve örnek kâğıtlar ücretsizdir; kitap tam kâğıt setini ve öğretmen rehberini basılı olarak sunar.</li>
    <li>Okullar için yıllık program, sınıf sunumları, ölçme araçları ve öğretmen eğitimi ayrı bir pakette hazırlanıyor.</li>
  </ul>
</section>`;
  return iskelet({ baslik: `Kitap: ${site.ad}`, aciklama: 'Havuzun basılı hâli: okul öncesi ve ilkokul kitapları.', kok, aktif: 'kitap', govde, site });
}

/* ---------------- Araştırma ---------------- */
function arastirmaSayfasi(veri, kok = '../') {
  const { site, dunyalar, bantlar } = veri;
  const kaynak = {
    1: ['İnsan merkezli zihniyet', 'Algı; toplumsal etki', 'Bilme ve anlama'],
    2: ['Teknikler ve uygulamalar', 'Öğrenme; temsil ve akıl yürütme', 'Bilme ve anlama'],
    3: ['İnsan merkezli zihniyet; teknikler', 'Algı; doğal etkileşim', 'Değerlendirme'],
    4: ['Yapay zekâ etiği', 'Toplumsal etki', 'Etik konular'],
    5: ['Sistem tasarımı; teknikler', 'Öğrenme; doğal etkileşim', 'Kullanma ve uygulama; yaratma'],
  };
  const govde = `
<p class="kirinti"><a href="${kok}index.html">Ana sayfa</a><span>›</span>Araştırma</p>
<header class="sayfa-baslik">
  <h1>Araştırma</h1>
  <p class="oncu">Bu site bir tasarım tabanlı araştırma aracıdır: her sürüm bir uygulama döngüsüdür, her döngü etkinlikleri düzeltir.</p>
</header>
<section class="metin-sayfa">
  <h2>Çerçeve: beş dünya</h2>
  <p>Dünyalar, UNESCO'nun öğrenciler için yapay zekâ yeterlik çerçevesi (2024), AI4K12'nin beş büyük fikri ve Ng ve arkadaşlarının (2021) okuryazarlık boyutlarından türetildi; Türkiye Yüzyılı Maarif Modeli'nin okuryazarlık düzeylerine (farkındalık, işlevsellik, eylemsellik) oturtuldu.</p>
  <div class="tablo-sarmal">
  <table class="tablo">
    <thead><tr><th>Dünya</th><th>Çocuğun sorusu</th><th>UNESCO (2024)</th><th>AI4K12</th><th>Ng vd. (2021)</th></tr></thead>
    <tbody>
      ${dunyalar.map(d => `<tr class="d-${d.id}"><td><span class="nokta" aria-hidden="true"></span>${h(d.ad)}</td><td>${h(d.soru)}</td><td>${h(kaynak[d.id][0])}</td><td>${h(kaynak[d.id][1])}</td><td>${h(kaynak[d.id][2])}</td></tr>`).join('\n      ')}
    </tbody>
  </table>
  </div>

  <h2>Yaş bantları ve düzeyler</h2>
  <div class="tablo-sarmal">
  <table class="tablo">
    <thead><tr><th>Bant</th><th>Yaş</th><th>Maarif düzeyi</th><th>Süre</th></tr></thead>
    <tbody>
      ${bantlar.map(b => `<tr><td>${h(b.ad)}</td><td>${h(b.yas)}</td><td>${h(b.duzey)}</td><td>${h(b.sure)}</td></tr>`).join('\n      ')}
    </tbody>
  </table>
  </div>

  <h2>Veri ve gizlilik</h2>
  <p>Sitede hesap, çerez ve çocuk verisi yoktur. Araştırma için yalnız anonim toplam sayaç tutulması planlanmaktadır: hangi etkinlik kaç kez açıldı. Kişisel veri işlenmez.</p>

  <h2>Kim yapıyor</h2>
  <p>${h(site.sahip)}. Ücretsiz havuzun lisansı: ${h(site.lisans)}.</p>
  <p>İletişim ve atıf bilgisi eklenecek.</p>
</section>`;
  return iskelet({ baslik: `Araştırma: ${site.ad}`, aciklama: 'Çerçeve, yaş bantları, veri ve gizlilik.', kok, aktif: 'arastirma', govde, site });
}

module.exports = { ATOLYE_OYUNLAR, atolyeSayfasi, atolyeOyunSayfasi, planSayfasi, sunumSayfasi, oyunSayfasi, oyunlarSayfasi, anaSayfa, bantSayfasi, etkinlikSayfasi, ekranSayfasi, ogretmenSayfasi, kitapSayfasi, arastirmaSayfasi };
