import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormSetDirective } from './form-set.directive';
import { FormControlDirective } from './form-control.directive';
import { FormItemComponent } from './form-item.component';
import { FormLabelComponent } from './form-label.component';
import { FormLegendComponent } from './form-legend.component';
import { FormMessageComponent } from './form-message.component';
import { FormGroupComponent } from './form-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [
        FormSetDirective,
        FormControlDirective,
        FormItemComponent,
        FormLabelComponent,
        FormLegendComponent,
        FormMessageComponent,
        FormGroupComponent
    ],
    declarations: [
        FormSetDirective,
        FormControlDirective,
        FormItemComponent,
        FormLabelComponent,
        FormLegendComponent,
        FormMessageComponent,
        FormGroupComponent
    ]
})
export class FormModule {}
