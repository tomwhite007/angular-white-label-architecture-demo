import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

interface HandlerLookup {
  [eventName: string]: (payload: unknown) => void;
}

/**
 * UI IO Bus Output Event handler helper.
 * Calls custom handler callback from lookup based on OutputEvent name.
 * @param event OutputEvent object
 * @param handlerLookup Key based lookup object with handler functions as properties
 * @param ignoreMissing Optionally allow unhandled events to pass through silently
 */
export function outputEventHandler(
  event: OutputBusEvent<unknown>,
  handlerLookup: HandlerLookup,
  ignoreMissing = false
) {
  try {
    handlerLookup[event.name](event.payload);
  } catch (err) {
    if (err.message === `handlerLookup[event.name] is not a function`) {
      if (!ignoreMissing) {
        throw new Error(
          'Output Event Handler lookup has no handler for event name: ' +
            event.name
        );
      }
    } else {
      throw err;
    }
  }
}
