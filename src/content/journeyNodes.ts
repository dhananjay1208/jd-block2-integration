// The end-to-end data journey: the nodes and the protocol hops between them.
// Coordinates are in the SVG viewBox 0 0 1240 600. Each node and edge can link
// to the topic cards that explain it in depth.

export type NodeKind =
  | 'source'
  | 'edge'
  | 'platform'
  | 'broker'
  | 'stream'
  | 'analytics'

export interface JourneyNode {
  id: string
  label: string
  sub: string
  kind: NodeKind
  /** Centre of the node box in viewBox units. */
  cx: number
  cy: number
  role: string
  blurb: string
  /** The topic card this node maps to, if any. */
  moduleId?: string
  /** Extra topic cards a source or endpoint relates to. */
  related?: string[]
}

export interface JourneyEdge {
  id: string
  from: string
  to: string
  label: string
  blurb: string
  /** The protocol topic cards this hop maps to. */
  modules: string[]
}

/** Box size, shared by every node. */
export const NODE_W = 156
export const NODE_H = 78
export const VIEW_W = 1240
export const VIEW_H = 600

export const JOURNEY_NODES: JourneyNode[] = [
  {
    id: 'machines',
    label: 'Machines & PLCs',
    sub: 'Machining, paint, hydraulics',
    kind: 'source',
    cx: 100,
    cy: 110,
    role: 'Where most plant data starts.',
    blurb:
      'The CNCs, drives, meters and PLCs on the lines. Modern controllers expose their data over OPC UA. Older meters and testers speak Modbus.',
    related: ['opcua', 'modbus'],
  },
  {
    id: 'ecus',
    label: 'ECU Test Stands',
    sub: 'End-of-line test',
    kind: 'source',
    cx: 100,
    cy: 300,
    role: 'Where the tractor\'s own running data is read.',
    blurb:
      'The rigs that test each tractor\'s electronic control units. They read the ECUs over the CAN bus and interrogate them with UDS diagnostics.',
    related: ['canbus', 'uds'],
  },
  {
    id: 'sensors',
    label: 'Wireless Sensors & Tools',
    sub: 'Cordless tools, yard sensors',
    kind: 'source',
    cx: 100,
    cy: 490,
    role: 'The data that cannot be wired.',
    blurb:
      'Cordless torque tools, wearables and battery sensors that report over Bluetooth, Zigbee, LoRa or Wi-Fi, where running a cable is impractical.',
    related: ['wireless'],
  },
  {
    id: 'edge',
    label: 'Edge Gateway',
    sub: 'Collect, buffer, filter',
    kind: 'edge',
    cx: 340,
    cy: 300,
    role: 'First-mile collection and resilience.',
    blurb:
      'A compute node near the machines. It collects readings, buffers them through a link drop with store-and-forward, and forwards only what matters by exception.',
    moduleId: 'edge',
  },
  {
    id: 'ignition',
    label: 'Ignition',
    sub: 'The integration hub',
    kind: 'platform',
    cx: 575,
    cy: 300,
    role: 'The platform in the middle.',
    blurb:
      'It pulls every source into one tag model over OPC UA and Modbus, shows the floor live in a browser, and publishes the data upstream by MQTT.',
    moduleId: 'ignition',
  },
  {
    id: 'rabbitmq',
    label: 'RabbitMQ',
    sub: 'Message broker',
    kind: 'broker',
    cx: 805,
    cy: 300,
    role: 'Reliable buffer and router.',
    blurb:
      'It accepts Ignition\'s MQTT stream through its MQTT plugin, buffers bursts in queues, holds each message until it is acknowledged, and hands data on reliably.',
    moduleId: 'rabbitmq',
  },
  {
    id: 'kafka',
    label: 'Apache Kafka',
    sub: 'Event streaming',
    kind: 'stream',
    cx: 1010,
    cy: 300,
    role: 'The retained, replayable log.',
    blurb:
      'The streaming backbone. It retains the stream in partitioned topics so many consumers can read it independently and replay the history from any point.',
    moduleId: 'kafka',
  },
  {
    id: 'analytics',
    label: 'Analytics & ML',
    sub: 'Dashboards, models, warranty',
    kind: 'analytics',
    cx: 1150,
    cy: 300,
    role: 'Where the data earns its keep.',
    blurb:
      'Dashboards, quality models and the warranty team read the retained stream, replaying history to find and explain patterns months before they would surface as claims.',
    related: ['kafka'],
  },
]

export const JOURNEY_EDGES: JourneyEdge[] = [
  {
    id: 'e1',
    from: 'machines',
    to: 'edge',
    label: 'OPC UA / Modbus',
    blurb:
      'Modern controllers connect over OPC UA, which carries named, typed, secure data. Older devices connect over Modbus, simple numbered registers.',
    modules: ['opcua', 'modbus'],
  },
  {
    id: 'e2',
    from: 'ecus',
    to: 'edge',
    label: 'CAN / UDS',
    blurb:
      'The test rig reads the ECUs over the CAN broadcast bus, and uses UDS diagnostics to pull fault codes and parameters before the tractor ships.',
    modules: ['canbus', 'uds'],
  },
  {
    id: 'e3',
    from: 'sensors',
    to: 'edge',
    label: 'BLE / Zigbee / LoRa',
    blurb:
      'Wireless radios feed in the tools and sensors that cannot be wired. The radio is matched to the job by range, power and bandwidth.',
    modules: ['wireless'],
  },
  {
    id: 'e4',
    from: 'edge',
    to: 'ignition',
    label: 'Tags into the platform',
    blurb:
      'The edge forwards the collected, filtered readings into Ignition, where they join one tag model with the rest of the plant.',
    modules: ['edge', 'ignition'],
  },
  {
    id: 'e5',
    from: 'ignition',
    to: 'rabbitmq',
    label: 'MQTT · Sparkplug B',
    blurb:
      'Ignition\'s MQTT Transmission module publishes tags by exception as Sparkplug B to RabbitMQ\'s MQTT listener. This is the hop you set up in the live demo.',
    modules: ['mqtt'],
  },
  {
    id: 'e6',
    from: 'rabbitmq',
    to: 'kafka',
    label: 'Bridge to Kafka',
    blurb:
      'A small bridge reads the messages from RabbitMQ and produces them onto a Kafka topic, moving from a reliable queue to a retained, replayable log.',
    modules: ['rabbitmq', 'kafka'],
  },
  {
    id: 'e7',
    from: 'kafka',
    to: 'analytics',
    label: 'Stream to analytics',
    blurb:
      'Analytics, dashboards and models consume the retained Kafka stream, each reading independently and replaying history when they need it.',
    modules: ['kafka'],
  },
]

export function journeyNodeById(id: string): JourneyNode | undefined {
  return JOURNEY_NODES.find((n) => n.id === id)
}
