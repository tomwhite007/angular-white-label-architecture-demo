/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

export const filterOutputEvents = (
  ...eventNames: string[]
): MonoTypeOperatorFunction<OutputBusEvent<any>> => {
  return (source$: Observable<OutputBusEvent<any>>) =>
    source$.pipe(
      filter((event) => eventNames.includes(event.name), distinctUntilChanged())
    );
};
