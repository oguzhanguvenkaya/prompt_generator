MG PS PPF Premium Sayfa Tasarımı — Güncellenmiş Uygulama Planı

Context

mgpolishing.com/ppf/ sayfası şu an sadece Hero Slider + 3D Viewer + Bülten + Footer içeriyor. Yeni eklenen 10 sayfalık PDF katalog (PPF.pdf) referans alınarak 8 yeni bölüm eklenecek. Tüm bölümler tek bir plugin (mgps-ppf-premium) altında ayrı shortcode'lar olarak geliştirilecek. Sıralı olarak bölüm bölüm ilerlenecek.

Tasarım Dili (Ortak)

- Renkler: Beyaz #FFFFFF, Açık Gri #F8F9FA, Koyu #0A0C10, Vurgu linear-gradient(90deg, #E60049, #FF4D79), Yıldız #FFD700
- Aksan Renkleri (Sadece ilgili bölümlerde): Mat PPF için Cyan/Turkuaz (#00BCD4), Renkli PPF için Sarı/Altın (#F5B82E), Cam Filmi için Turuncu (#FF8C00)
- Fontlar: Başlıklar Space Grotesk, Gövde Manrope (Google Fonts)
- Spacing: Bölümler arası 80-120px padding
- Responsive: Mobil ≤768px tek sütun, tablet ≤1024px 2 sütun
- Görseller: Placeholder (sonra değiştirilecek)
- İkonlar: SVG inline (harici font kütüphanesi yok)
- Teknoloji: Vanilla HTML/CSS/JS

Plugin Yapısı

mgps-ppf-premium/
├── mgps-ppf-premium.php          ← Ana plugin dosyası (tüm shortcode'ları register)
├── assets/
│   ├── ppf-premium.css            ← Ortak stiller (renkler, font, spacing, grid)
│   ├── ppf-tech.css               ← Bölüm 1: Teknoloji
│   ├── ppf-why.css                ← Bölüm 2: Neden MG PS
│   ├── ppf-products.css           ← Bölüm 3: Ürün Grupları
│   ├── ppf-compare.css            ← Bölüm 4: Karşılaştırma
│   ├── ppf-gallery.css            ← Bölüm 5: Galeri
│   ├── ppf-gallery.js             ← Bölüm 5: Galeri JS
│   ├── ppf-warranty.css           ← Bölüm 6: Garanti
│   ├── ppf-faq.css                ← Bölüm 7: SSS
│   ├── ppf-faq.js                 ← Bölüm 7: SSS accordion JS
│   └── ppf-cta.css                ← Bölüm 8: CTA Formu
└── templates/
    ├── tech-section.php           ← Bölüm 1
    ├── why-section.php            ← Bölüm 2
    ├── products-section.php       ← Bölüm 3
    ├── compare-section.php        ← Bölüm 4
    ├── gallery-section.php        ← Bölüm 5
    ├── warranty-section.php       ← Bölüm 6
    ├── faq-section.php            ← Bölüm 7
    └── cta-section.php            ← Bölüm 8

Shortcode'lar

┌─────────────────────┬─────────────────────────────┐
│      Shortcode      │            Bölüm            │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_tech]     │ Teknoloji ve Altyapı        │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_why]      │ Neden MG PS PPF?            │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_products] │ Ürün Grupları (4 alt bölüm) │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_compare]  │ Karşılaştırma Tablosu       │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_gallery]  │ Uygulama Galerisi           │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_warranty] │ Garanti ve Sertifikalar     │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_faq]      │ Sıkça Sorulan Sorular       │
├─────────────────────┼─────────────────────────────┤
│ [mgps_ppf_cta]      │ Teklif Formu                │
└─────────────────────┴─────────────────────────────┘

---
Görevler (Sıralı Uygulama)

Görev 0: Plugin İskeleti + Ortak Stiller

Dosya: mgps-ppf-premium.php + assets/ppf-premium.css
- Plugin header, ABSPATH kontrolü, sabitler
- Google Fonts import (Space Grotesk + Manrope)
- CSS değişkenleri, ortak class'lar (.mgps-section, .mgps-container, .mgps-heading vb.)
- Her shortcode fonksiyonu register + ilgili CSS/JS lazy enqueue

Görev 1: Teknoloji ve Altyapı Bölümü

Shortcode: [mgps_ppf_tech] | Arka plan: Beyaz
- Layout: 2 sütun — sol: katmanlı PPF illüstrasyon (CSS/SVG ile Release Liner, Adhesive, TPU Base, Top Coating), sağ: 4 ikonlu özellik listesi
- İçerik (katalog s.2-3):
  - HDI+Aliphatic TPU yapısı
  - %400'e varan esneme kapasitesi
  - 6.000 saati aşan UV direnci
  - -40°C ile 120°C ısı dayanımı
- Teknik Spec Grid (katalog s.3): 3x3 kutular
  - Film Kalınlıkları: 170-190 Mikron
  - Gerdirme Dayanımı: 21,62 Mpa
  - Isı Dayanımı: -40°C -120°C
  - Film Ölçüleri: 1.52m x 15m
  - Parlaklık Değerleri: 96.2-98.8
  - Kimyasal Dayanım Testi: Zarar Yok
  - Garanti: 4-10 Sene
  - TPU Çeşiti: HDI+Aliphatic
  - UV Testi: 6,000 Saat Geçildi
- 4 İkon: Ultimate Surface, Smart Healing, Invisible Protection, Water Repellent

Görev 2: Neden MG PS PPF?

Shortcode: [mgps_ppf_why] | Arka plan: Açık Gri #F8F9FA
- Layout: 3x2 Grid (6 kutu)
- Her kutuda: SVG ikon + başlık + kısa açıklama
- Hover: kart 4px yukarı + gölge belirginleşme (transition 0.3s)
- İçerik (katalog s.8 referanslı, genel faydalar):
  a. Üst Düzey Hammadde Kalitesi — Bayer ve Lubrizol TPU
  b. Akıllı Kendini İyileştirme — Self-healing teknolojisi
  c. Uzun Ömürlü Dayanım — 10 yıla varan garanti
  d. Yüksek Parlaklık — %98+ optik netlik
  e. Gelişmiş Hidrofobik Yüzey — Su ve leke itici
  f. Kolay Uygulama — Hava kanallı yapıştırıcı

Görev 3: Ürün Grupları (4 Alt Bölüm)

Shortcode: [mgps_ppf_products] | Arka plan: Beyaz
En karmaşık görev — 4 farklı layout:

3A. Parlak PPF Grubu
- Başlık: "PARLAK PPF GRUBU" | Alt: "Göz Alıcı Derinlik, Maksimum Koruma"
- 5 ürünlü Grid (3 sütun desktop, tablet 2, mobil carousel veya 1 sütun)
- Ürünler (katalog s.4 verileriyle):
  - PROTECTA PHILIC: 170 μm, 4 sene, Parlaklık: 4★, Su İticilik: 3★, Leke: 4★, Yenileme: 4★
  - FORTIFIED PHILIC: 190 μm, 4 sene, Parlaklık: 4★, Su İticilik: 3★, Leke: 4★, Yenileme: 4★
  - EXPAND PHOBIC: 190 μm, 5 sene, Parlaklık: 5★, Su İticilik: 5★, Leke: 4★, Yenileme: 5★
  - EXALTED PHOBIC: 190 μm, 8 sene, Parlaklık: 5★, Su İticilik: 5★, Leke: 4★, Yenileme: 5★
  - REINFORCED PHOBIC: 190 μm, 10 sene, Parlaklık: 5★, Su İticilik: 5★, Leke: 5★, Yenileme: 5★

3B. Mat PPF Grubu
- Başlık: "MAT PPF GRUBU" | Alt: "Agresif, Asil ve Yenilmez"
- Asimetrik: Sol büyük görsel, sağ: Satinato Phobic özellik gridi
- Ürün: SATINATO PHOBIC (190 μm, 8 sene, Parlaklık: 1★, Su İticilik: 5★, Leke: 4★, Yenileme: 5★)
- Renk aksanı: Cyan/turkuaz (#00BCD4) - Katalogdaki gibi

3C. Renkli PPF Grubu
- Başlık: "RENKLİ PPF GRUBU" | Alt: "Sınırları Aşan Renkler, Gerçek PPF Koruması"
- Asimetrik: Sol büyük görsel, sağ: Color Phobic özellik gridi
- Ürün: COLOR PHOBIC (190 μm, 5 sene, Parlaklık: 5★, Su İticilik: 5★, Leke: 5★, Yenileme: 5★)
- Alt kısım: CSS renk paleti yuvarlakları (12 renk) + "+150 farklı renk seçeneği" ibaresi
- Renk aksanı: Sarı/altın (#F5B82E) - Katalogdaki gibi

3D. Cam Filmi Grubu
- Başlık: "CAM FİLMİ GRUBU" | Alt: "Konforunuzu Bir Üst Seviyeye Taşıyın"
- Asimetrik: Sol büyük görsel, sağ: 4 seri karşılaştırma tablosu (katalog s.6)
- Renk aksanı: Turuncu (#FF8C00) - Katalogdaki gibi
- Tablo Verileri:
  - COMFORT SERİSİ: Metalized, 2 Mil, VLT: 25-35-58, IRR: 30, UVR: 99, TSER: 48
  - BRIGHT SERİSİ: Chip Dyed Metalized, 2 Mil, VLT: 20-30-47, IRR: 30, UVR: 99, TSER: 54
  - MAGNUM SERİSİ: Nano Ceramic, 2 Mil, VLT: 20-30-50, IRR: 90, UVR: 99, TSER: 64
  - MAGNUM SKY SERİSİ: Nano Ceramic, 1.5 Mil, VLT: 74, IRR: 90, UVR: 99, TSER: 58

Görev 4: Karşılaştırma Tablosu

Shortcode: [mgps_ppf_compare] | Arka plan: Koyu #0A0C10
- Layout: Modern tablo, sadece alt çizgiler (border-bottom), dikey çizgi yok
- Hover: satır rgba(255,255,255,0.05) aydınlatma
- Sütunlar: Ürün Adı, Kalınlık, Dayanım, Parlaklık, Su İticilik, Leke Tutmama, Kendini Yenileme
- Satırlar (Gerçek Verilerle):
  1. PROTECTA PHILIC: 170 μm, 4 sene, 4★, 3★, 4★, 4★
  2. FORTIFIED PHILIC: 190 μm, 4 sene, 4★, 3★, 4★, 4★
  3. EXPAND PHOBIC: 190 μm, 5 sene, 5★, 5★, 4★, 5★
  4. EXALTED PHOBIC: 190 μm, 8 sene, 5★, 5★, 4★, 5★
  5. REINFORCED PHOBIC: 190 μm, 10 sene, 5★, 5★, 5★, 5★
  6. SATINATO PHOBIC: 190 μm, 8 sene, 1★, 5★, 4★, 5★
- Mobil: Yatay scroll (overflow-x)

Görev 5: Uygulama Galerisi

Shortcode: [mgps_ppf_gallery] | Arka plan: Beyaz
- Layout: Sol 1 büyük görsel (60%) + Sağ 2x2 thumbnail grid (40%)
- Toplam 5 görsel (1 büyük + 4 küçük)
- Etkileşim: Thumbnail tıklayınca büyük görsel değişir (fade transition)
- Placeholder görseller

Görev 6: Garanti ve Sertifikalar

Shortcode: [mgps_ppf_warranty] | Arka plan: Açık Gri #F8F9FA
- Başlık: "GARANTİ VE KAYIT SİSTEMİ"
- Alt Başlık: "Güvenilir, Şeffaf ve Dijital Koruma"
- Layout: 2 Sütun
- Sol Sütun: Metinler
  - Orijinallik Garantisi: Fiziksel Garanti Broşürü ve Garanti Kartı
  - Dijital Takip: QR kodu veya seri numarası ile online garanti aktivasyonu
  - Sadece yetkili ve sertifikalı merkezlerde geçerlidir
- Sağ Sütun: Warranty Card ve QR Kod görseli (katalog s.8-9)

Görev 7: Sıkça Sorulan Sorular

Shortcode: [mgps_ppf_faq] | Arka plan: Beyaz
- Layout: Accordion, +/- ikon, smooth açılış (max-height transition)
- Sorular ve Cevaplar:
  a. PPF kaplama aracımın boyasına zarar verir mi?
     Cevap: Hayır, aksine aracınızın orijinal boyasını dış etkenlerden korur. Söküldüğünde boyaya zarar vermez ve kalıntı bırakmaz.
  b. Kendini yenileme (Self-healing) özelliği nasıl çalışır?
     Cevap: Akıllı Topcoat yapımız sayesinde yüzeydeki mikro çizikler, güneş ısısı veya sıcak su teması ile saniyeler içinde kendiliğinden kaybolur.
  c. Seramik kaplama ile PPF arasındaki fark nedir?
     Cevap: Seramik kaplama sadece parlaklık ve su iticilik sağlarken, PPF fiziksel bir zırh görevi görerek taş sekmeleri, derin çizikler ve sürtmelere karşı gerçek koruma sağlar.
  d. Mat PPF aracımın orijinal rengini değiştirir mi?
     Cevap: Satinato Phobic serimiz aracınızın orijinal rengini değiştirmez, sadece yüzeyine asil ve premium bir "Satin Mat" görünüm kazandırır.
  e. Garanti süresi neleri kapsar?
     Cevap: Garantimiz sararma, çatlama, kabarma ve üretim hatalarına karşı koruma sağlar. Garanti süresi ürüne göre 4 ile 10 yıl arasında değişmektedir.

Görev 8: CTA / Teklif Formu

Shortcode: [mgps_ppf_cta] | Arka plan: Koyu #0A0C10
- Başlık: "ARACINIZ İÇİN EN İYİ KORUMAYI SEÇİN"
- Alt başlık: "Profesyonel ekibimizden fiyat teklifi alın."
- Form Layout: 2 Sütunlu (İsim Soyisim ve Telefon yan yana; Email ve Mesaj alt alta).
- "Konu" alanı KESİNLİKLE OLMAYACAK. Sadece 4 alan: İsim, Telefon, Email, Mesaj.
- Input stili: Koyu arka plana uygun, sadece alt çizgili, focus kırmızı vurgu
- Buton: "TEKLİF AL" — kırmızı/pembe gradient, hover glow efekti
- Not: Sadece frontend; backend entegrasyonu (CF7/FluentForms) sonradan bağlanacak
