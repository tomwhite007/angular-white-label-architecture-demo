import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BooksEntity } from './+state/books.models';
import { AppComponentStateService } from './app-component-state.service';
import { LoggerService } from '@gyrus/ui-io-bus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppComponentStateService],
})
export class AppComponent implements OnInit {
  vm$ = this.state.vm$;

  constructor(
    private state: AppComponentStateService,
    private log: LoggerService
  ) {}

  ngOnInit() {
    this.state.loadBooks();
  }

  toggleShowForm() {
    this.log.dummyStyledLog();
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
