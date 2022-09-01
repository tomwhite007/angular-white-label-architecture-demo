import { InjectionToken } from '@angular/core';
import { ExtendableEnvironment } from '../interfaces/extendable-environment';

export const EnvironmentToken = new InjectionToken<ExtendableEnvironment>(
  'EnvironmentToken'
);
