'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState, useRef } from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import gsap from 'gsap'
import Link from 'next/link'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')

    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        {
          scale: 1.2,
          filter: 'blur(10px)',
          opacity: 0,
        },
        {
          scale: 1,
          filter: 'blur(0px)',
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
        },
      )
    }
  }, [setHeaderTheme])

  useEffect(() => {
    const handleParallax = () => {
      if (videoRef.current && containerRef.current) {
        const scrollPosition = window.scrollY
        const parallaxSpeed = 0.5 // Controla la velocidad del efecto parallax

        // Mueve el video en dirección opuesta al scroll
        gsap.to(videoRef.current, {
          y: scrollPosition * parallaxSpeed,
          duration: 0.5,
          ease: 'power1.out',
        })
      }
    }

    window.addEventListener('scroll', handleParallax)

    return () => {
      window.removeEventListener('scroll', handleParallax)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative -mt-[10.4rem] flex items-center justify-center text-white min-h-[calc(100vh-9rem)] pt-16 md:pt-20 lg:pt-0 bg-black overflow-hidden rounded-b-[3rem]"
      data-theme="dark"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          className="object-cover w-full h-[120%] opacity-0"
          src="https://res.cloudinary.com/dhq5ewbyu/video/upload/v1746471179/Bit-A/projects/Stock%20Link/xxiz4mltsjekdnsh9fpz.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res-console.cloudinary.com/dhq5ewbyu/thumbnails/transform/v1/video/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGR1XzEw/v1/Qml0LUEvcHJvamVjdHMvU3RvY2sgTGluay94eGl6NG1sdHNqZWtkbnNoOWZweg==/template_primary"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
      </div>
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 w-full h-full container">
        <div className="mx-auto relative h-full">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16 h-full">
            <div className="z-10 max-w-[35rem] mx-auto lg:mx-0 text-center lg:text-left ">
              {richText && <RichText data={richText as DefaultTypedEditorState} />}
              <Link
                href="https://retailpro-app.vercel.app/"
                className="flex justify-center lg:justify-start"
              >
                <Button className="bg-primary hover:bg-primary/90  px-8 py-6 text-lg rounded-full font-semibold transition-all duration-200 shadow-lg hover:scale-105 mt-6">
                  Solicitá tu cuenta ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
