import type { PillarModule } from '../types'

// Pillar 7: Wireless on the floor, the radios that connect things a cable
// cannot reach, anchored to the Transmission & Torque Line.
export const wireless: PillarModule = {
  id: 'wireless',
  order: 7,
  name: 'Wireless on the Floor',
  short: 'Wireless',
  accentIndex: 0,
  scenario: 'torque',
  minutes: 6,

  intro: {
    whatIsIt:
      'Wireless gets data off things that move, rotate, or sit where a cable is impractical. There is no single best radio, only a set of trade-offs. The three properties that matter are range, power and bandwidth, and they pull against each other: a radio that reaches far runs at very low data, and a radio that moves a lot of data runs at short range or burns power. You pick to fit the job. Bluetooth and BLE (IEEE 802.15.1) are short range, about ten metres, low power and moderate data, which suits handheld tools and wearables point to point; cordless torque tools often report over Bluetooth or Wi-Fi. Zigbee (IEEE 802.15.4) is short to medium range and low data, with a self-healing mesh that fits dense clusters of small sensors. Wi-Fi (802.11) gives high bandwidth at medium range for tablets, cameras and anything needing real throughput, at higher power. LoRa and LoRaWAN reach kilometres at very low power and very low data, good for sparse battery sensors across a wide yard. Private 5G gives wide coverage, high bandwidth and low latency; John Deere runs a private 5G network in-plant for its autonomous mobile robots. On the John Deere journey, wireless feeds tools and sensors into the edge and Ignition wherever a cable cannot follow.',
    facets: [
      {
        label: 'Why wireless',
        text: 'For things that move, rotate, or sit where a cable is impractical: handheld tools, AGVs and yard sensors.',
      },
      {
        label: 'The trade-off',
        text: 'Range, power and bandwidth pull against each other. Gaining one usually costs another.',
      },
      {
        label: 'Short range',
        text: 'Bluetooth and BLE for tools and wearables, Zigbee mesh for dense low-data sensors, Wi-Fi for tablets and cameras that need throughput.',
      },
      {
        label: 'Long range',
        text: 'LoRa for sparse battery sensors across a wide yard, private 5G for AGVs that need wide coverage and low latency.',
      },
    ],
    mission:
      'Your mission: match each thing on the floor, a cordless torque tool, a yard tank sensor, an AGV, a dense sensor cluster, to the wireless technology that fits its range, power and bandwidth.',
  },

  anchor: {
    today:
      'The line\'s cordless nutrunners hold their torque results inside the tool. At shift end someone docks each tool and exports the data, so a bad joint is only seen long after the tractor moved on.',
    shift:
      'The cordless tools report each fastening result over wireless, Bluetooth or Wi-Fi, to the line gateway the moment it happens.',
    payoff:
      'A torque fault is seen at the joint, on the tractor in front of you, not at shift end. The right radio, chosen for a moving tool, makes that possible.',
  },

  steps: [
    {
      kind: 'match',
      id: 'wireless-s1',
      points: 15,
      scoreMode: 'perItem',
      prompt: 'Match each device to the wireless technology that fits its range, power and bandwidth.',
      recap: 'Matched each device on the floor to the radio that fit its range, power and bandwidth.',
      buckets: [
        { key: 'ble', label: 'Bluetooth / BLE', hint: 'short range, low power' },
        { key: 'zigbee', label: 'Zigbee mesh', hint: 'dense, low data, self-healing' },
        { key: 'wifi', label: 'Wi-Fi', hint: 'high bandwidth' },
        { key: 'lora', label: 'LoRa', hint: 'kilometres, very low power and data' },
        { key: 'cell', label: 'Private 5G', hint: 'wide coverage, low latency' },
      ],
      items: [
        {
          id: 'w1',
          text: 'A cordless torque tool reporting each result',
          bucket: 'ble',
          why: 'A handheld tool moves with the operator and sends a small result each time it fires. Bluetooth or BLE is short range and low power, which fits a moving tool point to point.',
        },
        {
          id: 'w2',
          text: 'A dense cluster of low-data sensors that should self-heal',
          bucket: 'zigbee',
          why: 'Many small sensors sending little data suit a Zigbee mesh, where nodes relay for each other and the network heals around a dropped node.',
        },
        {
          id: 'w3',
          text: 'A tablet streaming work instructions and video',
          bucket: 'wifi',
          why: 'Streaming instructions and video needs real throughput. Wi-Fi gives high bandwidth at medium range, which is what a tablet needs.',
        },
        {
          id: 'w4',
          text: 'A battery tank-level sensor at the far edge of the yard',
          bucket: 'lora',
          why: 'A lone battery sensor far away, sending a reading now and then, suits LoRa: kilometres of range at very low power and very low data.',
        },
        {
          id: 'w5',
          text: 'An autonomous mobile robot needing wide coverage and low latency',
          bucket: 'cell',
          why: 'An AGV roams the plant and needs wide coverage with low latency. Private 5G gives that, which is why John Deere runs one in-plant for its AMRs.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'wireless-s2',
      points: 10,
      prompt: 'Why can a single wireless technology not be long-range, high-bandwidth and low-power all at once?',
      recap: 'Saw that range, power and bandwidth trade against each other, so gaining one costs another.',
      options: [
        {
          text: 'Because range, power and bandwidth pull against each other, so gaining one usually costs another',
          correct: true,
          explanation:
            'Correct. These three trade off by physics, not by product limits. A radio that reaches far does so at low data, and one that moves a lot of data is short range or power-hungry. You pick to fit the job.',
        },
        {
          text: 'Because the licence cost of a do-it-all radio would be too high',
          correct: false,
          explanation:
            'Cost is not the reason. Even with unlimited budget, the same radio cannot be long-range, high-bandwidth and low-power at once. The limit is in the trade-off itself.',
        },
        {
          text: 'Because interference on the floor is the only thing holding it back',
          correct: false,
          explanation:
            'Interference is a real-world nuisance, but it is not the reason. The range, power and bandwidth trade-off holds even on a perfectly clean band.',
        },
        {
          text: 'Because no one has built such a radio yet',
          correct: false,
          explanation:
            'It is not waiting to be invented. The three properties trade against each other, so a radio that does all three at once cannot exist.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'wireless-s3',
      points: 20,
      setup:
        'You must monitor a battery sensor on a tank at the far edge of the yard. It sends one reading every few minutes and has to run for a long time on its battery.',
      prompt: 'Which wireless choice fits this sensor?',
      recap: 'Chose LoRa, the long-range, very low-power radio that fits a sparse, infrequent yard reading.',
      choices: [
        {
          label: 'Use LoRa',
          verdict: 'success',
          explanation:
            'Correct. Long range and very low power are exactly what a sparse, infrequent reading at the edge of the yard needs. LoRa reaches the tank and the battery lasts, because the data is tiny and rare.',
        },
        {
          label: 'Use Wi-Fi and add power and repeaters to reach it',
          verdict: 'partial',
          explanation:
            'It can be made to work, but you are forcing a short-range, power-hungry radio into a long-range job. The repeaters and power you bolt on are cost and maintenance that LoRa would not need.',
        },
        {
          label: 'Run a cable across the yard to the tank',
          verdict: 'error',
          explanation:
            'A cable across the yard to a single slow sensor is expensive to lay, exposed to traffic and weather, and a maintenance burden. This is exactly the case wireless exists for.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'wireless-s4',
      points: 10,
      prompt: 'Why does a cordless torque tool use wireless rather than a cable?',
      recap: 'Saw that the tool moves with the operator, so a cable would not survive the use and would slow the work.',
      options: [
        {
          text: 'It moves with the operator, so a cable would not survive the use and would slow the work',
          correct: true,
          explanation:
            'Correct. The tool is picked up, swung and set down all shift. A cable would snag, wear and get in the way, which is why a moving tool reports over wireless.',
        },
        {
          text: 'Wireless reporting is always more accurate than a cable',
          correct: false,
          explanation:
            'Wireless does not make the reading more accurate. The torque value is the same; wireless just gets it off a tool that moves.',
        },
        {
          text: 'A cable physically cannot carry torque data',
          correct: false,
          explanation:
            'A cable can carry the data perfectly well. The reason for wireless is that the tool moves, not any limit on what a cable can carry.',
        },
        {
          text: 'To save the cost of the tool itself',
          correct: false,
          explanation:
            'Wireless does not lower the cost of the tool. The reason is mobility: the tool moves with the operator and a cable would get in the way.',
        },
      ],
    },
  ],

  results: {
    proof:
      'Wireless choices trade range against power against bandwidth. Bluetooth and Zigbee serve short-range low-power needs, Wi-Fi serves throughput, LoRa reaches kilometres at very low power and data, and private 5G gives wide low-latency coverage, which John Deere uses for its in-plant autonomous mobile robots.',
    source: 'LoRa Alliance, Bluetooth SIG and Zigbee Alliance',
    keyPoints: [
      'Wireless is for things that move or sit where a cable cannot go.',
      'Range, power and bandwidth trade against each other, so match the radio to the job.',
      'Bluetooth and Zigbee for short range, Wi-Fi for throughput, LoRa for far and sparse, private 5G for wide and low-latency.',
      'John Deere runs a private 5G network for its autonomous mobile robots.',
    ],
    leaderLens:
      'Ask whether a wireless choice on your floor was matched to range, power and bandwidth, or just defaulted to Wi-Fi because it was already there.',
  },
}
