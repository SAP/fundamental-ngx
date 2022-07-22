import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { FormsModule } from '@angular/forms';

import { DatePickerComponent } from './date-picker.component';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { I18nModule } from '@fundamental-ngx/i18n';
import { DeprecatedDatePickerCompactDirective } from './deprecated-date-picker-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [DatePickerComponent, DeprecatedDatePickerCompactDirective],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        I18nModule,
        CalendarModule,
        FormsModule,
        InputGroupModule,
        ButtonModule,
        FormMessageModule,
        ContentDensityModule
    ],
    exports: [DatePickerComponent, DeprecatedDatePickerCompactDirective, ContentDensityModule]
})
export class DatePickerModule {}
