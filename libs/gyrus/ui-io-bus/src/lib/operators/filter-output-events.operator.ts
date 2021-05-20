import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OutputEvent } from '../interfaces/public.interface';

export const filterOutputEvents = (
  ...eventNames: string[]
): MonoTypeOperatorFunction<OutputEvent<unknown>> => {
  return (source$: Observable<OutputEvent<unknown>>) =>
    source$.pipe(
      filter((event) => eventNames.includes(event.name), distinctUntilChanged())
    );
};
