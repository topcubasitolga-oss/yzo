// ARF Atölyesi: Görsel istem kurma oyunu.
// Beş adım: Düşün → İste → İncele → Düzelt → Beyan et.
// Resim gerçek bir yapay zekâ aracından gelmez: seçilen kartlardan kodla birleştirilen temsilî bir taslaktır.
// Amaç istem yazmayı ve sonucu değerlendirmeyi öğretmek; hiçbir veri dışarı gitmez.
YZO.kaydet('atolye-gorsel', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var KARTLAR = {
    kim: { soru: 'Kim?', secenekler: [
      { id: 'kedi', ad: 'bir kedi', emoji: '🐱' }, { id: 'kaplumbaga', ad: 'bir kaplumbağa', emoji: '🐢' },
      { id: 'cocuk', ad: 'bir çocuk', emoji: '🧒' }, { id: 'arf', ad: 'ARF', emoji: '🤖' }] },
    ne: { soru: 'Ne yapıyor?', secenekler: [
      { id: 'ucurtma', ad: 'uçurtma uçuran', emoji: '🪁' }, { id: 'simit', ad: 'simit yiyen', emoji: '🥯' },
      { id: 'kitap', ad: 'kitap okuyan', emoji: '📖' }, { id: 'top', ad: 'top oynayan', emoji: '⚽' }] },
    nerede: { soru: 'Nerede?', secenekler: [
      { id: 'park', ad: 'parkta', emoji: '🌳' }, { id: 'deniz', ad: 'deniz kenarında', emoji: '🌊' },
      { id: 'uzay', ad: 'uzayda', emoji: '🪐' }, { id: 'kar', ad: 'karlı bir günde', emoji: '❄️' }] },
    nasil: { soru: 'Nasıl bir resim?', secenekler: [
      { id: 'boya', ad: 'boya kalemiyle', emoji: '🖍️' }, { id: 'sulu', ad: 'suluboya', emoji: '🎨' },
      { id: 'karakalem', ad: 'kara kalem', emoji: '✏️' }, { id: 'gece', ad: 'gece vakti', emoji: '🌙' }] }
  };
  var SIRA = ['kim', 'ne', 'nerede', 'nasil'];
  var secim = {}, adim = 1, deneme = 0, inceleme = {}, tahminEdilen = [];

  function bul(alan, id) { return KARTLAR[alan].secenekler.filter(function (s) { return s.id === id; })[0]; }
  function istemMetni(acik) {
    var k = secim.kim && bul('kim', secim.kim), n = secim.ne && bul('ne', secim.ne), y = secim.nerede && bul('nerede', secim.nerede), s = secim.nasil && bul('nasil', secim.nasil);
    var bos = acik ? '___' : '';
    return [(y ? y.ad : bos), (n ? n.ad : bos), (k ? k.ad : bos)].filter(Boolean).join(' ') + (s ? ', ' + s.ad + ' bir resim.' : (acik ? ', ___ bir resim.' : ' resmi.'));
  }

  // Eksik kartları ARF kendi tahmin eder: bu, belirsiz istemin neden beklenmedik sonuç verdiğini gösterir.
  function tamamla() {
    tahminEdilen = [];
    var t = {};
    SIRA.forEach(function (alan, i) {
      if (secim[alan]) { t[alan] = secim[alan]; return; }
      var ss = KARTLAR[alan].secenekler;
      t[alan] = ss[(deneme * 3 + i * 5 + 1) % ss.length].id;
      tahminEdilen.push(alan);
    });
    return t;
  }

  function resim(t) {
    var zemin = {
      park: '<rect width="800" height="500" fill="#CDEBFA"/><circle cx="680" cy="90" r="50" fill="#F6C945"/><rect y="340" width="800" height="160" fill="#7CC67A"/><rect x="90" y="190" width="30" height="160" fill="#8A5A34"/><circle cx="105" cy="170" r="80" fill="#3FA35B"/>',
      deniz: '<rect width="800" height="500" fill="#BFE6FF"/><circle cx="660" cy="100" r="46" fill="#F6C945"/><rect y="290" width="800" height="120" fill="#2A8FBD"/><path d="M0 300 q50 -20 100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0 t100 0" fill="none" stroke="#fff" stroke-width="6"/><rect y="400" width="800" height="100" fill="#F2D59B"/>',
      uzay: '<rect width="800" height="500" fill="#14183A"/><circle cx="640" cy="120" r="70" fill="#D9455F"/><ellipse cx="640" cy="120" rx="110" ry="22" fill="none" stroke="#F6C945" stroke-width="8"/>' + [[80, 60], [200, 140], [320, 50], [460, 90], [740, 260], [90, 300], [520, 230]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#fff"/>'; }).join('') + '<ellipse cx="400" cy="500" rx="460" ry="110" fill="#8B93B5"/>',
      kar: '<rect width="800" height="500" fill="#DDE7F2"/><rect y="330" width="800" height="170" fill="#FFFFFF"/>' + [[60, 40], [180, 120], [300, 70], [430, 30], [560, 140], [700, 60], [740, 200], [120, 230], [380, 200]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" fill="#fff" stroke="#BFD0E3" stroke-width="2"/>'; }).join('') + '<rect x="610" y="230" width="22" height="110" fill="#8A5A34"/><polygon points="560,250 621,120 682,250" fill="#3FA35B"/>'
    }[t.nerede];
    var kim = bul('kim', t.kim).emoji, ne = bul('ne', t.ne).emoji;
    var nesne = {
      ucurtma: '<text x="560" y="150" font-size="110">' + ne + '</text><path d="M470 330 Q520 260 590 130" fill="none" stroke="#1F2A48" stroke-width="3"/>',
      simit: '<text x="460" y="330" font-size="90">' + ne + '</text>',
      kitap: '<text x="440" y="360" font-size="90">' + ne + '</text>',
      top: '<text x="500" y="420" font-size="80">' + ne + '</text>'
    }[t.ne];
    var stil = { boya: 'saturate(1.5)', sulu: 'saturate(1.25) blur(1.4px)', karakalem: 'grayscale(1) contrast(1.35)', gece: 'brightness(.55) saturate(.9) hue-rotate(10deg)' }[t.nasil];
    var doku = t.nasil === 'karakalem'
      ? '<g opacity=".18" stroke="#000" stroke-width="2">' + Array.from({ length: 30 }, function (_, i) { return '<line x1="' + (i * 30 - 200) + '" y1="0" x2="' + (i * 30 + 100) + '" y2="500"/>'; }).join('') + '</g>'
      : t.nasil === 'sulu' ? '<rect width="800" height="500" fill="#fff" opacity=".12"/>' : t.nasil === 'gece' ? '<circle cx="120" cy="80" r="34" fill="#FDF3C7"/>' : '';
    return '<svg viewBox="0 0 800 500" role="img" aria-label="ARF\'ın çizdiği taslak resim: ' + istemMetni(false) + '">' +
      '<g style="filter:' + stil + '">' + zemin + '<text x="250" y="400" font-size="170">' + kim + '</text>' + nesne + '</g>' + doku +
      '<rect x="12" y="452" width="300" height="36" rx="8" fill="#fff" opacity=".85"/><text x="24" y="477" font-family="Fredoka,sans-serif" font-weight="600" font-size="18" fill="#1F2A48">ARF\'ın taslağı (temsilî)</text></svg>';
  }

  function adimlar() {
    var ad = ['Düşün', 'İste', 'İncele', 'Düzelt', 'Beyan et'];
    return el('ol', { class: 'atolye-adimlar', 'aria-label': 'Üretim adımları' }, ad.map(function (a, i) {
      return el('li', { class: (i + 1 === adim ? 'simdi' : i + 1 < adim ? 'bitti' : '') }, [el('span', {}, [String(i + 1)]), a]);
    }));
  }

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun atolye' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, ['ARF\'la resim yapalım']), el('span', { class: 'ilerleme' }, [deneme ? deneme + '. deneme' : 'Başlangıç'])]));
    oyun.appendChild(adimlar());
    var sahne = el('div', { class: 'sahne' });
    oyun.appendChild(sahne);

    if (adim === 1) {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Önce sen düşün!', el('span', { class: 'aciklama' }, ['Gözlerini kapat ve yapmak istediğin resmi hayal et. Kim var? Ne yapıyor? Nerede? Arkadaşına anlat. Resmin fikri senin; ARF yalnız yardım edecek.'])])]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: function () { adim = 2; ciz(); } }, ['Hayal ettim, ARF\'a anlatayım'])]));
      return;
    }

    if (adim === 2 || adim === 4) {
      if (adim === 4) sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Neyi değiştirmek istersin?', el('span', { class: 'aciklama' }, ['Bir kartı değiştir ya da eksik kartı ekle. Sonra ARF yeniden çizsin.'])])]));
      SIRA.forEach(function (alan) {
        var satir = el('div', { class: 'istem-satir' }, [el('strong', {}, [KARTLAR[alan].soru])]);
        var kartlar = el('div', { class: 'istem-kartlar' });
        KARTLAR[alan].secenekler.forEach(function (s) {
          kartlar.appendChild(el('button', { type: 'button', class: 'istem-kart' + (secim[alan] === s.id ? ' secili' : ''), 'aria-pressed': secim[alan] === s.id ? 'true' : 'false', onclick: function () {
            secim[alan] = secim[alan] === s.id ? null : s.id; if (window.YZO.ses) YZO.ses.efekt('tik'); ciz();
          } }, [el('span', { class: 'resim', 'aria-hidden': 'true' }, [s.emoji]), s.ad]));
        });
        satir.appendChild(kartlar);
        sahne.appendChild(satir);
      });
      var eksik = SIRA.filter(function (a) { return !secim[a]; }).length;
      sahne.appendChild(el('div', { class: 'istem-metin' }, [el('span', {}, ['İstemin: ']), el('strong', {}, [istemMetni(true)])]));
      if (eksik) sahne.appendChild(el('p', { class: 'istem-not' }, [eksik + ' kart boş. Boş bırakırsan ARF kendisi tahmin eder; istediğin gibi olmayabilir!']));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim mavi', type: 'button', disabled: eksik === 4, onclick: function () { deneme++; adim = 3; inceleme = {}; ciz(); } }, ['ARF, çiz!'])]));
      return;
    }

    if (adim === 3) {
      var t = tamamla();
      var cerceve = el('div', { class: 'atolye-resim cizim-acilis' });
      cerceve.innerHTML = resim(t);
      sahne.appendChild(cerceve);
      if (tahminEdilen.length) {
        sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Bazı kartlar boştu, ben tahmin ettim!', el('span', { class: 'aciklama' }, [tahminEdilen.map(function (a) { return KARTLAR[a].soru + ' → ' + bul(a, t[a]).ad; }).join(' · ') + '. İstediğin bu muydu?'])])]));
      }
      var sorular = [
        ['istedigim', 'İstediğim gibi oldu mu?'],
        ['eksik', 'Eksik ya da yanlış bir şey var mı?'],
        ['adil', 'Herkes için uygun ve nazik bir resim mi?']
      ];
      var liste = el('div', { class: 'inceleme' }, [el('strong', {}, ['İncele:'])]);
      sorular.forEach(function (q) {
        liste.appendChild(el('div', { class: 'inceleme-satir' }, [
          el('span', {}, [q[1]]),
          el('button', { type: 'button', class: 'secim' + (inceleme[q[0]] === 'evet' ? ' yesil' : ''), onclick: function () { inceleme[q[0]] = 'evet'; ciz(); } }, ['Evet']),
          el('button', { type: 'button', class: 'secim' + (inceleme[q[0]] === 'hayir' ? ' sari' : ''), onclick: function () { inceleme[q[0]] = 'hayir'; ciz(); } }, ['Hayır'])
        ]));
      });
      sahne.appendChild(liste);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { adim = 4; ciz(); } }, ['Düzelt: istemi değiştir']),
        el('button', { class: 'secim yesil', type: 'button', onclick: function () { adim = 5; ciz(); } }, ['Beğendim: beyan et'])
      ]));
      cerceve._t = t;
      return;
    }

    if (adim === 5) {
      var t5 = tamamla();
      var c = el('div', { class: 'atolye-resim' });
      c.innerHTML = resim(t5);
      sahne.appendChild(c);
      sahne.appendChild(el('div', { class: 'beyan' }, [
        el('strong', {}, ['Beyan etiketi']),
        el('p', {}, ['Fikir: bizim sınıfımız. İstem: "' + istemMetni(false) + '"']),
        el('p', {}, ['Çizim: ARF (yapay zekâ). ' + deneme + ' denemede bu sonuca ulaştık.']),
        el('p', {}, ['Resmi paylaşırken bu etiketi de yazarız: yapay zekânın yardım ettiğini saklamayız.'])
      ]));
      sahne.appendChild(el('div', { class: 'geri-bildirim dogru' }, [Y.robot(), el('div', {}, ['Harika bir üretim!', el('span', { class: 'aciklama' }, ['Fikri sen buldun, ben çizdim, sen inceleyip düzelttin. Son karar hep senin.'])])]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: function () { secim = {}; adim = 1; deneme = 0; ciz(); } }, ['Yeni resim'])]));
    }
  }
  ciz();
});
