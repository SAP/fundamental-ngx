import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlDirective } from './form-control.directive';

@NgModule({
    imports: [CommonModule],
    exports: [FormControlDirective],
    declarations: [FormControlDirective]
})
export class FormControlModule {}
