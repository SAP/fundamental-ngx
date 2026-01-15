import { NgModule } from '@angular/core';
import { StatusIndicatorComponent } from './status-indicator.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [StatusIndicatorComponent],
    exports: [StatusIndicatorComponent]
})
export class StatusIndicatorModule {}
