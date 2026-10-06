// YZO-OÖ-2.1 ARF Kediyi Tanımıyor — örnek göster, ARF öğrensin, sonra sına.
// ARF'ın bilgisi: her hayvandan kaç örnek gördüğü. Az örnek → çok hata.
YZO.kaydet('oo-2-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var HAYVANLAR = {
    kedi: { ad: 'Kedi', resimler: ['🐱', '🐈', '🐈‍⬛', '😺'] },
    kopek: { ad: 'Köpek', resimler: ['🐶', '🐕', '🐩', '🦮'] }
  };
  var gordu = { kedi: 0, kopek: 0 };
  var deneme = 0, mesaj = null;

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    var toplam = gordu.kedi + gordu.kopek;
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['ARF\'a kedi ve köpek göster']),
      el('span', { class: 'ilerleme' }, ['ARF ' + toplam + ' örnek gördü'])
    ]));
    var sahne = el('div', { class: 'sahne' });
    sahne.appendChild(el('div', { class: 'robot-defter' }, [Y.robot(), el('div', {}, [
      el('span', { class: 'sayac' }, ['🐱 ' + gordu.kedi + '   🐶 ' + gordu.kopek]),
      el('span', { class: 'kucuk' }, [toplam === 0 ? 'ARF hiç kedi, hiç köpek görmedi. Bir resme dokun.' : 'Her dokunuş ARF\'a bir örnek gösterir.'])
    ])]));

    var tezgah = el('div', { class: 'tezgah' });
    ['kedi', 'kopek'].forEach(function (tur) {
      HAYVANLAR[tur].resimler.forEach(function (r) {
        tezgah.appendChild(el('button', { class: 'meyve', type: 'button', onclick: function () {
          gordu[tur]++; mesaj = null; ciz();
        } }, [el('span', { class: 'resim', 'aria-hidden': 'true' }, [r]), HAYVANLAR[tur].ad]));
      });
    });
    sahne.appendChild(tezgah);
    if (mesaj) sahne.appendChild(mesaj);
    sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
      el('button', { class: 'secim mavi', type: 'button', onclick: sina }, ['ARF\'u sına']),
      el('button', { class: 'secim gri', type: 'button', onclick: function () { gordu = { kedi: 0, kopek: 0 }; deneme = 0; mesaj = null; ciz(); } }, ['Baştan'])
    ]));
    oyun.appendChild(sahne);
  }

  function sina() {
    deneme++;
    var rnd = Y.tohum(77 + deneme * 13);
    var tur = rnd() < 0.5 ? 'kedi' : 'kopek';
    var resim = HAYVANLAR[tur].resimler[Math.floor(rnd() * 4)];
    var n = gordu[tur];
    var guven = n === 0 ? 0.3 : Math.min(0.97, 0.55 + 0.1 * n);
    var tahmin = rnd() < guven ? tur : (tur === 'kedi' ? 'kopek' : 'kedi');
    var ok = tahmin === tur;
    var aciklama = ok
      ? (n === 0 ? 'ARF hiç ' + HAYVANLAR[tur].ad.toLowerCase() + ' görmedi; yazı tura gibi tahmin etti. Şans eseri bildi!' : n >= 4 ? 'Çok örnek gördüğü için bildi.' : 'Bildi! Ama az örnek gördü; şansı da olabilir. Bir daha sına.')
      : (n === 0 ? 'ARF hiç ' + HAYVANLAR[tur].ad.toLowerCase() + ' görmedi. Nasıl bilsin? Ona örnek göster.' : 'ARF yalnız ' + n + ' ' + HAYVANLAR[tur].ad.toLowerCase() + ' gördü. Daha çok örnek göster.');
    mesaj = el('div', { class: 'geri-bildirim ' + (ok ? 'dogru' : 'bak') }, [
      el('span', { style: 'font-size:3rem;line-height:1', 'aria-hidden': 'true' }, [resim]),
      el('div', {}, ['ARF: "Bu bir ' + HAYVANLAR[tahmin].ad.toLowerCase() + '!" ' + (ok ? '✓' : '✗'), el('span', { class: 'aciklama' }, [aciklama])])
    ]);
    ciz();
  }
  ciz();
});
