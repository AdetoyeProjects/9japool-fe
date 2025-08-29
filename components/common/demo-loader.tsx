"use client"

import { useState } from "react"
import Loader from "./loader"
import { Button } from "@/components/ui/button"

const DemoLoader = () => {
  const [activeVariant, setActiveVariant] = useState<"default" | "minimal" | "pulse">("default")
  const [size, setSize] = useState<"sm" | "md" | "lg">("md")

  return (
    <div className="p-8 bg-gray-900 rounded-lg space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">Loader Demo</h3>

      {/* Variant Controls */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Variant:</label>
        <div className="flex gap-2">
          {(["default", "minimal", "pulse"] as const).map((variant) => (
            <Button
              key={variant}
              variant={activeVariant === variant ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveVariant(variant)}
              className="capitalize"
            >
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Size Controls */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Size:</label>
        <div className="flex gap-2">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Button
              key={s}
              variant={size === s ? "default" : "outline"}
              size="sm"
              onClick={() => setSize(s)}
              className="uppercase"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Loader Display */}
      <div className="bg-gray-800 rounded-lg p-8 flex items-center justify-center min-h-[120px]">
        <Loader variant={activeVariant} size={size} />
      </div>
    </div>
  )
}

export default DemoLoader
