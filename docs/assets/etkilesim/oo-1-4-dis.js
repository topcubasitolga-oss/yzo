// OÖ 5. hafta, Oyun 1: Diş fırçalama tarifi (sırala)
YZO.kaydet('oo-1-4-dis', function (kutu, Y) {
  'use strict';
  Y.sirala(kutu, {
    soru: 'Diş fırçalama tarifi: Kartları doğru sıraya diz.',
    adimlar: [
      { emoji: '🪥', ad: 'Fırçanı al' },
      { emoji: '🧴', ad: 'Macunu sür' },
      { emoji: '😁', ad: 'Dişlerini fırçala' },
      { emoji: '💧', ad: 'Ağzını çalkala' }
    ],
    son: 'Bir tarifi sırayla yaparız. Bazı makineler de böyle çalışır: tarifi baştan sona takip eder.'
  });
});
