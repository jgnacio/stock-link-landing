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

gsap.registerPlugin(ScrollTrigger)

interface TextWidthMediaProps {
  text: any
  media: string | Media
  layout: 'left' | 'right'
  blockType?: string
  blockName?: string
  imageEffect?: 'none' | 'floatingTriangles'
  showOnScroll?: boolean
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
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Triángulos flotantes */}
        <FloatingTriangle position={[0, 0, 0]} delay={0} />
        <FloatingTriangle position={[0.5, 0.2, 1]} delay={1} />
        <FloatingTriangle position={[0.3, 0.1, 2]} delay={2} />

        {/* Efectos de postprocesamiento */}
        <EffectComposer>
          <Bloom intensity={2.5} luminanceThreshold={0.1} />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
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
  imageEffect = 'none',
  showOnScroll = false,
  className,
}) => {
  const mediaRef = useRef<HTMLDivElement>(null)

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
      <RichText data={text} className="prose-xl" />
      <div className="relative" ref={mediaRef}>
        <MediaBlock
          media={media}
          blockType="mediaBlock"
          className={cn({
            'md:col-start-1': layout === 'left',
          })}
        />
        {imageEffect === 'floatingTriangles' && <FloatingTriangles />}
      </div>
    </div>
  )
}
