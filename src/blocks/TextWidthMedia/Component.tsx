'use client'
import RichText from '@/components/RichText'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Canvas, useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import React, { useRef, useEffect } from 'react'
import { MediaBlock } from '../MediaBlock/Component'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface TextWidthMediaProps {
  text: any
  media: string | Media
  layout: 'left' | 'right'
  blockType?: string
  blockName?: string
  mediaEffects?: {
    floatingTriangles: boolean
    hover: boolean
    hoverEffect?: {
      rotation: boolean
      glow: boolean
      gradient: boolean
      rotationAngle: number
      gradientColor: string
    }
    shadow: boolean
  }
  showOnScroll?: boolean
  textAnimation?: {
    animateOnScroll: boolean
    animationType: 'letterStagger' | 'wordStagger'
    animationDuration: number
  }
}

type Props = TextWidthMediaProps & {
  className?: string
}

const FloatingTriangle: React.FC<{ position: [number, number, number]; delay: number }> = ({
  position,
  delay,
}) => {
  const meshRef = useRef<any>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + delay) * 0.2 + position[1]
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <coneGeometry args={[0.3, 0.6, 3]} />
      <meshStandardMaterial
        color="#DEFC4F"
        emissive="#DEFC4F"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}
const FloatingTriangles: React.FC = () => {
  return (
    <div className="absolute bottom-0 right-0 w-32 h-32">
      <Canvas
        dpr={[1, 2]} // Ajuste para pantallas de alta densidad
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 3.5], fov: 50 }}
      >
        <ambientLight intensity={3} />
        <pointLight position={[10, 10, 10]} />

        {/* Triángulos flotantes */}
        <FloatingTriangle position={[0, 0, 0]} delay={0} />
        <FloatingTriangle position={[0.5, 0.2, 1]} delay={1} />
        <FloatingTriangle position={[0.3, 0.1, 2]} delay={2} />

        {/* Efectos de postprocesamiento */}
        <EffectComposer>
          <Bloom intensity={0.3} luminanceThreshold={0.1} />
          <Noise opacity={0.02} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

export const TextWidthMedia: React.FC<Props> = ({
  text,
  media,
  layout,
  mediaEffects = { floatingTriangles: false, hover: false, shadow: false },
  showOnScroll = false,
  textAnimation,
  className,
}) => {
  const mediaRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showOnScroll && mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: mediaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }
  }, [showOnScroll])

  useEffect(() => {
    if (textAnimation?.animateOnScroll && textRef.current) {
      const type = textAnimation.animationType === 'letterStagger' ? 'chars' : 'words'

      const split = new SplitText(textRef.current, { type })

      const targets = type === 'chars' ? split.chars : split.words

      gsap.set(targets, {
        opacity: 0,
        y: 40,
      })

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: textAnimation.animationDuration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      return () => {
        split.revert()
      }
    }
  }, [textAnimation])

  useEffect(() => {
    if (mediaEffects.hover && mediaContainerRef.current && gradientRef.current) {
      const mediaElement = mediaContainerRef.current
      const gradientElement = gradientRef.current

      // Configuración inicial del gradiente
      gsap.set(gradientElement, {
        opacity: 0,
        background: `linear-gradient(45deg, ${mediaEffects.hoverEffect?.gradientColor || '#000000'}00, ${mediaEffects.hoverEffect?.gradientColor || '#000000'}00)`,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      })

      // Efecto de hover
      const handleMouseEnter = () => {
        const timeline = gsap.timeline()

        if (mediaEffects.hoverEffect?.rotation) {
          timeline.to(mediaElement, {
            rotation: mediaEffects.hoverEffect.rotationAngle || 5,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        if (mediaEffects.hoverEffect?.glow) {
          timeline.to(
            mediaElement,
            {
              filter: 'brightness(1.2)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '<',
          )
        }

        if (mediaEffects.hoverEffect?.gradient) {
          timeline.to(
            gradientElement,
            {
              opacity: 1,
              background: `linear-gradient(45deg, ${mediaEffects.hoverEffect.gradientColor || '#000000'}ff, ${mediaEffects.hoverEffect.gradientColor || '#000000'}ff)`,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<',
          )
        }
      }

      const handleMouseLeave = () => {
        const timeline = gsap.timeline()

        if (mediaEffects.hoverEffect?.rotation) {
          timeline.to(mediaElement, {
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        if (mediaEffects.hoverEffect?.glow) {
          timeline.to(
            mediaElement,
            {
              filter: 'brightness(1)',
              duration: 0.3,
              ease: 'power2.out',
            },
            '<',
          )
        }

        if (mediaEffects.hoverEffect?.gradient) {
          timeline.to(
            gradientElement,
            {
              opacity: 0,
              background: `linear-gradient(45deg, ${mediaEffects.hoverEffect.gradientColor || '#000000'}00, ${mediaEffects.hoverEffect.gradientColor || '#000000'}00)`,
              duration: 0.3,
              ease: 'power2.out',
            },
            '<',
          )
        }
      }

      mediaElement.addEventListener('mouseenter', handleMouseEnter)
      mediaElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        mediaElement.removeEventListener('mouseenter', handleMouseEnter)
        mediaElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mediaEffects])

  return (
    <div
      className={cn(
        'grid gap-8 md:grid-cols-2 items-center container',
        {
          'md:grid-flow-dense': layout === 'left',
        },
        className,
      )}
    >
      <div ref={textRef}>
        <RichText data={text} className="prose-xl" />
      </div>
      <div className="relative" ref={mediaRef}>
        <div className={cn('relative')} ref={mediaContainerRef}>
          {/* Agrega un gradiente circular div negro estilo sombra para la imagen */}
          <div className="absolute inset-0 rounded-full -z-10 blur-3xl opacity-25 bg-gradient-to-br from-black/0 via-muted/70 to-primary"></div>

          <MediaBlock
            media={media}
            blockType="mediaBlock"
            className={cn({
              'md:col-start-1': layout === 'left',
            })}
          />
          {mediaEffects.hover && <div ref={gradientRef} />}
        </div>
        {mediaEffects.floatingTriangles && (
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
            <FloatingTriangles />
          </div>
        )}
      </div>
    </div>
  )
}
