import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  InputGroupSearch,
  InputGroupNumber,
  InputGroup
} from './input-group';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';


@NgModule({
  declarations: [
    InputGroupSearch,
    InputGroupNumber,
    InputGroup
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    FormsModule
  ],
  exports: [
    InputGroupSearch,
    InputGroupNumber,
    InputGroup
  ]
})
export class InputGroupModule { }
