import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BooksFacade } from '@books-manager/shared/data-access-books';
import { of } from 'rxjs';
import { BookManagerStateService } from './book-manager-state.service';
import { BookManagerComponent } from './book-manager.component';

const mockStateService = {
  vm$: of({
    showForm: false,
    selectedTab: 0,
    allBooks: [],
    selectedBook: null,
    selectedId: null,
  }),
  selectedTab$: of(0),
  loadBooks: jest.fn(),
};
const mockBooksFacade = {
  loadBooks: jest.fn(),
  allBooks$: of([]),
  selectedBook$: of(null),
  selectedId$: of(null),
};

describe('BookManagerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookManagerComponent],
      providers: [
        {
          provide: BookManagerStateService,
          useValue: mockStateService,
        },
        { provide: BooksFacade, useValue: mockBooksFacade },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(BookManagerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(BookManagerComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Books App');
  });
});
