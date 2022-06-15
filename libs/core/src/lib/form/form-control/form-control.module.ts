import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { InputFormControlDirective } from './input-form-control.directive';
import { DeprecatedFormControlContentDensityDirective } from './deprecated-form-control-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ContentDensityModule],
    exports: [
        FormControlComponent,
        InputFormControlDirective,
        DeprecatedFormControlContentDensityDirective,
        ContentDensityModule
    ],
    declarations: [FormControlComponent, InputFormControlDirective, DeprecatedFormControlContentDensityDirective]
})
export class FormControlModule {}
