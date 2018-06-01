import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Icon } from './icon';

@NgModule({
  imports: [CommonModule],
  exports: [Icon],
  declarations: [Icon]
})
export class IconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IconModule,
      providers: [Icon]
    };
  }
}
