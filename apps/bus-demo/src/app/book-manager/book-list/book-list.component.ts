import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { BooksEntity } from '../../+state/books.models';
import { OutputEventNames } from '../../_shared/interfaces/output-bus-event-names.interface';

export type BookListSelectBookEvent = OutputBusEvent<string>;
export type BookListClearSelectedBookEvent = OutputBusEvent<null>;
export type BookListOutEvents =
  | BookListSelectBookEvent
  | BookListClearSelectedBookEvent;

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  @Input() set data(data: { books: BooksEntity[]; selectedId: string }) {
    this.books = data.books;
    this.selectedId = data.selectedId;
  }
  @Output() outBus: EventEmitter<BookListOutEvents> = new EventEmitter();

  books: BooksEntity[];
  selectedId: string;

  handleClick(index: number) {
    const id =
      this.selectedId === this.books[index].id ? null : this.books[index].id;
    outBusEmit<BookListSelectBookEvent>(
      this.outBus,
      OutputEventNames.BookListSelectBook,
      id
    );
  }

  clearSelected() {
    outBusEmit<BookListClearSelectedBookEvent>(
      this.outBus,
      OutputEventNames.BookListClearSelectedBook,
      null
    );
  }

  trackByFn(index: number, item: BooksEntity) {
    return item.id;
  }
}
