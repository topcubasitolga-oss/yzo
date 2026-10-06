// ARF Atölyesi: Ödevde yapay zekâ — trafik ışığı (sürükle-bırak)
YZO.kaydet('atolye-odev', function (kutu, Y) {
  'use strict';
  Y.surukleBirak(kutu, {
    soru: 'Ödevde yapay zekâ: Bu davranış hangi ışıkta?',
    kutular: [
      { id: 'yesil', ad: 'Yeşil: Kullanabilirim', emoji: '🟢', sinif: 'yesil' },
      { id: 'sari', ad: 'Sarı: Dikkat, beyan et', emoji: '🟡', sinif: 'sarikutu' },
      { id: 'kirmizi', ad: 'Kırmızı: Yapmam', emoji: '🔴', sinif: 'kirmizi' }
    ],
    ogeler: [
      { emoji: '💡', ad: 'Konu için fikir istemek', kutu: 'yesil', neden: 'Fikir almak sorun değil; seçmek ve yazmak sana kalır.', ipucu: 'Fikir almak ödevi senin yerine yapar mı?' },
      { emoji: '🔤', ad: 'Yazım hatalarımı kontrol ettirmek', kutu: 'yesil', neden: 'Yazdığın senin; ARF yalnız kontrol eder.', ipucu: 'Metni kim yazdı?' },
      { emoji: '❓', ad: 'Anlamadığım bir şeyi açıklatmak', kutu: 'yesil', neden: 'Öğrenmek için sormak iyi bir kullanım. Ama cevabı kitaptan da kontrol et.', ipucu: 'Bu, öğrenmene yardım eder mi?' },
      { emoji: '🖼️', ad: 'Sunuma ARF\'la resim çizdirmek', kutu: 'sari', neden: 'Olabilir, ama resmin altına "ARF ile yapıldı" yazmalısın.', ipucu: 'Resmi kimin yaptığını söylemen gerekir mi?' },
      { emoji: '📝', ad: 'Taslağımı ARF\'a düzelttirmek', kutu: 'sari', neden: 'Önerilerine bak, ama son hâli kendi sözcüklerinle yaz ve öğretmenine söyle.', ipucu: 'Son metin kimin sözcükleriyle olmalı?' },
      { emoji: '🤖', ad: 'Ödevin tamamını ARF\'a yazdırmak', kutu: 'kirmizi', neden: 'O zaman sen öğrenmemiş olursun ve ödev senin olmaz.', ipucu: 'Bu ödevde senin emeğin nerede?' },
      { emoji: '🙈', ad: 'ARF\'ın yazdığını kendim yazdım demek', kutu: 'kirmizi', neden: 'Bu dürüst değil. Yardım aldıysak söyleriz.', ipucu: 'Bu dürüst bir davranış mı?' },
      { emoji: '🏠', ad: 'Adresimi ve okulumu yazıp sormak', kutu: 'kirmizi', neden: 'Kişisel bilgilerimizi yapay zekâya yazmayız.', ipucu: 'Özel bilgilerimizi kime söyleriz?' }
    ],
    son: 'Yeşil: fikir, kontrol, açıklama. Sarı: yardım aldıysan beyan et. Kırmızı: ödevi yaptırmak, saklamak, kişisel bilgi yazmak.'
  });
});
