/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OutputEvent } from '../interfaces/output-event.interface';

export const filterOutputEvents = (
  ...eventNames: string[]
): MonoTypeOperatorFunction<OutputEvent<any>> => {
  return (source$: Observable<OutputEvent<any>>) =>
    source$.pipe(
      filter((event) => eventNames.includes(event.name), distinctUntilChanged())
    );
};
