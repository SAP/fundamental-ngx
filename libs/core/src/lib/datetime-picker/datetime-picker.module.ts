import { NgModule } from '@angular/core';
import { DatetimePickerComponent } from './datetime-picker.component';
import { DeprecatedDateTimePickerContentDensityDirective } from './deprecated-date-time-picker-content-density.directive';
import { DatetimePickerMobileComponent } from './datetime-picker-mobile/datetime-picker-mobile.component';

@NgModule({
    imports: [DatetimePickerComponent, DeprecatedDateTimePickerContentDensityDirective, DatetimePickerMobileComponent],
    exports: [DatetimePickerComponent, DeprecatedDateTimePickerContentDensityDirective, DatetimePickerMobileComponent]
})
export class DatetimePickerModule {}
