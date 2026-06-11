import type { PillarModule } from '../types'

// Pillar 4: Modbus, the southbound protocol for older and simpler devices,
// anchored to the hydraulics sub-assembly line.
export const modbus: PillarModule = {
  id: 'modbus',
  order: 4,
  name: 'Modbus',
  short: 'Modbus',
  accentIndex: 0,
  scenario: 'hydraulics',
  minutes: 6,

  intro: {
    whatIsIt:
      'Modbus is one of the oldest and most widely used industrial protocols. Modicon published it in 1979 and the Modbus Organization maintains it today. It is simple, open and request-response: a client asks, a server answers. It comes in two common forms, Modbus RTU over serial RS-485 and Modbus TCP over Ethernet. Its data model is numbered. Coils and discrete inputs are single bits; input registers and holding registers are 16-bit values, each addressed by number. The strength is reach: it is cheap and supported by almost every device, sensor, drive and meter ever made. The limits are that it has no built-in security and no information model, so a register such as 40001 is just a number and you have to know what it means. It is the workhorse for simple devices and older equipment.',
    facets: [
      {
        label: 'What it is',
        text: 'A simple, open request-response protocol from 1979, still found on devices all over the floor.',
      },
      {
        label: 'How its data looks',
        text: 'Numbered registers and coils. Register 40001 is just a number; you must know what it means.',
      },
      {
        label: 'Why it survives',
        text: 'Simple, cheap and supported by almost every device, sensor and meter ever made.',
      },
      {
        label: 'What it lacks',
        text: 'No built-in security and no information model. It moves numbers, not meaning, so the context lives in your documentation.',
      },
    ],
    primer: {
      title: 'Know this before you play',
      blocks: [
        {
          heading: 'The data model: four kinds, all numbered',
          body: 'Modbus holds exactly four kinds of data. Coils and discrete inputs are single bits, on or off. Input registers and holding registers are 16-bit numbers. Every one is addressed by number, nothing else. The address 40001 means "holding register number 1", 40002 means "holding register number 2", and so on. The protocol never says what the number contains. The vendor manual ships a register map, a list saying which register holds which value, and that map is the only place the meaning lives.',
        },
        {
          heading: 'RTU and TCP, the two forms',
          body: 'Modbus RTU runs over a serial RS-485 cable, the classic twisted-pair daisy chain. Modbus TCP carries the same requests over ordinary Ethernet, which is how Ignition usually reaches a device today.',
        },
        {
          heading: 'Where it wins, where it loses',
          body: 'Pick Modbus when a simple device just has to report a basic value and already speaks it: the data arrives at almost no cost. Pick a richer protocol such as OPC UA when you need security, encryption or an information model, because Modbus offers none of those. It moves bare numbers and trusts the network around it.',
        },
      ],
      table: {
        caption: 'Strengths vs limits at a glance',
        headers: ['Strengths', 'Limits'],
        rows: [
          ['Supported by almost every device, sensor and meter ever made', 'No built-in security, so it needs a protected network'],
          ['Simple and cheap to implement and connect', 'No information model, only numbered registers you must document'],
          ['Fine for basic values from simple devices', 'Polling only: the client must keep asking, the device never pushes'],
        ],
      },
    },
    mission:
      'Your mission: bring the hydraulics line\'s older leak testers and meters into Ignition over Modbus, and write down what each register means so the numbers are not a mystery.',
  },

  anchor: {
    today:
      'The line\'s leak testers and energy meters are older but perfectly good. They speak Modbus. Their data is locked inside the device because nobody has mapped the registers, so the numbers never leave the rig.',
    shift:
      'Ignition reads each device over Modbus TCP. The team documents which holding register holds the leak rate, which holds the pressure and which holds the cycle count, then maps each to a named tag.',
    payoff:
      'Older equipment joins the live view without being replaced. The cryptic register numbers become named, meaningful tags that everyone can read.',
  },

  steps: [
    {
      kind: 'hotspot',
      id: 'modbus-s1',
      points: 12,
      setup:
        'How to read a register map: a Modbus device publishes its data as a numbered list of registers, and the vendor manual says what each number holds. Reading the device means asking for a register by its number. Below is the manual\'s map for the leak tester, four holding registers with their meanings written next to them. The labels are given; your job is to pick the register whose meaning is the pressure being applied right now, not a test result, a tally or a status.',
      caption:
        'A Modbus holding-register map for a leak tester. Tap the register that holds the live test pressure.',
      prompt: 'Which register holds the live test pressure?',
      recap: 'Read the register map and picked the holding register holding the live test pressure.',
      regions: [
        {
          id: 'r40001',
          label: '40001 Leak rate',
          correct: false,
          rect: { x: 10, y: 12, w: 80, h: 16 },
          explanation:
            'Register 40001 holds the leak rate, the result of the test. It is not the live pressure being applied during the test.',
        },
        {
          id: 'r40002',
          label: '40002 Pressure',
          correct: true,
          rect: { x: 10, y: 33, w: 80, h: 16 },
          explanation:
            'Register 40002 holds the pressure. That is the live test value asked for, the pressure the tester is applying right now.',
        },
        {
          id: 'r40003',
          label: '40003 Cycle count',
          correct: false,
          rect: { x: 10, y: 54, w: 80, h: 16 },
          explanation:
            'Register 40003 holds the cycle count, how many tests the unit has run. It is a tally, not the live pressure.',
        },
        {
          id: 'r40004',
          label: '40004 Status word',
          correct: false,
          rect: { x: 10, y: 75, w: 80, h: 16 },
          explanation:
            'Register 40004 holds the status word, a set of bits describing the tester state. It is not the live pressure value.',
        },
      ],
    },
    {
      kind: 'match',
      id: 'modbus-s2',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Sort each statement into a Modbus strength or a Modbus limit.',
      recap: 'Placed each statement under Modbus strength or Modbus limit correctly.',
      buckets: [
        { key: 'strength', label: 'Strength', hint: 'why people still use it' },
        { key: 'limit', label: 'Limit', hint: 'what you have to manage' },
      ],
      items: [
        {
          id: 'm1',
          text: 'Supported by almost every device',
          bucket: 'strength',
          why: 'Reach is the main reason Modbus survives. Almost any meter, drive or tester can speak it.',
        },
        {
          id: 'm2',
          text: 'Simple and cheap to implement',
          bucket: 'strength',
          why: 'The protocol is simple, so it is cheap to add to a device and cheap to connect. That is a strength.',
        },
        {
          id: 'm3',
          text: 'No built-in security',
          bucket: 'limit',
          why: 'Modbus has no built-in security, so it belongs on a protected network. That is a limit you manage.',
        },
        {
          id: 'm4',
          text: 'No information model, only numbered registers',
          bucket: 'limit',
          why: 'A register is just a number with no meaning attached. You have to document what each one holds. That is a limit.',
        },
        {
          id: 'm5',
          text: 'A good fit for a basic sensor or meter',
          bucket: 'strength',
          why: 'For a simple device that just reports a value, Modbus is enough and costs almost nothing. That is a strength.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'modbus-s3',
      points: 20,
      setup:
        'A 12-year-old energy meter on the hydraulics line outputs Modbus. It still reads accurately. The team wants its data in Ignition and is debating whether to replace it just to get there.',
      prompt: 'How do you bring the meter\'s data in?',
      recap: 'Kept the working meter and read it over Modbus into Ignition.',
      choices: [
        {
          label: 'Keep the meter and read it over Modbus into Ignition',
          verdict: 'success',
          explanation:
            'Correct. The meter already gives the value you need and already speaks Modbus. Map its registers to named tags and the data is in the live view for almost nothing. No spend, no rewiring.',
        },
        {
          label: 'Replace it now with an OPC UA meter for the information model',
          verdict: 'partial',
          explanation:
            'A new meter with an information model is nice, but you are spending money and effort to replace a meter that already reads correctly and already connects. Save that for when the meter actually fails or you need the richer model.',
        },
        {
          label: 'Leave it unread because Modbus is "old"',
          verdict: 'error',
          explanation:
            'Old does not mean useless. The meter works and the protocol works. Leaving it unread keeps the data trapped for no reason and throws away an easy win.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'modbus-s4',
      points: 10,
      prompt: 'When is Modbus the right choice over OPC UA?',
      recap: 'Saw that Modbus fits a simple device that just needs a basic value cheaply.',
      options: [
        {
          text: 'For a simple device where you need a basic value cheaply and the device already speaks it',
          correct: true,
          explanation:
            'Correct. When a device only has to report a value and already speaks Modbus, Modbus gets you the data at almost no cost. That is exactly where it wins.',
        },
        {
          text: 'When you need built-in security',
          correct: false,
          explanation:
            'Modbus has no built-in security. If security is the requirement, this is a reason to choose something else, not Modbus.',
        },
        {
          text: 'When you need a rich information model',
          correct: false,
          explanation:
            'Modbus has no information model, only numbered registers. If you need a rich model, OPC UA is the better fit.',
        },
        {
          text: 'When you need encryption in transit',
          correct: false,
          explanation:
            'Modbus does not encrypt data in transit. Encryption is not a reason to pick it.',
        },
      ],
    },
  ],

  results: {
    proof:
      'Modbus, published by Modicon in 1979 and maintained by the Modbus Organization, is a simple open request-response protocol still supported by a vast range of devices, which is why older meters and testers connect with it cheaply. Its limits are no built-in security and no information model.',
    source: 'Modbus Organization, Modbus application protocol specification',
    keyPoints: [
      'Modbus is simple, open and everywhere on the floor.',
      'Its data is numbered registers, not meaning, so you must document what each one holds.',
      'It is a strong fit for simple devices and older gear, at almost no cost.',
      'It has no built-in security, so it belongs on a protected network.',
    ],
    leaderLens:
      'Ask whether a piece of "old" equipment really needs replacing, or whether reading it over Modbus gets you the data for almost nothing.',
  },
}
