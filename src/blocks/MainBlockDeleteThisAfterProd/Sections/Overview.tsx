import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Overview() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Ya usás WhatsApp, Excel o Instagram?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Entonces ya empezaste. Ahora hacé que eso funcione sin errores, sin olvidos y sin perder
            ventas.
          </p>
        </div>
        <Link href="https://retailpro-app.vercel.app/">
          <Button className="bg-primary hover:bg-primary/90  px-8 py-6 text-lg rounded-full font-semibold transition-all duration-200 shadow-lg hover:scale-105">
            Solicitar cuenta
          </Button>
        </Link>
      </div>
    </section>
  )
}
