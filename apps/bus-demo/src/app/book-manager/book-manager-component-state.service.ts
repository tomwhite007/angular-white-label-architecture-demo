import { Injectable } from '@angular/core';
import { createInputBusEvent } from '@gyrus/ui-io-bus';
import { ComponentStore } from '@ngrx/component-store';
import { merge } from 'rxjs';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BooksFacade } from '../+state/books.facade';
import { BooksEntity } from '../+state/books.models';
import { InputEventNames } from '../_shared/interfaces/bus-event-names.interface';
import {
  AddBookSelectedBookEvent,
  AddBookShowFormEvent,
} from './add-book-form/add-book-form.component';
import {
  BookListBooksEvent,
  BookListSelectedIdEvent,
} from './book-list/book-list.component';

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
  readonly addBookFormBus$ = merge(
    this.select((state) => state.showForm).pipe(
      map((showForm) =>
        createInputBusEvent<AddBookShowFormEvent>(
          InputEventNames.AddBookShowForm,
          showForm
        )
      )
    ),
    this.books.selectedBook$.pipe(
      map((selected) =>
        createInputBusEvent<AddBookSelectedBookEvent>(
          InputEventNames.AddBookSelectedBook,
          selected
        )
      )
    )
  );

  readonly bookListBus$ = merge(
    this.books.allBooks$.pipe(
      map((books) =>
        createInputBusEvent<BookListBooksEvent>(
          InputEventNames.AddBookShowForm,
          books
        )
      )
    ),
    this.books.selectedId$.pipe(
      map((id) =>
        createInputBusEvent<BookListSelectedIdEvent>(
          InputEventNames.AddBookSelectedBook,
          id
        )
      )
    )
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
