import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BooksEntity } from './+state/books.models';
import { AppComponentStateService } from './app-component-state.service';
import { LoggerService } from '@gyrus/ui-io-bus';

@Component({
  selector: 'playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AppComponentStateService],
})
export class AppComponent {
  vm$ = this.state.vm$;

  constructor(
    private state: AppComponentStateService,
    private log: LoggerService
  ) {}

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
}
