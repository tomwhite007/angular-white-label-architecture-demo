import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendableEnvironment } from './interfaces/extendable-environment';
import { ConfigService } from './services/config.service';

export const ENVIRONMENT_TOKEN = new InjectionToken<ExtendableEnvironment>(
  'EnvironmentToken'
);

@NgModule({
  imports: [CommonModule],
})
export class SharedUtilConfigModule {
  static forRoot(
    _environment: ExtendableEnvironment
  ): ModuleWithProviders<SharedUtilConfigModule> {
    return {
      ngModule: SharedUtilConfigModule,
      providers: [
        { provide: ENVIRONMENT_TOKEN, useValue: _environment },
        {
          provide: ConfigService,
        },
      ],
    };
  }
}
