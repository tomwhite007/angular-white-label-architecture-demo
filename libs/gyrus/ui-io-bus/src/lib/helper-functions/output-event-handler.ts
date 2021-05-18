import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OutputEvent } from '../interfaces/public.interface';

interface HandlerLookup {
  [eventName: string]: (payload: unknown) => void;
}

/**
 * UI IO Bus Output Event handler helper.
 * Calls custom handler from lookup based on OutputEvent name.
 * @param event OutputEvent object
 * @param handlerLookup Key based lookup object with handler functions as properties
 * @param bindThis Required 'this' context of Component so that functions in handlerLookup are accessible
 * @param ignoreMissing Optionally allow unhandled events to pass through silently
 */
export function outputEventHandler(
  event: OutputEvent<unknown>,
  handlerLookup: HandlerLookup,
  bindThis: unknown,
  ignoreMissing = false
) {
  try {
    handlerLookup[event.name].bind(bindThis)(event.payload);
  } catch (err) {
    if (err.message === `Cannot read property 'bind' of undefined`) {
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

/**
 * Helper Service to convert OutputEvents to an Observable
 */
@Injectable()
export class OutputEventObserveableService<T extends OutputEvent<unknown>> {
  private _outBus$: Subject<T> = new Subject();

  /**
   * Observable of all events received by outputEventHandler()
   */
  outBus$ = this._outBus$.asObservable();

  /**
   * Adds OutputEvents to outBus$ Observable.
   * @param event OutputEvent object
   */
  outputEventToObservable(event: T) {
    this._outBus$.next(event);
  }
}
