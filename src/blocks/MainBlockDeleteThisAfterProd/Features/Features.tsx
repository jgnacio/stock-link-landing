import React from 'react'

const features = [
  {
    title: 'Más pedidos, sin más llamadas',
    description: 'Automatiza el proceso de pedidos y reduce la necesidad de llamadas telefónicas',
    icon: '📞',
  },
  {
    title: 'Todo en un solo lugar',
    description: 'Centraliza toda la información y gestión de pedidos en una única plataforma',
    icon: '📦',
  },
  {
    title: 'Menos tareas repetitivas para tu equipo',
    description: 'Automatiza procesos y libera a tu equipo para tareas más importantes',
    icon: '⚡',
  },
  {
    title: 'Stock actualizado para cada cliente',
    description: 'Mantén un control preciso del inventario por cliente',
    icon: '📊',
  },
]

const Features: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
