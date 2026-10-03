// YZO-OÖ-1.1 Akıllı mı, Değil mi? — sınıflama oyunu (okul öncesi)
// Kart tek tek gelir; çocuk iki büyük düğmeden birine dokunur. Okuma gerekmez: öğretmen adı okur.
YZO.kaydet('oo-1-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;

  var KARTLAR = [
    { emoji: '🧹', ad: 'Süpürge robotu', akilli: true,  neden: 'Duvara çarpınca kendi döner, odayı kendi bitirir.' },
    { emoji: '🧸', ad: 'Oyuncak ayı', akilli: false, neden: 'Sen sarılmazsan hiçbir şey yapmaz.' },
    { emoji: '🔊', ad: 'Sesli asistan', akilli: true,  neden: 'Söylediğini dinler, anlar, cevap verir.' },
    { emoji: '🚲', ad: 'Bisiklet', akilli: false, neden: 'Pedalı sen çevirirsin, yönü sen seçersin.' },
    { emoji: '📱', ad: 'Yüzünü tanıyan telefon', akilli: true,  neden: 'Yüzüne bakar, seni tanır, kilidi açar.' },
    { emoji: '✂️', ad: 'Makas', akilli: false, neden: 'Elinde olmadan kesmez.' },
    { emoji: '📺', ad: 'Çizgi film öneren tablet', akilli: true,  neden: 'Ne izlediğine bakar, yenisini kendi önerir.' },
    { emoji: '🚂', ad: 'Kurmalı tren', akilli: false, neden: 'Kurarsın, hep aynı rayda gider; önüne engel çıksa da durmaz.' }
  ];

  var sira = 0, dogru = 0;

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);

    if (sira >= KARTLAR.length) {
      oyun.appendChild(el('div', { class: 'sonuc' }, [
        el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [Y.yildizlar(Math.round(dogru / KARTLAR.length * 5), 5)]),
        el('div', { class: 'buyuk' }, [KARTLAR.length + ' karttan ' + Y.sayili(dogru) + ' doğru ayırdın']),
        el('p', {}, ['Kendi başına karar verenler bir şeyi görüp duyar ve ona göre davranır. Ötekiler bir insan olmadan hiçbir şey yapmaz.']),
        el('button', { class: 'secim sari', type: 'button', onclick: function () { sira = 0; dogru = 0; ciz(); } }, ['Yeniden oyna'])
      ]));
      return;
    }

    var k = KARTLAR[sira];
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['Kendi başına karar verebilir mi?']),
      el('span', { class: 'ilerleme' }, ['Kart ' + (sira + 1) + ' / ' + KARTLAR.length])
    ]));

    var sahne = el('div', { class: 'sahne' });
    sahne.appendChild(el('div', { class: 'kart' }, [
      el('div', { class: 'resim', 'aria-hidden': 'true' }, [k.emoji]),
      el('div', { class: 'ad' }, [k.ad])
    ]));

    var secimler = el('div', { class: 'secimler' });
    var cevapla = function (secilen) {
      var dogruMu = secilen === k.akilli;
      if (dogruMu) dogru++;
      secimler.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      var gb = el('div', { class: 'geri-bildirim ' + (dogruMu ? 'dogru' : 'bak') }, [
        Y.robot(),
        el('div', {}, [
          dogruMu ? 'Doğru!' : 'Bir daha bak.',
          el('span', { class: 'aciklama' }, [(k.akilli ? 'Kendi başına karar verir. ' : 'Biri kullanmalı. ') + k.neden])
        ])
      ]);
      sahne.appendChild(gb);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { sira++; ciz(); } }, [sira + 1 < KARTLAR.length ? 'Sıradaki kart' : 'Sonucu gör'])
      ]));
      gb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    secimler.appendChild(el('button', { class: 'secim yesil', type: 'button', onclick: function () { cevapla(true); } }, [
      el('span', { class: 'ikon', 'aria-hidden': 'true' }, ['✓']), 'Kendi başına karar verir'
    ]));
    secimler.appendChild(el('button', { class: 'secim gri', type: 'button', onclick: function () { cevapla(false); } }, [
      el('span', { class: 'ikon', 'aria-hidden': 'true' }, ['✋']), 'Biri kullanmalı'
    ]));
    sahne.appendChild(secimler);
    oyun.appendChild(sahne);
  }

  ciz();
});
