import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { gameCategories } from "@/lib/constants/game-categories"

export default function GameCategories() {
  return (
    <section className="py-16 px-4 bg-[#111827]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-4">Choose Your Game Category</h2>
          <p className="text-[#9CA3AF] text-lg">Pick your stake amount and get ready to win big!</p>
        </div>

        {/* Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameCategories.map((category) => {
            const Icon = category.icon
            const BtnIcon = category.buttonIcon
            return (
              <Card
                key={category.id}
                className={`${category.bgColor} border-0 p-6 text-center rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
              >
                {/* Icon */}
                <div className="flex justify-center">
  <div className="bg-[#E5E7EB]/50 rounded-full h-12 w-12 flex items-center justify-center shadow-md">
    <Icon className="w-6 h-6 text-[#FACC15] stroke-3 " />
  </div>
</div>

                {/* Title */}
                <h3 className="text-3xl font-bold tracking-wide text-white ">{category.title}</h3>

                {/* Stake Amount */}
                <div className="">
                  <p className="text-white text-sm uppercase tracking-wide">STAKE</p>
                  <p className="text-white text-3xl font-extrabold ">{category.stake}</p>
                </div>

                {/* To Win Amount */}
                <div className="mb-4">
                  <p className="text-white text-sm uppercase tracking-wide">TO WIN</p>
                  <p className={`text-4xl font-extrabold ${category.winColor}`}>{category.toWin}</p>
                </div>

                {/* Stats */}
                <div className="bg-[#E5E7EB]/20 p-6 rounded-lg text-white text-sm  space-y-2">
  {/* Row 1 */}
  <div className="flex justify-between items-center">
    <span className="text-gray-200">Min. Stake:</span>
    <span className="font-semibold">{category.minStake}</span>
  </div>

  {/* Row 2 */}
  <div className="flex justify-between items-center">
    <span className="text-gray-200">Win Ratio:</span>
    <span className="font-semibold text-green-400">{category.winRatio}</span>
  </div>
</div>


                {/* Stake Button */}
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-7 px-6 rounded-lg transition-colors duration-200">
                  <BtnIcon className="w-4 h-4 mr-2 inline fill-black" />
                  Stake Now
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
