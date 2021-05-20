import { Injectable } from '@angular/core';
import { OutputEvent } from '@gyrus/ui-io-bus';
import { Subject } from 'rxjs';

/**
 * Helper Service to convert OutputEvents to an Observable
 */
@Injectable()
export class OutputEventObservableService<T extends OutputEvent<unknown>> {
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
