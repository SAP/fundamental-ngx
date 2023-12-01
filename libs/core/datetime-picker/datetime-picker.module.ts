import { NgModule } from '@angular/core';
import { DatetimePickerMobileComponent } from './datetime-picker-mobile/datetime-picker-mobile.component';
import { DatetimePickerComponent } from './datetime-picker.component';

@NgModule({
    imports: [DatetimePickerComponent, DatetimePickerMobileComponent],
    exports: [DatetimePickerComponent, DatetimePickerMobileComponent]
})
export class DatetimePickerModule {}
