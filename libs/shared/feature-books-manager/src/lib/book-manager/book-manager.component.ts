import { Component, OnInit } from '@angular/core';
import { BookManagerStateService } from './services/book-manager-state.service';
import { BookManagerComponentService } from './services/book-manager-component.service';

@Component({
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
  providers: [BookManagerStateService, BookManagerComponentService],
})
export class BookManagerComponent implements OnInit {
  constructor(public cs: BookManagerComponentService) {}

  ngOnInit() {
    this.cs.init();
  }
}
