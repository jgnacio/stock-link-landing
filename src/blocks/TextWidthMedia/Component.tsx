'use client'
import './styles.css'
import RichText from '@/components/RichText'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import React, { useRef, useEffect } from 'react'
import { MediaBlock } from '../MediaBlock/Component'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

interface TextWidthMediaProps {
  text: any
  media: string | Media
  layout: 'left' | 'right'
  blockType?: string
  blockName?: string
  spacing?: {
    verticalOffset: number
    paddingTop: number
    verticalPadding: {
      mobile: number
      tablet: number
      desktop: number
    }
  }
  darkMode?: {
    enabled: boolean
    backgroundColor: string
    textColor: string
  }
  mediaEffects?: {
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

export const TextWidthMedia: React.FC<Props> = ({
  text,
  media,
  layout,
  spacing = {
    verticalOffset: 16,
    paddingTop: 16,
    verticalPadding: {
      mobile: 6,
      tablet: 12,
      desktop: 16,
    },
  },
  darkMode = { enabled: false, backgroundColor: '#1a1a1a', textColor: '#ffffff' },
  mediaEffects = { hover: false, shadow: false },
  showOnScroll = false,
  textAnimation,
  className,
}) => {
  const mediaRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const mediaContainerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isHovered, setIsHovered] = React.useState(false)

  useGSAP(() => {
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

  useGSAP(() => {
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

  useGSAP(() => {
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
        // Si hay una animación en curso, la revertimos
        if (timelineRef.current) {
          timelineRef.current.kill()
        }

        timelineRef.current = gsap.timeline({
          defaults: { duration: 0.3, ease: 'power2.out' },
        })

        if (mediaEffects.hoverEffect?.rotation) {
          timelineRef.current.to(mediaElement, {
            rotation: mediaEffects.hoverEffect.rotationAngle || 5,
          })
        }

        if (mediaEffects.hoverEffect?.glow) {
          timelineRef.current.to(
            mediaElement,
            {
              filter: 'brightness(1.2)',
            },
            '<',
          )
        }

        if (mediaEffects.hoverEffect?.gradient) {
          timelineRef.current.to(
            gradientElement,
            {
              opacity: 1,
              background: `linear-gradient(45deg, ${mediaEffects.hoverEffect.gradientColor || '#000000'}ff, ${mediaEffects.hoverEffect.gradientColor || '#000000'}ff)`,
            },
            '<',
          )
        }
      }

      const handleMouseLeave = () => {
        // Si hay una animación en curso, la revertimos
        if (timelineRef.current) {
          timelineRef.current.kill()
        }

        timelineRef.current = gsap.timeline({
          defaults: { duration: 0.3, ease: 'power2.out' },
        })

        if (mediaEffects.hoverEffect?.rotation) {
          timelineRef.current.to(mediaElement, {
            rotation: 0,
          })
        }

        if (mediaEffects.hoverEffect?.glow) {
          timelineRef.current.to(
            mediaElement,
            {
              filter: 'brightness(1)',
            },
            '<',
          )
        }

        if (mediaEffects.hoverEffect?.gradient) {
          timelineRef.current.to(
            gradientElement,
            {
              opacity: 0,
              background: `linear-gradient(45deg, ${mediaEffects.hoverEffect.gradientColor || '#000000'}00, ${mediaEffects.hoverEffect.gradientColor || '#000000'}00)`,
            },
            '<',
          )
        }
      }

      mediaElement.addEventListener('mouseenter', handleMouseEnter)
      mediaElement.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill()
        }
        mediaElement.removeEventListener('mouseenter', handleMouseEnter)
        mediaElement.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [mediaEffects])

  return (
    <div
      className={cn(
        'w-full relative -z-10',
        {
          'md:grid-flow-dense': layout === 'left',
        },
        className,
      )}
      style={{
        backgroundColor: darkMode.enabled ? darkMode.backgroundColor : 'transparent',
        color: darkMode.enabled ? darkMode.textColor : 'inherit',
        top: `-${spacing.verticalOffset}px`,
      }}
    >
      <div
        className={cn('grid gap-8 md:grid-cols-2 items-center container', 'custom-padding')}
        style={
          {
            '--padding-top': `${spacing.paddingTop}px`,
            '--padding-bottom-mobile': `${spacing.verticalPadding.mobile}px`,
            '--padding-bottom-tablet': `${spacing.verticalPadding.tablet}px`,
            '--padding-bottom-desktop': `${spacing.verticalPadding.desktop}px`,
          } as React.CSSProperties
        }
      >
        <div ref={textRef}>
          <RichText data={text} className="prose-xl" />
        </div>
        <div
          className="relative"
          ref={mediaRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={cn('relative')} ref={mediaContainerRef}>
            <div className="absolute inset-0 rounded-full -z-10 blur-3xl opacity-25 bg-gradient-to-br from-black/0 via-muted/70 to-primary"></div>

            <MediaBlock
              media={media}
              blockType="mediaBlock"
              className={cn({
                'md:col-start-1 z-20': layout === 'left',
              })}
            />
            {mediaEffects.hover && <div ref={gradientRef} />}
          </div>
        </div>
      </div>
    </div>
  )
}
