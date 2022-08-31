import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { SharedUiBooksModule } from '@books-manager/shared/ui-books';

@NgModule({
  declarations: [BookManagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: BookManagerComponent },
    ]),
    SharedUiBooksModule,
  ],
})
export class SharedFeatureBooksManagerModule {}
