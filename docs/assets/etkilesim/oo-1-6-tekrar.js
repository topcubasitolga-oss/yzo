// OÖ 7. hafta, Oyun 2: Evde ve sokakta: akıllı mı, değil mi?
YZO.kaydet('oo-1-6-tekrar', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Evde ve sokakta: kendi karar verir mi?',
    kutular: [
      { id: 'evet', ad: 'Kendi karar verir', emoji: '✓', sinif: 'yesil' },
      { id: 'hayir', ad: 'Vermez', emoji: '✋', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🗺️', ad: 'Yol tarifi veren harita', kutu: 'evet', neden: 'Yolu kendi bulur.', ipucu: 'Harita sana yolu gösteriyor mu?' },
      { emoji: '🚦', ad: 'Trafik ışığı', kutu: 'hayir', neden: 'Saatine göre yanar.', ipucu: 'Trafik ışığı seni görüyor mu?' },
      { emoji: '🔊', ad: 'Sesli asistan', kutu: 'evet', neden: 'Dinler, cevap verir.', ipucu: 'Sesli asistan soruna ne yapıyor?' },
      { emoji: '🛝', ad: 'Kaydırak', kutu: 'hayir', neden: 'Kaydırak bir oyun aletidir.', ipucu: 'Kaydırak bir şey görüyor mu?' },
      { emoji: '🛒', ad: 'Meyveyi tanıyan kasa', kutu: 'evet', neden: 'Meyveyi görüp tanır.', ipucu: 'Kasa meyvenin adını nasıl biliyor?' },
      { emoji: '🚲', ad: 'Bisiklet', kutu: 'hayir', neden: 'Pedalı sen çevirirsin.', ipucu: 'Bisiklet sen binmeden gider mi?' }
    ],
    son: 'Akıllı makineler evde de sokakta da var. Onları ne yaptıklarından tanırız.'
  });
});
