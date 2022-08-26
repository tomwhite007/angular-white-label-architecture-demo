import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BookManagerModule } from './book-manager/book-manager.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedDataAccessBooksModule } from '@ui-output-bus/shared/data-access-books';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BookManagerModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}, {}),
    SharedDataAccessBooksModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
