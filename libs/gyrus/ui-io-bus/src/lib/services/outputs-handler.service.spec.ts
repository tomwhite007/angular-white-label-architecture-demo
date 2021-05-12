import { TestBed } from '@angular/core/testing';

import { OutputsHandlerService } from './outputs-handler.service';

describe('OutputsHandlerService', () => {
  let service: OutputsHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputsHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
