/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { OutputEvent } from '../interfaces/public.interface';
import { filterOutputEvents } from '../operators/filter-output-events.operator';

export function outputEventSelector(
  bus$: Observable<OutputEvent<any>>,
  ...eventNames: string[]
) {
  return bus$.pipe(filterOutputEvents(...eventNames));
}
