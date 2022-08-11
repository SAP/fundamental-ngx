import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormModule as FdFormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { FormGroupComponent } from './form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputMessageGroupWithTemplate } from '../input-message-group-with-template/input-message-group-with-template.component';
import { FormFieldGroupComponent } from './form-field-group/form-field-group.component';
import { FormFieldControlExtrasComponent } from './form-field-extras/form-field-extras.component';
import { FormGroupHeaderComponent } from './form-group-header/form-group-header.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { FieldGroupRowValuePipe } from './pipes/field-group-row-value.pipe';
import { DeprecatedFormGroupCompactDirective } from './deprecated-form-group-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

const EXPORTABLE_DECLARATIONS = [
    FormGroupComponent,
    FormFieldComponent,
    InputMessageGroupWithTemplate,
    FormFieldGroupComponent,
    FormFieldControlExtrasComponent,
    FormGroupHeaderComponent,
    FieldGroupRowValuePipe,
    DeprecatedFormGroupCompactDirective
];

@NgModule({
    declarations: [...EXPORTABLE_DECLARATIONS],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FdFormModule,
        InlineHelpModule,
        PopoverModule,
        IconModule,
        LinkModule,
        ContentDensityModule
    ],
    exports: [...EXPORTABLE_DECLARATIONS, ContentDensityModule]
})
export class FdpFormGroupModule {}
