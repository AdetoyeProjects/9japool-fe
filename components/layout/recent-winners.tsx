import { recentWinners } from "@/lib/data/winners"
import { Trophy, Crown } from "lucide-react"
import Image from "next/image"

export default function RecentWinners() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("NGN", "NGN ")
  }

  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Winners</h2>
          <p className="text-gray-400 text-lg">See who&apos;s winning big on 9jaPool!</p>
        </div>

        {/* Winners Table */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden">
          {/* Table Header - hidden on small screens */}
          <div className="hidden md:block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 px-6 py-4">
            <div className="grid grid-cols-5 gap-4 text-white font-semibold">
              <div>Player</div>
              <div>Game ID</div>
              <div>Stake</div>
              <div>Winnings</div>
              <div>Time</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-700">
            {recentWinners.map((winner) => (
              <div
                key={winner.id}
                className="px-6 py-4 hover:bg-slate-800 transition-colors"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                  {/* Player */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={winner.player.avatar || "/placeholder.svg"}
                        alt={winner.player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white font-medium">{winner.player.name}</span>
                  </div>

                  <div className="text-gray-400">{winner.gameId}</div>
                  <div className="text-yellow-400 font-medium">{formatCurrency(winner.stake)}</div>

                  <div className="flex items-center gap-2">
                    {winner.winType === "trophy" ? (
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <Crown className="w-4 h-4 text-yellow-400" />
                    )}
                    <span className="text-green-400 font-bold">
                      {formatCurrency(winner.winnings)}
                    </span>
                  </div>

                  <div className="text-gray-400">{winner.time}</div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-2 text-sm">
                  {/* Player */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={winner.player.avatar || "/placeholder.svg"}
                        alt={winner.player.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-white font-medium">{winner.player.name}</span>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Game ID:</span>
                    <span>{winner.gameId}</span>
                  </div>

                  <div className="flex justify-between text-yellow-400 font-medium">
                    <span>Stake:</span>
                    <span>{formatCurrency(winner.stake)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Winnings:</span>
                    <div className="flex items-center gap-2">
                      {winner.winType === "trophy" ? (
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      ) : (
                        <Crown className="w-4 h-4 text-yellow-400" />
                      )}
                      <span className="text-green-400 font-bold">
                        {formatCurrency(winner.winnings)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-gray-400">
                    <span>Time:</span>
                    <span>{winner.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
