'use client'
import { useLenisContext } from '../providers/Lenis'

interface SmoothScrollOptions {
  offset?: number
  duration?: number
  immediate?: boolean
  lock?: boolean
  onComplete?: () => void
}

export const useSmoothScroll = () => {
  const { lenis } = useLenisContext()

  const scrollTo = (target: string | HTMLElement | number, options?: SmoothScrollOptions) => {
    if (!lenis) return
    lenis.scrollTo(target, options)
  }

  const stop = () => {
    if (!lenis) return
    lenis.stop()
  }

  const start = () => {
    if (!lenis) return
    lenis.start()
  }

  return {
    scrollTo,
    stop,
    start,
    lenis,
  }
}
