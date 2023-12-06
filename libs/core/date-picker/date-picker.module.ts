import { NgModule } from '@angular/core';

import { DatePickerMobileComponent } from './date-picker-mobile/date-picker-mobile.component';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
    imports: [DatePickerComponent, DatePickerMobileComponent],
    exports: [DatePickerComponent, DatePickerMobileComponent]
})
export class DatePickerModule {}
