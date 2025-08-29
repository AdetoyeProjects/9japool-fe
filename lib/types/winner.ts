export interface Winner {
  id: string
  player: {
    name: string
    avatar: string
  }
  gameId: string
  stake: number
  winnings: number
  time: string
  winType: "trophy" | "crown"
}
