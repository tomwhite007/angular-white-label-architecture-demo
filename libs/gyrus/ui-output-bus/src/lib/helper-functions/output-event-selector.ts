/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';
import { filterOutputEvents } from '../operators/filter-output-events.operator';

/**
 * Filter and output bus event stream to a given list of event names
 * @param bus$
 * @param eventNames
 * @returns
 */
export function outputEventSelector(
  bus$: Observable<OutputBusEvent<any>>,
  ...eventNames: string[]
) {
  return bus$.pipe(filterOutputEvents(...eventNames));
}
