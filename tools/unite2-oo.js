// Okul öncesi 2. ünite (Nasıl öğrenir), 9–15. haftalar. Çalıştır: node tools/unite2-oo.js
'use strict';
const fs = require('fs');
const p = __dirname + '/../data/etkinlikler.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const P = (sure, ogretmen, cocuk) => ({ sure, ogretmen, cocuk });
const ortak = { bant: 'oo', dunya: 2, sure: '20 dk', duzey: 'Farkındalık',
  program: { ad: 'Okul Öncesi Eğitim Programı', alan: 'Bilişsel gelişim: sınıflama, karşılaştırma, örüntü, neden-sonuç. Dil gelişimi: açıklama.', cikti: '' },
  hazirlik: '5 dk: sunumu tahtada açın, sesi açın.' };

const dersler = [
{
  kod: 'YZO-OÖ-2.1', slug: 'oo-2-1', hafta: 9, ad: 'ARF Kediyi Tanımıyor', soru: 'ARF nasıl öğrenir?',
  ozet: 'ARF kedi ile köpeği ayıramıyor. Çocuklar ona örnek gösterir; ARF az örnekte yanılır, çok örnekte bilir. Örnekleri ARF\'ın defterine doğru sayfaya koyarlar.',
  kazanim: { cocuk: 'ARF örnek görerek öğrenir; az örnek görürse yanılır.', akademik: 'Makine öğrenmesini "örneklerden öğrenme" olarak somutlaştırır; örnek sayısı ile doğruluk arasındaki ilişkiyi fark eder.' },
  malzeme: ['Akıllı tahta', 'Kedi ve köpek kartları (kâğıttan)', '"ARF\'a Örnek Gösterelim" kâğıdı'],
  oyunlar: [
    { modul: 'oo-2-1', ad: 'ARF\'a Örnek Göster', aciklama: 'Kedi ve köpek resimlerine dokun, ARF öğrensin; sonra sına.', tur: 'Eğit ve sına' },
    { modul: 'oo-2-1-etiket', ad: 'ARF\'ın Defteri', aciklama: 'Her resmi doğru sayfaya koy: kedi mi, köpek mi?', tur: 'Sürükle-bırak' }
  ],
  slaytlar: [
    { tip: 'kapak', baslik: 'ARF Kediyi Tanımıyor', metin: 'Yeni ünite: ARF nasıl öğrenir?', ruh: 'saskin', anlatim: 'Çocuklar, bir sorunum var. Kedi ile köpeği ayıramıyorum!', plan: P('1 dk', 'Yeni üniteyi duyurun: "Bu ünitede ARF\'a biz öğreteceğiz!"', 'ARF\'ın sorununu dinler.') },
    { tip: 'konusma', baslik: 'ARF\'ın sorunu', ruh: 'saskin', balonlar: ['Bugün bir hayvan gördüm. Kedi miydi, köpek miydi?', 'Hiç bilemedim!', 'Çünkü bana hiç kedi göstermediniz.', 'Ben örnek görerek öğrenirim. Bana öğretir misiniz?'], plan: P('2 dk', 'Son balonda sınıfa sorun: "ARF\'a nasıl öğretiriz?"', '"Resim gösteririz!" gibi öneriler söyler.') },
    { tip: 'ikili', baslik: 'Kedi mi, köpek mi?', sol: { emoji: '🐱', ad: 'Kedi', ornekler: ['Miyavlar', 'Bıyıkları var', 'Tırmanır'] }, sag: { emoji: '🐶', ad: 'Köpek', ornekler: ['Havlar', 'Kuyruğunu sallar', 'Top getirir'] }, plan: P('2 dk', 'Özellikleri birlikte söyleyin. "Biz nasıl ayırıyoruz? ARF de örneklerden böyle ayıracak."', 'Ses ve hareketleri taklit eder.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: ARF\'a örnek göster', modul: 'oo-2-1', plan: P('5 dk', 'Önce hiç örnek göstermeden "ARF\'ı sına"ya basın; yanılır ya da şansla bilir. Sonra çocuklar sırayla resimlere dokunur; 8–10 örnekten sonra yeniden sınayın.', 'Resimlere dokunarak ARF\'a örnek gösterir.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: ARF\'ın defteri', modul: 'oo-2-1-etiket', plan: P('4 dk', 'ARF\'ın defterini tanıtın: "Gösterdiğimiz örnekler buraya yazılıyor." Çocuklar sürükler.', 'Resmi doğru sayfaya taşır.') },
    { tip: 'tartisma', soru: 'ARF neden önce bilemedi?', cevaplar: ['Hiç kedi görmemişti.', 'Az örnek görmüştü.', 'Çok örnek görünce öğrendi.'], plan: P('2 dk', 'Çocukların cevaplarını alın, sonra örnek cevapları açın.', 'Bir neden söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı', metin: 'Kedileri boya, köpekleri çember içine al. ARF\'ın kaç örnek gördüğünü boya.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Boyar, çember içine alır.') },
    { tip: 'kapanis', baslik: 'ARF örnek görerek öğrenir!', maddeler: ['ARF hiç görmediği şeyi bilemez.', 'Örnek gösterdikçe öğrenir.', 'Örnekler ARF\'ın defterine yazılır.'], anlatim: 'Teşekkürler! Artık kedileri tanıyorum.', plan: P('1 dk', 'Maddeleri birlikte söyleyin.', 'Tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-2.2', slug: 'oo-2-2', hafta: 10, ad: 'Örnek Göster, ARF Öğrensin', soru: 'Çizdiğimiz resimlerden ARF öğrenebilir mi?',
  ozet: 'Sınıf güneş, ev ve balık çizerek ARF\'ı eğitir; ARF yeni bir çizimi en çok benzediği örneklere bakarak tahmin eder. Meyveleri ARF\'ın defterine koyarken bir karışıklık yaşanır.',
  kazanim: { cocuk: 'Çizdiğim örneklerle ARF\'a öğretirim; ARF yeni çizimi örneklere benzeterek tahmin eder.', akademik: 'Sınıflandırıcının eğitim örneklerine benzerlikle tahmin yaptığını deneyimler; insan etiketleme hatalarının veriye geçebileceğini fark eder.' },
  malzeme: ['Akıllı tahta (dokunmatik çizim)', 'Boya kalemleri', '"Benim Örneklerim" kâğıdı'],
  oyunlar: [
    { modul: 'i1-2-2', ad: 'Çiz, ARF Bilsin', aciklama: 'Güneş, ev ve balık çizerek ARF\'ı eğit; sonra yeni bir çizim yap, ARF tahmin etsin.', tur: 'Çizerek eğit' },
    { modul: 'oo-2-2-meyve', ad: 'Meyve Defteri', aciklama: 'Meyveleri ARF\'ın defterine doğru sayfaya koy.', tur: 'Sürükle-bırak' }
  ],
  kagit: { baslik: 'Benim Örneklerim', yonerge: 'ARF\'a öğretmek için her kutuya bir örnek çiz.', bloklar: [{ tip: 'iki-cizim', sol: 'Güneş', sag: 'Ev' }, { tip: 'cizim', baslik: 'Balık' }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'Örnek Göster, ARF Öğrensin', metin: 'Bugün ARF\'a çizerek öğreteceğiz!', anlatim: 'Bugün bana resim çizecek misiniz?', plan: P('1 dk', 'Tahtanın dokunmatik çizimini deneyin.', 'Parmağıyla havada çizim yapar.') },
    { tip: 'konusma', baslik: 'ARF nasıl tahmin eder?', balonlar: ['Bana güneş, ev ve balık çizin.', 'Her çizimi defterime koyacağım.', 'Sonra yeni bir resim çizerseniz…', 'Defterimdeki en çok benzeyen çizimlere bakıp tahmin edeceğim!'], plan: P('2 dk', '"Benzetmek" ne demek? Sınıfta iki benzer nesne gösterin.', 'Benzeyen nesneleri bulur.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Çiz, ARF bilsin', modul: 'i1-2-2', plan: P('7 dk', 'Önce her resimden 2 çizim yaptırın (çocuklar sırayla). Sonra bir çocuk yeni bir şey çizsin; ARF tahmin etsin. Yanılırsa "Daha çok öğret"e dönün.', 'Tahtada parmağıyla çizer, ARF\'ın tahminini kontrol eder.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Meyve defteri', modul: 'oo-2-2-meyve', plan: P('4 dk', 'Yaban mersini kartında durun: "Biz de karıştırabiliriz! Defterde yanlış olursa ARF de yanlış öğrenir."', 'Meyveyi doğru sayfaya taşır.') },
    { tip: 'tartisma', soru: 'ARF çizimimizi neden yanlış bildi?', cevaplar: ['Az örnek görmüştü.', 'Çizimimiz başka bir şeye benziyordu.', 'Defterde yanlış örnek vardı.'], plan: P('2 dk', 'ARF\'ın yanıldığı bir anı hatırlatın, nedenini tartışın.', 'Bir neden söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Benim Örneklerim', metin: 'Güneş, ev ve balık çiz. ARF\'ın defterine koyacağız!', plan: P('Ders sonu', 'Kâğıtları ARF\'ın defteri gibi panoya asın.', 'Çizer.') },
    { tip: 'kapanis', baslik: 'Çizdik, ARF öğrendi!', maddeler: ['ARF yeni resmi örneklere benzeterek tahmin eder.', 'Örnek yanlışsa ARF de yanlış öğrenir.'], plan: P('1 dk', 'Maddeleri okuyun.', 'Tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-2.3', slug: 'oo-2-3', hafta: 11, ad: 'Çok Örnek, Az Örnek', soru: 'Kaç örnek yeter?',
  ozet: 'Pazarcı ARF elma ile armudu ayırmayı öğrenir. Çocuklar az ve çok örnekle sınar, sonuçları karşılaştırır; hangi ARF\'ın daha iyi bildiğine karar verir.',
  kazanim: { cocuk: 'ARF\'a çok örnek gösterirsem daha iyi öğrenir.', akademik: 'Eğitim verisi miktarı ile model başarımı arasındaki ilişkiyi deneysel olarak gözlemler.' },
  malzeme: ['Akıllı tahta', 'Gerçek elma ve armut (isteğe bağlı)', '"Kaç Örnek?" kâğıdı'],
  oyunlar: [
    { modul: 'i1-2-1', ad: 'Pazarcı ARF', aciklama: 'ARF\'a elma ve armut göster, sonra sına. Örnek arttıkça ne oluyor?', tur: 'Eğit ve sına' },
    { modul: 'oo-2-3-hangisi', ad: 'Hangi ARF Daha İyi Bilir?', aciklama: 'Az örnek gören mi, çok örnek gören mi?', tur: 'Kart oyunu' }
  ],
  kagit: { baslik: 'Kaç Örnek?', yonerge: 'Her satırda daha çok örnek gören ARF\'ı çember içine al.', bloklar: [{ tip: 'secim-metin', ogeler: [{ metin: '🐱  ya da  🐱🐱🐱🐱', secenekler: ['Sol', 'Sağ'] }, { metin: '🍎🍎🍎  ya da  🍎', secenekler: ['Sol', 'Sağ'] }] }, { tip: 'sayac', baslik: 'Bugün ARF\'a kaç örnek gösterdik? Boya.', adet: 10 }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'Çok Örnek, Az Örnek', metin: 'Pazarcı ARF işe başlıyor!', anlatim: 'Pazarda meyve satacağım ama elma ile armudu karıştırıyorum!', plan: P('1 dk', 'Varsa gerçek elma ve armudu masaya koyun.', 'Meyveleri tanır.') },
    { tip: 'soru', baslik: 'ARF\'a kaç örnek göstermeliyiz?', secenekler: [{ emoji: '1️⃣', ad: 'Bir tane' }, { emoji: '🔟', ad: 'On tane' }, { emoji: '🚫', ad: 'Hiç' }], metin: 'Tahmin et!', plan: P('2 dk', 'Oylayın; cevabı oyunda bulacağız.', 'Oy verir.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Pazarcı ARF', modul: 'i1-2-1', plan: P('7 dk', 'Önce 2 örnekle sınayın, sonuç tahtaya yazılsın. Sonra 8–10 örnekle yeniden. Yeşil elma örneği gösterilmezse ARF\'ın yanıldığını vurgulayın.', 'Meyveye dokunup etiketler, sınav sonucunu sayar.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Hangi ARF daha iyi bilir?', modul: 'oo-2-3-hangisi', plan: P('3 dk', 'Sağ-sol el kaldırarak oylayın.', 'Elini kaldırarak oy verir.') },
    { tip: 'tartisma', soru: 'Hiç görmediği bir meyveyi ARF bilir mi?', cevaplar: ['Bilemez.', 'Benzettiği bir meyve sanabilir.', 'Önce ona örnek göstermeliyiz.'], plan: P('2 dk', '2. slayttaki soruya dönün.', 'Fikrini söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Kaç Örnek?', metin: 'Daha çok örnek gören ARF\'ı çember içine al.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Çember içine alır, boyar.') },
    { tip: 'kapanis', baslik: 'Çok örnek, daha iyi ARF!', maddeler: ['Az örnek gören ARF yanılır.', 'Çok örnek gören ARF daha iyi bilir.', 'Hiç görmediğini bilemez.'], plan: P('1 dk', 'Tekerleme: "Çok örnek, iyi ARF!"', 'Tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-2.4', slug: 'oo-2-4', hafta: 12, ad: 'Farklı Örnekler', soru: 'Hep aynı örneği göstermek yeter mi?',
  ozet: 'ARF yalnız kara kedi görmüş; sarman kediyi tanımıyor. Çocuklar defterine farklı renklerde kediler ekler, köpek ve kaplanı ayırır; yalnız kırmızı elma gören ARF\'ın neleri tanıyamayacağını tahmin eder.',
  kazanim: { cocuk: 'ARF\'a farklı örnekler gösteririm; hep aynısını gösterirsem başkalarını tanımaz.', akademik: 'Veri çeşitliliğinin genellemedeki rolünü fark eder; tek tip verinin yanılgıya yol açtığını gözlemler.' },
  malzeme: ['Akıllı tahta', 'Farklı renklerde kedi resimleri', '"Çeşit Çeşit Kediler" kâğıdı'],
  oyunlar: [
    { modul: 'oo-2-4-cesit', ad: 'Deftere Farklı Kediler', aciklama: 'Yalnız kara kedi gören ARF\'ın defterine hangi resimleri ekleriz?', tur: 'Sürükle-bırak' },
    { modul: 'oo-2-4-tanir', ad: 'ARF Bunu Tanır mı?', aciklama: 'Defterinde yalnız kırmızı elma var. ARF hangisini tanır?', tur: 'Kart oyunu' }
  ],
  kagit: { baslik: 'Çeşit Çeşit Kediler', yonerge: 'Kedileri farklı renklerle boya: biri kara, biri sarman, biri beyaz, biri gri. ARF hepsini tanısın!', bloklar: [{ tip: 'kartlar', baslik: 'Boyanacak kediler', ogeler: [{ emoji: '🐈', ad: 'Kara' }, { emoji: '🐈', ad: 'Sarman' }, { emoji: '🐈', ad: 'Beyaz' }, { emoji: '🐈', ad: 'Gri' }] }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'Farklı Örnekler', metin: 'Hep aynı kediyi göstermek yeter mi?', ruh: 'dusunceli', anlatim: 'Bugün kafam çok karışık!', plan: P('1 dk', 'ARF\'ın düşünceli yüzünü gösterin.', 'Tahmin eder.') },
    { tip: 'konusma', baslik: 'ARF\'ın defterinde ne var?', ruh: 'saskin', balonlar: ['Defterimde on tane kedi var.', 'Ama hepsi kara kedi!', 'Bugün sarı bir kedi gördüm.', 'Kedi olduğunu anlayamadım!'], plan: P('2 dk', '"ARF neden anlayamadı?" diye sorun.', '"Hep kara kedi görmüş!" der.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Deftere farklı kediler', modul: 'oo-2-4-cesit', plan: P('5 dk', 'Kaplan kartında durun: "Kediye benziyor ama ev kedisi mi?"', 'Resmi uygun kutuya taşır.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: ARF bunu tanır mı?', modul: 'oo-2-4-tanir', plan: P('4 dk', 'Domates kartında durun: "Kırmızı ve yuvarlak! ARF elma sanabilir."', 'Oy verir, nedenini söyler.') },
    { tip: 'tartisma', soru: 'Sınıfımızı tanıyan bir ARF için ne gösterirdik?', cevaplar: ['Herkesin fotoğrafı değil; özel bilgilerimizi göstermeyiz!', 'Farklı oyuncaklarımızı.', 'Farklı renklerde resimlerimizi.'], plan: P('2 dk', 'İlk örnek cevapta gizliliğe değinin: insanların yüzlerini ARF\'a öğretmek izin ister.', 'Fikrini söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Çeşit Çeşit Kediler', metin: 'Kedileri farklı renklere boya.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Boyar.') },
    { tip: 'kapanis', baslik: 'Farklı örnek, akıllı ARF!', maddeler: ['Hep aynı örneği gösterirsek ARF yalnız onu tanır.', 'Farklı renkler, farklı biçimler gösteririz.'], plan: P('1 dk', 'Maddeleri okuyun.', 'Tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-2.5', slug: 'oo-2-5', hafta: 13, ad: 'ARF Örüntü Buluyor', soru: 'ARF örneklerde neyi arar?',
  ozet: 'ARF örneklerde tekrar eden şeyi (örüntüyü) bulur. Çocuklar sıradakini tahmin eder ve nesneleri ortak özelliklerine göre gruplar.',
  kazanim: { cocuk: 'Tekrar eden şeyi (örüntüyü) bulurum; ARF de örneklerde böyle şeyler arar.', akademik: 'Örüntü tanımayı makine öğrenmesinin temel işlemi olarak sezgisel düzeyde deneyimler; özelliğe göre sınıflandırma yapar.' },
  malzeme: ['Akıllı tahta', 'Renkli bloklar ya da boncuklar', '"Örüntü Tamamla" kâğıdı'],
  oyunlar: [
    { modul: 'oo-2-5-oruntu', ad: 'Sıradaki Ne?', aciklama: 'Örüntüyü bul, sıradakini seç.', tur: 'Kart oyunu' },
    { modul: 'oo-2-5-ortak', ad: 'Yuvarlak mı, Köşeli mi?', aciklama: 'Nesneleri biçimlerine göre grupla.', tur: 'Sürükle-bırak' }
  ],
  kagit: { baslik: 'Örüntü Tamamla', yonerge: 'Her satırda sıradaki resmi çiz.', bloklar: [{ tip: 'tablo', basliklar: ['', '', '', '', 'Sıradaki?'], satirlar: [['🍎', '🍌', '🍎', '🍌', ''], ['🔴', '🔴', '🔵', '🔴', ''], ['☀️', '🌙', '☀️', '🌙', '']] }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'ARF Örüntü Buluyor', metin: 'Tekrar eden şeyi bulalım!', anlatim: 'Bugün size bir sır vereceğim: ben örüntü avcısıyım!', plan: P('1 dk', 'Bloklarla basit bir örüntü kurun (kırmızı, mavi, kırmızı, mavi).', 'Örüntüyü sesli söyler.') },
    { tip: 'konusma', baslik: 'Örüntü nedir?', balonlar: ['Elma, muz, elma, muz…', 'Tekrar eden bir şey var!', 'Buna örüntü denir.', 'Ben de örneklere bakıp örüntü ararım. Kedilerin hepsinde bıyık var!'], plan: P('2 dk', 'Sınıfta bir örüntü bulun (fayanslar, perde deseni).', 'Sınıfta örüntü gösterir.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Sıradaki ne?', modul: 'oo-2-5-oruntu', plan: P('5 dk', 'Her kartta örüntüyü sesli söyleyin, sonra oylayın.', 'Örüntüyü söyler, sıradakini seçer.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Yuvarlak mı, köşeli mi?', modul: 'oo-2-5-ortak', plan: P('4 dk', '"ARF gibi ortak özelliğe bakıyoruz" deyin.', 'Nesneyi doğru gruba taşır.') },
    { tip: 'tartisma', soru: 'Bütün kedilerde ortak olan ne?', cevaplar: ['Bıyıkları var.', 'Miyavlarlar.', 'Dört ayakları ve kuyrukları var.'], plan: P('2 dk', '"ARF de kedileri böyle ortak özelliklerden tanır" diye bağlayın.', 'Ortak bir özellik söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Örüntü Tamamla', metin: 'Sıradakini çiz.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Sıradakini çizer.') },
    { tip: 'kapanis', baslik: 'Örüntü avcıları!', maddeler: ['Tekrar eden şeye örüntü denir.', 'ARF örneklerdeki ortak özellikleri bularak öğrenir.'], plan: P('1 dk', 'El çırpma örüntüsüyle bitirin (çırp, çırp, dizine vur).', 'Ritim örüntüsünü yapar.') }
  ]
},
{
  kod: 'YZO-OÖ-2.6', slug: 'oo-2-6', hafta: 14, ad: 'Yanlış Etiket', soru: 'ARF\'a yanlış öğretirsek ne olur?',
  ozet: 'Biri ARF\'ın defterinde köpeğe "kedi" yazmış. ARF de köpeklere kedi demeye başlamış! Çocuklar yanlış etiketleri bulur ve hayvanları doğru sayfalara yerleştirir.',
  kazanim: { cocuk: 'ARF\'a yanlış öğretirsek o da yanlış öğrenir; etiketi kontrol ederim.', akademik: 'Etiket kalitesinin model davranışını doğrudan etkilediğini fark eder; veri hazırlamada insanın sorumluluğunu tanır.' },
  malzeme: ['Akıllı tahta', 'Yapışkan not kâğıtları', '"Etiket Dedektifi" kâğıdı'],
  oyunlar: [
    { modul: 'oo-2-6-dogru', ad: 'Bu Etiket Doğru mu?', aciklama: 'ARF\'ın defterindeki etiketleri kontrol et.', tur: 'Kart oyunu' },
    { modul: 'oo-2-6-sayfa', ad: 'Doğru Sayfaya Koy', aciklama: 'Kedi, köpek, kuş: her hayvanı doğru sayfaya taşı.', tur: 'Sürükle-bırak' }
  ],
  kagit: { baslik: 'Etiket Dedektifi', yonerge: 'Yanlış etiketlerin üstüne çarpı koy. Doğrusunu yanına çiz.', bloklar: [{ tip: 'tablo', basliklar: ['Resim', 'Etiket', 'Doğru mu?'], satirlar: [['🐶', 'kedi', '☐ ✓   ☐ ✗'], ['🍎', 'elma', '☐ ✓   ☐ ✗'], ['🐟', 'kuş', '☐ ✓   ☐ ✗'], ['🌻', 'çiçek', '☐ ✓   ☐ ✗']] }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'Yanlış Etiket', metin: 'ARF\'a yanlış öğretirsek ne olur?', ruh: 'yanilmis', anlatim: 'Çocuklar! Bugün bir köpeğe kedi dedim. Herkes güldü!', plan: P('1 dk', 'ARF\'ın yanılmış yüzünü gösterin.', 'Güler, tahmin eder.') },
    { tip: 'konusma', baslik: 'Ne oldu?', ruh: 'yanilmis', balonlar: ['Biri defterime bir köpek resmi koymuş.', 'Ama altına "kedi" yazmış!', 'Ben de öyle öğrendim.', 'Şimdi köpeklere kedi diyorum. Bana yardım edin!'], plan: P('2 dk', '"ARF mi suçlu, yoksa yanlış etiket mi?" diye tartışın.', 'Fikrini söyler.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Bu etiket doğru mu?', modul: 'oo-2-6-dogru', plan: P('4 dk', 'Yanlış etiketlerde doğrusunu birlikte söyleyin.', 'Oy verir, doğru etiketi söyler.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Doğru sayfaya koy', modul: 'oo-2-6-sayfa', plan: P('5 dk', 'Çocuklar sırayla sürükler. "Etiketi biz koyuyoruz, dikkatli olalım!"', 'Hayvanı doğru sayfaya taşır.') },
    { tip: 'tartisma', soru: 'ARF\'a öğretirken nelere dikkat ederiz?', cevaplar: ['Etiket doğru mu, kontrol ederiz.', 'Çok örnek gösteririz.', 'Farklı örnekler gösteririz.'], plan: P('2 dk', 'Ünitenin üç kuralını toplayın: çok, farklı, doğru.', 'Bir kural söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Etiket Dedektifi', metin: 'Yanlış etiketlere çarpı koy.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'İşaretler.') },
    { tip: 'kapanis', baslik: 'Çok, farklı, doğru!', maddeler: ['Çok örnek göster.', 'Farklı örnekler göster.', 'Etiketi doğru koy.'], anlatim: 'Gelecek hafta beni sınayacaksınız. Hazır mısınız?', plan: P('1 dk', '"Çok, farklı, doğru" kuralını el hareketleriyle söyleyin; meydan okumayı duyurun.', 'Kuralı söyler.') }
  ]
},
{
  kod: 'YZO-OÖ-2.7', slug: 'oo-2-7', hafta: 15, ad: 'Meydan Okuma: ARF\'ı Eğit', soru: 'ARF\'ı iyi bir eğitmen gibi eğitebilir miyiz?',
  ozet: 'Ünitenin sonunda sınıf ARF\'ı eğitir: kedi-köpek eğitimi, çizimle eğitme ve etiket kontrolü. "Çok, farklı, doğru" kuralını uygular ve Eğitmen rozetini kazanır.',
  kazanim: { cocuk: 'ARF\'ı çok, farklı ve doğru örneklerle eğitirim.', akademik: '2. ünite kazanımlarını bütünleşik olarak gösterir: örnekten öğrenme, veri miktarı, çeşitlilik ve etiket doğruluğu.' },
  malzeme: ['Akıllı tahta', '"Eğitmen Rozeti" kâğıdı', 'Boya kalemleri'],
  oyunlar: [
    { modul: 'oo-2-1', ad: 'ARF\'a Örnek Göster', aciklama: 'Kedi ve köpek örnekleriyle ARF\'ı eğit, sına.', tur: 'Eğit ve sına' },
    { modul: 'i1-2-2', ad: 'Çiz, ARF Bilsin', aciklama: 'Çizerek eğit, ARF tahmin etsin.', tur: 'Çizerek eğit' },
    { modul: 'oo-2-6-dogru', ad: 'Etiket Kontrolü', aciklama: 'Defterdeki etiketler doğru mu?', tur: 'Kart oyunu' }
  ],
  kagit: { baslik: 'Eğitmen Rozeti', yonerge: 'Rozetini boya. ARF\'a öğretmek istediğin yeni bir şeyin örneklerini çiz.', bloklar: [{ tip: 'metin', icerik: 'Bu rozet, 2. üniteyi tamamlayan sınıfımızın "Eğitmen" rozetidir. 🌱 Kuralımız: çok, farklı, doğru!' }, { tip: 'sayac', baslik: 'Rozetin yıldızlarını boya', adet: 5 }, { tip: 'iki-cizim', sol: 'Örnek 1', sag: 'Örnek 2' }] },
  slaytlar: [
    { tip: 'kapak', baslik: 'Meydan Okuma: ARF\'ı Eğit', metin: 'Bugün siz eğitmensiniz!', anlatim: 'Bugün öğretmenim sizsiniz. Beni iyi eğitin!', plan: P('1 dk', 'Çocuklara "eğitmen" kartları ya da şapkalar verin (isteğe bağlı).', 'Eğitmen olur.') },
    { tip: 'konusma', baslik: 'Eğitmenin kuralları', balonlar: ['Bana çok örnek gösterin.', 'Bana farklı örnekler gösterin.', 'Etiketleri doğru koyun.', 'Hazırsanız başlayalım!'], plan: P('2 dk', 'Her kuralda el hareketi yapın.', 'Kuralları el hareketiyle tekrar eder.') },
    { tip: 'oyun', baslik: 'Görev 1: Kedi ve köpek', modul: 'oo-2-1', plan: P('4 dk', 'Hedef: ARF\'ı üst üste 3 kez doğru bildirin.', 'Örnek gösterir, sınar.') },
    { tip: 'oyun', baslik: 'Görev 2: Çiz, ARF bilsin', modul: 'i1-2-2', plan: P('5 dk', 'Her resimden en az 3 farklı çizim yaptırın; sonra sınayın.', 'Çizer, sınar.') },
    { tip: 'oyun', baslik: 'Görev 3: Etiket kontrolü', modul: 'oo-2-6-dogru', plan: P('3 dk', 'Hızlı tekrar.', 'Oy verir.') },
    { tip: 'rozet', baslik: 'Eğitmen Rozeti', metin: 'Bu sınıf ARF\'ı çok, farklı ve doğru örneklerle eğitebiliyor!', emoji: '🌱', anlatim: 'Yaşasın! Siz artık birer eğitmensiniz!', plan: P('2 dk', 'Sınıfça alkışlayın, rozet kâğıdını dağıtın.', 'Alkışlar, rozetini boyar.') },
    { tip: 'kapanis', baslik: 'Gelecek ünite: Sınırlar', maddeler: ['2. ünite tamam: Eğitmen rozeti bizim!', 'Gelecek ünitede ARF\'ın yanıldığı ve uydurduğu anları yakalayacağız.'], anlatim: 'Gelecek ünitede benim hatalarımı yakalayacaksınız. Biraz korkuyorum!', plan: P('1 dk', 'Yeni üniteyi duyurun.', 'Dedektif olmaya hazırlanır.') }
  ]
}
];

for (const x of dersler) {
  const eski = d.etkinlikler.find(y => y.slug === x.slug);
  const e = { ...ortak, ...(eski || {}), ...x, ekran: { durum: 'hazir', modul: x.oyunlar[0].modul, aciklama: x.oyunlar[0].aciklama }, sunum: { slaytlar: x.slaytlar } };
  if (eski && !x.kagit) e.kagit = eski.kagit;
  if (eski && !x.not) e.not = eski.not;
  if (!e.not) e.not = {
    giris: x.slaytlar[0].plan.ogretmen, etkinlik: x.slaytlar.filter(s => s.tip === 'oyun').map(s => s.plan.ogretmen).join(' '), kapanis: x.slaytlar[x.slaytlar.length - 1].plan.ogretmen,
    sorular: x.slaytlar.filter(s => s.tip === 'tartisma').map(s => s.soru).concat(['ARF bugün ne öğrendi?', 'ARF\'a öğretirken neye dikkat ettik?']).slice(0, 3),
    yanilgilar: ['ARF her şeyi kendiliğinden bilir.', 'Bir kez göstermek yeter.'],
    degerlendirme: 'Gözlem: çocuk ' + x.kazanim.cocuk.charAt(0).toLowerCase() + x.kazanim.cocuk.slice(1),
    kolay: 'Oyunlarda kart sayısını azaltın; öğretmen her kartı birlikte okusun.', zor: 'Çocuklar ARF için yeni bir örnek önersin ve neden iyi bir örnek olduğunu söylesin.',
    aile: 'Evde çocuğunuza bir şeyi "örnek göstererek" öğretin (örneğin çorap eşleştirme) ve bunun ARF\'a öğretmeye benzediğini konuşun.' };
  delete e.slaytlar;
  const i = d.etkinlikler.findIndex(y => y.slug === e.slug);
  if (i >= 0) d.etkinlikler[i] = e;
  else { const son = d.etkinlikler.map(y => y.bant === 'oo' && y.dunya === 2).lastIndexOf(true); d.etkinlikler.splice(son + 1, 0, e); }
}
// yıllık planda 2. ünite slug'ları
const y = d.yillik.oo.filter(w => w.dunya === 2);
['oo-2-1', 'oo-2-2', 'oo-2-3', 'oo-2-4', 'oo-2-5', 'oo-2-6', 'oo-2-7'].forEach((s, i) => { if (y[i]) y[i].slug = s; });
fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
console.log('Ünite 2 (OÖ):', d.etkinlikler.filter(z => z.bant === 'oo' && z.dunya === 2).map(z => z.hafta + ':' + z.slug).join(' '));
