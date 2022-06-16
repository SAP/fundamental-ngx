import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { InputFormControlDirective } from './input-form-control.directive';
import { DeprecatedFormControlContentDensityDirective } from './deprecated-form-control-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { TextareaFormControlDirective } from './textarea-form-control.directive';

@NgModule({
    imports: [CommonModule, ContentDensityModule],
    exports: [
        FormControlComponent,
        InputFormControlDirective,
        TextareaFormControlDirective,
        DeprecatedFormControlContentDensityDirective,
        ContentDensityModule
    ],
    declarations: [
        FormControlComponent,
        InputFormControlDirective,
        TextareaFormControlDirective,
        DeprecatedFormControlContentDensityDirective
    ]
})
export class FormControlModule {}
