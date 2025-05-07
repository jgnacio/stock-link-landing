import { cn } from '@/utilities/ui'
import type { MainBlock as MainBlockProps } from 'src/payload-types'
import Overview from './Sections/Overview'
import Features from './Features/Features'
import QuoteDisplay from './QuoteDisplay/QuoteDisplay'
import CTAHurt from './CTAHurt/CTAHurt'
import CTATeamHurt from './CTATeamHurt/CTATeamHurt'
import Why from './Why/Why'
import FinalCTA from './FinalCTA/FinalCTA'
type Props = MainBlockProps & {
  className?: string
}

export default function MainBlock({ className }: Props) {
  return (
    <div className={cn('main-block', className)}>
      <Overview />
      <Features />
      <QuoteDisplay />
      <CTAHurt />
      <CTATeamHurt />
      <Why />
      <FinalCTA />
    </div>
  )
}
