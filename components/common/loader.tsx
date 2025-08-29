'use client'

import { cn } from '@/lib/utils'
import type { LoaderProps } from '@/lib/types/loader'
import { useEffect, useRef } from 'react'

const Loader = ({
  size = 'md',
  variant = 'default',
  className,
}: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap')
      const { MotionPathPlugin } = await import('gsap/MotionPathPlugin')

      gsap.registerPlugin(MotionPathPlugin)

      const eight = loaderRef.current?.querySelector('.eight')
      const one = loaderRef.current?.querySelector('.one')
      const letters = textRef.current?.querySelectorAll('.letter')

      if (!eight || !one || !letters) return

      // Infinity path (figure 8)
      const infinityPath = {
        path: [
          { x: -60, y: 0 },
          { x: 0, y: -40 },
          { x: 60, y: 0 },
          { x: 0, y: 40 },
          { x: -60, y: 0 },
        ],
        curviness: 1.5,
        autoRotate: false,
      }

      const infinityPathReverse = {
        path: [
          { x: 60, y: 0 },
          { x: 0, y: 40 },
          { x: -60, y: 0 },
          { x: 0, y: -40 },
          { x: 60, y: 0 },
        ],
        curviness: 1.5,
        autoRotate: false,
      }

      // Animate balls
      gsap.to(eight, {
        duration: 3,
        repeat: -1,
        ease: 'power1.inOut',
        motionPath: infinityPath,
      })

      gsap.to(one, {
        duration: 3,
        repeat: -1,
        ease: 'power1.inOut',
        motionPath: infinityPathReverse,
      })

      // Smash letters when balls cross
      const smashLetters = () => {
        gsap.fromTo(
          letters,
          { x: 0, y: 0, scale: 1 },
          {
            x: () => gsap.utils.random(-20, 20),
            y: () => gsap.utils.random(-15, 15),
            scale: 1.2,
            stagger: 0.05,
            ease: 'power2.out',
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          }
        )
      }

      // Trigger smash at loop midpoint
      gsap
        .timeline({ repeat: -1 })
        .to({}, { duration: 1.5, onComplete: smashLetters })
    }

    if (variant === 'default' && loaderRef.current) {
      loadGSAP()
    }
  }, [variant])

  const containerSize = size === 'sm' ? 120 : size === 'md' ? 150 : 180
  const ballSize = size === 'sm' ? 20 : size === 'md' ? 28 : 36

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative">
        {/* Pool balls animation */}
        <div
          ref={loaderRef}
          className="relative"
          style={{
            width: containerSize,
            height: containerSize,
          }}
        >
          {/* 8 Ball */}
          <div
            className="eight absolute bg-black text-white font-bold rounded-full flex items-center justify-center shadow-lg"
            style={{
              width: ballSize,
              height: ballSize,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize:
                size === 'sm' ? '10px' : size === 'md' ? '12px' : '16px',
            }}
          >
            8
          </div>

          {/* 1 Ball */}
          <div
            className="one absolute bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center shadow-lg"
            style={{
              width: ballSize,
              height: ballSize,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize:
                size === 'sm' ? '10px' : size === 'md' ? '12px' : '16px',
            }}
          >
            1
          </div>
        </div>

        {/* Logo text with smash effect */}
        <div
          ref={textRef}
          className="mt-4 text-center font-medium text-gray-400"
        >
          9ja
          <span className="text-green-500">
            {['P', 'o', 'o', 'l'].map((char, i) => (
              <span key={i} className="letter inline-block">
                {char}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Loader
