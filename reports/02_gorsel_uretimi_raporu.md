# AI Görsel Üretim Modelleri: Kapsamlı Araştırma Raporu

**Tarih:** 2026-03-05
**Kapsam:** Midjourney, DALL-E, Stable Diffusion, Flux, Firefly ve diğer text-to-image / image-to-image modelleri

---

## İçindekiler

1. En Büyük Kullanım Hataları
2. Yaygın Sorunlar
3. Verimsiz Kullanım Davranışları
4. Text-to-Image vs Image-to-Image Farkları
5. Difüzyon Modelleri: Nasıl Çalışır?
6. Verimli Kullanım Stratejileri
7. 2025-2026 Güncel Trendler

---

## 1. En Büyük Kullanım Hataları

### 1.1 Prompt Yazım Hataları

**Aşırı Belirsiz Promptlar**

En yaygın hata, yeterince açıklayıcı olmayan promptlar yazmaktır.

- KÖTÜ: `a beautiful landscape`
- İYİ: `a dramatic mountain landscape at golden hour, snow-capped peaks, alpine meadow with wildflowers in foreground, volumetric fog in valley, cinematic lighting, shot on Hasselblad, 8K resolution`

Modeller belirsiz promptları eğitim verisindeki en yaygın örneklerle doldurur, bu da genel ve ilham verici olmayan sonuçlar üretir.

**Aşırı Uzun ve Karışık Promptlar**

Diğer uçtaki hata, çok fazla kavramı tek bir prompta tıkmaktır.

- KÖTÜ: `a cat and a dog and a bird and a fish in a garden with a castle and mountains and ocean and city skyline and spaceship and dragon`
- İYİ: Her sahne ögesini önem sırasına göre belirleyip en kritik 3-5 ögede yoğunlaşmak

Modellerin attention mekanizması sınırlıdır. Çok fazla nesne/kavram bir arada talep edildiğinde model hangisine öncelik vereceğini bilemez ve kaotik sonuçlar üretir.

**Olumsuz İfade Kullanma Hatası**

Modeller "yapma" komutlarını doğru işleyemez:

- KÖTÜ: `a person without glasses, no hat, not smiling`
- İYİ: `a person with bare eyes, bare head, serious expression`

CLIP ve diğer text encoder'lar "without", "no", "not" gibi olumsuzlukları güvenilir şekilde işleyemez. Model genellikle olumsuzluğu görmezden gelip belirtilen nesneyi ekler. Bu nedenle negative prompt alanı ayrı olarak vardır.

**Yanlış Kelime Sırası ve Ağırlık**

Çoğu modelde promptun başındaki kelimeler daha fazla ağırlık taşır:

- KÖTÜ: `there is a small red house in the background with a large oak tree in the foreground on a sunny day`
- İYİ: `large oak tree in foreground, small red house in background, sunny day, pastoral scene`

### 1.2 Yanlış Model Seçimi

| İhtiyaç | Yanlış Seçim | Doğru Seçim |
|---------|-------------|-------------|
| Fotorealistik portre | Midjourney v5 (stilize eder) | Stable Diffusion + realistik checkpoint veya Flux |
| Hızlı konsept tasarımı | SD ile ince ayar yapmak | Midjourney veya DALL-E 3 |
| Marka uyumlu görsel | Genel model | LoRA eğitilmiş özel model |
| Metin içeren görsel | SD 1.5 (metin oluşturamaz) | DALL-E 3, Flux, Ideogram |
| Animasyon/video karesi | Standart img2img | AnimateDiff, SVD |
| Ticari kullanım | Midjourney (lisans karmaşık) | Firefly (Adobe Stock lisanslı) |

### 1.3 Parametre Ayar Hataları

**CFG Scale (Classifier-Free Guidance)**
- Çok düşük (1-3): Model promptu neredeyse görmezden gelir
- Çok yüksek (15-30): Aşırı doygun renkler, artifaktlar, "yanık" görüntüler
- İdeal aralık: Çoğu durumda 5-12, fotorealistik için 7-9

**Steps (Özetleme Adımları)**
- Çok az (5-10): Bulanık, detaysız, tamamlanmamış görüntüler
- Çok fazla (100+): Gereksiz hesaplama süresi, çok az iyileşme
- İdeal aralık: Euler/DPM için 20-30, DDIM için 30-50

**Resolution Hatası**
- Eğitim çözünürlüğünden farklı boyutlarda üretim yapmak ciddi sorunlara yol açar
- SD 1.5: 512x512'de eğitildi, 768x768 üzerinde garip anatomik hatalar
- SDXL: 1024x1024'de eğitildi, bu boyuttan sapmak kaliteyi düşürür
- Çözüm: Modelin native çözünürlüğünde üret, sonra upscale yap

---

## 2. Yaygın Sorunlar

### 2.1 Anatomik Hatalar

**Eller ve Parmaklar**
- 6-7 parmak, eklem yerlerinin yanlış olması, parmak uzunluk oranlarının bozulması
- Neden: Eğitim verisinde eller çok çeşitli pozlarda ve genellikle kısmi görünür durumda bulunur
- Kısmi Çözümler:
  - Midjourney v5.2+ ve v6 bu sorunu önemli ölçüde azalttı
  - SD'de inpainting ile eller ayrıca düzeltme
  - ControlNet (OpenPose) ile el pozunu belirtme
  - DALL-E 3 ve Flux ellerde belirgin iyileşmeler gösterdi
  - Negative prompt: `deformed hands, extra fingers, mutated hands, poorly drawn hands`

**Yüz ve Göz**
- Asimetrik yüzler, garip göz bakışları, "uncanny valley" etkisi
- Çift kişi sahnelerinde yüzlerin birbirine karışması
- Dişler genellikle sorunlu render edilir

**Vücut Oranları**
- Uzuvların doğal olmayan uzunlukta veya açıda olması
- Birden fazla kişi içeren sahnelerde vücut parçalarının karışması

### 2.2 Tutarsız Stiller

**Aynı Prompt, Farklı Sonuçlar:** Seed değişmeden bile bazı modellerde stil tutarsızlıkları yaşanabilir. Seri görsel üretiminde stil birliği sağlamak zordur.

**Stil Karışımı Problemi:** `oil painting style, digital art, anime` gibi çelişen stiller kaotik sonuçlar üretir.

**Çözüm Yaklaşımları:**
- Tutarlı karakter için IP-Adapter veya karakter LoRA kullanmak
- Stil referans görselleri kullanmak (Midjourney --sref, SD'de IP-Adapter)
- Seed'i sabitleyip yalnızca içerik değişkenlerini değiştirmek

### 2.3 İstenmeyen Artifaktlar

| Artifakt Türü | Neden | Çözüm |
|--------------|-------|-------|
| Bulanıklaşma | Düşük step sayısı veya düşük CFG | Steps artır, CFG ayarla |
| Renk bandlama | Düşük bit derinliği, JPEG sıkıştırma | PNG formatında kaydet |
| Tekrarlayan desenler | Tiling artifaktları, attention bozukluğu | Farklı sampler dene |
| Watermark/imza | Eğitim verisindeki watermark'lar | Negative prompt'a ekle |
| Göz parlama | Aşırı speküler yansıma | `natural lighting, soft light` kullan |
| Kenar artifaktları | Outpainting birleştirme hataları | Overlap bölgesini artır |

### 2.4 Metin Oluşturma Sorunları

Görsellerin içine metin yerleştirme uzun süre AI görsel üretiminin en zayıf noktasıydı:

- **SD 1.5 / SD 2.1:** Metin oluşturma neredeyse imkansız
- **Midjourney v5:** Kısa kelimelerde sınırlı başarı
- **DALL-E 3 (2023 sonu):** Önemli sıçrama — kısa metinleri genellikle doğru render edebiliyor
- **Ideogram (2024):** Metin render etmede en başarılı modellerden biri
- **Flux (2024):** Metin render etme konusunda güçlü performans
- **Midjourney v6 (2024):** Metin yeteneği eklendi, kısa metinlerde başarılı

### 2.5 Telif Hakkı Sorunları

**Ticari Kullanım Karşılaştırması:**

| Model | Ticari Kullanım | Risk Seviyesi |
|-------|----------------|---------------|
| Midjourney | Ücretli planlarda izinli | Orta |
| DALL-E 3 | API/ChatGPT Plus ile izinli | Düşük |
| Stable Diffusion | Açık lisans, genellikle serbest | Değişken |
| Flux | Açık ağırlıklı versiyonlar mevcut | Düşük-Orta |
| Adobe Firefly | Adobe Stock eğitimli, ticari güvenli | En düşük |

---

## 3. Verimsiz Kullanım Davranışları

### 3.1 Trial-and-Error Döngüsü

**Tipik Verimsiz Döngü:**
```
1. Genel prompt yaz -> beğenmedi
2. Prompt'a rastgele kelimeler ekle -> beğenmedi
3. Tamamen farklı prompt yaz -> beğenmedi
4. 50 görsel üret -> 1 tanesi "idare eder"
5. Kredi/GPU saati israf edildi
```

**Verimli Yaklaşım:**
```
1. Net bir görsel tanımı oluştur (konu, stil, ışık, kompozisyon)
2. Düşük step'te hızlı test üret (10-15 step)
3. Umut veren sonucun seed'ini sabitle
4. Prompt'u sistematik olarak ayarla (tek bir değişken)
5. Step sayısını artırıp final üret
6. Gerekirse img2img ile incele
```

### 3.2 Negative Prompt Kullanmama

Birçok kullanıcı negative prompt alanını boş bırakır. Bu, modelin en yaygın artifaktları filtrememesi anlamına gelir.

**Temel Negative Prompt Şablonu (SD/SDXL):**
```
(worst quality, low quality:1.4), blurry, jpeg artifacts, watermark,
signature, text, deformed, ugly, mutilated, disfigured, extra limbs,
extra fingers, mutated hands, poorly drawn hands, poorly drawn face,
mutation, bad anatomy, bad proportions, extra arms, extra legs,
cloned face, gross proportions, malformed limbs, missing arms,
missing legs, fused fingers, too many fingers, long neck
```

### 3.3 Seed Bilmeme / Kullanmama

Seed, rastgele gürültü başlangıç noktasını belirler. Aynı seed + aynı parametreler = aynı görsel.

**Seed Kullanmanın Faydaları:**
- Beğendiğiniz kompozisyonu koruyarak prompt ince ayarı
- A/B testi: Tek değişkeni değiştirip etkisini izole etme
- Tekrarlanabilirlik

### 3.4 ControlNet Bilmeme

ControlNet, görselin yapısal kontrolünü sağlayan bir mekanizmadır.

**ControlNet Modları:**

| Mod | Giriş | Kullanım |
|-----|-------|----------|
| Canny | Kenar haritası | Nesne sınırlarını koruma |
| Depth | Derinlik haritası | 3D kompozisyon kontrolü |
| OpenPose | İskelet/poz | İnsan pozu belirtme |
| Scribble | El çizimi eskiz | Kabataslak fikirden görsel |
| Normal Map | Normal haritası | Yüzey detayı kontrolü |
| Segmentation | Semantik segmentasyon | Bölgesel içerik kontrolü |
| Tile | Tile haritası | Upscaling ve detay ekleme |
| IP-Adapter | Referans görsel | Stil/karakter transferi |
| Lineart | Çizgi sanat | Boyama/renklendirme |

### 3.5 img2img Workflow Eksikliği

Çoğu kullanıcı yalnızca text-to-image kullanır ve img2img pipeline'ının gücünden habersizdir.

**Kaçırılmış Fırsatlar:**
- Mevcut bir fotoğrafı stilize etme
- Kabataslak bir eskizi detaylı görsele dönüştürme
- Düşük çözünürlüklü görüntüyü kaliteli hale getirme
- Kısmen beğenilen bir görseli ince ayarla iyileştirme
- Inpainting ile belirli bölgeleri düzeltme (eller, yüzler)

---

## 4. Text-to-Image vs Image-to-Image Farkları

### 4.1 Text-to-Image (txt2img)

**Nasıl Çalışır:**
1. Metin promptu text encoder tarafından embedding vektörüne dönüştürülür
2. Rastgele Gaussian gürültü oluşturulur (veya belirli seed ile)
3. Difüzyon modeli bu gürültüyü iteratif olarak temizler
4. Sonuç latent space'den piksel uzayına decode edilir (VAE ile)

**Güçleri:** Sıfırdan yaratıcı görsel üretme, tamamen hayali sahneler, geniş stil yelpazesi, hızlı konsept geliştirme.

**Zayıflıkları:** Tam pozisyon kontrolü zor, karmaşık sahnelerde tutarsızlık, anatomik hata riski yüksek.

**Ne Zaman Kullanılmalı:** Konsept art, tamamen yeni görsel fikir, belirli referansınız yoksa, erken tasarım aşamaları.

### 4.2 Image-to-Image (img2img)

**Nasıl Çalışır:**
1. Girdi görseli VAE encoder ile latent space'e dönüştürülür
2. Bu latent temsile belirli oranda gürültü eklenir (denoising strength)
3. Metin promptu rehberliğinde gürültü temizlenir
4. Sonuç piksel uzayına decode edilir

**Denoising Strength (0.0 - 1.0):**
- 0.0-0.3: Çok az değişiklik, renk/ton ayarı
- 0.3-0.5: Orta değişiklik, stil transferi, detay ekleme
- 0.5-0.7: Belirgin değişiklik, yapı korunur ama içerik değişir
- 0.7-1.0: Ağır değişiklik, neredeyse yeni görsel (1.0 = txt2img)

**Güçleri:** Referans alma, kompozisyon koruma, stilize etme, iteratif iyileştirme, daha tutarlı sonuçlar.

**Ne Zaman Kullanılmalı:** Mevcut görseli iyileştirme, stil dönüşümü, eskizden görsel, txt2img sonucunu rafine etme.

### 4.3 Hibrit Workflow (En Verimli Yaklaşım)

```
Adım 1: txt2img ile genel konsept/kompozisyon üret
Adım 2: Beğenilen sonucun seed'ini al
Adım 3: img2img ile ince ayar yap (denoising 0.3-0.5)
Adım 4: Inpainting ile sorunlu bölgeleri düzelt (eller, yüzler)
Adım 5: Upscale (tile ControlNet veya dedicated upscaler)
Adım 6: Son dokunuşlar (renk düzeltme, keskinleştirme)
```

### 4.4 Özel Varyantlar

- **Inpainting:** Yalnızca maskeli bölgeyi yeniden üretir. Düzeltme, nesne ekleme/çıkartma için ideal.
- **Outpainting:** Görselin sınırlarını genişletir. Panoramik görüntüler, crop düzeltme.
- **Depth2img:** Derinlik haritasını referans alarak görsel üretir. 3D sahne düzeni kontrolü.

---

## 5. Difüzyon Modelleri: Nasıl Çalışır?

### 5.1 Temel Konsept: Denoising

**Forward Process (Eğitim Sırasında):**
```
Temiz görsel -> Gürültü ekle (t adımları) -> Tamamen gürültü
x_0 -> x_1 -> x_2 -> ... -> x_T (saf Gaussian gürültü)
```

**Reverse Process (Üretim Sırasında):**
```
Tamamen gürültü -> Gürültüyü tahmin et ve çıkart -> Temiz görsel
x_T -> x_{T-1} -> ... -> x_1 -> x_0
```

### 5.2 Latent Diffusion (Stable Diffusion'ın Yöntemi)

Doğrudan piksel uzayında çalışmak yerine, SD latent space'te çalışır:

```
Görsel (512x512x3) -> VAE Encoder -> Latent (64x64x4) -> Difüzyon -> VAE Decoder -> Görsel
```

Bu yaklaşım hesaplama maliyetini yaklaşık 48x azaltır.

**Mimari Bileşenleri:**
1. **VAE (Variational Autoencoder):** Piksel ↔ Latent dönüşümü
2. **U-Net (veya DiT):** Gürültü tahmini yapan ana model
3. **Text Encoder (CLIP / T5):** Metin promptunu anlam vektörüne dönüştürür
4. **Scheduler/Sampler:** Gürültü çıkarma sürecini yöneten algoritma

### 5.3 Classifier-Free Guidance (CFG)

CFG, metnin görsel üretimini ne kadar yönlendireceğini kontrol eder:

```
tahmin = gürültü_şartsız + cfg_scale × (gürültü_şartlı - gürültü_şartsız)
```

- `cfg_scale = 1`: Metin rehberliği yok
- `cfg_scale = 7`: Standart denge (en yaygın)
- `cfg_scale = 15+`: Metin çok baskın, aşırı doygun ve yapay görünüm

**Pratikte:**
- Sanatsal/yaratıcı: 5-8
- Fotorealistik: 7-9
- Çok spesifik promptlar: 8-12
- 15 üzerinde genellikle kaçınılmalı

### 5.4 Sampling Methods (Sampler/Scheduler)

| Sampler | Hız | Kalite | Yaratıcılık | İdeal Step | Deterministik |
|---------|-----|--------|-------------|------------|---------------|
| Euler | Hızlı | İyi | Orta | 20-30 | Evet |
| Euler a | Hızlı | İyi | Yüksek | 20-40 | Hayır |
| DPM++ 2M Karras | Orta | Çok iyi | Orta | 20-30 | Evet |
| DPM++ SDE Karras | Yavaş | Çok iyi | Yüksek | 20-35 | Hayır |
| DDIM | Orta | İyi | Düşük | 30-50 | Evet |
| UniPC | Çok hızlı | İyi | Düşük | 10-20 | Evet |
| LCM | Ultra hızlı | Kabul edilir | Düşük | 4-8 | Evet |

### 5.5 Model Mimarileri Karşılaştırması

**U-Net Tabanlı (SD 1.5, SD 2.1, SDXL):**
- Klasik encoder-decoder yapısı skip connection'larla
- Cross-attention ile text conditioning
- Kanıtlanmış, geniş ekosistem

**DiT - Diffusion Transformer (SD3, Flux, DALL-E 3):**
- Transformer tabanlı, attention mekanizması ile
- Daha iyi metin anlama ve tutarlılık
- Ölçeklenebilirlik avantajı

---

## 6. Verimli Kullanım Stratejileri

### 6.1 Prompt Engineering for Images

**Yapı Formülü:**
```
[Konu] + [Ortam/Sahne] + [Işık] + [Stil/Ortam] + [Teknik Detay] + [Kalite Etiketleri]
```

**Örnek:**
```
A weathered fisherman mending nets on a wooden dock,
Mediterranean harbor at sunset,
warm golden hour lighting with long shadows,
oil painting style reminiscent of Joaquin Sorolla,
impasto brushstrokes, rich color palette,
masterpiece, highly detailed, award-winning
```

**Ağırlık Sözdizimi (Stable Diffusion / ComfyUI):**
- `(kelime:1.3)` — 1.3x ağırlık (vurgula)
- `(kelime:0.7)` — 0.7x ağırlık (azalt)
- `(kelime1:kelime2:0.5)` — iki kavram arası geçiş

**Midjourney Parametreleri:**
- `--ar 16:9` — en-boy oranı
- `--s 250` — stilize etme (0-1000)
- `--c 30` — kaos/çeşitlilik (0-100)
- `--no plants` — negative prompt
- `--style raw` — daha az stilize, daha literal
- `--sref [URL]` — stil referansı
- `--cref [URL]` — karakter referansı (v6+)

### 6.2 Stil Referansları

**IP-Adapter (Stable Diffusion Ekosistemi):**
- IP-Adapter: Genel stil ve içerik transferi
- IP-Adapter Face / FaceID: Yüz özellikleri transferi
- InstantID: Tek referans fotoyla yüz kimliğini yakalama
- PhotoMaker: Birden fazla referansla kişiselleştirilmiş üretim

### 6.3 LoRA ve Fine-Tuning

**LoRA (Low-Rank Adaptation):**
Modelin tamamını yeniden eğitmek yerine, küçük adaptasyon katmanları ekleyerek özelleştirilmiş sonuçlar almak.

**LoRA Türleri:**
- Stil LoRA: Belirli sanat stili
- Karakter LoRA: Belirli karakter/kişi
- Konsept LoRA: Belirli nesne/kavram
- Pose LoRA: Belirli pozlar veya kompozisyonlar

**DreamBooth vs LoRA vs Textual Inversion:**
- DreamBooth: Modelin ağırlıklarını doğrudan değiştirir, güçlü ama pahalı
- LoRA: Ek katmanlar ekler, hafif (10-200MB vs tam model 2-7GB)
- Textual Inversion: Yalnızca yeni bir "kelime" öğretir, en hafif ama en sınırlı

### 6.4 Inpainting ve Outpainting

**Inpainting Best Practices:**
1. Maskeyi biraz geniş tutun (feathering için)
2. Prompt yalnızca maskeyi değil, genel sahneyi tanımlamalı
3. Denoising strength: 0.4-0.7 genellikle ideal
4. "Inpaint at full resolution" seçeneğini aktif edin
5. Birden fazla küçük pas, tek büyük değişiklikten daha iyi

### 6.5 Upscaling Workflows

**Yöntem 1: Basit Upscaler (ESRGAN, Real-ESRGAN, SwinIR)**
- Hızlı, yeni detay eklemez, 2x-4x büyütme

**Yöntem 2: SD Upscale (Tile ControlNet)**
- Parçalayıp SD ile yeniden üretir, yeni detay ekleyebilir
- Denoising 0.2-0.4

**Yöntem 3: Multi-Step Upscale**
```
1. txt2img ile native çözünürlük üret
2. ESRGAN ile 2x büyüt
3. img2img ile denoising 0.3'te detay ekle
4. Tile ControlNet ile final upscale
```

### 6.6 ComfyUI Workflow Önerileri

**Önerilen Temel Workflow'lar:**
1. txt2img + otomatik upscale
2. txt2img → img2img refine → inpaint düzeltme
3. ControlNet (pose/depth) → txt2img → upscale
4. IP-Adapter stil transferi pipeline'ı
5. Batch üretim + otomatik kalite filtreleme

---

## 7. 2025-2026 Güncel Trendler

### 7.1 Flux (Black Forest Labs)

Stability AI'ın eski kurucuları tarafından kurulan Black Forest Labs'in modeli, 2024'te yayınlandı.

**Versiyonlar:**
- **Flux.1 [schnell]:** 1-4 step, Apache 2.0, açık ağırlıklar
- **Flux.1 [dev]:** Daha kaliteli, açık ağırlıklar (non-commercial)
- **Flux.1 [pro]:** En yüksek kalite, yalnızca API
- **Flux.1 Tools:** Inpainting, outpainting, canny/depth ControlNet, Redux

**Öne Çıkan Özellikleri:**
- DiT mimarisi + T5-XXL text encoder ile güçlü metin anlama
- Metin render etmede sınıfının en iyilerinden
- Fotorealistik üretimde yüksek kalite
- schnell varyantı 1-4 adımda görsel üretebilir
- Hızla büyüyen LoRA ekosistemi

### 7.2 Stable Diffusion 3 / 3.5

- **SD3:** MMDiT mimarisi, üç text encoder (CLIP-L, CLIP-G, T5-XXL)
- **SD3.5:** Large (8B) ve Medium (2.6B) varyantları, Turbo versiyonları
- Topluluk karşılaması: Beklenen etkiyi tam yaratamadı, birçok kullanıcı Flux'a yöneldi

### 7.3 Consistency Models ve Distillation

1-4 adımda karşılaştırılabilir kalitede görsel üretmeyi hedefleyen yaklaşımlar:

- **LCM:** 4-8 adımda üretim, LCM-LoRA ile mevcut modellere uygulanabilir
- **SDXL Turbo / SD Turbo:** Adversarial distillation ile 1-4 adım
- **Flux.1 schnell:** Guidance distillation ile 1-4 adım

### 7.4 Gerçek Zamanlı Görsel Üretim

- **StreamDiffusion:** Pipeline optimizasyonu ile gerçek zamanlı streaming
- **TensorRT / ONNX:** SD/SDXL 2-5x hızlanma
- Canlı sahne stilize etme, interaktif çizim araçları

### 7.5 IP-Adapter ve Karakter Tutarlılığı

- IP-Adapter FaceID: Yüz kimliğini koruyarak farklı sahneler
- InstantID: Tek referans fotoyla yüz yakalama
- PhotoMaker: Çoklu referansla kişiselleştirilmiş üretim
- Midjourney --cref: Karakter referansı (v6)

---

## Model Karşılaştırma Matrisi

| Özellik | SD 1.5 | SDXL | SD3.5 | Flux | MJ v6 | DALL-E 3 | Firefly |
|---------|--------|------|-------|------|-------|----------|---------|
| Çözünürlük | 512 | 1024 | 1024 | 1024+ | 1024+ | 1024 | 2048 |
| Metin Render | Kötü | Zayıf | İyi | Çok İyi | İyi | Çok İyi | Orta |
| Fotorealizm | İyi* | Çok İyi | İyi | Çok İyi | İyi | İyi | İyi |
| Anatomik Doğruluk | Orta | İyi | Orta-İyi | Çok İyi | İyi | İyi | İyi |
| Hız | Hızlı | Orta | Orta | Hızlı** | Hızlı | Orta | Orta |
| Açık Kaynak | Evet | Evet | Evet | Kısmi | Hayır | Hayır | Hayır |
| LoRA Desteği | Geniş | Geniş | Sınırlı | Büyüyor | Hayır | Hayır | Hayır |
| ControlNet | Geniş | İyi | Sınırlı | Büyüyor | Sınırlı | Hayır | Sınırlı |
| VRAM İhtiyacı | 4GB+ | 8GB+ | 8GB+ | 12GB+ | — | — | — |
| Ticari Kullanım | Serbest | Serbest | Lisanslı | Kısmi | Ücretli | Ücretli | Güvenli |

*Checkpoint'a bağlı / **schnell varyantı

---

## İdeal Kullanım Senaryoları

| Senaryo | Önerilen Model | Neden |
|---------|---------------|-------|
| Hızlı konsept art | Midjourney veya DALL-E 3 | Kolay kullanım, hızlı sonuç |
| Fotorealistik portre | Flux dev/pro | En iyi anatomik doğruluk |
| Metin içeren görsel | Flux veya Ideogram | Güçlü metin render |
| Ticari pazarlama görseli | Adobe Firefly | Telif hakkı güvenli |
| Oyun asset üretimi | SD 1.5/SDXL + LoRA | Geniş ekosistem |
| Tutarlı karakter serisi | Flux + IP-Adapter veya MJ --cref | Karakter tutarlılığı |
| Mimari görselleştirme | SDXL + ControlNet Depth | Yapısal kontrol |
| Ürün fotoğrafı | Flux veya DALL-E 3 | Gerçekçi nesne render |
| Anime/manga stili | SDXL + anime checkpoint | Özelleştirilmiş stiller |
| Batch üretim | SD/SDXL + ComfyUI | Otomasyon, maliyet kontrolü |

---

## Kaynaklar

1. Stability AI resmi dokümantasyonu
2. Black Forest Labs (Flux) teknik raporları
3. OpenAI DALL-E 3 teknik raporu
4. Midjourney resmi dokümantasyonu
5. Ho et al., 2020 — "Denoising Diffusion Probabilistic Models"
6. Rombach et al., 2022 — "High-Resolution Image Synthesis with Latent Diffusion Models"
7. Zhang et al., 2023 — "Adding Conditional Control to Text-to-Image Diffusion Models" (ControlNet)
8. Ye et al., 2023 — "IP-Adapter: Text Compatible Image Prompt Adapter"
9. Luo et al., 2023 — "Latent Consistency Models"
10. Esser et al., 2024 — "Scaling Rectified Flow Transformers" (SD3)
