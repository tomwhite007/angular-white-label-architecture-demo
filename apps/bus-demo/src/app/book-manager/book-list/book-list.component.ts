import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BooksEntity } from '../../+state/books.models';

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
  @Output() clearSelectedBook = new EventEmitter();

  handleClick(index: number) {
    const id =
      this.selectedId === this.books[index].id ? null : this.books[index].id;
    this.selectBook.emit(id);
  }

  clearSelected() {
    this.clearSelectedBook.emit();
  }

  trackByFn(index: number, item: BooksEntity) {
    return item.id;
  }
}
