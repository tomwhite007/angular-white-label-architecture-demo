import { InputBusEvent } from '../interfaces/input-bus-event.interface';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

interface HandlerLookup {
  [eventName: string]: (payload: unknown) => void;
}

/**
 * UI IO Bus Event handler helper.
 * Calls custom handler callback from lookup based on bus event name.
 * @param event bus event object
 * @param handlerLookup Key based lookup object with handler functions as properties
 * @param ignoreMissing Optionally allow unhandled events to pass through silently
 */
export function busEventHandler(
  event: OutputBusEvent<unknown> | InputBusEvent<unknown>,
  handlerLookup: HandlerLookup,
  ignoreMissing = false
) {
  try {
    handlerLookup[event.name](event.payload);
  } catch (err) {
    if (err.message === `handlerLookup[event.name] is not a function`) {
      if (!ignoreMissing) {
        throw new Error(
          'Bus Event Handler lookup has no handler for event name: ' +
            event.name
        );
      }
    } else {
      throw err;
    }
  }
}
