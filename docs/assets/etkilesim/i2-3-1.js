// YZO-İ2-3.1 Dedektif: Doğru mu, Uydurma mı? — Robot çok emin konuşuyor; sen kontrol et.
YZO.kaydet('i2-3-1', function (kutu, Y) {
  'use strict';
  Y.kartOyunu(kutu, {
    soru: 'Robot çok emin konuşuyor. Doğru mu, uydurma mı?',
    secenekler: [
      { deger: 'dogru', etiket: 'Doğru', ikon: '✅', sinif: 'yesil' },
      { deger: 'uydurma', etiket: 'Uydurma', ikon: '🕵️', sinif: 'sari' }
    ],
    kartlar: [
      { emoji: '🤖', metin: '"Kesinlikle eminim: Penguenler Kuzey Kutbu\'nda yaşar."', cevap: 'uydurma', neden: 'Penguenler Güney Yarım Küre\'de, en çok Antarktika\'da yaşar. Kaynak: ansiklopedi, atlas.' },
      { emoji: '🤖', metin: '"İstanbul hem Avrupa\'da hem Asya\'da yer alır."', cevap: 'dogru', neden: 'Doğru. Boğaz şehri iki kıtaya ayırır. Kaynak: atlas.' },
      { emoji: '🤖', metin: '"Türkiye\'nin en uzun nehri Kızılırmak\'tır."', cevap: 'dogru', neden: 'Doğru: Türkiye sınırları içinde doğup denize dökülen en uzun nehir Kızılırmak\'tır. Kaynak: ders kitabı.' },
      { emoji: '🤖', metin: '"Ay kendi ışığını üretir, bu yüzden geceleri parlar."', cevap: 'uydurma', neden: 'Ay\'ın kendi ışığı yoktur; Güneş\'in ışığını yansıtır. Kaynak: fen kitabı.' },
      { emoji: '🤖', metin: '"Zürafaların boynunda 30 kemik vardır."', cevap: 'uydurma', neden: 'Zürafanın boynunda da bizim gibi 7 kemik vardır; her biri çok uzundur. Kaynak: ansiklopedi.' },
      { emoji: '🤖', metin: '"Ankara, Türkiye\'nin başkentidir."', cevap: 'dogru', neden: 'Doğru. Kaynak: ders kitabı.' }
    ],
    son: 'Yapay zekâ bazen uydurur ve uydururken de emin konuşur. Dedektif gibi kaynağa bakarız: kitap, atlas, öğretmen.'
  });
});
