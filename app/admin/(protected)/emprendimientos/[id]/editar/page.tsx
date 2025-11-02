import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { updateEmprendimiento } from "../../../../emprendimientos/actions"
import { AdminNav } from "@/components/admin-nav"

export default async function EditarEmprendimientoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const [{ data: categorias }, { data: e }] = await Promise.all([
    supabase.from("categorias").select("id, nombre").order("nombre"),
    supabase.from("emprendimientos").select("*").eq("id", id).single(),
  ])

  return (
    <main className="container mx-auto px-4 py-8">
      <AdminNav />
      <Card>
        <CardHeader>
          <CardTitle>Editar Emprendimiento</CardTitle>
          <CardDescription>Actualizá los datos necesarios</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (fd) => { 'use server'; await updateEmprendimiento(id, fd) }} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Nombre</Label>
              <Input name="nombre" defaultValue={e?.nombre || ""} required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción corta</Label>
              <Input name="descripcion_corta" defaultValue={e?.descripcion_corta || ""} required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción larga</Label>
              <Textarea name="descripcion_larga" rows={5} defaultValue={e?.descripcion_larga || ""} />
            </div>
            <div>
              <Label>Categoría</Label>
              <select name="categoria_id" defaultValue={e?.categoria_id || ""} className="w-full border rounded-md h-9 px-2 bg-background">
                <option value="">Sin categoría</option>
                {(categorias || []).map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input name="telefono" defaultValue={e?.telefono || ""} />
            </div>
            <div className="md:col-span-2">
              <Label>Dirección</Label>
              <Input name="direccion" defaultValue={e?.direccion || ""} />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input name="instagram" defaultValue={(e?.redes as any)?.instagram || ""} />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input name="facebook" defaultValue={(e?.redes as any)?.facebook || ""} />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input name="whatsapp" defaultValue={(e?.redes as any)?.whatsapp || ""} />
            </div>
            <div>
              <Label>Sitio web</Label>
              <Input name="web" defaultValue={(e?.redes as any)?.web || ""} />
            </div>
            <div>
              <Label>Logo </Label>
              <Input name="logo_file" type="file" accept="image/*" />
              <div className="text-xs text-muted-foreground mt-1">Actual dejar vacío para mantener URL existente</div>
            </div>
            <div className="hidden">
              <Label>Logo </Label>
              <Input name="logo_url" defaultValue={e?.logo_url || ""} />
            </div>
            <div>
              <Label>Portada </Label>
              <Input name="portada_file" type="file" accept="image/*" />
              <div className="text-xs text-muted-foreground mt-1">Dejar vacío para mantener URL existente</div>
            </div>
            <div className="hidden">
              <Label>Portada </Label>
              <Input name="portada_url" defaultValue={e?.portada_url || ""} />
            </div>
            <div className="md:col-span-2">
              <Label>Palabras clave (separadas por coma)</Label>
              <Input name="palabras_clave" defaultValue={(e?.palabras_clave || []).join(", ")} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="destacado" name="destacado" defaultChecked={!!e?.destacado} />
              <Label htmlFor="destacado">Destacado</Label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">Guardar cambios</Button>
              <Button variant="outline" asChild>
                <a href="/admin/emprendimientos">Volver</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
