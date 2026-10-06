// OÖ 14. hafta, Oyun 1: Bu etiket doğru mu?
YZO.kaydet('oo-2-6-dogru', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'ARF\'ın defterinde bu etiket doğru mu?',
    secenekler: [
      { deger: 'd', etiket: 'Doğru etiket', ikon: '✅', sinif: 'yesil' },
      { deger: 'y', etiket: 'Yanlış etiket', ikon: '❌', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🐶', ad: 'Etiket: "kedi"', cevap: 'y', neden: 'Bu bir köpek! Yanlış etiketle ARF köpeğe kedi demeyi öğrenir.' },
      { emoji: '🍎', ad: 'Etiket: "elma"', cevap: 'd', neden: 'Doğru etiket.' },
      { emoji: '🐟', ad: 'Etiket: "kuş"', cevap: 'y', neden: 'Bu bir balık! Etiketi düzeltmeliyiz.' },
      { emoji: '🌻', ad: 'Etiket: "çiçek"', cevap: 'd', neden: 'Doğru etiket.' },
      { emoji: '🚗', ad: 'Etiket: "otobüs"', cevap: 'y', neden: 'Bu bir araba. Otobüs daha büyüktür.' }
    ],
    son: 'Etiket yanlışsa ARF de yanlış öğrenir. Deftere koymadan önce etiketi kontrol ederiz.'
  });
});
