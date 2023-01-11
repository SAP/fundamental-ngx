import { NgModule } from '@angular/core';
import {
    IgnoreClickOnSelectionDirective,
    DeprecatedIgnoreClickOnSelectionDirective
} from './ignore-click-on-selection.directive';

@NgModule({
    imports: [IgnoreClickOnSelectionDirective, DeprecatedIgnoreClickOnSelectionDirective],
    exports: [IgnoreClickOnSelectionDirective, DeprecatedIgnoreClickOnSelectionDirective]
})
export class IgnoreClickOnSelectionModule {}
