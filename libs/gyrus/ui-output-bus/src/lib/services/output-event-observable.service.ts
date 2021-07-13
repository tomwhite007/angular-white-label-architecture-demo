import { Injectable } from '@angular/core';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';
import { Subject } from 'rxjs';

/**
 * Helper Service to convert OutputEvents to an Observable
 */
@Injectable()
export class OutputEventObservableService<T extends OutputBusEvent<unknown>> {
  private _outBus$: Subject<T> = new Subject();

  /**
   * Observable of all events received by outputEventHandler()
   */
  outBus$ = this._outBus$.asObservable();

  /**
   * Adds OutputEvents to outBus$ Observable.
   * @param event OutputBusEvent object
   */
  outputEventToObservable(event: T) {
    this._outBus$.next(event);
  }
}
