import { Component, OnInit } from '@angular/core';
import {
  outputEventHandler,
  UiOutputBusLoggerService,
} from '@gyrus/ui-output-bus';
import { BooksEntity } from '@books-manager/shared/data-access-books';
// import { environment } from '../../../../../../apps/books-manager/src/environments/environment';
import { BookManagerComponentStateService } from './book-manager-component-state.service';
import {
  AddBookFormSubmitEvent,
  BookListOutEvents,
  ShowFormCheckboxChangeEvent,
  TabsSelectTabEvent,
} from '@books-manager/shared/ui-books';
import { OutputEventNames } from '@books-manager/shared/util-books-models';

type OutputEvents =
  | AddBookFormSubmitEvent
  | BookListOutEvents
  | ShowFormCheckboxChangeEvent
  | TabsSelectTabEvent;

@Component({
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  providers: [BookManagerComponentStateService],
})
export class BookManagerComponent implements OnInit {
  vm$ = this.state.vm$;

  constructor(
    private state: BookManagerComponentStateService,
    private outLog: UiOutputBusLoggerService
  ) {}

  ngOnInit() {
    this.state.loadBooks();
  }

  outHandler(event: OutputEvents) {
    // environment.production || this.outLog.logOutputEvent(event);

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