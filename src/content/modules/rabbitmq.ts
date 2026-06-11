import type { PillarModule } from '../types'

// Pillar 9: RabbitMQ, anchored to the hydraulics sub-assembly line.
// The reliable message broker between Ignition's MQTT stream and the bridge to
// Kafka. It buffers bursts, routes by rules, and holds each message until a
// consumer acknowledges it.
export const rabbitmq: PillarModule = {
  id: 'rabbitmq',
  order: 9,
  name: 'RabbitMQ',
  short: 'RabbitMQ',
  accentIndex: 2,
  scenario: 'hydraulics',
  minutes: 6,

  intro: {
    whatIsIt:
      'RabbitMQ is a mature open-source message broker. It implements AMQP 0-9-1 and also supports MQTT and other protocols through plugins. The model is simple: a producer publishes a message to an exchange, the exchange routes it to one or more queues using bindings and a routing key, and consumers read from those queues. A queue buffers and holds a message until a consumer acknowledges it, so a slow or restarted consumer loses nothing. It is a smart broker, with flexible routing, per-message acknowledgement and reliable delivery, and it handles bursty load by buffering.',
    facets: [
      {
        label: 'What it is',
        text: 'A mature message broker. A producer publishes to an exchange, the exchange routes to queues, and consumers read from those queues.',
      },
      {
        label: 'Reliable by design',
        text: 'Queues hold each message until a consumer acknowledges it, so a slow or restarted consumer loses nothing.',
      },
      {
        label: 'Flexible routing',
        text: 'Exchanges route by rules, direct, topic or fanout, so one message can fan out to many queues or target exactly the right one.',
      },
      {
        label: 'Where it sits',
        text: 'It takes Ignition’s MQTT stream through its MQTT plugin and hands it on reliably to the next stage.',
      },
    ],
    primer: {
      blocks: [
        {
          heading: 'The path of one message',
          body:
            'Follow one leak-test result through the broker. The producer, here Ignition, publishes it. It lands on an exchange, which is a router, not a store. The exchange looks at the routing key and forwards the message into one or more queues. The queue is the buffer: it holds the message, absorbing a burst if many arrive at once. The consumer, here the bridge to the next stage, reads from the queue and sends back an acknowledgement. Only then does the queue let the message go.',
        },
        {
          heading: 'Exchange types in one line each',
          body:
            'Direct sends the message to the one queue whose binding matches the routing key exactly. Topic matches the key against a pattern, so one message can reach several interested queues. Fanout ignores the key and copies the message to every queue bound to the exchange.',
        },
        {
          heading: 'Why acknowledgement matters',
          body:
            'An acknowledgement is the consumer telling the broker "I have processed this one". If a consumer dies mid-message, the unacknowledged message goes back on the queue and is delivered again, so a crash loses nothing. The same holds during a restart: messages simply wait in the queue, in order, until a consumer returns and starts acknowledging them.',
        },
        {
          heading: 'One line to remember for the Kafka card',
          body:
            'In RabbitMQ, a message that has been consumed and acknowledged is gone from the queue. Keep that in mind for the Kafka card, where messages are kept on a log and can be replayed later.',
        },
      ],
    },
    mission:
      'Your mission: put RabbitMQ between Ignition and the analytics pipeline so a burst of hydraulics test data is buffered and delivered reliably, never dropped because a consumer was busy.',
  },

  anchor: {
    today:
      'Leak-test data comes in bursts at the end of each cycle. When the downstream system is busy, some of that burst is lost, and nobody is sure which records went missing.',
    shift:
      'Ignition publishes into RabbitMQ. The broker queues the burst, holds each message until the consumer acknowledges it, and routes it to the right place.',
    payoff:
      'A busy or restarted consumer no longer drops data. The burst waits safely in the queue and is delivered in order when the consumer is ready.',
  },

  steps: [
    {
      kind: 'match',
      id: 'rabbitmq-s1',
      points: 12,
      scoreMode: 'perItem',
      setup:
        'Recall the path of one message: producer publishes, exchange routes by key, queue buffers and holds, consumer reads and acknowledges.',
      prompt: 'Sort each item into the part of the RabbitMQ model it belongs to.',
      recap: 'Sorted each item into producer, exchange, queue or consumer.',
      buckets: [
        { key: 'producer', label: 'Producer' },
        { key: 'exchange', label: 'Exchange' },
        { key: 'queue', label: 'Queue' },
        { key: 'consumer', label: 'Consumer' },
      ],
      items: [
        {
          id: 'i1',
          text: 'Ignition publishing test results',
          bucket: 'producer',
          why: 'The producer is the source that publishes messages. Ignition is the source of the leak-test data.',
        },
        {
          id: 'i2',
          text: 'Routes a message to the right queue by its key',
          bucket: 'exchange',
          why: 'The exchange takes each published message and routes it to queues using bindings and a routing key.',
        },
        {
          id: 'i3',
          text: 'Holds messages until they are acknowledged',
          bucket: 'queue',
          why: 'The queue buffers and holds each message until a consumer acknowledges it, so nothing is lost.',
        },
        {
          id: 'i4',
          text: 'The bridge reading messages to send onward',
          bucket: 'consumer',
          why: 'The consumer reads from a queue. Here it is the bridge that forwards the data to the next stage.',
        },
        {
          id: 'i5',
          text: 'Buffers a burst so nothing is dropped',
          bucket: 'queue',
          why: 'Buffering a burst is the queue’s job. It absorbs the spike and releases it as the consumer keeps up.',
        },
        {
          id: 'i6',
          text: 'Decides fanout to all queues or direct to one',
          bucket: 'exchange',
          why: 'The exchange decides routing. A fanout exchange copies to every queue, a direct exchange targets one.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'rabbitmq-s2',
      points: 20,
      setup:
        'A burst of leak-test data arrives at the end of a cycle. At the same moment the downstream consumer restarts and is offline for two minutes.',
      prompt: 'What should happen to the burst while the consumer is down?',
      recap: 'Chose to hold the messages in the queue and deliver them on acknowledgement when the consumer returns.',
      choices: [
        {
          label: 'RabbitMQ holds the messages in the queue and delivers them when the consumer returns, using acknowledgements',
          verdict: 'success',
          explanation:
            'Correct. The queue buffers the whole burst and holds each message until the returning consumer acknowledges it, so no record is lost and they arrive in order.',
        },
        {
          label: 'Keep only the latest message and drop the rest of the burst',
          verdict: 'partial',
          explanation:
            'You would keep the line moving, but every earlier reading in the burst is gone. The point of the queue is to hold all of them, not just the newest.',
        },
        {
          label: 'Discard the burst, since the consumer was down',
          verdict: 'error',
          explanation:
            'This is the failure the broker exists to prevent. Discarding on a restart is exactly the silent data loss you started with.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'rabbitmq-s3',
      points: 10,
      setup:
        'The next card in the journey is Kafka. Both move messages between systems, but they treat a delivered message very differently.',
      prompt: 'How does RabbitMQ differ from Kafka?',
      recap: 'Identified RabbitMQ as a routing broker with consumed-and-acknowledged messages, against Kafka’s retained log.',
      options: [
        {
          text: 'RabbitMQ is a broker with smart routing where messages are consumed and acknowledged; Kafka is a retained, replayable log',
          correct: true,
          explanation:
            'Correct. RabbitMQ routes and delivers a message, then it is acknowledged and gone. Kafka keeps the record on a log that can be read again later.',
        },
        {
          text: 'They are identical, just two names for the same thing',
          correct: false,
          explanation: 'They solve overlapping problems differently. One is a routing broker, the other a retained log.',
        },
        {
          text: 'RabbitMQ keeps every message forever',
          correct: false,
          explanation: 'A RabbitMQ message is removed once it is acknowledged. Retaining a replayable history is Kafka’s model, not RabbitMQ’s.',
        },
        {
          text: 'Kafka has no consumers',
          correct: false,
          explanation: 'Kafka very much has consumers. They read from the log rather than the message being deleted on read.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'rabbitmq-s4',
      points: 10,
      setup:
        'The consumer sends an acknowledgement back to the broker after it has processed each message.',
      prompt: 'What does a per-message acknowledgement give you?',
      recap: 'Named acknowledgement as confirmation a message was processed, so it survives a consumer failure.',
      options: [
        {
          text: 'Confirmation a message was processed, so it is not lost if a consumer fails part-way',
          correct: true,
          explanation:
            'Correct. Until the consumer acknowledges it, the broker keeps the message. If the consumer dies before acknowledging, the message is redelivered rather than lost.',
        },
        {
          text: 'Faster delivery of every message',
          correct: false,
          explanation: 'Acknowledgement is about reliability, not speed. It confirms a message was handled, it does not make delivery faster.',
        },
        {
          text: 'Encryption of the message in transit',
          correct: false,
          explanation: 'Encryption is a separate concern. An acknowledgement confirms processing, it does not secure the payload.',
        },
        {
          text: 'Lower memory use on the broker',
          correct: false,
          explanation: 'Holding unacknowledged messages can use more memory, not less. The point is that nothing is dropped.',
        },
      ],
    },
  ],

  results: {
    proof:
      'RabbitMQ is a mature broker implementing AMQP 0-9-1, where exchanges route to queues and queues hold messages until a consumer acknowledges them, which is why it buffers bursts and delivers reliably between Ignition and the downstream stages. Its MQTT plugin lets it accept Ignition’s MQTT stream directly.',
    source: 'AMQP 0-9-1 and the RabbitMQ documentation',
    keyPoints: [
      'RabbitMQ routes producer to exchange to queue to consumer.',
      'Queues buffer and hold each message until it is acknowledged.',
      'Exchange routing is flexible, direct, topic or fanout.',
      'It is a smart broker, distinct from Kafka’s retained log.',
    ],
    leaderLens:
      'Ask what happens to a burst of your plant data when the system meant to receive it is busy or restarting. A broker is the difference between buffered and lost.',
  },
}
