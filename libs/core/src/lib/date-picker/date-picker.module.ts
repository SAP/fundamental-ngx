import { NgModule } from '@angular/core';

import { DatePickerComponent } from './date-picker.component';
import { DeprecatedDatePickerCompactDirective } from './deprecated-date-picker-compact.directive';
import { DatePickerMobileComponent } from './date-picker-mobile/date-picker-mobile.component';

@NgModule({
    imports: [DatePickerComponent, DeprecatedDatePickerCompactDirective, DatePickerMobileComponent],
    exports: [DatePickerComponent, DeprecatedDatePickerCompactDirective, DatePickerMobileComponent]
})
export class DatePickerModule {}
