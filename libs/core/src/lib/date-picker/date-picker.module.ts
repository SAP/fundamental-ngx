import { NgModule } from '@angular/core';

import { DatePickerComponent } from './date-picker.component';
import { DatePickerMobileComponent } from './date-picker-mobile/date-picker-mobile.component';

@NgModule({
    imports: [DatePickerComponent, DatePickerMobileComponent],
    exports: [DatePickerComponent, DatePickerMobileComponent]
})
export class DatePickerModule {}
