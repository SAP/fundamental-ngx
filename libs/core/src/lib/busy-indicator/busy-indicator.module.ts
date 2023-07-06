import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusyIndicatorComponent } from './busy-indicator.component';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended/busy-indicator-extended.directive';

@NgModule({
    exports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective],
    imports: [CommonModule, BusyIndicatorComponent, BusyIndicatorExtendedDirective]
})
export class BusyIndicatorModule {}
