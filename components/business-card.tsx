import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

type Business = {
  id: string
  nombre: string
  descripcion_corta: string
  logo_url: string | null
  portada_url: string | null
  categorias: { nombre: string } | null
}

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link href={`/emprendimiento/${business.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="relative h-48 bg-muted">
          <Image
            src={business.portada_url || "/placeholder.svg?height=200&width=400"}
            alt={business.nombre}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="relative pb-2">
          {business.logo_url && (
            <div className="absolute -top-9 left-4 w-[86px] h-[86px] rounded-full overflow-hidden border-4 border-card bg-card">
              <Image
                src={business.logo_url || "/placeholder.svg"}
                alt={`${business.nombre} logo`}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className={business.logo_url ? "pt-12" : ""}>
            <h3 className="font-bold text-lg text-balance">{business.nombre}</h3>
            {business.categorias && (
              <Badge variant="secondary" className="mt-2">
                {business.categorias.nombre}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{business.descripcion_corta}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
