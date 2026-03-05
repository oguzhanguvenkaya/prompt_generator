export const videoPromptsSeed = [
  // ─── Kling 3.0 ───────────────────────────────────────────────
  {
    category: "video",
    targetModel: "kling-3.0",
    prompt: "Native 4K aerial drone shot ascending over a misty mountain valley at sunrise. Golden light breaks through volumetric clouds, illuminating a winding river below. Camera: smooth crane up transitioning to forward dolly. Atmospheric fog creates depth layers. 60fps cinematic quality. 10 seconds.",
    negativePrompt: "shaky camera, abrupt transitions, low resolution, artifacting, flickering",
    tags: ["drone", "landscape", "sunrise", "4K", "aerial", "kling3"],
    quality: 0.96,
    source: "curated",
  },
  {
    category: "video",
    targetModel: "kling-3.0",
    prompt: "Macro shot of a single water droplet falling into a perfectly still pond. Camera: extreme close-up, slow dolly in. Ripples expand outward in concentric circles. Morning light creates prismatic reflections on the water surface. Slow motion feel. 4K native resolution. 5 seconds.",
    negativePrompt: "blurry, low quality, jittery, watermark, fast motion",
    tags: ["macro", "water", "slow-motion", "4K", "nature"],
    quality: 0.94,
    source: "curated",
  },

  // ─── Kling 2.6 ───────────────────────────────────────────────
  {
    category: "video",
    targetModel: "kling-2.6",
    prompt: "Cinematic drone shot slowly ascending over a misty mountain valley at sunrise. Golden light breaks through clouds, illuminating a winding river below. Camera moves upward and forward in a smooth continuous motion. Atmospheric fog creates depth layers. Professional quality, 10 seconds.",
    negativePrompt: "shaky camera, abrupt transitions, distorted faces, blurry, low resolution",
    tags: ["drone", "landscape", "sunrise", "cinematic", "aerial"],
    quality: 0.93,
    source: "curated",
  },
  {
    category: "video",
    targetModel: "kling-2.6",
    prompt: "Fixed camera shot of a Japanese tea ceremony. An elderly woman in traditional kimono gracefully pours matcha. Slow, deliberate movements. Warm indoor lighting with soft shadows. Steam rising from the cup. Meditative atmosphere. Static camera, no movement. 5 seconds.",
    negativePrompt: "fast movement, camera shake, modern elements, bright neon colors",
    tags: ["tea ceremony", "japan", "calm", "static", "traditional"],
    quality: 0.91,
    source: "curated",
  },
  {
    category: "video",
    targetModel: "kling-2.6",
    prompt: "Close-up of a street musician playing saxophone in the rain. Neon reflections from nearby shops illuminate water droplets on the instrument. Camera: slow orbit left. Shallow depth of field, bokeh from city lights. Moody blue and amber color grading. Sound of jazz fills the air. 10 seconds.",
    negativePrompt: "distorted face, blurry hands, static image, no movement, watermark",
    tags: ["music", "rain", "neon", "orbit", "moody", "audio"],
    quality: 0.92,
    source: "curated",
  },

  // ─── Kling O1 ────────────────────────────────────────────────
  {
    category: "video",
    targetModel: "kling-o1",
    prompt: "A professional chef plating a dish in a high-end restaurant kitchen. Steam rising from the plate. Precise hand movements placing microgreens with tweezers. Camera: tracking shot following hands. Warm kitchen lighting mixing with cool steel reflections. Maintain character consistency throughout. 10 seconds.",
    negativePrompt: "blurry hands, bad anatomy, distorted face, jittery",
    tags: ["food", "chef", "tracking", "professional", "character-consistent"],
    quality: 0.90,
    source: "curated",
  },

  // ─── Higgsfield Veo 3.1 ──────────────────────────────────────
  {
    category: "video",
    targetModel: "higgsfield-veo",
    prompt: "Cinematic establishing shot of an ancient temple ruins at sunset. Warm golden light casting long shadows across moss-covered stone pillars. A flock of birds takes flight from the treeline. Camera: slow pan right revealing the full temple complex. Atmospheric haze, volumetric god rays. 8 seconds.",
    tags: ["temple", "ruins", "sunset", "cinematic", "pan", "veo"],
    quality: 0.93,
    source: "curated",
  },

  // ─── Higgsfield WAN 2.5 ──────────────────────────────────────
  {
    category: "video",
    targetModel: "higgsfield-wan",
    prompt: "A young dancer performing contemporary ballet in an abandoned warehouse. Dramatic backlighting creating silhouette effect. Fluid body movements transitioning from slow to fast. Dust particles visible in light beams. Character-focused animation with detailed body mechanics. 10 seconds.",
    tags: ["dance", "character", "dramatic", "silhouette", "contemporary"],
    quality: 0.88,
    source: "curated",
  },
  {
    category: "video",
    targetModel: "higgsfield-wan",
    prompt: "Street dancer performing breakdancing moves in an urban setting. Graffiti wall background. Camera: low angle, slight orbit. Dynamic energy, sharp transitions between freeze frames and fluid motion. Golden hour side lighting. Hip-hop atmosphere. 8 seconds.",
    tags: ["breakdance", "urban", "dynamic", "character", "motion-transfer"],
    quality: 0.89,
    source: "curated",
  },

  // ─── Higgsfield Sora 2 ───────────────────────────────────────
  {
    category: "video",
    targetModel: "higgsfield-sora",
    prompt: "A woman walking through a field of tall golden wheat at magic hour. Soft wind creating gentle waves in the grain. Camera: steady tracking shot from the side. Lens flare from low sun. Flowing summer dress with natural fabric movement. Warm cinematic color grading. Photorealistic. 8 seconds.",
    tags: ["nature", "portrait", "golden-hour", "tracking", "cinematic", "sora"],
    quality: 0.95,
    source: "curated",
  },
];
