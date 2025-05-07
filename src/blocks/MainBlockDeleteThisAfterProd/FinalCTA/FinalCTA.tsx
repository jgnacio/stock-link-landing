import { Button } from '@/components/ui/button'
import React from 'react'

const FinalCTA: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-6 bg-gradient-to-b from-gray-50 to-white text-center">
      <h2 className="text-4xl font-medium text-gray-900 mb-8 tracking-tight leading-tight max-w-3xl">
        Solicitá tu cuenta y empezá a vender más desde hoy.
      </h2>
      <Button className="py-7 font-medium px-8 rounded-full transition-all duration-200 hover:scale-102 mb-6 text-lg">
        Quiero mi cuenta gratis
      </Button>
      <p className="text-base text-gray-500 leading-relaxed max-w-md">
        Sin compromiso. Sin tarjeta. Solo resultados.
      </p>
    </div>
  )
}

export default FinalCTA
