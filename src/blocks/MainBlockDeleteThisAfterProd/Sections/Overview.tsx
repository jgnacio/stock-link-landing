import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Overview() {
  return (
    <section className="w-full bg-white py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex flex-col gap-4 md:gap-6 max-w-2xl text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4">
            ¿Ya usás WhatsApp, Excel o Instagram?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Entonces ya empezaste. Ahora hacé que eso funcione sin errores, sin olvidos y sin perder
            ventas.
          </p>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <Link href="https://retailpro-app.vercel.app/" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full font-semibold transition-all duration-200 shadow-lg hover:scale-105">
              Solicitar cuenta
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
