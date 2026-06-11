import type { PillarModule } from '../types'

// Pillar 10: Apache Kafka, anchored to the transmission and torque line.
// The final hop. The bridge produces events to Kafka; Kafka retains the stream;
// analytics, dashboards and models consume and replay it. This is where the
// plant's event history lives.
export const kafka: PillarModule = {
  id: 'kafka',
  order: 10,
  name: 'Apache Kafka',
  short: 'Kafka',
  accentIndex: 0,
  scenario: 'torque',
  minutes: 7,

  intro: {
    whatIsIt:
      'Apache Kafka is a distributed event streaming platform, built around an append-only log. It originated at LinkedIn and is now an Apache project. Producers write events to topics; each topic is split into partitions so load spreads across brokers and many consumers read in parallel. Events are retained for a configured time and are not deleted when they are read. Each consumer group tracks its own offset, so a consumer can read independently and replay from any point in the retained history. The strengths are high throughput, horizontal scale, durable retention, replay, and decoupling many producers from many consumers, which is why it is the backbone for analytics, streaming and machine learning. The contrast with RabbitMQ is the log: Kafka keeps events so they can be replayed, while RabbitMQ deletes a message once it is acknowledged.',
    facets: [
      {
        label: 'What it is',
        text: 'A distributed event streaming platform that keeps an append-only log of events, built for high throughput and scale.',
      },
      {
        label: 'Retained and replayable',
        text: 'Events are kept for a set time and not deleted when read, so a new consumer or model can replay the whole history.',
      },
      {
        label: 'Topics and partitions',
        text: 'Events go to topics, split into partitions so the load spreads across machines and many consumers read in parallel.',
      },
      {
        label: 'Where it sits',
        text: 'The analytics backbone at the top of the journey, where the plant event stream lands for dashboards, models and long-range analysis.',
      },
    ],
    primer: {
      title: 'Know this before you play',
      blocks: [
        {
          heading: 'The log, not the letterbox',
          body: 'A queue hands a message to one consumer and deletes it. Kafka appends events to a log and leaves them there for the retention window. So a dashboard, a quality model and the warranty team can each read the same stream at their own pace, and a brand-new consumer can start from the beginning.',
        },
        {
          heading: 'Retention sets the replay window',
          body: 'If retention is 7 days, a consumer that was offline can come back and catch up on up to 7 days of missed events. Nothing older than the retention window is still on the log.',
        },
      ],
      table: {
        caption: 'Four Kafka terms, in plain words',
        headers: ['Term', 'What it is'],
        rows: [
          ['Topic', 'A named stream of events, like a ledger for torque results'],
          ['Partition', 'A slice of a topic, so the load spreads across brokers and many consumers read in parallel'],
          ['Retention', 'How long events are kept, set by time or size. Events are NOT deleted when read'],
          ['Offset', 'The bookmark each consumer group keeps in the stream. Rewind the bookmark and you replay history'],
        ],
      },
    },
    mission:
      'Your mission: land the torque-line event stream in Kafka so analytics can replay years of fastening data and tie a field warranty pattern back to the exact build conditions.',
  },

  anchor: {
    today:
      'Torque results stream through the plant but are consumed once and then gone. When a warranty pattern appears in the field months later, the build data needed to explain it was not kept in a form anyone can replay.',
    shift:
      'The torque event stream lands in Kafka and is retained. Dashboards, a quality model and the warranty team each read it independently, and can replay the history from any point.',
    payoff:
      'A field failure pattern can be replayed against the exact torque history that produced it. The same stream feeds live dashboards and long-range analysis without anyone re-extracting data.',
  },

  steps: [
    {
      kind: 'sequence',
      id: 'kafka-s1',
      points: 15,
      prompt: 'Put the Kafka flow in order, from event to replay.',
      recap: 'Ordered the Kafka flow from the produced event through retention to a model replaying the history.',
      items: [
        { id: 'k1', text: 'The bridge produces torque events to a topic' },
        { id: 'k2', text: 'The topic is split into partitions across brokers' },
        { id: 'k3', text: 'Events are retained for a set time, not deleted on read' },
        { id: 'k4', text: 'Each consumer group tracks its own offset' },
        { id: 'k5', text: 'A new model replays the history from the start' },
      ],
      explainCorrect:
        'The bridge produces events to a topic, which is partitioned across brokers so load spreads and many consumers read in parallel. Events are retained rather than deleted on read, so each consumer group keeps its own offset and reads independently. Because the history is still there, a new model can replay it from the start.',
    },
    {
      kind: 'mcq',
      id: 'kafka-s2',
      points: 10,
      prompt: 'What is the key difference between Kafka and a traditional message queue?',
      recap: 'Identified that Kafka retains events for replay, while a queue deletes a message once it is consumed.',
      options: [
        {
          text: 'Kafka retains events so they can be replayed; a queue deletes a message once it is consumed',
          correct: true,
          explanation:
            'Correct. The retained log is the point. A new consumer or model can read the whole history, while a queue has already discarded each message the moment it was acknowledged.',
        },
        {
          text: 'Kafka cannot have many consumers',
          correct: false,
          explanation:
            'The opposite is true. Many consumer groups read the same retained stream independently, each tracking its own offset.',
        },
        {
          text: 'Kafka deletes events immediately',
          correct: false,
          explanation:
            'Kafka keeps events for a configured retention time, not deleting them when they are read. Deleting on read is the queue behaviour.',
        },
        {
          text: 'A queue keeps everything forever',
          correct: false,
          explanation:
            'A queue drops a message once it is acknowledged. Durable, replayable retention is the Kafka side of this contrast.',
        },
      ],
    },
    {
      kind: 'slider-estimate',
      id: 'kafka-s3',
      points: 12,
      setup:
        'A consumer group has been offline. Kafka retention is set to 7 days.',
      prompt: 'How many days of missed events can it replay when it returns?',
      recap: 'Estimated that the consumer can replay up to the retention window of events it missed while offline.',
      min: 0,
      max: 14,
      step: 1,
      unit: ' days',
      answer: 7,
      tolerance: 1,
      explainCorrect:
        'It can replay up to the retention window, here 7 days. Kafka kept those events instead of deleting them on read, so the consumer reads from its last offset and catches up on everything it missed within that window.',
    },
    {
      kind: 'mcq',
      id: 'kafka-s4',
      points: 10,
      prompt: 'Why does Kafka make a good analytics backbone?',
      recap: 'Identified that many consumers can read and replay the same retained stream independently at high throughput.',
      options: [
        {
          text: 'Many consumers can read the same retained stream independently and replay it, at high throughput',
          correct: true,
          explanation:
            'Correct. Dashboards, a quality model and the warranty team each read the same stream at their own pace, and any of them can replay the history, all at the throughput Kafka is built for.',
        },
        {
          text: 'It deletes data to save space',
          correct: false,
          explanation:
            'Deleting data would remove the very history analytics needs. Kafka retains events so they can be replayed.',
        },
        {
          text: 'It allows only one reader',
          correct: false,
          explanation:
            'Kafka is built for many independent readers. Each consumer group keeps its own offset and reads without blocking the others.',
        },
        {
          text: 'It is the cheapest option',
          correct: false,
          explanation:
            'Cost is not the reason. The reason is a retained, replayable stream that many consumers can read in parallel at high throughput.',
        },
      ],
    },
  ],

  results: {
    proof:
      'Apache Kafka is a distributed event streaming platform that retains events in partitioned topics so many consumers can read and replay them independently at high throughput. That replayable history is what lets a plant tie a field warranty pattern, John Deere paid around $951 million in warranty claims in 2022, back to the build data that caused it.',
    source: 'Apache Kafka documentation (Apache Software Foundation)',
    keyPoints: [
      'Kafka is a retained, replayable log, not a transient queue.',
      'Topics and partitions give throughput and scale.',
      'Many consumers read independently.',
      'It is the analytics backbone at the top of the journey.',
    ],
    leaderLens:
      'Ask whether your plant event history can be replayed to explain a problem found months later, or whether the data was consumed once and is gone.',
  },
}
