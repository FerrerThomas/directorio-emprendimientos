import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-primary">Guia Local</h1>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/contacto" className="text-sm font-medium text-foreground transition-colors">Contacto</Link>
            </nav>
          </div>        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-balance">¿Querés formar parte de la guía?</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Contactanos y sumá tu emprendimiento a nuestra comunidad local. Ayudamos a conectar negocios con clientes.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Teléfono</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a href="tel:+5491112345678" className="text-lg font-medium hover:text-primary transition-colors">
                  +54 9 11 1234-5678
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Email</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:contacto@guialocal.com"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  contacto@guialocal.com
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Información Adicional</CardTitle>
              <CardDescription>Seguinos en nuestras redes sociales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <a
                    href="https://facebook.com/guialocal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com/guialocal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">Instagram</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-3 text-balance">¡Estamos para ayudarte!</h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              Ya sea que quieras agregar tu negocio o tengas alguna consulta, no dudes en comunicarte con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <a href="mailto:contacto@guialocal.com">Enviar Email</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+5491112345678">Llamar Ahora</a>
              </Button>
            </div>
          </div>
        </div>
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



