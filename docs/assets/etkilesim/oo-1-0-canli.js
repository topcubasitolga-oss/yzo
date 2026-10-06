// YZO-OÖ-1.0 Oyun 2: Canlı mı, makine mi?
YZO.kaydet('oo-1-0-canli', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Canlı mı, makine mi? Doğru kutuya taşı.',
    kutular: [
      { id: 'canli', ad: 'Canlı', emoji: '🌱', sinif: 'yesil' },
      { id: 'makine', ad: 'Makine', emoji: '⚙️', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🐱', ad: 'Kedi', kutu: 'canli', neden: 'Kedi yer, büyür, uyur. Canlıdır.', ipucu: 'Kedi yemek yer mi, büyür mü?' },
      { emoji: '🤖', ad: 'ARF', kutu: 'makine', neden: 'ARF görür ve duyar ama yemek yemez, büyümez. ARF bir makine!', ipucu: 'ARF yemek yer mi? Büyür mü?' },
      { emoji: '🌻', ad: 'Ayçiçeği', kutu: 'canli', neden: 'Çiçek su içer, büyür. Canlıdır.', ipucu: 'Çiçek sulanınca ne olur?' },
      { emoji: '📱', ad: 'Tablet', kutu: 'makine', neden: 'Tablet şarj olur ama büyümez. Makinedir.', ipucu: 'Tablet büyüyüp kocaman olur mu?' },
      { emoji: '🐦', ad: 'Kuş', kutu: 'canli', neden: 'Kuş yer, uçar, yuva yapar. Canlıdır.', ipucu: 'Kuş yavru olur mu?' },
      { emoji: '🧹', ad: 'Süpürge robotu', kutu: 'makine', neden: 'Kendi gezer ama canlı değildir. Makinedir.', ipucu: 'Süpürge robotu acıkır mı?' },
      { emoji: '🧒', ad: 'Sen', kutu: 'canli', neden: 'Sen yersin, büyürsün, uyursun. Canlısın!', ipucu: 'Sen her yıl büyüyor musun?' },
      { emoji: '🚗', ad: 'Oyuncak araba', kutu: 'makine', neden: 'Pilli araba gider ama canlı değildir.', ipucu: 'Oyuncak araba yemek yer mi?' }
    ],
    son: 'Canlılar yer, büyür, uyur. ARF görür ve duyar ama yemez, büyümez, uyumaz. ARF bir makine.'
  });
});
