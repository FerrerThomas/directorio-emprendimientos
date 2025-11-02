import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createCategoria } from "../../../categorias/actions"
import { AdminNav } from "@/components/admin-nav"

export default function NuevaCategoriaPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <AdminNav />
      <Card>
        <CardHeader>
          <CardTitle>Nueva Categoría</CardTitle>
          <CardDescription>Define el nombre y una descripción opcional</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createCategoria} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Nombre</Label>
              <Input name="nombre" required />
            </div>
            <div className="md:col-span-2">
              <Label>Descripción</Label>
              <Textarea name="descripcion" rows={4} />
            </div>
            <div className="md:col-span-2">
              <Label>Icono (opcional)</Label>
              <Input name="icon" placeholder="Ej: utensils, wrench, heart-pulse o /categorias/gastronomia.svg" />
              <p className="text-xs text-muted-foreground mt-1">
                Podés usar un nombre de ícono de Lucide (utensils, wrench, heart-pulse, book-open, laptop, sparkles, folder)
                o la ruta a una imagen en public (por ejemplo /categorias/gastronomia.svg).
              </p>
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">Guardar</Button>
              <Button asChild variant="outline">
                <a href="/admin/categorias">Cancelar</a>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
