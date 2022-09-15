import { SharedBooksEnvironment } from '@books-manager/shared/util-config';

export function environmentCommon(): Omit<
  SharedBooksEnvironment,
  'production'
> {
  return {
    flow: {
      returnToListAfterUpsert: false,
    },
    tabText: ['Book List', 'Other Book Stuff'],
  };
}
