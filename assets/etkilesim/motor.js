// YZO etkileşim motoru: modül kaydı, küçük DOM yardımcıları, tohumlu rastgele.
// Her etkileşim bir modül dosyasıdır: YZO.kaydet('slug', function (kutu, Y) { ... })
window.YZO = (function () {
  'use strict';
  var moduller = {};

  function kaydet(ad, fn) { moduller[ad] = fn; }

  function baslat(ad, kutu) {
    var fn = moduller[ad];
    kutu.innerHTML = '';
    if (!fn) {
      kutu.appendChild(el('div', { class: 'ekran-yakinda' }, ['Bu etkileşim henüz yüklenmedi.']));
      return;
    }
    fn(kutu, window.YZO);
  }

  // el('div', {class:'x', onclick: fn}, ['metin', baskaEl])
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k.indexOf('on') === 0 && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else if (v === false || v == null) return;
      else e.setAttribute(k, v === true ? '' : v);
    });
    (children || []).forEach(function (c) {
      if (c == null || c === false) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  // Tohumlu rastgele (mulberry32): aynı tohum, aynı sıra. Sınıfta tekrar edilebilir.
  function tohum(n) {
    var t = n >>> 0;
    return function () {
      t = (t + 0x6D2B79F5) >>> 0;
      var r = Math.imul(t ^ (t >>> 15), 1 | t);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function karistir(dizi, rnd) {
    var a = dizi.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var ROBOT = '<svg class="robot" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
    '<line x1="32" y1="6" x2="32" y2="14" stroke="#1F2A48" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="32" cy="6" r="4" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>' +
    '<rect x="10" y="14" width="44" height="40" rx="14" fill="#FFFFFF" stroke="#1F2A48" stroke-width="3"/>' +
    '<rect x="4" y="28" width="6" height="12" rx="3" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>' +
    '<rect x="54" y="28" width="6" height="12" rx="3" fill="#F6C945" stroke="#1F2A48" stroke-width="2.5"/>' +
    '<circle cx="23" cy="31" r="5" fill="#1F2A48"/><circle cx="41" cy="31" r="5" fill="#1F2A48"/>' +
    '<circle cx="24.5" cy="29.5" r="1.6" fill="#FFFFFF"/><circle cx="42.5" cy="29.5" r="1.6" fill="#FFFFFF"/>' +
    '<circle cx="17" cy="40" r="3" fill="#FADFE4"/><circle cx="47" cy="40" r="3" fill="#FADFE4"/>' +
    '<path d="M24 42 Q32 49 40 42" fill="none" stroke="#1F2A48" stroke-width="3" stroke-linecap="round"/></svg>';

  function robot() { var s = el('span', { html: ROBOT }); return s.firstChild; }

  function yildizlar(n, toplam) {
    var s = '';
    for (var i = 0; i < toplam; i++) s += i < n ? '★' : '☆';
    return s;
  }

  // "6 meyveden 4'ünü": sayıya belirtme eki (0–12). 0 için "hiçbirini" kullan.
  var EKLER = { 1: "'ini", 2: "'sini", 3: "'ünü", 4: "'ünü", 5: "'ini", 6: "'sını", 7: "'sini", 8: "'ini", 9: "'unu", 10: "'unu", 11: "'ini", 12: "'sini" };
  function sayili(n) { return n === 0 ? 'hiçbirini' : n + (EKLER[n] || "'ini"); }

  // Genel kart oyunu: her kartta bir soru, iki-üç seçenek, Robot açıklar, sonunda puan.
  // ayar = { soru, kartlar:[{emoji?, ad?, metin?, cevap, neden}], secenekler:[{deger, etiket, ikon, sinif}], son }
  function kartOyunu(kutu, ayar) {
    var sira = 0, dogru = 0;
    function ciz() {
      kutu.innerHTML = '';
      var oyun = el('div', { class: 'oyun' });
      kutu.appendChild(oyun);
      var K = ayar.kartlar;
      if (sira >= K.length) {
        oyun.appendChild(el('div', { class: 'sonuc' }, [
          el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [yildizlar(Math.round(dogru / K.length * 5), 5)]),
          el('div', { class: 'buyuk' }, [K.length + ' karttan ' + sayili(dogru) + ' bildin']),
          el('p', {}, [ayar.son]),
          el('button', { class: 'secim sari', type: 'button', onclick: function () { sira = 0; dogru = 0; ciz(); } }, ['Yeniden oyna'])
        ]));
        return;
      }
      var k = K[sira];
      oyun.appendChild(el('div', { class: 'baslik' }, [
        el('h2', {}, [k.soru || ayar.soru]),
        el('span', { class: 'ilerleme' }, ['Kart ' + (sira + 1) + ' / ' + K.length])
      ]));
      var sahne = el('div', { class: 'sahne' });
      sahne.appendChild(el('div', { class: 'kart' }, [
        k.emoji ? el('div', { class: 'resim', 'aria-hidden': 'true' }, [k.emoji]) : null,
        k.ad ? el('div', { class: 'ad' }, [k.ad]) : null,
        k.metin ? el('p', { class: 'metin' }, [k.metin]) : null
      ]));
      var secimler = el('div', { class: 'secimler' + (ayar.secenekler.length === 3 ? ' uclu' : '') });
      ayar.secenekler.forEach(function (s) {
        secimler.appendChild(el('button', { class: 'secim ' + (s.sinif || ''), type: 'button', onclick: function () {
          var ok = s.deger === k.cevap;
          if (ok) dogru++;
          secimler.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
          var gb = el('div', { class: 'geri-bildirim ' + (ok ? 'dogru' : 'bak') }, [robot(), el('div', {}, [
            ok ? 'Doğru!' : 'Bir daha düşün.', el('span', { class: 'aciklama' }, [k.neden])
          ])]);
          sahne.appendChild(gb);
          sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
            el('button', { class: 'secim sari', type: 'button', onclick: function () { sira++; ciz(); } }, [sira + 1 < K.length ? 'Sıradaki kart' : 'Sonucu gör'])
          ]));
          gb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } }, [s.ikon ? el('span', { class: 'ikon', 'aria-hidden': 'true' }, [s.ikon]) : null, s.etiket]));
      });
      sahne.appendChild(secimler);
      oyun.appendChild(sahne);
    }
    ciz();
  }

  return { kartOyunu: kartOyunu, kaydet: kaydet, baslat: baslat, el: el, tohum: tohum, karistir: karistir, robot: robot, yildizlar: yildizlar, sayili: sayili };
})();
