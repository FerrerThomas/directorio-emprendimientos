import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createEmprendimiento } from "../../../emprendimientos/actions"

export default async function NuevoEmprendimientoPage() {
  const supabase = await createClient()
  const { data: categorias } = await supabase.from("categorias").select("id, nombre").order("nombre")

  return (
    <main className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Emprendimiento</CardTitle>
          <CardDescription>Completá los datos y subí imágenes opcionalmente</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createEmprendimiento} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Nombre</Label>
              <Input name="nombre" required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción corta</Label>
              <Input name="descripcion_corta" required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción larga</Label>
              <Textarea name="descripcion_larga" rows={5} />
            </div>
            <div>
              <Label>Categoría</Label>
              <select name="categoria_id" className="w-full border rounded-md h-9 px-2 bg-background">
                <option value="">Sin categoría</option>
                {(categorias || []).map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Teléfono</Label>
              <Input name="telefono" />
            </div>
            <div className="md:col-span-2">
              <Label>Dirección</Label>
              <Input name="direccion" />
            </div>
            <div>
              <Label>Instagram</Label>
              <Input name="instagram" placeholder="@tu_cuenta" />
            </div>
            <div>
              <Label>Facebook</Label>
              <Input name="facebook" placeholder="tu_pagina" />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input name="whatsapp" placeholder="+54911..." />
            </div>
            <div>
              <Label>Sitio web</Label>
              <Input name="web" placeholder="www.tusitio.com" />
            </div>
            <div>
              <Label>Logo (archivo)</Label>
              <Input name="logo_file" type="file" accept="image/*" />
            </div>
            <div>
              <Label>Logo (URL)</Label>
              <Input name="logo_url" placeholder="https://..." />
            </div>
            <div>
              <Label>Portada (archivo)</Label>
              <Input name="portada_file" type="file" accept="image/*" />
            </div>
            <div>
              <Label>Portada (URL)</Label>
              <Input name="portada_url" placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <Label>Palabras clave (separadas por coma)</Label>
              <Input name="palabras_clave" placeholder="café, desayuno, artesanal" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="destacado" name="destacado" />
              <Label htmlFor="destacado">Destacado</Label>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">Guardar</Button>
              <Button variant="outline" asChild>
                <a href="/admin/emprendimientos">Cancelar</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
