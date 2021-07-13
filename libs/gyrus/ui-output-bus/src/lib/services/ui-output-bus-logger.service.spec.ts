import { TestBed } from '@angular/core/testing';
import { UiOutputBusLoggerService } from './ui-output-bus-logger.service';

describe('UiOutputBusLoggerService', () => {
  let service: UiOutputBusLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiOutputBusLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
