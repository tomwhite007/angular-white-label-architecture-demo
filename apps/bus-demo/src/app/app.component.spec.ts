import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ComponentStore } from '@ngrx/component-store';
import { of } from 'rxjs';
import { BooksFacade } from './+state/books.facade';
import { AppComponentStateService } from './app-component-state.service';
import { AppComponent } from './app.component';

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

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AppComponentStateService, useValue: mockStateService },
        { provide: BooksFacade, useValue: mockBooksFacade },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Books App');
  });
});
