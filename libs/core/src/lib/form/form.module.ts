import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSetDirective } from './form-set/form-set.directive';
import { FormControlDirective } from './form-control/form-control.directive';
import { FormItemDirective } from './form-item/form-item.directive';
import { FormLabelDirective } from './form-label/form-label.directive';
import { FormLegendDirective } from './form-legend/form-legend.directive';
import { FormMessageComponent } from './form-message/form-message.component';
import { FormGroupComponent } from './form-group/form-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FormSetDirective,
        FormControlDirective,
        FormItemDirective,
        FormLabelDirective,
        FormLegendDirective,
        FormMessageComponent,
        FormGroupComponent
    ],
    declarations: [
        FormSetDirective,
        FormControlDirective,
        FormItemDirective,
        FormLabelDirective,
        FormLegendDirective,
        FormMessageComponent,
        FormGroupComponent
    ]
})
export class FormModule {}
