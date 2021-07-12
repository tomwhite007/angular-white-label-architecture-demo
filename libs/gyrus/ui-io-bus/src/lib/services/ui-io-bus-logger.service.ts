import { Injectable } from '@angular/core';
import { OutputEvent } from '../interfaces/public.interface';

@Injectable({
  providedIn: 'any',
})
export class UiIoBusLoggerService {
  logOutputEvent(event: OutputEvent<unknown>) {
    const eventStr = JSON.stringify(event)
      .replace(/"/g, ' ')
      .replace(/,/g, ',  ');
    console.warn(
      '%cOutput Bus Event: ' + eventStr,
      'display: block; background-color: #fcba03; color: #000; border-radius: 4px; padding: 4px; line-height: 1.5em;'
    );
  }
}
