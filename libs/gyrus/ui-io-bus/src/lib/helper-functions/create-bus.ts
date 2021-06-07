import { InputBusEvent, createInputBusEvent } from '@gyrus/ui-io-bus';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export function createBus<T extends InputBusEvent<unknown>>(
  ...namedStreams: { name: string; payload$: Observable<unknown> }[]
) {
  const eventStreams = namedStreams.map((namedStream) =>
    namedStream.payload$.pipe(
      map((payload) => createInputBusEvent<T>(namedStream.name, payload))
    )
  );
  return merge(...eventStreams);
}
