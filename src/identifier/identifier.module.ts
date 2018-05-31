import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Identifier } from './identifier';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    Identifier
  ],
  declarations: [
    Identifier
  ]
})
export class IdentifierModule { }
