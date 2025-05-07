'use client'
import React, { useRef } from 'react'
import { ShoppingCart, Package, LayoutDashboard, DollarSign } from 'lucide-react'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  {
    icon: <ShoppingCart className="w-16 h-16 text-primary" />,
    title: 'Ventas 24/7',
    description: 'Recibí pedidos automáticos incluso cuando tus vendedores no están disponibles',
  },
  {
    icon: <Package className="w-16 h-16 text-primary" />,
    title: 'Gestión de Stock',
    description: 'Mostrá promociones y stock sin imprimir listas',
  },
  {
    icon: <LayoutDashboard className="w-16 h-16 text-primary" />,
    title: 'Control Centralizado',
    description: 'Seguí todo desde un solo panel, sin perder control',
  },
  {
    icon: <DollarSign className="w-16 h-16 text-primary" />,
    title: 'Eficiencia',
    description: 'Ahorrá tiempo, errores y costos con cada pedido',
  },
]

const CTATeamHurt: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

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

    tl.from(containerRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power4.out',
    })
      .from(
        '.cta-content',
        {
          opacity: 0,
          x: 30,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8',
      )
      .from(
        '.cta-image',
        {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.6',
      )

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
    <div className="py-20 md:py-40 relative overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row items-center justify-end gap-8 relative">
          <Image
            src="https://res.cloudinary.com/dhq5ewbyu/image/upload/v1746648967/Bit-A/projects/Stock%20Link/khdcghkjl7lvb1vpq2qt.png"
            alt="Stock Link app interface"
            width={600}
            height={600}
            className="hidden md:block absolute  -left-20 z-30 select-none pointer-events-none"
          />
          <div ref={containerRef} className="w-full md:w-1/2 text-center md:text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Un canal de ventas digital, que no reemplaza a tu equipo.
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
              Lo potencia.
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTATeamHurt
