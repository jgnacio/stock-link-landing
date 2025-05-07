'use client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { BarChart, Package, ShoppingCart, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import FeatureCard from '@/components/ui/FeatureCard'

interface FeaturesProps {
  darkMode?: boolean
}

const features = [
  {
    title: 'Más pedidos, sin más llamadas',
    description: 'Automatiza el proceso de pedidos y reduce la necesidad de llamadas telefónicas',
    icon: <ShoppingCart size={30} />,
  },
  {
    title: 'Todo en un solo lugar',
    description: 'Centraliza toda la información y gestión de pedidos en una única plataforma',
    icon: <Package size={30} />,
  },
  {
    title: 'Menos tareas repetitivas para tu equipo',
    description: 'Automatiza procesos y libera a tu equipo para tareas más importantes',
    icon: <Zap size={30} />,
  },
  {
    title: 'Stock actualizado para cada cliente',
    description: 'Mantén un control preciso del inventario por cliente',
    icon: <BarChart size={30} />,
  },
]

export default function Features({ darkMode = false }: FeaturesProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationsRef = useRef<{ [key: number]: gsap.core.Timeline }>({})

  useGSAP(() => {
    cardRefs.current.forEach((card, index) => {
      if (!card) return

      const iconCircle = card.querySelector('.icon-circle')
      const cardElement = card

      animationsRef.current[index] = gsap
        .timeline({ paused: true })
        .to(iconCircle, {
          borderColor: '#DFFD51',
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .to(
          cardElement,
          {
            borderColor: '#DFFD51',
            duration: 0.4,
            ease: 'power2.inOut',
          },
          '-=0.2',
        )

      const reverseTimeline = gsap.timeline({ paused: true }).to([iconCircle, cardElement], {
        borderColor: 'transparent',
        duration: 0.4,
        ease: 'power2.inOut',
      })

      card.addEventListener('mouseenter', () => {
        reverseTimeline.pause()
        if (animationsRef.current[index]) {
          animationsRef.current[index].restart()
        }
      })

      card.addEventListener('mouseleave', () => {
        if (animationsRef.current[index]) {
          animationsRef.current[index].pause()
        }
        reverseTimeline.restart()
      })
    })

    return () => {
      Object.values(animationsRef.current).forEach((timeline) => {
        timeline.kill()
      })
    }
  }, [])

  return (
    <section className={`w-full py-24 bg-gray-50`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Características principales
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma transforma la gestión de pedidos
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null): void => {
                cardRefs.current[index] = el
              }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
