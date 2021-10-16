import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperimentalFormControlModule } from './form-control/form-control.module';
import { ExperimentalFormItemModule } from './form-item/form-item.module';
import { ExperimentalFormLabelModule } from './form-label/form-label.module';

@NgModule({
    imports: [CommonModule],
    exports: [ExperimentalFormControlModule, ExperimentalFormItemModule, ExperimentalFormLabelModule]
})
export class ExperimentalFormModule {}
