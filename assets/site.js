// YZO Havuzu: küçük site betiği. Bağımlılık yok.
(function () {
  'use strict';

  // Bant sayfası: dünya sekmeleri listeyi süzer. Adres çubuğundaki #dunya-N de seçer.
  var sekmeler = document.querySelectorAll('.sekmeler .sekme');
  if (sekmeler.length) {
    var satirlar = document.querySelectorAll('#etkinlik-listesi .satir');
    var bos = document.getElementById('bos-liste');
    var sec = function (id) {
      var gorunen = 0;
      sekmeler.forEach(function (s) { s.setAttribute('aria-selected', s.dataset.dunya === String(id) ? 'true' : 'false'); });
      satirlar.forEach(function (r) {
        var goster = id === 0 || r.dataset.dunya === String(id);
        r.classList.toggle('gizli', !goster);
        if (goster) gorunen++;
      });
      if (bos) bos.hidden = gorunen > 0;
    };
    sekmeler.forEach(function (s) {
      s.addEventListener('click', function () {
        var id = Number(s.dataset.dunya);
        sec(id);
        if (history.replaceState) history.replaceState(null, '', id ? '#dunya-' + id : location.pathname);
      });
    });
    var m = /#dunya-(\d)/.exec(location.hash);
    if (m) sec(Number(m[1]));
  }

  // Ekran etkileşimi: data-modul olan kutulara kayıtlı modülü bağla.
  document.addEventListener('DOMContentLoaded', function () {
    if (!window.YZO) return;
    document.querySelectorAll('[data-modul]').forEach(function (kutu) {
      window.YZO.baslat(kutu.dataset.modul, kutu);
    });
  });
})();
