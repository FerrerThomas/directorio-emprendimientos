import { signIn } from "../actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Ingresar al Panel</CardTitle>
          <CardDescription>Accedé con tu usuario de Supabase</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input name="email" type="email" required placeholder="tu@correo.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Contraseña</label>
              <Input name="password" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full">Ingresar</Button>
          </form>
          <div className="text-center text-xs text-muted-foreground mt-4">
            <Link href="/" className="hover:underline">Volver al sitio</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

