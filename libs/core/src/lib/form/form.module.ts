import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormControlDirective } from './form-control/form-control.directive';
import { FormItemComponent } from './form-item/form-item.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { FormLegendDirective } from './form-legend/form-legend.directive';
import { FormMessageComponent } from './form-message/form-message.component';
import { FormGroupComponent } from './form-group/form-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FieldsetComponent,
        FormControlDirective,
        FormItemComponent,
        FormLabelComponent,
        FormLegendDirective,
        FormMessageComponent,
        FormGroupComponent
    ],
    declarations: [
        FieldsetComponent,
        FormControlDirective,
        FormItemComponent,
        FormLabelComponent,
        FormLegendDirective,
        FormMessageComponent,
        FormGroupComponent
    ]
})
export class FormModule {}
