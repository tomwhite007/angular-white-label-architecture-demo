import { Inject, Injectable } from '@angular/core';
import { ExtendableEnvironment } from '../interfaces/extendable-environment';
import { ENVIRONMENT_TOKEN } from '../shared-util-config.module';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(ENVIRONMENT_TOKEN)
    public readonly environment: ExtendableEnvironment
  ) {}
}
