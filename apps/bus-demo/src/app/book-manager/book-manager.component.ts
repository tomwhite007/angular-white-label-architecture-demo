import { Component, OnInit } from '@angular/core';
import { OutputEvent, UiIoBusLoggerService } from '@gyrus/ui-io-bus';
import { BooksEntity } from '../+state/books.models';
import { BookManagerComponentStateService } from './book-manager-component-state.service';

type OutputEvents = OutputEvent<BooksEntity>;

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
    this.upsertBook(event.payload);
  }

  toggleShowForm() {
    this.log.dummyStyledLog();
    this.state.toggleShowForm();
  }

  selectTab(tabNo: number) {
    this.state.setSelectedTab(tabNo);
  }

  private upsertBook(book: BooksEntity) {
    this.state.upsertBook(book);
  }

  selectBook(id: string) {
    this.state.selectBook(id);
  }
}
