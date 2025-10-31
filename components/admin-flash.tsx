"use client"
import { useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function AdminFlash() {
  const params = useSearchParams()
  const router = useRouter()
  useEffect(() => {
    const ok = params.get("flash")
    const err = params.get("error")
    if (ok) {
      toast({ title: ok })
      const sp = new URLSearchParams(params)
      sp.delete("flash")
      router.replace(`/admin?${sp.toString()}`)
    } else if (err) {
      toast({ title: "Error", description: err, variant: "destructive" as any })
      const sp = new URLSearchParams(params)
      sp.delete("error")
      router.replace(`/admin?${sp.toString()}`)
    }
  }, [params, router])
  return null
}

