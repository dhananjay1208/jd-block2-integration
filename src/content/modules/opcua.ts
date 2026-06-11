import type { PillarModule } from '../types'

// Pillar 3: OPC UA, anchored to the machining line.
// The vendor-neutral interoperability layer, southbound from modern PLCs and
// CNCs into Ignition.
export const opcua: PillarModule = {
  id: 'opcua',
  order: 3,
  name: 'OPC UA',
  short: 'OPC UA',
  accentIndex: 2,
  scenario: 'machining',
  minutes: 6,

  intro: {
    whatIsIt:
      'OPC UA, Unified Architecture, is the modern, open, vendor-neutral standard for moving data between industrial systems, standardised as IEC 62541. It is the successor to the older Windows-only OPC Classic, which used COM and DCOM. It runs on any operating system, has authentication and encryption built in, and carries an information model, so a value arrives named, typed and with units rather than as a bare number.',
    facets: [
      {
        label: 'What it is',
        text: 'An open, vendor-neutral standard for exchanging industrial data, the modern successor to OPC Classic.',
      },
      {
        label: 'It carries meaning',
        text: 'Data comes with an information model, names, types, units and structure, not just a bare value.',
      },
      {
        label: 'Secure and cross-platform',
        text: 'Authentication and encryption are built in, and it runs on any operating system, not only Windows.',
      },
      {
        label: 'Where it sits',
        text: 'The common language between PLCs, Ignition and other systems, so one vendor device can be read by another vendor software.',
      },
    ],
    mission:
      'Your mission: connect the machining CNCs to Ignition over OPC UA so every value arrives named, typed and secure, whatever brand the controller is.',
  },

  anchor: {
    today:
      'The machining line has CNCs from three vendors. Each speaks its own protocol, so connecting them means three drivers, three mappings and a fresh fight every time something changes. A value arrives as a bare number with no label.',
    shift:
      'Each controller exposes its data over OPC UA. Ignition connects to all of them the same way, and each value arrives with its name, type and units already attached.',
    payoff:
      'One way to connect, whatever the brand. The data is self-describing, so a new tag does not need a hand-written mapping to make sense.',
  },

  steps: [
    {
      kind: 'match',
      id: 'opcua-s1',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Sort each statement under what OPC UA gives you.',
      recap: 'Sorted each statement under interoperability, security or the information model.',
      buckets: [
        { key: 'interop', label: 'Interoperability' },
        { key: 'security', label: 'Security' },
        { key: 'model', label: 'Information model' },
      ],
      items: [
        {
          id: 'i1',
          text: 'Runs on any OS, any vendor',
          bucket: 'interop',
          why: 'OPC UA is cross-platform and vendor-neutral, so any device can talk to any software.',
        },
        {
          id: 'i2',
          text: 'Authentication and encryption built in',
          bucket: 'security',
          why: 'Security is part of the standard, so connections are authenticated and encrypted by design.',
        },
        {
          id: 'i3',
          text: 'Values arrive with names, types and units',
          bucket: 'model',
          why: 'The information model carries context, so a value is self-describing rather than a bare number.',
        },
        {
          id: 'i4',
          text: 'A modern PLC and third-party software connect without a custom bridge',
          bucket: 'interop',
          why: 'Because the standard is shared, different vendors interoperate without a hand-built adapter.',
        },
        {
          id: 'i5',
          text: 'Data is structured, not a bare number',
          bucket: 'model',
          why: 'The information model gives data a shape and meaning, not just a single reading.',
        },
        {
          id: 'i6',
          text: 'Encrypted so a value cannot be read or changed in transit',
          bucket: 'security',
          why: 'Built-in encryption protects the data while it moves between systems.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'opcua-s2',
      points: 10,
      prompt: 'What does OPC UA’s information model add over a raw value?',
      recap: 'Identified context, name, type and units, as what the information model adds.',
      options: [
        {
          text: 'Context: the name, type, units and structure, so the data is self-describing',
          correct: true,
          explanation:
            'Correct. The information model travels with the value, so the receiving system knows what the number means without a hand-written mapping.',
        },
        {
          text: 'Faster sampling of the same value',
          correct: false,
          explanation: 'Sampling rate is a separate concern. The information model is about meaning, not speed.',
        },
        {
          text: 'Lower hardware cost for the controller',
          correct: false,
          explanation: 'OPC UA does not change the cost of the hardware. It changes what arrives with the data.',
        },
        {
          text: 'It replaces the PLC',
          correct: false,
          explanation: 'The PLC still runs the machine. OPC UA is how its data is exposed, not a substitute for it.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'opcua-s3',
      points: 20,
      setup:
        'The machining cell already reads three CNCs over OPC UA into Ignition. You are adding a fourth CNC, a different brand again.',
      prompt: 'How do you bring the fourth controller in?',
      recap: 'Chose to connect the new controller the same standard OPC UA way as the others.',
      choices: [
        {
          label: 'If it exposes OPC UA, connect it the same standard way as the others, with no custom bridge',
          verdict: 'success',
          explanation:
            'Correct. A standard connection means the new brand is read exactly like the other three, and its values arrive named and typed with no extra mapping.',
        },
        {
          label: 'Write a one-off custom driver just for this machine',
          verdict: 'partial',
          explanation:
            'It would work, but it adds a bespoke piece to maintain and breaks the one-way-to-connect benefit. If it speaks OPC UA, you do not need it.',
        },
        {
          label: 'Have it write to a shared spreadsheet that the others read',
          verdict: 'error',
          explanation:
            'A shared file is fragile, unsecured and loses the information model. The value arrives as a bare number with no name, type or units.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'opcua-s4',
      points: 10,
      prompt: 'What is the key difference between OPC UA and the older OPC Classic?',
      recap: 'Named OPC UA as platform-independent and secure, against the Windows-only OPC Classic.',
      options: [
        {
          text: 'OPC UA is platform-independent and secure by design; OPC Classic was Windows-only using COM and DCOM',
          correct: true,
          explanation:
            'Correct. OPC UA runs on any operating system with security built in, while OPC Classic was tied to Windows and the COM and DCOM stack.',
        },
        {
          text: 'OPC UA is slower than OPC Classic',
          correct: false,
          explanation: 'Speed is not the distinction. OPC UA is the modern standard, built to be open and secure.',
        },
        {
          text: 'OPC UA needs no network at all',
          correct: false,
          explanation: 'Both move data across a network. OPC UA does it securely and across platforms.',
        },
        {
          text: 'They are the same thing renamed',
          correct: false,
          explanation: 'They are different architectures. OPC UA was rebuilt to be cross-platform, secure and information-rich.',
        },
      ],
    },
  ],

  results: {
    proof:
      'OPC UA, IEC 62541, is an open, platform-independent standard that carries a full information model and built-in security, which is why it is the common interoperability layer between modern PLCs and software such as Ignition.',
    source: 'OPC Foundation, OPC UA specification (IEC 62541)',
    keyPoints: [
      'OPC UA is vendor-neutral and cross-platform.',
      'It carries meaning, not just values.',
      'Security is built in.',
      'It is the modern successor to OPC Classic.',
    ],
    leaderLens:
      'Ask whether adding a new machine to your line is a standard connection or a custom integration project every single time. OPC UA is the difference.',
  },
}
