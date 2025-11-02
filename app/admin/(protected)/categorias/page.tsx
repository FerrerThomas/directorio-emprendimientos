import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminFlash from "@/components/admin-flash"
import { AdminNav } from "@/components/admin-nav"
import { deleteCategoria } from "../../categorias/actions"

function DeleteForm({ id }: { id: string }) {
  return (
    <form action={async () => { 'use server'; await deleteCategoria(id) }}>
      <Button variant="destructive" size="sm" type="submit">Eliminar</Button>
    </form>
  )
}

export default async function CategoriasAdminList() {
  const supabase = await createClient()
  const { data } = await supabase.from("categorias").select("id, nombre, descripcion, icon, emprendimientos(count)").order("nombre")

  return (
    <main className="container mx-auto px-4 py-8">
      <AdminFlash />
      <AdminNav />
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Categorías</CardTitle>
          <Button asChild>
            <Link href="/admin/categorias/nueva">Nueva</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Emprendimientos</TableHead>
                <TableHead>Icono</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((c: any) => {
                const count = Array.isArray(c.emprendimientos) ? c.emprendimientos.length : (c.emprendimientos as any)?.count || 0
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.nombre}</TableCell>
                    <TableCell className="text-muted-foreground">{c.descripcion || "—"}</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{c.icon || "—"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/categorias/${c.id}/editar`}>Editar</Link>
                      </Button>
                      <DeleteForm id={c.id} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
