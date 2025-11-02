import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { updateCategoria } from "../../../../categorias/actions"
import AdminFlash from "@/components/admin-flash"
import { AdminNav } from "@/components/admin-nav"

export default async function EditarCategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: cat } = await supabase.from("categorias").select("*").eq("id", id).single()

  return (
    <main className="container mx-auto px-4 py-8">
      <AdminFlash />
      <AdminNav />
      <Card>
        <CardHeader>
          <CardTitle>Editar Categoría</CardTitle>
          <CardDescription>Actualiza el nombre o la descripción</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={async (fd) => { 'use server'; await updateCategoria(id, fd) }} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Nombre</Label>
              <Input name="nombre" defaultValue={cat?.nombre || ""} required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción</Label>
              <Textarea name="descripcion" rows={4} defaultValue={cat?.descripcion || ""} />
            </div>
            <div className="md:col-span-2">
              <Label>Icono (opcional)</Label>
              <Input name="icon" defaultValue={cat?.icon || ""} placeholder="utensils o /categorias/gastronomia.svg" />
              <p className="text-xs text-muted-foreground mt-1">
                Lucide: utensils, wrench, heart-pulse, book-open, laptop, sparkles, folder... Buscar en www.lucide.dev/icons
              </p>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">Guardar cambios</Button>
              <Button asChild variant="outline">
                <a href="/admin/categorias">Volver</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
