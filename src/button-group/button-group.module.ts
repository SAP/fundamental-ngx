import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroup, ButtonGrouped } from './button-group';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonGroup, ButtonGrouped],
  declarations: [ButtonGroup, ButtonGrouped]
})
export class ButtonGroupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ButtonGroupModule,
      providers: [ButtonGroup]
    };
  }
}
