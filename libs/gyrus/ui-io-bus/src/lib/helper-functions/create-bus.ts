import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputBusEvent } from '../interfaces/input-bus-event.interface';
import { createInputBusEvent } from './create-input-event';

export function createBus<T extends InputBusEvent<unknown>>(
  ...namedStreams: {
    eventName: string;
    eventGroup?: string;
    payload$: Observable<unknown>;
  }[]
) {
  const eventStreams = namedStreams.map((namedStream) =>
    namedStream.payload$.pipe(
      map((payload) =>
        createInputBusEvent<T>(
          namedStream.eventName,
          payload,
          namedStream.eventGroup
        )
      )
    )
  );
  return merge(...eventStreams);
}
