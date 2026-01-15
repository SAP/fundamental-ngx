import { NgModule } from '@angular/core';
import { FieldsetComponent } from './fieldset/fieldset.component';
import { FormControlComponent } from './form-control/form-control.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormHeaderComponent } from './form-header/form-header.component';
import { FormInputMessageGroupComponent } from './form-input-message-group/form-input-message-group.component';
import { FormItemComponent } from './form-item/form-item.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { FormLegendDirective } from './form-legend/form-legend.directive';
import { FormMessageComponent } from './form-message/form-message.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        FieldsetComponent,
        FormControlComponent,
        FormItemComponent,
        FormItemComponent,
        FormLabelComponent,
        FormHeaderComponent,
        FormLegendDirective,
        FormMessageComponent,
        FormInputMessageGroupComponent,
        FormGroupComponent
    ],
    exports: [
        FieldsetComponent,
        FormControlComponent,
        FormItemComponent,
        FormItemComponent,
        FormLabelComponent,
        FormHeaderComponent,
        FormLegendDirective,
        FormMessageComponent,
        FormInputMessageGroupComponent,
        FormGroupComponent
    ]
})
export class FormModule {}
