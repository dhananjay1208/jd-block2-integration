import { useState } from 'react'
import type { SliderEstimateStep, StepResult, Verdict } from '../../content/types'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

export function SliderEstimateStepView({
  step,
  isLast,
  onDone,
}: {
  step: SliderEstimateStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const mid = Math.round((step.min + step.max) / 2 / step.step) * step.step
  const [value, setValue] = useState(mid)
  const [locked, setLocked] = useState(false)

  const dist = Math.abs(value - step.answer)
  const verdict: Verdict =
    dist <= step.tolerance ? 'success' : dist <= step.tolerance * 2 ? 'partial' : 'error'
  const points =
    verdict === 'success'
      ? step.points
      : verdict === 'partial'
        ? Math.round(step.points / 2)
        : 0

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      <div className="mt-4 rounded-xl bg-white p-4 ring-1 ring-line">
        <div className="mb-2 text-center">
          <span className="text-3xl font-extrabold text-jd-green-deep">
            {value}
          </span>
          <span className="ml-1 text-lg font-bold text-ink-soft">{step.unit}</span>
        </div>
        <input
          type="range"
          min={step.min}
          max={step.max}
          step={step.step}
          value={value}
          disabled={locked}
          onChange={(e) => setValue(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-jd-green-mist accent-jd-green"
        />
        <div className="mt-1 flex justify-between text-xs font-semibold text-ink-soft">
          <span>
            {step.min}
            {step.unit}
          </span>
          <span>
            {step.max}
            {step.unit}
          </span>
        </div>
      </div>

      {!locked ? (
        <button
          onClick={() => setLocked(true)}
          className="mt-4 w-full rounded-xl bg-jd-green py-3 text-sm font-extrabold text-white transition hover:bg-jd-green-dark"
        >
          Lock in my estimate
        </button>
      ) : (
        <FeedbackBanner
          verdict={verdict}
          points={points}
          continueLabel={isLast ? 'See results' : 'Continue'}
          onContinue={() => onDone({ points, verdict, detail: step.recap })}
        >
          You said {value}
          {step.unit}. The reported figure is about {step.answer}
          {step.unit}. {step.explainCorrect}
        </FeedbackBanner>
      )}
    </div>
  )
}
