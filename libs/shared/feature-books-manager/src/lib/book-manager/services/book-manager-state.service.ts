import { Injectable } from '@angular/core';
import {
  BooksFacade,
  BooksEntity,
} from '@books-manager/shared/data-access-books';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

interface LocalState {
  showForm: boolean;
  selectedTab: number;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

@UntilDestroy()
@Injectable()
export class BookManagerStateService {
  private state$ = new BehaviorSubject<LocalState>({
    showForm: false,
    selectedTab: 0,
  });

  readonly vm$ = combineLatest([
    this.state$,
    this.books.allBooks$,
    this.books.selectedBook$,
    this.books.selectedId$,
  ]).pipe(
    map(([localState, allBooks, selectedBook, selectedId]) => ({
      addBookFormData: { showForm: localState.showForm, selectedBook },
      showFormCheckBoxData: {
        checked: localState.showForm,
        updateMode: !!selectedId,
      },
      tabsData: { selectedTab: localState.selectedTab },
      bookListData: { books: allBooks, selectedId },
    }))
  );

  constructor(private books: BooksFacade) {}

  init() {
    this.updateGoogleAnalyticsWithTabSelected();
    this.loadBooks();
  }

  // local state updaters

  toggleShowForm() {
    const state = this.state$.value;
    this.state$.next({
      ...state,
      showForm: !state.showForm,
    });
  }

  setSelectedTab(tabNo: number) {
    const state = this.state$.value;
    this.state$.next({
      ...state,
      selectedTab: tabNo,
    });
  }

  // local state effects

  updateGoogleAnalyticsWithTabSelected() {
    this.state$.pipe(
      untilDestroyed(this),
      map((state) => state.selectedTab),
      distinctUntilChanged(),
      tap((tab) => {
        window.dataLayer = window.dataLayer || [];
        // fake Google Analytics event
        window.dataLayer.push({
          event: 'tabSelected',
          value: tab,
        });
      })
    );
  }

  // Global state

  private loadBooks() {
    this.books.loadBooks();
  }

  upsertBook(book: BooksEntity) {
    this.books.upsertBook(book);
  }

  selectBook(id: string) {
    this.books.selectBook(id);
  }
}
