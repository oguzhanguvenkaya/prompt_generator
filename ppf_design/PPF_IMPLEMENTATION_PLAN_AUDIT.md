# PPF Uygulama Planı - Uyumsuzluk ve Hata Raporu

Bu rapor, uygulama planını (pasted_content_4.txt) düzeltilmiş prompt (V2), sayfa iskeleti ve katalog verileriyle satır satır karşılaştırarak hazırlanmıştır.

---

## SORUN 1: CTA Formunda "Konu" Alanı Hala Var (V2'de Düzeltilmişti)

**Uygulama Planında (Görev 8, Satır 193):**
> "Form: 2 sütunlu (İsim+Telefon | Email+Konu | Mesaj full-width)"

**V2 Prompt'ta (Düzeltilmiş):**
> "Form Layout: 2 Sütunlu. (İsim Soyisim ve Telefon yan yana; Email ve Mesaj alt alta)."

**Kullanıcının Orijinal İsteği:**
> "isim soyisim, email telefon ve mesaj kutusu olan bir alan"

**Sorun:** Kullanıcı "Konu" alanı istemedi. V2 prompt'ta düzeltilmişti ama uygulama planı eski prompt'tan (V1) alınmış, güncellenmemiş.

**Düzeltme:** `Email+Konu` yerine sadece `Email` olmalı. Form alanları: İsim Soyisim, Telefon, Email, Mesaj.

---

## SORUN 2: Comfort Serisi Başlığı Değiştirilmiş (TUTARSIZLIK)

**Uygulama Planında (Görev 3D, Satır 137):**
> Başlık: "CAM FİLMİ GRUBU"

**V2 Prompt'ta ve İskelette:**
> Başlık: "COMFORT SERİSİ"

**Kullanıcının Orijinal İsteği:**
> "Comfort seriside bu sayfada olmalı"

**Sorun:** Uygulama planı başlığı "CAM FİLMİ GRUBU" olarak değiştirmiş. Ancak marka tutarlılığı açısından katalogdaki ve tüm diğer dokümanlardaki isim "COMFORT SERİSİ" şeklinde. Alt başlıkta "Cam Filmi" belirtilebilir ama ana başlık "COMFORT SERİSİ" olmalı.

**Düzeltme:** Başlık "COMFORT SERİSİ" olarak kalmalı, alt başlık "Cam Filmi | Konforunuzu Bir Üst Seviyeye Taşıyın" şeklinde olabilir.

---

## SORUN 3: Comfort Serisine Yeni Ürünler Eklenmiş - Katalogda Yok (KRİTİK)

**Uygulama Planında (Görev 3D, Satır 139-140):**
> "Seriler: Comfort (Metalized), Bright (Chip Dyed), Magnum (Nano Ceramic), Magnum Sky (Nano Ceramic 1.5 Mil)"

**Katalogda (Sayfa 7):**
> Sadece 1 ürün: COMFORT SERİSİ - Metalized, 2 Mil. Özellikler: VLT 25-35-58, IRR 30, UVR 99, TSER(MAX) 48.

**V2 Prompt'ta:**
> Sadece 1 ürün: Comfort Serisi. Özellikler: Kalınlık 2 Mil, VLT 25-35-58, IRR 30, UVR 99, TSER(MAX) 48.

**Sorun:** Uygulama planı, katalogda olmayan 3 ürün eklemiş: **Bright (Chip Dyed)**, **Magnum (Nano Ceramic)**, **Magnum Sky (Nano Ceramic 1.5 Mil)**. Bu ürünler PDF katalogda, kullanıcının paylaştığı görsellerde veya herhangi bir kaynakta geçmiyor. AI'nın uydurduğu (hallucination) veriler olma ihtimali çok yüksek.

**Düzeltme:** Bu 3 ürün kaldırılmalı. Sadece katalogdaki Comfort Serisi (Metalized, 2 Mil) kalmalı. Eğer gerçekten bu ürünler varsa, kullanıcıdan onay alınmalı.

---

## SORUN 4: Comfort Serisi Sütunları Değiştirilmiş (TUTARSIZLIK)

**Uygulama Planında (Görev 3D, Satır 141):**
> "Sütunlar: Ürün Özellikleri, Kalınlık, VLT, IRR, UVR, TSER(MAX)"

**Katalogda ve V2 Prompt'ta:**
> Özellikler düz liste: Kalınlık 2 Mil, VLT 25-35-58, IRR 30, UVR 99, TSER(MAX) 48.

**Sorun:** Uygulama planı, Comfort Serisi için bir "karşılaştırma tablosu" formatı önermiş (4 seri x 6 sütun). Ancak katalogda sadece 1 ürün var, tablo gereksiz. Asimetrik layout (sol görsel, sağ özellikler) yeterli.

**Düzeltme:** Comfort Serisi, diğer tek ürünlü gruplar gibi (Mat, Renkli) asimetrik layout ile sunulmalı, tablo formatı değil.

---

## SORUN 5: Mat PPF Grubu İçin Renk Aksanı Eklemiş (UYARI)

**Uygulama Planında (Görev 3B, Satır 128):**
> "Renk aksanı: Cyan/turkuaz (#00BCD4)"

**V2 Prompt'ta ve Renk Paletinde:**
> Sadece 5 renk: #FFFFFF, #0A0C10, #F8F9FA, #1A1A1A, #E60049. Başka renk yok.

**Kullanıcının İsteği:**
> "en az 3 renk olsun 6'dan fazla renk olmasın"

**Sorun:** Uygulama planı, tanımlı 5 renk paletinin dışında yeni bir renk (#00BCD4 Cyan) eklemiş. Bu renk sınırını aşıyor.

**Düzeltme:** #00BCD4 kaldırılmalı. Mat PPF bölümü mevcut renk paleti içinde kalmalı.

---

## SORUN 6: Renkli PPF Grubu İçin Renk Aksanı Eklemiş (UYARI)

**Uygulama Planında (Görev 3C, Satır 134):**
> "Renk aksanı: Sarı/altın (#F5B82E)"

**V2 Prompt'ta:**
> Sadece 5 tanımlı renk. Yıldızlar için #FFD700 (altın) var ama #F5B82E farklı bir renk.

**Sorun:** Yine renk paleti dışında yeni bir renk. Eğer altın tonu isteniyorsa zaten yıldız rengi (#FFD700) kullanılabilir.

**Düzeltme:** #F5B82E yerine mevcut yıldız rengi #FFD700 kullanılabilir veya tamamen kaldırılmalı.

---

## SORUN 7: Ürün Kartlarında Gerçek Veriler Hala Eksik (KRİTİK)

**Uygulama Planında (Görev 3A, Satır 121):**
> "5 ürün: Protecta, Fortified, Expand, Exalted, Reinforced"

**V2 Prompt'ta:** Her ürünün 6 özelliği ve yıldız sayıları tek tek yazılmıştı.

**Sorun:** Uygulama planı sadece ürün isimlerini listelemiş, her ürünün gerçek verilerini (kalınlık, dayanım, yıldız sayıları) yazmamış. Geliştirici bu planı takip ederse verileri nereden alacağını bilemez.

**Düzeltme:** Her ürünün tam verileri uygulama planına eklenmeli veya "V2 prompt'taki verileri kullan" şeklinde açık referans verilmeli.

---

## SORUN 8: Karşılaştırma Tablosunda Gerçek Veriler Hala Eksik (KRİTİK)

**Uygulama Planında (Görev 4, Satır 150-151):**
> "Satırlar: Protecta, Fortified, Expand, Exalted, Reinforced, Satinato (6 ürün)"
> "Sütunlar: Ürün Adı, Kalınlık, Dayanım, Parlaklık★, Su İticilik★, Leke Tutmama★, Kendini Yenileme★"

**V2 Prompt'ta:** Her ürünün her sütundaki gerçek değeri (kaç yıldız, kaç μm, kaç sene) tek tek yazılmıştı.

**Sorun:** Uygulama planı sadece sütun ve satır başlıklarını vermiş, gerçek verileri yazmamış.

**Düzeltme:** Tablo verileri eklenmeli veya V2 prompt'a referans verilmeli.

---

## SORUN 9: SSS Cevapları Yine Eksik (ORTA)

**Uygulama Planında (Görev 7, Satır 184):**
> "Cevaplar: Katalogdan ve dokümandan derlenecek"

**V2 Prompt'ta:** Her sorunun cevabı detaylı olarak yazılmıştı.

**Sorun:** Uygulama planı cevapları "derlenecek" diye bırakmış. Geliştirici ne yazacağını bilemez.

**Düzeltme:** V2 prompt'taki cevaplar uygulama planına da eklenmeli.

---

## SORUN 10: Teknoloji Bölümünde Teknik Spec Grid Eklemiş (İYİ AMA ONAY GEREKLİ)

**Uygulama Planında (Görev 1, Satır 91-92):**
> "Teknik Spec Grid (katalog s.3): 3x3 kutular (Film Kalınlıkları, Gerdirme Dayanımı, Isı Dayanımı, Film Ölçüleri, Parlaklık, Kimyasal Test, Garanti, TPU, UV Testi)"

**V2 Prompt'ta:** Bu grid yoktu. Sadece 4 ikonlu özellik listesi vardı.

**Sorun:** Bu ekleme aslında iyi bir fikir (katalog sayfa 3'teki 3x3 grid). Ancak V2 prompt'ta ve iskelette tanımlı değildi. Bölümü çok uzatabilir.

**Değerlendirme:** Kullanıcıya sorulmalı. Eğer isteniyorsa V2 prompt'a da eklenmeli.

---

## SORUN 11: Parlak PPF Grubu Mobilde Carousel Önerilmiş (İYİ AMA ONAY GEREKLİ)

**Uygulama Planında (Görev 3A, Satır 122):**
> "Mobilde: Carousel (mevcut gibi)"

**V2 Prompt'ta:**
> "Responsive olmalı: Tüm grid ve asimetrik yapılar mobilde tek sütun düşmeli."

**Sorun:** V2 prompt'ta mobilde tek sütun denmiş, carousel denilmemiş. Carousel ekstra JS gerektirir. Ancak 5 ürün kartı mobilde tek sütunda çok uzun olabilir, carousel daha iyi bir UX sunabilir.

**Değerlendirme:** Carousel iyi bir fikir ama V2 prompt ile tutarsız. Karar verilmeli.

---

## SORUN 12: Galeri Placeholder Sayısı Tutarsız (DÜŞÜK)

**Uygulama Planında (Görev 5, Satır 161):**
> "Placeholder görseller (8 adet farklı boyutta)"

**V2 Prompt'ta:**
> "Sol: 1 Büyük Görsel, Sağ: 2x2 Grid halinde 4 Küçük Görsel" (Toplam 5 görsel)

**Sorun:** Uygulama planı 8 görsel diyor, prompt 5 görsel (1 büyük + 4 küçük) diyor.

**Düzeltme:** 5 görsel yeterli (1 büyük + 4 thumbnail). Tıklanan thumbnail büyük alana geçiyor. 8 görsel gereksiz.

---

## ÖZET TABLO

| Sorun No | Seviye | Konu | Kaynak Çelişki |
|----------|--------|------|----------------|
| 1 | ORTA | CTA formunda "Konu" alanı hala var | V2 Prompt ile çelişiyor |
| 2 | DÜŞÜK | Comfort başlığı "CAM FİLMİ GRUBU" olarak değişmiş | Katalog ve V2 ile çelişiyor |
| 3 | **KRİTİK** | Comfort'a 3 hayali ürün eklenmiş (Bright, Magnum, Magnum Sky) | Katalogda yok, hallucination |
| 4 | ORTA | Comfort için gereksiz tablo formatı | V2 ile çelişiyor |
| 5 | UYARI | Mat PPF'ye #00BCD4 renk aksanı eklenmiş | Renk paleti sınırını aşıyor |
| 6 | UYARI | Renkli PPF'ye #F5B82E renk aksanı eklenmiş | Renk paleti sınırını aşıyor |
| 7 | **KRİTİK** | Ürün kartlarında gerçek veriler yok | V2'de düzeltilmişti |
| 8 | **KRİTİK** | Karşılaştırma tablosunda gerçek veriler yok | V2'de düzeltilmişti |
| 9 | ORTA | SSS cevapları "derlenecek" olarak bırakılmış | V2'de yazılmıştı |
| 10 | BİLGİ | Teknik Spec Grid eklenmesi (iyi fikir) | V2'de yoktu, onay gerekli |
| 11 | BİLGİ | Mobilde carousel önerisi (iyi fikir) | V2 ile tutarsız, onay gerekli |
| 12 | DÜŞÜK | Galeri görsel sayısı 8 vs 5 | V2 ile tutarsız |
