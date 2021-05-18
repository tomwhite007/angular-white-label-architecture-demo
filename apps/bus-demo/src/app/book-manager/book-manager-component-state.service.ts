import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BooksFacade } from '../+state/books.facade';
import { BooksEntity } from '../+state/books.models';
import {
  outputEventHandler,
  OutputEventObserveableService,
} from '@gyrus/ui-io-bus';
import { AddBookFormSubmitEvent } from './add-book-form/add-book-form.component';
import { BookListOutEvents } from './book-list/book-list.component';
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
    private outputService: OutputEventObserveableService<OutputEvents>
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

  readonly toggleShowForm = this.updater((state) => ({
    ...state,
    showForm: !state.showForm,
  }));

  readonly setSelectedTab = this.updater((state, tabNo: number) => ({
    ...state,
    selectedTab: tabNo,
  }));

  // Effects

  readonly handleOutputEvents = this.effect(
    (event$: Observable<OutputEvents>) => {
      return event$.pipe(
        tap((event: OutputEvents) => {
          outputEventHandler(
            event,
            {
              [OutputEventNames.AddBookFormSubmit]: this.upsertBook,
              [OutputEventNames.BookListSelectBook]: this.selectBook,
              [OutputEventNames.BookListClearSelectedBook]: this
                .clearSelectedBook,
              [OutputEventNames.ShowFormCheckboxChange]: this.toggleShowForm,
              [OutputEventNames.TabsSelectTab]: this.setSelectedTab,
            },
            this
          );
        })
      );
    }
  )(this.outputService.outBus$);

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

  // Update Global state

  loadBooks() {
    this.books.loadBooks();
  }

  private upsertBook(book: BooksEntity) {
    this.books.upsertBook(book);
  }

  private selectBook(id: string) {
    this.books.selectBook(id);
  }

  // Imperative local state proxy functions

  private clearSelectedBook() {
    this.selectBook(null);
  }
}
