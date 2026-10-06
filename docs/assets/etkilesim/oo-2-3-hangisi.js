// OÖ 11. hafta, Oyun 2: Hangi ARF daha iyi bilir? (az örnek / çok örnek)
YZO.kaydet('oo-2-3-hangisi', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'Hangi ARF daha iyi bilir?',
    secenekler: [
      { deger: 'sol', etiket: 'Soldaki ARF', ikon: '👈', sinif: 'yesil' },
      { deger: 'sag', etiket: 'Sağdaki ARF', ikon: '👉', sinif: 'mavi' }
    ],
    kartlar: [
      { emoji: '🐱  ·  🐱🐱🐱🐱🐱', ad: '1 kedi gördü  ·  5 kedi gördü', cevap: 'sag', neden: 'Çok örnek gören ARF daha iyi bilir.' },
      { emoji: '🍎🍎🍎🍎  ·  🍎', ad: '4 elma gördü  ·  1 elma gördü', cevap: 'sol', neden: 'Dört elma gören ARF daha çok öğrendi.' },
      { emoji: '🐶🐶🐶  ·  ', ad: '3 köpek gördü  ·  Hiç köpek görmedi', cevap: 'sol', neden: 'Hiç görmediği şeyi ARF bilemez.' },
      { emoji: '🌼  ·  🌼🌸🌻🌷', ad: '1 çiçek gördü  ·  4 farklı çiçek gördü', cevap: 'sag', neden: 'Hem çok hem farklı örnek gören ARF daha iyi bilir.' }
    ],
    son: 'Çok örnek, daha iyi ARF! Hiç görmediği bir şeyi ise ARF bilemez.'
  });
});
