import type { Verdict } from '../content/types'

/** One step's outcome, kept for the results recap. */
export interface StepRecap {
  recap?: string
  verdict: Verdict
  points: number
}

/** The result of one play-through of a pillar. */
export interface PlayRun {
  score: number
  max: number
  recaps: StepRecap[]
}
