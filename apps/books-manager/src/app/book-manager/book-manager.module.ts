import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagerComponent } from './book-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookStuffComponent } from './book-stuff/book-stuff.component';
import { ShowFormCheckboxComponent } from './show-form-checkbox/show-form-checkbox.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    BookManagerComponent,
    BookListComponent,
    AddBookFormComponent,
    BookStuffComponent,
    ShowFormCheckboxComponent,
    TabsComponent,
  ],
  exports: [BookManagerComponent],
})
export class BookManagerModule {}
