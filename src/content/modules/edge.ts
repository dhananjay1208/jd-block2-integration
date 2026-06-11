import type { PillarModule } from '../types'

// Pillar 2: Edge Gateway & Edge Computing, anchored to the machining line.
export const edge: PillarModule = {
  id: 'edge',
  order: 2,
  name: 'Edge Gateway & Edge Computing',
  short: 'Edge',
  accentIndex: 1,
  scenario: 'machining',
  minutes: 6,

  intro: {
    whatIsIt:
      'A small compute node placed near the machines. It collects, buffers, pre-processes and forwards data, instead of pushing every raw reading straight to a central server or the cloud. Ignition Edge is a lightweight edition built for this first-mile role, the node that sits before Ignition or central.',
    facets: [
      {
        label: 'What it does',
        text: 'Collects and pre-processes data close to the machine, then forwards only what matters upstream.',
      },
      {
        label: 'Store and forward',
        text: 'If the network link drops, the edge buffers readings locally and sends them in order when the link returns, so nothing is lost.',
      },
      {
        label: 'Why at the edge',
        text: 'Local filtering and report-by-exception cut the data volume sent upstream, and local logic can react in milliseconds without a round trip to the centre.',
      },
      {
        label: 'The trade',
        text: 'More nodes to manage and keep secure. Edge is compute you now own out on the floor.',
      },
    ],
    primer: {
      title: 'Know this before you play',
      blocks: [
        {
          heading: 'Store-and-forward, step by step',
          body: 'The plant link drops. The edge gateway keeps collecting and writes every reading to its local buffer with a timestamp. The link returns. The buffer drains in timestamp order, oldest first, until it is empty. The central historian receives the whole window as if the outage never happened: no gap, no out-of-order points. The weak choice is keeping only the latest value, because one snapshot cannot show a trend, such as a tool wearing and a dimension drifting, that built up during the outage.',
        },
        {
          heading: 'Report-by-exception, with the arithmetic',
          body: 'A sensor sampled every 100 milliseconds produces 10 readings a second, which is 600 a minute. If the value only changes about 5 times a minute, then 595 of those 600 messages are repeats. Sending only the changes removes roughly 99 percent of the traffic, and the upstream picture is identical because nothing new was in the repeats.',
        },
        {
          heading: 'The split: fast and local versus heavy and shared',
          body: 'Put a task at the edge when it must survive a link drop or react in milliseconds, faster than a round trip to a server allows. Put a task at the centre when it needs data from many lines or plants at once, or storage measured in years. A small node on the floor has neither the compute nor the disk for plant-wide work, and the centre is too far away for millisecond reactions.',
        },
      ],
      table: {
        caption: 'Where does each task belong?',
        headers: ['Task', 'Edge or centre', 'Why'],
        rows: [
          ['Hold readings while the link is down', 'Edge', 'Only the node next to the machine can keep collecting when the network is gone'],
          ['Filter out unchanged values before sending', 'Edge', 'A filter at the source stops repeats from ever entering the network'],
          ['Trip a safety action within milliseconds', 'Edge', 'A round trip to a central server takes too long; the logic must run locally'],
          ['Build a model from data across all plants', 'Centre', 'Needs data and compute from many sites at once, far beyond one floor node'],
          ['Compare performance across several lines', 'Centre', 'Only the centre sees every line, so only the centre can compare them'],
          ['Store many years of process history', 'Centre', 'Long-term archives need central disk; a floor node has limited storage'],
        ],
      },
    },
    mission:
      'Your mission: put an edge gateway on the machining line so a dropped network link never loses a single reading, and only meaningful changes travel upstream.',
  },

  anchor: {
    today:
      'Every machining sensor reading is sent straight to a central server. When the plant link hiccups, that window of data is gone. And the network carries millions of identical readings that never change.',
    shift:
      'An edge gateway on the line collects the readings, buffers them locally through any link drop, and forwards by exception, so only real changes go up.',
    payoff:
      'No data lost during a network blip, far less traffic on the plant network, and the line can still act on a local reading without waiting for the centre.',
  },

  steps: [
    {
      kind: 'scenario-decision',
      id: 'edge-s1',
      points: 20,
      setup:
        'Mid-shift on the machining line, the plant network drops for 90 seconds. Spindle load, vibration and dimension readings keep arriving from the machines every fraction of a second.',
      prompt: 'What should the line edge gateway do while the link is down?',
      recap: 'Chose store-and-forward, so the 90-second window reached the historian intact.',
      choices: [
        {
          label: 'Buffer the readings locally and forward them in order when the link returns',
          verdict: 'success',
          explanation:
            'Correct. This is store-and-forward. The edge holds every reading while the link is down and sends them in sequence the moment it returns, so the historian has no gap and nothing is lost.',
        },
        {
          label: 'Hold only the latest value and send that one when the link returns',
          verdict: 'partial',
          explanation:
            'Close, but you still lose the 90 seconds in between. One snapshot cannot show the spindle load or dimension trend that built up during the outage. Buffer the whole window, not just the last point.',
        },
        {
          label: 'Drop the readings, since the central server was unreachable',
          verdict: 'error',
          explanation:
            'That is exactly the loss the edge exists to prevent. A worn tool can drift a dimension inside that window, and now there is no record of it. The edge should buffer locally, not discard.',
        },
      ],
    },
    {
      kind: 'match',
      id: 'edge-s2',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Sort each task into where it belongs: do it at the edge, or do it at the centre.',
      recap: 'Sorted fast local work to the edge and heavy shared work to the centre.',
      buckets: [
        { key: 'edge', label: 'Do at the edge', hint: 'Near the machine, fast, local' },
        { key: 'centre', label: 'Do at the centre', hint: 'Plant-wide, heavy, shared' },
      ],
      items: [
        {
          id: 'm1',
          text: 'Buffer readings through a link drop',
          bucket: 'edge',
          why: 'Store-and-forward only works if the buffering happens close to the machine, on the node that keeps collecting while the link is down.',
        },
        {
          id: 'm2',
          text: 'Report only changed values upstream',
          bucket: 'edge',
          why: 'Report-by-exception is a filter applied at the source, so the unchanged readings never leave the line in the first place.',
        },
        {
          id: 'm3',
          text: 'A millisecond local safety interlock',
          bucket: 'edge',
          why: 'A reaction that has to happen in milliseconds cannot wait for a round trip to the centre. It runs locally, at the edge.',
        },
        {
          id: 'm4',
          text: 'Train a model across every plant',
          bucket: 'centre',
          why: 'Training across plants needs data and compute from many lines at once. That is a central job, not an edge one.',
        },
        {
          id: 'm5',
          text: 'Cross-line analytics and reporting',
          bucket: 'centre',
          why: 'Comparing lines and rolling up reports needs the full picture from everywhere, which lives at the centre.',
        },
        {
          id: 'm6',
          text: 'Keep years of history in the historian',
          bucket: 'centre',
          why: 'Long-term history belongs in the central historian, not on a small node on the floor with limited storage.',
        },
      ],
    },
    {
      kind: 'slider-estimate',
      id: 'edge-s3',
      points: 13,
      setup:
        'A machining sensor sends a reading every 100 milliseconds, so 10 a second and 600 a minute. The actual value only changes about 5 times a minute.',
      prompt: 'Roughly what percentage of those messages can report-by-exception remove?',
      recap: 'Estimated that report-by-exception strips the vast majority of unchanged messages.',
      min: 0,
      max: 100,
      step: 5,
      unit: '%',
      answer: 99,
      tolerance: 5,
      explainCorrect:
        'When a value rarely changes, sending only the changes removes the vast majority of messages, often well above 95 percent. Ten readings a second is 600 a minute. If the value moves a few times a minute, almost all of those 600 are repeats you never need to send.',
    },
    {
      kind: 'mcq',
      id: 'edge-s4',
      points: 10,
      prompt: 'What is the main reason to compute at the edge rather than send everything to the centre?',
      recap: 'Named cutting volume and keeping local decisions fast and link-resilient as the real reason.',
      options: [
        {
          text: 'To cut data volume and keep local decisions fast and resilient to link drops',
          correct: true,
          explanation:
            'Correct. The edge filters traffic before it travels, reacts locally without a round trip, and buffers through outages. Those three together are why you put compute on the floor.',
        },
        {
          text: 'Because edge computing is always cheaper',
          correct: false,
          explanation:
            'Not always. Each edge node is a piece of compute you now own, manage and secure. The case for it is resilience and volume, not a guaranteed lower bill.',
        },
        {
          text: 'Because it removes the need for a central system',
          correct: false,
          explanation:
            'The centre is still where cross-line analytics, model training and long-term history live. The edge sits in front of it, it does not replace it.',
        },
        {
          text: 'Because it makes the sensors more accurate',
          correct: false,
          explanation:
            'The edge changes how readings are collected, buffered and forwarded. It does not change the accuracy of the sensor itself.',
        },
      ],
    },
  ],

  results: {
    proof:
      'Edge collection with store-and-forward means a dropped link buffers data locally and forwards it with no loss, and report-by-exception cuts upstream volume sharply. Ignition Edge is the lightweight edition built for this first-mile role.',
    source: 'Inductive Automation, Ignition platform documentation',
    keyPoints: [
      'Edge means collect, buffer and filter close to the machine, before data travels upstream.',
      'Store-and-forward prevents data loss on a link drop by buffering locally and sending in order when the link returns.',
      'Report-by-exception cuts traffic by sending only changed values, not the constant stream of repeats.',
      'The cost is more nodes to own and secure, compute you now run out on the floor.',
    ],
    leaderLens:
      'Ask what happens to your line data the next time the network drops for a minute. If the answer is "it is gone", the edge is missing.',
  },
}
