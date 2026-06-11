// The five recurring John Deere-Pune plant scenarios.
// Every module ties its examples back to one of these, so leaders follow the
// same plant stories as concepts build through the session.

export type ScenarioId =
  | 'torque'
  | 'paint'
  | 'hydraulics'
  | 'machining'
  | 'eol'

export interface AnchorScenario {
  id: ScenarioId
  name: string
  line: string
  summary: string
}

export const SCENARIOS: AnchorScenario[] = [
  {
    id: 'torque',
    name: 'Transmission & Torque Line',
    line: 'Driveline final assembly',
    summary:
      'Operators build the transmission and driveline, driving dozens of critical bolts to an exact torque. Get one wrong and the failure may not surface until the tractor is in a field years later, as a warranty claim. This line is where build quality is set and where traceability has to begin.',
  },
  {
    id: 'paint',
    name: 'Paint & CED Shop',
    line: 'Electrocoat and topcoat',
    summary:
      "Tractor bodies pass through an electrocoat bath for corrosion protection, then a bake oven and topcoat. The shop is one of the plant's largest energy users. Finish defects mean costly rework, and the reasons are often written on a paper tag and never trended.",
  },
  {
    id: 'hydraulics',
    name: 'Hydraulics Sub-Assembly Line',
    line: 'Lift and valve assembly',
    summary:
      'The hydraulics that raise an implement are assembled and leak-tested largely by hand. Cycle time swings widely between operators, and the heavier lifts are hard on people. John Deere India has publicly named hydraulics automation as a priority.',
  },
  {
    id: 'machining',
    name: 'Machining Line',
    line: 'CNC of blocks, housings and gears',
    summary:
      'Engine blocks, transmission housings, gears and shafts are cut to tolerances measured in microns. A worn spindle or tool drifts the dimension before anyone sees it, and an unplanned breakdown on one machine can stop a whole line.',
  },
  {
    id: 'eol',
    name: 'End-of-Line Test & Dispatch',
    line: 'Dyno test, inspection, PDI',
    summary:
      'Every finished tractor runs a dynamometer and brake test, a leak and lighting check, then pre-delivery inspection. This is the last gate before a tractor ships, and the point where its full build record is locked to its VIN.',
  },
]

export function scenarioById(id: ScenarioId): AnchorScenario {
  return SCENARIOS.find((s) => s.id === id) as AnchorScenario
}
