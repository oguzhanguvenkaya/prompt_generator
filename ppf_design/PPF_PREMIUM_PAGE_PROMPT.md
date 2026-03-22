# MG PS PPF Premium Sayfa Tasarımı - Geliştirici Promptu

Aşağıdaki detaylı talimatları kullanarak, lüks bir Paint Protection Film (PPF) markası olan "MG PS PPF" için web sayfası bölümlerini oluştur. 

**ÖNEMLİ KISITLAMA:** Tam bir HTML sayfası OLUŞTURMA. Sadece `<main>` veya `<section>` etiketleri içindeki içerikleri üret. Header, Hero Slider, 3D Viewer ve Footer zaten mevcut, onlara dokunma. CSS'i `<style>` etiketiyle, JS'i `<script>` etiketiyle dahil et.

## 🎨 Tasarım Dili ve Renk Paleti
Bu ürün 1000$ değerinde premium bir üründür. Tasarım lüks, güvenilir ve teknolojik hissettirmelidir.
- **Ana Arka Plan**: `#FFFFFF` (Beyaz)
- **Alternatif Arka Plan**: `#F8F9FA` (Açık Gri)
- **Koyu Bölüm Arka Planı**: `#0A0C10` (Koyu Lacivert/Siyah)
- **Ana Metin**: `#1A1A1A` (Açık temada), `#FFFFFF` (Koyu temada)
- **Vurgu/CTA Rengi**: `linear-gradient(90deg, #E60049 0%, #FF4D79 100%)` (Kırmızı/Pembe gradient)
- **Yıldız Rengi**: `#FFD700` (Altın)
- **Tipografi**: Başlıklar için `Space Grotesk`, Gövde için `Manrope` (Google Fonts'tan import et).
- **Spacing**: Bölümler arası geniş boşluklar (min 80px-120px padding).

---

## 📐 Üretilecek Bölümler (Yukarıdan Aşağıya Sırayla)

### 1. Teknoloji ve Altyapı Bölümü
- **Arka plan**: Beyaz (`#FFFFFF`)
- **Başlık**: "ÜRETİM TEKNOLOJİSİ VE ALTYAPI" (Ortalanmış)
- **Alt Başlık**: "İhtiyaca Özel Üretim, Sıfır Toleranslı Kalite"
- **Layout**: 2 Sütun (Desktop: %50-%50)
- **Sol Sütun (Görsel)**: UPPF/XPEL tarzı katmanlı PPF yapısını gösteren CSS tabanlı veya SVG bir illüstrasyon oluştur. (Release Liner, Adhesive, TPU Base Film, Top Coating katmanları havada asılı gibi görünsün).
- **Sağ Sütun (Özellikler)**: 4 adet ikonlu özellik listesi:
  - HDI+Aliphatic TPU yapısı
  - %400'e varan esneme kapasitesi
  - 6.000 saati aşan UV direnci
  - -40°C ile 120°C ısı dayanımı

### 2. Neden MG PS PPF?
- **Arka plan**: Açık Gri (`#F8F9FA`)
- **Layout**: 3x2 Grid (6 kutu)
- Her kutuda minimalist, ince çizgili bir ikon, başlık ve kısa açıklama olmalı. Hover durumunda kart hafifçe yukarı kalkmalı ve gölge belirginleşmeli.
- **Maddeler**:
  1. Üst Düzey Hammadde Kalitesi (Bayer ve Lubrizol TPU)
  2. Akıllı Kendini İyileştirme (Self-Healing teknolojisi)
  3. Uzun Ömürlü Dayanım (10 yıla varan garanti)
  4. Yüksek Parlaklık ve Optik Netlik (%98+ parlaklık)
  5. Gelişmiş Hidrofobik Yüzey (Su ve leke itici)
  6. Kolay Uygulama (Hava kanallı yapıştırıcı)

### 3. Ürün Grupları (4 Ayrı Alt Bölüm)
- **Arka plan**: Beyaz (`#FFFFFF`)
- Her grup birbirinden yeterli boşlukla ayrılmalı.

**A. PARLAK PPF GRUBU**
- Başlık: "PARLAK PPF GRUBU" | Alt Başlık: "Göz Alıcı Derinlik, Maksimum Koruma"
- 3 Sütunlu Grid. 5 Ürün Kartı: Protecta Philic, Fortified Philic, Expand Phobic, Exalted Phobic, Reinforced Phobic.
- Kartlarda Kalınlık (170-190μm) ve Dayanım (4-10 Yıl) bilgileri bulunsun.

**B. MAT PPF GRUBU**
- Başlık: "MAT PPF GRUBU" | Alt Başlık: "Agresif, Asil ve Yenilmez"
- Asimetrik Layout: Sol taraf büyük görsel (Satin mat kaplı araç), sağ taraf ürün detayları (Satinato Phobic).

**C. RENKLİ PPF GRUBU**
- Başlık: "RENKLİ PPF GRUBU" | Alt Başlık: "Renklerin Gücü, Korumanın Estetiği"
- Asimetrik Layout. Color Phobic ürünü. Altında CSS ile yapılmış renk paleti yuvarlakları (+150 Renk Seçeneği ibaresi).

**D. COMFORT SERİSİ (Cam Filmi)**
- Başlık: "COMFORT SERİSİ" | Alt Başlık: "Konforunuzu Bir Üst Seviyeye Taşıyın"
- Özellikler: 2 Mil Kalınlık, VLT 25-35-58, %99 UV Koruması.

### 4. Karşılaştırma Tablosu
- **Arka plan**: Koyu (`#0A0C10`) - *Güçlü bir kontrast yaratmak için*
- **Tasarım**: Modern, lüks tablo. Sadece alt çizgiler (border-bottom) olsun, dikey çizgiler olmasın. Hover edilen satır hafifçe aydınlansın (`rgba(255,255,255,0.05)`).
- **Ürünler (Satırlar)**: Protecta, Fortified, Expand, Exalted, Reinforced, Satinato.
- **Sütunlar**: Ürün Adı, Kalınlık, Dayanım, Parlaklık (Yıldız), Su İticilik (Yıldız), Leke Tutmama (Yıldız), Kendini Yenileme (Yıldız).

### 5. Görsel Galeri
- **Arka plan**: Beyaz (`#FFFFFF`)
- **Başlık**: "UYGULAMA GALERİSİ"
- **Layout**: Asimetrik Grid (Sol: 1 Büyük Görsel, Sağ: 2x2 Grid halinde 4 Küçük Görsel).
- **Etkileşim**: Küçük görsele tıklandığında (veya hover edildiğinde) büyük görsel değişmeli. (Basit bir inline JS kullanabilirsin).

### 6. Garanti ve Sertifikalar
- **Arka plan**: Açık Gri (`#F8F9FA`)
- **Layout**: Yatay, dar bir bant.
- Sol taraf: "10 YIL GARANTİ - Güvenin Belgesi, Kalitenin İspatı"
- Sağ taraf: SGS, TÜV, ROHS, REACH metinleri/logoları (grayscale, minimalist).

### 7. Sıkça Sorulan Sorular (SSS)
- **Arka plan**: Beyaz (`#FFFFFF`)
- **Başlık**: "SIKÇA SORULAN SORULAR"
- **Tasarım**: Modern, temiz Accordion (Açılır-kapanır liste). Artı/Eksi ikonları kullan.
- **Sorular**:
  1. PPF kaplama aracımın boyasına zarar verir mi?
  2. Kendini yenileme (Self-healing) özelliği nasıl çalışır?
  3. Seramik kaplama ile PPF arasındaki fark nedir?
  4. Mat PPF aracımın orijinal rengini değiştirir mi?
  5. Garanti süresi neleri kapsar?

### 8. CTA / Teklif Formu
- **Arka plan**: Koyu (`#0A0C10`)
- **Başlık**: "ARACINIZ İÇİN EN İYİ KORUMAYI SEÇİN" (Beyaz)
- **Alt Başlık**: "Profesyonel ekibimizden fiyat teklifi alın." (Açık Gri)
- **Form Layout**: 2 Sütunlu. (İsim, Telefon yan yana; Email, Konu yan yana; Mesaj tam genişlik).
- **İnput Stili**: Koyu arka plana uygun, sadece alt çizgisi olan (material design tarzı) veya koyu gri arka planlı, bordersız lüks inputlar. Focus olunca kırmızı/pembe vurgu rengi.
- **Buton**: "TEKLİF AL" (Geniş, kırmızı/pembe gradient arka planlı, hoverda glow efekti).

---

## 🛠️ Teknik Gereksinimler
1. Sadece HTML, CSS ve (gerekirse) vanilla JS kullan.
2. Tüm CSS `<style>` etiketi içinde olmalı.
3. Tüm JS `<script>` etiketi içinde olmalı.
4. CSS'te BEM metodolojisi veya temiz class isimlendirmesi kullan (`.mg-ppf-tech`, `.mg-ppf-faq` vb.)
5. Responsive olmalı: Tüm grid ve asimetrik yapılar mobilde (max-width: 768px) %100 genişliğe (tek sütun) düşmeli.
6. İkonlar için SVG kullan veya CSS ile çiz, dışarıdan font-awesome vs. çağırma (sayfa hızını etkilememek için).
7. Görseller için `https://via.placeholder.com/` kullan, ancak boyutları ve renkleri premium hissettirecek şekilde ayarla (örn: `https://via.placeholder.com/800x600/1A1A1A/FFFFFF?text=Premium+PPF`).

Bu talimatlara harfiyen uyarak, tam olarak istenen bölümleri içeren yüksek kaliteli bir kod bloğu üret.
