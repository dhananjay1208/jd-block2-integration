import type { ScenarioId } from './scenarios'

/** Which citation in sources.ts backs a fact. Matched by Source.label. */
export type SourceRef = string

/** Feedback severity. Drives the banner colour and copy. */
export type Verdict = 'success' | 'partial' | 'error'

/** What a step renderer hands back when the participant resolves it. */
export interface StepResult {
  points: number
  verdict: Verdict
  /** Optional detail line for the results recap. */
  detail?: string
}

/* ----------------------------------------------------------------
   Step variants, discriminated on `kind`.
   ---------------------------------------------------------------- */

interface StepBase {
  id: string
  /** The question or task line shown above the interaction. */
  prompt: string
  /** Optional setup or data context shown above the prompt. */
  setup?: string
  /** Points awarded for a fully correct answer. */
  points: number
  /** One line shown in the results "what happened" recap. */
  recap?: string
}

/** Four-option multiple choice. */
export interface McqStep extends StepBase {
  kind: 'mcq'
  options: Array<{ text: string; correct: boolean; explanation: string }>
}

/** Tap a card, tap the box it belongs in. Scored per correctly placed item. */
export interface MatchStep extends StepBase {
  kind: 'match'
  scoreMode: 'perItem'
  buckets: Array<{ key: string; label: string; hint?: string }>
  items: Array<{ id: string; text: string; bucket: string; why: string }>
}

/** Put the items in the right order with up and down controls. No drag. */
export interface SequenceStep extends StepBase {
  kind: 'sequence'
  /** Authoring order is the CORRECT order. The renderer shuffles for play. */
  items: Array<{ id: string; text: string }>
  explainCorrect: string
}

/** A floor decision. Pick one action for a described situation. */
export interface ScenarioDecisionStep extends StepBase {
  kind: 'scenario-decision'
  choices: Array<{ label: string; verdict: Verdict; explanation: string }>
}

/** Estimate a number on a slider. Scored by how close to the answer. */
export interface SliderEstimateStep extends StepBase {
  kind: 'slider-estimate'
  min: number
  max: number
  step: number
  unit: string
  answer: number
  /** Within this band counts as full points. Outside it scales down. */
  tolerance: number
  explainCorrect: string
}

/** Reveal today, the shift, the payoff. Optional check underneath. */
export interface BeforeAfterStep extends StepBase {
  kind: 'before-after'
  today: string
  shift: string
  payoff: string
  check?: {
    question: string
    options: Array<{ text: string; correct: boolean; explanation: string }>
  }
}

/** Tap the right zone(s) on a simple labelled diagram. */
export interface HotspotStep extends StepBase {
  kind: 'hotspot'
  /** A short caption describing the diagram. */
  caption: string
  regions: Array<{
    id: string
    label: string
    correct: boolean
    /** Position in the 0..100 box, as percentages. */
    rect: { x: number; y: number; w: number; h: number }
    explanation: string
  }>
}

/** Mount point for one bespoke interaction authored per pillar. */
export interface SignatureStep extends StepBase {
  kind: 'signature'
  component: string
  data?: Record<string, unknown>
}

export type Step =
  | McqStep
  | MatchStep
  | SequenceStep
  | ScenarioDecisionStep
  | SliderEstimateStep
  | BeforeAfterStep
  | HotspotStep
  | SignatureStep

/* ----------------------------------------------------------------
   The pillar module. One per pillar.
   ---------------------------------------------------------------- */

export interface PillarModule {
  /** Must match a Pillar.id in pillarsBase.ts. */
  id: string
  /** 1..10 launcher order and badge number. */
  order: number
  name: string
  short: string
  /** Accent index into theme ACCENTS. */
  accentIndex: number
  /** Anchor scenario this whole module ties to. */
  scenario: ScenarioId
  /** Estimated minutes, shown on the card. */
  minutes: number

  intro: {
    /** Plain-language "what is X?" Reuses Pillar.definition. */
    whatIsIt: string
    /** Exactly four key facets. */
    facets: Array<{ label: string; text: string }>
    /**
     * Deeper teaching shown after the facets, before the anchor story.
     * Everything the steps test must be taught here, in the facets, or in a
     * step's own setup, so participants can answer from the card alone.
     */
    primer?: {
      /** Section heading. Defaults to "Know this before you play". */
      title?: string
      /** Short titled teaching blocks. */
      blocks?: Array<{ heading: string; body: string }>
      /** Optional compact comparison table, e.g. radios by range and power. */
      table?: { caption?: string; headers: string[]; rows: string[][] }
    }
    /** The "Your Mission" line. */
    mission: string
  }

  /** The anchor example, shown after intro, before the steps. */
  anchor: {
    today: string
    shift: string
    payoff: string
  }

  /** The interactive sequence, then the knowledge-check MCQs. */
  steps: Step[]

  results: {
    /** Cited proof point. Reuses Pillar.proof. */
    proof: string
    /** Which citation backs it. Must match a Source.label. */
    source: SourceRef
    /** Two to four takeaway bullets for the Key Points box. */
    keyPoints: string[]
    /** The manager takeaway. Reuses Pillar.leaderLens. */
    leaderLens: string
  }
}
