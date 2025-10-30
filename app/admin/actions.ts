"use server"
import { redirect } from "next/navigation"
import { createClient as createServerClient } from "@/lib/supabase/server"

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") || "").trim()
  const password = String(formData.get("password") || "")
  const supabase = await createServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return { ok: false, message: error.message }
  }
  redirect("/admin")
}

export async function logout() {
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

