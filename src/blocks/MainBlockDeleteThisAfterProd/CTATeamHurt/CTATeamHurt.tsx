import React from 'react'
import { ShoppingCart, Package, LayoutDashboard, DollarSign } from 'lucide-react'

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
  return (
    <div className="py-32 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-right">
          <h2 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Un canal de ventas digital, que no reemplaza a tu equipo.
          </h2>
          <h3 className="text-6xl font-bold text-primary tracking-tight">Lo potencia.</h3>
        </div>
      </div>
    </div>
  )
}

export default CTATeamHurt
