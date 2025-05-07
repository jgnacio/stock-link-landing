import React from 'react'
import { Truck, MessageCircle, Zap, TrendingUp } from 'lucide-react'
import FeatureCard from '@/components/ui/FeatureCard'

const features = [
  {
    icon: <Truck size={30} />,
    title: 'Local-first',
    description: 'Hecho para la realidad de las distribuidoras uruguayas. Sin vueltas.',
    className: 'col-span-1 md:col-span-2',
  },
  {
    icon: <MessageCircle size={30} />,
    title: 'Simple',
    description: 'Tu cliente lo usa como usa WhatsApp. No necesita aprender nada.',
  },
  {
    icon: <Zap size={30} />,
    title: 'Rápido',
    description: 'Sin esperas, sin instalación. Funciona desde el primer día.',
  },
  {
    icon: <TrendingUp size={30} />,
    title: 'Rentable',
    description: 'Una inversión que se paga sola: más pedidos, menos trabajo.',
    className: 'col-span-1 md:col-span-2',
  },
]

const Why: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black mb-8 sm:mb-12 md:mb-16 tracking-tight">
          ¿Por qué Stocklink?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto relative z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={feature.className}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Why
