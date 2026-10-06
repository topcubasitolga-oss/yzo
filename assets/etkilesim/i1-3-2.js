// YZO-İ1-3.2 Üç Resim, Biri Yapay — her turda üç resim; biri yapay zekâ hatası taşıyor. Bul!
// Resimler kodla çizilir (SVG). Yapay zekâ resimlerinin tipik hatalarını taklit eder:
// bozuk yazı, fazla parmak, yanlış sayı, fazla bacak, ters gölge, uyumsuz parçalar.
YZO.kaydet('i1-3-2', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var INK = '#1F2A48';

  // Renk takımları: üç resim farklı görünsün, renk tek başına ipucu olmasın.
  var TAKIM = [
    { gok: '#D9EDF7', zemin: '#DFF3E4', ana: '#F28C28', ikinci: '#2A8FBD', ten: '#F2C7A5' },
    { gok: '#FDF3C7', zemin: '#E8E2F8', ana: '#D9455F', ikinci: '#3FA35B', ten: '#C68A5E' },
    { gok: '#E8E2F8', zemin: '#FDEBD8', ana: '#7B61D1', ikinci: '#F6C945', ten: '#E8B48C' }
  ];

  function svg(t, ic) {
    return '<svg viewBox="0 0 300 220" role="img" aria-hidden="true" focusable="false">' +
      '<rect width="300" height="220" fill="' + t.gok + '"/>' +
      '<rect y="175" width="300" height="45" fill="' + t.zemin + '"/>' + ic + '</svg>';
  }
  function yazi(x, y, s, boy, renk) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="' + boy + '" fill="' + (renk || INK) + '">' + s + '</text>';
  }

  var SAHNELER = [
    { ad: 'Simitçi', bolge: [150, 62, 62],
      ipucu: ['Yazılara bak. Yapay zekâ yazıyı çoğu zaman bozar.', 'Tabeladaki kelimeyi harf harf oku.'],
      neden: 'Tabelada "SİMİT" yerine "SMİİT" yazıyor. Yapay zekâ harfleri karıştırabilir.',
      ciz: function (t, yapay) {
        var s = '';
        for (var i = 0; i < 6; i++) s += '<rect x="' + (60 + i * 30) + '" y="85" width="30" height="22" fill="' + (i % 2 ? '#fff' : t.ana) + '" stroke="' + INK + '" stroke-width="2"/>';
        s += '<rect x="70" y="40" width="160" height="42" rx="8" fill="#fff" stroke="' + INK + '" stroke-width="3"/>' + yazi(150, 72, yapay ? 'SMİİT' : 'SİMİT', 30);
        s += '<rect x="65" y="107" width="170" height="55" fill="#B07A4A" stroke="' + INK + '" stroke-width="3"/>';
        for (var j = 0; j < 4; j++) s += '<circle cx="' + (95 + j * 37) + '" cy="125" r="13" fill="none" stroke="#C98A3D" stroke-width="9"/>';
        s += '<circle cx="95" cy="172" r="15" fill="#fff" stroke="' + INK + '" stroke-width="4"/><circle cx="205" cy="172" r="15" fill="#fff" stroke="' + INK + '" stroke-width="4"/>';
        return s;
      } },
    { ad: 'El sallayan çocuk', bolge: [150, 95, 70],
      ipucu: ['Vücuda bak: eller, ayaklar, kulaklar.', 'Parmakları tek tek say.'],
      neden: 'Bu elde 6 parmak var. Yapay zekâ elleri çizmekte çok zorlanır.',
      ciz: function (t, yapay) {
        var s = '', aci = yapay ? [-36, -18, 0, 18, 36] : [-30, -10, 10, 30];
        aci.forEach(function (a) { s += '<rect x="141" y="45" width="18" height="80" rx="9" fill="' + t.ten + '" stroke="' + INK + '" stroke-width="3" transform="rotate(' + a + ' 150 150)"/>'; });
        s += '<rect x="141" y="80" width="18" height="60" rx="9" fill="' + t.ten + '" stroke="' + INK + '" stroke-width="3" transform="rotate(-70 150 155)"/>';
        s += '<ellipse cx="150" cy="160" rx="42" ry="45" fill="' + t.ten + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<rect x="125" y="195" width="50" height="25" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>';
        return s;
      } },
    { ad: 'Saat kulesi', bolge: [150, 95, 62],
      ipucu: ['Sayılara bak.', 'Saatte her sayı bir kez olur. Aşağıdaki sayıyı oku.'],
      neden: 'Saatin altında 6 yerine 9 yazıyor; iki tane 9 var. Yapay zekâ sayıları karıştırabilir.',
      ciz: function (t, yapay) {
        var s = '<rect x="95" y="20" width="110" height="160" fill="' + t.ikinci + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<polygon points="85,22 150,0 215,22" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<circle cx="150" cy="95" r="52" fill="#fff" stroke="' + INK + '" stroke-width="4"/>';
        s += yazi(150, 62, '12', 20) + yazi(188, 102, '3', 20) + yazi(150, 140, yapay ? '9' : '6', 20) + yazi(112, 102, '9', 20);
        s += '<line x1="150" y1="95" x2="150" y2="65" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/><line x1="150" y1="95" x2="172" y2="95" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
        s += '<rect x="132" y="150" width="36" height="30" fill="#fff" stroke="' + INK + '" stroke-width="3"/>';
        return s;
      } },
    { ad: 'Kedi', bolge: [150, 170, 70],
      ipucu: ['Hayvanın vücuduna bak.', 'Bacakları say.'],
      neden: 'Bu kedinin 5 bacağı var. Yapay zekâ bacak, parmak, kulak sayısını şaşırabilir.',
      ciz: function (t, yapay) {
        var s = '', bacak = yapay ? [95, 122, 150, 178, 205] : [100, 130, 170, 200];
        s += '<path d="M220 120 Q265 90 250 50" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/><path d="M220 120 Q265 90 250 50" fill="none" stroke="' + t.ana + '" stroke-width="7" stroke-linecap="round"/>';
        bacak.forEach(function (x) { s += '<rect x="' + (x - 8) + '" y="140" width="16" height="42" rx="7" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>'; });
        s += '<ellipse cx="150" cy="130" rx="70" ry="32" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<polygon points="62,78 70,50 86,72" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/><polygon points="98,72 112,48 118,78" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<circle cx="90" cy="98" r="30" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/><circle cx="80" cy="94" r="4" fill="' + INK + '"/><circle cx="100" cy="94" r="4" fill="' + INK + '"/><path d="M84 108 Q90 113 96 108" fill="none" stroke="' + INK + '" stroke-width="2.5"/>';
        return s;
      } },
    { ad: 'Ağaç ve gölge', bolge: [150, 120, 105],
      ipucu: ['Işığa ve gölgeye bak.', 'Güneş nerede? Gölge hangi yana düşmeli?'],
      neden: 'Güneş soldayken gölge de sola düşmüş. Gölge her zaman güneşin karşı tarafına düşer.',
      ciz: function (t, yapay, n) {
        var gunesSol = n % 2 === 0, golgeSag = yapay ? !gunesSol : gunesSol;
        var gx = gunesSol ? 50 : 250, sx = golgeSag ? 205 : 95;
        var s = '<circle cx="' + gx + '" cy="45" r="24" fill="#F6C945" stroke="' + INK + '" stroke-width="3"/>';
        s += '<ellipse cx="' + sx + '" cy="185" rx="62" ry="10" fill="' + INK + '" opacity=".35"/>';
        s += '<rect x="140" y="110" width="20" height="75" fill="#8A5A34" stroke="' + INK + '" stroke-width="3"/>';
        s += '<circle cx="150" cy="90" r="45" fill="' + t.ikinci + '" stroke="' + INK + '" stroke-width="3"/>';
        return s;
      } },
    { ad: 'Bisiklet', bolge: [150, 150, 95],
      ipucu: ['Parçalar birbirine uyuyor mu?', 'İki tekerleği karşılaştır.'],
      neden: 'Arka tekerlek ön tekerlekten çok küçük. Yapay zekâ parçaları birbirine uydurmakta zorlanır.',
      ciz: function (t, yapay) {
        var r2 = yapay ? 20 : 40;
        var s = '<circle cx="85" cy="' + (175 - r2 + 0) + '" r="' + r2 + '" fill="none" stroke="' + INK + '" stroke-width="6"/>';
        s += '<circle cx="215" cy="135" r="40" fill="none" stroke="' + INK + '" stroke-width="6"/>';
        s += '<polyline points="85,' + (175 - r2) + ' 140,135 215,135 185,85 125,90 140,135" fill="none" stroke="' + t.ana + '" stroke-width="7" stroke-linejoin="round"/>';
        s += '<line x1="185" y1="85" x2="200" y2="65" stroke="' + INK + '" stroke-width="5"/><line x1="188" y1="65" x2="215" y2="65" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/>';
        s += '<rect x="110" y="80" width="32" height="10" rx="5" fill="' + INK + '"/>';
        return s;
      } },
    { ad: 'Kitap kapağı', bolge: [150, 85, 75],
      ipucu: ['Yazılara bak.', 'Kitabın adını ve yazarını harf harf oku.'],
      neden: '"MASALLAR" yerine "MASALAR", "Hoca" yerine "Hocca" yazıyor. Yapay zekâ yazıları sık bozar.',
      ciz: function (t, yapay) {
        var s = '<rect x="80" y="15" width="140" height="170" rx="6" fill="' + t.ikinci + '" stroke="' + INK + '" stroke-width="4"/>';
        s += '<rect x="80" y="15" width="16" height="170" fill="' + INK + '" opacity=".25"/>';
        s += yazi(158, 60, yapay ? 'MASALAR' : 'MASALLAR', 18, '#fff');
        s += '<circle cx="158" cy="110" r="26" fill="#F6C945" stroke="' + INK + '" stroke-width="3"/>';
        s += yazi(158, 165, yapay ? 'Nasreddin Hocca' : 'Nasreddin Hoca', 13, '#fff');
        return s;
      } },
    { ad: 'Gözlüklü dede', bolge: [150, 95, 70],
      ipucu: ['Yüze ve eşyalara bak.', 'Gözlüğün camlarını say.'],
      neden: 'Bu gözlüğün üç camı var. Yapay zekâ eşyaları tuhaf biçimde birleştirebilir.',
      ciz: function (t, yapay) {
        var s = '<rect x="105" y="150" width="90" height="40" rx="18" fill="' + t.ana + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<circle cx="150" cy="100" r="55" fill="' + t.ten + '" stroke="' + INK + '" stroke-width="3"/>';
        s += '<path d="M100 85 Q150 30 200 85" fill="#fff" stroke="' + INK + '" stroke-width="3"/>';
        var camlar = yapay ? [118, 150, 182] : [128, 172];
        camlar.forEach(function (x) { s += '<circle cx="' + x + '" cy="100" r="15" fill="#fff" fill-opacity=".6" stroke="' + INK + '" stroke-width="4"/><circle cx="' + x + '" cy="100" r="3.5" fill="' + INK + '"/>'; });
        if (!yapay) s += '<line x1="143" y1="100" x2="157" y2="100" stroke="' + INK + '" stroke-width="4"/>';
        s += '<path d="M135 130 Q150 142 165 130" fill="none" stroke="' + INK + '" stroke-width="3"/>';
        return s;
      } }
  ];

  var SEVIYE = { kolay: 3, orta: 2, zor: 1 };
  var seviye, tur, dogru, kalanIpucu, sira, sonuclar;

  function karistir(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function giris() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'sonuc' }, [
      el('div', { class: 'buyuk' }, ['Üç Resim, Biri Yapay']),
      el('p', {}, ['Her turda üç resim göreceksin. İkisi doğru, biri yapay zekânın hatalı çizdiği bir resim. Yapay olanı bul! ' + SAHNELER.length + ' tur var.']),
      el('p', {}, ['Seviyeni seç:'])
    ]));
    var s = el('div', { class: 'secimler uclu' });
    [['kolay', 'Kolay', '3 ipucu'], ['orta', 'Orta', '2 ipucu'], ['zor', 'Zor', '1 ipucu']].forEach(function (x) {
      s.appendChild(el('button', { class: 'secim ' + (x[0] === 'kolay' ? 'yesil' : x[0] === 'orta' ? 'sari' : 'mavi'), type: 'button', onclick: function () {
        seviye = x[0]; tur = 0; dogru = 0; sonuclar = []; sira = karistir(SAHNELER.map(function (_, i) { return i; })); turCiz();
      } }, [x[1], el('span', { style: 'font-family:var(--f-metin);font-weight:400;font-size:.8em;margin-left:6px' }, ['(' + x[2] + ')'])]));
    });
    oyun.appendChild(s);
  }

  function resim(sahne, takimNo, yapay, n) {
    return svg(TAKIM[takimNo], sahne.ciz(TAKIM[takimNo], yapay, n));
  }
  function halka(b, renk, kesik) {
    return '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="' + b[2] + '" fill="none" stroke="' + renk + '" stroke-width="5"' + (kesik ? ' stroke-dasharray="10 8"' : '') + '/>';
  }

  function turCiz() {
    if (tur >= SAHNELER.length) return son();
    kalanIpucu = SEVIYE[seviye];
    var sahne = SAHNELER[sira[tur]];
    var yapayYer = Math.floor(Math.random() * 3);
    var takimlar = karistir([0, 1, 2]);
    var acilanIpucu = 0, cevaplandi = false;

    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['Hangisi yapay zekâ resmi?']),
      el('span', { class: 'ilerleme' }, ['Tur ' + (tur + 1) + ' / ' + SAHNELER.length + ', ' + dogru + ' doğru'])
    ]));
    var sahneEl = el('div', { class: 'sahne' });
    var izgara = el('div', { class: 'uc-resim' });
    var kartlar = [];
    for (var i = 0; i < 3; i++) {
      (function (i) {
        var b = el('button', { class: 'resim-kart', type: 'button', 'aria-label': 'Resim ' + 'ABC'[i], onclick: function () { if (!cevaplandi) cevapla(i); } });
        b.innerHTML = resim(sahne, takimlar[i], i === yapayYer, i) + '<span class="harf">' + 'ABC'[i] + '</span>';
        kartlar.push(b);
        izgara.appendChild(b);
      })(i);
    }
    sahneEl.appendChild(izgara);

    var ipucuKutu = el('div', { class: 'ipucu-alani' });
    var ipucuDugme = el('button', { class: 'secim sari', type: 'button', onclick: ipucuAc }, []);
    function ipucuYaz() { ipucuDugme.textContent = kalanIpucu > 0 ? 'İpucu (' + kalanIpucu + ' kaldı)' : 'İpucu kalmadı'; ipucuDugme.disabled = kalanIpucu === 0 || cevaplandi; }
    function ipucuAc() {
      if (kalanIpucu <= 0) return;
      kalanIpucu--; acilanIpucu++;
      if (acilanIpucu <= 2) {
        ipucuKutu.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['İpucu ' + acilanIpucu + ': ' + sahne.ipucu[acilanIpucu - 1]])]));
      } else {
        kartlar.forEach(function (k) { k.querySelector('svg').insertAdjacentHTML('beforeend', halka(sahne.bolge, '#F6C945', true)); });
        ipucuKutu.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['İpucu 3: Sarı çemberin içine bak. Üç resmi karşılaştır.'])]));
      }
      ipucuYaz();
    }
    ipucuYaz();
    sahneEl.appendChild(el('div', { class: 'alt-dugmeler' }, [ipucuDugme]));
    sahneEl.appendChild(ipucuKutu);
    oyun.appendChild(sahneEl);

    function cevapla(i) {
      cevaplandi = true;
      var ok = i === yapayYer;
      if (ok) dogru++;
      sonuclar.push({ sahne: sahne.ad, ok: ok });
      ipucuYaz();
      kartlar.forEach(function (k, j) {
        k.disabled = true;
        if (j === yapayYer) { k.classList.add('yapay'); k.querySelector('svg').insertAdjacentHTML('beforeend', halka(sahne.bolge, '#D9455F', false)); }
        else k.classList.add(j === i ? 'yanlis-secim' : 'soluk');
      });
      var gb = el('div', { class: 'geri-bildirim ' + (ok ? 'dogru' : 'bak') }, [Y.robot(), el('div', {}, [
        ok ? 'Buldun! ' + 'ABC'[yapayYer] + ' yapay.' : 'Bu sefer olmadı: yapay olan ' + 'ABC'[yapayYer] + '.',
        el('span', { class: 'aciklama' }, [sahne.neden])
      ])]);
      sahneEl.appendChild(gb);
      sahneEl.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim yesil', type: 'button', onclick: function () { tur++; turCiz(); } }, [tur + 1 < SAHNELER.length ? 'Sıradaki tur' : 'Sonucu gör'])
      ]));
      gb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function son() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    var yuzde = Math.round(dogru / SAHNELER.length * 100);
    oyun.appendChild(el('div', { class: 'sonuc' }, [
      el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [Y.yildizlar(Math.round(dogru / SAHNELER.length * 5), 5)]),
      el('div', { class: 'buyuk' }, [SAHNELER.length + ' turdan ' + Y.sayili(dogru) + ' buldun (%' + yuzde + ')']),
      el('p', {}, [yuzde >= 75 ? 'Harika bir yapay zekâ dedektifisin!' : 'Güzel deneme. İpuçlarını aklında tut, bir daha dene.'])
    ]));
    oyun.appendChild(el('div', { class: 'kart', style: 'text-align:left' }, [
      el('div', { class: 'ad', style: 'margin-bottom:8px' }, ['Yapay zekâ resminde neye bakarız?']),
      el('ul', { style: 'font-family:var(--f-metin);font-size:1.1rem;margin:0' }, [
        el('li', {}, ['Yazılar: harfler karışık ya da eksik mi?']),
        el('li', {}, ['Eller ve hayvanlar: parmak, bacak sayısı doğru mu?']),
        el('li', {}, ['Sayılar: saat, plaka, takvim doğru mu?']),
        el('li', {}, ['Işık ve gölge: gölge güneşin karşısında mı?']),
        el('li', {}, ['Parçalar: birbirine uyuyor mu, fazla ya da eksik bir şey var mı?'])
      ]),
      el('p', { style: 'font-family:var(--f-metin);margin:12px 0 0' }, ['Bazen hiçbir hata görünmez. O zaman sorarız: Bu resmi kim yaptı? Nereden geldi?'])
    ]));
    oyun.appendChild(el('div', { class: 'alt-dugmeler' }, [
      el('button', { class: 'secim sari', type: 'button', onclick: giris }, ['Yeniden oyna'])
    ]));
  }

  giris();
});
