// YZO-OÖ-3.1 ARF Masal Anlatıyor, Ama… — masaldaki yanlışı bul.
// Her sahnede üç resim; biri yanlış. Çocuk yanlışa dokunur.
YZO.kaydet('oo-3-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var SAHNELER = [
    { cumle: 'Ali pazara gitti, mavi bir muz aldı.', secenekler: [
      { emoji: '🧒', ad: 'Ali' }, { emoji: '🛒', ad: 'Pazar' }, { emoji: '🍌', ad: 'Muz', yanlis: true, renk: 'hue-rotate(180deg)' }],
      neden: 'Muz mavi olmaz! Sarı olur. ARF yanıldı, biz düzelttik.' },
    { cumle: 'Yolda gökyüzünde uçan bir koyun gördü.', secenekler: [
      { emoji: '🐑', ad: 'Koyun', yanlis: true, ucan: true }, { emoji: '🌳', ad: 'Ağaç' }, { emoji: '🏠', ad: 'Ev' }],
      neden: 'Koyunlar uçmaz! Çayırda otlar.' },
    { cumle: 'Gece oldu, gökyüzünde güneş parlıyordu.', secenekler: [
      { emoji: '⭐', ad: 'Yıldız' }, { emoji: '☀️', ad: 'Güneş', yanlis: true }, { emoji: '🌙', ad: 'Ay' }],
      neden: 'Gece güneş parlamaz! Gece Ay ve yıldızlar görünür.' },
    { cumle: 'Bahçedeki ağaçta bir balık yüzüyordu.', secenekler: [
      { emoji: '🐦', ad: 'Kuş' }, { emoji: '🍎', ad: 'Elma' }, { emoji: '🐟', ad: 'Balık', yanlis: true }],
      neden: 'Balık ağaçta yaşamaz! Suda yüzer.' }
  ];
  var sira = 0, bulunan = 0;

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    if (sira >= SAHNELER.length) {
      oyun.appendChild(el('div', { class: 'sonuc' }, [
        el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [Y.yildizlar(Math.round(bulunan / SAHNELER.length * 5), 5)]),
        el('div', { class: 'buyuk' }, ['ARF\'ın ' + SAHNELER.length + ' yanlışından ' + Y.sayili(bulunan) + ' ilk seferde buldun']),
        el('p', {}, ['ARF her şeyi bilmez, bazen yanılır. Yanlışı biz bulur, birlikte düzeltiriz.']),
        el('button', { class: 'secim sari', type: 'button', onclick: function () { sira = 0; bulunan = 0; ciz(); } }, ['Yeniden oyna'])
      ]));
      return;
    }
    var s = SAHNELER[sira], ilk = true;
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['ARF masal anlatıyor. Yanlış nerede?']),
      el('span', { class: 'ilerleme' }, ['Sahne ' + (sira + 1) + ' / ' + SAHNELER.length])
    ]));
    var sahne = el('div', { class: 'sahne' });
    sahne.appendChild(el('div', { class: 'robot-defter' }, [Y.robot(), el('span', { class: 'sayac' }, ['"' + s.cumle + '"'])]));
    var secimler = el('div', { class: 'secimler uclu' });
    var mesaj = el('div');
    s.secenekler.forEach(function (o) {
      var resim = el('span', { class: 'resim', 'aria-hidden': 'true', style: (o.renk ? 'filter:' + o.renk + ';' : '') + (o.ucan ? 'display:inline-block;transform:translateY(-14px) rotate(-12deg)' : '') }, [o.emoji]);
      var b = el('button', { class: 'meyve', type: 'button', onclick: function () {
        if (o.yanlis) {
          if (ilk) bulunan++;
          secimler.querySelectorAll('button').forEach(function (x) { x.disabled = true; });
          b.style.background = 'var(--cimen-acik)';
          mesaj.innerHTML = '';
          mesaj.appendChild(el('div', { class: 'geri-bildirim dogru' }, [Y.robot(), el('div', {}, ['ARF yanıldı!', el('span', { class: 'aciklama' }, [s.neden])])]));
          mesaj.appendChild(el('div', { class: 'alt-dugmeler' }, [
            el('button', { class: 'secim sari', type: 'button', onclick: function () { sira++; ciz(); } }, [sira + 1 < SAHNELER.length ? 'Masala devam' : 'Sonucu gör'])
          ]));
        } else {
          ilk = false;
          b.disabled = true;
          mesaj.innerHTML = '';
          mesaj.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, [o.ad + ' doğru. Başka bir resme bak.'])]));
        }
      } }, [resim, el('span', {}, [o.ad])]);
      secimler.appendChild(b);
    });
    sahne.appendChild(secimler);
    sahne.appendChild(mesaj);
    oyun.appendChild(sahne);
  }
  ciz();
});
