import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { SharedUiBooksModule } from '@books-manager/shared/ui-books';
import { RouterModule } from '@angular/router';

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
export class AcmeFeatureBooksManagerModule {}
