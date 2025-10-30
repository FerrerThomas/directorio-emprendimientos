# Directorio de Emprendimientos

Guía local de emprendimientos construida con Next.js 16, Tailwind y Supabase.

## Requisitos
- Node.js 18+ (recomendado 20+)
- pnpm (recomendado por tener `pnpm-lock.yaml`). Si preferís npm/yarn, también funciona.

## Variables de entorno
La app usa Supabase (hosteado). Creá un archivo `.env.local` en la raíz copiando desde `.env.example` y completá con los datos de tu proyecto Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_publica
```

Dónde encontrarlos en Supabase:
- Panel de tu proyecto → Settings → API → Project URL
- Panel de tu proyecto → Settings → API → `anon` public API key

> Nota: No compartas tu `service_role` key en el frontend ni en repos públicos.

## Datos y tablas
Ya tenés las tablas creadas, pero por si querés recrearlas o poblar datos de ejemplo, hay scripts SQL en `scripts/`:
- `scripts/001_create_tables.sql`: crea tablas y políticas de lectura pública.
- `scripts/002_seed_data.sql`: inserta categorías y emprendimientos de ejemplo.
 - `scripts/003_storage_setup.sql`: crea el bucket público `emprendimientos` y políticas de acceso para subir imágenes.

Para ejecutarlos:
1. Abrí Supabase → SQL Editor.
2. Pegá y corré primero `001_create_tables.sql` y luego `002_seed_data.sql`.
3. Para subir imágenes desde el panel admin, ejecutá también `003_storage_setup.sql`.

## Ejecutar localmente
1. Instalá dependencias:
   - `pnpm install` (o `npm install` / `yarn`)
2. Iniciá el servidor de desarrollo:
   - `pnpm dev`
3. Abrí `http://localhost:3000` en tu navegador.

## Páginas clave
- `/` Inicio: lista emprendimientos (incluye destacados) y buscador/filtros.
- `/categorias` Listado de categorías con conteo de emprendimientos.
- `/emprendimiento/[id]` Detalle de un emprendimiento.
- `/contacto` Datos de contacto/CTA.
 - `/admin/login` Login al panel (email/contraseña de Supabase Auth).
 - `/admin` Panel con métricas y accesos.
 - `/admin/emprendimientos` Listado con editar/eliminar y alternar destacado.
 - `/admin/emprendimientos/nuevo` Alta de emprendimiento.

## Configuración técnica
- Supabase SSR/CSR: los clientes están en `lib/supabase/server.ts` y `lib/supabase/client.ts` y leen `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Tailwind 4 + PostCSS 8.
- Imágenes sin optimización adicional (`next.config.mjs` → `images.unoptimized: true`).

### Admin y permisos
- Para que el panel pueda escribir aunque RLS esté activo, podés:
  - Opción A (recomendada): definir políticas RLS de insert/update/delete para usuarios autenticados en `categorias` y `emprendimientos`.
  - Opción B: setear `SUPABASE_SERVICE_ROLE_KEY` en `.env.local` y el panel usará ese cliente sólo en acciones de servidor (más simple). Este valor nunca se expone al navegador.
- Para subir imágenes desde el panel, creá el bucket `emprendimientos` ejecutando `scripts/003_storage_setup.sql`.

## Resolución de problemas
- 401/403 al leer tablas: verificá que las RLS y políticas de lectura pública estén creadas (ver `001_create_tables.sql`).
- Listas vacías: asegurate de cargar datos (ver `002_seed_data.sql`).
- Variables vacías: confirmá `.env.local` y reiniciá `pnpm dev`.

## Scripts útiles
- `pnpm dev` arranca el servidor de desarrollo.
- `pnpm build` compila la app.
- `pnpm start` corre la build en producción local.
