// YZO sunum oynatıcısı: <script type="application/json" id="sunum-veri"> içindeki slaytları gösterir.
// Tuşlar: → / boşluk ileri, ← geri, N öğretmen notu, F tam ekran.
// Bir slaytta .adim sınıflı öğeler varsa "ileri" önce onları tek tek açar.
(function () {
  'use strict';
  var V = JSON.parse(document.getElementById('sunum-veri').textContent);
  var sahne = document.getElementById('sahne');
  var ic = document.getElementById('slayt');
  var sayac = document.getElementById('sayac');
  var notKutu = document.getElementById('not');
  var no = 0, adim = 0;

  function h(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function arf(ruh, sinif) { return window.ARF.svg(ruh, { boy: 220, sinif: sinif || '' }); }
  var robot = arf('merakli');

  var CIZ = {
    kapak: function (s) {
      return '<div class="s-kapak"><div class="robot-buyuk">' + arf(s.ruh || 'sevincli', 'gel') + '</div><div><p class="s-ust">' + h(V.kod) + ' · ' + h(V.dunya) + '</p><h1>' + h(s.baslik) + '</h1><p class="s-alt">' + h(s.metin) + '</p></div></div>';
    },
    konusma: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-konusma"><div class="robot-buyuk">' + arf(s.ruh || 'merakli') + '</div><div class="balonlar">' +
        s.balonlar.map(function (b) { var t = typeof b === 'string' ? b : b.metin, d = typeof b === 'string' ? '' : (b.ses || ''); return '<p class="s-balon adim"' + (d ? ' data-ses="' + h(d) + '"' : '') + '>' + h(t) + '</p>'; }).join('') + '</div></div>';
    },
    soru: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-secenekler">' + s.secenekler.map(function (o) {
        return '<button type="button" class="s-secenek"><span class="e">' + o.emoji + '</span>' + h(o.ad) + '</button>';
      }).join('') + '</div>' + (s.metin ? '<p class="s-not">' + h(s.metin) + '</p>' : '');
    },
    kartlar: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-kartlar">' + s.kartlar.map(function (k) {
        return '<div class="s-kart adim"><span class="e">' + k.emoji + '</span><strong>' + h(k.ad) + '</strong><span>' + h(k.metin) + '</span></div>';
      }).join('') + '</div>';
    },
    ikili: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-ikili">' + [s.sol, s.sag].map(function (t, i) {
        return '<div class="s-kutu ' + (i ? 'sag' : 'sol') + '"><h3><span class="e">' + t.emoji + '</span>' + h(t.ad) + '</h3><ul>' +
          t.ornekler.map(function (o) { return '<li class="adim">' + o + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>';
    },
    oyun: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-oyun" data-modul="' + h(s.modul) + '"></div>';
    },
    tartisma: function (s) {
      return '<div class="s-tartisma"><p class="s-ust">Konuşalım</p><h2>' + h(s.soru) + '</h2><ul>' +
        s.cevaplar.map(function (c) { return '<li class="adim">' + h(c) + '</li>'; }).join('') + '</ul></div>';
    },
    kagit: function (s) {
      return '<h2>' + h(s.baslik) + '</h2><div class="s-kagit"><div class="s-a4">' + h(V.kagitBaslik) + '</div><div><p>' + h(s.metin) + '</p><a class="s-dugme" href="' + h(V.kagitYolu) + '" target="_blank">Çalışma kâğıdını aç</a></div></div>';
    },
    kapanis: function (s) {
      return '<div class="s-kapak"><div class="robot-buyuk">' + arf('sevincli', 'zipla') + '</div><div><p class="s-ust">Bugün öğrendik</p><h1>' + h(s.baslik) + '</h1>' +
        (s.maddeler ? '<ul class="s-maddeler">' + s.maddeler.map(function (m) { return '<li class="adim">' + h(m) + '</li>'; }).join('') + '</ul>' : '') + '</div></div>';
    }
  };

  function adimlar() { return ic.querySelectorAll('.adim'); }

  function goster() {
    var s = V.slaytlar[no];
    ic.className = 'slayt t-' + s.tip;
    ic.innerHTML = CIZ[s.tip](s);
    adim = 0;
    sayac.textContent = (no + 1) + ' / ' + V.slaytlar.length;
    var p = s.plan || {};
    notKutu.innerHTML = '<strong>Slayt ' + (no + 1) + (p.sure ? ' · ' + h(p.sure) : '') + '</strong><p><b>Öğretmen:</b> ' + h(p.ogretmen) + '</p><p><b>Çocuklar:</b> ' + h(p.cocuk) + '</p>';
    var oyun = ic.querySelector('[data-modul]');
    if (oyun && window.YZO) window.YZO.baslat(oyun.dataset.modul, oyun);
    ic.querySelectorAll('.s-secenek').forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); b.classList.toggle('secili'); }); });
    if (history.replaceState) history.replaceState(null, '', '#' + (no + 1));
    if (window.YZO && YZO.ses) { YZO.ses.sus(); if (s.anlatim) konus(s.anlatim, s.anlatimSes); }
  }

  function ileri() {
    var a = adimlar();
    if (adim < a.length) {
      var acilan = a[adim];
      acilan.classList.add('acik'); adim++;
      if (acilan.classList.contains('s-balon')) konus(acilan.textContent, acilan.dataset.ses);
      else if (window.YZO && YZO.ses) YZO.ses.efekt('tik');
      return;
    }
    if (no < V.slaytlar.length - 1) { no++; goster(); }
  }
  function geri() { if (no > 0) { no--; goster(); } }
  function konus(metin, dosya) {
    var a = ic.querySelector('.robot-buyuk svg.arf');
    if (a) a.classList.add('konusuyor');
    var bitir = function () { if (a) a.classList.remove('konusuyor'); };
    if (window.YZO && YZO.ses) YZO.ses.soyle(metin, { dosya: dosya, bitince: bitir }); else setTimeout(bitir, 1500);
  }

  document.getElementById('ileri').addEventListener('click', ileri);
  document.getElementById('geri').addEventListener('click', geri);
  document.getElementById('not-dugme').addEventListener('click', function () { document.body.classList.toggle('not-acik'); });
  document.getElementById('tam').addEventListener('click', function () {
    var d = document.documentElement;
    if (!document.fullscreenElement && d.requestFullscreen) d.requestFullscreen().catch(function () {}); else if (document.exitFullscreen) document.exitFullscreen().catch(function () {});
  });
  sahne.addEventListener('click', function (e) {
    if (e.target.closest('button, a, input, [data-modul], .s-oyun')) return;
    ileri();
  });
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); ileri(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); geri(); }
    else if (e.key === 'n' || e.key === 'N') document.body.classList.toggle('not-acik');
    else if (e.key === 'f' || e.key === 'F') document.getElementById('tam').click();
  });

  // 1280×720 sahneyi pencereye sığdır.
  function olcekle() {
    var w = window.innerWidth, hh = window.innerHeight - document.getElementById('cubuk').offsetHeight;
    var o = Math.min(w / 1280, hh / 720);
    sahne.style.transform = 'scale(' + o + ')';
    sahne.style.left = Math.max(0, (w - 1280 * o) / 2) + 'px';
    sahne.style.top = Math.max(0, (hh - 720 * o) / 2) + 'px';
  }
  window.addEventListener('resize', olcekle);
  olcekle();

  var m = /#(\d+)/.exec(location.hash);
  if (m) no = Math.min(V.slaytlar.length - 1, Math.max(0, Number(m[1]) - 1));
  goster();
})();
