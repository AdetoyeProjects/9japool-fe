import type { ComponentType, SVGProps } from "react"

export interface GameCategory {
  id: string
  title: string
  stake: string
  toWin: string
  minStake: string
  winRatio: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  buttonIcon: ComponentType<SVGProps<SVGSVGElement>>
  bgColor: string
  winColor: string
}


export interface SlideData {
  id: number
  image: string
  alt?: string
}

export interface StepData {
  number: string
  title: string
  description: string
  bgColor: string
}
