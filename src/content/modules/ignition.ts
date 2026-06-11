import type { PillarModule } from '../types'

// Pillar 1: Ignition as a Platform, anchored to end-of-line test and dispatch.
export const ignition: PillarModule = {
  id: 'ignition',
  order: 1,
  name: 'Ignition as a Platform',
  short: 'Ignition',
  accentIndex: 0,
  scenario: 'eol',
  minutes: 7,

  intro: {
    whatIsIt:
      'Ignition by Inductive Automation is a server-based industrial application platform. It is the integration hub of the plant. It connects down to PLCs, CNCs and test rigs using drivers like OPC UA and Modbus, stores data in a SQL historian and transaction groups, builds web-based SCADA and HMI screens in Perspective that open in any browser including a phone, and publishes data upward using the MQTT modules. It is licensed per server, not per tag or per client, and it runs on the JVM in a modular way.',
    facets: [
      {
        label: 'What it is',
        text: 'A server-based platform that connects, stores, visualises and publishes plant data. It is a hub you configure, not a fixed-function box you replace.',
      },
      {
        label: 'How it connects down',
        text: 'OPC UA, Modbus and other drivers pull tags from PLCs, CNCs and test rigs into one shared tag model.',
      },
      {
        label: 'How it sends up',
        text: 'The MQTT Transmission module publishes those tags by exception to a broker. That is how the data leaves for RabbitMQ and Kafka.',
      },
      {
        label: 'Why the licensing matters',
        text: 'It is licensed per server, not per tag or per client. Adding tags, screens and phones does not add cost.',
      },
    ],
    primer: {
      title: 'Know this before you play',
      blocks: [
        {
          heading: 'Two ways to store',
          body: 'The tag historian records a tag\'s values over time so you can trend them later, for example torque drift across a shift. A transaction group logs values as rows in a SQL database, for example one row per completed test. Both are the store job: historian for trends, transaction groups for records.',
        },
        {
          heading: 'Licensed per server',
          body: 'Ignition is licensed per server, not per tag, per screen or per client. Once the server is licensed, adding more tags, more Perspective screens or more phones watching them costs nothing extra. That is why the hub can spread across the floor without the bill spreading with it.',
        },
        {
          heading: 'Where it sits in the journey',
          body: 'South side: Ignition collects from the machines, reading PLCs, CNCs and test rigs over OPC UA and Modbus. North side: it publishes those tags over MQTT to a broker, which feeds RabbitMQ and Kafka. It is the collector and hub in the middle. It is not the broker, not the analytics database, and it does not replace the PLC.',
        },
        {
          heading: 'Adding a new device is configuration',
          body: 'When a new rig arrives speaking Modbus, you add a device connection in Ignition and map its registers to tags. The rig then joins the same tag model, the same live screens and the same upstream feed. No new application, no extra licence, no typing.',
        },
      ],
      table: {
        caption: 'The pieces and the job each one does',
        headers: ['Piece', 'Job', 'What it does'],
        rows: [
          [
            'OPC UA / Modbus drivers',
            'Connect',
            'Pull tag values off PLCs, CNCs and test rigs into one shared tag model',
          ],
          [
            'Tag historian',
            'Store',
            'Records a tag\'s values over time for trending',
          ],
          [
            'Transaction groups',
            'Store',
            'Log values to a SQL database, one row per event such as a test',
          ],
          [
            'Perspective',
            'Visualise',
            'The web HMI and SCADA module. Screens open in any browser, including phones',
          ],
          [
            'MQTT Transmission',
            'Publish',
            'Publishes tags by exception to an MQTT broker for the upstream chain',
          ],
        ],
      },
    },
    mission:
      'Your mission: stand up Ignition as the one hub that collects the end-of-line test data, shows it live in a browser, and forwards it upstream, with nothing re-keyed.',
  },

  anchor: {
    today:
      'Each end-of-line test stand has its own local software and its own screen. The dyno result, the brake figure and the leak check sit on the rig, or get typed into a sheet. There is no single live view of the test area, and moving the data anywhere means an export and a copy.',
    shift:
      'Ignition connects to each rig and PLC over OPC UA and Modbus, pulls every result into one tag model, shows the whole test area live in a browser, and publishes the same data upstream by MQTT.',
    payoff:
      'One place to see and serve the test data. The result that used to be trapped on a rig is now live on a screen and already on its way to analytics, tied to the tractor.',
  },

  steps: [
    {
      kind: 'match',
      id: 'ignition-s1',
      points: 12,
      scoreMode: 'perItem',
      setup:
        'Every capability below is one of the pieces from the primer table: the drivers, the historian, transaction groups, Perspective and MQTT Transmission.',
      prompt:
        'Sort each capability into the job Ignition is doing: connect, store, visualise or publish.',
      recap: 'Placed each capability under Ignition\'s four jobs correctly.',
      buckets: [
        { key: 'connect', label: 'Connect', hint: 'pull data off devices' },
        { key: 'store', label: 'Store', hint: 'keep it in SQL' },
        { key: 'visualise', label: 'Visualise', hint: 'show it on a screen' },
        { key: 'publish', label: 'Publish', hint: 'send it upstream' },
      ],
      items: [
        {
          id: 'g1',
          text: 'OPC UA driver reading a CNC',
          bucket: 'connect',
          why: 'A driver pulling tags off a device is the connect job. It brings the data into Ignition.',
        },
        {
          id: 'g2',
          text: 'Modbus driver reading a leak tester',
          bucket: 'connect',
          why: 'Modbus is another driver pulling values off a rig. That is still the connect job.',
        },
        {
          id: 'g3',
          text: 'Transaction group logging each test to SQL',
          bucket: 'store',
          why: 'Writing results into a SQL database is the store job. The record outlives the moment.',
        },
        {
          id: 'g4',
          text: 'Perspective screen open in a phone browser',
          bucket: 'visualise',
          why: 'A Perspective screen in a browser is the visualise job. It shows the data to a person.',
        },
        {
          id: 'g5',
          text: 'MQTT Transmission publishing tags by exception',
          bucket: 'publish',
          why: 'Pushing tags out to a broker is the publish job. That is how data leaves for the upstream chain.',
        },
        {
          id: 'g6',
          text: 'Tag historian trending a value over a shift',
          bucket: 'store',
          why: 'The historian keeps the values so you can trend them later. That is the store job.',
        },
      ],
    },
    {
      kind: 'scenario-decision',
      id: 'ignition-s2',
      points: 20,
      setup:
        'A new end-of-line test rig arrives. It speaks Modbus TCP, a protocol Ignition already has a driver for. The team wants its results in the same live view as the other stands and sent upstream like the rest, not stranded on the rig.',
      prompt: 'You own the integration. How do you bring this rig in?',
      recap: 'Added a Modbus device connection and mapped its registers into the shared tag model.',
      choices: [
        {
          label: 'Add a Modbus device connection in Ignition and map its registers to tags',
          verdict: 'success',
          explanation:
            'Correct. The rig joins the same tag model, so it shows up in the same live view and publishes upstream with everything else. No new app, no extra licence, no re-keying.',
        },
        {
          label: 'Build a separate small app just for that one rig',
          verdict: 'partial',
          explanation:
            'It would work, but you now run a second system for one rig. Its data is not in the shared view and not in the upstream feed without more wiring. The hub already does this job.',
        },
        {
          label: 'Have an operator read the rig and type values into the existing screen',
          verdict: 'error',
          explanation:
            'That puts a person back in the loop for every test. It adds lag and typing errors, and the upstream feed still never sees the live value. This is the problem the platform exists to remove.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'ignition-s3',
      points: 10,
      prompt: 'Why does Ignition\'s per-server licensing matter when the plant scales?',
      recap: 'Saw that per-server licensing lets tags, screens and phones grow without added cost.',
      options: [
        {
          text: 'It is licensed per server, so adding tags, screens and client phones does not raise the licence cost',
          correct: true,
          explanation:
            'Correct. You pay for the server. From there you can grow tags, screens and connected phones without the licence going up, so the hub can scale across the floor.',
        },
        {
          text: 'It charges per tag, so growth is predictable',
          correct: false,
          explanation:
            'Per-tag pricing is exactly what Ignition avoids. Per-tag cost is what makes many platforms expensive to grow.',
        },
        {
          text: 'It charges per client, so each phone is metered',
          correct: false,
          explanation:
            'It is not per client. Adding client phones does not raise the licence cost, which is the whole point.',
        },
        {
          text: 'It is free with no licence at all',
          correct: false,
          explanation:
            'It is a licensed platform. The point is that the licence is per server, not per tag or per client.',
        },
      ],
    },
    {
      kind: 'mcq',
      id: 'ignition-s4',
      points: 10,
      prompt: 'What is Ignition\'s role in the data journey toward Kafka?',
      recap: 'Named Ignition as the collector that gathers over OPC UA and Modbus and publishes over MQTT.',
      options: [
        {
          text: 'It collects from the machines over OPC UA and Modbus and publishes upstream over MQTT',
          correct: true,
          explanation:
            'Correct. Ignition sits between the rigs and PLCs on the south side and the upstream messaging on the north side. It gathers over OPC UA and Modbus and pushes out by MQTT to the broker, which feeds RabbitMQ and Kafka.',
        },
        {
          text: 'It is the analytics database where the data finally lands',
          correct: false,
          explanation:
            'Ignition stores and forwards, but it is the integration hub, not the analytics store at the end of the chain.',
        },
        {
          text: 'It replaces the PLC on the machine',
          correct: false,
          explanation:
            'The PLC keeps running the machine. Ignition reads from it. It does not replace it.',
        },
        {
          text: 'It is the message broker itself',
          correct: false,
          explanation:
            'Ignition publishes to a broker by MQTT. The broker is a separate piece. Ignition is the hub that feeds it.',
        },
      ],
    },
  ],

  results: {
    proof:
      'Ignition runs on a server and connects southbound by OPC UA and Modbus and northbound by MQTT, with licensing per server rather than per tag or client. It is widely used as the integration and SCADA layer between plant devices and enterprise systems.',
    source: 'Inductive Automation, Ignition platform documentation',
    keyPoints: [
      'Ignition is the hub, not a fixed box. You connect, store, visualise and publish from one platform.',
      'It connects down with drivers like OPC UA and Modbus and sends up with the MQTT modules.',
      'Per-server licensing is what lets it scale, since tags, screens and phones grow without per-tag cost.',
    ],
    leaderLens:
      'Ask whether your plant has one place that both shows the floor live and serves that same data upstream, or whether every system holds its own separate copy.',
  },
}
