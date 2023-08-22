import { Component, ViewEncapsulation } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

@Component({
    selector: 'fd-date-picker-mobile-mode-example',
    templateUrl: './date-picker-mobile-mode-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DatePickerMobileModeExampleComponent {
    selectedRange1: Nullable<DateRange<FdDate>>;
    selectedRange2: Nullable<DateRange<FdDate>>;
    mobileLandscapeConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '640px',
            height: '360px'
        }
    };

    mobilePortraitConfig: MobileModeConfig = {
        title: 'Choose date',
        approveButtonText: 'Approve',
        cancelButtonText: 'Cancel',
        hasCloseButton: true,
        dialogConfig: {
            ariaLabel: 'Choose date',
            width: '320px',
            height: '640px',
            disablePaddings: false
        }
    };

    constructor(private datetimeAdapter: DatetimeAdapter<FdDate>) {
        const today = this.datetimeAdapter.today();
        this.selectedRange1 = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
        this.selectedRange2 = new DateRange(today, this.datetimeAdapter.addCalendarDays(today, 1));
    }
}
