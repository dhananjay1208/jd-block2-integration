import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Verdict } from '../content/types'
import { cn } from '../lib/cn'
import { Check, Close, Spark, ArrowRight } from './icons'
import { PrimaryButton } from './ui'

const TONES: Record<
  Verdict,
  { box: string; head: string; chip: string; icon: ReactNode; label: string }
> = {
  success: {
    box: 'bg-jd-green-mist ring-jd-green/30',
    head: 'text-jd-green-deep',
    chip: 'bg-jd-green text-white',
    icon: <Check size={15} />,
    label: 'Correct',
  },
  partial: {
    box: 'bg-jd-yellow-soft ring-jd-yellow-dark/40',
    head: 'text-jd-green-deep',
    chip: 'bg-jd-yellow-dark text-white',
    icon: <Spark size={15} />,
    label: 'Partly right',
  },
  error: {
    box: 'bg-red-50 ring-red-300',
    head: 'text-red-700',
    chip: 'bg-red-500 text-white',
    icon: <Close size={15} />,
    label: 'Not quite',
  },
}

/** Shared feedback panel for every step: tone, points, explanation, Continue. */
export function FeedbackBanner({
  verdict,
  points,
  onContinue,
  continueLabel = 'Continue',
  children,
  reveal,
}: {
  verdict: Verdict
  points: number
  onContinue: () => void
  continueLabel?: string
  children?: ReactNode
  reveal?: { label: string; explanation: string } | null
}) {
  const t = TONES[verdict]
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('mt-3 rounded-xl p-3.5 ring-1', t.box)}
    >
      <div
        className={cn(
          'mb-1.5 flex items-center gap-2 text-sm font-extrabold',
          t.head,
        )}
      >
        <span
          className={cn('grid h-6 w-6 place-items-center rounded-md', t.chip)}
        >
          {t.icon}
        </span>
        {t.label}
        {points > 0 && (
          <span className="ml-auto rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-bold text-jd-green-deep">
            +{points} points
          </span>
        )}
      </div>
      {children && (
        <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
      )}
      {reveal && (
        <div className="mt-2.5 rounded-lg bg-jd-green-mist p-2.5 ring-1 ring-jd-green/30">
          <div className="mb-0.5 flex items-center gap-1.5 text-xs font-extrabold text-jd-green-deep">
            <span className="grid h-5 w-5 place-items-center rounded bg-jd-green text-white">
              <Check size={12} />
            </span>
            Correct answer: {reveal.label}
          </div>
          <div className="text-sm leading-relaxed text-ink-soft">
            {reveal.explanation}
          </div>
        </div>
      )}
      <PrimaryButton
        block
        onClick={onContinue}
        className="mt-3"
        icon={<ArrowRight size={16} />}
      >
        {continueLabel}
      </PrimaryButton>
    </motion.div>
  )
}
