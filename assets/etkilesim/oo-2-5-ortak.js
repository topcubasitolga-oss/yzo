// OÖ 13. hafta, Oyun 2: Ortak özellik: yuvarlak mı, köşeli mi?
YZO.kaydet('oo-2-5-ortak', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'ARF gibi düşün: Yuvarlak olanlar ve köşeli olanlar.',
    kutular: [
      { id: 'yuvarlak', ad: 'Yuvarlak', emoji: '⚪', sinif: 'yesil' },
      { id: 'koseli', ad: 'Köşeli', emoji: '⬜', sinif: 'kirmizi' }
    ],
    ogeler: [
      { emoji: '⚽', ad: 'Top', kutu: 'yuvarlak', neden: 'Top yuvarlaktır.', ipucu: 'Top yuvarlanır mı?' },
      { emoji: '📦', ad: 'Kutu', kutu: 'koseli', neden: 'Kutunun köşeleri var.', ipucu: 'Kutunun köşesi var mı?' },
      { emoji: '🍊', ad: 'Portakal', kutu: 'yuvarlak', neden: 'Portakal yuvarlaktır.', ipucu: 'Portakal yuvarlanır mı?' },
      { emoji: '📕', ad: 'Kitap', kutu: 'koseli', neden: 'Kitabın dört köşesi var.', ipucu: 'Kitabın kenarlarına bak.' },
      { emoji: '🕐', ad: 'Saat', kutu: 'yuvarlak', neden: 'Bu saat yuvarlak.', ipucu: 'Saatin biçimi nasıl?' },
      { emoji: '🧊', ad: 'Buz küpü', kutu: 'koseli', neden: 'Buz küpü köşelidir.', ipucu: 'Buz küpünün köşesi var mı?' }
    ],
    son: 'Biçimlerine bakarak grupladık. ARF de örneklerdeki ortak özellikleri bularak öğrenir.'
  });
});
