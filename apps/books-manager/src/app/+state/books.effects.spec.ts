import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { hot } from 'jest-marbles';
import { BooksEffects } from './books.effects';
import * as BooksActions from './books.actions';
import { BooksApiService } from '../_shared/services/books-api.service';
import { Action } from '@ngrx/store';

describe('BooksEffects', () => {
  let actions: Observable<Action>;
  let effects: BooksEffects;
  const mockBooksApiService = {
    getBooks: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: BooksApiService, useValue: mockBooksApiService },
      ],
    });

    effects = TestBed.get(BooksEffects);
  });

  describe('loadBooks$', () => {
    it('should work', () => {
      const dummyBooks = [
        {
          id: '9780141199078',
          title: 'Pride and Prejudice',
        },
      ];
      mockBooksApiService.getBooks.mockReturnValue(of(dummyBooks));

      actions = hot('-a-|', { a: BooksActions.loadBooks() });

      const expected = hot('-a-|', {
        a: BooksActions.loadBooksSuccess({ books: dummyBooks }),
      });

      expect(effects.loadBooks$).toBeObservable(expected);
    });
  });
});
