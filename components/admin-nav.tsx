"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, LayoutDashboard } from "lucide-react"

export function AdminNav({ panelHref = "/admin" }: { panelHref?: string }) {
  const router = useRouter()
  return (
    <div className="flex items-center gap-2 mb-4">
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>
      <Button asChild variant="outline" size="sm">
        <Link href={panelHref}>
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Ir al panel
        </Link>
      </Button>
    </div>
  )
}

