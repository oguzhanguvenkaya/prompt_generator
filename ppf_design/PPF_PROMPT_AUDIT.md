# PPF Premium Sayfa Promptu - Uyumsuzluk ve Hata Raporu

Bu rapor, mevcut geliştirici promptunu (pasted_content_3.txt) ana plan (PPF_PAGE_SKELETON.md) ve katalog verileri (catalog_data.md) ile satır satır karşılaştırarak hazırlanmıştır.

---

## SORUN 1: Ürün Kartlarında Eksik Özellikler (KRİTİK)

**Prompt'ta (Bölüm 3A - Parlak PPF Grubu):**
> "Kartlarda Kalınlık (170-190μm) ve Dayanım (4-10 Yıl) bilgileri bulunsun."

**Ana Planda ve Katalogda:** Her ürün kartında **6 özellik** bulunması gerekiyor: Kalınlık, Dayanım, Parlaklık (yıldız), Su İticilik (yıldız), Leke Tutmama (yıldız), Kendini Yenileme (yıldız). Prompt sadece Kalınlık ve Dayanım diyor, diğer 4 özelliği atlamış.

**Düzeltme:** Parlak PPF kartlarında tüm 6 özellik ve yıldız derecelendirmeleri açıkça belirtilmeli. Her ürünün gerçek yıldız sayıları katalogdan alınmalı.

---

## SORUN 2: Ürün Kartlarında Gerçek Veriler Eksik (KRİTİK)

**Prompt'ta:** Ürün kartları için spesifik veri yok. Sadece "Kalınlık (170-190μm)" gibi genel aralık verilmiş.

**Katalogdaki Gerçek Veriler:**

| Ürün | Kalınlık | Dayanım | Parlaklık | Su İticilik | Leke Tutmama | Kendini Yenileme |
|------|----------|---------|-----------|-------------|--------------|------------------|
| Protecta Philic | 170 μm | 4 sene | 4/5 | 3/5 | 4/5 | 4/5 |
| Fortified Philic | 190 μm | 4 sene | 4/5 | 3/5 | 4/5 | 4/5 |
| Expand Phobic | 190 μm | 5 sene | 5/5 | 5/5 | 4/5 | 5/5 |
| Exalted Phobic | 190 μm | 8 sene | 5/5 | 5/5 | 4/5 | 5/5 |
| Reinforced Phobic | 190 μm | 10 sene | 5/5 | 5/5 | 5/5 | 5/5 |

**Düzeltme:** Prompt'a bu tablonun tamamı eklenmeli. AI'nın uydurma veri kullanmasını engellemek için her ürünün gerçek değerleri açıkça yazılmalı.

---

## SORUN 3: Mat PPF (Satinato) Detayları Eksik (ORTA)

**Prompt'ta (Bölüm 3B):**
> "Asimetrik Layout: Sol taraf büyük görsel, sağ taraf ürün detayları (Satinato Phobic)."

**Katalogda:** Satinato Phobic'in 6 özelliği var: Kalınlık 190μm, Dayanım 8 sene, Parlaklık 1/5 (mat!), Su İticilik 5/5, Leke Tutmama 4/5, Kendini Yenileme 5/5. Ayrıca açıklama metni var.

**Düzeltme:** Satinato'nun tüm 6 özelliği, yıldız derecelendirmeleri ve açıklama metni prompt'a eklenmeli.

---

## SORUN 4: Color Phobic Detayları Eksik (ORTA)

**Prompt'ta (Bölüm 3C):**
> "Asimetrik Layout. Color Phobic ürünü. Altında CSS ile yapılmış renk paleti yuvarlakları (+150 Renk Seçeneği ibaresi)."

**Katalogda:** Color Phobic'in 6 özelliği var: Kalınlık 190μm, Dayanım 5 sene, Parlaklık 5/5, Su İticilik 5/5, Leke Tutmama 5/5, Kendini Yenileme 5/5. Ayrıca açıklama metni ve renk örnekleri var.

**Düzeltme:** Tüm özellikler ve açıklama metni eklenmeli.

---

## SORUN 5: Comfort Serisi Detayları Yetersiz (ORTA)

**Prompt'ta (Bölüm 3D):**
> "Özellikler: 2 Mil Kalınlık, VLT 25-35-58, %99 UV Koruması."

**Katalogda:** Comfort Serisi'nin 5 özelliği var: Kalınlık (2 Mil), VLT (25-35-58), IRR (30), UVR (99), TSER MAX (48). Prompt'ta IRR ve TSER eksik.

**Düzeltme:** Tüm 5 özellik (Kalınlık, VLT, IRR, UVR, TSER) prompt'a eklenmeli.

---

## SORUN 6: Karşılaştırma Tablosunda Gerçek Veriler Yok (KRİTİK)

**Prompt'ta (Bölüm 4):**
> "Ürünler (Satırlar): Protecta, Fortified, Expand, Exalted, Reinforced, Satinato."
> "Sütunlar: Ürün Adı, Kalınlık, Dayanım, Parlaklık (Yıldız), Su İticilik (Yıldız), Leke Tutmama (Yıldız), Kendini Yenileme (Yıldız)."

**Sorun:** Sütunlar ve satırlar doğru ama gerçek değerler verilmemiş. AI kendi kafasından yıldız sayıları uyduracak.

**Düzeltme:** Tablonun tam verisi (her ürünün her özelliği için kaç yıldız olduğu) prompt'a eklenmeli.

---

## SORUN 7: Neden MG PS PPF Açıklama Metinleri Kısa (DÜŞÜK)

**Prompt'ta (Bölüm 2):**
> "Üst Düzey Hammadde Kalitesi (Bayer ve Lubrizol TPU)"

**Katalogda:** Her madde için detaylı açıklama var. Örneğin: "Bayer ve Lubrizol gibi dünya liderlerinden temin edilen TPU hammaddeleri ile üretilmektedir."

**Düzeltme:** Katalogdaki açıklama metinleri prompt'a eklenmeli, böylece AI daha zengin içerik üretir.

---

## SORUN 8: Teknoloji Bölümünde Katalog Bilgileri Eksik (DÜŞÜK)

**Prompt'ta (Bölüm 1):** 4 özellik listelenmiş.

**Katalogda:** Ek bilgiler var: Inline Co-Extrusion Teknolojisi, tam otomatik üretim hatları, patentli teknolojiler, çok aşamalı kalite kontrol süreçleri (QC).

**Düzeltme:** Bu ek bilgiler de prompt'a eklenmeli.

---

## SORUN 9: SSS Cevapları Yok (ORTA)

**Prompt'ta (Bölüm 7):** Sadece 5 soru var, cevapları yok.

**Sorun:** AI kendi kafasından cevap uyduracak. Bazı teknik bilgiler yanlış olabilir.

**Düzeltme:** Her sorunun örnek cevabı da prompt'a eklenmeli.

---

## SORUN 10: CTA Formunda "Konu" Alanı Fazla (DÜŞÜK)

**Prompt'ta (Bölüm 8):**
> "Form Layout: 2 Sütunlu. (İsim, Telefon yan yana; Email, Konu yan yana; Mesaj tam genişlik)."

**Kullanıcının İstediği:** "isim soyisim, email telefon ve mesaj kutusu olan bir alan"

**Sorun:** Kullanıcı "Konu" alanı istememiş, prompt'ta "Konu" var.

**Düzeltme:** "Konu" alanı kaldırılmalı. Form: İsim Soyisim, Email, Telefon, Mesaj.

---

## SORUN 11: Renk Sayısı Belirsiz (DÜŞÜK)

**Prompt'ta:** 6 farklı renk kullanılmış: #FFFFFF, #F8F9FA, #0A0C10, #1A1A1A, #E60049/#FF4D79, #FFD700.

**Kullanıcının İstediği:** "en az 3 renk olsun 6'dan fazla renk olmasın"

**Durum:** Teknik olarak 6 renk sınırında. Ancak #F8F9FA ve #FFFFFF çok yakın, #1A1A1A da metin rengi olarak sayılabilir. Vurgu gradient 2 renk (#E60049 + #FF4D79). Bu belirsizlik sorun yaratabilir.

**Düzeltme:** Ana renk paletini net 4-5 renk olarak tanımla ve "bu renkler dışında renk kullanma" diye vurgula.

---

## SORUN 12: Ürün Grupları İçin Açıklama Metinleri Eksik (ORTA)

**Prompt'ta:** Parlak PPF Grubu için açıklama metni yok.

**Katalogda:** "Boyanızın orijinal parlaklığını bir üst seviyeye taşıyın. MG PS PPF Parlak Seri; 170 ile 190 mikron arasındaki kalınlıkları, 10 yıla varan dayanımı ve ultra parlak yapısıyla aracınıza cam gibi bir derinlik kazandırır."

**Düzeltme:** Her ürün grubunun katalogdaki açıklama metni prompt'a eklenmeli.

---

## SORUN 13: Teknik Gereksinimler - Placeholder Görseller (UYARI)

**Prompt'ta:**
> "Görseller için https://via.placeholder.com/ kullan"

**Sorun:** via.placeholder.com bazen yavaş veya erişilemez olabiliyor. Ayrıca premium bir tasarımda placeholder görseller kötü görünüyor.

**Öneri:** Placeholder yerine gradient arka planlı div'ler veya CSS ile stilize edilmiş boş alanlar kullanılması daha iyi olabilir. Ya da "Görsel alanlarını boş bırak, sadece boyut ve konum belirle" talimatı verilebilir.

---

## ÖZET TABLO

| Sorun No | Seviye | Konu | Durum |
|----------|--------|------|-------|
| 1 | KRİTİK | Parlak PPF kartlarında 4/6 özellik eksik | Düzeltilmeli |
| 2 | KRİTİK | Ürün kartlarında gerçek veriler yok | Düzeltilmeli |
| 3 | ORTA | Satinato detayları eksik | Düzeltilmeli |
| 4 | ORTA | Color Phobic detayları eksik | Düzeltilmeli |
| 5 | ORTA | Comfort Serisi IRR ve TSER eksik | Düzeltilmeli |
| 6 | KRİTİK | Karşılaştırma tablosunda gerçek veriler yok | Düzeltilmeli |
| 7 | DÜŞÜK | Neden MG PS PPF açıklamaları kısa | İyileştirilebilir |
| 8 | DÜŞÜK | Teknoloji bölümünde ek bilgiler eksik | İyileştirilebilir |
| 9 | ORTA | SSS cevapları yok | Düzeltilmeli |
| 10 | DÜŞÜK | CTA formunda fazla "Konu" alanı | Düzeltilmeli |
| 11 | DÜŞÜK | Renk sayısı belirsiz | Netleştirilmeli |
| 12 | ORTA | Ürün grupları açıklama metinleri eksik | Düzeltilmeli |
| 13 | UYARI | Placeholder görseller premium hisse uygun değil | Değerlendirilebilir |
