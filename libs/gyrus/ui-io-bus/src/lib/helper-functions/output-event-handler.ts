import { Subject } from 'rxjs';
import { OutputEvent } from '../interfaces/public.interface';

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
  handlerLookup: { [eventName: string]: (payload: unknown) => void },
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
 * Helper Class to convert OutputEvents to an Observable
 */
export class OutputEventObserveable<T extends OutputEvent<unknown>> {
  private _outBus$: Subject<T> = new Subject();

  /**
   * Observable of all events received by outputEventHandler()
   */
  outBus$ = this._outBus$.asObservable();

  /**
   * UI IO Bus Output Event handler helper.
   * Adds OutputEvents to outBus$ Observable.
   * Calls custom handler from handlerLookup if supplied.
   * @param event OutputEvent object
   * @param handlerLookup Key based lookup object with handler functions as properties
   * @param bindThis Required (if handlerLookup is supplied) - 'this' context of Component so that functions in handlerLookup are accessible
   * @param ignoreMissing Default true, but can set to false if handlerLookup should contain all events.
   */
  outputEventHandler(
    event: T,
    handlerLookup?: { [eventName: string]: (payload: unknown) => void },
    bindThis?: unknown,
    ignoreMissing = true
  ) {
    this._outBus$.next(event);

    if (handlerLookup) {
      outputEventHandler(event, handlerLookup, bindThis, ignoreMissing);
    }
  }
}
