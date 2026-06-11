import type { Step, StepResult } from '../../content/types'
import { McqStepView } from './McqStep'
import { MatchStepView } from './MatchStep'
import { SequenceStepView } from './SequenceStep'
import { ScenarioDecisionStepView } from './ScenarioDecisionStep'
import { SliderEstimateStepView } from './SliderEstimateStep'
import { BeforeAfterStepView } from './BeforeAfterStep'
import { HotspotStepView } from './HotspotStep'
import { SignatureSlotView } from './SignatureSlot'

/** Draws the right renderer for a step, dispatched on step.kind. */
export function StepRenderer({
  step,
  isLast,
  onDone,
}: {
  step: Step
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  switch (step.kind) {
    case 'mcq':
      return <McqStepView step={step} isLast={isLast} onDone={onDone} />
    case 'match':
      return <MatchStepView step={step} isLast={isLast} onDone={onDone} />
    case 'sequence':
      return <SequenceStepView step={step} isLast={isLast} onDone={onDone} />
    case 'scenario-decision':
      return (
        <ScenarioDecisionStepView step={step} isLast={isLast} onDone={onDone} />
      )
    case 'slider-estimate':
      return (
        <SliderEstimateStepView step={step} isLast={isLast} onDone={onDone} />
      )
    case 'before-after':
      return <BeforeAfterStepView step={step} isLast={isLast} onDone={onDone} />
    case 'hotspot':
      return <HotspotStepView step={step} isLast={isLast} onDone={onDone} />
    case 'signature':
      return <SignatureSlotView step={step} isLast={isLast} onDone={onDone} />
  }
}
