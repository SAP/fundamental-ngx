import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControlModule } from './form-control/form-control.module';
import { FormItemModule } from './form-item/form-item.module';
import { FormLabelModule } from './form-label/form-label.module';

@NgModule({
    imports: [CommonModule],
    exports: [FormControlModule, FormItemModule, FormLabelModule]
})
export class FormModule {}
