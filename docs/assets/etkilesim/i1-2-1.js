// YZO-İ1-2.1 Pazarcı ARF: Elma mı, Armut mu? — eğit ve sına (1–2. sınıf)
// Çocuk ARF'a örnek gösterir (meyveye dokun, etiketini söyle). Sonra ARF sınava girer.
// ARF'ın bilgisi yalnız gösterilen örneklerdir: az örnek → hata, görmediği çeşit → renk karışıklığı.
YZO.kaydet('i1-2-1', function (kutu, Y) {
  'use strict';
  var el = Y.el;

  var CESITLER = [
    { id: 0, ad: 'Kırmızı elma', emoji: '🍎', tur: 'elma',  renkAd: 'kırmızı', renk: '#D9455F', sinif: '' },
    { id: 1, ad: 'Yeşil elma',   emoji: '🍏', tur: 'elma',  renkAd: 'yeşil',   renk: '#3FA35B', sinif: '' },
    { id: 2, ad: 'Yeşil armut',  emoji: '🍐', tur: 'armut', renkAd: 'yeşil',   renk: '#3FA35B', sinif: '' },
    { id: 3, ad: 'Sarı armut',   emoji: '🍐', tur: 'armut', renkAd: 'sarı',    renk: '#F6C945', sinif: 'sari-ton' }
  ];
  var EN_COK = 12;

  var ornekler = [];   // { cesit, etiket }
  var deneme = 0;
  var secili = null;
  var mesaj = '';

  function digeri(e) { return e === 'elma' ? 'armut' : 'elma'; }
  function cogunluk(liste) {
    var e = liste.filter(function (o) { return o.etiket === 'elma'; }).length;
    return e >= liste.length - e ? 'elma' : 'armut';
  }

  // ARF'ın tahmini: önce aynı çeşit örnekleri, yoksa aynı renk, yoksa genel çoğunluk, yoksa yazı tura.
  function tahmin(cesit, rnd) {
    var c = CESITLER[cesit];
    var ayni = ornekler.filter(function (o) { return o.cesit === cesit; });
    if (ayni.length) {
      var guven = Math.min(0.95, 0.55 + 0.15 * ayni.length);
      var t = cogunluk(ayni);
      return rnd() < guven ? t : digeri(t);
    }
    var ayniRenk = ornekler.filter(function (o) { return CESITLER[o.cesit].renkAd === c.renkAd; });
    if (ayniRenk.length) {
      var t2 = cogunluk(ayniRenk);
      return rnd() < 0.8 ? t2 : digeri(t2);
    }
    if (ornekler.length) {
      var t3 = cogunluk(ornekler);
      return rnd() < 0.6 ? t3 : digeri(t3);
    }
    return rnd() < 0.5 ? 'elma' : 'armut';
  }

  function meyveKarti(c, secilebilir) {
    return el('button', {
      class: 'meyve ' + c.sinif + (secili === c.id ? ' secili' : ''),
      type: 'button',
      'aria-pressed': secili === c.id ? 'true' : 'false',
      onclick: secilebilir ? function () { secili = c.id; mesaj = ''; ciz(); } : null
    }, [
      el('span', { class: 'resim', 'aria-hidden': 'true' }, [c.emoji]),
      el('span', {}, [el('i', { class: 'renk', style: 'background:' + c.renk }), c.ad])
    ]);
  }

  function defter() {
    var sayilar = CESITLER.map(function (c) {
      return ornekler.filter(function (o) { return o.cesit === c.id; }).length;
    });
    return el('div', { class: 'robot-defter' }, [
      Y.robot(),
      el('div', {}, [
        el('span', { class: 'sayac' }, ['ARF ' + ornekler.length + ' örnek gördü']),
        el('span', { class: 'kucuk' }, [CESITLER.map(function (c, i) { return c.ad + ': ' + sayilar[i]; }).join(', ')])
      ])
    ]);
  }

  function ogret() {
    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['ARF\'a öğret: meyveye dokun, ne olduğunu söyle']),
      el('span', { class: 'ilerleme' }, [deneme ? deneme + ' sınav yapıldı' : 'Henüz sınav yok'])
    ]));
    var sahne = el('div', { class: 'sahne' });
    sahne.appendChild(defter());
    var tezgah = el('div', { class: 'tezgah' });
    CESITLER.forEach(function (c) { tezgah.appendChild(meyveKarti(c, ornekler.length < EN_COK)); });
    sahne.appendChild(tezgah);

    if (secili !== null && ornekler.length < EN_COK) {
      var c = CESITLER[secili];
      var etiketle = function (etiket) {
        ornekler.push({ cesit: c.id, etiket: etiket });
        mesaj = 'ARF: "Öğrendim, ' + c.ad.toLowerCase() + ' bir ' + etiket + '."' + (etiket !== c.tur ? ' (Yanlış öğrettin; ARF öyle bilecek.)' : '');
        secili = null;
        ciz();
      };
      sahne.appendChild(el('div', { class: 'etiketler' }, [
        el('button', { class: 'secim yesil', type: 'button', onclick: function () { etiketle('elma'); } }, ['Bu bir elma']),
        el('button', { class: 'secim sari', type: 'button', onclick: function () { etiketle('armut'); } }, ['Bu bir armut'])
      ]));
    } else if (ornekler.length >= EN_COK) {
      sahne.appendChild(el('div', { class: 'geri-bildirim bak' }, [Y.robot(), el('div', {}, ['ARF\'un defteri doldu. Şimdi sınav zamanı.'])]));
    }

    if (mesaj) sahne.appendChild(el('div', { class: 'geri-bildirim dogru' }, [Y.robot(), el('div', {}, [mesaj])]));

    sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
      el('button', { class: 'secim mavi', type: 'button', disabled: ornekler.length === 0, onclick: sinav }, ['ARF\'u sına']),
      el('button', { class: 'secim gri', type: 'button', onclick: function () { ornekler = []; deneme = 0; secili = null; mesaj = ''; ciz(); } }, ['Baştan'])
    ]));
    oyun.appendChild(sahne);
  }

  function sinav() {
    deneme++;
    var rnd = Y.tohum(1000 + deneme * 7 + ornekler.length);
    var sorular = [0, 1, 2, 3, Math.floor(rnd() * 4), Math.floor(rnd() * 4)];
    sorular = Y.karistir(sorular, rnd);
    var sonuc = sorular.map(function (cesit) {
      var t = tahmin(cesit, rnd);
      return { cesit: cesit, tahmin: t, dogru: t === CESITLER[cesit].tur };
    });
    var puan = sonuc.filter(function (s) { return s.dogru; }).length;

    kutu.innerHTML = '';
    var oyun = el('div', { class: 'oyun' });
    kutu.appendChild(oyun);
    oyun.appendChild(el('div', { class: 'baslik' }, [
      el('h2', {}, ['Sınav: ARF ne dedi?']),
      el('span', { class: 'ilerleme' }, [deneme + '. deneme, ' + ornekler.length + ' örnekle'])
    ]));
    var sahne = el('div', { class: 'sahne' });
    var sira = el('div', { class: 'sinav-sira' });
    sonuc.forEach(function (s) {
      var c = CESITLER[s.cesit];
      sira.appendChild(el('div', { class: 'sinav-kart ' + (s.dogru ? 'dogru' : 'yanlis') + ' ' + c.sinif }, [
        el('span', { class: 'resim', 'aria-hidden': 'true' }, [c.emoji]),
        el('span', {}, [(s.dogru ? '✓ ' : '✗ ') + c.ad]),
        el('span', { class: 'tahmin' }, ['ARF: ' + s.tahmin])
      ]));
    });
    sahne.appendChild(sira);

    // ARF'ın yorumu: görmediği çeşit mi, az örnek mi?
    var gorulmemisHata = sonuc.filter(function (s) {
      return !s.dogru && !ornekler.some(function (o) { return o.cesit === s.cesit; });
    })[0];
    var yorum;
    if (puan === 6) yorum = 'Hepsini bildi! Çok ve çeşitli örnek gösterdin.';
    else if (gorulmemisHata) {
      var c2 = CESITLER[gorulmemisHata.cesit];
      var ayniRenkVar = ornekler.some(function (o) { return CESITLER[o.cesit].renkAd === c2.renkAd; });
      yorum = 'ARF ' + c2.ad.toLowerCase() + ' hiç görmedi; ' + (ayniRenkVar ? 'rengine bakıp ' : 'bilmeden ') + gorulmemisHata.tahmin + ' dedi. Ona bunu da gösterelim mi?';
    } else if (ornekler.length < 6) yorum = 'Birkaç hata var. Daha çok örnek gösterelim mi?';
    else yorum = 'Az hata kaldı. Yanıldığı çeşitten birkaç örnek daha göster.';

    sahne.appendChild(el('div', { class: 'sonuc' }, [
      el('div', { class: 'yildizlar', 'aria-hidden': 'true' }, [Y.yildizlar(Math.round(puan / 6 * 5), 5)]),
      el('div', { class: 'buyuk' }, ['6 meyveden ' + Y.sayili(puan) + (puan === 0 ? ' bilemedi' : ' bildi')]),
      el('p', {}, [yorum])
    ]));
    sahne.appendChild(el('div', { class: 'alt-dugmeler' }, [
      el('button', { class: 'secim yesil', type: 'button', onclick: function () { mesaj = ''; ciz(); } }, ['Daha çok öğret']),
      el('button', { class: 'secim mavi', type: 'button', onclick: sinav }, ['Yeniden sına']),
      el('button', { class: 'secim gri', type: 'button', onclick: function () { ornekler = []; deneme = 0; secili = null; mesaj = ''; ciz(); } }, ['Baştan'])
    ]));
    oyun.appendChild(sahne);
  }

  function ciz() { ogret(); }
  ciz();
});
