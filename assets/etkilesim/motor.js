// YZO etkileşim motoru: modül kaydı, küçük DOM yardımcıları, tohumlu rastgele.
// Her etkileşim bir modül dosyasıdır: YZO.kaydet('slug', function (kutu, Y) { ... })
window.YZO = Object.assign(window.YZO || {}, (function () {
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
    if (/\bgeri-bildirim\b/.test(e.className)) {
      var eski = e.querySelector('svg.arf');
      if (eski) {
        var dogru = /\bdogru\b/.test(e.className);
        var yeni = robot(dogru ? 'sevincli' : 'dusunceli', dogru ? 'zipla' : 'dusun');
        if (yeni) eski.parentNode.replaceChild(yeni, eski);
        if (window.YZO && window.YZO.ses) {
          window.YZO.ses.efekt(dogru ? 'dogru' : 'bak');
          var metin = e.lastChild ? Array.prototype.map.call(e.lastChild.childNodes, function (n) { return n.textContent; }).join(' ') : '';
          var ses = window.YZO.ses;
          setTimeout(function () { ses.soyle(metin); }, 350);
        }
      }
    }
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

function robot(ruh, sinif) {
    var s = document.createElement('span');
    s.innerHTML = window.ARF ? window.ARF.svg(ruh || 'merakli', { boy: 64, sinif: 'robot ' + (sinif || ''), defter: false, tebesir: false }) : '';
    return s.firstChild;
  }

  function yildizlar(n, toplam) {
    var s = '';
    for (var i = 0; i < toplam; i++) s += i < n ? '★' : '☆';
    return s;
  }

  // "6 meyveden 4'ünü": sayıya belirtme eki (0–12). 0 için "hiçbirini" kullan.
  var EKLER = { 1: "'ini", 2: "'sini", 3: "'ünü", 4: "'ünü", 5: "'ini", 6: "'sını", 7: "'sini", 8: "'ini", 9: "'unu", 10: "'unu", 11: "'ini", 12: "'sini" };
  function sayili(n) { return n === 0 ? 'hiçbirini' : n + (EKLER[n] || "'ini"); }

  // Genel kart oyunu: her kartta bir soru, iki-üç seçenek, ARF açıklar, sonunda puan.
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

  // Sürükle-bırak sınıflama (akıllı tahta / dokunmatik / fare). Pointer olaylarıyla çalışır.
  // ayar = { soru, kutular:[{id, ad, emoji, sinif}], ogeler:[{emoji, ad, kutu, neden}], son }
  function surukleBirak(kutu, ayar) {
    var yerlesen = 0, hata = 0;
    function ciz() {
      yerlesen = 0; hata = 0;
      kutu.innerHTML = '';
      var oyun = el('div', { class: 'oyun sb' });
      kutu.appendChild(oyun);
      var ilerleme = el('span', { class: 'ilerleme' }, ['0 / ' + ayar.ogeler.length]);
      oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, [ayar.soru]), ilerleme]));
      var tepsi = el('div', { class: 'sb-tepsi' });
      var mesaj = el('div', { class: 'sb-mesaj', 'aria-live': 'polite' });
      var hedefler = el('div', { class: 'sb-hedefler', style: 'grid-template-columns:repeat(' + ayar.kutular.length + ',minmax(0,1fr))' });
      var hedefEl = {};
      ayar.kutular.forEach(function (k) {
        var icAlan = el('div', { class: 'sb-ic' });
        var h = el('div', { class: 'sb-hedef ' + (k.sinif || ''), 'data-kutu': k.id }, [
          el('div', { class: 'sb-hedef-ad' }, [el('span', { class: 'ikon', 'aria-hidden': 'true' }, [k.emoji]), k.ad]), icAlan
        ]);
        hedefEl[k.id] = { kutu: h, ic: icAlan };
        hedefler.appendChild(h);
      });
      oyun.appendChild(tepsi);
      oyun.appendChild(hedefler);
      oyun.appendChild(mesaj);

      function soyle(sinif, metin, alt) {
        mesaj.innerHTML = '';
        mesaj.appendChild(el('div', { class: 'geri-bildirim ' + sinif }, [robot(), el('div', {}, [metin, alt ? el('span', { class: 'aciklama' }, [alt]) : null])]));
      }

      karistir(ayar.ogeler, Math.random).forEach(function (o) {
        var p = el('div', { class: 'sb-parca', tabindex: '0', role: 'button', 'aria-label': o.ad + '. Bir kutuya sürükle.' }, [
          el('span', { class: 'resim', 'aria-hidden': 'true' }, [o.emoji]), el('span', {}, [o.ad])
        ]);
        tepsi.appendChild(p);
        var bas = null;
        p.addEventListener('pointerdown', function (e) {
          if (p.classList.contains('yerlesti')) return;
          e.preventDefault();
          p.setPointerCapture(e.pointerId);
          var r = p.getBoundingClientRect();
          bas = { x: e.clientX, y: e.clientY, olcek: r.width / p.offsetWidth || 1 };
          p.classList.add('tutuluyor');
        });
        p.addEventListener('pointermove', function (e) {
          if (!bas) return;
          var dx = (e.clientX - bas.x) / bas.olcek, dy = (e.clientY - bas.y) / bas.olcek;
          p.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.06)';
          Object.keys(hedefEl).forEach(function (id) {
            var r = hedefEl[id].kutu.getBoundingClientRect();
            hedefEl[id].kutu.classList.toggle('uzerinde', e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom);
          });
        });
        function birak(e) {
          if (!bas) return;
          bas = null;
          p.classList.remove('tutuluyor');
          p.style.transform = '';
          var hedef = null;
          Object.keys(hedefEl).forEach(function (id) {
            var r = hedefEl[id].kutu.getBoundingClientRect();
            hedefEl[id].kutu.classList.remove('uzerinde');
            if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) hedef = id;
          });
          if (hedef) yerlestir(hedef);
        }
        p.addEventListener('pointerup', birak);
        p.addEventListener('pointercancel', birak);
        // Klavye: Enter/boşluk ile sırayla kutu seç (erişilebilirlik)
        p.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter' && e.key !== ' ') return;
          e.preventDefault();
          var ids = ayar.kutular.map(function (k) { return k.id; });
          var k = (Number(p.dataset.k || -1) + 1) % ids.length; p.dataset.k = k; yerlestir(ids[k]);
        });
        function yerlestir(id) {
          if (id === o.kutu) {
            p.classList.add('yerlesti');
            hedefEl[id].ic.appendChild(p);
            yerlesen++;
            ilerleme.textContent = yerlesen + ' / ' + ayar.ogeler.length;
            soyle('dogru', 'Doğru! ' + o.ad + '.', o.neden);
            if (yerlesen === ayar.ogeler.length) bitti();
          } else {
            hata++;
            p.classList.add('salla');
            setTimeout(function () { p.classList.remove('salla'); }, 450);
            soyle('bak', 'Bir daha düşün.', o.ipucu || 'Kendine sor: ' + ayar.soru);
          }
        }
      });

      function bitti() {
        mesaj.innerHTML = '';
        mesaj.appendChild(el('div', { class: 'sonuc' }, [
          el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [yildizlar(Math.max(1, 5 - hata), 5)]),
          el('div', { class: 'buyuk' }, ['Hepsini yerleştirdin!']),
          el('p', {}, [ayar.son]),
          el('button', { class: 'secim sari', type: 'button', onclick: ciz }, ['Yeniden oyna'])
        ]));
      }
    }
    ciz();
  }

  // Sahnede bul: bir sahne çiziminin üstünde nesneler; doğru olanlara dokun.
  // ayar = { soru, sahne: 'ev'|'mahalle'|svg metni, ogeler:[{emoji, ad, x, y, dogru, neden}], son }
  // x, y: sahne içinde yüzde konum.
  var SAHNELER = {
    ev: '<svg viewBox="0 0 800 450" preserveAspectRatio="none"><rect width="800" height="450" fill="#FDF3C7"/><rect y="330" width="800" height="120" fill="#E8C9A0"/><rect x="0" y="0" width="390" height="330" fill="#D9EDF7"/><rect x="40" y="40" width="140" height="110" rx="6" fill="#fff" stroke="#1F2A48" stroke-width="5"/><line x1="110" y1="40" x2="110" y2="150" stroke="#1F2A48" stroke-width="4"/><rect x="420" y="180" width="300" height="150" rx="10" fill="#B07A4A" stroke="#1F2A48" stroke-width="5"/><rect x="60" y="240" width="250" height="90" rx="20" fill="#7B61D1" stroke="#1F2A48" stroke-width="5"/><rect x="560" y="40" width="160" height="100" rx="8" fill="#26335A" stroke="#1F2A48" stroke-width="5"/></svg>',
    mahalle: '<svg viewBox="0 0 800 450" preserveAspectRatio="none"><rect width="800" height="450" fill="#D9EDF7"/><rect y="300" width="800" height="150" fill="#9AA3B5"/><rect y="360" width="800" height="8" fill="#fff" opacity=".7"/><rect x="30" y="90" width="200" height="210" fill="#F28C28" stroke="#1F2A48" stroke-width="5"/><rect x="260" y="50" width="220" height="250" fill="#3FA35B" stroke="#1F2A48" stroke-width="5"/><rect x="520" y="120" width="250" height="180" fill="#D9455F" stroke="#1F2A48" stroke-width="5"/><rect x="540" y="140" width="210" height="34" fill="#fff" stroke="#1F2A48" stroke-width="3"/><text x="645" y="166" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="24" fill="#1F2A48">MARKET</text><rect x="300" y="80" width="140" height="34" fill="#fff" stroke="#1F2A48" stroke-width="3"/><text x="370" y="106" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="22" fill="#1F2A48">OKUL</text></svg>'
  };
  function sahnedeBul(kutu, ayar) {
    function ciz() {
      kutu.innerHTML = '';
      var oyun = el('div', { class: 'oyun bul' });
      kutu.appendChild(oyun);
      var hedefSay = ayar.ogeler.filter(function (o) { return o.dogru; }).length, bulunan = 0, hata = 0;
      var ilerleme = el('span', { class: 'ilerleme' }, ['0 / ' + hedefSay]);
      oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, [ayar.soru]), ilerleme]));
      var sahne = el('div', { class: 'bul-sahne' });
      sahne.innerHTML = SAHNELER[ayar.sahne] || ayar.sahne;
      var mesaj = el('div', { class: 'sb-mesaj', 'aria-live': 'polite' });
      ayar.ogeler.forEach(function (o) {
        var b = el('button', { type: 'button', class: 'bul-oge', style: 'left:' + o.x + '%;top:' + o.y + '%', 'aria-label': o.ad }, [
          el('span', { class: 'resim', 'aria-hidden': 'true' }, [o.emoji]), el('span', { class: 'etiket' }, [o.ad])
        ]);
        b.addEventListener('click', function () {
          if (b.classList.contains('bulundu')) return;
          mesaj.innerHTML = '';
          if (o.dogru) {
            b.classList.add('bulundu'); bulunan++;
            ilerleme.textContent = bulunan + ' / ' + hedefSay;
            mesaj.appendChild(el('div', { class: 'geri-bildirim dogru' }, [robot(), el('div', {}, ['Buldun! ' + o.ad + '.', el('span', { class: 'aciklama' }, [o.neden])])]));
            if (bulunan === hedefSay) setTimeout(bitti, 900);
          } else {
            hata++;
            b.classList.add('salla'); setTimeout(function () { b.classList.remove('salla'); }, 450);
            mesaj.appendChild(el('div', { class: 'geri-bildirim bak' }, [robot(), el('div', {}, [o.ad + ' değil.', el('span', { class: 'aciklama' }, [o.neden])])]));
          }
        });
        sahne.appendChild(b);
      });
      oyun.appendChild(sahne);
      oyun.appendChild(mesaj);
      function bitti() {
        mesaj.innerHTML = '';
        mesaj.appendChild(el('div', { class: 'sonuc' }, [
          el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [yildizlar(Math.max(1, 5 - hata), 5)]),
          el('div', { class: 'buyuk' }, ['Hepsini buldun!']),
          el('p', {}, [ayar.son]),
          el('button', { class: 'secim sari', type: 'button', onclick: ciz }, ['Yeniden oyna'])
        ]));
      }
    }
    ciz();
  }

  // Sırala: kartları sürükleyip numaralı yuvalara diz, sonra kontrol et.
  // ayar = { soru, adimlar:[{emoji, ad}] (doğru sırada), son }
  function sirala(kutu, ayar) {
    function ciz() {
      kutu.innerHTML = '';
      var oyun = el('div', { class: 'oyun srl' });
      kutu.appendChild(oyun);
      oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, [ayar.soru]), el('span', { class: 'ilerleme' }, [ayar.adimlar.length + ' adım'])]));
      var tepsi = el('div', { class: 'sb-tepsi' });
      var yuvalar = el('div', { class: 'srl-yuvalar', style: 'grid-template-columns:repeat(' + ayar.adimlar.length + ',minmax(0,1fr))' });
      var mesaj = el('div', { class: 'sb-mesaj', 'aria-live': 'polite' });
      var yuvaEl = ayar.adimlar.map(function (_, i) {
        var y = el('div', { class: 'srl-yuva', 'data-i': i }, [el('span', { class: 'srl-no' }, [String(i + 1)])]);
        yuvalar.appendChild(y); return y;
      });
      function parcaYap(o, idx) {
        var p = el('div', { class: 'sb-parca', tabindex: '0', role: 'button', 'data-idx': idx, 'aria-label': o.ad }, [el('span', { class: 'resim', 'aria-hidden': 'true' }, [o.emoji]), el('span', {}, [o.ad])]);
        var bas = null;
        p.addEventListener('pointerdown', function (e) { e.preventDefault(); p.setPointerCapture(e.pointerId); var r = p.getBoundingClientRect(); bas = { x: e.clientX, y: e.clientY, olcek: r.width / p.offsetWidth || 1 }; p.classList.add('tutuluyor'); });
        p.addEventListener('pointermove', function (e) {
          if (!bas) return;
          p.style.transform = 'translate(' + (e.clientX - bas.x) / bas.olcek + 'px,' + (e.clientY - bas.y) / bas.olcek + 'px) scale(1.06)';
          yuvaEl.forEach(function (y) { var r = y.getBoundingClientRect(); y.classList.toggle('uzerinde', e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom); });
        });
        function birak(e) {
          if (!bas) return; bas = null; p.classList.remove('tutuluyor'); p.style.transform = '';
          var hedef = null;
          yuvaEl.forEach(function (y) { var r = y.getBoundingClientRect(); y.classList.remove('uzerinde'); if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) hedef = y; });
          if (!hedef) { tepsi.appendChild(p); return; }
          var eski = hedef.querySelector('.sb-parca');
          if (eski && eski !== p) (p.parentNode.classList.contains('srl-yuva') ? p.parentNode : tepsi).appendChild(eski);
          hedef.appendChild(p);
          if (window.YZO && window.YZO.ses) window.YZO.ses.efekt('tik');
        }
        p.addEventListener('pointerup', birak); p.addEventListener('pointercancel', birak);
        p.addEventListener('keydown', function (e) {
          if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault();
          var bos = yuvaEl.filter(function (y) { return !y.querySelector('.sb-parca'); })[0];
          if (bos) bos.appendChild(p);
        });
        return p;
      }
      karistir(ayar.adimlar.map(function (o, i) { return [o, i]; }), Math.random).forEach(function (x) { tepsi.appendChild(parcaYap(x[0], x[1])); });
      oyun.appendChild(tepsi);
      oyun.appendChild(yuvalar);
      oyun.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { type: 'button', class: 'secim mavi', onclick: function () {
        mesaj.innerHTML = '';
        var dolu = yuvaEl.every(function (y) { return y.querySelector('.sb-parca'); });
        if (!dolu) { mesaj.appendChild(el('div', { class: 'geri-bildirim bak' }, [robot(), el('div', {}, ['Önce bütün kartları yerleştir.'])])); return; }
        var yanlis = yuvaEl.filter(function (y, i) { var ok = Number(y.querySelector('.sb-parca').dataset.idx) === i; y.classList.toggle('dogru', ok); y.classList.toggle('yanlis', !ok); return !ok; }).length;
        if (yanlis === 0) {
          mesaj.appendChild(el('div', { class: 'geri-bildirim dogru' }, [robot(), el('div', {}, ['Doğru sıra!', el('span', { class: 'aciklama' }, [ayar.son])])]));
          mesaj.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: ciz }, ['Yeniden oyna'])]));
        } else {
          mesaj.appendChild(el('div', { class: 'geri-bildirim bak' }, [robot(), el('div', {}, [yanlis + ' kart yanlış yerde.', el('span', { class: 'aciklama' }, ['Kırmızı yuvalardaki kartlara bak. Önce ne yapılır?'])])]));
        }
      } }, ['ARF, kontrol et!'])]));
      oyun.appendChild(mesaj);
    }
    ciz();
  }

  return { sahnedeBul: sahnedeBul, sirala: sirala, surukleBirak: surukleBirak, kartOyunu: kartOyunu, kaydet: kaydet, baslat: baslat, el: el, tohum: tohum, karistir: karistir, robot: robot, yildizlar: yildizlar, sayili: sayili };
})());
