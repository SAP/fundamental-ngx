import { formatDate } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    CalendarComponent,
    DatePickerComponent,
    FdDate,
    FdDatetimeModule,
    SpecialDayRule
} from '@fundamental-ngx/core';

interface ICustomData {
    date: string;
    active: boolean;
}

export class DateUtil {
    public static readonly EDM_DATE_FORMAT = 'yyyy-MM-dd';

    public static getEdmDateFormat(date: Date): string {
        return formatDate(date, DateUtil.EDM_DATE_FORMAT, 'en');
    }

    public static getDateFromFdDate(fdDate: FdDate): Date {
        return new Date(fdDate.year, fdDate.month - 1, fdDate.day, fdDate.hour, fdDate.minute, fdDate.second);
    }
}

@Component({
    selector: 'fd-ngx-date-picker-special-day-example',
    imports: [DatePickerComponent, ReactiveFormsModule, FormsModule, FdDatetimeModule, CalendarComponent],
    templateUrl: './date-picker-special-day-example.component.html',
    styleUrl: './date-picker-special-day-example.component.scss'
})
export class DatePickerSpecialDayExampleComponent<D> {
    customDate = new FdDate(2024, 8, 28);
    firstRule = {
        specialDayNumber: 6,
        rule: (): boolean => false
    };

    secondRule = {
        specialDayNumber: 1,
        rule: (): boolean => false
    };

    specialDaysRulesSignal: WritableSignal<Array<SpecialDayRule<FdDate>>> = signal([this.firstRule, this.secondRule]);

    customDataList: ICustomData[] = [
        {
            date: '2024-08-28',
            active: true
        },
        {
            date: '2024-08-29',
            active: false
        },
        {
            date: '2024-08-30',
            active: true
        },
        {
            date: '2024-08-31',
            active: false
        },
        {
            date: '2024-09-01',
            active: false
        },
        {
            date: '2024-09-02',
            active: true
        }
    ];

    onOpenChange(isOpen: boolean): void {
        this.specialDaysRulesSignal.set([]);
        if (isOpen) {
            this.specialDaysRulesSignal.set([
                {
                    ...this.firstRule,
                    rule: (date: FdDate): boolean =>
                        Boolean(
                            this.customDataList.find(
                                (customData) =>
                                    DateUtil.getEdmDateFormat(DateUtil.getDateFromFdDate(date)) === customData.date &&
                                    customData.active
                            )
                        )
                },
                {
                    ...this.secondRule,
                    rule: (date: FdDate): boolean =>
                        Boolean(
                            this.customDataList.find(
                                (customData) =>
                                    DateUtil.getEdmDateFormat(DateUtil.getDateFromFdDate(date)) === customData.date &&
                                    !customData.active
                            )
                        )
                }
            ]);
        }
    }
}
