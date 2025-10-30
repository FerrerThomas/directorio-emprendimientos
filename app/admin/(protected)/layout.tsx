import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "../actions"

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  if (!data.user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <form action={logout}>
            <Button variant="outline" size="sm">Cerrar sesión</Button>
          </form>
        </div>
      </header>
      {children}
    </div>
  )
}

