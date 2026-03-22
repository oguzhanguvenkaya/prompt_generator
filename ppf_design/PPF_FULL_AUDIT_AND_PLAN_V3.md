# MG PS PPF Premium Sayfa — Kapsamlı Audit ve Düzeltilmiş Uygulama Planı V3

---

## BÖLÜM A: MEVCUT DOSYALARIN AUDIT'İ

### A1. Font Uyumsuzluğu (KRİTİK)

Uygulama planı (pasted_content_4.txt) ve DESIGN.md'de font tanımları birbiriyle çelişiyor:

| Kaynak | Başlık Fontu | Gövde Fontu |
|--------|-------------|-------------|
| Uygulama Planı (pasted_content_4.txt) | Space Grotesk | Manrope |
| DESIGN.md | Space Grotesk + Manrope | Manrope |
| ppf-premium.css (mevcut) | `ethnocentric` | `Montserrat` |
| Google Fonts import (mevcut PHP) | Montserrat + Space Grotesk | — |

**Sorun:** Mevcut CSS'te `--mgps-font-heading: 'ethnocentric'` ve `--mgps-font-body: 'Montserrat'` tanımlı. Ama plan Space Grotesk + Manrope diyor. Google Fonts import'unda ise Montserrat + Space Grotesk yükleniyor, Manrope hiç yok.

**Düzeltme:**
- `ethnocentric` fontu mgpolishing.com sitesinde zaten kullanılıyor (marka fontu). Başlıklarda kalmalı.
- Gövde fontu: Plan Manrope diyor ama mevcut CSS Montserrat kullanıyor. **Karar gerekli.**
- Google Fonts import'una Manrope eklenmeli VEYA Montserrat korunmalı.

**Öneri:** `ethnocentric` başlıklarda kalsın (marka tutarlılığı), `Space Grotesk` display/alt başlıklarda, `Manrope` gövde metinlerinde kullanılsın. Google Fonts import'u güncellenmeli:
```
Space Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700
```

---

### A2. DESIGN.md ile Mevcut CSS Arasındaki Çelişkiler

| Kural | DESIGN.md | Mevcut CSS | Durum |
|-------|-----------|------------|-------|
| Arka plan | #111316 | #0A0C10 | ⚠️ Farklı |
| No-Line Rule | Border YOK, tonal layering | `.mgps-tech-feat` border-left: 4px solid | ❌ İhlal |
| Gölgeler | Tinted, 5% opacity, 32px blur | box-shadow: 0 4px 20px rgba(0,0,0,0.4) | ⚠️ Siyah gölge |
| Ghost Border | outline-variant 15% opacity | Yok | ⚠️ Eksik |
| Buton | md rounding (0.375rem) | border-radius: 4px | ✅ Yakın |
| Input | Underline-only, gold focus | Henüz yok | — |

**Düzeltme Önerisi:**
- Koyu arka plan: `#111316` olarak güncellenmeli (DESIGN.md'ye uyum)
- Tech section'daki `border-left: 4px solid` kaldırılıp, tonal layering ile değiştirilmeli
- Gölgeler tinted yapılmalı (rgba(10,12,16,0.05) gibi)

---

### A3. Uygulama Planı (pasted_content_4.txt) vs Final Plan Farkları

| Madde | pasted_content_4.txt | Final Plan (PPF_IMPLEMENTATION_PLAN_FINAL.md) | Durum |
|-------|---------------------|----------------------------------------------|-------|
| CTA Formu | İsim+Telefon \| Email+**Konu** \| Mesaj | İsim+Telefon \| Email \| Mesaj (Konu YOK) | ❌ Eski planda Konu var |
| SSS Cevapları | "Derlenecek" | Tüm cevaplar yazılmış | ❌ Eski planda eksik |
| Galeri görselleri | 8 adet | 5 adet (1 büyük + 4 thumbnail) | ❌ Farklı |
| Garanti bölümü | Yatay dar bant + SGS/TÜV logoları | 2 sütun + QR + Warranty Card | ❌ Farklı layout |
| Aksan renkleri | Tanımsız | Mat: Cyan, Renkli: Sarı, Cam: Turuncu | ❌ Eski planda eksik |
| Ürün verileri | Sadece başlıklar | Tüm yıldız sayıları dahil | ❌ Eski planda eksik |
| Satinato dayanım | Belirtilmemiş | 8 sene (düzeltilmiş) | ❌ Eski planda yok |

---

### A4. Mevcut tech-section.php Analizi

**İyi Taraflar:**
- ✅ Katmanlı PPF illüstrasyonu (CSS 3D transform ile) — çok iyi
- ✅ 3x3 Teknik Spec Grid — doğru veriler
- ✅ 4 ikon satırı — doğru ikonlar (PNG olarak)
- ✅ Responsive breakpoints (1024px, 768px, 480px)
- ✅ Hover efektleri (katmanlar ayrışma, spec box yukarı kayma)
- ✅ ARIA etiketleri (erişilebilirlik)

**Sorunlar:**
- ⚠️ İkon dosyaları PNG olarak yükleniyor (`icon-*.png`). Beyaz arka plan üzerinde beyaz ikonlar görünmez olabilir. Koyu arka plan üzerinde kullanılıyorlar (`.mgps-tech-icons` koyu arka planlı) — bu doğru.
- ⚠️ `border-left: 4px solid` DESIGN.md'nin No-Line Rule'una aykırı
- ⚠️ `.mgps-spec-box::before` 3px gradient çizgi — bu da border sayılır ama accent olarak kabul edilebilir

**Karar:** Tech section büyük ölçüde iyi durumda. Küçük CSS düzeltmeleri yeterli.

---

## BÖLÜM B: DÜZELTİLMİŞ VE ZENGİNLEŞTİRİLMİŞ UYGULAMA PLANI V3

### Tasarım Dili (Ortak — Güncellenmiş)

**Renk Paleti (5 Renk + Aksan):**

| Token | HEX | Kullanım |
|-------|-----|----------|
| `--mgps-white` | #FFFFFF | Açık bölüm arka planı |
| `--mgps-light-grey` | #F8F9FA | Gri bölüm arka planı |
| `--mgps-dark` | #111316 | Koyu bölüm arka planı (DESIGN.md uyumlu) |
| `--mgps-text-primary` | #1A1A1A | Ana metin |
| `--mgps-text-secondary` | #666666 | İkincil metin |
| `--mgps-accent` | linear-gradient(90deg, #E60049, #FF4D79) | CTA, vurgu |
| `--mgps-accent-solid` | #E60049 | Tek renk vurgu |
| `--mgps-gold` | #FFD700 | Yıldızlar |

**Aksan Renkleri (Sadece ilgili bölümlerde):**

| Grup | Renk | HEX |
|------|------|-----|
| Mat PPF | Cyan/Turkuaz | #00BCD4 |
| Renkli PPF | Sarı/Altın | #F5B82E |
| Cam Filmi | Turuncu | #FF8C00 |

**Fontlar:**
- Başlıklar (H2): `ethnocentric` (marka fontu, zaten sitede yüklü)
- Alt başlıklar / Display: `Space Grotesk` (Google Fonts)
- Gövde metni: `Manrope` (Google Fonts)

**Spacing:**
- Bölümler arası: 100px padding (desktop), 80px (tablet), 60px (mobil)
- Container max-width: 1400px
- Container padding: 0 24px (desktop), 0 16px (mobil)

**No-Line Rule (DESIGN.md):**
- Bölüm sınırları: Arka plan renk değişimiyle
- Kart sınırları: Tonal layering (background shift)
- Input: Underline-only, focus'ta accent renk
- Tablo: Sadece border-bottom, dikey çizgi yok

**Responsive Breakpoints:**
- Desktop: > 1024px
- Tablet: 768px – 1024px
- Mobil: < 768px
- Küçük mobil: < 480px

---

### Plugin Yapısı (Değişmedi)

```
mgps-ppf-premium/
├── mgps-ppf-premium.php
├── assets/
│   ├── ppf-premium.css
│   ├── ppf-tech.css
│   ├── ppf-why.css
│   ├── ppf-products.css
│   ├── ppf-compare.css
│   ├── ppf-gallery.css
│   ├── ppf-gallery.js
│   ├── ppf-warranty.css
│   ├── ppf-faq.css
│   ├── ppf-faq.js
│   ├── ppf-cta.css
│   ├── icon-ultimate-surface.png
│   ├── icon-smart-healing.png
│   ├── icon-invisible-protection.png
│   └── icon-water-repellent.png
└── templates/
    ├── tech-section.php
    ├── why-section.php
    ├── products-section.php
    ├── compare-section.php
    ├── gallery-section.php
    ├── warranty-section.php
    ├── faq-section.php
    └── cta-section.php
```

---

### Görev 0: Plugin İskeleti + Ortak Stiller (GÜNCELLEME)

**Dosya:** `mgps-ppf-premium.php` + `assets/ppf-premium.css`

**Değişiklikler:**
1. Google Fonts import güncellenmeli: `Space Grotesk + Manrope` (Montserrat çıkarılacak)
2. CSS değişkenleri güncellenmeli:
   - `--mgps-dark: #111316` (eski: #0A0C10)
   - `--mgps-font-body: 'Manrope', sans-serif` (eski: Montserrat)
   - `--mgps-font-display: 'Space Grotesk', sans-serif` (aynı)
   - `--mgps-font-heading: 'ethnocentric', sans-serif` (aynı, korunacak)
3. `.mgps-heading` font-family `ethnocentric` olarak kalacak
4. `.mgps-subheading` font-family `Manrope` olacak

---

### Görev 1: Teknoloji ve Altyapı (MEVCUT — Küçük Düzeltmeler)

**Shortcode:** `[mgps_ppf_tech]` | **Arka plan:** Beyaz

**Mevcut Durum:** Büyük ölçüde tamamlanmış. Küçük CSS düzeltmeleri:
1. `.mgps-tech-feat` border-left kaldırılıp, sol tarafta tonal shift ile değiştirilecek (DESIGN.md No-Line Rule)
2. Gölgeler tinted yapılacak

**İçerik:** ✅ Doğru (katalog s.2-3 verileri)
**Layout:** ✅ Doğru (2 sütun + 3x3 grid + 4 ikon)
**İkonlar:** ✅ Doğru (PNG dosyaları mevcut)

---

### Görev 2: Neden MG PS PPF?

**Shortcode:** `[mgps_ppf_why]` | **Arka plan:** Açık Gri #F8F9FA

**Layout:** 3x2 Grid (6 kutu)
**Her kutuda:** SVG ikon + başlık + kısa açıklama
**Hover:** Kart 4px yukarı + gölge belirginleşme (transition 0.3s)

**İçerik (katalog s.8 referanslı):**

| # | Başlık | Açıklama | İkon Konsepti |
|---|--------|----------|---------------|
| 1 | Üst Düzey Hammadde Kalitesi | Bayer ve Lubrizol TPU hammaddesiyle üretilen filmler, endüstriyel seviyede dayanıklılık sunar. | Elmas/kalkan |
| 2 | Akıllı Kendini İyileştirme | Self-healing topcoat teknolojisi sayesinde mikro çizikler ısı ile saniyeler içinde kaybolur. | Yenileme/döngü |
| 3 | Uzun Ömürlü Dayanım | 10 yıla varan garanti süresiyle uzun vadeli yatırım güvencesi. | Saat/takvim |
| 4 | Yüksek Parlaklık | %98'i aşan optik netlik değerleriyle boyanızın derinliğini ve canlılığını artırır. | Parıltı/yıldız |
| 5 | Gelişmiş Hidrofobik Yüzey | Su ve leke itici yüzey teknolojisi, temizliği kolaylaştırır ve yüzeyi korur. | Su damlası |
| 6 | Kolay Uygulama | Hava kanallı yapıştırıcı teknolojisi ile hızlı, kabarcıksız ve profesyonel uygulama. | Araç/uygulama |

**SVG İkonlar:** Her biri 40x40px, stroke-only, `currentColor` kullanarak tema uyumlu. Accent renk (#E60049) ile.

---

### Görev 3: Ürün Grupları (4 Alt Bölüm)

**Shortcode:** `[mgps_ppf_products]` | **Arka plan:** Beyaz

#### 3A. Parlak PPF Grubu

**Başlık:** "PARLAK PPF GRUBU"
**Alt Başlık:** "Göz Alıcı Derinlik, Maksimum Koruma"
**Açıklama:** "Boyanızın orijinal parlaklığını bir üst seviyeye taşıyın. MG PS PPF Parlak Seri; 170 ile 190 mikron arasındaki kalınlıkları, 10 yıla varan dayanımı ve ultra parlak yapısıyla aracınıza cam gibi bir derinlik kazandırır."

**Layout:** 3 sütun grid (desktop), 2 sütun (tablet), 1 sütun veya carousel (mobil)

**5 Ürün Kartı:**

| Ürün | Kalınlık | Dayanım | Parlaklık | Su İticilik | Leke Tutmama | Kendini Yenileme |
|------|----------|---------|-----------|-------------|--------------|------------------|
| PROTECTA PHILIC | 170 μm | 4 sene | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| FORTIFIED PHILIC | 190 μm | 4 sene | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| EXPAND PHOBIC | 190 μm | 5 sene | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| EXALTED PHOBIC | 190 μm | 8 sene | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| REINFORCED PHOBIC | 190 μm | 10 sene | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ |

**Kart Yapısı:**
- Üst: Placeholder görsel alanı (aspect-ratio: 4/3, koyu gradient arka plan)
- MG|PS logo badge (sağ üst, 32x32px)
- Ürün adı (ethnocentric font, uppercase)
- "MG PS PPF SERİSİ" alt yazı
- Ayırıcı: İnce gradient çizgi (accent)
- 6 özellik satırı: Etiket (sol) + Değer/Yıldız (sağ)
- Her satır arasında 8px gap

#### 3B. Mat PPF Grubu

**Başlık:** "MAT PPF GRUBU"
**Alt Başlık:** "Agresif, Asil ve Yenilmez"
**Açıklama:** "Aracınızın hatlarını ortaya çıkaran premium 'Satin Mat' bitiş..."
**Renk Aksanı:** Cyan/turkuaz (#00BCD4)

**Layout:** Asimetrik — Sol büyük görsel (50%) + Sağ özellik paneli (50%)

**Ürün: SATINATO PHOBIC**

| Özellik | Değer |
|---------|-------|
| Kalınlık | 190 μm |
| Dayanım | 8 sene |
| Parlaklık | ★☆☆☆☆ (1/5) |
| Su İticilik | ★★★★★ (5/5) |
| Leke Tutmama | ★★★★☆ (4/5) |
| Kendini Yenileme | ★★★★★ (5/5) |

#### 3C. Renkli PPF Grubu

**Başlık:** "RENKLİ PPF GRUBU"
**Alt Başlık:** "Sınırları Aşan Renkler, Gerçek PPF Koruması"
**Açıklama:** "Folyo kaplamanın zayıf koruma dönemine son. 150'den fazla özel renk seçeneğiyle aracınızın görünümünü tamamen değiştirirken, 190 mikronluk gerçek poliüretan (TPU) korumasından ödün vermeyin."
**Renk Aksanı:** Sarı/altın (#F5B82E)

**Layout:** Asimetrik — Sol büyük görsel (50%) + Sağ özellik paneli (50%)

**Ürün: COLOR PHOBIC**

| Özellik | Değer |
|---------|-------|
| Kalınlık | 190 μm |
| Dayanım | 5 sene |
| Parlaklık | ★★★★★ (5/5) |
| Su İticilik | ★★★★★ (5/5) |
| Leke Tutmama | ★★★★★ (5/5) |
| Kendini Yenileme | ★★★★★ (5/5) |

**Alt kısım:** 12 renk yuvarlağı (CSS ile) + "+150 farklı renk seçeneği" ibaresi

#### 3D. Cam Filmi Grubu

**Başlık:** "CAM FİLMİ GRUBU"
**Alt Başlık:** "Konforunuzu Bir Üst Seviyeye Taşıyın"
**Açıklama:** "MG PS Cam filmleri; 3 farklı ürün serisi, optik netliği, yüksek güneş enerjisi ve ısı reddi, %99'a varan UV koruması ve parlama azaltma özellikleri ile araç camlarında 10 yıla varan dayanım sunar."
**Renk Aksanı:** Turuncu (#FF8C00)

**Layout:** Asimetrik — Sol büyük görsel (50%) + Sağ tablo (50%)

**4 Seri Karşılaştırma Tablosu:**

| Ürün | Ürün Özellikleri | Kalınlık | VLT | IRR | UVR | TSER (MAX) |
|------|-----------------|----------|-----|-----|-----|------------|
| COMFORT SERİSİ | Metalized | 2 Mil | 25-35-58 | 30 | 99 | 48 |
| BRIGHT SERİSİ | Chip Dyed Metalized | 2 Mil | 20-30-47 | 30 | 99 | 54 |
| MAGNUM SERİSİ | Nano Ceramic | 2 Mil | 20-30-50 | 90 | 99 | 64 |
| MAGNUM SKY SERİSİ | Nano Ceramic | 1.5 Mil | 74 | 90 | 99 | 58 |

---

### Görev 4: Karşılaştırma Tablosu

**Shortcode:** `[mgps_ppf_compare]` | **Arka plan:** Koyu #111316

**Layout:** Modern tablo, sadece border-bottom, dikey çizgi yok
**Hover:** Satır rgba(255,255,255,0.05) aydınlatma
**Mobil:** Yatay scroll (overflow-x)

**Sütunlar:** Ürün Adı | Kalınlık | Dayanım | Parlaklık | Su İticilik | Leke Tutmama | Kendini Yenileme

**Satırlar (Gerçek Veriler):**

| Ürün | Kalınlık | Dayanım | Parlaklık | Su İticilik | Leke Tutmama | Kendini Yenileme |
|------|----------|---------|-----------|-------------|--------------|------------------|
| PROTECTA PHILIC | 170 μm | 4 sene | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| FORTIFIED PHILIC | 190 μm | 4 sene | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| EXPAND PHOBIC | 190 μm | 5 sene | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| EXALTED PHOBIC | 190 μm | 8 sene | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★★ |
| REINFORCED PHOBIC | 190 μm | 10 sene | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ |
| SATINATO PHOBIC | 190 μm | 8 sene | ★☆☆☆☆ | ★★★★★ | ★★★★☆ | ★★★★★ |

---

### Görev 5: Uygulama Galerisi

**Shortcode:** `[mgps_ppf_gallery]` | **Arka plan:** Beyaz

**Layout:** Sol 1 büyük görsel (60%) + Sağ 2x2 thumbnail grid (40%)
**Toplam:** 5 görsel (1 büyük + 4 küçük)
**Etkileşim:** Thumbnail tıklayınca büyük görsel değişir (fade transition 0.4s)
**Placeholder:** Koyu gradient arka planlı kutular (sonra gerçek görseller eklenecek)

---

### Görev 6: Garanti ve Sertifikalar

**Shortcode:** `[mgps_ppf_warranty]` | **Arka plan:** Açık Gri #F8F9FA

**Başlık:** "GARANTİ VE KAYIT SİSTEMİ"
**Alt Başlık:** "Güvenilir, Şeffaf ve Dijital Koruma"

**Layout:** 2 Sütun
- **Sol Sütun:** Metin içerik
  - Orijinallik Garantisi: Fiziksel Garanti Broşürü ve Garanti Kartı
  - Dijital Takip: QR kodu veya seri numarası ile online garanti aktivasyonu
  - Sadece yetkili ve sertifikalı merkezlerde geçerlidir
- **Sağ Sütun:** Warranty Card ve QR Kod görseli (placeholder)

**Alt Bant:** SGS, TÜV, ROHS, REACH sertifika logoları (grayscale, hover renkli)

---

### Görev 7: Sıkça Sorulan Sorular

**Shortcode:** `[mgps_ppf_faq]` | **Arka plan:** Beyaz

**Layout:** Accordion, +/- ikon, smooth açılış (max-height transition)

**Sorular ve Cevaplar:**

1. **PPF kaplama aracımın boyasına zarar verir mi?**
   Hayır, aksine aracınızın orijinal boyasını dış etkenlerden korur. Söküldüğünde boyaya zarar vermez ve kalıntı bırakmaz.

2. **Kendini yenileme (Self-healing) özelliği nasıl çalışır?**
   Akıllı Topcoat yapımız sayesinde yüzeydeki mikro çizikler, güneş ısısı veya sıcak su teması ile saniyeler içinde kendiliğinden kaybolur.

3. **Seramik kaplama ile PPF arasındaki fark nedir?**
   Seramik kaplama sadece parlaklık ve su iticilik sağlarken, PPF fiziksel bir zırh görevi görerek taş sekmeleri, derin çizikler ve sürtmelere karşı gerçek koruma sağlar.

4. **Mat PPF aracımın orijinal rengini değiştirir mi?**
   Satinato Phobic serimiz aracınızın orijinal rengini değiştirmez, sadece yüzeyine asil ve premium bir "Satin Mat" görünüm kazandırır.

5. **Garanti süresi neleri kapsar?**
   Garantimiz sararma, çatlama, kabarma ve üretim hatalarına karşı koruma sağlar. Garanti süresi ürüne göre 4 ile 10 yıl arasında değişmektedir.

---

### Görev 8: CTA / Teklif Formu

**Shortcode:** `[mgps_ppf_cta]` | **Arka plan:** Koyu #111316

**Başlık:** "ARACINIZ İÇİN EN İYİ KORUMAYI SEÇİN"
**Alt başlık:** "Profesyonel ekibimizden fiyat teklifi alın."

**Form Layout:** 2 Sütunlu
- Satır 1: İsim Soyisim (sol) + Telefon (sağ)
- Satır 2: Email (full-width)
- Satır 3: Mesaj (full-width, textarea)
- **"Konu" alanı KESİNLİKLE YOK.** Sadece 4 alan.

**Input Stili:** Koyu arka plana uygun, sadece alt çizgili (underline-only), focus'ta accent renk (#E60049) 2px alt çizgi
**Buton:** "TEKLİF AL" — kırmızı/pembe gradient, hover glow efekti
**Not:** Sadece frontend; backend entegrasyonu sonradan bağlanacak

---

## BÖLÜM C: UYGULAMA SIRASI VE ÖNCELİK

| Sıra | Görev | Öncelik | Bağımlılık |
|------|-------|---------|------------|
| 1 | Görev 0: Plugin İskeleti Güncelleme | Yüksek | Yok |
| 2 | Görev 1: Tech Section Düzeltme | Düşük | Görev 0 |
| 3 | Görev 2: Neden MG PS PPF | Orta | Görev 0 |
| 4 | Görev 3A: Parlak PPF Grubu | Yüksek | Görev 0 |
| 5 | Görev 3B: Mat PPF Grubu | Orta | Görev 3A |
| 6 | Görev 3C: Renkli PPF Grubu | Orta | Görev 3A |
| 7 | Görev 3D: Cam Filmi Grubu | Orta | Görev 3A |
| 8 | Görev 4: Karşılaştırma Tablosu | Orta | Görev 0 |
| 9 | Görev 5: Galeri | Düşük | Görev 0 |
| 10 | Görev 6: Garanti | Düşük | Görev 0 |
| 11 | Görev 7: SSS | Düşük | Görev 0 |
| 12 | Görev 8: CTA Formu | Yüksek | Görev 0 |

---

## BÖLÜM D: SAYFA AKIŞI (FİNAL)

```
┌─────────────────────────────────────────────┐
│  HERO SLIDER (MEVCUT — Dokunulmayacak)      │
├─────────────────────────────────────────────┤
│  3D OBJECT VIEWER (MEVCUT — Dokunulmayacak) │
├─────────────────────────────────────────────┤
│  [mgps_ppf_tech]     — Beyaz arka plan      │
├─────────────────────────────────────────────┤
│  [mgps_ppf_why]      — Açık Gri arka plan   │
├─────────────────────────────────────────────┤
│  [mgps_ppf_products] — Beyaz arka plan      │
│    ├── Parlak PPF (3 sütun grid)            │
│    ├── Mat PPF (asimetrik)                  │
│    ├── Renkli PPF (asimetrik)               │
│    └── Cam Filmi (asimetrik + tablo)        │
├─────────────────────────────────────────────┤
│  [mgps_ppf_compare]  — Koyu arka plan       │
├─────────────────────────────────────────────┤
│  [mgps_ppf_gallery]  — Beyaz arka plan      │
├─────────────────────────────────────────────┤
│  [mgps_ppf_warranty] — Açık Gri arka plan   │
├─────────────────────────────────────────────┤
│  [mgps_ppf_faq]      — Beyaz arka plan      │
├─────────────────────────────────────────────┤
│  [mgps_ppf_cta]      — Koyu arka plan       │
├─────────────────────────────────────────────┤
│  BÜLTEN + FOOTER (MEVCUT)                   │
└─────────────────────────────────────────────┘
```

---

## BÖLÜM E: KRİTİK KONTROL LİSTESİ

- [ ] Font import: Space Grotesk + Manrope (Montserrat çıkarılacak)
- [ ] CSS değişkeni: `--mgps-dark` → #111316
- [ ] CSS değişkeni: `--mgps-font-body` → Manrope
- [ ] Tech section: border-left kaldırılacak
- [ ] CTA formunda "Konu" alanı YOK
- [ ] SSS cevapları yazılmış durumda
- [ ] Galeri: 5 görsel (8 değil)
- [ ] Garanti: 2 sütun layout (yatay bant değil)
- [ ] Satinato dayanım: 8 sene (4 değil)
- [ ] Tüm yıldız sayıları katalogdan doğrulanmış
- [ ] Cam Filmi: 4 seri (Comfort, Bright, Magnum, Magnum Sky) — GERÇEK ÜRÜNLER
- [ ] No-Line Rule: Border yerine tonal layering
- [ ] Gölgeler: Tinted (siyah değil)
- [ ] WCAG AA kontrast oranları sağlanmış
