// OÖ 9. hafta, Oyun 2: Kedi mi, köpek mi? ARF'ın defterine doğru etiketle koy.
YZO.kaydet('oo-2-1-etiket', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'ARF\'ın defteri: Her resmi doğru sayfaya koy.',
    kutular: [
      { id: 'kedi', ad: 'Kedi sayfası', emoji: '🐱', sinif: 'yesil' },
      { id: 'kopek', ad: 'Köpek sayfası', emoji: '🐶', sinif: 'kirmizi' }
    ],
    ogeler: [
      { emoji: '🐈', ad: 'Sarman kedi', kutu: 'kedi', neden: 'Kedi sayfasına! ARF bir kedi daha öğrendi.', ipucu: 'Bu hayvan miyavlar mı, havlar mı?' },
      { emoji: '🐕', ad: 'Kahverengi köpek', kutu: 'kopek', neden: 'Köpek sayfasına!', ipucu: 'Bu hayvan havlar mı?' },
      { emoji: '🐈‍⬛', ad: 'Kara kedi', kutu: 'kedi', neden: 'Kara kedi de kedidir!', ipucu: 'Rengi farklı ama ne hayvanı?' },
      { emoji: '🐩', ad: 'Kıvırcık köpek', kutu: 'kopek', neden: 'Kıvırcık tüylü de olsa köpektir.', ipucu: 'Tüyleri kıvırcık ama havlar mı?' },
      { emoji: '😺', ad: 'Gülen kedi', kutu: 'kedi', neden: 'Kedi sayfasına!', ipucu: 'Bıyıklarına bak.' },
      { emoji: '🦮', ad: 'Rehber köpek', kutu: 'kopek', neden: 'Rehber köpek de köpektir.', ipucu: 'Bu hayvan insanlara yol gösterir. Kedi mi, köpek mi?' }
    ],
    son: 'ARF\'ın defterine doğru etiketle örnekler koyduk. Defter doldukça ARF daha iyi öğrenir.'
  });
});
