import { Injectable } from '@angular/core';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

@Injectable({
  providedIn: 'any',
})
export class UiOutputBusLoggerService {
  logOutputEvent(event: OutputBusEvent<unknown, unknown>) {
    const eventStr = JSON.stringify(event)
      .replace(/"/g, ' ')
      .replace(/,/g, ',  ');
    console.warn(
      '%cOutput Bus Event: ' + eventStr,
      'display: block; background-color: #fcba03; color: #000; border-radius: 4px; padding: 4px; line-height: 1.5em;'
    );
  }
}
