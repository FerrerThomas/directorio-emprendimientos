import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, FolderOpen, Plus, Star } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createClient()

  const { data: emprendimientos } = await supabase.from("emprendimientos").select("id, destacado")
  const { data: categorias } = await supabase.from("categorias").select("id")

  const totalEmprendimientos = emprendimientos?.length || 0
  const destacados = emprendimientos?.filter((e) => e.destacado).length || 0
  const totalCategorias = categorias?.length || 0

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emprendimientos</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmprendimientos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destacados</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{destacados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategorias}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emprendimientos</CardTitle>
            <CardDescription>Gestiona los emprendimientos de la guía</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/admin/emprendimientos/nuevo">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Emprendimiento
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/emprendimientos">Ver Todos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías</CardTitle>
            <CardDescription>Gestiona las categorías de emprendimientos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/admin/categorias/nueva">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Categoría
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/categorias">Ver Todas</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

