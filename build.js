#!/usr/bin/env node
'use strict';
// YZO Havuzu derleyicisi: data/etkinlikler.json + src/ şablonları → docs/ (statik site).
// Çalıştır: node build.js   (bağımlılık yok)

const fs = require('fs');
const path = require('path');
const veri = require('./data/etkinlikler.json');
const S = require('./src/sayfalar');
const { kagitSayfasi } = require('./src/kagit');

const KOK = __dirname;
const CIKTI = path.join(KOK, 'docs');

function yaz(goreli, icerik) {
  const tam = path.join(CIKTI, goreli);
  fs.mkdirSync(path.dirname(tam), { recursive: true });
  fs.writeFileSync(tam, icerik);
}

function kopyala(kaynak, hedef) {
  const tam = path.join(CIKTI, hedef);
  fs.mkdirSync(path.dirname(tam), { recursive: true });
  fs.copyFileSync(kaynak, tam);
}

// Temizle
fs.rmSync(CIKTI, { recursive: true, force: true });
fs.mkdirSync(CIKTI, { recursive: true });

// Varlıklar
const varlikKok = path.join(KOK, 'assets');
for (const dosya of fs.readdirSync(varlikKok, { recursive: true })) {
  const tam = path.join(varlikKok, dosya);
  if (fs.statSync(tam).isFile()) kopyala(tam, path.join('assets', dosya));
}

// Sayfalar
let sayac = 0;
yaz('index.html', S.anaSayfa(veri, '')); sayac++;
for (const b of veri.bantlar) { yaz(`bant/${b.id}/index.html`, S.bantSayfasi(veri, b, '../../')); sayac++; }
for (const e of veri.etkinlikler) {
  yaz(`e/${e.slug}/index.html`, S.etkinlikSayfasi(veri, e, '../../')); sayac++;
  yaz(`k/${e.slug}/index.html`, kagitSayfasi(veri, e, '../../')); sayac++;
  if (e.ekran.durum === 'hazir') { yaz(`e/${e.slug}/ekran.html`, S.ekranSayfasi(veri, e, '../../')); sayac++; }
}
yaz('oyunlar/index.html', S.oyunlarSayfasi(veri, '../')); sayac++;
yaz('ogretmen/index.html', S.ogretmenSayfasi(veri, '../')); sayac++;
yaz('kitap/index.html', S.kitapSayfasi(veri, '../')); sayac++;
yaz('arastirma/index.html', S.arastirmaSayfasi(veri, '../')); sayac++;
yaz('.nojekyll', '');

console.log(`Derlendi: ${sayac} sayfa → docs/`);
