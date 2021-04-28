import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  dummyStyledLog() {
    console.warn(
      '%c***** USING MOCK DATA API *****',
      'background: #f00; letter-spacing: 2px; font-weight: 600; color: #000; padding: 12px'
    );
  }
}
