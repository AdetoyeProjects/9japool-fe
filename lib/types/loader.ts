export interface LoaderProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "minimal" | "pulse"
  className?: string
}

export interface LoaderBallProps {
  delay: number
  color: string
  size: number
}
