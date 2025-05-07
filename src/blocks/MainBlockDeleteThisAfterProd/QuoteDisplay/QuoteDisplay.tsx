'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const QuoteDisplay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstLineRef = useRef<HTMLParagraphElement>(null)
  const secondLineRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom+=100',
        toggleActions: 'play none none',
      },
    })

    // Animación inicial del contenedor
    tl.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power4.out',
    })
      // Animación del primer texto
      .from(
        firstLineRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8',
      )
      // Animación del segundo texto
      .from(
        secondLineRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6',
      )
      // Animación de la imagen
      .from(
        'img',
        {
          opacity: 0,
          x: 50,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.4',
      )

    // Efecto de parallax suave al hacer scroll
    gsap.to(containerRef.current, {
      y: -20,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, [])

  return (
    <div className="w-full overflow-x-clip">
      <section className="w-full bg-white py-12 md:py-24 relative">
        <div
          ref={containerRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-left relative z-20"
        >
          <div className="space-y-4 md:space-y-6 w-full">
            <p
              ref={firstLineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2 md:mb-4"
            >
              Digitalizar no es solo tener una tienda online.
            </p>
            <p ref={secondLineRef} className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Es tener un sistema que realmente te libera y te hace vender más.
            </p>
          </div>
        </div>
        <Image
          src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1746635994/Bit-A/projects/Stock%20Link/viwtkvl1y0fnwtjqdpyl.png"
          alt="Team illustration"
          width={600}
          height={800}
          className="hidden lg:block absolute -bottom-48 -right-32 z-10 select-none pointer-events-none"
        />
      </section>
    </div>
  )
}

export default QuoteDisplay
