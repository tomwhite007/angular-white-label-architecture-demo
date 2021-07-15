import { Injectable } from '@angular/core';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';

@Injectable({
  providedIn: 'any',
})
export class UiOutputBusLoggerService {
  logOutputEvent(event: OutputBusEvent<unknown, unknown>) {
    const payload = JSON.stringify(event.payload);
    const group = event.group ? `,   group: ${event.group}` : '';
    const eventStr = `${event.name},   payload: ${payload}${group},   ${event.created}`;
    console.warn(
      '%c[Output Bus Event] ' + eventStr,
      'display: block; background-color: #fcba03; color: #000; border-radius: 4px; padding: 4px; line-height: 1.5em;'
    );
  }
}
