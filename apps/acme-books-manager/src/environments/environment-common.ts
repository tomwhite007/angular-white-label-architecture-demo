import { SharedBooksEnvironment } from '@books-manager/shared/util-config';

export function environmentCommon(): Omit<
  SharedBooksEnvironment,
  'production'
> {
  return {
    flow: {
      returnToListAfterUpsert: true,
    },
    tabText: ['Catalog', 'About'],
  };
}
