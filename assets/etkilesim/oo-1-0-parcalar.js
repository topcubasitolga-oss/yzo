// YZO-OÖ-1.0 Oyun 1: Kim ne yapar? — bizim gözümüz ve ARF'ın kamerası aynı işi görür.
YZO.kaydet('oo-1-0-parcalar', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Bu parça ne işe yarar? Doğru kutuya taşı.',
    kutular: [
      { id: 'gorur', ad: 'Görür', emoji: '👀', sinif: 'yesil' },
      { id: 'duyar', ad: 'Duyar', emoji: '👂', sinif: 'kirmizi' },
      { id: 'hatirlar', ad: 'Hatırlar', emoji: '📒', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '👁️', ad: 'Senin gözün', kutu: 'gorur', neden: 'Gözümüzle görürüz.', ipucu: 'Gözlerini kapatınca ne yapamazsın?' },
      { emoji: '📷', ad: 'ARF\'ın kamerası', kutu: 'gorur', neden: 'ARF kamerasıyla görür. Kamera, ARF\'ın gözüdür.', ipucu: 'ARF kamerasıyla ne yapıyordu?' },
      { emoji: '👂', ad: 'Senin kulağın', kutu: 'duyar', neden: 'Kulağımızla duyarız.', ipucu: 'Şarkıyı neyle dinleriz?' },
      { emoji: '🎤', ad: 'ARF\'ın mikrofonu', kutu: 'duyar', neden: 'ARF mikrofonuyla duyar. Mikrofon, ARF\'ın kulağıdır.', ipucu: 'ARF sesimizi neyle dinliyor?' },
      { emoji: '🧠', ad: 'Senin aklın', kutu: 'hatirlar', neden: 'Öğrendiklerimizi aklımızda tutarız.', ipucu: 'Dün ne yediğini neyle hatırlıyorsun?' },
      { emoji: '📒', ad: 'ARF\'ın defteri', kutu: 'hatirlar', neden: 'ARF öğrendiklerini defterine yazar.', ipucu: 'ARF öğrendiklerini nereye yazıyordu?' }
    ],
    son: 'Biz gözümüzle görürüz, ARF kamerasıyla. Biz kulağımızla duyarız, ARF mikrofonuyla. Ama ARF canlı değil; o bir makine.'
  });
});
