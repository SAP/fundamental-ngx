import { NgModule, ModuleWithProviders } from '@angular/core';
import { ThemingConfig, UI5_THEMING_CONFIGURATION } from './ui5-theming.models';

@NgModule({
  // No need to declare components or pipes here if you're using standalone.
  exports: [],
})
export class Ui5ThemingModule {
  /**
   * Provides the theming configuration for the root of the application.
   */
  static forRoot(config: ThemingConfig): ModuleWithProviders<Ui5ThemingModule> {
    return {
      ngModule: Ui5ThemingModule,
      providers: [
        {
          provide: UI5_THEMING_CONFIGURATION,
          useValue: config,
        },
      ],
    };
  }
}
