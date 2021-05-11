import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { outputEvent, OutputEvent } from '@gyrus/ui-io-bus';
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
    this.outBus.emit(
      outputEvent<string>(OutputEventNames.BookListSelectBook, id)
    );
  }

  clearSelected() {
    this.outBus.emit(
      outputEvent<null>(OutputEventNames.BookListClearSelectedBook, null)
    );
  }

  trackByFn(index: number, item: BooksEntity) {
    return item.id;
  }
}
