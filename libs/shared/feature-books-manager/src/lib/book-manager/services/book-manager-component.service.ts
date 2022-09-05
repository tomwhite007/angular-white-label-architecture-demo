import { Injectable, OnInit } from '@angular/core';
import { BooksEntity } from '@books-manager/shared/data-access-books';
import {
  AddBookFormSubmitEvent,
  BookListOutEvents,
  ShowFormCheckboxChangeEvent,
  TabsSelectTabEvent,
} from '@books-manager/shared/ui-books';
import { OutputEventNames } from '@books-manager/shared/util-books-models';
import { ConfigService } from '@books-manager/shared/util-config';
import {
  UiOutputBusLoggerService,
  outputEventHandler,
} from '@gyrus/ui-output-bus';
import { BookManagerStateService } from './book-manager-state.service';

type OutputEvents =
  | AddBookFormSubmitEvent
  | BookListOutEvents
  | ShowFormCheckboxChangeEvent
  | TabsSelectTabEvent;

@Injectable()
export class BookManagerComponentService {
  vm$ = this.state.vm$;

  constructor(
    private state: BookManagerStateService,
    private outLog: UiOutputBusLoggerService,
    private config: ConfigService
  ) {}

  init() {
    this.state.loadBooks();
  }

  outHandler(event: OutputEvents) {
    this.config.environment.production || this.outLog.logOutputEvent(event);

    outputEventHandler(event, {
      [OutputEventNames.AddBookFormSubmit]: this.upsertBook,
      [OutputEventNames.BookListSelectBook]: this.selectBook,
      [OutputEventNames.BookListClearSelectedBook]: this.clearSelectedBook,
      [OutputEventNames.ShowFormCheckboxChange]: this.toggleShowForm,
      [OutputEventNames.TabsSelectTab]: this.selectTab,
    });
  }

  private toggleShowForm = () => {
    this.state.toggleShowForm();
  };

  private selectTab = (tabNo: number) => {
    this.state.setSelectedTab(tabNo);
  };

  private upsertBook = (book: BooksEntity) => {
    this.state.upsertBook(book);
  };

  private selectBook = (id: string) => {
    this.state.selectBook(id);
  };

  private clearSelectedBook = () => {
    this.state.selectBook('');
  };
}
