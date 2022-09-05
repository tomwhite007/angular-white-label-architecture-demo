import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtendableEnvironment } from './interfaces/extendable-environment';
import { ConfigService } from './services/config.service';

export const environmentToken = new InjectionToken<ExtendableEnvironment>(
  'EnvironmentToken'
);

const configServiceFactory = (_environment: ExtendableEnvironment) => () =>
  new ConfigService(_environment);

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
        { provide: environmentToken, useValue: _environment },
        {
          provide: ConfigService,
          useFactory: configServiceFactory,
          deps: [environmentToken],
        },
      ],
    };
  }
}
