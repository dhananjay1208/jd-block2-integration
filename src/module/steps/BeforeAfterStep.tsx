import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BeforeAfterStep, StepResult } from '../../content/types'
import { cn } from '../../lib/cn'
import { Check, Close } from '../../components/icons'
import { ShiftStory } from '../../components/ui'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

export function BeforeAfterStepView({
  step,
  isLast,
  onDone,
}: {
  step: BeforeAfterStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const continueLabel = isLast ? 'See results' : 'Continue'

  // Pure reveal, no check: award the points for reading the shift through.
  if (!step.check) {
    return (
      <div>
        {step.setup && <StepSetup>{step.setup}</StepSetup>}
        <StepPrompt>{step.prompt}</StepPrompt>
        <div className="mt-3">
          <ShiftStory
            situation={step.today}
            shift={step.shift}
            payoff={step.payoff}
          />
        </div>
        <FeedbackBanner
          verdict="success"
          points={step.points}
          continueLabel={continueLabel}
          onContinue={() =>
            onDone({ points: step.points, verdict: 'success', detail: step.recap })
          }
        >
          That is the move from a forced problem to a planned one. Keep that
          before-and-after shape in mind for your own line.
        </FeedbackBanner>
      </div>
    )
  }

  const check = step.check
  const answered = chosen !== null
  const isCorrect = answered && check.options[chosen].correct
  const points = isCorrect ? step.points : 0
  const correct = check.options.find((o) => o.correct) ?? null

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>
      <div className="mt-3">
        <ShiftStory
          situation={step.today}
          shift={step.shift}
          payoff={step.payoff}
        />
      </div>

      <div className="mt-4 text-[15px] font-bold text-ink">{check.question}</div>
      <div className="mt-2 grid gap-2">
        {check.options.map((opt, i) => {
          const show = answered
          const picked = i === chosen
          return (
            <button
              key={i}
              onClick={() => !answered && setChosen(i)}
              disabled={show}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-3 text-left text-sm font-semibold transition',
                !show &&
                  'border-line bg-white hover:border-jd-green hover:bg-jd-green-mist',
                show && opt.correct && 'border-jd-green bg-jd-green-mist text-jd-green-deep',
                show && picked && !opt.correct && 'border-red-400 bg-red-50 text-red-700',
                show && !opt.correct && !picked && 'border-line bg-white',
              )}
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-extrabold',
                  show && opt.correct
                    ? 'bg-jd-green text-white'
                    : show && picked
                      ? 'bg-red-500 text-white'
                      : 'bg-jd-green-mist text-jd-green-dark',
                )}
              >
                {show && opt.correct ? (
                  <Check size={14} />
                ) : show && picked ? (
                  <Close size={14} />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              {opt.text}
            </button>
          )
        })}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FeedbackBanner
            verdict={isCorrect ? 'success' : 'error'}
            points={points}
            continueLabel={continueLabel}
            reveal={
              !isCorrect && correct
                ? { label: correct.text, explanation: correct.explanation }
                : null
            }
            onContinue={() =>
              onDone({
                points,
                verdict: isCorrect ? 'success' : 'error',
                detail: step.recap,
              })
            }
          >
            {check.options[chosen].explanation}
          </FeedbackBanner>
        </motion.div>
      )}
    </div>
  )
}
