/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

/**
 * Custom RxJs pipe operator:
 * Filter and output bus event stream to a given list of event names
 * @param eventNames
 * @returns
 */
export const filterOutputEvents = (
  ...eventNames: string[]
): MonoTypeOperatorFunction<OutputBusEvent<any>> => {
  return (source$: Observable<OutputBusEvent<any>>) =>
    source$.pipe(
      filter((event) => eventNames.includes(event.name), distinctUntilChanged())
    );
};
