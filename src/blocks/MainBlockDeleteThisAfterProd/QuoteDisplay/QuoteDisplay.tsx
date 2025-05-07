'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const QuoteDisplay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstLineRef = useRef<HTMLParagraphElement>(null)
  const secondLineRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
    })
      .from(
        firstLineRef.current,
        {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      )
      .from(
        secondLineRef.current,
        {
          opacity: 0,
          x: 20,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4',
      )
  }, [])

  return (
    <div className="w-full  py-16">
      <div
        ref={containerRef}
        className="bg-gradient-to-r bg-black p-8 flex justify-center shadow-2xl"
      >
        <div className="space-y-6">
          <p ref={firstLineRef} className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Digitalizar no es tener una tienda online.
          </p>
          <p
            ref={secondLineRef}
            className="text-2xl md:text-3xl font-semibold text-white/90 leading-tight"
          >
            Es tener un sistema que realmente te libera y te hace vender más.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuoteDisplay
