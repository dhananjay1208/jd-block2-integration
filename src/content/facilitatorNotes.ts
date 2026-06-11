// Facilitator-only notes, surfaced in the Facilitator Mode panel and hidden
// from participants. Keyed by module id, plus 'home', 'journey' and 'progress'.

export interface FacilitatorNote {
  timing: string
  talkingPoints: string[]
  discussion?: string
  answerKey?: string[]
}

export const FACILITATOR_NOTES: Record<string, FacilitatorNote> = {
  home: {
    timing: 'Open in 3 min. Get every phone on the app through the QR first.',
    talkingPoints: [
      'Frame the whole set as one data journey, not ten gadgets. Machine to edge to Ignition, then MQTT to RabbitMQ to Kafka to analytics.',
      'Point them to the Data Journey map first. Walk the flow once on the projector, then let them play any topic on their phones.',
      'Each card ends with a leader lens, the question to ask. That sentence matters more than the protocol detail.',
    ],
    discussion:
      'Ask the room where their area sits on the journey today. Do they collect at the machine, or only at the centre?',
  },

  journey: {
    timing: '8 to 10 min to walk the whole map on the projector.',
    talkingPoints: [
      'Trace it left to right. Machines and ECUs on the south side, analytics on the north, Ignition as the hub in the middle.',
      'Name the protocol on each hop as you cross it: OPC UA and Modbus down low, CAN and UDS at the test rig, MQTT up out of Ignition.',
      'Stress the shape: data is collected once, near the machine, and flows up one path, not copied between many systems.',
    ],
    discussion:
      'Ask which single hop on this map is the weakest in their plant today, and what breaks because of it.',
  },

  ignition: {
    timing: '7 min on the card, 3 min discussion.',
    talkingPoints: [
      'Land it as the hub. Ignition connects down with drivers and sends up with MQTT. It is not a fixed box.',
      'The Modbus rig decision is the heart of it. The right move is to add the device to the one model, not build a side app.',
      'Per-server licensing is why it scales. Adding tags, screens and phones does not add licence cost.',
    ],
    discussion:
      'Does your plant have one place that both shows the floor live and serves that same data upstream?',
    answerKey: [
      'Add the Modbus rig as a device in Ignition and map its registers to tags.',
      'Connect, store, visualise, publish are Ignition\'s four jobs.',
      'It collects over OPC UA and Modbus and publishes over MQTT.',
    ],
  },

  edge: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'Store-and-forward is the whole point. A dropped link buffers locally and forwards with no gap.',
      'Report-by-exception is the bandwidth story. A value that rarely changes sends almost nothing.',
      'Be honest about the trade. The edge is compute you now own and must secure on the floor.',
    ],
    discussion:
      'What happens to your line data the next time the network drops for a minute?',
    answerKey: [
      'Buffer locally and forward in order when the link returns.',
      'Buffer, filter and react locally at the edge; analytics and long history at the centre.',
      'Report-by-exception can remove well over 95 percent of unchanged messages.',
    ],
  },

  opcua: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'The information model is the difference. A value arrives named, typed and with units, not as a bare number.',
      'Vendor-neutral and cross-platform. One way to connect, whatever the brand of controller.',
      'Security is built in. Contrast with Modbus, which has none.',
    ],
    discussion:
      'Is adding a new machine a standard connection in your plant, or a custom project every time?',
    answerKey: [
      'If the new CNC speaks OPC UA, connect it the same standard way as the others.',
      'OPC UA adds context: name, type, units, structure.',
      'OPC UA is platform-independent and secure; OPC Classic was Windows-only.',
    ],
  },

  modbus: {
    timing: '6 min on the card, 2 to 3 min discussion.',
    talkingPoints: [
      'Old does not mean useless. Modbus is everywhere and reads a working meter for almost nothing.',
      'Its data is numbered registers, not meaning. You must document what each one holds.',
      'No built-in security, so it belongs on a protected network.',
    ],
    discussion:
      'Where in your area is good equipment going unread just because it speaks an old protocol?',
    answerKey: [
      'Keep the working meter and read it over Modbus into Ignition.',
      'Register 40002 is the live pressure on the example map.',
      'Modbus fits a simple device that needs a basic value cheaply.',
    ],
  },

  canbus: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'CAN is broadcast, not addressed. Every node hears every message; priority arbitration orders the bus.',
      'It is built for the electrical noise of a vehicle, with strong error detection.',
      'It is how the test rig reads the engine and transmission ECUs directly.',
    ],
    discussion:
      'Is your test data read from the machine\'s own controllers, or transcribed by hand?',
    answerKey: [
      'Share, broadcast, all hear, arbitrate by priority, rig keeps the IDs it wants.',
      'True of CAN: every node hears, ID and priority, strong error detection.',
      'Read the ECUs over the CAN bus they already use.',
    ],
  },

  uds: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'UDS is the diagnostic language on top of CAN. Read and clear DTCs, read parameters, run self-tests.',
      'It turns a memory-dependent check into a standard sequence that runs every time and records itself.',
      'The report locks to the VIN, so a stored fault cannot ship unseen.',
    ],
    discussion:
      'Does your end-of-line diagnostic depend on someone remembering to look?',
    answerKey: [
      'Connect, read DTCs, read parameters, run self-test, record to VIN.',
      'Read fault codes, read a parameter, run a routine, unlock protected access.',
      'UDS runs on top of CAN and other transports.',
    ],
  },

  wireless: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'The trade-off is the lesson: range, power and bandwidth pull against each other. Pick to fit the job.',
      'Match the radio to the device. BLE for tools, Zigbee mesh for dense sensors, LoRa for the far yard, 5G for AMRs.',
      'Use the torque-tool story. Reporting at the joint beats exporting at shift end.',
    ],
    discussion:
      'Was a recent wireless choice on your floor matched to the job, or just defaulted to Wi-Fi?',
    answerKey: [
      'Tool to BLE, dense sensors to Zigbee, tablet to Wi-Fi, yard tank to LoRa, AGV to private 5G.',
      'No single radio is long-range, high-bandwidth and low-power at once.',
      'LoRa for a sparse, infrequent, battery sensor across the yard.',
    ],
  },

  mqtt: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'Publish once, many subscribe. The broker decouples who produces data from who uses it.',
      'Report-by-exception keeps it light. Sparkplug B makes the payload typed and stateful.',
      'This is the hop out of Ignition, into RabbitMQ, in the demo.',
    ],
    discussion:
      'Is every new consumer of your data a fresh point-to-point build, or one more subscriber?',
    answerKey: [
      'Publish once by MQTT; each system subscribes to the topic.',
      'Publisher, broker, subscriber: Ignition publishes, the broker routes, feeds subscribe.',
      'Sparkplug B adds a standard namespace and typed, stateful payload.',
    ],
  },

  rabbitmq: {
    timing: '6 min on the card, 3 min discussion.',
    talkingPoints: [
      'RabbitMQ is the reliable buffer. Queues hold each message until a consumer acknowledges it.',
      'Producer to exchange to queue to consumer. Exchanges route flexibly.',
      'Contrast with Kafka coming next: RabbitMQ consumes and acknowledges, Kafka retains and replays.',
    ],
    discussion:
      'What happens to a burst of your data when the receiver is busy or restarting?',
    answerKey: [
      'RabbitMQ holds the burst in the queue and delivers it when the consumer returns.',
      'Producer, exchange, queue, consumer are the four roles.',
      'Acknowledgement confirms a message was processed, so it is not lost on a failure.',
    ],
  },

  kafka: {
    timing: '7 min on the card, 3 min discussion.',
    talkingPoints: [
      'Kafka is a retained, replayable log, not a transient queue. That is the key contrast with RabbitMQ.',
      'Topics and partitions give throughput and scale. Many consumers read the same stream independently.',
      'Tie it home: replayable build history is what lets you trace a field warranty pattern to its cause.',
    ],
    discussion:
      'Can your event history be replayed to explain a problem found months later, or is it gone?',
    answerKey: [
      'Produce to topic, partition, retain, track offset per group, replay from the start.',
      'Kafka retains events for replay; a queue deletes on consume.',
      'With 7-day retention, a returning consumer replays up to 7 days.',
    ],
  },

  progress: {
    timing: 'Use at a break or the close.',
    talkingPoints: [
      'Show the room how far they have come along the data journey.',
      'Return to the opening question. Which hop is weakest in their plant, now that they have played them all?',
      'Point them to the leader lens of each topic as the thing to carry back to their area.',
    ],
  },
}
