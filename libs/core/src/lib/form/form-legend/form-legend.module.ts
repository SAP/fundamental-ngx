import { NgModule } from '@angular/core';
import { FormLegendDirective } from './form-legend.directive';

/**
 * @deprecated
 * Import `FormLegendDirective` directly as a standalone directive.
 */
@NgModule({
    imports: [FormLegendDirective],
    exports: [FormLegendDirective]
})
export class FormLegendModule {}
