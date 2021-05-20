import { Observable } from 'rxjs';
import { OutputEvent } from '../interfaces/public.interface';
import { filterOutputEvents } from '../operators/filter-output-events.operator';

export function selectOutputEvents(
  bus$: Observable<OutputEvent<unknown>>,
  ...eventNames: string[]
) {
  return bus$.pipe(filterOutputEvents(...eventNames));
}
