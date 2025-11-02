"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient as createServerClient } from "@/lib/supabase/server"
import * as Lucide from "lucide-react"

function getClient() {
  const admin = createAdminClient()
  if (admin) return admin
  return createServerClient()
}

function toPascal(input: string) {
  return input
    .split(/[-_\s]+/)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ""))
    .join("")
}

function isValidLucideIcon(name: string) {
  if (!name) return false
  const key = toPascal(name.trim())
  return Boolean((Lucide as any)[key])
}

export async function createCategoria(formData: FormData) {
  const nombre = String(formData.get("nombre") || "").trim()
  const descripcion = String(formData.get("descripcion") || "").trim() || null
  const icon = String(formData.get("icon") || "").trim() || null
  if (!nombre) {
    redirect(`/admin/categorias?n=1&error=${encodeURIComponent("El nombre es requerido")}`)
  }
  if (icon && !isValidLucideIcon(icon)) {
    redirect(`/admin/categorias?n=1&error=${encodeURIComponent("Icono inválido. Usa un nombre de Lucide, ej: wrench, utensils, heart-pulse")}`)
  }
  const supabase = await getClient()
  const { error } = await supabase.from("categorias").insert([{ nombre, descripcion, icon }])
  if (error) {
    redirect(`/admin/categorias?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath("/admin/categorias")
  redirect(`/admin/categorias?flash=${encodeURIComponent("Categoría creada")}`)
}

export async function updateCategoria(id: string, formData: FormData) {
  const nombre = String(formData.get("nombre") || "").trim()
  const descripcion = String(formData.get("descripcion") || "").trim() || null
  const icon = String(formData.get("icon") || "").trim() || null
  if (!nombre) {
    redirect(`/admin/categorias/${id}/editar?error=${encodeURIComponent("El nombre es requerido")}`)
  }
  if (icon && !isValidLucideIcon(icon)) {
    redirect(`/admin/categorias/${id}/editar?error=${encodeURIComponent("Icono inválido. Usa un nombre de Lucide, ej: wrench, utensils, heart-pulse")}`)
  }
  const supabase = await getClient()
  const { error } = await supabase.from("categorias").update({ nombre, descripcion, icon }).eq("id", id)
  if (error) {
    redirect(`/admin/categorias/${id}/editar?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath(`/admin/categorias/${id}/editar`)
  revalidatePath("/admin/categorias")
  redirect(`/admin/categorias?flash=${encodeURIComponent("Categoría actualizada")}`)
}

export async function deleteCategoria(id: string) {
  const supabase = await getClient()
  const { error } = await supabase.from("categorias").delete().eq("id", id)
  if (error) {
    redirect(`/admin/categorias?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath("/admin/categorias")
  redirect(`/admin/categorias?flash=${encodeURIComponent("Categoría eliminada")}`)
}
