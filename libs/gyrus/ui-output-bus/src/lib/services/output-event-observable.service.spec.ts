import { TestBed } from '@angular/core/testing';
import { OutputBusEvent } from '../interfaces/output-bus-event.interface';
import { OutputEventObservableService } from './output-event-observable.service';

describe('OutputEventObservableService', () => {
  let service: OutputEventObservableService<OutputBusEvent<unknown>>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputEventObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
