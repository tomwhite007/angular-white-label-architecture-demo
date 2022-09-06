import { Inject, Injectable } from '@angular/core';
import {
  DefaultEnvironment,
  ExtendableEnvironment,
} from '../interfaces/extendable-environment';
import { ENVIRONMENT_TOKEN } from '../shared-util-config.module';

@Injectable()
export class ConfigService<T extends DefaultEnvironment> {
  constructor(
    @Inject(ENVIRONMENT_TOKEN)
    public readonly environment: ExtendableEnvironment<T>
  ) {}
}
