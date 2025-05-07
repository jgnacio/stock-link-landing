import React from 'react'
import { Truck, MessageCircle, Zap, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: <Truck size={40} />,
    title: 'Local-first',
    description: 'Hecho para la realidad de las distribuidoras uruguayas. Sin vueltas.',
    className: 'col-span-2 bg-primary/90',
  },
  {
    icon: <MessageCircle size={40} />,
    title: 'Simple',
    description: 'Tu cliente lo usa como usa WhatsApp. No necesita aprender nada.',
    className: 'bg-primary/80',
  },
  {
    icon: <Zap size={40} />,
    title: 'Rápido',
    description: 'Sin esperas, sin instalación. Funciona desde el primer día.',
    className: 'bg-primary/70',
  },
  {
    icon: <TrendingUp size={40} />,
    title: 'Rentable',
    description: 'Una inversión que se paga sola: más pedidos, menos trabajo.',
    className: 'col-span-2 bg-primary/60',
  },
]

const Why: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">¿Por qué Stocklink?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.className} rounded-2xl p-6 flex flex-col text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="mb-4 bg-white/10 p-3 rounded-xl w-fit">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-primary-foreground/90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Why
