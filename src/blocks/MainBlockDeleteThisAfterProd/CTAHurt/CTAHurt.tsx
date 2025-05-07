'use client'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { BarChart, Cross, MessageCircleX, Package, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const CTAHurt: React.FC = () => {
  const painPointsRef = useRef<Array<HTMLDivElement | null>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (typeof window === 'undefined') return

    // Animación inicial del contenedor
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom-=100',
        toggleActions: 'play none none',
      },
    })

    // Animación de los puntos de dolor
    painPointsRef.current.forEach((point, index) => {
      if (point) {
        gsap.from(point, {
          opacity: 0,
          x: -50,
          duration: 0.5,
          delay: index * 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: point,
            start: 'top bottom-=100',
            toggleActions: 'play none none',
          },
        })
      }
    })
  }, [])

  const painPoints = [
    { icon: <MessageCircleX />, text: 'Se olvidan de pedidos' },
    { icon: <Users />, text: 'Pierden clientes por falta de seguimiento' },
    { icon: <BarChart />, text: 'Venden menos de lo que podrían' },
  ]

  return (
    <section className="w-full bg-zinc-950 py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Columna izquierda: Mensaje principal */}
        <div ref={containerRef} className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center max-w-lg">
            ¿Todavía hacés todo a mano?
          </h2>
          <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
            No pasa nada. Muchísimas distribuidoras siguen trabajando así.
          </p>
          <Link href="https://retailpro-app.vercel.app/">
            <Button className="bg-primary p-7 hover:bg-primary/90 py-4 px-10 rounded-full font-semibold text-lg shadow-lg transition-all duration-200 mt-4">
              Comenzar ahora
              <span className="ml-2 text-xl">→</span>
            </Button>
          </Link>
        </div>
        {/* Columna derecha: Pain points y CTA */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-md space-y-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                ref={(el) => {
                  painPointsRef.current[index] = el
                }}
                className="flex items-center p-5 bg-zinc-900 border-l-4 border-destructive rounded-2xl shadow-md"
              >
                <span className="text-3xl mr-4 text-destructive">{point.icon}</span>
                <p className="text-lg text-gray-200">{point.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 w-full max-w-md bg-primary rounded-2xl p-6 text-center shadow-lg">
            <p className="font-bold text-2xl text-primary-foreground mb-2">
              Stocklink te ayuda a dar el primer paso sin complicaciones.
            </p>
            <p className="text-primary-foreground mb-2">
              Sin instalar nada raro, sin ser técnico y sin cambiar toda tu rutina.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAHurt
