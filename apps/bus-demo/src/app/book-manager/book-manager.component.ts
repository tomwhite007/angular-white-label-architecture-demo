import { Component, OnInit } from '@angular/core';
import { OutputEventObservableService } from '@gyrus/ui-io-bus';
import {
  BookManagerComponentStateService,
  OutputEvents,
} from './book-manager-component-state.service';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  providers: [BookManagerComponentStateService, OutputEventObservableService],
})
export class BookManagerComponent implements OnInit {
  vm$ = this.state.vm$;

  constructor(private state: BookManagerComponentStateService) {}

  ngOnInit() {
    this.state.loadBooks();
  }

  outHandler(event: OutputEvents) {
    this.state.outputEventToObservable(event);
  }
}
