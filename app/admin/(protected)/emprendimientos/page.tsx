import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { setDestacado, deleteEmprendimiento } from "../../emprendimientos/actions"

function DestacadoForm({ id, value }: { id: string; value: boolean }) {
  return (
    <form action={async (fd) => { 'use server'; await setDestacado(id, !value) }}>
      <Button variant={value ? "default" : "outline"} size="sm" type="submit">
        {value ? "Sí" : "No"}
      </Button>
    </form>
  )
}

function DeleteForm({ id }: { id: string }) {
  return (
    <form action={async () => { 'use server'; await deleteEmprendimiento(id) }}>
      <Button variant="destructive" size="sm" type="submit">Eliminar</Button>
    </form>
  )
}

export default async function EmprendimientosListPage() {
  const supabase = await createClient()
  const { data } = await supabase.from("emprendimientos").select("id, nombre, destacado, categorias ( nombre )").order("created_at", { ascending: false })

  return (
    <main className="container mx-auto px-4 py-8">
      <AdminNav />
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Emprendimientos</CardTitle>
          <Button asChild>
            <Link href="/admin/emprendimientos/nuevo">Nuevo</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Destacado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data || []).map((e: any) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.nombre}</TableCell>
                  <TableCell>{e.categorias?.nombre || "—"}</TableCell>
                  <TableCell>
                    <DestacadoForm id={e.id} value={!!e.destacado} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/emprendimientos/${e.id}/editar`}>Editar</Link>
                    </Button>
                    <DeleteForm id={e.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  )
}
