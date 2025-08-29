"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { promotionalSlides } from "@/lib/data/slides"

export default function PromotionalSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotionalSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#1F2937] py-16">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden">
            {promotionalSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt || `9jaPool promotional slide ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {promotionalSlides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-green-500" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
