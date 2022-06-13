import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from './form-control.component';
import { TextareaFormControlDirective } from './textarea-form-control.directive';
import { InputFormControlDirective } from './input-form-control.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ContentDensityModule],
    exports: [FormControlComponent, TextareaFormControlDirective, InputFormControlDirective, ContentDensityModule],
    declarations: [FormControlComponent, TextareaFormControlDirective, InputFormControlDirective]
})
export class FormControlModule {}
