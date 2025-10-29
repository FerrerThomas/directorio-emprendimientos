-- Insert sample categories
INSERT INTO public.categorias (nombre, descripcion) VALUES
  ('Gastronomía', 'Restaurantes, cafeterías y servicios de comida'),
  ('Servicios del Hogar', 'Plomería, electricidad, carpintería y más'),
  ('Salud y Bienestar', 'Consultorios médicos, gimnasios y spas'),
  ('Educación', 'Escuelas, academias y tutorías'),
  ('Tecnología', 'Reparación de equipos, desarrollo web y soporte IT'),
  ('Belleza', 'Peluquerías, salones de belleza y estética')
ON CONFLICT DO NOTHING;

-- Insert sample businesses
INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'Café del Centro',
  'Café artesanal con repostería casera',
  'Disfruta del mejor café de especialidad en un ambiente acogedor. Ofrecemos desayunos, almuerzos ligeros y una amplia variedad de postres caseros.',
  (SELECT id FROM public.categorias WHERE nombre = 'Gastronomía' LIMIT 1),
  '+54 11 1234-5678',
  'Av. Principal 123, Centro',
  '{"instagram": "@cafedelcentro", "facebook": "cafedelcentro", "whatsapp": "+5491112345678"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  true,
  ARRAY['café', 'desayuno', 'repostería', 'artesanal']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'Café del Centro');

INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'Plomería Rápida',
  'Servicio de plomería 24/7',
  'Soluciones rápidas y profesionales para todos tus problemas de plomería. Atendemos emergencias las 24 horas. Presupuestos sin cargo.',
  (SELECT id FROM public.categorias WHERE nombre = 'Servicios del Hogar' LIMIT 1),
  '+54 11 2345-6789',
  'Zona Norte',
  '{"whatsapp": "+5491123456789"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  true,
  ARRAY['plomería', 'emergencias', '24hs', 'destapaciones']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'Plomería Rápida');

INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'Gimnasio FitLife',
  'Tu espacio para entrenar y crecer',
  'Gimnasio equipado con las últimas máquinas, clases grupales, entrenadores personales y planes flexibles. Primera clase gratis.',
  (SELECT id FROM public.categorias WHERE nombre = 'Salud y Bienestar' LIMIT 1),
  '+54 11 3456-7890',
  'Calle Fitness 456',
  '{"instagram": "@fitlifegym", "facebook": "fitlifegym", "web": "www.fitlife.com"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  true,
  ARRAY['gimnasio', 'fitness', 'entrenamiento', 'musculación']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'Gimnasio FitLife');

INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'TechSolutions',
  'Reparación y soporte técnico',
  'Reparamos computadoras, notebooks, celulares y tablets. También ofrecemos desarrollo web y soporte IT para empresas.',
  (SELECT id FROM public.categorias WHERE nombre = 'Tecnología' LIMIT 1),
  '+54 11 4567-8901',
  'Av. Tecnológica 789',
  '{"instagram": "@techsolutions", "whatsapp": "+5491145678901", "web": "www.techsolutions.com"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  false,
  ARRAY['reparación', 'computadoras', 'celulares', 'soporte']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'TechSolutions');

INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'Salón Belleza Total',
  'Peluquería y tratamientos de belleza',
  'Cortes, coloración, tratamientos capilares, manicura, pedicura y más. Atención personalizada con productos de primera calidad.',
  (SELECT id FROM public.categorias WHERE nombre = 'Belleza' LIMIT 1),
  '+54 11 5678-9012',
  'Calle Hermosa 321',
  '{"instagram": "@bellezatotal", "facebook": "bellezatotal"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  false,
  ARRAY['peluquería', 'belleza', 'manicura', 'tratamientos']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'Salón Belleza Total');

INSERT INTO public.emprendimientos (
  nombre, 
  descripcion_corta, 
  descripcion_larga, 
  categoria_id,
  telefono,
  direccion,
  redes,
  logo_url,
  portada_url,
  destacado,
  palabras_clave
)
SELECT
  'Academia de Inglés',
  'Aprende inglés con profesores nativos',
  'Cursos de inglés para todos los niveles. Clases grupales e individuales. Preparación para exámenes internacionales.',
  (SELECT id FROM public.categorias WHERE nombre = 'Educación' LIMIT 1),
  '+54 11 6789-0123',
  'Av. Educación 555',
  '{"instagram": "@academiaingles", "web": "www.academiaingles.com"}'::jsonb,
  '/placeholder.svg?height=100&width=100',
  '/placeholder.svg?height=400&width=800',
  false,
  ARRAY['inglés', 'idiomas', 'clases', 'educación']
WHERE NOT EXISTS (SELECT 1 FROM public.emprendimientos WHERE nombre = 'Academia de Inglés');
