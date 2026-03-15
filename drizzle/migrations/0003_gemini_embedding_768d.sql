-- Gemini Embedding 2 migration: 768d shadow index + FTS support
-- Mevcut embedding vector(1024) korunur, yeni embedding_v2 vector(768) paralel eklenir.

-- Yeni 768d embedding kolonu (Gemini Embedding 2, MRL truncated)
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS embedding_v2 vector(768);

-- Vektör index (IVFFlat, cosine distance)
CREATE INDEX IF NOT EXISTS idx_prompt_datasets_embedding_v2
  ON prompt_datasets USING ivfflat (embedding_v2 vector_cosine_ops) WITH (lists = 8);

-- Full Text Search desteği (hibrit arama için)
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('english', coalesce(prompt, '') || ' ' || coalesce(description, ''))
  ) STORED;
CREATE INDEX IF NOT EXISTS idx_prompt_datasets_fts ON prompt_datasets USING gin(search_vector);
