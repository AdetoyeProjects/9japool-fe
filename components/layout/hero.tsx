import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/background.png')",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-20 font-poppins">
          E don sure say One <br /> Person go Win!
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-2 ">
          Nigeria&apos;s most trusted online lottery platform.
        </p>

        <p className="text-lg md:text-xl text-white/80 mb-8">
          Stake small, win massive, and refer friends for extra rewards.
        </p>

        <Button
          size="lg"
          className="bg-[#0FA958] hover:bg-green-600 text-white px-8 py-7 text-lg  rounded-lg transition-colors"
        >
          Enter Game
        </Button>
      </div>
    </section>
  )
}
