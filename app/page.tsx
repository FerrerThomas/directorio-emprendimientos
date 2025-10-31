import { createClient } from "@/lib/supabase/server"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { BusinessCard } from "@/components/business-card"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()

  // Featured businesses
  const { data: featured } = await supabase
    .from("emprendimientos")
    .select("*, categorias(nombre)")
    .eq("destacado", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Guía Local</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/categorias"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
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
        </div>
      </header>

      <main>
        {/* Search bar */}
        <section className="bg-muted/30 py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4 text-balance">Encontrá emprendimientos</h2>
            <form action="/buscar" method="get" className="flex gap-3">
              <input
                type="search"
                name="q"
                placeholder="Buscar por nombre, descripción o palabras clave"
                className="flex-1 h-10 px-4 rounded-md border bg-background"
              />
              <button type="submit" className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium">
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Featured Carousel */}
        {featured && featured.length > 0 && (
          <section className="bg-muted/30 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-balance">Emprendimientos Destacados</h2>
              <FeaturedCarousel businesses={featured} />
            </div>
          </section>
        )}

        {/* Featured grid */}
        {featured && featured.length > 0 && (
          <section className="container mx-auto px-4 py-8">
            <h3 className="text-xl font-bold mb-4">Destacados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((b) => (
                <BusinessCard key={b.id} business={b as any} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Guía Local - Encuentra los mejores emprendimientos de tu ciudad</p>
        </div>
      </footer>
    </div>
  )
}
