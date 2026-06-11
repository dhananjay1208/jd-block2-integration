import type { PillarModule } from '../types'

// Pillar 8: MQTT and Sparkplug B, anchored to the paint and CED shop.
// The northbound protocol out of Ignition. Ignition publishes its tags by
// exception as Sparkplug B over MQTT to the broker.
export const mqtt: PillarModule = {
  id: 'mqtt',
  order: 8,
  name: 'MQTT & Sparkplug B',
  short: 'MQTT',
  accentIndex: 1,
  scenario: 'paint',
  minutes: 6,

  intro: {
    whatIsIt:
      'MQTT is a lightweight publish and subscribe messaging protocol, standardised by OASIS in versions 3.1.1 and 5.0. It was designed for constrained, low-bandwidth telemetry. It is broker-based: publishers publish to named topics, subscribers subscribe to topics, and the broker routes messages between them. Publishers and subscribers never talk to each other directly, which decouples who produces data from who uses it. Small message overhead and report-by-exception, publishing only when a value changes, keep it efficient over poor links. Sparkplug B is an open specification from Eclipse that sits on top of MQTT and adds a standard topic namespace and a typed payload, including birth and death certificates, so OT data is consistent, typed and stateful and the system knows when a device drops.',
    facets: [
      {
        label: 'What it is',
        text: 'A lightweight publish and subscribe protocol. Publishers and subscribers never talk directly, a broker routes messages by topic.',
      },
      {
        label: 'Why OT likes it',
        text: 'Small overhead and report-by-exception keep it efficient over poor links, and it decouples who produces data from who uses it.',
      },
      {
        label: 'Sparkplug B',
        text: 'An open layer on top of MQTT that standardises the topic names and payload, so OT data is consistent, typed and stateful, and it knows when a device drops.',
      },
      {
        label: 'Where it sits',
        text: 'The way data leaves Ignition. The MQTT Transmission module publishes tags by exception to the broker.',
      },
    ],
    mission:
      'Your mission: publish the paint shop data out of Ignition by MQTT, by exception, so thousands of readings become a light, change-only stream the rest of the plant can subscribe to.',
  },

  anchor: {
    today:
      'The paint and CED shop has thousands of readings. Each system that wants them polls Ignition directly, and every new consumer means another point-to-point connection to build.',
    shift:
      'Ignition publishes the shop tags by exception over MQTT to a broker. Anyone who needs the data subscribes to a topic, and producers and consumers never wire to each other.',
    payoff:
      'One light, change-only stream feeds many consumers. Adding a new dashboard or analytics feed is a subscribe, not a new integration.',
  },

  steps: [
    {
      kind: 'scenario-decision',
      id: 'mqtt-s1',
      points: 20,
      setup:
        'Five systems each need live paint-shop data from Ignition: a plant dashboard, an energy report, a quality feed, a maintenance view and an analytics pipeline.',
      prompt: 'How do you get the shop data to all five?',
      recap: 'Chose to publish once by MQTT to a broker and let each system subscribe to the topic.',
      choices: [
        {
          label: 'Publish once by MQTT to a broker, and each system subscribes to the topic',
          verdict: 'success',
          explanation:
            'Correct. Ignition publishes the data once, by exception. The five consumers subscribe to the topic, and a sixth or seventh later is just another subscriber, not a new build.',
        },
        {
          label: 'Build a point-to-point connection from Ignition to each of the five',
          verdict: 'partial',
          explanation:
            'It would work today, but you now own five integrations, and every future consumer adds another. The publish and subscribe model gives the same result with one stream.',
        },
        {
          label: 'Have each system poll Ignition every second for every tag',
          verdict: 'error',
          explanation:
            'Constant polling of thousands of tags floods the link and loads Ignition, most of it asking for values that have not changed. Report-by-exception sends only what moved.',
        },
      ],
    },
    {
      kind: 'match',
      id: 'mqtt-s2',
      points: 12,
      scoreMode: 'perItem',
      prompt: 'Sort each item into the MQTT model.',
      recap: 'Sorted each item into publisher, broker or subscriber.',
      buckets: [
        { key: 'pub', label: 'Publisher' },
        { key: 'broker', label: 'Broker' },
        { key: 'sub', label: 'Subscriber' },
      ],
      items: [
        {
          id: 'm1',
          text: 'Ignition sending oven temperature on change',
          bucket: 'pub',
          why: 'Ignition produces the data and publishes it to a topic when the value changes, so it is the publisher.',
        },
        {
          id: 'm2',
          text: 'Routes messages by topic and holds no long-term data',
          bucket: 'broker',
          why: 'The broker matches publishers to subscribers by topic and passes messages through, it is not a store.',
        },
        {
          id: 'm3',
          text: 'An analytics feed asking for the paint topic',
          bucket: 'sub',
          why: 'It consumes the data by subscribing to the topic, so it is a subscriber.',
        },
        {
          id: 'm4',
          text: "RabbitMQ's MQTT listener",
          bucket: 'broker',
          why: 'It is the broker endpoint that receives published messages and routes them to subscribers.',
        },
        {
          id: 'm5',
          text: 'A dashboard receiving the values',
          bucket: 'sub',
          why: 'It subscribes to the topic and displays the values, so it is a subscriber.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'mqtt-s3',
      points: 10,
      prompt: 'What does report-by-exception mean, and why does it help?',
      recap: 'Identified report-by-exception as publishing only on change, which cuts traffic against constant polling.',
      options: [
        {
          text: 'Publish only when a value changes, which cuts traffic sharply compared with constant polling',
          correct: true,
          explanation:
            'Correct. Most readings are steady most of the time, so sending only the changes turns a heavy poll into a light, change-only stream.',
        },
        {
          text: 'Publish every value twice for safety',
          correct: false,
          explanation: 'Sending each value twice doubles traffic and helps nothing. Delivery reliability is handled by the quality-of-service levels, not by duplicating.',
        },
        {
          text: 'Publish on a fixed timer regardless of change',
          correct: false,
          explanation: 'A fixed timer is exactly the constant polling that report-by-exception avoids. It sends unchanged values over and over.',
        },
        {
          text: 'Publish only errors',
          correct: false,
          explanation: 'Report-by-exception sends every change, not only faults. The exception is a change in value, not an error.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'mqtt-s4',
      points: 10,
      prompt: 'What does Sparkplug B add on top of plain MQTT?',
      recap: 'Named the standard namespace and the typed, stateful payload, including knowing when a device drops, as what Sparkplug B adds.',
      options: [
        {
          text: 'A standard topic namespace and a typed, stateful payload, including knowing when a device drops',
          correct: true,
          explanation:
            'Correct. Sparkplug B fixes the topic names and the payload shape, and its birth and death certificates mean the system knows when a device is alive or has dropped.',
        },
        {
          text: 'It encrypts the network',
          correct: false,
          explanation: 'Encryption is handled at the transport layer, not by Sparkplug B. Sparkplug B is about consistent structure and device state.',
        },
        {
          text: 'It increases bandwidth',
          correct: false,
          explanation: 'Sparkplug B rides on the same light MQTT stream. It standardises the data, it does not need more bandwidth.',
        },
        {
          text: 'It replaces the broker',
          correct: false,
          explanation: 'The broker still routes the messages. Sparkplug B defines the namespace and payload that travel through it.',
        },
      ],
    },
  ],

  results: {
    proof:
      'MQTT from OASIS is a lightweight publish and subscribe protocol that decouples producers from consumers through a broker and uses report-by-exception to stay efficient. Sparkplug B from Eclipse adds a standard namespace and a typed, stateful payload, and is what Ignition\'s MQTT Transmission module publishes.',
    source: 'OASIS MQTT and Eclipse Sparkplug specifications',
    keyPoints: [
      'MQTT is publish and subscribe through a broker.',
      'Report-by-exception keeps it light.',
      'It decouples producers from consumers.',
      'Sparkplug B standardises OT payloads and device state.',
    ],
    leaderLens:
      'Ask whether every new consumer of your plant data is a fresh point-to-point build, or just one more subscriber to a stream that already exists.',
  },
}
