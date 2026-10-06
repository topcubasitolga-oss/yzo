// OÖ 13. hafta, Oyun 1: Sıradaki ne? (örüntü)
YZO.kaydet('oo-2-5-oruntu', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'ARF örüntü buluyor. Sıradaki ne?',
    secenekler: [
      { deger: 'a', etiket: 'Birinci', ikon: '1️⃣', sinif: 'yesil' },
      { deger: 'b', etiket: 'İkinci', ikon: '2️⃣', sinif: 'mavi' },
      { deger: 'c', etiket: 'Üçüncü', ikon: '3️⃣', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🍎 🍌 🍎 🍌 🍎 ❓', ad: 'Seçenekler: 1. 🍌   2. 🍎   3. 🍇', cevap: 'a', neden: 'Elma, muz, elma, muz… Sırada muz var!' },
      { emoji: '🔴 🔴 🔵 🔴 🔴 ❓', ad: 'Seçenekler: 1. 🔴   2. 🔵   3. 🟢', cevap: 'b', neden: 'İki kırmızı, bir mavi… Sırada mavi var!' },
      { emoji: '🐱 🐶 🐦 🐱 🐶 ❓', ad: 'Seçenekler: 1. 🐱   2. 🐶   3. 🐦', cevap: 'c', neden: 'Kedi, köpek, kuş… Sırada kuş var!' },
      { emoji: '☀️ 🌙 ☀️ 🌙 ☀️ ❓', ad: 'Seçenekler: 1. 🌙   2. ⭐   3. ☀️', cevap: 'a', neden: 'Gündüz, gece, gündüz, gece… Sırada gece var!' }
    ],
    son: 'ARF örneklere bakıp tekrar eden şeyi (örüntüyü) bulur. Biz de bulduk!'
  });
});
