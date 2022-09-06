import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BooksEffects } from './+state/books.effects';
import * as fromBooks from './+state/books.reducer';
import { BooksFacade } from './+state/books.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromBooks.BOOKS_FEATURE_KEY, fromBooks.reducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  providers: [BooksFacade],
})
export class SharedDataAccessBooksModule {}
