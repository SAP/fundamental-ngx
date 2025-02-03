import { NgModule } from '@angular/core';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended/busy-indicator-extended.directive';
import { BusyIndicatorComponent } from './busy-indicator.component';

@NgModule({
    exports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective],
    imports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective]
})
export class BusyIndicatorModule {}
