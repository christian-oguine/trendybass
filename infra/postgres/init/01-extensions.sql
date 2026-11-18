-- Runs once when the local database is first created.
CREATE EXTENSION IF NOT EXISTS vector;    -- image embeddings (Similar items, Complete the Look)
CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- fuzzy product search
CREATE EXTENSION IF NOT EXISTS unaccent;  -- search without accents
