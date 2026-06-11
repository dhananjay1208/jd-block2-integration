import type { PillarModule } from '../types'

// Pillar 5: CAN Bus, anchored to End-of-Line Test & Dispatch.
export const canbus: PillarModule = {
  id: 'canbus',
  order: 5,
  name: 'CAN Bus',
  short: 'CAN',
  accentIndex: 1,
  scenario: 'eol',
  minutes: 6,

  intro: {
    whatIsIt:
      'CAN, the Controller Area Network, is a rugged serial bus developed by Bosch in 1986 and standardised as ISO 11898. It is message-based and multi-master, broadcast over a two-wire differential pair, and it was built to connect the electronic control units inside a vehicle. Every node hears every message. A message carries an identifier and a priority, not a sender or receiver address, and the bus uses that priority to decide who goes first when two nodes speak at once. On a tractor, the engine and transmission ECUs and the rigs that test them all talk CAN.',
    facets: [
      {
        label: 'What it is',
        text: 'A rugged, message-based bus from Bosch, standardised as ISO 11898, built to connect the controllers inside a vehicle.',
      },
      {
        label: 'Message-based, not addressed',
        text: 'Every node hears every message. Each message carries an ID and a priority, not a sender-to-receiver address.',
      },
      {
        label: 'Built for the real world',
        text: 'Strong error detection and high noise immunity, made for the electrical noise of a running vehicle.',
      },
      {
        label: 'Where you meet it',
        text: "Inside the tractor's ECUs, and on the end-of-line rigs and measurement devices that read them.",
      },
    ],
    mission:
      "Your mission: read the tractor's engine and transmission ECUs on the end-of-line rig over CAN, and understand why a broadcast bus suits a vehicle full of controllers.",
  },

  anchor: {
    today:
      'At end-of-line test, the engine and transmission ECUs hold the real running data. Reading it means a hand-held tool and a technician writing numbers onto the test sheet by hand.',
    shift:
      "The test rig sits on the tractor's CAN bus and reads the ECU messages directly. Every controller's data is on the same two wires, broadcast for any node to hear.",
    payoff:
      'The ECU data is captured automatically at test, not transcribed. The rig reads the real values the controllers are already broadcasting.',
  },

  steps: [
    {
      kind: 'sequence',
      id: 'canbus-s1',
      points: 15,
      prompt: 'Put the handling of a single CAN message in order, from the ECU that has something to share to the rig that keeps it.',
      recap: 'Ordered the life of a CAN message: an ECU broadcasts, every node hears it, priority settles a clash, and the rig keeps the IDs it wants.',
      items: [
        { id: 'q1', text: 'An ECU has a value to share, such as engine speed' },
        { id: 'q2', text: 'It puts a message with an ID and priority onto the bus' },
        { id: 'q3', text: 'Every node on the bus hears the message' },
        { id: 'q4', text: 'When two send at once, the higher-priority ID wins the bus (arbitration)' },
        { id: 'q5', text: 'The test rig keeps the message IDs it cares about' },
      ],
      explainCorrect:
        'CAN broadcasts. A node with something to say puts a message onto the two wires, and every node on the bus hears it. Nobody is addressed. When two nodes start at once, the message with the higher-priority ID wins the bus and the other waits and tries again. Receivers then pick out the IDs they want and ignore the rest.',
    },
    {
      kind: 'match',
      id: 'canbus-s2',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Sort each statement into true of CAN, or not how CAN works.',
      recap: 'Sorted the statements: CAN broadcasts to every node and arbitrates by message priority, it does not address one named receiver or run from a polling master.',
      buckets: [
        { key: 'true', label: 'True of CAN', hint: 'How the bus actually behaves' },
        { key: 'false', label: 'Not how CAN works', hint: 'A different kind of network' },
      ],
      items: [
        {
          id: 'm1',
          text: 'Every node hears every message',
          bucket: 'true',
          why: 'CAN is a broadcast bus. A message goes onto the shared two wires and every node on the bus receives it.',
        },
        {
          id: 'm2',
          text: 'Messages carry an ID and a priority',
          bucket: 'true',
          why: 'The ID names the kind of data and also sets the priority, which is what the bus uses to decide who goes first.',
        },
        {
          id: 'm3',
          text: 'Each message is addressed to one named receiver',
          bucket: 'false',
          why: 'CAN carries no source or destination address. The message is broadcast, and each receiver decides for itself whether it wants that ID.',
        },
        {
          id: 'm4',
          text: 'Strong error detection for noisy environments',
          bucket: 'true',
          why: 'CAN was built for the electrical noise of a vehicle, with strong error detection and high noise immunity over a differential pair.',
        },
        {
          id: 'm5',
          text: 'A central master must poll each node in turn',
          bucket: 'false',
          why: 'CAN is multi-master. Any node can speak when it has something to say, and priority arbitration sorts out clashes. No central poller is needed.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'canbus-s3',
      points: 20,
      setup:
        'At end-of-line test you need the engine and transmission running data for the test record. The ECUs already measure and broadcast those values on the tractor\'s CAN bus.',
      prompt: 'How should the rig get the engine and transmission running data?',
      recap: 'Read the ECUs over the CAN bus they already use, so the rig captures the real values the controllers are already broadcasting.',
      choices: [
        {
          label: 'Read the ECUs over the CAN bus they already use',
          verdict: 'success',
          explanation:
            'Correct. The engine and transmission ECUs are already broadcasting these values on CAN. Put the rig on that bus and it reads the real running data straight from the controllers, captured automatically into the test record.',
        },
        {
          label: 'Add separate sensors on the rig that duplicate what the ECUs already measure',
          verdict: 'partial',
          explanation:
            'It would work, but it is wasted effort and a second source of truth. The ECUs already measure these values and broadcast them on CAN. Reading their messages is cheaper and matches what the tractor itself reports.',
        },
        {
          label: 'Keep transcribing values from a hand-held tool by eye',
          verdict: 'error',
          explanation:
            'This is the manual step the shift is meant to remove. It is slow and error-prone, and the test sheet ends up holding what a person copied rather than what the controller broadcast. Put the rig on the bus instead.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'canbus-s4',
      points: 10,
      prompt: 'What makes CAN well suited to a vehicle full of controllers?',
      recap: 'Named the reason: a rugged broadcast bus where any controller can speak and all can hear, with priority arbitration ordering the traffic.',
      options: [
        {
          text: 'It is a rugged broadcast bus where any controller can speak and all can hear, with priority arbitration ordering the traffic',
          correct: true,
          explanation:
            'Correct. Many controllers share two wires, any one can broadcast when it has something to say, every node hears it, and when two clash the higher-priority message wins. That, with strong error detection, is why CAN runs inside vehicles.',
        },
        {
          text: 'It gives each controller its own private wire to every other controller',
          correct: false,
          explanation:
            'That is the opposite of CAN. CAN puts every controller on the same shared two wires and broadcasts. Private point-to-point wiring is exactly the wiring tangle CAN was built to avoid.',
        },
        {
          text: 'It needs a central PC to run the bus and route the messages',
          correct: false,
          explanation:
            'CAN is multi-master with no central router. Nodes arbitrate by message priority among themselves, so a controller network keeps working without a PC in charge.',
        },
        {
          text: 'It is simply the fastest network available',
          correct: false,
          explanation:
            'CAN is not chosen for raw speed. It is chosen for being rugged, message-based and reliable in a noisy vehicle, with priority that guarantees the urgent message gets through first.',
        },
      ],
    },
  ],

  results: {
    proof:
      'CAN, developed by Bosch in 1986 and standardised as ISO 11898, is a rugged message-based broadcast bus with priority arbitration and strong error detection, which is why it is the network inside vehicles and on the rigs that test their ECUs.',
    source: 'Bosch / ISO 11898, Controller Area Network (CAN)',
    keyPoints: [
      'CAN is message-based and broadcast, not addressed. Every node hears every message.',
      'Priority arbitration orders the bus, so the most urgent message goes first when two clash.',
      'It is built for noisy vehicle environments, with strong error detection and high noise immunity.',
      'It is how the ECUs and the end-of-line test rigs talk, reading running data straight from the controllers.',
    ],
    leaderLens:
      "Ask whether the running data your test captures is read straight from the machine's own controllers, or transcribed by hand from a tool.",
  },
}
