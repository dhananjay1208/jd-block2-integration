// Block 2 topic index. The full teaching content lives in content/modules/*.
// This compact list is the single source the dev-only validator checks module
// ids against, and a quick one-line reference for each topic.
import type { ScenarioId } from './scenarios'

export interface Pillar {
  id: string
  name: string
  short: string
  definition: string
  howItWorks: string
  scenario: ScenarioId
  situation: string
  shift: string
  payoff: string
  proof: string
  leaderLens: string
}

export const PILLARS: Pillar[] = [
  {
    id: 'ignition',
    name: 'Ignition as a Platform',
    short: 'Ignition',
    definition:
      'A server-based industrial application platform that connects to plant devices, stores their data, shows it live in a browser, and publishes it upstream. It is the integration hub of the plant.',
    howItWorks:
      'Drivers pull tags from PLCs and devices over OPC UA and Modbus into one tag model. Transaction groups log to SQL, Perspective shows the data live, and the MQTT Transmission module publishes it upward by exception.',
    scenario: 'eol',
    situation:
      'Each end-of-line test stand has its own local software. Results sit on the rig or get typed into a sheet, with no single live view.',
    shift:
      'Ignition connects to every rig and PLC, pulls each result into one model, shows the test area live, and publishes the same data upstream.',
    payoff:
      'One place to see and serve the test data. The result is live on a screen and already on its way to analytics, tied to the tractor.',
    proof:
      'Ignition connects southbound by OPC UA and Modbus and northbound by MQTT, licensed per server rather than per tag or client.',
    leaderLens:
      'Ask whether your plant has one place that both shows the floor live and serves that same data upstream, or whether every system holds its own copy.',
  },
  {
    id: 'edge',
    name: 'Edge Gateway & Edge Computing',
    short: 'Edge',
    definition:
      'A small compute node near the machines that collects, buffers, filters and forwards data, instead of sending every raw reading straight to a central server.',
    howItWorks:
      'The edge collects readings locally, holds them through a network drop with store-and-forward, filters them with report-by-exception, and forwards only what matters.',
    scenario: 'machining',
    situation:
      'Every machining reading is sent straight to a central server. A network blip loses that window of data, and the network carries millions of unchanged readings.',
    shift:
      'An edge gateway buffers readings through a link drop and forwards by exception so only real changes go up.',
    payoff:
      'No data lost during a network blip, far less traffic, and the line can act on a local reading without waiting for the centre.',
    proof:
      'Store-and-forward buffers data through a link drop with no loss, and report-by-exception cuts upstream volume sharply.',
    leaderLens:
      'Ask what happens to your line data the next time the network drops for a minute. If the answer is "it is gone", the edge is missing.',
  },
  {
    id: 'opcua',
    name: 'OPC UA',
    short: 'OPC UA',
    definition:
      'The modern, open, vendor-neutral standard for moving data between industrial systems. It carries an information model, so data comes named, typed and structured.',
    howItWorks:
      'A device exposes its data over OPC UA. Any client connects the same standard way, with authentication and encryption, and reads values that arrive with their names, types and units.',
    scenario: 'machining',
    situation:
      'CNCs from three vendors each speak their own protocol. Connecting them means three drivers, three mappings and a fight at every change.',
    shift:
      'Each controller exposes its data over OPC UA. Ignition connects to all of them the same way, and each value arrives self-describing.',
    payoff:
      'One way to connect, whatever the brand. A new tag needs no hand-written mapping to make sense.',
    proof:
      'OPC UA (IEC 62541) is an open, platform-independent standard with a full information model and built-in security.',
    leaderLens:
      'Ask whether adding a new machine is a standard connection or a custom integration project every time. OPC UA is the difference.',
  },
  {
    id: 'modbus',
    name: 'Modbus',
    short: 'Modbus',
    definition:
      'One of the oldest and most widely used industrial protocols. Simple, open and request-response, with data held in numbered registers.',
    howItWorks:
      'A client asks, a server answers. Values sit in numbered coils and registers. You map each register to a named tag, because the protocol carries no meaning.',
    scenario: 'hydraulics',
    situation:
      'The line\'s older leak testers and meters speak Modbus, but their data is locked in the device because nobody has mapped the registers.',
    shift:
      'Ignition reads each device over Modbus TCP, and the team documents which register holds the leak rate, the pressure and the cycle count.',
    payoff:
      'Older equipment joins the live view without being replaced. Cryptic register numbers become named, meaningful tags.',
    proof:
      'Modbus, from Modicon in 1979 and maintained by the Modbus Organization, is supported by a vast range of devices but carries no security or information model.',
    leaderLens:
      'Ask whether "old" equipment really needs replacing, or whether reading it over Modbus gets you the data for almost nothing.',
  },
  {
    id: 'canbus',
    name: 'CAN Bus',
    short: 'CAN',
    definition:
      'A rugged, message-based broadcast bus built for vehicles and their electronic control units. Every node hears every message.',
    howItWorks:
      'A node puts a message with an identifier and a priority onto a two-wire bus. All nodes hear it, priority arbitration orders the traffic, and receivers keep the IDs they want.',
    scenario: 'eol',
    situation:
      'At end-of-line test, the engine and transmission ECUs hold the real running data, read by a hand-held tool and transcribed onto a sheet.',
    shift:
      'The test rig sits on the tractor\'s CAN bus and reads the ECU messages directly, on the same two wires every controller uses.',
    payoff:
      'The ECU data is captured automatically at test, not transcribed by hand.',
    proof:
      'CAN, developed by Bosch in 1986 and standardised as ISO 11898, is a robust broadcast bus with priority arbitration and strong error detection.',
    leaderLens:
      'Ask whether the running data your test captures is read straight from the machine\'s own controllers, or transcribed by hand.',
  },
  {
    id: 'uds',
    name: 'UDS Diagnostics',
    short: 'UDS',
    definition:
      'A standard diagnostic language for talking to an ECU, usually over CAN. It reads fault codes, reads parameters, and runs self-tests.',
    howItWorks:
      'The tester asks one ECU by identifier and gets the value back. It reads and clears DTCs, reads parameters, runs routines, and unlocks protected functions.',
    scenario: 'eol',
    situation:
      'Whether an ECU holds a stored fault depends on a technician remembering to plug in a tool and look. A stored code can slip through.',
    shift:
      'The end-of-line tester runs a UDS sequence on every ECU: read all fault codes, read key parameters, run the self-test.',
    payoff:
      'No tractor ships with an unread stored fault. The full diagnostic report locks to the VIN.',
    proof:
      'UDS (ISO 14229) defines the diagnostic services a tester uses to interrogate each ECU over CAN before a vehicle ships.',
    leaderLens:
      'Ask whether your end-of-line diagnostic depends on a person remembering to look, or on a standard sequence that runs every time.',
  },
  {
    id: 'wireless',
    name: 'Wireless on the Floor',
    short: 'Wireless',
    definition:
      'The radio options for connecting things that move or sit where a cable cannot go. Each trades range against power against bandwidth.',
    howItWorks:
      'Short-range radios like Bluetooth and Zigbee suit tools and dense sensors, Wi-Fi suits throughput, LoRa reaches kilometres at very low power, and private 5G gives wide low-latency coverage.',
    scenario: 'torque',
    situation:
      'Cordless nutrunners hold their torque results in the tool. At shift end someone docks each tool and exports the data, long after the tractor moved on.',
    shift:
      'The cordless tools report each fastening result over wireless to the line gateway the moment it happens.',
    payoff:
      'A torque fault is seen at the joint, on the tractor in front of you, not at shift end.',
    proof:
      'Range, power and bandwidth trade against each other. John Deere runs a private 5G network in-plant for its autonomous mobile robots.',
    leaderLens:
      'Ask whether a wireless choice was matched to range, power and bandwidth, or just defaulted to Wi-Fi because it was there.',
  },
  {
    id: 'mqtt',
    name: 'MQTT & Sparkplug B',
    short: 'MQTT',
    definition:
      'A lightweight publish/subscribe messaging protocol. Publishers and subscribers never talk directly; a broker routes by topic.',
    howItWorks:
      'Ignition publishes tags by exception to a broker. Anyone who needs the data subscribes to a topic. Sparkplug B standardises the topic names and the typed, stateful payload.',
    scenario: 'paint',
    situation:
      'The paint shop has thousands of readings. Each system that wants them polls Ignition directly, so every new consumer is another point-to-point build.',
    shift:
      'Ignition publishes the shop\'s tags by exception over MQTT. Anyone who needs the data subscribes to a topic.',
    payoff:
      'One light, change-only stream feeds many consumers. Adding a feed is a subscribe, not a new integration.',
    proof:
      'MQTT (OASIS) decouples producers from consumers through a broker, and Sparkplug B (Eclipse) is what Ignition\'s MQTT Transmission publishes.',
    leaderLens:
      'Ask whether every new consumer of your plant data is a fresh point-to-point build, or one more subscriber to a stream that already exists.',
  },
  {
    id: 'rabbitmq',
    name: 'RabbitMQ',
    short: 'RabbitMQ',
    definition:
      'A mature message broker. A producer publishes to an exchange, the exchange routes to queues, and consumers read from queues that hold messages until acknowledged.',
    howItWorks:
      'Queues buffer bursts and hold each message until a consumer acknowledges it. Exchanges route by rules, and the MQTT plugin lets it accept Ignition\'s MQTT stream.',
    scenario: 'hydraulics',
    situation:
      'Leak-test data arrives in bursts. When the downstream system is busy, some of the burst is lost and nobody is sure which records went missing.',
    shift:
      'Ignition publishes into RabbitMQ. The broker queues the burst, holds each message until acknowledged, and routes it on.',
    payoff:
      'A busy or restarted consumer no longer drops data. The burst waits safely and is delivered in order.',
    proof:
      'RabbitMQ implements AMQP 0-9-1, buffering bursts and delivering reliably, and its MQTT plugin accepts Ignition\'s stream directly.',
    leaderLens:
      'Ask what happens to a burst of plant data when the system meant to receive it is busy. A broker is the difference between buffered and lost.',
  },
  {
    id: 'kafka',
    name: 'Apache Kafka',
    short: 'Kafka',
    definition:
      'A distributed event streaming platform built around a retained, append-only log. Events are kept and replayable, not deleted when read.',
    howItWorks:
      'Producers write events to topics split into partitions for scale. Events are retained for a set time, and each consumer group tracks its own offset, so any consumer can replay the history.',
    scenario: 'torque',
    situation:
      'Torque results stream through the plant but are consumed once and gone. When a warranty pattern appears months later, the build data is not kept to replay.',
    shift:
      'The torque event stream lands in Kafka and is retained. Dashboards, a quality model and the warranty team each read it independently.',
    payoff:
      'A field failure pattern can be replayed against the exact torque history that produced it.',
    proof:
      'Kafka retains events in partitioned topics for replay at high throughput. John Deere paid around $951 million in warranty claims in 2022.',
    leaderLens:
      'Ask whether your plant\'s event history can be replayed to explain a problem found months later, or whether the data was consumed once and is gone.',
  },
]
