import { TestBed } from '@angular/core/testing';
import { OutputEvent } from '../interfaces/public.interface';
import { OutputEventObservableService } from './output-event-observable.service';

describe('OutputEventObservableService', () => {
  let service: OutputEventObservableService<OutputEvent<unknown>>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputEventObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
