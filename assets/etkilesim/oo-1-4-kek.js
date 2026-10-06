// OÖ 5. hafta, Oyun 2: Kek tarifi (sırala)
YZO.kaydet('oo-1-4-kek', function (kutu, Y) {
  'use strict';
  Y.sirala(kutu, {
    soru: 'ARF kek yapmak istiyor. Tarifi doğru sıraya diz.',
    adimlar: [
      { emoji: '🥚', ad: 'Malzemeleri kaba koy' },
      { emoji: '🥄', ad: 'Karıştır' },
      { emoji: '🔥', ad: 'Fırına koy' },
      { emoji: '🍰', ad: 'Afiyetle ye' }
    ],
    son: 'Tarif sırası değişirse kek olmaz! Fırın tarifi takip eder. ARF ise örneklerden öğrenebilir; bunu gelecek ünitede göreceğiz.'
  });
});
