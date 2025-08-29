import { howItWorksSteps } from "@/lib/data/steps"

export default function HowItWorks() {
  return (
    <section className="bg-[#111827] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white text-center mb-16">How It Works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="text-center">
              <div className={`${step.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <span className="text-white text-2xl font-bold">{step.number}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
