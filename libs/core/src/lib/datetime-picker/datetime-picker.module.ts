import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { FormsModule } from '@angular/forms';
import { DatetimePickerComponent } from './datetime-picker.component';
import { TimeModule } from '@fundamental-ngx/core/time';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DeprecatedDateTimePickerContentDensityDirective } from './deprecated-date-time-picker-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [DatetimePickerComponent, DeprecatedDateTimePickerContentDensityDirective],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        CalendarModule,
        FormsModule,
        TimeModule,
        InputGroupModule,
        ButtonModule,
        BarModule,
        SegmentedButtonModule,
        FormMessageModule,
        ContentDensityModule
    ],
    exports: [DatetimePickerComponent, DeprecatedDateTimePickerContentDensityDirective, ContentDensityModule]
})
export class DatetimePickerModule {}
