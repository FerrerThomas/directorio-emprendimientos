-- Add an optional icon field to categories
ALTER TABLE public.categorias
ADD COLUMN IF NOT EXISTS icon TEXT;

