import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagerComponent } from './book-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedUiBooksModule } from '@books-manager/shared/ui-books';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedUiBooksModule,
  ],
  declarations: [BookManagerComponent],
  exports: [BookManagerComponent],
})
export class BookManagerModule {}
