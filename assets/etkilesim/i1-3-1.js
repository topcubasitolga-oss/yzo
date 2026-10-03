// YZO-İ1-3.1 İnsan mı Yazdı, Makine mi? — kart çevir, tahmin et (1–2. sınıf)
// Altı kısa metin. Çocuk tahmin eder, kart çevrilir, ipucu görünür.
// Amaç: ipuçları var ama kesinlik yok; emin olmayınca sorarız.
YZO.kaydet('i1-3-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;

  var KARTLAR = [
    { metin: 'Dün parkta kardeşimle salıncağa bindik. Kardeşim düştü ama ağlamadı, dizine yaprak yapıştırdık.',
      kim: 'insan', ipucu: 'Küçük, kişisel bir ayrıntı var: dizine yaprak yapıştırmak. Böyle şeyleri yaşayan yazar.' },
    { metin: 'Park, çocuklar için eğlenceli bir yerdir. Parkta salıncak, kaydırak ve tahterevalli bulunur. Çocuklar parkta mutlu olur.',
      kim: 'makine', ipucu: 'Herkes için doğru, kimse için özel: genel cümleler. Makine böyle yazmayı sever, ama bir insan da yazabilir.' },
    { metin: 'Kedimizin adı Pamuk. Pamuk en çok babamın terliğinde uyur, bir de kutuların içinde.',
      kim: 'insan', ipucu: 'Bir isim ve tuhaf bir alışkanlık: terlikte uyumak. Makine Pamuk\'u tanımaz.' },
    { metin: 'Kediler sevimli ve bağımsız hayvanlardır. Uyumayı ve oynamayı severler. Kediler iyi bir evcil hayvan olabilir.',
      kim: 'makine', ipucu: 'Hiçbir kedi adı, hiçbir olay yok. Ders kitabı gibi.' },
    { metin: 'Bugün okulda çok güzel bir gün geçirdim. Arkadaşlarımla oyun oynadım ve öğretmenim bana yardım etti. Çok mutluyum.',
      kim: 'makine', ipucu: 'Kişisel gibi ama ayrıntı yok: hangi oyun, ne yardımı? Bu kart zor; makine de insan gibi yazabilir.' },
    { metin: 'Okulda top oynarken Mert\'in ayakkabısı çıkıp fırladı, hepimiz güldük, öğretmen bile güldü.',
      kim: 'insan', ipucu: 'Bir isim, bir olay, bir sürpriz. Böyle anıları yaşayan yazar.' }
  ];

  var sira = 0, dogru = 0;

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);

    if (sira >= KARTLAR.length) {
      oyun.appendChild(el('div', { class: 'sonuc' }, [
        el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [Y.yildizlar(Math.round(dogru / KARTLAR.length * 5), 5)]),
        el('div', { class: 'buyuk' }, [KARTLAR.length + ' karttan ' + Y.sayili(dogru) + ' bildin']),
        el('p', {}, ['Bazı kartlar zordu: makine de kişisel gibi yazabilir. İpuçlarına bakarız ama emin olamayınca sorarız: Kim yazdı? Nereden biliyor?']),
        el('button', { class: 'secim sari', type: 'button', onclick: function () { sira = 0; dogru = 0; ciz(); } }, ['Yeniden oyna'])
      ]));
      return;
    }

    var k = KARTLAR[sira];
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['Bunu kim yazdı?']),
      el('span', { class: 'ilerleme' }, ['Kart ' + (sira + 1) + ' / ' + KARTLAR.length])
    ]));

    var sahne = el('div', { class: 'sahne' });
    var kart = el('div', { class: 'kart' }, [el('p', { class: 'metin' }, [k.metin])]);
    sahne.appendChild(kart);

    var secimler = el('div', { class: 'secimler' });
    var cevapla = function (secilen) {
      var dogruMu = secilen === k.kim;
      if (dogruMu) dogru++;
      secimler.querySelectorAll('button').forEach(function (b) { b.disabled = true; });
      var cevrilmis = el('div', { class: 'cevrilmis' }, [
        el('div', { class: 'geri-bildirim ' + (dogruMu ? 'dogru' : 'bak') }, [
          Y.robot(),
          el('div', {}, [(dogruMu ? 'Doğru: ' : 'Değil: ') + (k.kim === 'insan' ? 'bunu bir insan yazdı.' : 'bunu bir makine yazdı.')])
        ]),
        el('div', { class: 'ipucu' }, [el('strong', {}, ['İpucu']), k.ipucu])
      ]);
      sahne.appendChild(cevrilmis);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { sira++; ciz(); } }, [sira + 1 < KARTLAR.length ? 'Sıradaki kart' : 'Sonucu gör'])
      ]));
      cevrilmis.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    secimler.appendChild(el('button', { class: 'secim yesil', type: 'button', onclick: function () { cevapla('insan'); } }, [
      el('span', { class: 'ikon', 'aria-hidden': 'true' }, ['🧒']), 'İnsan yazdı'
    ]));
    secimler.appendChild(el('button', { class: 'secim mavi', type: 'button', onclick: function () { cevapla('makine'); } }, [
      el('span', { class: 'ikon', 'aria-hidden': 'true' }, ['🤖']), 'Makine yazdı'
    ]));
    sahne.appendChild(secimler);
    oyun.appendChild(sahne);
  }

  ciz();
});
