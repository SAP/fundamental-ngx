import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExperimentalFormLegendDirective } from './form-legend.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ExperimentalFormLegendDirective],
    declarations: [ExperimentalFormLegendDirective]
})
export class ExperimentalFormLegendModule {}
