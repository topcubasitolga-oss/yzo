// YZO-OÖ-1.1 Oyun 2: Görür mü, Duyar mı? — akıllı makineler nasıl fark eder?
YZO.kaydet('oo-1-1-duyu', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Bu makine seni görerek mi, duyarak mı fark eder?',
    kutular: [
      { id: 'gorur', ad: 'Görür', emoji: '👀', sinif: 'yesil' },
      { id: 'duyar', ad: 'Duyar', emoji: '👂', sinif: 'kirmizi' }
    ],
    ogeler: [
      { emoji: '📱', ad: 'Yüzünü tanıyan telefon', kutu: 'gorur', neden: 'Kamerasıyla yüzüne bakar.', ipucu: 'Telefon seni tanımak için neyine bakıyor?' },
      { emoji: '🔊', ad: 'Sesli asistan', kutu: 'duyar', neden: 'Mikrofonuyla sesini dinler.', ipucu: 'Sesli asistana nasıl soru sorarız?' },
      { emoji: '🚪', ad: 'Kameralı kapı zili', kutu: 'gorur', neden: 'Kapıya geleni kamerayla görür.', ipucu: 'Kapı zilinin üstünde küçük bir göz var.' },
      { emoji: '🧸', ad: 'Sesle uyanan oyuncak', kutu: 'duyar', neden: 'El çırpınca uyanır, şarkı söyler.', ipucu: 'Bu oyuncak el çırpınca ne yapıyor?' },
      { emoji: '🧹', ad: 'Süpürge robotu', kutu: 'gorur', neden: 'Önündeki duvarı ve eşyaları algılar.', ipucu: 'Süpürge robotu duvarı nasıl fark ediyor?' },
      { emoji: '🚗', ad: 'Konuşarak yol soran araba', kutu: 'duyar', neden: '"Eve git" deyince dinler, yolu bulur.', ipucu: 'Arabaya nereye gideceğimizi nasıl söyleriz?' }
    ],
    son: 'Akıllı makinelerin "gözleri" (kamera) ve "kulakları" (mikrofon) var. Görür, duyar, sonra karar verir.'
  });
});
