import type { PillarModule } from '../content/types'
import { scenarioById } from '../content/scenarios'
import {
  Callout,
  Card,
  JDExample,
  PrimaryButton,
  ScenarioTag,
  SectionLabel,
} from '../components/ui'
import { ArrowRight } from '../components/icons'

export function IntroScreen({
  pillar,
  onStart,
}: {
  pillar: PillarModule
  onStart: () => void
}) {
  const sc = scenarioById(pillar.scenario)
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-5">
      <Callout tone="green" title={`What is ${pillar.name}?`}>
        {pillar.intro.whatIsIt}
      </Callout>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {pillar.intro.facets.map((f) => (
          <Card key={f.label} className="p-4">
            <div className="text-sm font-extrabold text-jd-green-deep">
              {f.label}
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
              {f.text}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <SectionLabel>On the {sc.line}</SectionLabel>
          <ScenarioTag name={sc.name} />
        </div>
        <JDExample>{pillar.anchor.today}</JDExample>
      </div>

      <Callout tone="yellow" title="Your mission" className="mt-4">
        {pillar.intro.mission}
      </Callout>

      <PrimaryButton
        block
        className="mt-5"
        icon={<ArrowRight size={18} />}
        onClick={onStart}
      >
        Start
      </PrimaryButton>
    </div>
  )
}
