// OÖ 14. hafta, Oyun 2: Doğru sayfaya koy (3 sayfa: kedi, köpek, kuş)
YZO.kaydet('oo-2-6-sayfa', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Etiketleri biz koyuyoruz: Her hayvanı doğru sayfaya taşı.',
    kutular: [
      { id: 'kedi', ad: 'Kedi', emoji: '🐱', sinif: 'yesil' },
      { id: 'kopek', ad: 'Köpek', emoji: '🐶', sinif: 'kirmizi' },
      { id: 'kus', ad: 'Kuş', emoji: '🐦', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🐈', ad: 'Sarman', kutu: 'kedi', neden: 'Kedi sayfasına.', ipucu: 'Miyavlar mı?' },
      { emoji: '🦜', ad: 'Papağan', kutu: 'kus', neden: 'Papağan bir kuştur.', ipucu: 'Kanatları var mı?' },
      { emoji: '🐕', ad: 'Karabaş', kutu: 'kopek', neden: 'Köpek sayfasına.', ipucu: 'Havlar mı?' },
      { emoji: '🕊️', ad: 'Güvercin', kutu: 'kus', neden: 'Güvercin bir kuştur.', ipucu: 'Uçar mı?' },
      { emoji: '🐩', ad: 'Pamuk', kutu: 'kopek', neden: 'Kıvırcık ama köpek.', ipucu: 'Havlar mı?' },
      { emoji: '🐈‍⬛', ad: 'Gece', kutu: 'kedi', neden: 'Kara kedi de kedidir.', ipucu: 'Bıyıklarına bak.' }
    ],
    son: 'Her örnek doğru sayfada! Doğru etiket, doğru öğrenen ARF demek.'
  });
});
