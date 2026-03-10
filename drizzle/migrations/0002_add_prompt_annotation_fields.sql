-- Add annotation fields from research data
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS why_it_works TEXT;
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS model_notes TEXT;
ALTER TABLE prompt_datasets ADD COLUMN IF NOT EXISTS rating REAL;

-- Rebuild ivfflat index for expanded dataset (~280 rows)
DROP INDEX IF EXISTS idx_prompt_datasets_embedding;
CREATE INDEX idx_prompt_datasets_embedding ON prompt_datasets
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 8);
