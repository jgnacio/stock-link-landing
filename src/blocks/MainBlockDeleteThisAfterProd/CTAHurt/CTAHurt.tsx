'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CTAHurt: React.FC = () => {
  const painPointsRef = useRef<Array<HTMLDivElement | null>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animación inicial del contenedor
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out',
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
        })
      }
    })
  }, [])

  const painPoints = [
    { icon: '❌', text: 'Se olvidan de pedidos' },
    { icon: '👥', text: 'Pierden clientes por falta de seguimiento' },
    { icon: '📉', text: 'Venden menos de lo que podrían' },
  ]

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        ¿Todavía hacés todo a mano?
      </h2>

      <p className="text-center text-gray-600 mb-8">
        No pasa nada. Muchísimas distribuidoras siguen trabajando así.
      </p>

      <div className="space-y-4">
        {painPoints.map((point, index) => (
          <div
            key={index}
            ref={(el) => {
              painPointsRef.current[index] = el
            }}
            className="flex items-center p-4 bg-red-50 border-l-4 border-red-500 rounded-lg"
          >
            <span className="text-2xl mr-4 text-red-500">{point.icon}</span>
            <p className="text-lg text-gray-700">{point.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
        <p className="font-bold text-xl text-gray-800 mb-4">
          Stocklink te ayuda a dar el primer paso sin complicaciones.
        </p>
        <p className="text-gray-600 mb-6">
          Sin instalar nada raro, sin ser técnico y sin cambiar toda tu rutina.
        </p>
        <button
          className="w-full max-w-xs bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold
                     transform transition-all duration-200 hover:scale-105 hover:bg-blue-700
                     active:scale-95"
        >
          Comenzar ahora
        </button>
      </div>
    </div>
  )
}

export default CTAHurt
