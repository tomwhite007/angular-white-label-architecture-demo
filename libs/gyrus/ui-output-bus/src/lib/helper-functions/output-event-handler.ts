import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

interface HandlerLookup {
  [eventName: string]: (payload: any) => void;
}

/**
 * UI IO Bus Output Event handler helper.
 * Calls custom handler from lookup based on OutputBusEvent name.
 * @param event OutputBusEvent object
 * @param handlerLookup Key based lookup object with handler functions as properties
 * @param ignoreMissing Optionally allow unhandled events to pass through silently
 */
export function outputEventHandler(
  event: OutputBusEvent<string, unknown>,
  handlerLookup: HandlerLookup,
  ignoreMissing = false
) {
  try {
    handlerLookup[event.name](event.payload);
  } catch (err: any) {
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
