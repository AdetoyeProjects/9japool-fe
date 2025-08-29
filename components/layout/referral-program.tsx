import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { referralBenefits } from "@/lib/data/referral-benefits"

export default function ReferralProgram() {
  return (
    <section className="py-16 px-4 bg-[#111827]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-3xl font-bold text-white text-balance">Earn While Your Friends Play</h2>
              <p className="text-[15px] text-gray-300">Join our referral program and start earning from your network.</p>
            </div>

            {/* Benefits List */}
            <div className="space-y-8">
              {referralBenefits.map((benefit) => (
                <div key={benefit.id} className="flex items-center gap-3">
                  {/* <div className="flex-shrink-0 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"> */}
                    <img src="/assets/images/Vector.png" alt="check" className="w-4 h-4 text-slate-800" />
                  {/* </div> */}
                  <span className="text-white font-medium">{benefit.title}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold">
              Join Referral Program
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 lg:p-12"> */}
              <img
                src="/assets/images/referral.png"
                alt="Happy friends celebrating referral earnings"
                className="w-full h-auto rounded-lg"
              />
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
