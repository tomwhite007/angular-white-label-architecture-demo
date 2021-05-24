import { Injectable } from '@angular/core';
import { createInputBusEvent } from '@gyrus/ui-io-bus';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BooksFacade } from '../+state/books.facade';
import { BooksEntity } from '../+state/books.models';
import { InputEventNames } from '../_shared/interfaces/bus-event-names.interface';
import { AddBookShowFormEvent } from './add-book-form/add-book-form.component';

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
  readonly addBookFormBus$ = this.select((state) =>
    createInputBusEvent<AddBookShowFormEvent>(
      InputEventNames.AddBookShowForm,
      state.showForm
    )
  );

  readonly devaddBookFormBus$ = this.select(
    this.select((state) => state),
    this.books.selectedBook$,
    (LocalState, selectedBook) => ({
      ...LocalState,
      selectedBook,
    })
  );

  readonly vm$ = this.select(
    this.select((state) => state),
    this.books.allBooks$,
    this.books.selectedBook$,
    this.books.selectedId$,
    (LocalState, allBooks, selectedBook, selectedId) => ({
      ...LocalState,
      allBooks,
      selectedBook,
      selectedId,
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

          console.log('window.dataLayer', window.dataLayer);
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
