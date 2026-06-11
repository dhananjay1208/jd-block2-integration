import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ScenarioDecisionStep, StepResult, Verdict } from '../../content/types'
import { cn } from '../../lib/cn'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

function pointsFor(verdict: Verdict, max: number): number {
  if (verdict === 'success') return max
  if (verdict === 'partial') return Math.round(max / 2)
  return 0
}

const CHOSEN_STYLE: Record<Verdict, string> = {
  success: 'border-jd-green bg-jd-green-mist text-jd-green-deep',
  partial: 'border-jd-yellow-dark bg-jd-yellow-soft text-jd-green-deep',
  error: 'border-red-400 bg-red-50 text-red-700',
}

export function ScenarioDecisionStepView({
  step,
  isLast,
  onDone,
}: {
  step: ScenarioDecisionStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const answered = chosen !== null
  const choice = answered ? step.choices[chosen] : null
  const points = choice ? pointsFor(choice.verdict, step.points) : 0
  const correct = step.choices.find((c) => c.verdict === 'success') ?? null

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      <div className="mt-3 grid gap-2">
        {step.choices.map((c, i) => {
          const show = answered
          const picked = i === chosen
          return (
            <button
              key={i}
              onClick={() => !answered && setChosen(i)}
              disabled={show}
              className={cn(
                'rounded-xl border-2 px-3.5 py-3 text-left text-sm font-bold transition',
                !show &&
                  'border-line bg-white hover:border-jd-green hover:bg-jd-green-mist',
                show && c.verdict === 'success' && CHOSEN_STYLE.success,
                show && picked && c.verdict !== 'success' && CHOSEN_STYLE[c.verdict],
                show && !picked && c.verdict !== 'success' && 'border-line bg-white',
              )}
            >
              {c.label}
            </button>
          )
        })}
      </div>

      {answered && choice && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FeedbackBanner
            verdict={choice.verdict}
            points={points}
            continueLabel={isLast ? 'See results' : 'Continue'}
            reveal={
              choice.verdict !== 'success' && correct
                ? { label: correct.label, explanation: correct.explanation }
                : null
            }
            onContinue={() =>
              onDone({ points, verdict: choice.verdict, detail: step.recap })
            }
          >
            {choice.explanation}
          </FeedbackBanner>
        </motion.div>
      )}
    </div>
  )
}
