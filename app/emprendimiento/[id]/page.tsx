import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, MapPin, Globe, Instagram, Facebook, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function BusinessDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: business, error } = await supabase
    .from("emprendimientos")
    .select("*, categorias(nombre)")
    .eq("id", id)
    .single()

  if (error || !business) {
    notFound()
  }

  const redes = business.redes as Record<string, string> | null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Cover Image */}
        <div className="relative h-[300px] md:h-[400px] bg-muted">
          <Image
            src={business.portada_url || "/placeholder.svg?height=400&width=1200"}
            alt={business.nombre}
            fill
            className="object-cover"
          />
        </div>

        {/* Business Info */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo */}
                {business.logo_url && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-card bg-card flex-shrink-0">
                    <Image
                      src={business.logo_url || "/placeholder.svg"}
                      alt={`${business.nombre} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2 text-balance">{business.nombre}</h1>
                      {business.categorias && (
                        <Badge variant="secondary" className="text-sm">
                          {business.categorias.nombre}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-lg text-muted-foreground mb-4 text-pretty">{business.descripcion_corta}</p>

                  {business.palabras_clave && business.palabras_clave.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {business.palabras_clave.map((keyword, index) => (
                        <Badge key={index} variant="outline">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description and Contact */}
          <div className="grid md:grid-cols-3 gap-6 mt-6 mb-12">
            {/* Description */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Descripción</h2>
                  <p className="text-muted-foreground leading-relaxed text-pretty whitespace-pre-line">
                    {business.descripcion_larga || business.descripcion_corta}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Contacto</h2>
                  <div className="space-y-4">
                    {business.telefono && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Teléfono</p>
                          <a
                            href={`tel:${business.telefono}`}
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            {business.telefono}
                          </a>
                        </div>
                      </div>
                    )}

                    {business.direccion && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">Dirección</p>
                          <p className="text-sm text-muted-foreground">{business.direccion}</p>
                        </div>
                      </div>
                    )}

                    {redes && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium mb-3">Redes Sociales</p>
                        <div className="space-y-2">
                          {redes.whatsapp && (
                            <a
                              href={`https://wa.me/${redes.whatsapp.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              <MessageCircle className="h-4 w-4" />
                              WhatsApp
                            </a>
                          )}
                          {redes.instagram && (
                            <a
                              href={`https://instagram.com/${redes.instagram.replace("@", "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Instagram className="h-4 w-4" />
                              {redes.instagram}
                            </a>
                          )}
                          {redes.facebook && (
                            <a
                              href={`https://facebook.com/${redes.facebook}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Facebook className="h-4 w-4" />
                              Facebook
                            </a>
                          )}
                          {redes.web && (
                            <a
                              href={redes.web.startsWith("http") ? redes.web : `https://${redes.web}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Globe className="h-4 w-4" />
                              Sitio Web
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
