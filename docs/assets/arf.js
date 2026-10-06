// ARF karakteri (Kapsül ARF). Hem tarayıcıda (window.ARF) hem derleyicide (require) çalışır.
// ARF.svg(ruh, { boy, sinif, defter, tebesir }) → SVG metni.
// Ruh hâlleri: merakli | sevincli | saskin | dusunceli | yanilmis
// Animasyon sınıfları site.css'te: .arf (sallanma + göz kırpma), .arf.konusuyor (ağız), .arf.zipla (sevinç), .arf.dusun (düşünme)
(function (kok) {
  'use strict';
  var INK = '#1F2A48', SARI = '#F6C945', EKRAN = '#26335A', IZ = '#BFF3FF';

  function goz(x, y, r, ruh, i) {
    var k = r * 0.32, c = 'stroke="' + IZ + '" stroke-width="5" stroke-linecap="round" fill="none"';
    if (ruh === 'sevincli') return '<path d="M' + (x - k) + ' ' + (y + 3) + ' Q' + x + ' ' + (y - k - 2) + ' ' + (x + k) + ' ' + (y + 3) + '" ' + c + '/>';
    if (ruh === 'saskin') return '<circle cx="' + x + '" cy="' + y + '" r="' + (k + 3) + '" ' + c + '/><circle cx="' + x + '" cy="' + y + '" r="3" fill="' + IZ + '"/>';
    if (ruh === 'dusunceli') return '<path d="M' + (x - k) + ' ' + y + ' H' + (x + k) + '" ' + c + '/><circle cx="' + (x + k * 0.5) + '" cy="' + (y - 7) + '" r="3.5" fill="' + IZ + '"/>';
    if (ruh === 'yanilmis') return i === 0
      ? '<path d="M' + (x - k) + ' ' + (y - k * 0.6) + ' L' + (x + k * 0.6) + ' ' + y + ' L' + (x - k) + ' ' + (y + k * 0.6) + '" ' + c + '/>'
      : '<path d="M' + (x + k) + ' ' + (y - k * 0.6) + ' L' + (x - k * 0.6) + ' ' + y + ' L' + (x + k) + ' ' + (y + k * 0.6) + '" ' + c + '/>';
    return '<circle cx="' + (x + 2) + '" cy="' + (y - 4) + '" r="' + (k * 0.85) + '" fill="' + IZ + '"/><circle cx="' + (x + 5) + '" cy="' + (y - 8) + '" r="3" fill="' + EKRAN + '"/>';
  }
  function agiz(cx, cy, w, ruh) {
    var c = 'stroke="' + IZ + '" stroke-width="4" stroke-linecap="round" fill="none"', a = w / 2 - 12, ic;
    if (ruh === 'sevincli') ic = '<path d="M' + (cx - a) + ' ' + (cy - 3) + ' Q' + cx + ' ' + (cy + 9) + ' ' + (cx + a) + ' ' + (cy - 3) + '" ' + c + '/>';
    else if (ruh === 'saskin') ic = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="6" ry="5" ' + c + '/>';
    else if (ruh === 'dusunceli') ic = '<path d="M' + (cx - a * 0.6) + ' ' + cy + ' H' + (cx + a * 0.6) + '" ' + c + '/>';
    else if (ruh === 'yanilmis') ic = '<path d="M' + (cx - a) + ' ' + (cy + 2) + ' q' + (a / 2) + ' -7 ' + a + ' 0 t' + a + ' 0" ' + c + '/>';
    else ic = '<path d="M' + (cx - a * 0.6) + ' ' + (cy - 1) + ' Q' + cx + ' ' + (cy + 5) + ' ' + (cx + a * 0.6) + ' ' + (cy - 1) + '" ' + c + '/>';
    return '<rect x="' + (cx - w / 2) + '" y="' + (cy - 11) + '" width="' + w + '" height="22" rx="11" fill="' + EKRAN + '" stroke="' + INK + '" stroke-width="4"/>' +
      '<g class="arf-agiz">' + ic + '</g>';
  }
  function mikrofon(x, y) { var s = ''; for (var i = 0; i < 3; i++) s += '<circle cx="' + x + '" cy="' + (y + i * 9) + '" r="2.6" fill="' + INK + '"/>'; return s; }

  function svg(ruh, o) {
    ruh = ruh || 'merakli'; o = o || {};
    var boy = o.boy || 120, defter = o.defter !== false, tebesir = o.tebesir !== false;
    var s = '<svg class="arf ' + (o.sinif || '') + '" data-ruh="' + ruh + '" width="' + boy + '" height="' + Math.round(boy * 1.1) + '" viewBox="0 0 300 330" role="img" aria-label="ARF" focusable="false">';
    s += '<ellipse cx="150" cy="318" rx="70" ry="8" fill="' + INK + '" opacity=".15"/>';
    s += '<g class="arf-tum">';
    s += '<g class="arf-teker"><circle cx="150" cy="290" r="24" fill="#fff" stroke="' + INK + '" stroke-width="6"/><circle cx="150" cy="290" r="8" fill="' + INK + '"/><line x1="150" y1="272" x2="150" y2="282" stroke="' + INK + '" stroke-width="4"/></g>';
    s += '<rect x="80" y="40" width="140" height="240" rx="70" fill="' + SARI + '" stroke="' + INK + '" stroke-width="6"/>';
    s += mikrofon(88, 120) + mikrofon(212, 120);
    s += '<g class="arf-kamera"><circle cx="150" cy="62" r="7" fill="' + INK + '"/><circle cx="150" cy="62" r="3" fill="' + IZ + '"/></g>';
    s += '<path d="M' + (150 - 6) + ' 113 Q150 103 ' + (150 + 6) + ' 113" fill="none" stroke="' + INK + '" stroke-width="5" stroke-linecap="round"/>';
    s += '<g class="arf-gozler">';
    [114, 186].forEach(function (x, i) {
      s += '<circle cx="' + x + '" cy="115" r="30" fill="' + EKRAN + '" stroke="' + INK + '" stroke-width="6"/>';
      s += '<circle cx="' + x + '" cy="115" r="23" fill="none" stroke="' + SARI + '" stroke-width="2" opacity=".55"/>';
      s += goz(x, 115, 30, ruh, i);
    });
    s += '</g>';
    s += agiz(150, 172, 64, ruh);
    s += '<g class="arf-kol-sol"><path d="M84 200 Q56 214 70 242" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/></g>';
    s += '<g class="arf-kol-sag"><path d="M216 200 Q246 214 230 242" fill="none" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/>' +
      (tebesir ? '<rect x="234" y="234" width="8" height="26" rx="3" fill="#fff" stroke="' + INK + '" stroke-width="3" transform="rotate(30 234 234)"/>' : '') + '</g>';
    if (defter) s += '<g class="arf-defter"><rect x="112" y="206" width="76" height="54" rx="4" fill="#E8E2F8" stroke="' + INK + '" stroke-width="4"/><rect x="112" y="206" width="8" height="54" fill="' + INK + '"/>' +
      '<text x="154" y="240" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="17" fill="' + INK + '">x²</text></g>';
    if (ruh === 'dusunceli') s += '<g class="arf-balon-dusun"><circle cx="236" cy="54" r="6" fill="#fff" stroke="' + INK + '" stroke-width="3"/><circle cx="252" cy="36" r="9" fill="#fff" stroke="' + INK + '" stroke-width="3"/><circle cx="274" cy="18" r="12" fill="#fff" stroke="' + INK + '" stroke-width="3"/></g>';
    if (ruh === 'sevincli') s += '<g class="arf-yildiz"><path d="M44 60 l5 10 11 2 -8 7 2 11 -10-6 -10 6 2-11 -8-7 11-2z" fill="' + SARI + '" stroke="' + INK + '" stroke-width="3"/><path d="M252 70 l4 8 9 1 -7 6 2 9 -8-5 -8 5 2-9 -7-6 9-1z" fill="' + SARI + '" stroke="' + INK + '" stroke-width="3"/></g>';
    s += '</g></svg>';
    return s;
  }

  var ARF = { svg: svg, RUHLAR: ['merakli', 'sevincli', 'saskin', 'dusunceli', 'yanilmis'] };
  if (typeof module !== 'undefined' && module.exports) module.exports = ARF;
  else kok.ARF = ARF;
})(typeof window !== 'undefined' ? window : this);
