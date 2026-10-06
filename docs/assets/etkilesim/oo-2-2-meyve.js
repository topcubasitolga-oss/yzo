// OÖ 10. hafta, Oyun 2: Meyveleri ARF'ın defterine doğru etiketle koy (3 sayfa)
YZO.kaydet('oo-2-2-meyve', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'ARF meyveleri öğreniyor. Her meyveyi doğru sayfaya koy.',
    kutular: [
      { id: 'elma', ad: 'Elma', emoji: '🍎', sinif: 'kirmizi' },
      { id: 'muz', ad: 'Muz', emoji: '🍌', sinif: 'sarikutu' },
      { id: 'uzum', ad: 'Üzüm', emoji: '🍇', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🍏', ad: 'Yeşil elma', kutu: 'elma', neden: 'Yeşil de olsa elmadır!', ipucu: 'Rengi yeşil ama biçimi neye benziyor?' },
      { emoji: '🍎', ad: 'Kırmızı elma', kutu: 'elma', neden: 'Elma sayfasına.', ipucu: 'Bu meyve yuvarlak ve kırmızı.' },
      { emoji: '🍌', ad: 'Muz', kutu: 'muz', neden: 'Muz sayfasına.', ipucu: 'Uzun ve sarı meyve hangisi?' },
      { emoji: '🍇', ad: 'Mor üzüm', kutu: 'uzum', neden: 'Üzüm sayfasına.', ipucu: 'Salkım salkım olan meyve.' },
      { emoji: '🫐', ad: 'Küçük mor taneler', kutu: 'uzum', neden: 'Bunu üzüme benzettik. Dikkat: aslında yaban mersini! ARF de böyle karıştırabilir.', ipucu: 'Küçük, mor, yuvarlak taneler. Hangi meyveye benziyor?' },
      { emoji: '🍌', ad: 'Bir muz daha', kutu: 'muz', neden: 'Aynı meyveden bir örnek daha. ARF için iyi!', ipucu: 'Bunu daha önce gördük.' }
    ],
    son: 'ARF\'ın her sayfasında örnekler var. Ama bir meyveyi karıştırdık: yaban mersinini üzüm sayfasına koyduk! Defterde yanlış varsa ARF de yanlış öğrenir.'
  });
});
