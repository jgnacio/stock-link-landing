'use client'
import React, { useEffect, createContext, useContext } from 'react'
import Lenis from 'lenis'

type LenisContextType = {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenisContext = () => useContext(LenisContext)

export const LenisProvider: React.FC<{
  children: React.ReactNode
  options?: ConstructorParameters<typeof Lenis>[0]
}> = ({ children, options }) => {
  const [lenis, setLenis] = React.useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    })

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [options])

  return <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
}
