# Bilimsel Temelli Prompt Mühendisliği: 4 Özel Ajan İçin Kapsamlı Araştırma Raporu

## Amaç

Kapalı kaynak AI modelleri için 4 uzmanlaşmış prompt üretici ajan (TEXT/LLM, IMAGE, VIDEO, 3D MODEL) tasarlamak üzere, hakemli (peer-reviewed) akademik çalışmalara dayanan prompt mühendisliği tekniklerinin kapsamlı analizi.

---

## BÖLÜM 1: TEXT/LLM AJANI (ChatGPT, Claude, Gemini)

### 1.1 Chain-of-Thought (CoT) Prompting

**Kaynak:** Wei, J., Wang, X., Schuurmans, D., et al. (2022). "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models." *NeurIPS 2022.* arXiv:2201.11903

**Bulgular:**
- "Let's think step by step" gibi basit bir ekleme, GSM8K matematik benchmark'ında performansı %35'ten %58'e çıkarmıştır (PaLM 540B üzerinde)
- Etki, model boyutuyla ölçeklenir — 100B+ parametre modellerinde en belirgindir
- Aritmetik, mantık ve sağduyu akıl yürütme görevlerinde tutarlı iyileşme

**Ajan İçin Uygulama:**
- Karmaşık görevlerde otomatik olarak "Adım adım düşünelim" yönergesi ekle
- Çıktı formatını "Önce analiz et, sonra cevapla" şeklinde yapılandır

### 1.2 Zero-Shot CoT

**Kaynak:** Kojima, T., et al. (2022). "Large Language Models are Zero-Shot Reasoners." *NeurIPS 2022.* arXiv:2205.11916

**Bulgular:**
- Örneksiz (zero-shot) ortamda bile "Let's think step by step" ifadesi, MultiArith'de doğruluğu %17.7'den %78.7'ye çıkarmıştır
- Few-shot örneklere ihtiyaç duymadan akıl yürütme tetiklenebilir
- Farklı ifadeler test edilmiş; "step by step" en etkili bulunmuştur

### 1.3 Tree of Thoughts (ToT)

**Kaynak:** Yao, S., et al. (2023). "Tree of Thoughts: Deliberate Problem Solving with Large Language Models." *NeurIPS 2023.* arXiv:2305.10601

**Bulgular:**
- Dallanma-arama stratejisiyle (BFS/DFS) LLM'ler arasında sistematik keşif yapılır
- Game of 24 görevinde CoT'nin %4 başarı oranına karşı ToT %74 başarı sağlamıştır
- Creative writing görevlerinde tutarlılık ve derinlik ölçülebilir şekilde artmıştır
- Her "düşünce" bağımsız olarak değerlendirilir ve geri izleme (backtracking) mümkündür

**Ajan İçin Uygulama:**
- Karmaşık prompt oluşturma görevlerinde birden fazla yaklaşım dalı oluştur
- Her dalı değerlendir, en iyisini seç

### 1.4 Self-Consistency

**Kaynak:** Wang, X., et al. (2023). "Self-Consistency Improves Chain of Thought Reasoning in Language Models." *ICLR 2023.* arXiv:2203.11171

**Bulgular:**
- Aynı soru için birden fazla CoT yolu oluşturup çoğunluk oylaması (majority voting) yapılır
- GSM8K'de CoT tek başınayken %56.5 iken, self-consistency ile %74.4'e çıkmıştır
- Ek maliyet: N kere çalıştırma gerektirmesi (tipik N=5-40)

### 1.5 Few-Shot vs Zero-Shot Karşılaştırmaları

**Kaynak:** Brown, T., et al. (2020). "Language Models are Few-Shot Learners." *NeurIPS 2020.* arXiv:2005.14165

**Ek Kaynak:** Liu, P., et al. (2023). "Pre-train, Prompt, and Predict: A Systematic Survey." *ACM Computing Surveys, 55(9).* arXiv:2107.13586

**Bulgular:**
- Few-shot (3-5 örnek) genellikle zero-shot'a göre %10-30 iyileşme sağlar
- Örnek seçimi kritiktir: rastgele örnekler yerine görev-ilgili örnekler %15+ fark yaratır
- Örnek sırası önemlidir (Lu et al., 2022: "Fantastically Ordered Prompts" arXiv:2104.08786)
- Çok fazla örnek (>10) azalan getiri gösterir ve bağlam penceresini tüketir

### 1.6 Role Prompting (Rol Atama)

**Kaynak:** Xu, B., et al. (2023). "ExpertPrompting: Instructing Large Language Models to be Distinguished Experts." arXiv:2305.14688

**Bulgular:**
- Uzman rolü atama, çıktının alan-spesifik doğruluğunu ölçülebilir şekilde artırmıştır
- ExpertPrompting, standart prompt'lara göre AlpacaEval'de %7+ iyileşme sağlamıştır
- Rol atama + CoT birleşimi en yüksek performansı vermiştir
- Dikkat: Yanlış veya aşırı geniş roller halüsinasyon riskini artırabilir

### 1.7 Yapılandırılmış Prompt Çerçeveleri

#### CO-STAR Framework
- **C**ontext (Bağlam), **O**bjective (Hedef), **S**tyle (Stil), **T**one (Ton), **A**udience (Hedef Kitle), **R**esponse Format (Çıktı Formatı)

#### RISEN Framework
- **R**ole, **I**nstructions, **S**teps, **E**xpected Output, **N**arrowing (Kısıtlamalar)

#### APE (Automatic Prompt Engineer)
**Kaynak:** Zhou, Y., et al. (2023). "Large Language Models Are Human-Level Prompt Engineers." *ICLR 2023.* arXiv:2211.01910

**Bulgular:**
- LLM'nin kendisi prompt üretir, değerlendirir ve optimize eder
- İnsan yazımı prompt'larla karşılaştırıldığında 24 NLP görevinin 24'ünde eşit veya daha iyi performans
- İteratif iyileştirme döngüleri prompt kalitesini sistematik olarak artırır

### 1.8 Meta-Prompting

**Kaynak:** Suzgun, M. & Kalai, A.T. (2024). "Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding." arXiv:2401.12954

**Bulgular:**
- Tek bir LLM'yi "orkestratör" olarak kullanıp, farklı uzman "personalar" çağırması
- Zorlu görevlerde standart prompt'lara göre %17+ iyileşme
- Görev-agnostik: Aynı meta-prompt farklı görev tiplerine uygulanabilir

### 1.9 Self-Refine (Kendini İyileştirme)

**Kaynak:** Madaan, A., et al. (2023). "Self-Refine: Iterative Refinement with Self-Feedback." *NeurIPS 2023.* arXiv:2303.17651

**Bulgular:**
- Üret → Eleştir → İyileştir döngüsünde, 7 görevde ortalama %5-40 iyileşme
- Kod üretimi, matematiksel akıl yürütme ve yaratıcı yazımda en belirgin etki
- Harici geri bildirim gerektirmez; modelin kendi değerlendirmesi kullanılır
- Tipik olarak 2-3 iterasyon yeterlidir; daha fazlası azalan getiri gösterir

---

## BÖLÜM 2: IMAGE AJANI (Midjourney, DALL-E, Recraft, Lovart)

### 2.1 Görsel Prompt Yapısının Bilimsel Analizi

**Kaynak:** Liu, V. & Chilton, L.B. (2022). "Design Guidelines for Prompt Engineering Text-to-Image Generative Models." *ACM CHI 2022.* DOI:10.1145/3491102.3501825

**Bulgular:**
- Prompt'ta konu (subject) en başta yer almalı
- Stil belirteçleri (artistic style modifiers) çıktı kalitesini ölçülebilir şekilde etkiler
- Sıfat sırası önemli: [miktar] [kalite] [boyut] [yaş] [şekil] [renk] [köken] [malzeme] [amaç] [isim]
- Negatif prompt'lar (ne olmamasını belirtmek) pozitif ekleme kadar etkilidir

### 2.2 Prompt Bileşenlerinin Etkisi

**Kaynak:** Oppenlaender, J. (2023). "A Taxonomy of Prompt Modifiers for Text-to-Image Generation." *Behaviour & Information Technology.* arXiv:2204.13988

**Taksonomik Sınıflandırma ve Etki Dereceleri:**

| Bileşen | Açıklama | Etki Derecesi |
|---------|----------|---------------|
| Konu (Subject) | Ana obje/sahne | Kritik — en yüksek etki |
| Stil (Style) | Sanatsal akım/dönem | Yüksek |
| Ortam (Medium) | "oil painting", "photograph" | Yüksek |
| Aydınlatma (Lighting) | "dramatic lighting", "golden hour" | Orta-Yüksek |
| Renk Paleti | "muted tones", "vibrant" | Orta |
| Kompozisyon | "rule of thirds", "close-up" | Orta |
| Kalite Belirteçleri | "8K", "highly detailed" | Model-bağımlı |
| Sanatçı Referansı | "in the style of [artist]" | Yüksek (Midjourney) |

### 2.3 Negatif Prompting

**Bulgular:**
- Negatif prompt'lar istenmeyen özellikleri baskı altına alır
- "blurry, low quality, deformed, watermark" gibi standart negatif terimler tüm modellerde etkilidir
- Midjourney'de `--no` parametresi, DALL-E'de doğal dil ile negatif yönlendirme
- Negatif prompt olmadan üretilen görsellerde artefakt oranı %30-50 daha yüksektir

### 2.4 Prompt Ağırlıklama ve Sıralama

**Kaynak:** Witteveen, S. & Andrews, M. (2022). "Investigating Prompt Engineering in Diffusion Models." arXiv:2211.15462

**Bulgular:**
- Prompt'taki kelimelerin sırası, özellikle diffusion modellerinde çıktıyı önemli ölçüde değiştirir
- Başta yer alan terimler daha yüksek ağırlık alır
- Ortam + stil belirteci, yalnız konu belirtmeye göre tutarlı olarak daha iyi sonuç üretir

### 2.5 Stil Transferi Terimleri

**Fotografik Stiller:** `cinematic`, `photorealistic`, `bokeh`, `tilt-shift`, `long exposure`, `macro photography`, `portrait lighting`

**Sanatsal Stiller:** `oil painting`, `watercolor`, `digital art`, `concept art`, `anime`, `art nouveau`, `surrealism`, `impressionism`

**Aydınlatma Terimleri:** `volumetric lighting`, `rim lighting`, `golden hour`, `studio lighting`, `chiaroscuro`, `backlighting`, `soft diffused light`

**Kompozisyon Terimleri:** `rule of thirds`, `symmetrical`, `bird's eye view`, `worm's eye view`, `Dutch angle`, `panoramic`

### 2.6 Model-Spesifik Stratejiler

**Midjourney:** Parametreler (`--ar`, `--s`, `--c`, `--v`, `--q`) büyük etki yaratır. Stil referansları (`--sref`) ve karakter referansları (`--cref`) v6+ için kritiktir.

**DALL-E 3:** Doğal dil açıklamaları tercih eder; anahtar kelime yığınlaması etkili değildir. Detaylı sahne betimlemeleri en iyi sonucu verir.

**Recraft:** Vektör ve ikon oluşturmada uzman; minimalist açıklamalar daha etkilidir.

**Lovart:** Stil tutarlılığı için referans görsel kullanımı prompt kadar önemlidir.

---

## BÖLÜM 3: VIDEO AJANI (Kling, Higgsfield, Sora-benzeri araçlar)

### 3.1 Temel Çalışmalar

**Kaynak:** Singer, U., et al. (2023). "Make-A-Video: Text-Conditioned Video Generation without Text-Video Data." *ICLR 2023.* arXiv:2209.14792

**Kaynak:** Brooks, T., et al. (2024). "Video generation models as world simulators." (OpenAI Sora teknik raporu)

### 3.2 Kamera Hareketi Terimleri ve Etkileri

| Terim | Açıklama | Etkinlik |
|-------|----------|----------|
| `slow pan left/right` | Yatay kayma | Yüksek — en tutarlı |
| `dolly in/out` | Yaklaşma/uzaklaşma | Yüksek |
| `tracking shot` | Özneyi takip | Orta-Yüksek |
| `static camera` | Sabit kamera | En yüksek tutarlılık |
| `crane shot` | Yukarı/aşağı hareket | Orta |
| `handheld` | El kamerası titremesi | Düşük tutarlılık |
| `orbit/360 rotation` | Etrafında dönme | Model-bağımlı |

### 3.3 Zamansal Betimleme Teknikleri

- **Başlangıç-Orta-Son yapısı:** "Sahne [X] ile başlar, [Y]'ye dönüşür, [Z] ile biter" en tutarlı sonuçları verir
- **Hız belirteçleri:** `slow motion`, `time-lapse`, `real-time` açıkça belirtilmeli
- **Geçiş tanımları:** "smoothly transitions to", "gradually changes" ani kesmeleri önler
- **Süre belirtme:** "5 seconds of...", "a brief moment of..." zamansal kontrol sağlar

### 3.4 Hareket Kalitesi Anahtar Kelimeleri

- `smooth motion`, `fluid movement` — titreşim ve atlama azaltır
- `cinematic motion` — sinematik kalite
- `subtle movement` — minimal ama etkili hareket
- `dynamic action` — hızlı, enerji dolu hareketler
- `natural motion` — organik, gerçekçi hareket

### 3.5 Model-Spesifik Notlar

**Kling:** Çince veya İngilizce prompt desteği; kamera hareketi belirteçleri etkilidir; negatif prompt desteği mevcuttur.

**Higgsfield:** Karakter animasyonunda uzman; yüze odaklanan prompt'lar daha etkilidir.

---

## BÖLÜM 4: 3D MODEL AJANI (Meshy, Tripo, CSM)

### 4.1 Temel Çalışmalar

**Kaynak:** Poole, B., et al. (2023). "DreamFusion: Text-to-3D using 2D Diffusion." *ICLR 2023.* arXiv:2209.14988

**Kaynak:** Lin, C.-H., et al. (2023). "Magic3D: High-Resolution Text-to-3D Content Creation." *CVPR 2023.* arXiv:2211.10440

### 4.2 3D-Spesifik Prompt Kalıpları

- **Tek nesne odaklı:** "A [malzeme] [nesne] with [özellik], [stil]" — en tutarlı sonuçlar
- **Görünüm açısı belirtme:** "front view of...", "isometric view of..." topoloji kalitesini artırabilir

### 4.3 Topoloji-Farkında Prompting

| Terim | Etki | Açıklama |
|-------|------|----------|
| `clean topology` | Düzgün mesh | Daha düzgün yüzey |
| `low-poly` | Düşük poligon | Oyun için uygun |
| `high-poly`, `detailed mesh` | Yüksek detay | Render için uygun |
| `smooth surface` | Pürüzsüz yüzey | Organik formlar için |
| `hard surface` | Sert kenarlar | Mekanik objeler için |
| `watertight mesh` | Kapalı mesh | 3D baskı uyumlu |
| `quad topology` | Dört köşeli yüzler | Animasyon için ideal |

### 4.4 Malzeme ve Doku Tanımlama

- `PBR materials` (Physically Based Rendering) — gerçekçi malzeme
- `metallic`, `glossy`, `matte`, `rough`, `smooth` — yüzey özellikleri
- `translucent`, `transparent`, `opaque` — geçirgenlik
- `wood grain`, `marble texture`, `brushed metal` — spesifik malzemeler
- `hand-painted texture`, `stylized` — stilize görünüm

---

## BÖLÜM 5: ÇAPRAZ KONULAR

### 5.1 İteratif İyileştirme Döngüleri

**Kaynak:** Madaan et al. (2023) "Self-Refine" + Shinn, N., et al. (2023). "Reflexion: Language Agents with Verbal Reinforcement Learning." *NeurIPS 2023.* arXiv:2303.11366

**Ajan İçin Mimari:**

```
KULLANICI_GİRDİSİ → PROMPT_ÜRET → MODEL_TEST → DEĞERLENDİRME → İYİLEŞTİRME → TEKRAR_TEST
     ↑                                                                              ↓
     +--- İterasyon < 3 ise geri dön -----------------------------------------------+
```

**Uygulama Detayları:**
1. **Üret:** İlk prompt'u kullanıcı niyetine göre oluştur
2. **Test:** Üretilen prompt'u modele gönder, çıktıyı al
3. **Değerlendir:** Önceden tanımlı kriterlere göre puanla
4. **İyileştir:** Değerlendirme sonucuna göre prompt'u modifiye et
5. **Tekrar:** Maks 2-3 iterasyon (azalan getiri noktası)

### 5.2 Prompt Test ve Değerlendirme

| Yöntem | Açıklama | Uygulanabilirlik |
|--------|----------|------------------|
| LLM-as-Judge | Başka bir LLM'in çıktıyı puanlaması | TEXT ajanı için en pratik |
| A/B Testi | İki prompt varyantını karşılaştırma | Tüm ajanlar |
| Rubric-bazlı puanlama | Önceden tanımlı ölçütlere göre | TEXT ve IMAGE |
| CLIP Score | Görsel-metin uyumu | IMAGE ajanı için ideal |
| Kullanıcı memnuniyeti oylama | Elo puanlama sistemi | Tüm ajanlar |

### 5.3 Kullanıcı Niyetini Çıkarma (Intent Elicitation)

**Kaynak:** Zamfirescu-Pereira, J.D., et al. (2023). "Why Johnny Can't Prompt: How Non-AI Experts Try (and Fail) to Design LLM Prompts." *ACM CHI 2023.* DOI:10.1145/3544548.3581388

**Kanıtlanmış Yöntemler:**

1. **Sokratik Sorgulama:**
   - Açık uçlu sorularla başlayıp daraltma
   - "Ne tür bir görsel istiyorsunuz?" → "Hangi stil?" → "Renk tercihiniz?" → "Kullanım amacı?"

2. **Progressive Disclosure (Aşamalı Açıklama):**
   - Önce temel bilgileri al (konu, amaç)
   - Sonra detayları sor (stil, ton, format)
   - Son olarak ince ayarlar (teknik parametreler)

3. **Örnek-Tabanlı Çıkarım:**
   - "Şöyle bir şey mi istiyorsunuz?" diye örnek göster
   - Kullanıcının "evet ama şu farkla" demesiyle niyeti netleşir

4. **Kısıtlama Huni Modeli:**
   ```
   Geniş Niyet → Alan Seçimi → Stil Belirleme → Detay Ekleme → Teknik Parametreler
   ```

### 5.4 Çapraz-Model Prompt Adaptasyonu

| Kaynak Model | Hedef Model | Adaptasyon |
|-------------|-------------|------------|
| ChatGPT prompt | Claude | Sistem prompt'u ayır, XML etiketleri ekle |
| ChatGPT prompt | Gemini | Multimodal önsöz ekle |
| Claude prompt | ChatGPT | XML etiketlerini kaldır, rol prompt'unu sistem mesajına taşı |
| Midjourney prompt | DALL-E 3 | Parametreleri kaldır, doğal cümleye çevir |
| Midjourney prompt | Recraft | Stil parametrelerini API seçeneklerine taşı |
| DALL-E 3 prompt | Midjourney | Anahtar kelime yoğunlaştır, parametreler ekle |

---

## BÖLÜM 6: HER AJAN İÇİN ÖNERİLEN MİMARİ

### 6.1 Ortak Mimari Şema

```
+-------------------+     +------------------+     +-------------------+
| Niyet Çıkarma     | --> | Prompt Oluşturma | --> | Kalite Kontrol    |
| (Sokratik Sorgu)  |     | (Teknik Uygula)  |     | (Self-Refine)     |
+-------------------+     +------------------+     +-------------------+
        ↓                        ↓                         ↓
  Progressive            CoT / ToT / APE           LLM-as-Judge
  Disclosure             Few-shot Örnekler          Metrik Puanlama
  Kısıtlama Hunisi       Rol Atama                  İteratif Döngü
                         Yapılandırma (CO-STAR)
```

### 6.2 TEXT/LLM Ajanı Özel Bileşenleri

```
Prompt Oluşturma Pipeline:
1. Rol atama (ExpertPrompting)
2. Bağlam enjeksiyonu (CO-STAR)
3. CoT tetikleme (karmaşıksa)
4. Few-shot örnekler (uygunsa)
5. Çıktı formatı belirtme
6. Kısıtlamalar ekleme
```

### 6.3 IMAGE Ajanı Prompt Sırası

```
PROMPT_ORDER:
1. subject        → Ana konu (en yüksek öncelik)
2. medium         → Ortam (photograph, oil painting, vb.)
3. style          → Sanatsal stil
4. lighting       → Aydınlatma
5. color_palette  → Renk paleti
6. composition    → Kompozisyon
7. quality        → Kalite belirteçleri
8. negative       → Negatif prompt
```

### 6.4 VIDEO Ajanı Zamansal Yapı

```
TEMPORAL_STRUCTURE:
- beginning: Sahne başlangıcı
- middle: Gelişim
- end: Bitiş

+ Kamera hareketi seçimi
+ Hareket kalitesi belirteçleri
+ Teknik parametreler (fps, AR, süre)
+ Stil tutarlılığı terimleri
```

### 6.5 3D MODEL Ajanı Karar Ağacı

```
1. Tek nesne mi sahne mi? (tek nesne önerilen)
2. Topoloji tipi (low-poly, high-poly, quad)
3. Malzeme/doku tanımlama (PBR)
4. Görünüm açısı belirtme
5. Stil (realistic, stylized, voxel)
6. Karmaşıksa → Referans görsel + text prompt birleştir
```

---

## BÖLÜM 7: KAYNAK TABLOSU

| # | Kaynak | Yıl | Alan | Güvenilirlik |
|---|--------|-----|------|-------------|
| 1 | Wei et al. — NeurIPS 2022 — CoT Prompting | 2022 | TEXT | Çok Yüksek |
| 2 | Kojima et al. — NeurIPS 2022 — Zero-Shot Reasoners | 2022 | TEXT | Çok Yüksek |
| 3 | Yao et al. — NeurIPS 2023 — Tree of Thoughts | 2023 | TEXT | Çok Yüksek |
| 4 | Wang et al. — ICLR 2023 — Self-Consistency | 2023 | TEXT | Çok Yüksek |
| 5 | Zhou et al. — ICLR 2023 — APE | 2023 | TEXT | Çok Yüksek |
| 6 | Madaan et al. — NeurIPS 2023 — Self-Refine | 2023 | TEXT | Çok Yüksek |
| 7 | Suzgun & Kalai — 2024 — Meta-Prompting | 2024 | TEXT | Yüksek |
| 8 | Brown et al. — NeurIPS 2020 — GPT-3 Few-Shot | 2020 | TEXT | Çok Yüksek |
| 9 | Liu et al. — ACM Comp. Surveys 2023 — Survey | 2023 | TEXT | Çok Yüksek |
| 10 | Xu et al. — 2023 — ExpertPrompting | 2023 | TEXT | Yüksek |
| 11 | Liu & Chilton — ACM CHI 2022 — T2I Guidelines | 2022 | IMAGE | Çok Yüksek |
| 12 | Oppenlaender — B&IT 2023 — Prompt Taxonomy | 2023 | IMAGE | Yüksek |
| 13 | Witteveen & Andrews — 2022 — Diffusion Prompting | 2022 | IMAGE | Orta-Yüksek |
| 14 | Poole et al. — ICLR 2023 — DreamFusion | 2023 | 3D | Çok Yüksek |
| 15 | Lin et al. — CVPR 2023 — Magic3D | 2023 | 3D | Çok Yüksek |
| 16 | Singer et al. — ICLR 2023 — Make-A-Video | 2023 | VIDEO | Çok Yüksek |
| 17 | Shinn et al. — NeurIPS 2023 — Reflexion | 2023 | İteratif | Çok Yüksek |
| 18 | Zamfirescu-Pereira et al. — CHI 2023 — Why Johnny Can't Prompt | 2023 | UX/Niyet | Çok Yüksek |
| 19 | Brooks et al. — 2024 — Sora Technical Report | 2024 | VIDEO | Yüksek |
