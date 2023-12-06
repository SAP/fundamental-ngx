import { NgModule } from '@angular/core';

import { TimeColumnComponent } from './time-column/time-column.component';
import { TimeComponent } from './time.component';

/**
 * @deprecated
 * Use direct imports of `TimeComponent`, `TimeColumnComponent`
 */
@NgModule({
    imports: [TimeComponent, TimeColumnComponent],
    exports: [TimeComponent, TimeColumnComponent]
})
export class TimeModule {}
