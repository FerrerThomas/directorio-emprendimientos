"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { BusinessCard } from "@/components/business-card"

type Category = {
  id: string
  nombre: string
  descripcion: string | null
}

type Business = {
  id: string
  nombre: string
  descripcion_corta: string
  logo_url: string | null
  portada_url: string | null
  palabras_clave: string[] | null
  categorias: { nombre: string } | null
}

export function SearchAndFilter({
  categories,
  initialBusinesses,
}: {
  categories: Category[]
  initialBusinesses: Business[]
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredBusinesses = useMemo(() => {
    let filtered = initialBusinesses

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => {
        const categoryName = business.categorias?.nombre
        const category = categories.find((cat) => cat.nombre === categoryName)
        return category?.id === selectedCategory
      })
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((business) => {
        const matchesName = business.nombre.toLowerCase().includes(query)
        const matchesDescription = business.descripcion_corta.toLowerCase().includes(query)
        const matchesKeywords = business.palabras_clave?.some((keyword) => keyword.toLowerCase().includes(query))
        return matchesName || matchesDescription || matchesKeywords
      })
    }

    return filtered
  }, [initialBusinesses, searchQuery, selectedCategory, categories])

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre, descripción o palabras clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron emprendimientos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {filteredBusinesses.length}{" "}
            {filteredBusinesses.length === 1 ? "emprendimiento encontrado" : "emprendimientos encontrados"}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
