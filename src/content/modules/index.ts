import type { PillarModule } from '../types'
import { ignition } from './ignition'
import { edge } from './edge'
import { opcua } from './opcua'
import { modbus } from './modbus'
import { canbus } from './canbus'
import { uds } from './uds'
import { wireless } from './wireless'
import { mqtt } from './mqtt'
import { rabbitmq } from './rabbitmq'
import { kafka } from './kafka'

/**
 * The ten Block 2 integration and communication topics, in launcher order.
 * They follow the data journey: the platform and the edge, then the
 * southbound device protocols, then wireless, then the northbound messaging
 * and streaming layer that carries data up to analytics.
 */
export const PILLAR_MODULES: PillarModule[] = [
  ignition,
  edge,
  opcua,
  modbus,
  canbus,
  uds,
  wireless,
  mqtt,
  rabbitmq,
  kafka,
]

export function moduleById(id: string): PillarModule | undefined {
  return PILLAR_MODULES.find((m) => m.id === id)
}
