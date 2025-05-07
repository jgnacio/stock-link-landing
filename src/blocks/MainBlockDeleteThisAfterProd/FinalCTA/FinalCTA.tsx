import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const FinalCTA: React.FC = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 max-w-3xl">
          Solicitá tu cuenta y empezá a vender más desde hoy.
        </h2>
        <Link href="/contact">
          <Button className="bg-primary hover:bg-primary/90  py-4 px-10 rounded-full font-semibold text-lg shadow-lg transition-all duration-200 mb-6">
            Quiero mi cuenta gratis
          </Button>
        </Link>

        <p className="text-lg text-gray-500 max-w-md">
          Sin compromiso. Sin tarjeta. Solo resultados.
        </p>
      </div>
    </section>
  )
}

export default FinalCTA
