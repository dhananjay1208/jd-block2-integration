import { useState } from 'react'
import { motion } from 'framer-motion'
import type { McqStep, StepResult } from '../../content/types'
import { cn } from '../../lib/cn'
import { Check, Close } from '../../components/icons'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

export function McqStepView({
  step,
  isLast,
  onDone,
}: {
  step: McqStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const [chosen, setChosen] = useState<number | null>(null)
  const answered = chosen !== null
  const isCorrect = answered && step.options[chosen].correct
  const points = isCorrect ? step.points : 0
  const correct = step.options.find((o) => o.correct) ?? null

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      <div className="mt-3 grid gap-2">
        {step.options.map((opt, i) => {
          const show = answered
          const correct = opt.correct
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
                show &&
                  correct &&
                  'border-jd-green bg-jd-green-mist text-jd-green-deep',
                show &&
                  picked &&
                  !correct &&
                  'border-red-400 bg-red-50 text-red-700',
                show && !correct && !picked && 'border-line bg-white',
              )}
            >
              <span
                className={cn(
                  'grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-extrabold',
                  show && correct
                    ? 'bg-jd-green text-white'
                    : show && picked
                      ? 'bg-red-500 text-white'
                      : 'bg-jd-green-mist text-jd-green-dark',
                )}
              >
                {show && correct ? (
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
            continueLabel={isLast ? 'See results' : 'Continue'}
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
            {step.options[chosen].explanation}
          </FeedbackBanner>
        </motion.div>
      )}
    </div>
  )
}
