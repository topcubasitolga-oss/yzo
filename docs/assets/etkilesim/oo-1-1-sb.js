// YZO-OÖ-1.1 Oyun 1: Akıllı mı, Değil mi? — sürükle-bırak (akıllı tahta)
YZO.kaydet('oo-1-1-sb', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Kendi başına karar verebilir mi? Doğru kutuya taşı.',
    kutular: [
      { id: 'evet', ad: 'Kendi başına karar verir', emoji: '✓', sinif: 'yesil' },
      { id: 'hayir', ad: 'Biri kullanmalı', emoji: '✋', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🧹', ad: 'Süpürge robotu', kutu: 'evet', neden: 'Duvara çarpınca kendi döner.', ipucu: 'Süpürge robotu duvara çarpınca ne yapıyordu?' },
      { emoji: '🧸', ad: 'Oyuncak ayı', kutu: 'hayir', neden: 'Sen sarılmazsan hiçbir şey yapmaz.', ipucu: 'Oyuncak ayı kendi kendine bir şey yapar mı?' },
      { emoji: '🔊', ad: 'Sesli asistan', kutu: 'evet', neden: 'Seni dinler, cevap verir.', ipucu: 'Sesli asistan sen konuşunca ne yapar?' },
      { emoji: '🚲', ad: 'Bisiklet', kutu: 'hayir', neden: 'Pedalı sen çevirirsin.', ipucu: 'Bisiklet sen binmeden gider mi?' },
      { emoji: '📱', ad: 'Yüzünü tanıyan telefon', kutu: 'evet', neden: 'Yüzüne bakar, seni tanır.', ipucu: 'Telefon yüzüne bakınca ne yapıyor?' },
      { emoji: '✂️', ad: 'Makas', kutu: 'hayir', neden: 'Elinde olmadan kesmez.', ipucu: 'Makas kendi kendine keser mi?' },
      { emoji: '📺', ad: 'Çizgi film öneren tablet', kutu: 'evet', neden: 'Ne izlediğine bakar, yenisini önerir.', ipucu: 'Tablet sana yeni çizgi filmi kim önerdi?' },
      { emoji: '🚂', ad: 'Kurmalı tren', kutu: 'hayir', neden: 'Hep aynı yolda gider; engel görse de durmaz.', ipucu: 'Kurmalı tren önüne bir şey çıkınca durur mu?' }
    ],
    son: 'Kendi başına karar verenler bir şeyi görür ya da duyar, sonra ona göre davranır.'
  });
});
