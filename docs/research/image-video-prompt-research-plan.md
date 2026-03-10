# Görsel & Video AI Prompt Mühendisliği — Araştırma Planı

## Proje Bağlamı

**Proje**: Prompt Generator — kullanıcıların AI görsel/video üretim modelleri için profesyonel promptlar oluşturmasına yardımcı olan bir web uygulaması.

**Problem**: Kullanıcıların çoğu:
- Kafasındaki fikri modele uygun kelimelere dökemiyor
- Hangi teknik terimlerin (bokeh, volumetric lighting, chiaroscuro) ne işe yaradığını bilmiyor
- Model-spesifik prompt formatlarını tanımıyor
- Deneme-yanılma ile zaman kaybediyor
- Sonuçları iteratif olarak nasıl iyileştireceğini bilmiyor

**Çözüm Yaklaşımı**: Claude Code benzeri bir UX ile kullanıcıya adım adım rehberlik — her adımda 3-4 seçenek sunma + serbest yazma seçeneği. Agent sorular sorar, kullanıcı seçer veya yazar, agent bunları birleştirip modele özel optimize prompt üretir.

**Hedef Modeller (Görsel)**: Nano Banana Pro (Gemini Imagen), Seedream 5.0/4.5, Imagen 4, Flux 2, GPT Image-1, Recraft V3, Leonardo Phoenix/Kino XL, Ideogram 3
**Hedef Modeller (Video)**: Kling 3.0/2.6, Seedance 2.0, Sora 2, Veo 3.1, WAN 2.5, MiniMax, Higgsfield

---

## Araştırma Bölümleri

### BÖLÜM 1: Model-Spesifik Prompt Yapıları

Her hedef model için aşağıdaki bilgileri topla:

#### 1A. Görsel Modeller

**Her model için:**
- Resmi prompt rehberi/dokümantasyon linki
- Önerilen prompt yapısı/formatı (sıralama önemli mi?)
- Desteklenen parametreler (aspect ratio, CFG, steps, seed)
- Maksimum prompt uzunluğu (token/karakter)
- Negative prompt desteği var mı? Nasıl kullanılır?
- Model hangi konularda güçlü? (portre, manzara, ürün, metin render, vb.)
- Model hangi konularda zayıf? (eller, yazı, tutarlılık, vb.)
- En iyi sonuç veren 3-5 örnek prompt (test edilmiş, kaynağı belli)

**Araştırılacak modeller:**

1. **Nano Banana Pro (Lovart/Gemini Imagen tabanlı)**
   - Google'ın Imagen altyapısı mı kullanıyor?
   - 5 bileşenli prompt yapısı: Style → Subject → Setting → Action → Composition
   - Metin render kapabilitesi nasıl?
   - Referans görsel desteği var mı, nasıl kullanılır?

2. **Seedream 5.0 / 4.5 (ByteDance)**
   - ByteDance'in resmi prompt rehberi
   - Ticari fotoğraf ve ürün görselleri için özel teknikler
   - 4K çıktı için prompt farklılıkları
   - 14 referans görsel desteği nasıl kullanılır?

3. **Imagen 4 (Google DeepMind)**
   - Imagen 3'ten farkları
   - Google'ın resmi prompt best practices
   - Photorealistic vs artistic output tercihleri
   - Safety filter'ları ve kısıtlamaları

4. **Flux 2 (Black Forest Labs)**
   - JSON prompting vs doğal dil — hangisi daha etkili?
   - CFG scale etkisi (3.5-7.5 aralığı)
   - Prompt expansion özelliği nasıl çalışır?
   - Grafik tasarım ve tipografi prompt teknikleri

5. **GPT Image-1 (OpenAI / DALL-E successor)**
   - OpenAI'ın resmi prompt guide'ı
   - Metin render kapabilitesi (en güçlü yanı)
   - Inpainting/editing prompt formatı
   - Stil tutarlılığı teknikleri

6. **Recraft V3**
   - "A <style> of <content>. <details>. <background>." format kuralı
   - Vektörel/SVG çıktı için özel prompt teknikleri
   - Tipografi ve marka tutarlılığı
   - Style token sistemi

7. **Leonardo Phoenix / Kino XL**
   - Alchemy modifikatörleri nasıl çalışır?
   - PhotoReal vs Alchemy ayrımı
   - Negatif prompt şablonları
   - Sinematik prompt teknikleri (Kino XL)

8. **Ideogram 3**
   - Tipografi-odaklı prompt yapısı
   - Grafik tasarım ve poster prompt örnekleri
   - Metin render doğruluğu için ipuçları

#### 1B. Video Modeller

**Her model için:**
- Resmi prompt rehberi
- Text-to-video vs Image-to-video prompt farkları
- Kamera hareketi nasıl tanımlanır? (prompt içinde mi, parametre mi?)
- Süre ve çözünürlük prompt'u etkiler mi?
- Karakter tutarlılığı teknikleri
- Sahneler arası geçiş prompt teknikleri
- En iyi 3-5 örnek prompt

**Araştırılacak modeller:**

1. **Kling 3.0 / 2.6 (Kuaishou)**
   - 20+ kamera preset'i nasıl kullanılır?
   - Kamera hareketi + karakter hareketi çakışma sorunu
   - 4K ve 60fps için prompt farklılıkları
   - Image-to-video referans kullanımı

2. **Seedance 2.0 (ByteDance)**
   - Dans ve hareket odaklı video prompt yapısı
   - Karakter tutarlılığı teknikleri
   - Müzik/ritim senkronizasyonu prompt'ta nasıl?

3. **Sora 2 (OpenAI)**
   - OpenAI'ın resmi video prompt rehberi
   - Sinematik dil kullanımı
   - Uzun açıklama vs kısa prompt karşılaştırması
   - Fizik simülasyonu ve gerçekçilik ipuçları

4. **Veo 3.1 (Google DeepMind)**
   - Google'ın video prompt best practices
   - Ses/diyalog desteği prompt'ta nasıl belirtilir?
   - Photorealistic video için teknikler

5. **WAN 2.5 (Alibaba)**
   - Karakter animasyonu prompt teknikleri
   - Dans ve hareket videoları
   - Kısa format (5-10s) optimizasyonu

6. **MiniMax**
   - Hızlı üretim için optimize prompt yapısı
   - Animasyon ve sinematik stil farkları

---

### BÖLÜM 2: Evrensel Prompt Mühendisliği Prensipleri

Model-bağımsız, tüm görsel/video AI'lar için geçerli temel bilgiler:

#### 2A. Prompt Anatomisi — Görsel

1. **Konu tanımı (Subject)**: Ana özne nasıl tanımlanmalı?
   - İnsan tanımı: yaş, cinsiyet, saç, ten rengi, ifade, poz, giyim
   - Nesne tanımı: materyal, boyut, renk, durum
   - Ortam tanımı: mekan, zaman, hava durumu

2. **Stil ve Medium**:
   - Sanat stilleri taksonomisi (fotorealistik, illüstrasyon, anime, vektör, pixel art, suluboya, yağlıboya, dijital art, 3D render, isometric, vb.)
   - Medium terimleri (oil painting, watercolor, charcoal, digital art, photograph, vb.)
   - Sanatçı referansları kullanımı (etik sınırlar)

3. **Kompozisyon ve Kamera**:
   - Çekim ölçekleri (extreme close-up, close-up, medium shot, full shot, wide shot, aerial)
   - Kamera açıları (eye level, low angle, high angle, bird's eye, worm's eye, dutch angle)
   - Perspektif (one-point, two-point, isometric, fisheye)
   - Derinlik (shallow/deep depth of field, bokeh, tilt-shift)

4. **Aydınlatma**:
   - Doğal ışık terimleri (golden hour, blue hour, overcast, harsh noon, dappled light)
   - Stüdyo ışık teknikleri (Rembrandt, butterfly, rim, backlighting, key light, fill)
   - Atmosferik (volumetric, god rays, neon, bioluminescent)
   - Renk sıcaklığı (warm, cool, tungsten, daylight)

5. **Renk ve Atmosfer**:
   - Renk paleti tanımlamaları (muted, vibrant, pastel, monochromatic, complementary)
   - Mood terimleri (ethereal, gritty, dreamy, nostalgic, dystopian, serene)
   - Renk grading terimleri (cinematic, film noir, vintage, cross-processed)

6. **Kalite Modifikatörleri**:
   - Hangi kalite terimleri gerçekten işe yarıyor? (highly detailed, 8K, masterpiece, best quality)
   - Hangileri placebo? (araştırmalara dayalı)
   - Model-spesifik kalite terimleri

#### 2B. Prompt Anatomisi — Video

1. **Sahne tanımı**: Statik kareden farklı olarak hareket nasıl tanımlanır?
2. **Temporal yapı**: Başlangıç → gelişme → bitiş nasıl anlatılır?
3. **Kamera hareketi terimleri**: Pan, tilt, dolly, crane, orbit, zoom, rack focus, whip pan, steadicam
4. **Karakter hareketi**: Yürüme, koşma, dans, jest, mimik nasıl tanımlanır?
5. **Geçişler**: Sahne geçişleri prompt'ta nasıl belirtilir?
6. **Ses/Atmosfer**: Bazı modeller ses tanımı da destekliyor (Veo 3.1)

#### 2C. Negative Prompt Stratejileri

- Negatif prompt ne zaman kullanılmalı, ne zaman gereksiz?
- En etkili negatif prompt terimleri (araştırmalara dayalı)
- Model bazlı negatif prompt şablonları
- Yaygın hatalar ve çözümleri (bad hands, extra fingers, blurry, vb.)

---

### BÖLÜM 3: Kullanıcı Deneyimi ve Rehberlik Sistemi

Bu bölüm uygulamanın UX tasarımını besleyecek:

#### 3A. Seçenek-Tabanlı Keşif Sistemi

Kullanıcıya her adımda 3-4 seçenek + "Kendi cümleni yaz" seçeneği sunulacak. Araştır:

1. **Adım bazlı keşif akışı ne olmalı?**
   - Mevcut: Serbest konuşma (agent soru sorar, kullanıcı yazar)
   - Hedef: Yapılandırılmış seçenekler (Claude Code tarzı buton seçenekleri)
   - Her adımda kaç seçenek ideal? (araştırma: decision fatigue, choice overload)
   - Seçenekler nasıl gruplanmalı?

2. **Görsel prompt için ideal adım sırası:**
   - Ana konu → Stil → Atmosfer → Teknik → Detay → Onay?
   - Yoksa daha iyi bir sıralama var mı?
   - Kaç adımda tamamlanmalı? (çok kısa: yetersiz, çok uzun: bıktırıcı)

3. **Video prompt için ideal adım sırası:**
   - Sahne → Hareket → Kamera → Atmosfer → Süre → Onay?

4. **Akıllı varsayılanlar (smart defaults)**:
   - Kullanıcı bir şey seçmezse ne kullanılmalı?
   - Stile göre otomatik varsayılan ışık/renk önerileri
   - Modele göre en iyi çalışan default parametreler

#### 3B. Iterasyon ve Feedback Döngüsü

1. **İlk prompt sonrası ne olmalı?**
   - "Bu prompt iyi mi?" → evet/hayır çok basit
   - Boyut-bazlı feedback: "Stili beğendin mi? Aydınlatmayı değiştirmek ister misin?"
   - A/B varyasyonlar: "İşte 2 farklı yaklaşım, hangisi daha yakın?"

2. **Prompt iterasyonu için en etkili yöntemler:**
   - Tek seferde tam prompt mu, parça parça mı iyileştirmek daha iyi?
   - Kullanıcı "daha sıcak", "daha dramatik" dediğinde hangi terimler eklenmeli?
   - Doğal dil → teknik terim çevirisi nasıl yapılmalı?

3. **Otomatik değerlendirme kriterleri:**
   - Prompt kalitesi nasıl ölçülür? (mevcut: 0-1 score + boyutlar)
   - Hangi boyutlar gerçekten önemli?
   - Otomatik iyileştirme önerileri nasıl sunulmalı?

#### 3C. Destekleyici Özellikler

Araştır ve değerlendir:

1. **Görsel referans analizi (Image-to-Prompt)**
   - Kullanıcı referans görsel yüklediğinde otomatik analiz
   - "Bu görsele benzer ama [X değişiklik] ile" tarzı prompt üretimi
   - Stil transfer teknikleri

2. **Prompt kütüphanesi / şablonlar**
   - Kategorize edilmiş hazır prompt şablonları
   - Topluluk paylaşımlı promptlar
   - "Bu tarz bir şey istiyorum" → en yakın şablon önerisi

3. **Terim sözlüğü / eğitim**
   - Hover ile terim açıklaması
   - "Bu ne demek?" butonu
   - Görsel örneklerle terim karşılaştırması (bokeh vs sharp, warm vs cool)

4. **Prompt karşılaştırma**
   - İki prompt yan yana karşılaştırma
   - Fark analizi (ne değişti, ne eklendi)
   - Versiyon geçmişi

5. **Mood board / kolaj oluşturucu**
   - Birden fazla referans görsel → ortak stil çıkarımı
   - Renk paleti çıkarma
   - Stil DNA analizi

6. **Doğal dil → teknik çeviri**
   - "Nostaljik hissi olan bir fotoğraf" → "warm tones, film grain, soft focus, vintage color grading, golden hour, slightly faded"
   - Kullanıcının günlük dilini teknik terime çevirme sözlüğü

---

### BÖLÜM 4: Rekabet ve Pazar Analizi

1. **Mevcut prompt helper araçları:**
   - PromptHero, Lexica, Civitai, PromptBase
   - MidJourney'nin kendi prompt yapısı ve /describe komutu
   - Leonardo AI'ın prompt generator'ı
   - Runway ML'in prompt assist özelliği

2. **Bunların güçlü ve zayıf yanları nedir?**
   - Hangi UX patternleri işe yarıyor?
   - Kullanıcılar en çok neden şikayet ediyor?
   - Bizim farkımız ne olabilir?

3. **Topluluk kaynaklı prompt mühendisliği bilgisi:**
   - Reddit r/StableDiffusion, r/midjourney prompt tartışmaları
   - Discord topluluk prompt teknikleri
   - YouTube prompt engineering tutorial'ları — en çok izlenen teknikler

---

### BÖLÜM 5: Test Edilmiş Prompt Şemaları / Templates

Her kategori için test edilmiş, formüle edilmiş şema örnekleri topla:

#### 5A. Görsel Prompt Şemaları

1. **Portre / Karakter**
```
[Medium/Style], [Subject description with features], [Clothing/accessories],
[Expression/pose], [Setting/background], [Lighting], [Camera angle/lens],
[Mood/atmosphere], [Quality modifiers]
```

2. **Manzara / Ortam**
```
[Style], [Time of day/season], [Location type], [Foreground elements],
[Middle ground], [Background], [Weather/atmosphere], [Lighting],
[Color palette], [Quality modifiers]
```

3. **Ürün / Ticari Fotoğraf**
```
[Product description], [Surface/backdrop], [Lighting setup],
[Angle], [Props/context], [Brand aesthetic], [Quality modifiers]
```

4. **Konsept Art / Fantezi**
5. **Logo / Grafik Tasarım**
6. **İnfografik / UI Mockup**

#### 5B. Video Prompt Şemaları

1. **Sinematik Sahne**
```
[Camera movement], [Subject action], [Setting], [Time],
[Lighting], [Mood], [Speed], [Style]
```

2. **Ürün Tanıtım**
3. **Karakter Animasyonu**
4. **Doğa / Manzara**
5. **Sosyal Medya (Kısa Format)**

---

## Araştırma Çıktı Formatı

Her bölüm için şu formatta çıktı bekliyorum:

```
## [Model/Konu Adı]

### Resmi Kaynaklar
- [Link 1]: Açıklama
- [Link 2]: Açıklama

### Temel Bulgular
1. ...
2. ...

### Prompt Yapısı
[Açıklama + format]

### Test Edilmiş Örnekler
1. Prompt: "..."
   - Sonuç: [açıklama]
   - Kaynak: [link]

2. Prompt: "..."
   - Sonuç: [açıklama]
   - Kaynak: [link]

### Dikkat Edilmesi Gerekenler
- ...

### Bizim Uygulamamız İçin Öneri
- ...
```

---

## Öncelik Sırası

| Öncelik | Bölüm | Neden |
|---------|-------|-------|
| 1 | Bölüm 2A-2B (Evrensel prensipler) | Tüm modeller için temel oluşturur |
| 2 | Bölüm 1A (Görsel model-spesifik) | En çok kullanılan modeller |
| 3 | Bölüm 3A (Seçenek sistemi UX) | Kullanıcı deneyiminin çekirdeği |
| 4 | Bölüm 5 (Şablonlar) | Hemen uygulanabilir çıktılar |
| 5 | Bölüm 1B (Video model-spesifik) | Video modeller daha yeni |
| 6 | Bölüm 3B-3C (İterasyon + özellikler) | İkinci faz geliştirme |
| 7 | Bölüm 4 (Rekabet analizi) | Stratejik karar desteği |

---

## Gemini DeepSearch İçin Sorgu Önerileri

Aşağıdaki sorguları sırayla kullanabilirsin:

### Görsel Modeller
1. "Nano Banana Pro prompt engineering guide best practices 2025 2026"
2. "Seedream 5.0 ByteDance prompt format examples commercial photography"
3. "Google Imagen 4 prompt best practices official documentation"
4. "Flux 2 Black Forest Labs prompt engineering JSON vs natural language"
5. "GPT Image-1 OpenAI prompt guide text rendering tips"
6. "Recraft V3 prompt structure style tokens vector illustration"
7. "Leonardo AI Phoenix Alchemy prompt modifiers quality"
8. "Ideogram 3 typography prompt engineering techniques"

### Video Modeller
9. "Kling 3.0 video prompt engineering camera movement presets"
10. "Seedance 2.0 ByteDance dance animation video prompt"
11. "OpenAI Sora 2 video prompt best practices examples"
12. "Google Veo 3.1 video prompt guide audio support"
13. "WAN 2.5 Alibaba character animation video prompt"

### Genel
14. "AI image prompt engineering anatomy structure 2025 best practices"
15. "negative prompt techniques effective terms stable diffusion flux"
16. "AI prompt helper tool UX design patterns choice-based interface"
17. "image-to-prompt reverse engineering AI tools comparison"
18. "AI video prompt engineering temporal structure scene description"

### Topluluk Kaynakları
19. "site:reddit.com prompt engineering tips image generation 2025"
20. "AI prompt template library categorized examples photography illustration"
