'use client'
import { useEffect, useRef } from 'react'
import { UnicornStudioConfig, defaultConfig } from './config'

declare global {
  interface Window {
    UnicornStudio: {
      init: () => Promise<void>
      destroy: () => void
      addScene: (config: any) => Promise<any>
    }
  }
}

interface UnicornSceneProps {
  config: Pick<UnicornStudioConfig, 'projectId'> & Partial<Omit<UnicornStudioConfig, 'projectId'>>
}

const UnicornScene: React.FC<UnicornSceneProps> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Convertir valores null a undefined
  const cleanConfig = Object.entries(config).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value === null ? undefined : value,
    }),
    {},
  ) as UnicornStudioConfig

  const mergedConfig = { ...defaultConfig, ...cleanConfig }

  useEffect(() => {
    if (!mergedConfig.projectId) {
      console.error('Error: projectId es requerido para Unicorn Studio')
      return
    }

    // Carga el script del SDK desde el CDN oficial
    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js'
    script.async = true
    script.onerror = (error) => {
      console.error('Error al cargar el script de Unicorn Studio:', error)
    }
    script.onload = () => {
      if (window.UnicornStudio) {
        // Inicializar la escena usando addScene para más control
        window.UnicornStudio.addScene({
          elementId: containerRef.current?.id || 'unicorn-scene',
          projectId: mergedConfig.projectId,
          scale: mergedConfig.scale,
          dpi: mergedConfig.dpi,
          lazyLoad: mergedConfig.lazyLoad,
          production: mergedConfig.production,
          altText: mergedConfig.altText,
          ariaLabel: mergedConfig.ariaLabel,
          interactivity: {
            mouse: {
              disableMobile: mergedConfig.disableMobile,
            },
          },
        })
          .then((scene) => {
            console.log(
              'Escena de Unicorn Studio inicializada con projectId:',
              mergedConfig.projectId,
            )
          })
          .catch((error: Error) => {
            console.error('Error al inicializar la escena:', error)
          })
      } else {
        console.error('El objeto UnicornStudio no está disponible después de cargar el script')
      }
    }
    document.body.appendChild(script)

    // Limpieza al desmontar el componente
    return () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.destroy()
      }
      document.body.removeChild(script)
    }
  }, [mergedConfig.projectId])

  if (!mergedConfig.projectId) {
    return <div>Error: projectId es requerido para Unicorn Studio</div>
  }

  return (
    <div className=" -mt-[400px] max-h-[400px]  flex justify-center items-start overflow-hidden mix-blend-screen">
      <div ref={containerRef} id="unicorn-scene" style={{ width: '100%', height: '100%' }}></div>
    </div>
  )
}

export default UnicornScene
