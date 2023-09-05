import { NgModule } from '@angular/core';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { FieldSetModule } from './fieldset/fieldset.module';
import { FormControlModule } from './form-control/form-control.module';
import { FormGroupModule } from './form-group/form-group.module';
import { FormHeaderModule } from './form-header/form-header.module';
import { FormInputMessageGroupModule } from './form-input-message-group/form-input-message-group.module';
import { FormItemModule } from './form-item/form-item.module';
import { FormLabelModule } from './form-label/form-label.module';
import { FormLegendModule } from './form-legend/form-legend.module';
import { FormMessageModule } from './form-message/form-message.module';

@NgModule({
    imports: [PopoverModule],
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
