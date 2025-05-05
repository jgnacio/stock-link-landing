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

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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
          opacity: 0.5,
          duration: 2,
          ease: 'power2.out',
        },
      )
    }
  }, [setHeaderTheme])

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white min-h-[calc(100vh-9rem)] pt-16 md:pt-20 lg:pt-0 bg-black"
      data-theme="dark"
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="object-cover w-full h-full"
          src="https://res.cloudinary.com/dhq5ewbyu/video/upload/v1746471179/Bit-A/projects/Stock%20Link/xxiz4mltsjekdnsh9fpz.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res-console.cloudinary.com/dhq5ewbyu/thumbnails/transform/v1/video/upload/Y19saW1pdCxoXzE2MDAsd18xNjAwLGR1XzEw/v1/Qml0LUEvcHJvamVjdHMvU3RvY2sgTGluay94eGl6NG1sdHNqZWtkbnNoOWZweg==/template_primary"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 w-full h-full container">
        <div className="px-4 mx-auto relative sm:px-6 lg:px-8 h-full">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 gap-x-16 h-full">
            <div className="z-10">
              {richText && <RichText data={richText as DefaultTypedEditorState} />}

              <Button
                type="submit"
                className="inline-flex items-center justify-center w-full px-5 py-5 text-sm font-semibold tracking-widest text-black  uppercase transition-all duration-200 rounded-full sm:w-auto sm:py-3 hover:opacity-90 mt-6"
              >
                Solicitá tu cuenta ahora
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
