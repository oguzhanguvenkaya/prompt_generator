-- Enable pgvector extension (Neon native support)
CREATE EXTENSION IF NOT EXISTS vector;

-- Add metadata columns to prompt_datasets
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS domain VARCHAR(50) DEFAULT 'general';
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS style_set VARCHAR(100);
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS usage_context VARCHAR(50) DEFAULT 'example';
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS embedding vector(1024);

-- Indexes for hybrid search
CREATE INDEX IF NOT EXISTS idx_prompt_datasets_embedding
  ON prompt_datasets USING ivfflat (embedding vector_cosine_ops) WITH (lists = 4);
CREATE INDEX IF NOT EXISTS idx_prompt_datasets_category ON prompt_datasets (category);
CREATE INDEX IF NOT EXISTS idx_prompt_datasets_domain ON prompt_datasets (domain);
