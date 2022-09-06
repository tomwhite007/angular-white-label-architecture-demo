import { Component, OnInit } from '@angular/core';
import {
  BookManagerComponentService,
  BookManagerStateService,
} from '@books-manager/shared/feature-books-manager';

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
