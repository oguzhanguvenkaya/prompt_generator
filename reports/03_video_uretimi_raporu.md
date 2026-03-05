# AI Video Üretim Modelleri: Kapsamlı Araştırma Raporu

**Tarih:** Mart 2026
**Kapsam:** Sora, Runway Gen-3, Kling, Pika, Luma Dream Machine, Veo, HailuoAI ve diğer güncel modeller

---

## 1. En Büyük Kullanım Hataları

### 1.1 Prompt Kalitesi Sorunları

**Aşırı Genel Promptlar Yazmak**

En yaygın hata, kullanıcıların "bir kadın yürüyüş yapıyor" gibi belirsiz promptlar yazması. AI video modelleri, görsel detay ne kadar spesifik olursa o kadar iyi sonuç üretir.

**Kötü Prompt Örneği:**
```
A woman walking in a city
```

**İyi Prompt Örneği:**
```
A young woman in a red coat walking confidently down a rain-soaked
Tokyo street at night, neon lights reflecting on wet pavement,
medium shot tracking from left to right, cinematic lighting,
shallow depth of field, 24fps film grain, Blade Runner aesthetic
```

**Prompt Mühendisliği Prensipleri:**
- **Özne (Subject):** Kim/ne? Detaylı fiziksel tanımlama
- **Eylem (Action):** Ne yapıyor? Hareketin yönü ve hızı
- **Ortam (Environment):** Nerede? Işık, hava, zaman dilimi
- **Kamera (Camera):** Hangi açıdan? Hangi hareketle?
- **Stil (Style):** Sinematik, anime, fotorealistik, vintage?
- **Teknik (Technical):** Çözünürlük, fps, renk paleti

### 1.2 Beklenti Yönetimi Hataları

**Film Kalitesinde Sonuç Beklemek**

2025-2026 itibarıyla en gelişmiş modeller bile (Sora, Veo 2) Hollywood prodüksiyonu kalitesinde uzun videolar üretemiyor. Modellerin güçlü olduğu alan 5-15 saniyelik kısa klipler.

**Fiziksel Gerçekçilik Beklentisi**

AI video modelleri fizik motorları değil, olasılık dağılımlarından örnekleme yapan sistemler:
- El ve parmak hareketleri hâlâ sorunlu
- Sıvıların dökülmesi / sıçraması tahmin edilemez
- Objelerin birbiriyle etkileşimi (collision) tutarsız
- Karmaşık mekanik hareketler (dişli çarklar, makineler) bozuk

### 1.3 Yanlış Araç Seçimi

| İhtiyaç | Yanlış Seçim | Doğru Seçim |
|---------|-------------|-------------|
| Fotorealistik insan yüzleri | Pika 1.0 | Kling, Runway Gen-3 |
| Animasyon/cartoon stil | Kling | Pika, Luma |
| Uzun süre tutarlılık | Çoğu model | Kling (uzun video modu) |
| Hızlı prototipleme | Sora (yavaş) | HailuoAI, Luma Dream Machine |
| Lip-sync / konuşma | Genel modeller | Runway Act-One, Kling |
| Yaratıcı / surreal içerik | Kling | Sora, Pika |
| Doğa / peyzaj | Pika | Runway, Sora, Veo |

---

## 2. Yaygın Teknik Sorunlar

### 2.1 Temporal Consistency (Zamansal Tutarlılık)

AI video üretiminin en temel ve zorlu sorunu.

**Belirtiler:**
- Bir karakterin saç rengi veya kıyafeti frameler arasında değişiyor
- Arka plandaki objeler beliriyor/kayboluyor
- Yüzlerin kimliği frame'den frame'e kayıyor (identity drift)
- Işık kaynağının yönü tutarsız şekilde değişiyor
- Tekstürlerin dalgalanması (texture flickering)

**Çözüm Stratejileri:**
- Daha kısa klipler üretip post-production'da birleştirme
- Image-to-video kullanarak başlangıç karesini sabitlemek
- Aynı seed değerini kullanarak tutarlılık sağlamak
- Kling ve Runway'in "consistent character" özelliklerini kullanmak

### 2.2 Fizik Kuralları İhlalleri

- **Yerçekimi Sorunları:** Objeler havada asılı kalıyor veya yanlış yöne düşüyor
- **Oklüzyon Hataları:** Bir obje diğerinin arkasına geçtiğinde bozulma
- **Anatomik Bozulmalar:** Ekstra parmaklar, doğal olmayan eklem açıları
- **Işık Tutarsızlıkları:** Gölgelerin kaynakla uyumsuz yönlenmesi

### 2.3 Morphing Artifacts

**Türler:**
- **Face morphing:** Bir karakterin yüzü başka birine dönüşür
- **Object blending:** İki obje arasındaki sınır kaybolur
- **Background bleeding:** Arka plan ögeleri ön plana sızar
- **Texture swimming:** Yüzeyler üzerindeki dokular sanki hareket ediyormuş gibi kayar

### 2.4 Hareket Kontrolü Sorunları

- Model prompt'taki hareketi abartarak uygular ("slowly walking" ama karakter koşar)
- Veya hareketi tamamen görmezden gelir (statik görüntü üretir)
- İstenmeyen kamera titremesi (jitter)
- Çoklu karakter koordinasyonu bozuk (tokalaşma, dans gibi)

### 2.5 Uzun Video Üretimi Zorlukları

Modellerin çoğu 4-10 saniye arası optimal çalışır. Daha uzun videolarda:

- **Anlatım kopması:** 10+ saniyeden sonra sahne bağlamı kaybolur
- **Karakter tutarsızlığı:** Uzun videolarda identity drift belirginleşir
- **Kalite düşüşü:** Video uzadıkça genel kalite düşmesi
- **Hesaplama maliyeti:** Uzun videolar katlanarak artan GPU süresi gerektirir

---

## 3. Verimsiz Kullanım Davranışları

### 3.1 Tek Prompt ile Mükemmel Sonuç Bekleme

**Gerçeklik:** Profesyonel AI video üretim süreci iteratiftir:

```
1. Konsept prompt -> İlk sonucu değerlendir
2. Prompt'u rafine et -> İkinci deneme
3. Parametreleri ayarla (CFG, seed, steps) -> Üçüncü deneme
4. En iyi sonucu seç -> Post-production'a gönder
5. Gerekirse farklı model dene -> Karşılaştır
```

### 3.2 Post-Production İhmal Etme

AI'ın ürettiği ham video neredeyse hiçbir zaman "son ürün" değildir:

- **Renk düzeltme (Color grading):** AI çıktılarının renk profili genellikle flat
- **Stabilizasyon:** Yapay titremeler için warp stabilizer
- **Upscaling:** 720p çıktıyı 4K'ya yükseltme (Topaz Video AI, Real-ESRGAN)
- **Frame interpolation:** 24fps çıktıyı 60fps'e çıkarma (RIFE, FILM)
- **Ses ekleme:** Müzik, ses efektleri, seslendirme
- **Clip birleştirme:** Farklı klipleri anlamlı bir şekilde montajlama

### 3.3 Kamera Hareketi Belirtmeme

Prompt'ta kamera hareketi belirtmemek, modelin rastgele bir kamera davranışı seçmesine yol açar.

**Belirtilmesi Gereken Kamera Parametreleri:**

| Parametre | Örnekler |
|-----------|----------|
| Shot type | Close-up, medium shot, wide shot, extreme close-up |
| Camera movement | Static, pan left/right, tilt up/down, dolly in/out, tracking shot |
| Speed | Slow, steady, fast, accelerating |
| Height | Low angle, eye level, high angle, bird's eye, drone shot |
| Lens | Wide angle, telephoto, macro, fisheye |
| Focus | Shallow DOF, deep focus, rack focus |

### 3.4 Referans Görsel Kullanmamak

Sadece metin ile çalışmak, modelin yorumuna çok fazla alan bırakır. Image-to-video veya style reference kullanmak:
- Karakter görünümünü sabitler
- Renk paletini belirler
- Ortam detaylarını netleştirir
- Stil tutarlılığını sağlar

---

## 4. Text-to-Video vs Image-to-Video Farkları

### 4.1 Text-to-Video (T2V)

**Güçlü Yönler:**
- Sıfırdan yaratıcı içerik üretimi
- Hızlı prototipleme ve fikir keşfetme
- Surreal, fizik dışı sahneler için ideal
- Storyboard oluşturma sürecini hızlandırma

**Zayıf Yönler:**
- Spesifik bir görsel sonuç elde etmek zor
- Karakter tutarlılığı sağlamak güç
- Her denemede farklı sonuç (determinizm düşük)

**Ne Zaman Kullanılmalı:**
- Yaratıcı explorasyon aşamasında
- Konsept video / mood board oluşturmada
- Soyut / surreal içerik üretiminde

### 4.2 Image-to-Video (I2V)

**Güçlü Yönler:**
- Karakter tutarlılığı çok daha yüksek
- Belirli bir görünüm / stil garantisi
- Marka uyumu kolay sağlanır
- Ürün videoları için ideal
- Kontrol edilebilirlik çok daha yüksek

**Zayıf Yönler:**
- Referans görsel hazırlamak ekstra adım gerektirir
- Başlangıç karesinden çok farklı bir son kareye ulaşmak zor

**Ne Zaman Kullanılmalı:**
- Ürün tanıtım videolarında
- Karakter animasyonunda (tutarlılık kritik)
- Bir fotoğrafın canlandırılmasında
- Marka içeriklerinde (logo, renkler sabit kalmalı)

### 4.3 Karşılaştırma Tablosu

| Özellik | Text-to-Video | Image-to-Video |
|---------|:------------:|:--------------:|
| Yaratıcı özgürlük | Yüksek | Orta |
| Kontrol edilebilirlik | Düşük | Yüksek |
| Karakter tutarlılığı | Düşük | Yüksek |
| Hız | Hızlı (tek adım) | Orta (görsel + video) |
| Stil tutarlılığı | Düşük | Yüksek |
| Ürün videoları | Zayıf | Güçlü |
| Surreal içerik | Güçlü | Orta |
| Deterministik sonuç | Düşük | Yüksek |

### 4.4 Hibrit Yaklaşım (Önerilen Workflow)

```
1. T2V ile konsept keşfet (hızlı, ucuz iterasyonlar)
2. En iyi kareyi referans görsel olarak seç
3. Gerekirse görseli AI image editor ile rafine et
4. I2V ile final videoyu üret
5. Post-production ile son halini ver
```

---

## 5. Verimli Kullanım Stratejileri

### 5.1 Kamera Açıları ve Hareketleri Belirtme

**Shot Türleri:**
```
- Extreme Close-Up (ECU): Gözler, dudaklar, detay
- Close-Up (CU): Yüz, tek obje
- Medium Close-Up (MCU): Baş ve omuzlar
- Medium Shot (MS): Belden yukarı
- Medium Long Shot (MLS): Dizlerden yukarı
- Long Shot (LS): Tam vücut
- Extreme Long Shot (ELS): Geniş peyzaj, sahne kurulumu
```

**Kamera Hareketleri:**
```
- Static shot: Sabit kamera, hareket yok
- Pan: Yatay dönme (pan left, pan right)
- Tilt: Dikey dönme (tilt up, tilt down)
- Dolly: Kameranın fiziksel hareketi (dolly in, dolly out)
- Tracking/Follow: Konuyu takip eden kamera
- Crane/Jib: Yukarı/aşağı dikey hareket
- Orbit: Konunun etrafında dönme
- Zoom: Lens ile yakınlaşma/uzaklaşma
- Steadicam: Yürüyen kamera, stabil
- Handheld: Elde kamera, hafif titreme
- Drone shot: Hava çekimi
```

### 5.2 Hareket Tanımlama Teknikleri

**Hareket Hiyerarşisi:**
1. **Birincil hareket:** Ana konunun eylemi
2. **İkincil hareket:** Destekleyici öge hareketleri (saç dalgalanması, kıyafet hareketi)
3. **Arka plan hareketi:** Ortamdaki hareketler (bulutlar, trafik, yapraklar)
4. **Kamera hareketi:** Çekimin kendisinin hareketi

**Hareket Yoğunluğu Kontrol:**
```
Düşük hareket: "subtle", "gentle", "slight", "barely moving"
Orta hareket: "steady", "moderate", "walking pace"
Yüksek hareket: "dynamic", "energetic", "fast-paced", "explosive"
```

### 5.3 Stil Tutarlılığı Sağlamak

- Her prompt'a aynı stil etiketlerini ekleyin
- Renk paleti belirtin: "color palette: deep teal, warm amber, muted burgundy"
- Işık şablonu belirtin: "golden hour lighting throughout"
- Referans görsel kullanın (I2V)
- Seed değerini sabitleyin (destekleyen modellerde)

### 5.4 Multi-Shot Workflow

```
Adım 1: Storyboard Oluştur
  Shot 1: ELS - Şehir silueti, sabah, drone shot ascending
  Shot 2: MS - Karakter ofise giriyor, tracking shot
  Shot 3: CU - Karakter bilgisayara bakıyor, static
  Shot 4: ECU - Ekrandaki veri, rack focus
  Shot 5: MS - Karakter gülüyor, slow dolly in

Adım 2: Her shot için ayrı prompt yaz. Ortak stil etiketlerini her prompt'a ekle.
Adım 3: Her shot için birden fazla varyasyon üret, en iyisini seç.
Adım 4: Post-production'da birleştir: renk eşle, geçişler ekle, ses ve müzik koy.
```

### 5.5 Video-to-Video Refinement

Bazı modeller (Runway, Pika) mevcut bir videoyu girdi olarak alıp stilize edebilir:

- Gerçek video çekimini anime/cartoon stile dönüştürme
- Düşük kaliteli videoyu iyileştirme
- Stil transferi
- Hareket referansı olarak gerçek video kullanma

### 5.6 Prompt Mühendisliği İleri Teknikler

**Temporal Prompt (Zamana Bağlı):**
Sora ve bazı modellerde zamana bağlı değişen prompt desteği:
```
[0s-3s] Wide shot of empty room, static camera
[3s-6s] Door opens, woman enters, tracking follows her
[6s-10s] Close-up of her face, she smiles, soft focus
```

**Negatif Prompt Şablonu:**
```
Negative: blurry, distorted, deformed, extra limbs,
extra fingers, morphing, flickering, low quality,
watermark, text, logo, oversaturated, underexposed,
jittery camera, unnatural motion
```

---

## 6. 2025-2026 Güncel Trendler

### 6.1 Model Güncellemeleri

**OpenAI Sora**
- Aralık 2024'te halka açıldı (sınırlı erişimle)
- 1080p video üretimi, 20 saniyeye kadar
- Fizik anlayışı diğer modellerden belirgin şekilde iyi
- Storyboard modu ile çoklu sahne planlaması

**Google Veo 2**
- 4K çözünürlük desteği
- 2+ dakika uzunluğunda video üretimi
- Fizik simülasyonunda önemli iyileşmeler

**Kling (Kuaishou) 1.5/2.0**
- 2 dakikaya kadar uzun video üretimi (sektörde lider)
- Lip-sync ve konuşma animasyonu yetkinliği arttı
- Motion brush özelliği ile bölgesel hareket kontrolü

**Runway Gen-3 Alpha / Turbo**
- Multi-Motion Brush: Sahne içinde farklı bölgelere farklı hareketler atama
- Act-One: Yüz ifadesi ve vücut dili transfer sistemi
- Director Mode: Kamera hareketi kontrolü gelişmiş
- API erişimi ile üretim pipeline'larına entegrasyon

**Pika 2.0**
- "Scene Ingredients" özelliği: Farklı ögeleri birleştirme
- Pika Lip Sync: Otomatik dudak senkronizasyonu
- Pikaffects: Stil bazlı efektler (erime, patlama, dönüşme)

**Luma Dream Machine 1.5**
- Keyframe kontrolü ile başlangıç ve bitiş karesi belirleme
- Loop video desteği ve API erişimi

### 6.2 Temel Trendler

**Daha Uzun Videolar**
- 2024 başı: 4 saniye standart
- 2024 sonu: 10-20 saniye
- 2025: 30-120 saniye

**Kontrol Edilebilirlik Artışı**
- Motion brush (bölgesel hareket kontrolü)
- Kamera yolu belirtme (camera path)
- Keyframe kontrolü
- Temporal prompt'lar
- Karakter referans sistemleri
- Derinlik ve normal haritası kontrolü

**Lip-Sync ve Konuşma**
- Runway Act-One ile performans yakalama
- Kling'in lip-sync modülü
- Pika Lip Sync
- Ses dosyasından otomatik dudak hareketi

**Açık Kaynak Gelişmeler**
- CogVideoX (Tsinghua)
- Open-Sora (HPC-AI Tech)
- Mochi (Genmo)
- Wan (Alibaba)
- LTX-Video (Lightricks)

---

## 7. Post-Production Entegrasyonu

### 7.1 Video Editing Workflow

```
[AI Video Üretim]
       ↓
[Kalite Değerlendirme] — Kötü → [Prompt rafine et, tekrar üret]
       ↓ (İyi)
[Upscaling] — Topaz Video AI / Real-ESRGAN
       ↓
[Frame Interpolation] — RIFE / Google FILM
       ↓
[Renk Düzeltme] — DaVinci Resolve / Premiere Pro
       ↓
[Stabilizasyon] — Gerekiyorsa warp stabilizer
       ↓
[Montaj] — Klipleri sırala, geçişleri ekle
       ↓
[Ses Ekleme] — Müzik, SFX, seslendirme
       ↓
[Final Export]
```

### 7.2 Post-Production Yazılımları

| Yazılım | Rol | Maliyet |
|---------|-----|---------|
| DaVinci Resolve | Montaj + renk düzeltme + ses | Ücretsiz (Studio ücretli) |
| Adobe Premiere Pro | Montaj + efektler | Abonelik |
| Adobe After Effects | Motion graphics + VFX | Abonelik |
| CapCut | Hızlı sosyal medya montajı | Ücretsiz / Pro |
| Topaz Video AI | Upscaling + interpolation | Tek seferlik lisans |
| FFmpeg | Format dönüşümü, birleştirme | Ücretsiz, açık kaynak |

---

## 8. Model Karşılaştırma Tablosu

| Özellik | Sora | Veo 2 | Runway Gen-3 | Kling 2.0 | Pika 2.0 | Luma 1.5 | HailuoAI |
|---------|:----:|:-----:|:------------:|:---------:|:--------:|:--------:|:--------:|
| Max çözünürlük | 1080p | 4K | 1080p | 1080p | 1080p | 1080p | 720p |
| Max süre | ~20s | ~120s | ~10s | ~120s | ~10s | ~10s | ~6s |
| Fotorealizm | 9/10 | 9/10 | 8/10 | 8/10 | 6/10 | 7/10 | 7/10 |
| Hareket kalitesi | 9/10 | 8/10 | 8/10 | 8/10 | 7/10 | 7/10 | 7/10 |
| Fizik anlayışı | 9/10 | 8/10 | 7/10 | 7/10 | 6/10 | 6/10 | 6/10 |
| Kontrol edilebilirlik | 7/10 | 6/10 | 9/10 | 8/10 | 7/10 | 7/10 | 5/10 |
| Üretim hızı | Yavaş | Orta | Hızlı | Orta | Hızlı | Çok hızlı | Hızlı |
| I2V desteği | Var | Var | Var | Var | Var | Var | Sınırlı |
| Lip-sync | Sınırlı | Sınırlı | Act-One | Var | Var | Yok | Sınırlı |
| Ücretsiz tier | Sınırlı | Sınırlı | Sınırlı | Var | Var | Var | Var |

---

## 9. Sonuç ve Öneriler

### Yeni Başlayanlar İçin
1. Ücretsiz araçlarla başlayın (HailuoAI, Kling ücretsiz tier, Luma)
2. 4-6 saniyelik kısa klipler ile prompt mühendisliğini öğrenin
3. Kamera dilini öğrenin ve her prompt'a ekleyin
4. İteratif çalışın, tek denemede mükemmellik beklemeyin

### Orta Seviye İçin
1. I2V workflow benimseyin (Midjourney/DALL-E ile referans görsel + I2V)
2. Multi-shot workflow uygulayın
3. Her sahne için en uygun modeli seçin
4. Upscaling ve interpolation kullanın

### Profesyonel Seviye İçin
1. Pipeline oluşturun: T2V/I2V → Upscaling → Interpolation → Color → Edit → Audio
2. API entegrasyonu ile toplu üretim
3. Custom model eğitimi imkanlarını değerlendirin
4. Açık kaynak modelleri araştırın (CogVideoX, Wan)
5. Hibrit workflow: AI üretimi + gerçek çekim + VFX

### Altın Kurallar
- Prompt'a yatırım yapın — iyi bir prompt sonucun %70'ini belirler
- Beklentilerinizi yönetin — sınırlamaları bilin
- Post-production atlamayın — ham AI çıktısı neredeyse hiçbir zaman final ürün değildir
- Minimum 5-10 iterasyon planlayın
- Güncel kalın — bu alan aylık değişiyor
- Etik kurallara uyun — deepfake, telif hakkı ihlali ve yanıltıcı içerikten kaçının
