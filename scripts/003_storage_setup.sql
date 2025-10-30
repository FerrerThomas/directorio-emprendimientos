-- Create storage bucket for images (public)
insert into storage.buckets (id, name, public)
values ('emprendimientos', 'emprendimientos', true)
on conflict (id) do nothing;

-- Allow anyone to select (read) from public bucket
drop policy if exists "Public read acceso bucket" on storage.objects;
create policy "Public read acceso bucket"
on storage.objects for select
using (bucket_id = 'emprendimientos');

-- Allow authenticated users to insert/update/delete in the bucket
drop policy if exists "Auth write acceso bucket" on storage.objects;
create policy "Auth write acceso bucket"
on storage.objects for all
to authenticated
using (bucket_id = 'emprendimientos')
with check (bucket_id = 'emprendimientos');
