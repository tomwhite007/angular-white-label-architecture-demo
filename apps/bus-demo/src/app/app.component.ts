import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BooksEntity } from './+state/books.models';
import { AppComponentStateService } from './app-component-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppComponentStateService],
})
export class AppComponent implements OnInit {
  vm$ = this.state.vm$;

  constructor(private state: AppComponentStateService) {}

  ngOnInit() {
    this.state.loadBooks();
  }

  toggleShowForm() {
    this.state.toggleShowForm();
  }

  selectTab(tabNo: number) {
    this.state.setSelectedTab(tabNo);
  }

  upsertBook(book: BooksEntity) {
    this.state.upsertBook(book);
  }

  selectBook(id: string) {
    this.state.selectBook(id);
  }
}
