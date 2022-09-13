import { EventEmitter } from '@angular/core';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';
import { timeStamp } from './date-stamp';

/**
 * Builds OutputBusEvent object and emits it via the outBusRef emitter
 * @param outBusRef - reference to the Component 'outBus' Output
 * @param name - recommended format: '[Component Name]: [Output Type]'
 * @param payload - typed data packet or body of event
 * @param group - name for group filtering of events
 */
export function outBusEmit<EventType extends OutputBusEvent>(
  outBusRef: EventEmitter<EventType>,
  name: EventType['name'],
  payload?: EventType['payload'],
  group?: string
): void {
  outBusRef.emit({ name, group, created: timeStamp(), payload } as EventType);
}
