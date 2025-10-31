"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

function parseRedes(formData: FormData) {
  const instagram = String(formData.get("instagram") || "").trim()
  const facebook = String(formData.get("facebook") || "").trim()
  const whatsapp = String(formData.get("whatsapp") || "").trim()
  const web = String(formData.get("web") || "").trim()
  const redes: Record<string, string> = {}
  if (instagram) redes.instagram = instagram
  if (facebook) redes.facebook = facebook
  if (whatsapp) redes.whatsapp = whatsapp
  if (web) redes.web = web
  return Object.keys(redes).length ? redes : null
}

async function uploadIfAny(file: unknown, folder: string) {
  try {
    if (!file || typeof file !== "object") return null
    const f: any = file as any
    if (!("size" in f) || !("name" in f) || !f.size) return null

    const admin = createAdminClient()
    if (!admin) return null
    const ext = String(f.name || "").split(".").pop() || "bin"
    const path = `${folder}/${crypto.randomUUID()}.${ext}`
    const { error } = await admin.storage.from("emprendimientos").upload(path, f, { upsert: false })
    if (error) return null
    const { data: pub } = admin.storage.from("emprendimientos").getPublicUrl(path)
    return pub.publicUrl
  } catch (err) {
    console.error("uploadIfAny error:", err)
    return null
  }
}

export async function createEmprendimiento(formData: FormData) {
  const nombre = String(formData.get("nombre") || "").trim()
  const descripcion_corta = String(formData.get("descripcion_corta") || "").trim()
  const descripcion_larga = String(formData.get("descripcion_larga") || "").trim()
  const categoria_id = String(formData.get("categoria_id") || "").trim() || null
  const telefono = String(formData.get("telefono") || "").trim() || null
  const direccion = String(formData.get("direccion") || "").trim() || null
  const destacado = formData.get("destacado") === "on"
  const palabras = String(formData.get("palabras_clave") || "").trim()
  const palabras_clave = palabras ? palabras.split(",").map((s) => s.trim()).filter(Boolean) : null
  const redes = parseRedes(formData)

  const logoFile = formData.get("logo_file")
  const portadaFile = formData.get("portada_file")
  let logo_url = await uploadIfAny(logoFile, "logos")
  let portada_url = await uploadIfAny(portadaFile, "portadas")

  const admin = createAdminClient()
  const supabase = admin ?? await createServerClient()
  const { error } = await supabase.from("emprendimientos").insert([
    {
      nombre,
      descripcion_corta,
      descripcion_larga: descripcion_larga || null,
      categoria_id,
      telefono,
      direccion,
      redes,
      logo_url,
      portada_url,
      destacado,
      palabras_clave,
    },
  ])
  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath("/admin/emprendimientos")
  redirect(`/admin?flash=${encodeURIComponent("Emprendimiento creado")}`)
}

export async function updateEmprendimiento(id: string, formData: FormData) {
  const nombre = String(formData.get("nombre") || "").trim()
  const descripcion_corta = String(formData.get("descripcion_corta") || "").trim()
  const descripcion_larga = String(formData.get("descripcion_larga") || "").trim()
  const categoria_id = String(formData.get("categoria_id") || "").trim() || null
  const telefono = String(formData.get("telefono") || "").trim() || null
  const direccion = String(formData.get("direccion") || "").trim() || null
  const destacado = formData.get("destacado") === "on"
  const palabras = String(formData.get("palabras_clave") || "").trim()
  const palabras_clave = palabras ? palabras.split(",").map((s) => s.trim()).filter(Boolean) : null
  const redes = parseRedes(formData)

  const logoFile = formData.get("logo_file")
  const portadaFile = formData.get("portada_file")
  let logo_url = await uploadIfAny(logoFile, "logos")
  let portada_url = await uploadIfAny(portadaFile, "portadas")

  const admin = createAdminClient()
  const supabase = admin ?? await createServerClient()

  const payload: Record<string, any> = {
    nombre,
    descripcion_corta,
    descripcion_larga: descripcion_larga || null,
    categoria_id,
    telefono,
    direccion,
    redes,
    destacado,
    palabras_clave,
  }
  if (logo_url) payload.logo_url = logo_url
  if (portada_url) payload.portada_url = portada_url

  const { error } = await supabase.from("emprendimientos").update(payload).eq("id", id)
  if (error) {
    redirect(`/admin?error=${encodeURIComponent(error.message)}`)
  }
  revalidatePath(`/admin/emprendimientos/${id}/editar`)
  revalidatePath("/admin/emprendimientos")
  redirect(`/admin?flash=${encodeURIComponent("Emprendimiento actualizado")}`)
}

export async function deleteEmprendimiento(id: string) {
  const admin = createAdminClient()
  const supabase = admin ?? await createServerClient()
  const { error } = await supabase.from("emprendimientos").delete().eq("id", id)
  if (error) return { ok: false, message: error.message }
  revalidatePath("/admin/emprendimientos")
  return { ok: true }
}

export async function setDestacado(id: string, value: boolean) {
  const admin = createAdminClient()
  const supabase = admin ?? await createServerClient()
  const { error } = await supabase.from("emprendimientos").update({ destacado: value }).eq("id", id)
  if (error) return { ok: false, message: error.message }
  revalidatePath("/admin/emprendimientos")
  return { ok: true }
}
