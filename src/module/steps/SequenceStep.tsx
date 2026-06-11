import { useState } from 'react'
import type { SequenceStep, StepResult, Verdict } from '../../content/types'
import { cn } from '../../lib/cn'
import { ArrowUp, Check, Close } from '../../components/icons'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

/** Shuffle a copy. Guarantees a different order from the input when possible. */
function shuffled<T>(input: T[]): T[] {
  if (input.length < 2) return [...input]
  const a = [...input]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  if (a.every((v, i) => v === input[i])) {
    ;[a[0], a[1]] = [a[1], a[0]]
  }
  return a
}

export function SequenceStepView({
  step,
  isLast,
  onDone,
}: {
  step: SequenceStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const correctIds = step.items.map((i) => i.id)
  const [order, setOrder] = useState<string[]>(() =>
    shuffled(step.items).map((i) => i.id),
  )
  const [checked, setChecked] = useState(false)
  const textOf = (id: string) => step.items.find((i) => i.id === id)?.text ?? ''

  const move = (index: number, dir: -1 | 1) => {
    if (checked) return
    const to = index + dir
    if (to < 0 || to >= order.length) return
    setOrder((o) => {
      const next = [...o]
      ;[next[index], next[to]] = [next[to], next[index]]
      return next
    })
  }

  const correctCount = order.filter((id, i) => id === correctIds[i]).length
  const points = Math.round(step.points * (correctCount / correctIds.length))
  const verdict: Verdict =
    correctCount === correctIds.length
      ? 'success'
      : correctCount === 0
        ? 'error'
        : 'partial'

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      <div className="mt-3 space-y-2">
        {order.map((id, i) => {
          const ok = checked && id === correctIds[i]
          const wrong = checked && id !== correctIds[i]
          return (
            <div
              key={id}
              className={cn(
                'flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition',
                !checked && 'border-line bg-white',
                ok && 'border-jd-green bg-jd-green-mist text-jd-green-deep',
                wrong && 'border-red-300 bg-red-50 text-red-700',
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-jd-green-mist text-xs font-extrabold text-jd-green-dark">
                {checked ? ok ? <Check size={14} /> : <Close size={14} /> : i + 1}
              </span>
              <span className="flex-1">{textOf(id)}</span>
              {!checked && (
                <span className="flex shrink-0 flex-col gap-1">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="grid h-6 w-7 place-items-center rounded bg-cream text-jd-green-dark ring-1 ring-line transition hover:bg-jd-green-mist disabled:opacity-30"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === order.length - 1}
                    aria-label="Move down"
                    className="grid h-6 w-7 rotate-180 place-items-center rounded bg-cream text-jd-green-dark ring-1 ring-line transition hover:bg-jd-green-mist disabled:opacity-30"
                  >
                    <ArrowUp size={14} />
                  </button>
                </span>
              )}
            </div>
          )
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          className="mt-4 w-full rounded-xl bg-jd-green py-3 text-sm font-extrabold text-white transition hover:bg-jd-green-dark"
        >
          Check the order
        </button>
      ) : (
        <FeedbackBanner
          verdict={verdict}
          points={points}
          continueLabel={isLast ? 'See results' : 'Continue'}
          onContinue={() => onDone({ points, verdict, detail: step.recap })}
        >
          {step.explainCorrect}
        </FeedbackBanner>
      )}
    </div>
  )
}
