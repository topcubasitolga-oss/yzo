// OÖ 12. hafta, Oyun 2: ARF bunu tanır mı? (defterinde ne var?)
YZO.kaydet('oo-2-4-tanir', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'ARF\'ın defterinde yalnız kırmızı elmalar var. ARF bunu tanır mı?',
    secenekler: [
      { deger: 'evet', etiket: 'Tanır', ikon: '👍', sinif: 'yesil' },
      { deger: 'hayir', etiket: 'Zorlanır', ikon: '🤔', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🍎', ad: 'Kırmızı elma', cevap: 'evet', neden: 'Defterinde bunun gibi çok örnek var.' },
      { emoji: '🍏', ad: 'Yeşil elma', cevap: 'hayir', neden: 'Hiç yeşil elma görmedi! Belki elma olduğunu anlamaz.' },
      { emoji: '🍅', ad: 'Domates', cevap: 'hayir', neden: 'Kırmızı ve yuvarlak! ARF elma sanabilir. Domates örneği de göstermeliyiz.' },
      { emoji: '🍎', ad: 'Başka bir kırmızı elma', cevap: 'evet', neden: 'Gördüklerine çok benziyor.' }
    ],
    son: 'ARF yalnız gördüğüne benzeyenleri tanır. Defterine farklı örnekler koyarsak daha iyi tanır.'
  });
});
