// YZO-İ1-4.1 Adil ARF — ARF topu yalnız kırmızı ayakkabılılara veriyor. Neden? Düzelt.
// ARF, eğitim defterinde gördüğü ayakkabı renklerine top verir. Çocuk deftere örnek ekler.
YZO.kaydet('i1-4-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var RENKLER = {
    kirmizi: { ad: 'kırmızı', renk: '#D9455F' },
    mavi: { ad: 'mavi', renk: '#2A8FBD' },
    yesil: { ad: 'yeşil', renk: '#3FA35B' }
  };
  var COCUKLAR = [
    { ad: 'Ece', renk: 'kirmizi', emoji: '👧' }, { ad: 'Can', renk: 'mavi', emoji: '👦' },
    { ad: 'Zeynep', renk: 'yesil', emoji: '👧' }, { ad: 'Ali', renk: 'kirmizi', emoji: '👦' },
    { ad: 'Elif', renk: 'mavi', emoji: '👧' }, { ad: 'Mert', renk: 'yesil', emoji: '👦' }
  ];
  var defter, asama;
  function sifirla() { defter = { kirmizi: 5, mavi: 0, yesil: 0 }; asama = 'oyku'; }
  sifirla();

  function topAlir(c) { return defter[c.renk] > 0; }

  function cocukKart(c) {
    var alir = topAlir(c);
    return el('div', { class: 'sinav-kart ' + (alir ? 'dogru' : 'yanlis') }, [
      el('span', { class: 'resim', 'aria-hidden': 'true' }, [c.emoji]),
      el('span', {}, [c.ad]),
      el('span', { class: 'tahmin' }, [el('i', { class: 'renk', style: 'display:inline-block;width:12px;height:12px;border-radius:50%;border:2px solid #1F2A48;vertical-align:middle;margin-right:4px;background:' + RENKLER[c.renk].renk }), RENKLER[c.renk].ad]),
      el('span', { class: 'tahmin', style: 'font-size:1.4rem' }, [alir ? '⚽' : '—'])
    ]);
  }

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    var alan = COCUKLAR.filter(topAlir).length;
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, [asama === 'oyku' ? 'ARF bahçede top dağıtıyor' : 'ARF\'ın defterini düzelt']),
      el('span', { class: 'ilerleme' }, [alan + ' / ' + COCUKLAR.length + ' çocuk top aldı'])
    ]));
    var sahne = el('div', { class: 'sahne' });
    var sira = el('div', { class: 'sinav-sira' });
    COCUKLAR.forEach(function (c) { sira.appendChild(cocukKart(c)); });
    sahne.appendChild(sira);

    if (asama === 'oyku') {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, [
        'Bu adil mi? Kimler top alamadı?',
        el('span', { class: 'aciklama' }, ['ARF\'ın neden böyle yaptığını bulmak için defterine bak.'])
      ])]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { asama = 'defter'; ciz(); } }, ['ARF\'ın defterini aç'])
      ]));
    } else {
      sahne.appendChild(el('div', { class: 'robot-defter' }, [Y.robot(), el('div', {}, [
        el('span', { class: 'sayac' }, ['ARF\'a öğretirken gösterilen örnekler']),
        el('span', { class: 'kucuk' }, [Object.keys(RENKLER).map(function (r) { return defter[r] + ' ' + RENKLER[r].ad + ' ayakkabılı çocuk'; }).join(', ')])
      ])]));
      var butonlar = el('div', { class: 'etiketler' });
      Object.keys(RENKLER).forEach(function (r) {
        butonlar.appendChild(el('button', { class: 'secim', type: 'button', style: 'border-color:' + RENKLER[r].renk, onclick: function () { defter[r]++; ciz(); } },
          ['+ ' + RENKLER[r].ad + ' ayakkabılı örnek']));
      });
      sahne.appendChild(butonlar);
      var adil = alan === COCUKLAR.length;
      sahne.appendChild(el('div', { class: 'geri-bildirim ' + (adil ? 'dogru' : 'bak') }, [Y.robot(), el('div', {}, [
        adil ? 'Artık herkes top alıyor!' : 'ARF hep kırmızı ayakkabılı örnek görmüş.',
        el('span', { class: 'aciklama' }, [adil
          ? 'ARF kötü değildi; eksik örnek görmüştü. Örnekleri çeşitlendirince adil oldu.'
          : 'Ona başka renklerden de örnek göster. Hangi renkler eksik?'])
      ])]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim gri', type: 'button', onclick: function () { sifirla(); ciz(); } }, ['Baştan'])
      ]));
    }
    oyun.appendChild(sahne);
  }
  ciz();
});
