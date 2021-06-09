import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  busEventHandler,
  InputBusEvent,
  outBusEmit,
  OutputBusEvent,
} from '@gyrus/ui-io-bus';
import { Observable, Subscription } from 'rxjs';
import { BooksEntity } from '../../+state/books.models';
import {
  InputEventNames,
  OutputEventNames,
} from '../../_shared/interfaces/bus-event-names.interface';

export type BookListSelectBookEvent = OutputBusEvent<string>;
export type BookListClearSelectedBookEvent = OutputBusEvent<null>;
export type BookListOutEvents =
  | BookListSelectBookEvent
  | BookListClearSelectedBookEvent;

export type BookListBooksEvent = InputBusEvent<BooksEntity[]>;
export type BookListSelectedIdEvent = InputBusEvent<string>;
export type BookListInputEvents = BookListBooksEvent | BookListSelectedIdEvent;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnDestroy {
  @Input() set inBus$(bus$: Observable<BookListInputEvents>) {
    this.busSubscription = bus$.subscribe((event: BookListInputEvents) => {
      busEventHandler(event, {
        [InputEventNames.BookListBooks]: this.setBooks,
        [InputEventNames.BookListSelectedId]: this.setSelectedId,
      });
      this.cdr.detectChanges();
    });
  }
  @Output() outBus: EventEmitter<BookListOutEvents> = new EventEmitter();

  books: BooksEntity[];
  selectedId: string;
  busSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  handleClick(index: number) {
    const id =
      this.selectedId === this.books[index].id ? null : this.books[index].id;
    outBusEmit<string>(this.outBus, OutputEventNames.BookListSelectBook, id);
  }

  clearSelected() {
    outBusEmit<null>(
      this.outBus,
      OutputEventNames.BookListClearSelectedBook,
      null
    );
  }

  trackByFn(index: number, item: BooksEntity) {
    return item.id;
  }

  private setBooks = (books: BooksEntity[]) => (this.books = books);

  private setSelectedId = (id: string) => (this.selectedId = id);

  ngOnDestroy() {
    this.busSubscription || this.busSubscription.unsubscribe();
  }
}
