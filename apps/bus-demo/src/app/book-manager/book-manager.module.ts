import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookManagerComponent } from './book-manager.component';

@NgModule({
  declarations: [BookManagerComponent],
  imports: [CommonModule],
  exports: [BookManagerComponent],
})
export class BookManagerModule {}
