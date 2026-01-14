import { NgModule } from '@angular/core';
import { BusyIndicatorExtendedDirective } from './busy-indicator-extended/busy-indicator-extended.directive';
import { BusyIndicatorComponent } from './busy-indicator.component';

/**
 * @deprecated
 * Use direct import of `IconComponent`
 */
@NgModule({
    exports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective],
    imports: [BusyIndicatorComponent, BusyIndicatorExtendedDirective]
})
export class BusyIndicatorModule {}
