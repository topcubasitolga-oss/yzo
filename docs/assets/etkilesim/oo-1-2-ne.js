// OÖ 3. hafta, Oyun 2: Bu makine ne yapıyor? Görüyor, duyuyor ya da öneriyor
YZO.kaydet('oo-1-2-ne', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'Bu akıllı makine ne yapıyor?',
    secenekler: [
      { deger: 'gor', etiket: 'Görüyor', ikon: '👀', sinif: 'yesil' },
      { deger: 'duy', etiket: 'Duyuyor', ikon: '👂', sinif: 'mavi' },
      { deger: 'oner', etiket: 'Öneriyor', ikon: '💡', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '📱', ad: 'Telefon yüzüne bakıp kilidi açıyor', cevap: 'gor', neden: 'Kamerasıyla yüzünü görüyor.' },
      { emoji: '🔊', ad: 'Sesli asistan "Şarkı aç" deyince şarkı açıyor', cevap: 'duy', neden: 'Mikrofonuyla sesini duyuyor.' },
      { emoji: '📺', ad: 'Tablet yeni bir çizgi film gösteriyor', cevap: 'oner', neden: 'Daha önce ne izlediğine bakıp yenisini öneriyor.' },
      { emoji: '🚪', ad: 'Kapı zili kapıya geleni gösteriyor', cevap: 'gor', neden: 'Kamerasıyla kapıdakini görüyor.' },
      { emoji: '🎵', ad: 'Müzik uygulaması "Bunu da sevebilirsin" diyor', cevap: 'oner', neden: 'Dinlediğin şarkılara bakıp yenisini öneriyor.' },
      { emoji: '🚗', ad: 'Araba "Eve git" deyince yolu buluyor', cevap: 'duy', neden: 'Söylediğini duyuyor, sonra yolu buluyor.' }
    ],
    son: 'Akıllı makineler görür, duyar ve bize bir şey önerir. Ama son kararı biz veririz.'
  });
});
