import { Injectable } from '@angular/core';
import { createBus } from '@gyrus/ui-io-bus';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BooksFacade } from '../+state/books.facade';
import { BooksEntity } from '../+state/books.models';
import { InputEventNames } from '../_shared/interfaces/bus-event-names.interface';
import { AddBookInputEvents } from './add-book-form/add-book-form.component';
import { BookListInputEvents } from './book-list/book-list.component';
import { ShowFormInputEvents } from './show-form-checkbox/show-form-checkbox.component';
import { TabSelectedTabInputEvent } from './tabs/tabs.component';

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

  // Input Buses

  readonly addBookFormBus$ = createBus<AddBookInputEvents>(
    {
      eventName: InputEventNames.AddBookShowForm,
      payload$: this.select((state) => state.showForm),
    },
    {
      eventName: InputEventNames.AddBookSelectedBook,
      payload$: this.books.selectedBook$,
    }
  );

  readonly bookListBus$ = createBus<BookListInputEvents>(
    {
      eventName: InputEventNames.BookListBooks,
      payload$: this.books.allBooks$,
    },
    {
      eventName: InputEventNames.BookListSelectedId,
      payload$: this.books.selectedId$,
    }
  );

  readonly showFormCheckboxBus$ = createBus<ShowFormInputEvents>(
    {
      eventName: InputEventNames.ShowFormChecked,
      payload$: this.select((state) => state.showForm),
    },
    {
      eventName: InputEventNames.ShowFormUpdateMode,
      payload$: this.books.selectedId$.pipe(map((id) => !!id)),
    }
  );

  readonly tabBus$ = createBus<TabSelectedTabInputEvent>({
    eventName: InputEventNames.TabSelectedTab,
    payload$: this.select((state) => state.selectedTab),
  });
}
