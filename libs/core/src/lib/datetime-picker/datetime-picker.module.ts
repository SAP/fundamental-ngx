import { NgModule } from '@angular/core';
import { DatetimePickerComponent } from './datetime-picker.component';
import { DatetimePickerMobileComponent } from './datetime-picker-mobile/datetime-picker-mobile.component';

@NgModule({
    imports: [DatetimePickerComponent, DatetimePickerMobileComponent],
    exports: [DatetimePickerComponent, DatetimePickerMobileComponent]
})
export class DatetimePickerModule {}
