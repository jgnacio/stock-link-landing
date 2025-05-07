'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  darkMode?: boolean
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = '',
  darkMode = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const iconCircleRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const reverseAnimationRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!cardRef.current || !iconCircleRef.current) return

    animationRef.current = gsap
      .timeline({ paused: true })
      .to(iconCircleRef.current, {
        borderColor: '#DFFD51',
        duration: 0.4,
        ease: 'power2.inOut',
      })
      .to(
        cardRef.current,
        {
          borderColor: '#DFFD51',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.2',
      )

    reverseAnimationRef.current = gsap
      .timeline({ paused: true })
      .to([iconCircleRef.current, cardRef.current], {
        borderColor: 'transparent',
        duration: 0.4,
        ease: 'power2.inOut',
      })

    const card = cardRef.current
    const iconCircle = iconCircleRef.current

    const handleMouseEnter = () => {
      reverseAnimationRef.current?.pause()
      animationRef.current?.restart()
    }

    const handleMouseLeave = () => {
      animationRef.current?.pause()
      reverseAnimationRef.current?.restart()
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      animationRef.current?.kill()
      reverseAnimationRef.current?.kill()
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-2xl p-8 bg-gradient-to-br from-white to-gray-50/10 shadow-lg border-2 border-transparent transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div
        ref={iconCircleRef}
        className="icon-circle absolute -top-6 left-8 rounded-full p-4 shadow-lg border-2 border-primary bg-gradient-to-br from-white via-gray-100/90 to-gray-50/10"
      >
        <span className="text-xl text-black">{icon}</span>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        <p className="leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
