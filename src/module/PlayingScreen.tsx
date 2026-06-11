import { useState } from 'react'
import { motion } from 'framer-motion'
import type { PillarModule, StepResult } from '../content/types'
import { moduleMaxScore } from '../lib/scoring'
import { Trophy } from '../components/icons'
import { StepDots } from '../components/ProgressBar'
import { StepRenderer } from './steps/StepRenderer'
import type { PlayRun, StepRecap } from './run'

export function PlayingScreen({
  pillar,
  onComplete,
}: {
  pillar: PillarModule
  onComplete: (run: PlayRun) => void
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [recaps, setRecaps] = useState<StepRecap[]>([])

  const step = pillar.steps[stepIndex]
  const isLast = stepIndex === pillar.steps.length - 1
  const max = moduleMaxScore(pillar)

  const handleDone = (result: StepResult) => {
    const recap: StepRecap = {
      recap: result.detail,
      verdict: result.verdict,
      points: result.points,
    }
    const nextScore = score + result.points
    const nextRecaps = [...recaps, recap]
    if (isLast) {
      onComplete({ score: nextScore, max, recaps: nextRecaps })
    } else {
      setScore(nextScore)
      setRecaps(nextRecaps)
      setStepIndex(stepIndex + 1)
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-5">
      <div className="mb-3 flex items-center gap-3">
        <span className="shrink-0 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
          Step {stepIndex + 1} of {pillar.steps.length}
        </span>
        <StepDots count={pillar.steps.length} current={stepIndex} />
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-jd-green-mist px-2.5 py-1 text-xs font-extrabold text-jd-green-dark">
          <Trophy size={13} /> {score}
        </span>
      </div>

      <div className="rounded-2xl bg-white p-4 ring-1 ring-line shadow-[var(--shadow-card)] sm:p-5">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <StepRenderer step={step} isLast={isLast} onDone={handleDone} />
        </motion.div>
      </div>
    </div>
  )
}
