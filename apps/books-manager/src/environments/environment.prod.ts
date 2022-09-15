import { SharedBooksEnvironment } from '@books-manager/shared/util-config';
import { environmentCommon } from './environment-common';

export const environment: SharedBooksEnvironment = {
  production: true,
  ...environmentCommon(),
};
