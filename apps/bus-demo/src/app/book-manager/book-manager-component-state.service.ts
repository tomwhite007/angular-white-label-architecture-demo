import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectId } from '../+state/books.actions';
import { BooksFacade } from '../+state/books.facade';
import { BooksEntity } from '../+state/books.models';

interface LocalState {
  showForm: boolean;
  selectedTab: number;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

@Injectable()
export class BookManagerComponentStateService extends ComponentStore<LocalState> {
  readonly vm$ = this.select(
    this.select((state) => state),
    this.books.allBooks$,
    this.books.selectedBook$,
    this.books.selectedId$,
    (localState, allBooks, selectedBook, selectedId) => ({
      ...localState,
      allBooks,
      selectedBook,
      selectedId,
      addBookFormDataInput: { showForm: localState.showForm, selectedBook },
      showFormCheckBoxDataInput: {
        checked: localState.showForm,
        updateMode: !!selectId,
      },
      tabsDataInput: { selectedTab: localState.selectedTab },
    })
  );

  readonly selectedTab$ = this.select((state) => state.selectedTab);

  constructor(private books: BooksFacade) {
    super({
      showForm: false,
      selectedTab: 0,
    });
  }

  // Updaters

  readonly toggleShowForm = this.updater((state) => ({
    ...state,
    showForm: !state.showForm,
  }));

  readonly setSelectedTab = this.updater((state, tabNo: number) => ({
    ...state,
    selectedTab: tabNo,
  }));

  // Effects

  readonly updateGoogleAnalyticsWithTabSelected = this.effect(
    (selectedTab$: Observable<number>) => {
      return selectedTab$.pipe(
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
  )(this.selectedTab$);

  // Global state

  loadBooks() {
    this.books.loadBooks();
  }

  upsertBook(book: BooksEntity) {
    this.books.upsertBook(book);
  }

  selectBook(id: string) {
    this.books.selectBook(id);
  }
}
