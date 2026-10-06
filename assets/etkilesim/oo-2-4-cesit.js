// OÖ 12. hafta, Oyun 1: ARF yalnız kara kedi görmüş; deftere farklı kediler ekle.
YZO.kaydet('oo-2-4-cesit', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'ARF yalnız kara kedi görmüş. Defterine hangi resimleri eklemeliyiz?',
    kutular: [
      { id: 'ekle', ad: 'Kedi sayfasına ekle', emoji: '📒', sinif: 'yesil' },
      { id: 'ekleme', ad: 'Bu sayfaya eklemeyiz', emoji: '✋', sinif: 'gri' }
    ],
    ogeler: [
      { emoji: '🐈', ad: 'Sarman kedi', kutu: 'ekle', neden: 'Farklı renkte bir kedi! ARF artık sarman kedileri de tanır.', ipucu: 'Bu bir kedi mi? ARF bunu gördü mü?' },
      { emoji: '😺', ad: 'Sarı kedi', kutu: 'ekle', neden: 'Başka bir renk daha. Çeşit arttı!', ipucu: 'Kediler hep kara mıdır?' },
      { emoji: '🐶', ad: 'Köpek', kutu: 'ekleme', neden: 'Köpek kedi sayfasına girmez; ARF karışır.', ipucu: 'Bu bir kedi mi?' },
      { emoji: '🐱', ad: 'Turuncu kedi yüzü', kutu: 'ekle', neden: 'Yüzden bir örnek de faydalı.', ipucu: 'Kedi resmi yalnız yandan mı olur?' },
      { emoji: '🐯', ad: 'Kaplan', kutu: 'ekleme', neden: 'Kaplan kediye benzer ama ev kedisi değildir. Sayfayı karıştırmayalım.', ipucu: 'Bu ev kedisi mi, büyük bir yabani hayvan mı?' },
      { emoji: '🐈‍⬛', ad: 'Bir kara kedi daha', kutu: 'ekle', neden: 'Eklenebilir, ama ARF zaten çok kara kedi gördü. Farklı kediler daha çok işe yarar.', ipucu: 'Bu bir kedi mi?' }
    ],
    son: 'Hep aynı kediyi gösterirsek ARF yalnız onu tanır. Farklı renklerde, farklı açılardan örnekler gösteririz.'
  });
});
