import { NgModule } from '@angular/core';
import { BusyIndicatorComponent } from './busy-indicator.component';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended/busy-indicator-extended.directive';

@NgModule({
    exports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective],
    imports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective]
})
export class BusyIndicatorModule {}
