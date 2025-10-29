import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Emprendimiento no encontrado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Lo sentimos, no pudimos encontrar el emprendimiento que buscas.</p>
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
