import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BooksEntity } from '../+state/books.models';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  @Input() books: BooksEntity[];
  @Input() selectedId: string;

  @Output() selectBook = new EventEmitter<string>();

  handleClick(index: number) {
    this.selectBook.emit(this.books[index].id);
  }
}
