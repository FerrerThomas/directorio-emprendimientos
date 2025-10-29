import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function CategoriasPage() {
  const supabase = await createClient()

  // Fetch all categories with business count
  const { data: categories } = await supabase.from("categorias").select("*, emprendimientos(count)").order("nombre")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Guía Local</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/categorias" className="text-sm font-medium text-foreground transition-colors">
                Ver Categorías
              </Link>
              <Link
                href="/contacto"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-balance">Categorías</h1>
          <p className="text-muted-foreground mt-2">Explora todos los emprendimientos por categoría</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const businessCount = Array.isArray(category.emprendimientos)
                ? category.emprendimientos.length
                : (category.emprendimientos as unknown as { count: number })?.count || 0

              return (
                <Link key={category.id} href={`/?categoria=${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-balance">{category.nombre}</CardTitle>
                      {category.descripcion && (
                        <CardDescription className="text-pretty">{category.descripcion}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {businessCount} {businessCount === 1 ? "emprendimiento" : "emprendimientos"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay categorías disponibles.</p>
          </div>
        )}
      </main>
    </div>
  )
}
