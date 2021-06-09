import { Observable, Subscription } from 'rxjs';
import { InputBusEvent } from '../interfaces/input-bus-event.interface';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';
import { busEventHandler, HandlerLookup } from './bus-event-handler';

/**
 * UI IO Bus Event handler helper with Subscription to event stream.
 * Calls custom handler callback from lookup based on bus event name.
 * @param eventStream$ Observable of bus event objects
 * @param handlerLookup Key based lookup object with handler functions as properties
 * @param ignoreMissing Optionally allow unhandled events to pass through silently
 * @returns Subscription
 */
export function busEventHandlerSubscribe(
  eventStream$: Observable<OutputBusEvent<unknown> | InputBusEvent<unknown>>,
  handlerLookup: HandlerLookup,
  ignoreMissing = false
): Subscription {
  return eventStream$.subscribe(
    (event: OutputBusEvent<unknown> | InputBusEvent<unknown>) =>
      busEventHandler(event, handlerLookup, ignoreMissing)
  );
}
