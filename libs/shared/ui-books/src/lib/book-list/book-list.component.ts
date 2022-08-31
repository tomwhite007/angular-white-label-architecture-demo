import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { outBusEmit, OutputBusEvent } from '@gyrus/ui-output-bus';
import { BooksEntity } from '@books-manager/shared/data-access-books';
import { OutputEventNames } from '../../_shared/interfaces/output-bus-event-names.interface';

export type BookListSelectBookEvent = OutputBusEvent<
  OutputEventNames.BookListSelectBook,
  string | undefined
>;
export type BookListClearSelectedBookEvent = OutputBusEvent<
  OutputEventNames.BookListClearSelectedBook,
  null
>;
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
  @Input() set data(data: { books: BooksEntity[]; selectedId?: string }) {
    this.books = data.books;
    this.selectedId = data.selectedId;
  }
  @Output() outBus: EventEmitter<BookListOutEvents> = new EventEmitter();

  books!: BooksEntity[];
  selectedId?: string;

  handleClick(index: number) {
    this.selectedId = this.books[index].id;
    outBusEmit<BookListSelectBookEvent>(
      this.outBus,
      OutputEventNames.BookListSelectBook,
      this.selectedId
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
