import { createClient } from "@/lib/supabase/server"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { SearchAndFilter } from "@/components/search-and-filter"
import Link from "next/link"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured businesses
  const { data: featured } = await supabase
    .from("emprendimientos")
    .select("*, categorias(nombre)")
    .eq("destacado", true)
    .order("created_at", { ascending: false })

  // Fetch all businesses
  const { data: businesses } = await supabase
    .from("emprendimientos")
    .select("*, categorias(nombre)")
    .order("created_at", { ascending: false })

  // Fetch all categories
  const { data: categories } = await supabase.from("categorias").select("*").order("nombre")

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
        {/* Featured Carousel */}
        {featured && featured.length > 0 && (
          <section className="bg-muted/30 py-8">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-balance">Emprendimientos Destacados</h2>
              <FeaturedCarousel businesses={featured} />
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="container mx-auto px-4 py-8">
          <SearchAndFilter categories={categories || []} initialBusinesses={businesses || []} />
        </section>
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
