import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormLegendDirective } from './form-legend.directive';

@NgModule({
    imports: [CommonModule],
    exports: [FormLegendDirective],
    declarations: [FormLegendDirective]
})
export class FormLegendModule {}
