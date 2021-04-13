import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { BooksFacade } from './+state/books.facade';
import { BooksEntity } from './+state/books.models';
import { combineLatest, Observable, of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

interface LocalState {
  showForm: boolean;
  selectedTab: number;
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

@Injectable()
export class AppComponentStateService extends ComponentStore<LocalState> {
  form: FormGroup;

  vm$;

  readonly selectedTab$ = this.select((state) => state.selectedTab);

  constructor(private books: BooksFacade, private formBuilder: FormBuilder) {
    super({
      showForm: false,
      selectedTab: 0,
    });

    this.form = this.formBuilder.group({
      name: [''],
    });

    // this.form.patchValue({ name: 'test' });

    this.vm$ = this.select(
      combineLatest([
        of('test1'),
        of('test2'),
        of('test4'),
        of('test5'),
        of('test6'),
        of('test7'),
        of('test8'),
      ]),
      (res) => ({
        ...res,
      })
    );

    this.form.get('name').statusChanges.subscribe((res) => console.log(res));
  }

  // Updaters

  readonly toggleShowForm = this.updater((state) => ({
    ...state,
    showForm: !state.showForm,
  }));

  readonly setSelectedTab = this.updater((state, tabNo: number) => ({
    ...state,
    selectedTab: tabNo,
  }));

  // Effects

  readonly updateGoogleAnalyticsWithTabSelected = this.effect(
    (selectedTab$: Observable<number>) => {
      return selectedTab$.pipe(
        tap((tab) => {
          window.dataLayer = window.dataLayer || [];
          // fake Google Analytics event
          window.dataLayer.push({
            event: 'tabSelected',
            value: tab,
          });

          console.log('window.dataLayer', window.dataLayer);
        })
      );
    }
  )(this.selectedTab$);

  // Global state

  upsertBook(book: BooksEntity) {
    this.books.upsertBook(book);
  }
}
