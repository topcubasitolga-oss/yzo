// OÖ 6. hafta, Oyun 1: ARF bunu anlar mı?
YZO.kaydet('oo-1-5-anlar', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'ARF bunu anlar mı?',
    secenekler: [
      { deger: 'anlar', etiket: 'Anlar', ikon: '👍', sinif: 'yesil' },
      { deger: 'anlamaz', etiket: 'Anlamaz', ikon: '🤔', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🐱', ad: '"ARF, bana bir kedi resmi göster."', cevap: 'anlar', neden: 'Ne istediğin açık. ARF anlar.' },
      { emoji: '🌀', ad: '"ARF, şey yap… şeyi."', cevap: 'anlamaz', neden: 'Ne istediğin belli değil. Açıkça söylemeliyiz.' },
      { emoji: '🎵', ad: '"ARF, lütfen bir çocuk şarkısı aç."', cevap: 'anlar', neden: 'Açık ve kibar bir istek. ARF anlar.' },
      { emoji: '🎨', ad: '"ARF, en sevdiğim rengi bil!"', cevap: 'anlamaz', neden: 'ARF senin aklından geçeni bilemez. Ona söylemen gerekir.' },
      { emoji: '🌦️', ad: '"ARF, yarın hava nasıl olacak?"', cevap: 'anlar', neden: 'ARF bu soruyu anlar ve hava durumuna bakar.' },
      { emoji: '🤫', ad: 'Hiçbir şey söylemeden ARF\'a bakıyorsun.', cevap: 'anlamaz', neden: 'ARF düşüncelerini okuyamaz. Konuşman gerekir.' }
    ],
    son: 'ARF\'la açık ve kibar konuşuruz. ARF aklımızdan geçeni bilemez; ne istediğimizi söylemeliyiz.'
  });
});
