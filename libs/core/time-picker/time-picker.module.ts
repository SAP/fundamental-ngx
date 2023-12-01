import { NgModule } from '@angular/core';

import { TimePickerComponent } from './time-picker.component';

/**
 * @deprecated
 * Use direct import of `TimePickerComponent`
 */
@NgModule({
    imports: [TimePickerComponent],
    exports: [TimePickerComponent]
})
export class TimePickerModule {}
