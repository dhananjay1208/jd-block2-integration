import type { SignatureStep, StepResult } from '../../content/types'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

/**
 * Mount point for a bespoke per-pillar interaction. No signature steps ship in
 * the first version, so unknown components fall back to a read-and-continue
 * card. Register real ones here later, keyed by step.component.
 */
const REGISTRY: Record<
  string,
  (props: { step: SignatureStep; onDone: (r: StepResult) => void }) => React.ReactNode
> = {}

export function SignatureSlotView({
  step,
  isLast,
  onDone,
}: {
  step: SignatureStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const Bespoke = REGISTRY[step.component]
  if (Bespoke) return <>{Bespoke({ step, onDone })}</>

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>
      <FeedbackBanner
        verdict="success"
        points={step.points}
        continueLabel={isLast ? 'See results' : 'Continue'}
        onContinue={() =>
          onDone({ points: step.points, verdict: 'success', detail: step.recap })
        }
      />
    </div>
  )
}
