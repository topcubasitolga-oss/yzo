// Okul öncesi 1. ünite (Tanı), 3–8. haftalar. Çalıştır: node tools/unite1-oo.js (bir kez; slug varsa günceller)
'use strict';
const fs = require('fs');
const p = __dirname + '/../data/etkinlikler.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

const P = (sure, ogretmen, cocuk) => ({ sure, ogretmen, cocuk });
const ortak = { bant: 'oo', dunya: 1, sure: '20 dk', duzey: 'Farkındalık',
  program: { ad: 'Okul Öncesi Eğitim Programı', alan: 'Bilişsel gelişim: sınıflama, eşleştirme, sıralama. Dil gelişimi: dinleme, açıklama.', cikti: '' },
  hazirlik: '5 dk: sunumu tahtada açın, sesi açın.' };

const dersler = [
{
  kod: 'YZO-OÖ-1.2', slug: 'oo-1-2', hafta: 3, ad: 'Evimizdeki Akıllı Makineler', soru: 'Evimizde hangi makineler akıllı?',
  ozet: 'Bir evin içinde akıllı makineleri arar: sesli asistan, çizgi film öneren televizyon, süpürge robotu, yüz tanıyan telefon. Her birinin görüp duyduğunu ya da önerdiğini fark eder.',
  kazanim: { cocuk: 'Evimizdeki akıllı makineleri bulur, ne yaptıklarını söylerim: görür, duyar ya da önerir.', akademik: 'Günlük yaşamdaki yapay zekâ uygulamalarını tanır; algılama (görme, duyma) ve öneri işlevleriyle adlandırır.' },
  malzeme: ['Akıllı tahta', '"Evimdeki Akıllı Makineler" kâğıdı', 'Boya kalemleri'],
  oyunlar: [
    { modul: 'oo-1-2-ev', ad: 'Evde Ara, Bul', aciklama: 'Evin resminde akıllı makinelere dokun. Dört tane var!', tur: 'Sahnede bul' },
    { modul: 'oo-1-2-ne', ad: 'Ne Yapıyor?', aciklama: 'Her akıllı makine için seç: görüyor, duyuyor ya da öneriyor.', tur: 'Kart oyunu' }
  ],
  kagit: { baslik: 'Evimdeki Akıllı Makineler', yonerge: 'Evindeki akıllı makineleri çember içine al. Sonra evinde gördüğün bir akıllı makineyi çiz.', bloklar: [
    { tip: 'kartlar', baslik: 'Hangileri akıllı? Çember içine al.', ogeler: [{ emoji: '🔊', ad: 'Sesli asistan' }, { emoji: '🧸', ad: 'Oyuncak ayı' }, { emoji: '📺', ad: 'Akıllı televizyon' }, { emoji: '⏰', ad: 'Çalar saat' }, { emoji: '🧹', ad: 'Süpürge robotu' }, { emoji: '💡', ad: 'Lamba' }, { emoji: '📱', ad: 'Yüz tanıyan telefon' }, { emoji: '🪴', ad: 'Saksı' }] },
    { tip: 'cizim', baslik: 'Evimde gördüğüm akıllı makine' }] },
  not: { giris: 'ARF: "Evimizi gezelim mi?" Sunumla başlayın; çocuklara evlerinde neyle konuştuklarını sorun.', etkinlik: 'Sahnede bul oyununda çocuklar sırayla tahtaya gelip bir makineye dokunur. Ardından kart oyununda sınıfça oylayarak seçim yapılır.', kapanis: 'Bulunan dört makineyi tekrar sayın: görür, duyar, önerir.',
    sorular: ['Evinizde ARF gibi dinleyen bir makine var mı?', 'Televizyon sana çizgi filmi nasıl öneriyor?', 'Çalar saat neden akıllı değil?'],
    yanilgilar: ['Ekranı olan her şey akıllıdır.', 'Elektrikle çalışan her şey akıllıdır (lamba, çalar saat).'],
    degerlendirme: 'Gözlem: çocuk evdeki 4 akıllı makineden en az 3\'ünü bulur ve birinin ne yaptığını söyler.', kolay: 'Sahnede yalnız akıllı makineleri gösterin, birlikte sayın.', zor: '"Lamba sesle açılsaydı akıllı olur muydu?" sorusunu tartışın.',
    aile: 'Evde birlikte akıllı makine avına çıkın; bulduklarınızı çocuk ertesi gün sınıfa anlatsın.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'Evimizdeki Akıllı Makineler', metin: 'ARF bugün evimize misafir geliyor!', anlatim: 'Merhaba çocuklar! Bugün evinizi gezmek istiyorum.', plan: P('1 dk', 'ARF\'ı selamlayın; geçen haftayı hatırlatın: "ARF neyle görüyordu, neyle duyuyordu?"', 'ARF\'a el sallar, kamerayı ve mikrofonu hatırlar.') },
    { tip: 'soru', baslik: 'Evde hangisiyle konuşabiliriz?', secenekler: [{ emoji: '🛋️', ad: 'Koltuk' }, { emoji: '🔊', ad: 'Sesli asistan' }, { emoji: '🪴', ad: 'Saksı' }], metin: 'Dokun, seç.', plan: P('2 dk', 'Oylama yapın. Sesli asistanı seçenlere "Nereden biliyorsun?" diye sorun.', 'Oy verir, evinden örnek verir.') },
    { tip: 'konusma', baslik: 'ARF evi geziyor', balonlar: ['Bu evde benim gibi akıllı makineler var!', 'Biri sesinizi duyuyor.', 'Biri yüzünüzü görüyor.', 'Biri size yeni çizgi filmler öneriyor.', 'Hadi hepsini birlikte bulalım!'], plan: P('2 dk', 'Balonları sırayla açın. Her balonda "Bu hangi makine olabilir?" diye tahmin isteyin.', 'Tahmin eder: telefon, televizyon, sesli asistan.') },
    { tip: 'ikili', baslik: 'Akıllı mı, değil mi?', sol: { emoji: '✓', ad: 'Akıllı makine', ornekler: ['🔊 Sesli asistan', '📱 Yüz tanıyan telefon', '🧹 Süpürge robotu'] }, sag: { emoji: '✋', ad: 'Akıllı değil', ornekler: ['⏰ Çalar saat', '💡 Lamba', '🧸 Oyuncak ayı'] }, plan: P('2 dk', 'Örnekleri tek tek açın. Çalar saatte durun: "Hep aynı saatte çalar; seni görmez, karar vermez."', 'Her örnekte "akıllı!" ya da "değil!" der.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Evde ara, bul!', modul: 'oo-1-2-ev', plan: P('5 dk', 'Çocukları sırayla tahtaya çağırın; her çocuk bir nesneye dokunur. Yanlışta ARF nedenini söyler.', 'Evin resminde akıllı makineye dokunur.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Ne yapıyor?', modul: 'oo-1-2-ne', plan: P('4 dk', 'Her kartı okuyun; sınıf el kaldırarak "görüyor, duyuyor, öneriyor" seçeneklerinden birini oylar.', 'Gözünü, kulağını gösterir ya da "öneriyor" der.') },
    { tip: 'tartisma', soru: 'Sizin evinizde hangi akıllı makine var?', cevaplar: ['Telefonum yüzümü tanıyor.', 'Televizyon bana çizgi film öneriyor.', 'Annem sesli asistana şarkı açtırıyor.'], plan: P('2 dk', 'Çocukların örneklerini alın, sonra örnek cevapları açın.', 'Evinden bir örnek söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Evimdeki Akıllı Makineler', metin: 'Akıllı makineleri çember içine al, evindeki bir akıllı makineyi çiz.', plan: P('Ders sonu', 'Kâğıdı dağıtın, yönergeyi okuyun.', 'Çember içine alır, çizer.') },
    { tip: 'kapanis', baslik: 'Evimizde akıllı makineler var!', maddeler: ['Akıllı makineler görür, duyar, önerir.', 'Çalar saat ve lamba akıllı değildir.', 'Son kararı biz veririz.'], anlatim: 'Evinizi gezdirdiğiniz için teşekkürler! Görüşürüz.', plan: P('1 dk', 'Maddeleri birlikte okuyun; aile notunu hatırlatın.', 'Maddeleri tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-1.3', slug: 'oo-1-3', hafta: 4, ad: 'Her Robot Akıllı mı?', soru: 'Robot gibi görünen her şey akıllı mı?',
  ozet: 'Kurmalı oyuncak robot robot gibi görünür ama karar vermez; sesli asistan robota hiç benzemez ama akıllıdır. Çocuk görünüşe değil davranışa bakmayı öğrenir.',
  kazanim: { cocuk: 'Robot gibi görünmek akıllı olmak değildir; makinenin ne yaptığına bakarım.', akademik: 'Yapay zekâyı fiziksel görünüm yerine davranış (algılama ve karar verme) ölçütüyle ayırt eder; robot ile yapay zekâ kavramlarını ayırır.' },
  malzeme: ['Akıllı tahta', 'Varsa sınıfta bir oyuncak robot', '"Görünüşe Aldanma" kâğıdı'],
  oyunlar: [
    { modul: 'oo-1-3-robot', ad: 'Her Robot Akıllı mı?', aciklama: 'Robot gibi görünenleri ve görünmeyenleri ayır: kendi karar verir mi?', tur: 'Sürükle-bırak' },
    { modul: 'oo-1-3-hangisi', ad: 'Hangisi Akıllı?', aciklama: 'İki makineden hangisi kendi karar verir?', tur: 'Kart oyunu' }
  ],
  kagit: { baslik: 'Görünüşe Aldanma', yonerge: 'Her satırda kendi karar veren makineyi çember içine al. Sonra robota hiç benzemeyen akıllı bir makine çiz.', bloklar: [
    { tip: 'kartlar', baslik: 'Kendi karar vereni çember içine al', ogeler: [{ emoji: '🤖', ad: 'Kurmalı robot' }, { emoji: '🔊', ad: 'Sesli asistan' }, { emoji: '🧹', ad: 'Süpürge robotu' }, { emoji: '🧺', ad: 'Süpürge' }, { emoji: '🧸', ad: 'Konuşan ayı' }, { emoji: '📱', ad: 'Yüz tanıyan telefon' }, { emoji: '🦾', ad: 'Fabrika kolu' }, { emoji: '🚗', ad: 'Kendi giden araba' }] },
    { tip: 'cizim', baslik: 'Robota benzemeyen akıllı makine' }] },
  not: { giris: 'Varsa bir oyuncak robotu masaya koyun ve kurun. "Bu robot akıllı mı?" diye sorun, cevabı tartışmadan sunuma geçin.', etkinlik: 'Sürükle-bırak oyununda çocuklar sırayla gelir; kurmalı robot ve sesli asistan kartlarında özellikle durun. Kart oyununda sınıf oylar.', kapanis: '"Görünüşe değil, ne yaptığına bakarız." cümlesini birlikte söyleyin.',
    sorular: ['Kurmalı robot önüne duvar çıkınca ne yapar?', 'Sesli asistan robota benzemiyor; yine de neden akıllı?', 'ARF\'ın akıllı olduğunu nereden biliyoruz?'],
    yanilgilar: ['Robot = yapay zekâ.', 'Akıllı makineler hep insan ya da robot biçimindedir.'],
    degerlendirme: 'Gözlem: çocuk kurmalı robotun karar vermediğini ve sesli asistanın akıllı olduğunu gerekçesiyle söyler.', kolay: 'Yalnız kurmalı robot ve süpürge robotunu karşılaştırın.', zor: 'Fabrika kolunu tartışın: çok güçlü ama hep aynı işi yapar.',
    aile: 'Evdeki oyuncakları "kendi karar verir mi?" diye birlikte inceleyin.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'Her Robot Akıllı mı?', metin: 'Görünüşe mi bakarız, ne yaptığına mı?', anlatim: 'Bugün size bir bilmece soracağım!', plan: P('1 dk', 'Sınıftaki oyuncak robotu gösterin (varsa).', 'Robota bakar, tahmin eder.') },
    { tip: 'soru', baslik: 'Hangisi daha akıllı?', secenekler: [{ emoji: '🤖', ad: 'Kurmalı robot' }, { emoji: '🔊', ad: 'Sesli asistan' }, { emoji: '🦾', ad: 'Robot kol' }], metin: 'Dokun, seç. Sonunda bakacağız!', plan: P('2 dk', 'Oylayın; çoğu çocuk kurmalı robotu seçebilir. Cevabı söylemeyin.', 'Oy verir, nedenini söyler.') },
    { tip: 'konusma', baslik: 'ARF\'ın bilmecesi', ruh: 'saskin', balonlar: ['Bir oyuncak robotum var. Robota çok benziyor!', 'Ama kurunca hep aynı yöne yürüyor.', 'Önüne duvar çıkınca bile duramıyor. Bum!', 'Bir de sesli asistan var. Robota hiç benzemiyor.', 'Ama sesini duyuyor ve cevap veriyor. Sence hangisi akıllı?'], plan: P('3 dk', 'Balonları açın; "Bum!" balonunda kurmalı robotun duvara çarpışını el hareketiyle canlandırın.', 'Dinler, robotun çarpmasını canlandırır.') },
    { tip: 'ikili', baslik: 'Görünüşe aldanma!', sol: { emoji: '🤖', ad: 'Robota benziyor ama akıllı değil', ornekler: ['🤖 Kurmalı robot', '🧸 Konuşan ayı', '🦾 Fabrika kolu'] }, sag: { emoji: '✓', ad: 'Robota benzemiyor ama akıllı', ornekler: ['🔊 Sesli asistan', '📱 Yüz tanıyan telefon', '📺 Öneren televizyon'] }, plan: P('2 dk', 'İki sütunu sırayla açın. 2. slayttaki soruya dönün: sesli asistan daha akıllıydı.', 'Her örnekte nedenini söyler.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Her robot akıllı mı?', modul: 'oo-1-3-robot', plan: P('5 dk', 'Çocuklar sırayla kartları sürükler. Yanlışta ARF ipucu verir; sınıfa "Yardım edelim mi?" diye sorun.', 'Kartı doğru kutuya taşır.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Hangisi akıllı?', modul: 'oo-1-3-hangisi', plan: P('3 dk', 'Her kartta iki makine var; sınıf "soldaki" ya da "sağdaki" diye oylar.', 'Sağ ya da sol elini kaldırarak oy verir.') },
    { tip: 'tartisma', soru: 'Bir makinenin akıllı olduğunu nereden anlarız?', cevaplar: ['Bizi görüyorsa.', 'Bizi duyuyorsa.', 'Kendi karar veriyorsa.'], plan: P('2 dk', 'Çocukların cevaplarını alın; örnek cevapları açın.', 'Bir ölçüt söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Görünüşe Aldanma', metin: 'Kendi karar veren makineleri çember içine al, robota benzemeyen akıllı bir makine çiz.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Çember içine alır, çizer.') },
    { tip: 'kapanis', baslik: 'Görünüşe değil, ne yaptığına bakarız!', maddeler: ['Robot gibi görünen her şey akıllı değildir.', 'Robota benzemeyen bir telefon akıllı olabilir.', 'Akıllı makine görür, duyar, karar verir.'], plan: P('1 dk', 'Cümleyi hep birlikte söyleyin.', 'Cümleyi tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-1.4', slug: 'oo-1-4', hafta: 5, ad: 'Tarif mi, Öğrenme mi?', soru: 'Makineler nasıl çalışır?',
  ozet: 'Bazı makineler bir tarifi baştan sona takip eder (çamaşır makinesi, fırın). Çocuklar diş fırçalama ve kek tariflerini sıraya dizerek "tarif" fikrini yaşar; ARF\'ın ise örneklerden öğrenebildiğini duyar.',
  kazanim: { cocuk: 'Tarifi sırasıyla yaparım; bazı makineler de tarifi takip eder.', akademik: 'Algoritmayı adım adım sıralı yönerge olarak deneyimler; kurala dayalı çalışan makine ile örneklerden öğrenen sistem arasındaki farkı sezgisel olarak fark eder.' },
  malzeme: ['Akıllı tahta', '"Tarif Kartları" kâğıdı', 'Makas, yapıştırıcı'],
  oyunlar: [
    { modul: 'oo-1-4-dis', ad: 'Diş Fırçalama Tarifi', aciklama: 'Dört adımı doğru sıraya diz.', tur: 'Sırala' },
    { modul: 'oo-1-4-kek', ad: 'ARF\'ın Kek Tarifi', aciklama: 'ARF kek yapmak istiyor; tarifi doğru sıraya diz.', tur: 'Sırala' }
  ],
  kagit: { baslik: 'Tarif Kartları', yonerge: 'Kartları kes. Doğru sıraya dizip kutulara yapıştır.', bloklar: [
    { tip: 'kartlar', baslik: 'Kes, sırala, yapıştır', ogeler: [{ emoji: '😁', ad: 'Fırçala' }, { emoji: '🪥', ad: 'Fırçayı al' }, { emoji: '💧', ad: 'Çalkala' }, { emoji: '🧴', ad: 'Macunu sür' }] },
    { tip: 'tablo', basliklar: ['1', '2', '3', '4'], satir: 1 }] },
  not: { giris: 'Sınıfta bir tarifi canlandırın: el yıkama. "Önce ne yaparız?" diye sorun.', etkinlik: 'Sırala oyunlarında çocuklar kartları yuvalara taşır, sınıf "ARF, kontrol et!" düğmesine birlikte basar. Yanlış yuvalar kırmızı yanar.', kapanis: '"Makineler tarifi takip eder; ARF ise örneklerden öğrenir." Gelecek ünitede ARF\'a örnek göstereceğimizi söyleyin.',
    sorular: ['Kekte fırına koymayı başa alsak ne olur?', 'Çamaşır makinesi hangi tarifi takip ediyor?', 'ARF\'a yeni bir şeyi nasıl öğretebiliriz?'],
    yanilgilar: ['Sıranın önemi yoktur.', 'Bütün makineler kendi kendine öğrenir.'],
    degerlendirme: 'Gözlem: çocuk 4 adımlık bir tarifi doğru sıralar ve "önce, sonra" sözcüklerini kullanır.', kolay: '3 adımlık tarif (macun adımını çıkarın).', zor: 'Çocuklar kendi tariflerini (ayakkabı giyme) anlatır, sınıf sıralar.',
    aile: 'Evde birlikte basit bir tarif yapın (meyve salatası); çocuk adımları sırayla söylesin.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'Tarif mi, Öğrenme mi?', metin: 'Makineler nasıl çalışır?', anlatim: 'Bugün mutfağa giriyoruz! Kek yapacağız.', plan: P('1 dk', 'ARF\'ın kek yapacağını söyleyin.', 'Merakla dinler.') },
    { tip: 'konusma', baslik: 'Çamaşır makinesinin tarifi', balonlar: ['Çamaşır makinesi bir tarif biliyor.', 'Önce su alır, sonra yıkar, sonra durular, sonra sıkar.', 'Her gün aynı tarifi baştan sona yapar.', 'Ama yeni bir şey öğrenemez.'], plan: P('3 dk', 'Her balonda adımı el hareketiyle canlandırın (su alma, dönme).', 'Hareketleri taklit eder.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Diş fırçalama tarifi', modul: 'oo-1-4-dis', plan: P('4 dk', 'Çocuklar kartları sırayla yuvalara taşır. "ARF, kontrol et!" düğmesine birlikte basın.', 'Kartı yuvaya taşır, "önce, sonra" der.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: ARF\'ın kek tarifi', modul: 'oo-1-4-kek', plan: P('4 dk', 'Önce yanlış sırayı bilerek deneyin (fırın başta): "Kek olur mu?" diye gülerek sorun.', 'Yanlışı fark eder, düzeltir.') },
    { tip: 'konusma', baslik: 'ARF farklı', ruh: 'sevincli', balonlar: ['Fırın ve çamaşır makinesi tarifi takip eder.', 'Ben de tarif takip edebilirim.', 'Ama ben bir şey daha yapabilirim:', 'Bana örnek gösterirseniz, öğrenirim!', 'Gelecek ünitede bana örnek göstereceksiniz.'], plan: P('2 dk', 'Son balonla gelecek üniteye merak uyandırın.', 'Dinler, ARF\'a ne göstereceğini söyler.') },
    { tip: 'tartisma', soru: 'Sen hangi tarifi biliyorsun?', cevaplar: ['Ellerimi yıkamayı.', 'Ayakkabımı giymeyi.', 'Meyve salatası yapmayı.'], plan: P('2 dk', 'Bir çocuğun tarifini sınıfça adım adım söyleyin.', 'Bildiği bir tarifi adım adım anlatır.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Tarif Kartları', metin: 'Kartları kes, doğru sıraya dizip yapıştır.', plan: P('Ders sonu', 'Makas ve yapıştırıcı dağıtın; kesme işinde yardım edin.', 'Keser, sıralar, yapıştırır.') },
    { tip: 'kapanis', baslik: 'Önce, sonra, en son!', maddeler: ['Tarif sırayla yapılır.', 'Bazı makineler tarifi takip eder.', 'ARF örneklerden de öğrenebilir.'], plan: P('1 dk', '"Önce, sonra, en son" tekerlemesini söyleyin.', 'Tekerlemeyi söyler.') }
  ]
},
{
  kod: 'YZO-OÖ-1.5', slug: 'oo-1-5', hafta: 6, ad: 'ARF\'la Nasıl Konuşuruz?', soru: 'ARF ne istediğimizi nasıl anlar?',
  ozet: 'ARF aklımızdan geçeni bilemez; ne istediğimizi açık ve kibar söylemeliyiz. Çocuklar hangi isteği ARF\'ın anlayacağına karar verir ve soru sorma adımlarını sıralar.',
  kazanim: { cocuk: 'ARF\'la açık ve kibar konuşurum; ARF düşüncelerimi okuyamaz.', akademik: 'Sesli asistanlarla etkileşimde açık yönergenin önemini fark eder; yapay zekânın zihin okuyamayacağını, girdiye bağlı olduğunu anlar.' },
  malzeme: ['Akıllı tahta', 'Varsa sesli asistan (öğretmen cihazı)', '"ARF\'a Ne Sorayım?" kâğıdı'],
  oyunlar: [
    { modul: 'oo-1-5-anlar', ad: 'ARF Bunu Anlar mı?', aciklama: 'Hangi isteği ARF anlar, hangisini anlamaz?', tur: 'Kart oyunu' },
    { modul: 'oo-1-5-sira', ad: 'Soru Sorma Sırası', aciklama: 'ARF\'a soru sorma adımlarını sıraya diz.', tur: 'Sırala' }
  ],
  kagit: { baslik: 'ARF\'a Ne Sorayım?', yonerge: 'ARF\'ın anlayacağı istekleri yeşil kutuya, anlamayacaklarını gri kutuya çizgiyle bağla. Sonra ARF\'a sormak istediğin soruyu çiz.', bloklar: [
    { tip: 'iki-kutu', sol: { ad: 'ARF anlar', simge: '👍' }, sag: { ad: 'ARF anlamaz', simge: '🤔' }, ogeler: [{ emoji: '🐱', ad: 'Kedi resmi göster' }, { emoji: '🌀', ad: 'Şey yap' }, { emoji: '🎵', ad: 'Şarkı aç' }, { emoji: '🤫', ad: 'Hiç konuşmamak' }] },
    { tip: 'cizim', baslik: 'ARF\'a sormak istediğim soru' }] },
  not: { giris: 'Varsa sınıfta sesli asistana iki istek söyleyin: biri belirsiz ("şey aç"), biri açık ("çocuk şarkısı aç"). Sonucu çocuklarla izleyin.', etkinlik: 'Kart oyununda sınıf oylar; "anlamaz" cevaplarında "Nasıl söylersek anlar?" diye sorup cümleyi düzeltin. Sırala oyununda adımları dizin.', kapanis: '"ARF aklımızı okuyamaz, söylememiz gerekir" cümlesiyle bitirin.',
    sorular: ['"Şey yap" deyince ARF neden anlamadı?', 'ARF senin en sevdiğin rengi bilebilir mi?', 'ARF\'la konuşurken neden kibar oluruz?'],
    yanilgilar: ['ARF düşüncelerimizi bilir.', 'Makineye kaba konuşmak sorun değildir; kibarlık alışkanlıktır, herkesle sürdürürüz.'],
    degerlendirme: 'Gözlem: çocuk belirsiz bir isteği açık bir isteğe çevirir.', kolay: 'Yalnız iki kart: kedi resmi ve "şey yap".', zor: 'Çocuklar ARF için açık bir istek cümlesi kurar, sınıf "anlar mı?" diye oylar.',
    aile: 'Evde sesli asistan varsa çocukla birlikte açık ve kibar bir istek deneyin; kişisel bilgi söylemeyin.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'ARF\'la Nasıl Konuşuruz?', metin: 'ARF ne istediğimizi nasıl anlar?', anlatim: 'Bugün benimle nasıl konuşacağınızı öğreneceğiz.', plan: P('1 dk', 'ARF\'ı selamlayın.', 'ARF\'a "Merhaba ARF!" der.') },
    { tip: 'konusma', baslik: 'ARF anlamadı!', ruh: 'saskin', balonlar: ['Dün bir çocuk bana "Şey yap!" dedi.', 'Hangi şeyi? Anlayamadım!', 'Ben aklınızdan geçeni bilemem.', 'Bana ne istediğinizi açıkça söylemelisiniz.'], plan: P('3 dk', 'ARF\'ın şaşkın yüzünü gösterin. "Sizce o çocuk ne istiyordu?" diye sorun.', 'Tahmin eder, açık bir cümle önerir.') },
    { tip: 'ikili', baslik: 'Belirsiz mi, açık mı?', sol: { emoji: '🌀', ad: 'Belirsiz', ornekler: ['"Şey yap."', '"Onu aç."', '"Bilirsin işte!"'] }, sag: { emoji: '👍', ad: 'Açık', ornekler: ['"Kedi resmi göster."', '"Çocuk şarkısı aç."', '"Yarın hava nasıl?"'] }, plan: P('2 dk', 'Belirsiz cümleleri sınıfça açık cümleye çevirin.', 'Belirsiz cümleyi düzeltir.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: ARF bunu anlar mı?', modul: 'oo-1-5-anlar', plan: P('5 dk', 'Kartları okuyun, sınıf oylasın. "Anlamaz" kartlarında cümleyi birlikte düzeltin.', 'Başparmak yukarı ya da düşünen yüzle oy verir.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Soru sorma sırası', modul: 'oo-1-5-sira', plan: P('4 dk', 'Çocuklar adımları sıralar; sonra adımları canlandırın: bir çocuk ARF olur.', 'Adımları sıralar ve canlandırır.') },
    { tip: 'tartisma', soru: 'ARF\'a ne sormak istersin?', cevaplar: ['Dinozorlar ne yerdi?', 'Ay neden parlıyor?', 'En hızlı hayvan hangisi?'], plan: P('2 dk', 'Çocukların sorularını alın; açık olup olmadığını birlikte kontrol edin.', 'Açık bir soru söyler.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: ARF\'a Ne Sorayım?', metin: 'Anlar/anlamaz eşleştir, sorunu çiz.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Eşleştirir, çizer.') },
    { tip: 'kapanis', baslik: 'Açık ve kibar konuşuruz!', maddeler: ['ARF aklımızdan geçeni bilemez.', 'Ne istediğimizi açıkça söyleriz.', 'Her zaman kibar oluruz.'], plan: P('1 dk', 'Maddeleri okuyun.', 'Tekrar eder.') }
  ]
},
{
  kod: 'YZO-OÖ-1.6', slug: 'oo-1-6', hafta: 7, ad: 'Mahallede Yapay Zekâ Avı', soru: 'Sokakta da akıllı makineler var mı?',
  ozet: 'Mahallede akıllı makineleri arar: yol bulan araba, kameralı kapı zili, meyveyi tanıyan kasa, yol tarifi veren harita. Trafik ışığı ve otobüsün neden akıllı olmadığını konuşur.',
  kazanim: { cocuk: 'Mahallemdeki akıllı makineleri bulurum.', akademik: 'Yapay zekâ uygulamalarını ev dışındaki kamusal alanlarda tanır ve otomasyonla karşılaştırır.' },
  malzeme: ['Akıllı tahta', '"Mahalle Haritam" kâğıdı', 'Boya kalemleri'],
  oyunlar: [
    { modul: 'oo-1-6-mahalle', ad: 'Mahallede Ara, Bul', aciklama: 'Mahalle resminde akıllı makinelere dokun.', tur: 'Sahnede bul' },
    { modul: 'oo-1-6-tekrar', ad: 'Evde ve Sokakta', aciklama: 'Evden ve sokaktan makineleri iki kutuya ayır.', tur: 'Sürükle-bırak' }
  ],
  kagit: { baslik: 'Mahalle Haritam', yonerge: 'Mahallende gördüğün yerleri çiz. Akıllı makine gördüğün yere bir yıldız koy.', bloklar: [
    { tip: 'cizim', baslik: 'Benim mahallem' },
    { tip: 'sayac', baslik: 'Kaç akıllı makine buldum? Boya.', adet: 6 }] },
  not: { giris: 'Okuldan eve gelirken yolda neler gördüklerini sorun.', etkinlik: 'Sahnede bul oyununda çocuklar sırayla dokunur; trafik ışığında durun: "Saatine göre yanar, seni görmez." Sürükle-bırak oyunuyla tekrar edin.', kapanis: 'Bu ünitede bulduğumuz bütün akıllı makineleri sayın; gelecek hafta meydan okuma var.',
    sorular: ['Market kasası meyvenin adını nasıl biliyor?', 'Trafik ışığı neden akıllı değil?', 'Okulumuzda akıllı makine var mı?'],
    yanilgilar: ['Elektrikli her sokak eşyası akıllıdır.', 'Akıllı makineler yalnız evde olur.'],
    degerlendirme: 'Gözlem: çocuk mahalle sahnesinde en az 3 akıllı makine bulur.', kolay: 'Sahnede yalnız akıllı makineleri gösterip birlikte sayın.', zor: '"Trafik ışığı akıllı olsaydı ne yapardı?" sorusunu tartışın.',
    aile: 'Market ya da park yolunda birlikte akıllı makine arayın.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'Mahallede Yapay Zekâ Avı', metin: 'ARF\'la sokağa çıkıyoruz!', anlatim: 'Hazır mısınız? Mahalleyi geziyoruz!', plan: P('1 dk', 'Avcı şapkası hareketi yapın; çocukları ava hazırlayın.', 'Dürbün hareketi yapar.') },
    { tip: 'konusma', baslik: 'ARF sokakta', balonlar: ['Sokakta da benim gibi akıllı makineler var!', 'Biri yolu buluyor.', 'Biri kapıya geleni görüyor.', 'Biri meyveye bakıp adını söylüyor.', 'Ama trafik ışığı akıllı değil. Neden olabilir?'], plan: P('3 dk', 'Son balonda tahmin isteyin.', 'Trafik ışığı için tahmin eder.') },
    { tip: 'oyun', baslik: 'Etkinlik 1: Mahallede ara, bul!', modul: 'oo-1-6-mahalle', plan: P('5 dk', 'Çocuklar sırayla tahtaya gelip dokunur. Yanlışlarda ARF\'ın açıklamasını tekrar edin.', 'Mahalle resminde akıllı makineye dokunur.') },
    { tip: 'oyun', baslik: 'Etkinlik 2: Evde ve sokakta', modul: 'oo-1-6-tekrar', plan: P('4 dk', 'Bu ünitede öğrendiklerimizin tekrarı. Hızlı oynayın.', 'Kartı doğru kutuya taşır.') },
    { tip: 'tartisma', soru: 'Okulumuzda akıllı makine var mı?', cevaplar: ['Öğretmenin bilgisayarı.', 'Akıllı tahta.', 'Kapıdaki kamera.'], plan: P('2 dk', 'Çocukların cevaplarını gerçekten akıllı mı diye birlikte kontrol edin (akıllı tahta bir ekrandır; üstünde akıllı programlar çalışabilir).', 'Okulundan örnek verir.') },
    { tip: 'kagit', baslik: 'Çalışma kâğıdı: Mahalle Haritam', metin: 'Mahalleni çiz, akıllı makinelere yıldız koy.', plan: P('Ders sonu', 'Kâğıdı dağıtın.', 'Mahallesini çizer.') },
    { tip: 'kapanis', baslik: 'Akıllı makineler her yerde!', maddeler: ['Evde de sokakta da akıllı makineler var.', 'Trafik ışığı saatine göre yanar; akıllı değildir.', 'Gelecek hafta büyük sınav var!'], anlatim: 'Gelecek hafta büyük bir sınavım var. Bana yardım eder misiniz?', plan: P('1 dk', 'Meydan okuma haftasını duyurun.', 'Hazırım der!') }
  ]
},
{
  kod: 'YZO-OÖ-1.7', slug: 'oo-1-7', hafta: 8, ad: 'Meydan Okuma: ARF\'ın Büyük Sınavı', soru: 'ARF\'ı ve akıllı makineleri tanıyor muyuz?',
  ozet: 'Ünitenin sonunda sınıf ARF\'a yardım eder: doğru-yanlış kartları, üç kutulu sınıflama ve ev sahnesi tekrarı. Sınıf "Tanıyıcı" rozetini kazanır.',
  kazanim: { cocuk: 'ARF\'ı, canlıları, makineleri ve akıllı makineleri ayırt ederim.', akademik: '1. ünite kazanımlarını bütünleşik olarak gösterir: canlı-makine-akıllı makine ayrımı, algılama araçları, görünüş-davranış ayrımı.' },
  malzeme: ['Akıllı tahta', '"Tanıyıcı Rozeti" kâğıdı', 'Boya kalemleri'],
  oyunlar: [
    { modul: 'oo-1-7-dogru', ad: 'ARF Diyor ki', aciklama: 'ARF\'ın cümleleri doğru mu, yanlış mı?', tur: 'Kart oyunu' },
    { modul: 'oo-1-7-uc', ad: 'Üç Kutu', aciklama: 'Canlı, makine ve akıllı makineyi ayır.', tur: 'Sürükle-bırak' },
    { modul: 'oo-1-2-ev', ad: 'Evde Ara, Bul (tekrar)', aciklama: 'Evdeki akıllı makineleri hızlıca bul.', tur: 'Sahnede bul' }
  ],
  kagit: { baslik: 'Tanıyıcı Rozeti', yonerge: 'Rozetini boya. Sonra ARF\'a öğretmek istediğin ilk şeyi çiz.', bloklar: [
    { tip: 'metin', icerik: 'Bu rozet, 1. üniteyi tamamlayan sınıfımızın "Tanıyıcı" rozetidir. 🔍' },
    { tip: 'sayac', baslik: 'Rozetin yıldızlarını boya', adet: 5 },
    { tip: 'cizim', baslik: 'ARF\'a öğretmek istediğim ilk şey' }] },
  not: { giris: 'ARF\'ın büyük sınavı olduğunu, sınıfın yardımına ihtiyacı olduğunu söyleyin.', etkinlik: 'Üç oyunu sırayla oynayın; her oyunda farklı çocuklar tahtaya gelsin. Kim gelmediyse son oyunda çağırın.', kapanis: 'Rozet slaytında sınıfça alkışlayın; rozet kâğıdını boyatın, panoya asın.',
    sorular: ['Bu ünitede en çok neyi sevdin?', 'ARF bir canlı mı?', 'Bir makinenin akıllı olduğunu nereden anlarız?'],
    yanilgilar: ['Ünite boyunca görülen yanılgılar (canlılık, robot görünüşü) son kez kontrol edilir.'],
    degerlendirme: 'Ünite sonu kontrol listesi: (1) ARF\'ın makine olduğunu söyler, (2) kamera-görme ve mikrofon-duyma eşleştirmesini yapar, (3) canlı-makine-akıllı makine ayrımını yapar, (4) görünüşe değil davranışa bakar. Her madde için: başladı, gelişiyor, başardı.',
    kolay: 'Üç kutu oyununda yalnız canlı ve makine kutularını kullanın.', zor: 'Çocuklar kendi "ARF diyor ki" cümlelerini uydurur, sınıf doğru mu yanlış mı diye oylar.',
    aile: 'Rozeti eve götürüp ailesine bu ünitede öğrendiklerini anlatsın.' },
  slaytlar: [
    { tip: 'kapak', baslik: 'ARF\'ın Büyük Sınavı', metin: 'ARF\'a yardım edelim!', ruh: 'saskin', anlatim: 'Çocuklar, bugün büyük sınavım var. Bana yardım eder misiniz?', plan: P('1 dk', 'Heyecan yaratın: "ARF\'a yardım edelim mi?"', 'Evet! der.') },
    { tip: 'konusma', baslik: 'Neler öğrendik?', balonlar: ['Ben bir makineyim; kameramla görür, mikrofonumla duyarım.', 'Akıllı makineler görür, duyar ve karar verir.', 'Robot gibi görünen her şey akıllı değildir.', 'Benimle açık ve kibar konuşursunuz.'], plan: P('2 dk', 'Her balonda çocuklara "Doğru mu?" diye sorun.', 'Her balonu onaylar.') },
    { tip: 'oyun', baslik: 'Sınav 1: ARF diyor ki…', modul: 'oo-1-7-dogru', plan: P('4 dk', 'Kartları okuyun; sınıf doğru-yanlış oylar.', 'Oy verir, nedenini söyler.') },
    { tip: 'oyun', baslik: 'Sınav 2: Üç kutu', modul: 'oo-1-7-uc', plan: P('5 dk', 'Çocuklar sırayla sürükler; 8 kart var, 8 farklı çocuk gelsin.', 'Kartı doğru kutuya taşır.') },
    { tip: 'oyun', baslik: 'Sınav 3: Evde ara, bul!', modul: 'oo-1-2-ev', plan: P('3 dk', 'Hızlı tekrar: kimler hâlâ tahtaya gelmediyse onları çağırın.', 'Akıllı makineye dokunur.') },
    { tip: 'rozet', baslik: 'Tanıyıcı Rozeti', metin: 'Bu sınıf ARF\'ı ve akıllı makineleri tanıyor!', emoji: '🔍', anlatim: 'Yaşasın! Sınavı geçtik. Siz artık birer Tanıyıcısınız!', plan: P('2 dk', 'Sınıfça alkışlayın. Rozet kâğıdını dağıtın.', 'Alkışlar, rozetini boyar.') },
    { tip: 'kapanis', baslik: 'Gelecek ünite: Nasıl öğrenir?', maddeler: ['1. ünite tamam: Tanıyıcı rozeti bizim!', 'Gelecek ünitede ARF\'a örnek göstererek öğreteceğiz.'], anlatim: 'Gelecek hafta bana yeni şeyler öğreteceksiniz. Sabırsızlanıyorum!', plan: P('1 dk', 'Gelecek üniteyi duyurun.', 'ARF\'a ne öğreteceğini söyler.') }
  ]
}
];

for (const x of dersler) {
  const e = { ...ortak, ...x, ekran: { durum: 'hazir', modul: x.oyunlar[0].modul, aciklama: x.oyunlar[0].aciklama }, sunum: { slaytlar: x.slaytlar } };
  delete e.slaytlar;
  const i = d.etkinlikler.findIndex(y => y.slug === e.slug);
  if (i >= 0) d.etkinlikler[i] = e;
  else {
    const son = d.etkinlikler.map(y => y.bant === 'oo' && y.dunya === 1).lastIndexOf(true);
    d.etkinlikler.splice(son + 1, 0, e);
  }
}
const h2 = d.etkinlikler.find(y => y.slug === 'oo-1-1'); if (h2) h2.hafta = 2;
fs.writeFileSync(p, JSON.stringify(d, null, 2) + '\n');
console.log('Ünite 1 (OÖ):', d.etkinlikler.filter(y => y.bant === 'oo' && y.dunya === 1).map(y => y.hafta + ':' + y.slug).join(' '));
