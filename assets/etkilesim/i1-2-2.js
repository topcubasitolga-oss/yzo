// YZO-İ1-2.2 Çiz, Robot Bilsin — Quick Draw benzeri, ama Robot'u sınıf eğitir.
// Her sınıf (güneş, ev, balık) için örnek çizilir; Robot yeni çizimi en benzer örneklere bakarak tahmin eder (k-en yakın komşu).
// Hiçbir çizim kaydedilmez, sayfa kapanınca silinir.
YZO.kaydet('i1-2-2', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var SINIFLAR = [
    { id: 'gunes', ad: 'Güneş', emoji: '☀️', renk: '#F6C945' },
    { id: 'ev', ad: 'Ev', emoji: '🏠', renk: '#F28C28' },
    { id: 'balik', ad: 'Balık', emoji: '🐟', renk: '#2A8FBD' }
  ];
  var N = 24;               // özellik ızgarası
  var ornekler = [];        // { sinif, v, resim }
  var asama = 'ogret';      // ogret | sina
  var secili = 'gunes';

  function tuval(boy) {
    var c = el('canvas', { width: boy, height: boy, class: 'cizim-tuval' });
    var x = c.getContext('2d');
    x.fillStyle = '#fff'; x.fillRect(0, 0, boy, boy);
    x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = '#1F2A48'; x.lineWidth = boy / 22;
    var ciziyor = false, son = null, bos = true;
    function nokta(e) { var r = c.getBoundingClientRect(); return [(e.clientX - r.left) * boy / r.width, (e.clientY - r.top) * boy / r.height]; }
    c.addEventListener('pointerdown', function (e) { e.preventDefault(); c.setPointerCapture(e.pointerId); ciziyor = true; son = nokta(e); x.beginPath(); x.arc(son[0], son[1], x.lineWidth / 2, 0, 7); x.fillStyle = '#1F2A48'; x.fill(); bos = false; });
    c.addEventListener('pointermove', function (e) { if (!ciziyor) return; var p = nokta(e); x.beginPath(); x.moveTo(son[0], son[1]); x.lineTo(p[0], p[1]); x.stroke(); son = p; });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { c.addEventListener(t, function () { ciziyor = false; }); });
    c.temizle = function () { x.fillStyle = '#fff'; x.fillRect(0, 0, boy, boy); bos = true; };
    c.bosMu = function () { return bos; };
    return c;
  }

  // Çizimi kırp, N×N'e ölçekle, 0..1 vektöre çevir.
  function ozellik(c) {
    var x = c.getContext('2d'), w = c.width, d = x.getImageData(0, 0, w, w).data;
    var minx = w, miny = w, maxx = 0, maxy = 0;
    for (var y = 0; y < w; y++) for (var i = 0; i < w; i++) if (d[(y * w + i) * 4] < 128) { if (i < minx) minx = i; if (i > maxx) maxx = i; if (y < miny) miny = y; if (y > maxy) maxy = y; }
    if (maxx < minx) return null;
    var k = Math.max(maxx - minx, maxy - miny) + 8, cx = (minx + maxx) / 2, cy = (miny + maxy) / 2;
    var t = document.createElement('canvas'); t.width = t.height = N;
    var tx = t.getContext('2d'); tx.fillStyle = '#fff'; tx.fillRect(0, 0, N, N);
    tx.drawImage(c, cx - k / 2, cy - k / 2, k, k, 0, 0, N, N);
    var td = tx.getImageData(0, 0, N, N).data, v = [];
    for (var j = 0; j < N * N; j++) v.push(1 - td[j * 4] / 255);
    return { v: v, resim: t.toDataURL() };
  }
  function uzaklik(a, b) { var s = 0; for (var i = 0; i < a.length; i++) { var f = a[i] - b[i]; s += f * f; } return s; }
  function tahmin(v) {
    var siralı = ornekler.map(function (o) { return { s: o.sinif, d: uzaklik(v, o.v) }; }).sort(function (a, b) { return a.d - b.d; });
    var k = Math.min(3, siralı.length), oy = {};
    for (var i = 0; i < k; i++) oy[siralı[i].s] = (oy[siralı[i].s] || 0) + 1;
    var en = Object.keys(oy).sort(function (a, b) { return oy[b] - oy[a]; })[0];
    return { sinif: en, guven: oy[en] / k, yakin: siralı.slice(0, k) };
  }
  function sayi(s) { return ornekler.filter(function (o) { return o.sinif === s; }).length; }
  function sinifBul(id) { return SINIFLAR.filter(function (s) { return s.id === id; })[0]; }

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun cizim-oyun' });
    kutu.appendChild(oyun);
    var hazir = SINIFLAR.every(function (s) { return sayi(s.id) >= 2; });
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, [asama === 'ogret' ? '1. Robot\'a öğret: seç ve çiz' : '2. Robot\'u sına: bir şey çiz, Robot tahmin etsin']),
      el('span', { class: 'ilerleme' }, ['Robot ' + ornekler.length + ' çizim gördü'])
    ]));
    var duzen = el('div', { class: 'cizim-duzen' });
    var sol = el('div', { class: 'cizim-sol' });
    var c = tuval(320);
    var mesaj = el('div', { class: 'cizim-mesaj' });

    if (asama === 'ogret') {
      var secim = el('div', { class: 'etiketler' });
      SINIFLAR.forEach(function (s) {
        secim.appendChild(el('button', { type: 'button', class: 'secim' + (secili === s.id ? ' sari' : ''), 'aria-pressed': secili === s.id ? 'true' : 'false', onclick: function () { secili = s.id; ciz(); } }, [
          el('span', { class: 'ikon', 'aria-hidden': 'true' }, [s.emoji]), s.ad + ' (' + sayi(s.id) + ')'
        ]));
      });
      sol.appendChild(secim);
      sol.appendChild(c);
      sol.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { type: 'button', class: 'secim yesil', onclick: function () {
          if (c.bosMu()) { mesaj.textContent = 'Önce bir şey çiz.'; return; }
          var f = ozellik(c); if (!f) return;
          ornekler.push({ sinif: secili, v: f.v, resim: f.resim });
          ciz();
        } }, ['Bu bir ' + sinifBul(secili).ad.toLowerCase() + ': Robot\'a göster']),
        el('button', { type: 'button', class: 'secim gri', onclick: function () { c.temizle(); } }, ['Sil'])
      ]));
      sol.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { type: 'button', class: 'secim mavi', disabled: !hazir, onclick: function () { asama = 'sina'; ciz(); } }, [hazir ? 'Robot hazır: sınamaya geç' : 'Her resimden en az 2 çizim göster'])
      ]));
    } else {
      sol.appendChild(c);
      sol.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { type: 'button', class: 'secim mavi', onclick: function () {
          if (c.bosMu()) { mesaj.textContent = 'Önce bir şey çiz.'; return; }
          var f = ozellik(c); if (!f) return;
          var t = tahmin(f.v), s = sinifBul(t.sinif);
          mesaj.innerHTML = '';
          mesaj.appendChild(el('div', { class: 'geri-bildirim ' + (t.guven > 0.6 ? 'dogru' : 'bak') }, [Y.robot(), el('div', {}, [
            'Robot: "Bu bir ' + s.ad.toLowerCase() + ' ' + s.emoji + (t.guven > 0.6 ? '!"' : ' olabilir… emin değilim."'),
            el('span', { class: 'aciklama' }, ['En çok benzettiği çizimler aşağıda. Doğru mu bildi? Bilmediyse ona daha çok örnek göster.'])
          ])]));
          var benz = el('div', { class: 'cizim-benzer' });
          t.yakin.forEach(function (y) {
            var o = ornekler.filter(function (z) { return z.sinif === y.s; }).sort(function (a, b) { return uzaklik(f.v, a.v) - uzaklik(f.v, b.v); })[0];
            benz.appendChild(el('img', { src: o.resim, alt: sinifBul(y.s).ad + ' örneği' }));
          });
          mesaj.appendChild(benz);
        } }, ['Robot, bu ne?']),
        el('button', { type: 'button', class: 'secim gri', onclick: function () { c.temizle(); mesaj.innerHTML = ''; } }, ['Sil']),
        el('button', { type: 'button', class: 'secim yesil', onclick: function () { asama = 'ogret'; ciz(); } }, ['Daha çok öğret'])
      ]));
    }
    sol.appendChild(mesaj);
    duzen.appendChild(sol);

    var defter = el('div', { class: 'cizim-defter' }, [el('div', { class: 'robot-defter' }, [Y.robot(), el('span', { class: 'sayac' }, ['Robot\'un defteri'])])]);
    SINIFLAR.forEach(function (s) {
      var satir = el('div', { class: 'cizim-satir' }, [el('strong', {}, [s.emoji + ' ' + s.ad])]);
      var resimler = el('div', { class: 'cizim-resimler' });
      ornekler.filter(function (o) { return o.sinif === s.id; }).forEach(function (o) { resimler.appendChild(el('img', { src: o.resim, alt: '' })); });
      if (!sayi(s.id)) resimler.appendChild(el('span', { class: 'kucuk' }, ['Henüz örnek yok']));
      satir.appendChild(resimler);
      defter.appendChild(satir);
    });
    defter.appendChild(el('button', { type: 'button', class: 'secim gri', style: 'margin-top:8px', onclick: function () { ornekler = []; asama = 'ogret'; ciz(); } }, ['Defteri sil, baştan başla']));
    duzen.appendChild(defter);
    oyun.appendChild(duzen);
  }
  ciz();
});
