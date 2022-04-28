import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IgnoreClickOnSelectionDirective } from './ignore-click-on-selection.directive';

@NgModule({
    declarations: [IgnoreClickOnSelectionDirective],
    imports: [CommonModule],
    exports: [IgnoreClickOnSelectionDirective]
})
export class IgnoreClickOnSelectionModule {}
