import { NgModule } from '@angular/core';
import { IgnoreClickOnSelectionDirective } from './ignore-click-on-selection.directive';

@NgModule({
    imports: [IgnoreClickOnSelectionDirective],
    exports: [IgnoreClickOnSelectionDirective]
})
export class IgnoreClickOnSelectionModule {}
