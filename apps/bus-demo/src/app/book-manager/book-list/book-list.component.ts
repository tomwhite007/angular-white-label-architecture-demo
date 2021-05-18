import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { outBusEmit, OutputEvent } from '@gyrus/ui-io-bus';
import { BooksEntity } from '../../+state/books.models';
import { OutputEventNames } from '../../_shared/interfaces/bus-event-names.interface';

export type BookListSelectBookEvent = OutputEvent<string>;
export type BookListClearSelectedBookEvent = OutputEvent<null>;
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
  @Input() books: BooksEntity[];
  @Input() selectedId: string;

  @Output() outBus: EventEmitter<BookListOutEvents> = new EventEmitter();

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
}
