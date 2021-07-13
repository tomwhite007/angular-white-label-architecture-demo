/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { OutputEvent } from '../interfaces/public.interface';

/**
 * Custom RxJs pipe operator:
 * Filter and output bus event stream to a given list of event names
 * @param eventNames
 * @returns
 */
export const filterOutputEvents = (
  ...eventNames: string[]
): MonoTypeOperatorFunction<OutputEvent<any>> => {
  return (source$: Observable<OutputEvent<any>>) =>
    source$.pipe(
      filter((event) => eventNames.includes(event.name), distinctUntilChanged())
    );
};
