import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentToken } from './tokens/environment.token';
import { ExtendableEnvironment } from './interfaces/extendable-environment';

@NgModule({
  imports: [CommonModule],
})
export class SharedUtilConfigModule {
  static forRoot(
    config: ExtendableEnvironment
  ): ModuleWithProviders<SharedUtilConfigModule> {
    return {
      ngModule: SharedUtilConfigModule,
      providers: [{ provide: EnvironmentToken, useValue: config }],
    };
  }
}
