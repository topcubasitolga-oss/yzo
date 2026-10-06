// OÖ 7. hafta, Oyun 1: Mahallede yapay zekâ avı (sahnede bul)
YZO.kaydet('oo-1-6-mahalle', function (kutu, Y) {
  'use strict';
  Y.sahnedeBul(kutu, {
    soru: 'Mahallede kendi karar veren makineleri bul, dokun!',
    sahne: 'mahalle',
    ogeler: [
      { emoji: '🚗', ad: 'Yol bulan araba', x: 20, y: 82, dogru: true, neden: 'Yolu görür ve en kısa yolu bulur.' },
      { emoji: '📷', ad: 'Kameralı kapı zili', x: 12, y: 50, dogru: true, neden: 'Kapıya geleni görür.' },
      { emoji: '🛒', ad: 'Meyveyi tanıyan kasa', x: 72, y: 50, dogru: true, neden: 'Meyveye bakıp ne olduğunu tanır.' },
      { emoji: '🗺️', ad: 'Yol tarifi veren harita', x: 43, y: 86, dogru: true, neden: 'Nereye gideceğini duyar, yolu gösterir.' },
      { emoji: '🚦', ad: 'Trafik ışığı', x: 31, y: 56, dogru: false, neden: 'Saatine göre yanar; seni görmez.' },
      { emoji: '🚌', ad: 'Otobüs', x: 60, y: 80, dogru: false, neden: 'Otobüsü şoför kullanır.' },
      { emoji: '🌳', ad: 'Ağaç', x: 50, y: 52, dogru: false, neden: 'Ağaç bir canlıdır, makine değil.' },
      { emoji: '⚽', ad: 'Top', x: 88, y: 84, dogru: false, neden: 'Top kendi kendine bir şey yapmaz.' }
    ],
    son: 'Mahallemizde de akıllı makineler var: yol bulan araba, kapı zili, kasa, harita.'
  });
});
