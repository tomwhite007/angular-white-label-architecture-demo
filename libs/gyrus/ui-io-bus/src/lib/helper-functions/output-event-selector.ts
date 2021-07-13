/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { OutputEvent } from '../interfaces/public.interface';
import { filterOutputEvents } from '../operators/filter-output-events.operator';

/**
 * Filter and output bus event stream to a given list of event names
 * @param bus$
 * @param eventNames
 * @returns
 */
export function outputEventSelector(
  bus$: Observable<OutputEvent<any>>,
  ...eventNames: string[]
) {
  return bus$.pipe(filterOutputEvents(...eventNames));
}
