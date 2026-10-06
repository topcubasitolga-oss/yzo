// OÖ 3. hafta, Oyun 1: Evde akıllı makineleri bul (sahnede bul)
YZO.kaydet('oo-1-2-ev', function (kutu, Y) {
  'use strict';
  Y.sahnedeBul(kutu, {
    soru: 'Evde kendi başına karar veren makineleri bul, dokun!',
    sahne: 'ev',
    ogeler: [
      { emoji: '🔊', ad: 'Sesli asistan', x: 60, y: 33, dogru: true, neden: 'Sorunu dinler, cevap verir.' },
      { emoji: '📺', ad: 'Çizgi film öneren televizyon', x: 80, y: 20, dogru: true, neden: 'Ne izlediğine bakar, yenisini önerir.' },
      { emoji: '🧹', ad: 'Süpürge robotu', x: 45, y: 86, dogru: true, neden: 'Odada kendi gezer, eşyalara çarpmadan döner.' },
      { emoji: '📱', ad: 'Yüz tanıyan telefon', x: 28, y: 50, dogru: true, neden: 'Yüzüne bakar, seni tanır.' },
      { emoji: '🧸', ad: 'Oyuncak ayı', x: 14, y: 50, dogru: false, neden: 'Oyuncak ayı kendi kendine bir şey yapmaz.' },
      { emoji: '⏰', ad: 'Çalar saat', x: 87, y: 33, dogru: false, neden: 'Hep aynı saatte çalar; seni görmez, karar vermez.' },
      { emoji: '🪴', ad: 'Saksı çiçeği', x: 14, y: 22, dogru: false, neden: 'Çiçek bir canlıdır, makine değil.' },
      { emoji: '💡', ad: 'Lamba', x: 92, y: 62, dogru: false, neden: 'Düğmeye basınca yanar; kendi karar vermez.' }
    ],
    son: 'Evimizde dört akıllı makine bulduk. Hepsi görür ya da duyar, sonra karar verir.'
  });
});
