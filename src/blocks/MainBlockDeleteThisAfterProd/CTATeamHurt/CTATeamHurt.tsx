import React from 'react'
import { ShoppingCart, Package, LayoutDashboard, DollarSign } from 'lucide-react'

const benefits = [
  {
    icon: <ShoppingCart className="w-10 h-10 text-blue-600" />,
    title: 'Ventas 24/7',
    description: 'Recibí pedidos automáticos incluso cuando tus vendedores no están disponibles',
  },
  {
    icon: <Package className="w-10 h-10 text-blue-600" />,
    title: 'Gestión de Stock',
    description: 'Mostrá promociones y stock sin imprimir listas',
  },
  {
    icon: <LayoutDashboard className="w-10 h-10 text-blue-600" />,
    title: 'Control Centralizado',
    description: 'Seguí todo desde un solo panel, sin perder control',
  },
  {
    icon: <DollarSign className="w-10 h-10 text-blue-600" />,
    title: 'Eficiencia',
    description: 'Ahorrá tiempo, errores y costos con cada pedido',
  },
]

const CTATeamHurt: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Un canal de ventas digital, que no reemplaza a tu equipo.
          </h2>
          <h3 className="text-4xl font-bold text-blue-600">Lo potencia.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex justify-center mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-center mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CTATeamHurt
