-- Create categorias table
CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create emprendimientos table
CREATE TABLE IF NOT EXISTS public.emprendimientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion_corta TEXT NOT NULL,
  descripcion_larga TEXT,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
  telefono TEXT,
  direccion TEXT,
  redes JSONB,
  logo_url TEXT,
  portada_url TEXT,
  destacado BOOLEAN DEFAULT FALSE,
  palabras_clave TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emprendimientos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required)
CREATE POLICY "Allow public read access to categorias"
  ON public.categorias FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to emprendimientos"
  ON public.emprendimientos FOR SELECT
  USING (true);

-- Create indexes for better query performance
CREATE INDEX idx_emprendimientos_categoria ON public.emprendimientos(categoria_id);
CREATE INDEX idx_emprendimientos_destacado ON public.emprendimientos(destacado);
CREATE INDEX idx_emprendimientos_palabras_clave ON public.emprendimientos USING GIN(palabras_clave);
