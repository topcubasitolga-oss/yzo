// ARF Atölyesi: Karakterimi Konuşturuyorum (video atölyesi).
// Çocuk karakteri, repliği ve sahne istemini seçer; ARF kısa bir canlandırma yapar ve repliği seslendirir.
// Canlandırma tarayıcıda çizilir (SVG + CSS); gerçek bir video aracı kullanılmaz.
YZO.kaydet('atolye-video', function (kutu, Y) {
  'use strict';
  var el = Y.el;
  var KARAKTER = [{ id: 'kedi', ad: 'Kedi', emoji: '🐱' }, { id: 'ejder', ad: 'Ejderha', emoji: '🐲' }, { id: 'kurbaga', ad: 'Kurbağa', emoji: '🐸' }, { id: 'arf', ad: 'ARF', emoji: '🤖' }];
  var REPLIK = ['Merhaba! Benim adım Zıpzıp.', 'Bugün parkta bir uçurtma buldum!', 'Benimle oyun oynar mısın?', 'Yapay zekâ bana yardım etti ama fikir benim!'];
  var HAREKET = [{ id: 'salla', ad: 'El sallar', emoji: '👋' }, { id: 'zipla', ad: 'Zıplar', emoji: '⬆️' }, { id: 'don', ad: 'Döner', emoji: '🔄' }, { id: 'yuru', ad: 'Yürüyerek gelir', emoji: '🚶' }];
  var YER = [{ id: 'orman', ad: 'Orman', emoji: '🌲' }, { id: 'deniz', ad: 'Deniz', emoji: '🌊' }, { id: 'sahne', ad: 'Tiyatro sahnesi', emoji: '🎭' }, { id: 'uzay', ad: 'Uzay', emoji: '🪐' }];
  var SES = [{ id: 'nese', ad: 'Neşeli', emoji: '😄', perde: 1.5, hiz: 1.05 }, { id: 'sakin', ad: 'Sakin', emoji: '😌', perde: 1, hiz: 0.85 }, { id: 'kalin', ad: 'Kalın sesli', emoji: '🐻', perde: 0.6, hiz: 0.9 }];
  var s = { adim: 1, karakter: null, replik: null, hareket: null, yer: null, ses: null, izlendi: false };

  function bul(d, id) { return d.filter(function (x) { return x.id === id; })[0]; }
  function satir(baslik, dizi, alan, etiket) {
    var r = el('div', { class: 'istem-satir' }, [el('strong', {}, [baslik])]);
    var k = el('div', { class: 'istem-kartlar' });
    dizi.forEach(function (x, i) {
      var id = x.id || i;
      k.appendChild(el('button', { type: 'button', class: 'istem-kart' + (s[alan] === id ? ' secili' : ''), onclick: function () { s[alan] = id; ciz(); } }, [x.emoji ? el('span', { class: 'resim', 'aria-hidden': 'true' }, [x.emoji]) : null, etiket ? etiket(x) : x.ad]));
    });
    r.appendChild(k);
    return r;
  }
  function zemin(y) {
    return {
      orman: '<rect width="800" height="450" fill="#CFEFD6"/><rect y="330" width="800" height="120" fill="#7CC67A"/>' + [80, 200, 600, 720].map(function (x) { return '<rect x="' + (x - 10) + '" y="200" width="20" height="140" fill="#8A5A34"/><polygon points="' + (x - 60) + ',230 ' + x + ',80 ' + (x + 60) + ',230" fill="#3FA35B"/>'; }).join(''),
      deniz: '<rect width="800" height="450" fill="#BFE6FF"/><circle cx="680" cy="80" r="44" fill="#F6C945"/><rect y="250" width="800" height="110" fill="#2A8FBD"/><rect y="350" width="800" height="100" fill="#F2D59B"/>',
      sahne: '<rect width="800" height="450" fill="#3B1F2B"/><rect x="0" y="0" width="140" height="450" fill="#D9455F"/><rect x="660" y="0" width="140" height="450" fill="#D9455F"/><rect y="350" width="800" height="100" fill="#8A5A34"/><ellipse cx="400" cy="350" rx="230" ry="30" fill="#F6C945" opacity=".35"/>',
      uzay: '<rect width="800" height="450" fill="#14183A"/><circle cx="660" cy="100" r="60" fill="#7B61D1"/>' + [[90, 60], [220, 130], [360, 50], [500, 120], [740, 230], [120, 260]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#fff"/>'; }).join('') + '<ellipse cx="400" cy="460" rx="460" ry="100" fill="#8B93B5"/>'
    }[y];
  }

  function ciz() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun atolye' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [el('h2', {}, ['Karakterimi konuşturuyorum']), el('span', { class: 'ilerleme' }, ['Video atölyesi'])]));
    oyun.appendChild(el('ol', { class: 'atolye-adimlar' }, ['Karakter ve replik', 'Sahne istemi', 'İzle ve incele', 'Beyan et'].map(function (a, i) {
      return el('li', { class: (i + 1 === s.adim ? 'simdi' : i + 1 < s.adim ? 'bitti' : '') }, [el('span', {}, [String(i + 1)]), a]);
    })));
    var sahne = el('div', { class: 'sahne' });
    oyun.appendChild(sahne);

    if (s.adim === 1) {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Karakterini ve ne söyleyeceğini sen seç.', el('span', { class: 'aciklama' }, ['Kural: Gerçek bir kişinin (arkadaşının, öğretmeninin, ünlü birinin) yüzünü ya da sesini izinsiz kullanmayız. Hayal ettiğimiz karakterleri konuştururuz.'])])]));
      sahne.appendChild(satir('Karakter', KARAKTER, 'karakter'));
      sahne.appendChild(satir('Ne söylesin?', REPLIK.map(function (r) { return { ad: '"' + r + '"' }; }), 'replik'));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim mavi', type: 'button', disabled: s.karakter === null || s.replik === null, onclick: function () { s.adim = 2; ciz(); } }, ['Sahneyi kuralım'])]));
      return;
    }
    if (s.adim === 2) {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['Video istemi: sahneyi bana tarif et.', el('span', { class: 'aciklama' }, ['Video araçları da istemle çalışır: nerede, ne yapıyor, nasıl bir sesle? Ne kadar açık söylersen o kadar iyi olur.'])])]));
      sahne.appendChild(satir('Nerede?', YER, 'yer'));
      sahne.appendChild(satir('Ne yapsın?', HAREKET, 'hareket'));
      sahne.appendChild(satir('Sesi nasıl?', SES, 'ses'));
      var hazir = s.yer && s.hareket && s.ses;
      if (hazir) {
        sahne.appendChild(el('div', { class: 'istem-metin' }, [el('span', {}, ['Video istemin: ']), el('strong', {}, [bul(YER, s.yer).ad + ' sahnesinde bir ' + bul(KARAKTER, s.karakter).ad.toLowerCase() + ' ' + bul(HAREKET, s.hareket).ad.toLowerCase() + ' ve ' + bul(SES, s.ses).ad.toLowerCase() + ' bir sesle "' + REPLIK[s.replik] + '" der.'])]));
      }
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim gri', type: 'button', onclick: function () { s.adim = 1; ciz(); } }, ['Geri']),
        el('button', { class: 'secim mavi', type: 'button', disabled: !hazir, onclick: function () { s.adim = 3; s.izlendi = false; ciz(); } }, ['ARF, canlandır!'])
      ]));
      return;
    }
    var kar = bul(KARAKTER, s.karakter), ses = bul(SES, s.ses);
    var video = el('div', { class: 'video-sahne' });
    video.innerHTML = '<svg viewBox="0 0 800 450" aria-hidden="true">' + zemin(s.yer) + '</svg>' +
      '<div class="video-karakter hareket-' + s.hareket + '">' + kar.emoji + '</div>' +
      '<div class="video-balon">' + REPLIK[s.replik].replace(/</g, '&lt;') + '</div>' +
      '<div class="video-etiket">Yapay zekâ ile canlandırıldı</div>';
    sahne.appendChild(video);
    function oynat() {
      video.classList.remove('oynuyor'); void video.offsetWidth; video.classList.add('oynuyor');
      if (window.YZO.ses && YZO.ses.acikMi() && 'speechSynthesis' in window) {
        setTimeout(function () {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(REPLIK[s.replik]); u.lang = 'tr-TR'; u.pitch = ses.perde; u.rate = ses.hiz;
          window.speechSynthesis.speak(u);
        }, 1200);
      }
    }
    if (s.adim === 3) {
      setTimeout(oynat, 150);
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim gri', type: 'button', onclick: oynat }, ['▶ Yeniden oynat'])]));
      sahne.appendChild(el('div', { class: 'inceleme' }, [
        el('strong', {}, ['İncele:']),
        el('div', { class: 'inceleme-satir' }, [el('span', {}, ['İstediğim sahne oldu mu? Karakter, yer, hareket, ses doğru mu?'])]),
        el('div', { class: 'inceleme-satir' }, [el('span', {}, ['Bu video gerçek mi? Bunu bir kamera mı çekti, yoksa yapay zekâ mı yaptı?'])]),
        el('div', { class: 'inceleme-satir' }, [el('span', {}, ['İzleyen biri bunun yapay zekâyla yapıldığını anlayabilir mi? Anlamazsa ne yaparız?'])])
      ]));
      sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
        el('button', { class: 'secim sari', type: 'button', onclick: function () { s.adim = 2; ciz(); } }, ['Sahneyi değiştir']),
        el('button', { class: 'secim yesil', type: 'button', onclick: function () { s.adim = 4; ciz(); } }, ['Beğendim: beyan et'])
      ]));
      return;
    }
    sahne.appendChild(el('div', { class: 'beyan' }, [
      el('strong', {}, ['Beyan etiketi']),
      el('p', {}, ['Karakter, replik ve sahne fikri: ben.']),
      el('p', {}, ['Canlandırma ve ses: ARF (yapay zekâ).']),
      el('p', {}, ['Videonun köşesindeki "Yapay zekâ ile canlandırıldı" yazısını silmeyiz. İzleyen herkes bunun gerçek olmadığını bilmeli.'])
    ]));
    sahne.appendChild(el('div', { class: 'geri-bildirim dogru' }, [Y.robot(), el('div', {}, ['Harika bir video!', el('span', { class: 'aciklama' }, ['Hayal ettiğin karakteri konuşturdun ve yapay zekâ kullandığını söyledin. Gerçek kişileri izinsiz konuşturmayız.'])])]));
    sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [el('button', { class: 'secim sari', type: 'button', onclick: function () { s = { adim: 1, karakter: null, replik: null, hareket: null, yer: null, ses: null }; ciz(); } }, ['Yeni video'])]));
  }
  ciz();
});
