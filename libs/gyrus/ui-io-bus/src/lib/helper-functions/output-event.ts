import { OutputEvent } from '../interfaces/public.interface';
import { dateTimeStamp } from './date-stamp';

export function outputEvent<T>(
  name: string,
  payload: T,
  group?: string
): OutputEvent<T> {
  return { name, group, created: dateTimeStamp(), payload };
}
