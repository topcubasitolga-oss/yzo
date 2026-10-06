// OÖ 4. hafta, Oyun 1: Her robot akıllı mı? (sürükle-bırak)
YZO.kaydet('oo-1-3-robot', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Görünüşe değil, ne yaptığına bak! Kendi karar verir mi?',
    kutular: [
      { id: 'evet', ad: 'Kendi karar verir', emoji: '✓', sinif: 'yesil' },
      { id: 'hayir', ad: 'Hep aynı şeyi yapar', emoji: '🔁', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🤖', ad: 'Kurmalı oyuncak robot', kutu: 'hayir', neden: 'Robot gibi görünür ama hep aynı yürür, önündekini görmez.', ipucu: 'Bu oyuncak önüne duvar çıkınca durur mu?' },
      { emoji: '🧹', ad: 'Süpürge robotu', kutu: 'evet', neden: 'Engeli görür, kendi döner.', ipucu: 'Süpürge robotu duvara çarpınca ne yapıyordu?' },
      { emoji: '🔊', ad: 'Sesli asistan', kutu: 'evet', neden: 'Robota benzemez ama seni dinler, cevap verir. Akıllıdır!', ipucu: 'Sesli asistan robot gibi görünmüyor. Ama ne yapıyor?' },
      { emoji: '🦾', ad: 'Fabrika robot kolu', kutu: 'hayir', neden: 'Bütün gün aynı hareketi yapar; tarifini takip eder.', ipucu: 'Robot kolu her gün başka bir şey mi yapıyor?' },
      { emoji: '🧸', ad: 'Konuşan oyuncak ayı', kutu: 'hayir', neden: 'Düğmeye basınca hep aynı cümleyi söyler.', ipucu: 'Ayıya başka bir soru sorsan cevap verir mi?' },
      { emoji: '📱', ad: 'Yüz tanıyan telefon', kutu: 'evet', neden: 'Robota benzemez ama seni tanır. Akıllıdır!', ipucu: 'Telefon seni başkasından ayırabiliyor mu?' }
    ],
    son: 'Robot gibi görünen her şey akıllı değildir. Robota hiç benzemeyen bir telefon da akıllı olabilir. Görünüşe değil, ne yaptığına bakarız.'
  });
});
