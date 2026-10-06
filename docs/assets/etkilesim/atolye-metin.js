// ARF Atölyesi: ARF'la Hikâye Yazalım (metin atölyesi).
// Başlangıcı çocuk kurar, ARF üç devam önerir (biri bilerek hatalı), çocuk seçer ve inceler, sonu kendisi yazar, beyan eder.
// Öneriler hazır şablonlardır; hiçbir metin dışarı gönderilmez.
YZO.kaydet('atolye-metin', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var KAHRAMAN = [
    { id: 'pamuk', ad: 'Minik kedi Pamuk', kisa: 'Pamuk', emoji: '🐱' },
    { id: 'tospi', ad: 'Kaplumbağa Tospi', kisa: 'Tospi', emoji: '🐢' },
    { id: 'ece', ad: 'Ece', kisa: 'Ece', emoji: '👧' },
    { id: 'arf', ad: 'ARF', kisa: 'ARF', emoji: '🤖' }
  ];
  var YER = [
    { id: 'vapur', ad: 'İstanbul\'da bir vapurda', emoji: '⛴️' },
    { id: 'kapadokya', ad: 'Kapadokya\'da balonların arasında', emoji: '🎈' },
    { id: 'yayla', ad: 'Karadeniz\'de bir yaylada', emoji: '⛰️' },
    { id: 'bahce', ad: 'okul bahçesinde', emoji: '🏫' }
  ];
  var SORUN = [
    { id: 'ucurtma', ad: 'uçurtması rüzgârla uçup gitti', emoji: '🪁' },
    { id: 'yagmur', ad: 'sağanak bir yağmur başladı', emoji: '🌧️' },
    { id: 'uzgun', ad: 'arkadaşının çok üzgün olduğunu gördü', emoji: '😢' },
    { id: 'anahtar', ad: 'evin anahtarını kaybetti', emoji: '🔑' }
  ];
  // Her sorun için üç öneri; [2] bilerek yanlış (karakter adını karıştırır ya da olmayacak bir şey söyler)
  var ONERI = {
    ucurtma: ['{k} uçurtmanın ipini görüp koşmaya başladı. Bir ağacın dalına takılmıştı.', '{k} yardım istemeye karar verdi. Uzun boylu bir amca uçurtmayı indirmeye yardım etti.', '{y2} uçurtmayı yakalamak için kanatlarını açıp gökyüzüne uçtu.'],
    yagmur: ['{k} hemen bir saçağın altına sığındı ve yağmurun sesini dinledi.', '{k} çantasındaki şemsiyeyi hatırladı ve şemsiyesini açtı.', 'Yağmur damlaları yere düşünce şekere dönüştü ve {y2} hepsini yedi.'],
    uzgun: ['{k} arkadaşının yanına oturdu ve "Neden üzgünsün?" diye sordu.', '{k} arkadaşını güldürmek için komik bir yüz yaptı.', '{y2} arkadaşına "Üzülmek yasak!" diye bağırdı ve yanından gitti.'],
    anahtar: ['{k} geldiği yolu adım adım geri yürüdü ve yerlere baktı.', '{k} en yakın büyüğüne gidip anahtarını kaybettiğini söyledi.', '{y2} kapıyı açmak için sihirli bir kelime söyledi ve kapı kendi açıldı.']
  };
  var YANLIS_NEDEN = {
    ucurtma: 'Hikâyenin kahramanı {k}, ama öneride {y2} yazıyor. Üstelik kimse kanat açıp uçamaz; ARF uydurdu!',
    yagmur: 'Hikâyenin kahramanı {k}, ama öneride {y2} yazıyor. Üstelik yağmur şekere dönüşmez; ARF uydurdu!',
    uzgun: 'Hikâyenin kahramanı {k}, ama öneride {y2} yazıyor. Üstelik üzgün bir arkadaşa bağırmak nazik değil.',
    anahtar: 'Hikâyenin kahramanı {k}, ama öneride {y2} yazıyor. Üstelik kapılar sihirli kelimeyle açılmaz; ARF uydurdu!'
  };
  var SONLAR = ['Sonunda…', 'O günden sonra…', 'Herkes çok mutlu oldu çünkü…'];
  var s = { adim: 1, kahraman: null, yer: null, sorun: null, oneri: null, son: '', yanlisBulundu: false };

  function bul(dizi, id) { return dizi.filter(function (x) { return x.id === id; })[0]; }
  function baslangic() {
    var k = bul(KAHRAMAN, s.kahraman), y = bul(YER, s.yer), z = bul(SORUN, s.sorun);
    return k.ad + ', ' + y.ad + ' dolaşıyordu. Birden ' + z.ad + '!';
  }
  function oneriler() {
    var k = bul(KAHRAMAN, s.kahraman), baska = KAHRAMAN.filter(function (x) { return x.id !== s.kahraman; })[0];
    return ONERI[s.sorun].map(function (t) { return t.replace('{k}', k.kisa).replace('{y2}', baska.kisa); });
  }
  function adimlar() {
    return el('ol', { class: 'atolye-adimlar' }, ['Düşün', 'İste', 'İncele', 'Sonu yaz', 'Beyan et'].map(function (a, i) {
      return el('li', { class: (i + 1 === s.adim ? 'simdi' : i + 1 < s.adim ? 'bitti' : '') }, [el('span', {}, [String(i + 1)]), a]);
    }));
  }
  function kartSatiri(baslik, dizi, alan) {
    var satir = el('div', { class: 'istem-satir' }, [el('strong', {}, [baslik])]);
    var kartlar = el('div', { class: 'istem-kartlar' });
    dizi.forEach(function (x) {
      kartlar.appendChild(el('button', { type: 'button', class: 'istem-kart' + (s[alan] === x.id ? ' secili' : ''), onclick: function () { s[alan] = x.id; ciz(); } }, [el('span', { class: 'resim', 'aria-hidden': 'true' }, [x.emoji]), x.ad]));
    });
    satir.appendChild(kartlar);
    return satir;
  }

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun atolye' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, ['ARF\'la hikâye yazalım']), el('span', { class: 'ilerleme' }, ['Metin atölyesi'])]));
    oyun.appendChild(adimlar());
    var sahne = el('div', { class: 'sahne' });
    oyun.appendChild(sahne);

    if (s.adim === 1) {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Hikâyenin başı senden!', el('span', { class: 'aciklama' }, ['Kahramanını, yerini ve başına gelen olayı sen seç. Hikâyenin fikri senin olacak.'])])]));
      sahne.appendChild(kartSatiri('Kahraman', KAHRAMAN, 'kahraman'));
      sahne.appendChild(kartSatiri('Nerede?', YER, 'yer'));
      sahne.appendChild(kartSatiri('Ne oldu?', SORUN, 'sorun'));
      var tamam = s.kahraman && s.yer && s.sorun;
      if (tamam) sahne.appendChild(el('div', { class: 'hikaye-sayfa' }, [el('p', {}, [baslangic()])]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim mavi', type: 'button', disabled: !tamam, onclick: function () { s.adim = 2; ciz(); } }, ['ARF, devamı için öneri ver'])]));
      return;
    }

    if (s.adim === 2) {
      sahne.appendChild(el('div', { class: 'hikaye-sayfa' }, [el('p', {}, [baslangic()])]));
      sahne.appendChild(el('div', { class: 'geri-bildirim dogru' }, [Y.robot(), el('div', {}, ['Üç öneri yazdım. Birini seç ya da hiçbirini beğenmezsen kendin yaz.', el('span', { class: 'aciklama' }, ['Dikkat: ben de yanılabilirim. Önerilerimi iyi oku!'])])]));
      var liste = el('div', { class: 'oneri-liste' });
      oneriler().forEach(function (t, i) {
        liste.appendChild(el('button', { type: 'button', class: 'oneri' + (s.oneri === i ? ' secili' : ''), onclick: function () { s.oneri = i; s.kendi = ''; ciz(); } }, [el('span', { class: 'harf' }, ['ABC'[i]]), t]));
      });
      sahne.appendChild(liste);
      var kendi = el('textarea', { id: 'kendi-devam', rows: '2', placeholder: 'Ya da devamını kendin yaz…', 'aria-label': 'Hikâyenin devamını kendin yaz' });
      kendi.value = s.kendi || '';
      kendi.addEventListener('input', function () { s.kendi = kendi.value; if (kendi.value.trim()) s.oneri = null; devamDugme.disabled = s.oneri === null && !kendi.value.trim(); });
      sahne.appendChild(kendi);
      var devamDugme = el('button', { class: 'secim mavi', type: 'button', disabled: s.oneri === null && !(s.kendi || '').trim(), onclick: function () { s.adim = 3; ciz(); } }, ['Seçtim, inceleyelim']);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [devamDugme]));
      return;
    }

    var orta = s.oneri !== null ? oneriler()[s.oneri] : s.kendi.trim();

    if (s.adim === 3) {
      sahne.appendChild(el('div', { class: 'hikaye-sayfa' }, [el('p', {}, [baslangic()]), el('p', { class: 'orta' + (s.oneri === 2 && s.goster ? ' sorunlu' : '') }, [orta])]));
      if (s.oneri === 2) {
        var kk = bul(KAHRAMAN, s.kahraman).kisa, bb = KAHRAMAN.filter(function (x) { return x.id !== s.kahraman; })[0].kisa;
        if (!s.goster) {
          sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Bu öneriyi dikkatle oku.', el('span', { class: 'aciklama' }, ['Kahramanın adı doğru mu? Böyle bir şey gerçekten olabilir mi?'])])]));
          sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim gri', type: 'button', onclick: function () { s.goster = true; ciz(); } }, ['Sorunu göster'])]));
          return;
        }
        sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['ARF yanıldı!', el('span', { class: 'aciklama' }, [YANLIS_NEDEN[s.sorun].replace('{k}', kk).replace('{y2}', bb)])])]));
        sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: function () { s.adim = 2; s.oneri = null; s.goster = false; ciz(); } }, ['Başka bir öneri seçeyim'])]));
        return;
      }
      var sorular = [['Bu hikâye benim fikrimle mi başlıyor?', 'Evet, kahramanı ve olayı ben seçtim.'], ['Devamı mantıklı mı, karakterin adı doğru mu?', 'Kontrol ettim.'], ['Kimseyi üzmeyen, nazik bir hikâye mi?', 'Evet.']];
      sahne.appendChild(el('div', { class: 'inceleme' }, [el('strong', {}, ['İncele:'])].concat(sorular.map(function (q) { return el('div', { class: 'inceleme-satir' }, [el('span', {}, [q[0]]), el('em', {}, [q[1]])]); }))));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { s.adim = 2; ciz(); } }, ['Önerimi değiştir']),
        el('button', { class: 'secim yesil', type: 'button', onclick: function () { s.adim = 4; ciz(); } }, ['Tamam, sonunu ben yazacağım'])
      ]));
      return;
    }

    if (s.adim === 4) {
      sahne.appendChild(el('div', { class: 'hikaye-sayfa' }, [el('p', {}, [baslangic()]), el('p', { class: 'orta' }, [orta])]));
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Hikâyenin sonu senin!', el('span', { class: 'aciklama' }, ['Ben son önermiyorum. Kahramanın ne yaptı, hikâye nasıl bitti? Yazamıyorsan öğretmenine söyle, o yazsın.'])])]));
      var basla = el('div', { class: 'etiketler' }, SONLAR.map(function (t) { return el('button', { type: 'button', class: 'secim gri', onclick: function () { alan.value = t + ' '; alan.focus(); s.son = alan.value; ileri.disabled = false; } }, [t]); }));
      sahne.appendChild(basla);
      var alan = el('textarea', { id: 'hikaye-sonu', rows: '3', placeholder: 'Hikâyenin sonunu yaz…', 'aria-label': 'Hikâyenin sonu' });
      alan.value = s.son;
      alan.addEventListener('input', function () { s.son = alan.value; ileri.disabled = !alan.value.trim(); });
      sahne.appendChild(alan);
      var ileri = el('button', { class: 'secim mavi', type: 'button', disabled: !s.son.trim(), onclick: function () { s.adim = 5; ciz(); } }, ['Hikâyem bitti']);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [ileri]));
      return;
    }

    var k = bul(KAHRAMAN, s.kahraman);
    sahne.appendChild(el('div', { class: 'hikaye-sayfa kitap' }, [
      el('h3', {}, [k.emoji + ' ' + k.kisa + '\'nin Hikâyesi']),
      el('p', {}, [baslangic()]), el('p', { class: 'orta' }, [orta]), el('p', {}, [s.son.trim()])
    ]));
    sahne.appendChild(el('div', { class: 'beyan' }, [
      el('strong', {}, ['Beyan etiketi']),
      el('p', {}, ['Başlangıç ve son: ben yazdım.']),
      el('p', {}, [s.oneri !== null ? 'Orta bölüm: ARF önerdi, ben seçtim ve kontrol ettim.' : 'Orta bölüm: ben yazdım. ARF\'ın önerilerini okudum ama kullanmadım.'])
    ]));
    sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: function () { s = { adim: 1, kahraman: null, yer: null, sorun: null, oneri: null, son: '' }; ciz(); } }, ['Yeni hikâye'])]));
    if (window.YZO.ses) setTimeout(function () { YZO.ses.soyle(baslangic() + ' ' + orta + ' ' + s.son); }, 400);
  }
  ciz();
});
