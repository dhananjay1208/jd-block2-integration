import type { PillarModule } from '../types'

// Pillar 6: UDS Diagnostics, anchored to End-of-Line Test & Dispatch.
// The diagnostic language used at final test to interrogate each ECU over CAN,
// pulling reports and DTCs that pass up to Ignition before a tractor ships.
export const uds: PillarModule = {
  id: 'uds',
  order: 6,
  name: 'UDS Diagnostics',
  short: 'UDS',
  accentIndex: 2,
  scenario: 'eol',
  minutes: 6,

  intro: {
    whatIsIt:
      'UDS, Unified Diagnostic Services, standardised as ISO 14229, is a diagnostic communication protocol that runs on top of CAN and other transports. It defines a set of services for talking to an ECU: read and clear Diagnostic Trouble Codes (DTCs), read a specific named parameter (ReadDataByIdentifier), write one (WriteDataByIdentifier), run a built-in self-test or actuator test (routine control), unlock protected functions before writing (security access), reset the ECU, and program or flash it. It is request-and-response with one ECU at a time, sitting on top of CAN, which is a broadcast bus. An end-of-line tester uses UDS to ask each ECU for its status, faults and key parameters, and to run its self-tests, before the tractor ships.',
    facets: [
      {
        label: 'What it is',
        text: 'A standard diagnostic language, ISO 14229, for talking to an ECU, usually over CAN.',
      },
      {
        label: 'What it does',
        text: 'Reads and clears fault codes (DTCs), reads specific parameters, runs a built-in self-test, and unlocks protected functions.',
      },
      {
        label: 'Request and response',
        text: 'Unlike CAN, which broadcasts, UDS is a question to one ECU and an answer back. You ask by identifier and get the value.',
      },
      {
        label: 'Where you meet it',
        text: 'The end-of-line tester uses UDS to interrogate each ECU and pull its report before the tractor ships.',
      },
    ],
    mission:
      'Your mission: use UDS at end-of-line to ask each ECU for its fault codes and key parameters, so a tractor never ships with a stored fault nobody checked.',
  },

  anchor: {
    today:
      'At final test, whether an ECU is holding a stored fault depends on a technician remembering to plug in a tool and look. A stored DTC can slip through if that step is skipped.',
    shift:
      'The end-of-line tester runs a UDS sequence on every ECU. It reads all the DTCs, reads the key parameters by identifier, and runs the self-test routine, and the result is captured against the tractor automatically.',
    payoff:
      'No tractor ships with an unread stored fault. The full diagnostic report is locked to the VIN, not dependent on someone remembering to look.',
  },

  steps: [
    {
      kind: 'match',
      id: 'uds-s1',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Match each task to the UDS service that does it.',
      recap: 'Matched each task to the UDS service that performs it.',
      buckets: [
        { key: 'readDtc', label: 'Read fault codes' },
        { key: 'readData', label: 'Read a parameter' },
        { key: 'routine', label: 'Run a self-test' },
        { key: 'security', label: 'Unlock protected access' },
      ],
      items: [
        {
          id: 'i1',
          text: 'Get every stored fault code from the engine ECU',
          bucket: 'readDtc',
          why: 'Reading stored DTCs is the read-fault-codes service. It pulls the list of faults the ECU has recorded.',
        },
        {
          id: 'i2',
          text: 'Read the exact injector calibration value',
          bucket: 'readData',
          why: 'ReadDataByIdentifier asks for one named parameter by its identifier and returns that specific value.',
        },
        {
          id: 'i3',
          text: "Trigger the ECU's built-in actuator test",
          bucket: 'routine',
          why: 'Routine control starts a built-in routine inside the ECU, such as a self-test or an actuator test.',
        },
        {
          id: 'i4',
          text: 'Gain access to a protected function before writing to it',
          bucket: 'security',
          why: 'Security access unlocks protected functions, so a write or a reset is allowed only after the ECU is unlocked.',
        },
      ],
    },
    {
      kind: 'sequence',
      id: 'uds-s2',
      points: 15,
      prompt: 'Put the end-of-line UDS check in order.',
      recap: 'Ordered the end-of-line UDS check from connection through to recording against the VIN.',
      items: [
        { id: 'c1', text: 'Connect to the ECU over CAN' },
        { id: 'c2', text: 'Read the stored fault codes (DTCs)' },
        { id: 'c3', text: 'Read the key parameters by identifier' },
        { id: 'c4', text: 'Run the built-in self-test routine' },
        { id: 'c5', text: "Record the result against the tractor's VIN" },
      ],
      explainCorrect:
        'You connect to the ECU over CAN first, because every UDS request rides on that link. You read the stored DTCs to see what the ECU already knows, then read the key parameters by identifier, then run the self-test routine to check live behaviour. The result is recorded against the VIN last, so the full report is locked to that tractor.',
    },
    {
      kind: 'scenario-decision',
      id: 'uds-s3',
      points: 20,
      setup:
        'A tractor reaches final test holding a stored DTC in one ECU. The operator did not notice it.',
      prompt: 'How should the end-of-line process handle this?',
      recap: 'Let the UDS read-DTC step catch the stored fault automatically and hold the tractor.',
      choices: [
        {
          label: 'The UDS read-DTC step catches it automatically and holds the tractor',
          verdict: 'success',
          explanation:
            'Correct. Because reading every DTC is part of the standard sequence on every tractor, the fault is found whether or not the operator noticed, and the tractor is held before dispatch.',
        },
        {
          label: 'Rely on the operator to plug in a tool and remember to check',
          verdict: 'partial',
          explanation:
            'This sometimes works, but it depends on memory. The fault here was missed precisely because a person did not look. A standard sequence removes that dependency.',
        },
        {
          label: 'Ship it, since the DTC is probably minor',
          verdict: 'error',
          explanation:
            'Guessing a fault is minor and shipping it unread is how a stored fault reaches a customer. The point of the gate is that no unread DTC leaves the line.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'uds-s4',
      points: 10,
      prompt: 'How does UDS relate to CAN?',
      recap: 'Identified UDS as a request-response diagnostic protocol that runs on top of CAN.',
      options: [
        {
          text: 'UDS is a diagnostic request-response protocol that runs on top of CAN and other transports',
          correct: true,
          explanation:
            'Correct. CAN carries the messages on the bus; UDS is the diagnostic conversation, one request to one ECU and one answer back, that rides on top of it.',
        },
        {
          text: 'UDS replaces CAN',
          correct: false,
          explanation: 'UDS does not replace CAN. It needs a transport, and CAN is the most common one underneath it.',
        },
        {
          text: 'UDS is a wireless protocol',
          correct: false,
          explanation: 'UDS is not wireless. It is a diagnostic services layer that runs over a wired transport such as CAN.',
        },
        {
          text: 'UDS is a type of PLC',
          correct: false,
          explanation: 'A PLC is a controller. UDS is a protocol for talking to an ECU, not a piece of hardware.',
        },
      ],
    },
  ],

  results: {
    proof:
      'UDS (ISO 14229) defines the diagnostic services, reading and clearing DTCs, reading parameters by identifier, routine control and security access, that an end-of-line tester uses to interrogate each ECU over CAN before a vehicle ships.',
    source: 'ISO 14229, Unified Diagnostic Services (UDS)',
    keyPoints: [
      'UDS is the diagnostic language that runs on top of CAN.',
      'It reads and clears fault codes, reads parameters and runs self-tests.',
      'It makes the end-of-line check repeatable rather than memory-dependent.',
      'The report locks to the VIN.',
    ],
    leaderLens:
      'Ask whether your end-of-line diagnostic depends on a person remembering to look, or on a standard sequence that runs every time and records itself.',
  },
}
