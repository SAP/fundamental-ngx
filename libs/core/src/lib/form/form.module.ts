import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { FieldSetModule } from './fieldset/fieldset.module';
import { FormControlModule } from './form-control/form-control.module';
import { FormItemModule } from './form-item/form-item.module';
import { FormLabelModule } from './form-label/form-label.module';
import { FormHeaderModule } from './form-header/form-header.module';
import { FormLegendModule } from './form-legend/form-legend.module';
import { FormMessageModule } from './form-message/form-message.module';
import { FormInputMessageGroupModule } from './form-input-message-group/form-input-message-group.module';
import { FormGroupModule } from './form-group/form-group.module';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [
        FieldSetModule,
        FormControlModule,
        FormItemModule,
        FormLabelModule,
        FormHeaderModule,
        FormLegendModule,
        FormMessageModule,
        FormInputMessageGroupModule,
        FormGroupModule
    ]
})
export class FormModule {}
