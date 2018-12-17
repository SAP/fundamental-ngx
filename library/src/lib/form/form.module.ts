import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSetDirective } from './form-set.directive';
import { FormControlDirective } from './form-control.directive';
import { FormItemDirective } from './form-item.directive';
import { FormLabelComponent } from './form-label.component';
import { FormLegendComponent } from './form-legend.component';
import { FormMessageComponent } from './form-message.component';
import { FormGroupComponent } from './form-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FormSetDirective,
        FormControlDirective,
        FormItemDirective,
        FormLabelComponent,
        FormLegendComponent,
        FormMessageComponent,
        FormGroupComponent
    ],
    declarations: [
        FormSetDirective,
        FormControlDirective,
        FormItemDirective,
        FormLabelComponent,
        FormLegendComponent,
        FormMessageComponent,
        FormGroupComponent
    ]
})
export class FormModule {}
