// Citation list for the researched facts used through Block 2.
// Surfaced in Facilitator Mode and on the references view. Each module's
// results.source must match one label here exactly.

export interface Source {
  label: string
  detail: string
}

export const SOURCES: Source[] = [
  {
    label: 'Inductive Automation, Ignition platform documentation',
    detail:
      'Ignition is a server-based platform that connects over OPC UA, Modbus and other drivers, stores and visualises data, and publishes by MQTT. Licensed per server, not per tag or client.',
  },
  {
    label: 'OPC Foundation, OPC UA specification (IEC 62541)',
    detail:
      'OPC UA is an open, platform-independent standard with a full information model and built-in security. The modern successor to the Windows-only OPC Classic.',
  },
  {
    label: 'Modbus Organization, Modbus application protocol specification',
    detail:
      'Modbus, published by Modicon in 1979, is a simple open request-response protocol with a numbered register model. No built-in security or information model.',
  },
  {
    label: 'Bosch / ISO 11898, Controller Area Network (CAN)',
    detail:
      'CAN, developed by Bosch in 1986 and standardised as ISO 11898, is a robust message-based broadcast bus with priority arbitration and strong error detection.',
  },
  {
    label: 'ISO 14229, Unified Diagnostic Services (UDS)',
    detail:
      'UDS defines diagnostic services over CAN: read and clear DTCs, read parameters by identifier, routine control, and security access.',
  },
  {
    label: 'LoRa Alliance, Bluetooth SIG and Zigbee Alliance',
    detail:
      'The standards bodies behind LoRaWAN, Bluetooth and Zigbee. Wireless choices trade range against power against bandwidth.',
  },
  {
    label: 'OASIS MQTT and Eclipse Sparkplug specifications',
    detail:
      'MQTT (OASIS) is a lightweight publish/subscribe protocol. Sparkplug B (Eclipse) adds a standard namespace and a typed, stateful payload for OT data.',
  },
  {
    label: 'AMQP 0-9-1 and the RabbitMQ documentation',
    detail:
      'RabbitMQ is a mature broker implementing AMQP 0-9-1. Exchanges route to queues, queues hold messages until acknowledged, and an MQTT plugin accepts MQTT publishers.',
  },
  {
    label: 'Apache Kafka documentation (Apache Software Foundation)',
    detail:
      'Kafka is a distributed event streaming platform. Events are retained in partitioned topics and replayable, read independently by many consumer groups.',
  },
  {
    label: 'ANSI/ISA-95 (IEC 62264) and the Purdue model',
    detail: 'The standard behind the automation pyramid, levels 0 to 4.',
  },
  {
    label: 'John Deere private 5G and smart factory coverage',
    detail:
      'Reporting on Deere\'s private 5G network, autonomous mobile robots and digital twins.',
  },
  {
    label: 'John Deere India, Pune (Sanaswadi) plant',
    detail:
      'Tractor production since 1998, the one-millionth tractor milestone, exports worldwide.',
  },
  {
    label: 'Warranty Week, heavy-equipment warranty review',
    detail: 'John Deere warranty claims of around $951 million in 2022.',
  },
]
