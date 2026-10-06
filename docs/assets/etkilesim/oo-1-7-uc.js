// OÖ 8. hafta (meydan okuma), Oyun 2: Canlı, makine, akıllı makine
YZO.kaydet('oo-1-7-uc', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Üç kutu var! Her kartı doğru kutuya taşı.',
    kutular: [
      { id: 'canli', ad: 'Canlı', emoji: '🌱', sinif: 'yesil' },
      { id: 'makine', ad: 'Makine', emoji: '⚙️', sinif: 'gri' },
      { id: 'akilli', ad: 'Akıllı makine', emoji: '🤖', sinif: 'kirmizi' }
    ],
    ogeler: [
      { emoji: '🐶', ad: 'Köpek', kutu: 'canli', neden: 'Köpek yer, büyür. Canlıdır.', ipucu: 'Köpek yemek yer mi?' },
      { emoji: '🤖', ad: 'ARF', kutu: 'akilli', neden: 'ARF görür, duyar, karar verir ama canlı değildir.', ipucu: 'ARF canlı mıydı?' },
      { emoji: '✂️', ad: 'Makas', kutu: 'makine', neden: 'Makas bir alettir, karar vermez.', ipucu: 'Makas kendi keser mi?' },
      { emoji: '🧹', ad: 'Süpürge robotu', kutu: 'akilli', neden: 'Engeli görür, kendi döner.', ipucu: 'Süpürge robotu duvara çarpınca ne yapar?' },
      { emoji: '🌻', ad: 'Ayçiçeği', kutu: 'canli', neden: 'Çiçek büyür. Canlıdır.', ipucu: 'Çiçek büyür mü?' },
      { emoji: '🚲', ad: 'Bisiklet', kutu: 'makine', neden: 'Bisikleti biz süreriz.', ipucu: 'Bisiklet kendi gider mi?' },
      { emoji: '🔊', ad: 'Sesli asistan', kutu: 'akilli', neden: 'Dinler, cevap verir.', ipucu: 'Sesli asistan bizi duyar mı?' },
      { emoji: '🧒', ad: 'Sen', kutu: 'canli', neden: 'Sen canlısın!', ipucu: 'Sen büyüyor musun?' }
    ],
    son: 'Canlılar yer ve büyür. Makineleri biz kullanırız. Akıllı makineler görür, duyar ve karar verir.'
  });
});
