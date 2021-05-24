import { InputBusEvent } from '../interfaces/input-bus-event.interface';
import { dateTimeStamp } from './date-stamp';

export function createInputBusEvent<T extends InputBusEvent<unknown>>(
  name: string,
  payload: T['payload'],
  group?: string
): T {
  return <T>{ name, group, created: dateTimeStamp(), payload };
}
