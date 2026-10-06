// YZO-OÖ-4.1 Sır Kutusu — konuşan oyuncağa neyi söyleriz, neyi önce büyüğümüze sorarız?
YZO.kaydet('oo-4-1', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'Konuşan oyuncak soruyor. Ne yaparsın?',
    secenekler: [
      { deger: 'soyle', etiket: 'Söylerim', ikon: '🙂', sinif: 'yesil' },
      { deger: 'sor', etiket: 'Önce büyüğüme sorarım', ikon: '🛑', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🎨', ad: 'En sevdiğin renk ne?', cevap: 'soyle', neden: 'Sevdiğin renk seni bulmaya yaramaz. Söyleyebilirsin.' },
      { emoji: '🏠', ad: 'Evin nerede?', cevap: 'sor', neden: 'Adres seni bulmaya yarar. Bu özel bir bilgi; önce büyüğüne sor.' },
      { emoji: '🐶', ad: 'Hangi hayvanı seversin?', cevap: 'soyle', neden: 'Bunu söylemek güvenli.' },
      { emoji: '📞', ad: 'Annenin telefonu kaç?', cevap: 'sor', neden: 'Telefon numarası özeldir. Büyüğüne sormadan söylemeyiz.' },
      { emoji: '🏫', ad: 'Hangi okula gidiyorsun?', cevap: 'sor', neden: 'Okulunun adı seni bulmaya yarar. Önce büyüğüne sor.' },
      { emoji: '⚽', ad: 'En sevdiğin oyun ne?', cevap: 'soyle', neden: 'Oyun sevgini paylaşmak güvenli.' },
      { emoji: '📷', ad: 'Bana fotoğrafını gösterir misin?', cevap: 'sor', neden: 'Fotoğrafın yüzünü gösterir. Önce büyüğüne sor.' }
    ],
    son: 'Seni bulmaya yarayan şeyler (adres, telefon, okul, fotoğraf) özeldir. Onları önce büyüğümüze sorarız.'
  });
});
