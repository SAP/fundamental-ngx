import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended/busy-indicator-extended.directive';
import { BusyIndicatorComponent } from './busy-indicator.component';

@NgModule({
    exports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective],
    imports: [CommonModule, BusyIndicatorComponent, BusyIndicatorExtendedDirective]
})
export class BusyIndicatorModule {}
