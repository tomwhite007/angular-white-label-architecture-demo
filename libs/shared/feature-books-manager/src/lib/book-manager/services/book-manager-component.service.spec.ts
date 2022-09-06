import { TestBed } from '@angular/core/testing';

import { BookManagerComponentService } from './book-manager-component.service';

describe('BookManagerComponentService', () => {
  let service: BookManagerComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookManagerComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
