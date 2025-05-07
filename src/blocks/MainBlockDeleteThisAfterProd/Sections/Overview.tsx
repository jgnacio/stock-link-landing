import { Button } from '@/components/ui/button'

export default function Overview() {
  return (
    <div className="flex items-center justify-between gap-4 prose prose-2xl container px-4 py-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold ">¿Ya usás WhatsApp, Excel o Instagram?</h2>
        <p>
          Entonces ya empezaste. Ahora hacé que eso funcione sin errores, sin olvidos y sin perder
          ventas.
        </p>
      </div>
      <Button>Solicitar mi cuenta</Button>
    </div>
  )
}
