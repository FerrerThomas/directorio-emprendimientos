"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Business = {
  id: string
  nombre: string
  descripcion_corta: string
  portada_url: string | null
  logo_url: string | null
  categorias: { nombre: string } | null
}

export function FeaturedCarousel({ businesses }: { businesses: Business[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % businesses.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [businesses.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + businesses.length) % businesses.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % businesses.length)
  }

  if (businesses.length === 0) return null

  const currentBusiness = businesses[currentIndex]

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <Link href={`/emprendimiento/${currentBusiness.id}`}>
          <div className="relative h-[400px] bg-muted">
            <Image
              src={currentBusiness.portada_url || "/placeholder.svg?height=400&width=1200"}
              alt={currentBusiness.nombre}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-4 mb-3">
                {currentBusiness.logo_url && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white bg-white">
                    <Image
                      src={currentBusiness.logo_url || "/placeholder.svg"}
                      alt={`${currentBusiness.nombre} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-balance">{currentBusiness.nombre}</h3>
                  {currentBusiness.categorias && (
                    <p className="text-sm text-white/90">{currentBusiness.categorias.nombre}</p>
                  )}
                </div>
              </div>
              <p className="text-white/95 text-pretty">{currentBusiness.descripcion_corta}</p>
            </div>
          </div>
        </Link>
      </Card>

      {/* Navigation Buttons */}
      {businesses.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {businesses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
