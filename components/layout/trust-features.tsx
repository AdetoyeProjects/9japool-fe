import { Shield, Clock, Headphones, CreditCard } from "lucide-react"
import { trustFeatures } from "@/lib/data/trust-features"

const iconMap = {
  "shield-check": Shield,
  clock: Clock,
  headphones: Headphones,
  "credit-card": CreditCard,
}

export default function TrustFeatures() {
  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

            return (
              <div key={feature.id} className="text-center">
                <div
                  className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
