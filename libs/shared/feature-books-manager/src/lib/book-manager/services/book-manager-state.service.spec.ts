import { TestBed } from '@angular/core/testing';
import { BooksFacade } from '@books-manager/shared/data-access-books';
import { of } from 'rxjs';
import { BookManagerStateService } from './book-manager-state.service';

describe('BookManagerStateService', () => {
  let service: BookManagerStateService;

  beforeEach(() => {
    const mockFacade = {
      loaded$: of(true),
      allBooks$: of([]),
      selectedBook$: of(null),
      selectedId$: of(null),
    };

    TestBed.configureTestingModule({
      providers: [
        BookManagerStateService,
        { provide: BooksFacade, useValue: mockFacade },
      ],
    });
    service = TestBed.inject(BookManagerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
