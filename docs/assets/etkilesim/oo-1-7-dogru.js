// OÖ 8. hafta (meydan okuma), Oyun 1: Doğru mu, yanlış mı?
YZO.kaydet('oo-1-7-dogru', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'ARF diyor ki… Doğru mu, yanlış mı?',
    secenekler: [
      { deger: 'd', etiket: 'Doğru', ikon: '✅', sinif: 'yesil' },
      { deger: 'y', etiket: 'Yanlış', ikon: '❌', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🤖', ad: '"Ben bir canlıyım, yemek yerim."', cevap: 'y', neden: 'ARF bir makinedir. Yemek yemez, büyümez.' },
      { emoji: '📷', ad: '"Kameramla görürüm."', cevap: 'd', neden: 'Evet, kamera ARF\'ın gözüdür.' },
      { emoji: '🦾', ad: '"Robot gibi görünen her şey akıllıdır."', cevap: 'y', neden: 'Kurmalı robot robot gibi görünür ama karar vermez.' },
      { emoji: '🔊', ad: '"Sesli asistan sesimizi duyar."', cevap: 'd', neden: 'Evet, mikrofonuyla duyar.' },
      { emoji: '✂️', ad: '"Makas kendi karar verir."', cevap: 'y', neden: 'Makas elimizde olmadan kesmez.' },
      { emoji: '🎨', ad: '"Aklından geçen rengi bilirim."', cevap: 'y', neden: 'ARF düşüncelerimizi okuyamaz; söylememiz gerekir.' }
    ],
    son: 'Harika! ARF\'ı ve akıllı makineleri artık tanıyorsunuz.'
  });
});
