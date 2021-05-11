import { Component, OnInit } from '@angular/core';
import { UiIoBusLoggerService } from '@gyrus/ui-io-bus';
import { BooksEntity } from '../+state/books.models';
import { OutputEventNames } from '../_shared/interfaces/bus-event-names.interface';
import { AddBookFormSubmitEvent } from './add-book-form/add-book-form.component';
import { BookListOutEvents } from './book-list/book-list.component';
import { BookManagerComponentStateService } from './book-manager-component-state.service';
import { ShowFormCheckboxChangeEvent } from './show-form-checkbox/show-form-checkbox.component';
import { TabsSelectTabEvent } from './tabs/tabs.component';

type OutputEvents =
  | AddBookFormSubmitEvent
  | BookListOutEvents
  | ShowFormCheckboxChangeEvent
  | TabsSelectTabEvent;

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  providers: [BookManagerComponentStateService],
})
export class BookManagerComponent implements OnInit {
  vm$ = this.state.vm$;

  constructor(
    private state: BookManagerComponentStateService,
    private log: UiIoBusLoggerService
  ) {}

  ngOnInit() {
    this.state.loadBooks();
  }

  outHandler(event: OutputEvents) {
    const handlerCaller = {
      [OutputEventNames.AddBookFormSubmit]: this.upsertBook,
      [OutputEventNames.BookListSelectBook]: this.selectBook,
      [OutputEventNames.BookListClearSelectedBook]: this.clearSelectedBook,
      [OutputEventNames.ShowFormCheckboxChange]: this.upsertBook,
      [OutputEventNames.TabsSelectTab]: this.toggleShowForm,
    };

    try {
      handlerCaller[event.name].bind(this)(event.payload);
    } catch (err) {
      console.log(err);

      throw new Error(
        'handlerCaller failed to find a handler for event: ' + event.name
      );
    }
  }

  private toggleShowForm() {
    this.log.dummyStyledLog();
    this.state.toggleShowForm();
  }

  private selectTab(tabNo: number) {
    this.state.setSelectedTab(tabNo);
  }

  private upsertBook(book: BooksEntity) {
    this.state.upsertBook(book);
  }

  private selectBook(id: string) {
    this.state.selectBook(id);
  }

  private clearSelectedBook() {
    this.state.selectBook(null);
  }
}
