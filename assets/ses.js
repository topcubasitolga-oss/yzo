// YZO ses katmanı.
// YZO.ses.soyle(metin, { dosya, bitince }) → önce kayıtlı ses dosyası (ElevenLabs), yoksa tarayıcının Türkçe sesi.
// YZO.ses.efekt('dogru' | 'bak' | 'tik') → kısa efekt (Web Audio, dosya gerekmez).
// Ses düğmesiyle kapatılabilir; tercih bu tarayıcıda hatırlanır.
(function () {
  'use strict';
  window.YZO = window.YZO || {};
  var acik = true;
  try { acik = localStorage.getItem('yzo-ses') !== 'kapali'; } catch (e) { /* depolama yoksa açık kalır */ }
  var aktifSes = null, baglam = null, trSes = null;

  function sesSec() {
    if (!('speechSynthesis' in window)) return;
    var hepsi = window.speechSynthesis.getVoices();
    trSes = hepsi.filter(function (v) { return /^tr/i.test(v.lang); })[0] || null;
  }
  if ('speechSynthesis' in window) { sesSec(); window.speechSynthesis.onvoiceschanged = sesSec; }

  function sus() {
    if (aktifSes) { aktifSes.pause(); aktifSes = null; }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function soyle(metin, o) {
    o = o || {};
    sus();
    var bitti = function () { if (o.bitince) o.bitince(); };
    if (!acik || !metin) { setTimeout(bitti, 900); return; }
    if (o.dosya) {
      aktifSes = new Audio(o.dosya);
      aktifSes.onended = bitti; aktifSes.onerror = function () { aktifSes = null; tarayici(metin, bitti); };
      aktifSes.play().catch(function () { tarayici(metin, bitti); });
      return;
    }
    tarayici(metin, bitti);
  }
  function tarayici(metin, bitti) {
    if (!('speechSynthesis' in window)) { setTimeout(bitti, 1200); return; }
    var u = new SpeechSynthesisUtterance(metin.replace(/[🌱🔍🧩🛡️🎨✓✋💥]/gu, ''));
    u.lang = 'tr-TR'; u.rate = 0.95; u.pitch = 1.15;
    if (trSes) u.voice = trSes;
    u.onend = bitti; u.onerror = bitti;
    window.speechSynthesis.speak(u);
  }

  function efekt(tur) {
    if (!acik) return;
    try {
      baglam = baglam || new (window.AudioContext || window.webkitAudioContext)();
      var notalar = tur === 'dogru' ? [660, 880] : tur === 'bak' ? [330, 262] : [520];
      notalar.forEach(function (f, i) {
        var o = baglam.createOscillator(), g = baglam.createGain(), t = baglam.currentTime + i * 0.12;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.connect(g); g.connect(baglam.destination); o.start(t); o.stop(t + 0.2);
      });
    } catch (e) { /* ses çalınamazsa sessiz devam */ }
  }

  function ayarla(deger) {
    acik = deger;
    try { localStorage.setItem('yzo-ses', acik ? 'acik' : 'kapali'); } catch (e) { /* yoksay */ }
    if (!acik) sus();
    document.querySelectorAll('[data-ses-dugme]').forEach(function (b) { b.textContent = acik ? '🔊 Ses açık' : '🔇 Ses kapalı'; b.setAttribute('aria-pressed', acik ? 'true' : 'false'); });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-ses-dugme]');
    if (b) { e.stopPropagation(); ayarla(!acik); }
  }, true);
  document.addEventListener('DOMContentLoaded', function () { ayarla(acik); });

  window.YZO.ses = { soyle: soyle, sus: sus, efekt: efekt, acikMi: function () { return acik; } };
})();
