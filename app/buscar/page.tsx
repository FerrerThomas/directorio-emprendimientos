import { createClient } from "@/lib/supabase/server"
import { BusinessCard } from "@/components/business-card"
import Link from "next/link"

export default async function BuscarPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: _q = "" } = await searchParams
  const q = _q.trim()
  const supabase = await createClient()
  const { data: raw } = await supabase
    .from("emprendimientos")
    .select("*, categorias(nombre)")
    .order("created_at", { ascending: false })
    .limit(500)

  const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
  const needle = norm(q)
  const results = (raw || []).filter((b: any) => {
    if (!q) return true
    const name = norm(b.nombre || "")
    const desc = norm(b.descripcion_corta || "")
    const keys: string[] = Array.isArray(b.palabras_clave) ? b.palabras_clave : []
    const keysJoined = norm(keys.join(" "))
    return name.includes(needle) || desc.includes(needle) || keysJoined.includes(needle)
  })

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Volver</Link>
          <h1 className="text-xl font-bold">Resultados de búsqueda</h1>
          <div />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <form action="/buscar" method="get" className="flex gap-3 mb-6">
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, descripción o palabras clave"
            className="flex-1 h-10 px-4 rounded-md border bg-background"
          />
          <button type="submit" className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium">
            Buscar
          </button>
        </form>
        <p className="text-sm text-muted-foreground mb-4">{results?.length || 0} resultados {q ? `para "${q}"` : ""}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(results || []).map((b: any) => (
            <BusinessCard key={b.id} business={b} />
          ))}
        </div>
      </main>
    </div>
  )
}

