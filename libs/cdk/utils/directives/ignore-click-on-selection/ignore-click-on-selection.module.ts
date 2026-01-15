import { NgModule } from '@angular/core';
import { IgnoreClickOnSelectionDirective } from './ignore-click-on-selection.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [IgnoreClickOnSelectionDirective],
    exports: [IgnoreClickOnSelectionDirective]
})
export class IgnoreClickOnSelectionModule {}
