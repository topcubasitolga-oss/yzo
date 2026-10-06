// OÖ 4. hafta, Oyun 2: İkisinden hangisi kendi karar verir?
YZO.kaydet('oo-1-3-hangisi', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'İkisinden hangisi kendi karar verir?',
    secenekler: [
      { deger: 'sol', etiket: 'Soldaki', ikon: '👈', sinif: 'yesil' },
      { deger: 'sag', etiket: 'Sağdaki', ikon: '👉', sinif: 'mavi' }
    ],
    kartlar: [
      { emoji: '🤖  ·  🔊', ad: 'Kurmalı robot  ·  Sesli asistan', cevap: 'sag', neden: 'Sesli asistan robota benzemez ama seni dinler ve cevap verir.' },
      { emoji: '🧹  ·  🧺', ad: 'Süpürge robotu  ·  Süpürge', cevap: 'sol', neden: 'Süpürge robotu odada kendi gezer. Süpürgeyi biz kullanırız.' },
      { emoji: '📷  ·  📱', ad: 'Eski fotoğraf makinesi  ·  Yüz tanıyan telefon', cevap: 'sag', neden: 'Telefon yüzünü tanır. Eski makine yalnız fotoğraf çeker.' },
      { emoji: '🚗  ·  🚂', ad: 'Kendi giden araba  ·  Kurmalı tren', cevap: 'sol', neden: 'Kendi giden araba yolu görür. Kurmalı tren hep aynı rayda gider.' }
    ],
    son: 'Görünüşü robota benzese de benzemese de, kendi karar veren makine akıllıdır.'
  });
});
