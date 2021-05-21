import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BooksFacade } from '../+state/books.facade';
import {
  OutputEventObservableService,
  outputEventSelector,
} from '@gyrus/ui-io-bus';
import { AddBookFormSubmitEvent } from './add-book-form/add-book-form.component';
import {
  BookListOutEvents,
  BookListSelectBookEvent,
} from './book-list/book-list.component';
import { ShowFormCheckboxChangeEvent } from './show-form-checkbox/show-form-checkbox.component';
import { TabsSelectTabEvent } from './tabs/tabs.component';
import { OutputEventNames } from '../_shared/interfaces/bus-event-names.interface';

export type OutputEvents =
  | AddBookFormSubmitEvent
  | BookListOutEvents
  | ShowFormCheckboxChangeEvent
  | TabsSelectTabEvent;

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
    (LocalState, allBooks, selectedBook, selectedId) => ({
      ...LocalState,
      allBooks,
      selectedBook,
      selectedId,
    })
  );

  readonly selectedTab$ = this.select((state) => state.selectedTab);

  constructor(
    private books: BooksFacade,
    private outputService: OutputEventObservableService<OutputEvents>
  ) {
    super({
      showForm: false,
      selectedTab: 0,
    });
  }

  // proxy outputEventToObservable
  outputEventToObservable(event: OutputEvents) {
    this.outputService.outputEventToObservable(event);
  }

  // Updaters

  readonly toggleShowForm = this.updater((state, event: unknown) => ({
    ...state,
    showForm: !state.showForm,
  }))(
    outputEventSelector(
      this.outputService.outBus$,
      OutputEventNames.ShowFormCheckboxChange
    )
  );

  readonly setSelectedTab = this.updater(
    (state, event: TabsSelectTabEvent) => ({
      ...state,
      selectedTab: event.payload,
    })
  )(
    outputEventSelector(
      this.outputService.outBus$,
      OutputEventNames.TabsSelectTab
    )
  );

  // Effects

  readonly upsertBook = this.effect(
    (event$: Observable<AddBookFormSubmitEvent>) => {
      return event$.pipe(
        tap((event: AddBookFormSubmitEvent) => {
          this.books.upsertBook(event.payload);
        })
      );
    }
  )(
    outputEventSelector(
      this.outputService.outBus$,
      OutputEventNames.AddBookFormSubmit
    )
  );

  readonly selectBook = this.effect(
    (event$: Observable<BookListSelectBookEvent>) => {
      return event$.pipe(
        tap((event: BookListSelectBookEvent) => {
          this.books.selectBook(event.payload);
        })
      );
    }
  )(
    outputEventSelector(
      this.outputService.outBus$,
      OutputEventNames.BookListSelectBook,
      // BookListClearSelectedBook can use this effect because it sends a null payload
      OutputEventNames.BookListClearSelectedBook
    )
  );

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

  // Update Global state

  loadBooks() {
    this.books.loadBooks();
  }
}
