import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ExperimentalFieldSetModule } from './fieldset/fieldset.module';
import { ExperimentalFormControlModule } from './form-control/form-control.module';
import { ExperimentalFormItemModule } from './form-item/form-item.module';
import { ExperimentalFormLabelModule } from './form-label/form-label.module';
import { ExperimentalFormHeaderModule } from './form-header/form-header.module';
import { ExperimentalFormLegendModule } from './form-legend/form-legend.module';
import { ExperimentalFormMessageModule } from './form-message/form-message.module';
import { ExperimentalFormInputMessageGroupModule } from './form-input-message-group/form-input-message-group.module';
import { ExperimentalFormGroupModule } from './form-group/form-group.module';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [
        ExperimentalFieldSetModule,
        ExperimentalFormControlModule,
        ExperimentalFormItemModule,
        ExperimentalFormLabelModule,
        ExperimentalFormHeaderModule,
        ExperimentalFormLegendModule,
        ExperimentalFormMessageModule,
        ExperimentalFormInputMessageGroupModule,
        ExperimentalFormGroupModule
    ]
})
export class ExperimentalFormModule {}
