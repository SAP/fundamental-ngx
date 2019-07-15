import { Component, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarI18nLabels } from '../i18n/calendar-i18n-labels';
import { CalendarI18n } from '../i18n/calendar-i18n';
import { FdDate } from './models/fd-date';
import { CalendarCurrent } from './models/calendar-current';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar2DayViewComponent } from './calendar2-views/calendar2-day-view/calendar2-day-view.component';
import { DateFormatParser } from '../format/date-parser';
import { Calendar2Service } from './calendar2.service';

let calendarUniqueId: number = 0;

/** Type of calendar */
export type CalendarType = 'single' | 'range';

/** Type for the calendar view */
export type FdCalendarView = 'day' | 'month' | 'year';

/** Type for the days of the week. */
export type DaysOfWeek = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Months: 1 = January, 12 = december.
 * Days: 1 = Sunday, 7 = Saturday
 */
@Component({
    selector: 'fd-calendar2',
    templateUrl: './calendar2.component.html',
    styleUrls: ['./calendar2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => Calendar2Component),
            multi: true
        }
    ]
})
export class Calendar2Component implements OnInit, ControlValueAccessor {

    @ViewChild('dayViewComponent') dayViewComponent: Calendar2DayViewComponent;

    invalidDate: boolean = false;

    @Input()
    public selectedDate: FdDate = FdDate.getToday();

    @Input()
    public selectedRangeDate: { start: FdDate, end: FdDate };

    @Input()
    public activeView: FdCalendarView = 'day';

    /** The day of the week the calendar should start on. 0 represents Sunday, 1 is Monday, 2 is Tuesday, and so on. */
    @Input()
    public startingDayOfWeek: DaysOfWeek = 1;

    @Input()
    public set stringDate(str: string) {
        this.dateStringUpdate(str);
    }

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    calType: CalendarType = 'single';

    @HostBinding('class.fd-calendar')
    private fdCalendarClass: boolean = true;

    @HostBinding('style.display')
    private displayStyle: string = 'block';

    currentlyDisplayed: CalendarCurrent;

    /** Id of the calendar. If none is provided, one will be generated. */
    @Input()
    id = 'fd-calendar-' + calendarUniqueId++;

    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView>
        = new EventEmitter<FdCalendarView>();

    @Output()
    selectedDateChange = new EventEmitter<FdDate>();

    @Output()
    selectedRangeDateChange = new EventEmitter<{ start: FdDate, end: FdDate }>();

    @Output()
    dateValidityChanged = new EventEmitter<{ isValid: boolean }>();

    calendarYearList: number[];
    currentYear = new Date().getFullYear();

    /**
     * Function used to disable certain dates in the calendar.
     * @param d Date
     */
    @Input()
    disableFunction = function (d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    disableRangeStartFunction = function (d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    disableRangeEndFunction = function (d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    blockRangeStartFunction = function (d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    blockRangeEndFunction = function (d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar.
     * @param d Date
     */
    @Input()
    blockFunction = function (d): boolean {
        return false;
    };

    /** @hidden */
    onChange: Function = () => { };
    /** @hidden */
    onTouched: Function = () => { };

    @Input()
    escapeFocusFunction: Function = () => {
        if (document.getElementById(this.id + '-left-arrow')) {
            document.getElementById(this.id + '-left-arrow').focus();
        }
    };

    constructor(public calendarI18nLabels: CalendarI18nLabels,
        public calendarI18n: CalendarI18n,
        public dateAdapter: DateFormatParser,
        private service: Calendar2Service) {
    }

    ngOnInit() {
        this.prepareDisplayedView();
        this.constructYearList();
    }

    /** Function that provides  */
    writeValue(selected: { date?: FdDate, start?: FdDate, end?: FdDate }): void {
        if (selected) {
            if (selected.date && this.calType === 'single') {
                this.selectedDate = selected.date;
            }
            if ((selected.start || selected.end) && this.calType === 'range') {
                this.selectedRangeDate = { start: selected.start, end: selected.end };
            }
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        // Not needed
    }

    public selectedDateChanged(date: FdDate) {
        this.selectedDate = date;
        this.onChange({ date: date });
        this.selectedDateChange.emit(date);
    }

    public selectedRangeDateChanged(dates: { start: FdDate, end: FdDate }) {
        this.selectedRangeDate = dates;
        this.onChange(dates);
        this.selectedRangeDateChange.emit(dates);
    }

    public handleNextClicked() {
        switch (this.activeView) {
            case ('day'): {
                this.displayNextMonth();
                break;
            }
            case ('year'): {
                this.displayNextYearSet();
                break;
            }
        }
    }

    public handlePreviousClicked() {
        switch (this.activeView) {
            case ('day'): {
                this.displayPreviousMonth();
                break;
            }
            case ('year'): {
                this.displayPreviousYearSet();
                break;
            }
        }
    }

    public displayNextMonth() {
        if (this.currentlyDisplayed.month === 12) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year + 1, month: 1 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month + 1 };
        }
    }

    public displayPreviousMonth() {
        if (this.currentlyDisplayed.month <= 1) {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year - 1, month: 12 };
        } else {
            this.currentlyDisplayed = { year: this.currentlyDisplayed.year, month: this.currentlyDisplayed.month - 1 };
        }
    }

    private constructYearList() {
        this.calendarYearList = [];
        for (let x = 0; x < 12; x++) {
            this.calendarYearList.push(this.currentYear + x);
        }
    }

    public displayNextYearSet() {
        this.currentYear += 12;
        this.constructYearList();
    }

    public displayPreviousYearSet() {
        this.currentYear -= 12;
        this.constructYearList();
    }

    public handleRegenerateYearList(direction: string) {
        if (direction === 'nextSet') {
            this.displayNextYearSet();

        } else if (direction === 'previousSet') {
            this.displayPreviousYearSet();
        }
    }


    /** @hidden */
    dateStringUpdate(date: string) {
        if (this.calType === 'single') {
            const fdDate = this.service.convertDateToFDDate(this.dateAdapter.parse(date));

            this.invalidDate = !this.validateDateFromDatePicker(fdDate);
            if (!this.invalidDate) {
                this.selectedDate = fdDate;
                this.setCurrentlyDisplayed(fdDate)
            } else {
                this.selectedDate = FdDate.getToday();
                this.setCurrentlyDisplayed(this.selectedDate);
            }
        } else {
            const currentDates = date.split(this.dateAdapter.rangeDelimiter);
            const firstDate = this.service.convertDateToFDDate(this.dateAdapter.parse(currentDates[0]));
            const secondDate = this.service.convertDateToFDDate(this.dateAdapter.parse(currentDates[1]));
            this.invalidDate =
                !this.validateDateFromDatePicker(firstDate) || !this.validateDateFromDatePicker(secondDate);

            if (!this.invalidDate) {
                if (firstDate.toDate().getTime() > secondDate.toDate().getTime()) {
                    this.selectedRangeDate = { start: firstDate, end: secondDate }
                } else {
                    this.selectedRangeDate = { start: secondDate, end: firstDate }
                }
                this.setCurrentlyDisplayed(this.selectedRangeDate.start);
            }
        }

        this.dateValidityChanged.emit({ isValid: !this.invalidDate });

    }

    private setCurrentlyDisplayed(fdDate: FdDate) {
        this.currentlyDisplayed = { month: fdDate.month, year: fdDate.year };
    }

    private validateDateFromDatePicker(date: FdDate): boolean {
        if (!date) {
            return false;
        }

        if (!date.year || !date.month || !date.day) {
            return false;
        }

        if (date.year < 1000 || date.year > 3000 || date.month < 1 || date.month > 12) {
            return false;
        }

        if (date.day < 1 || date.day > this.service.getDaysInMonth(date.month, date.year)) {
            return false;
        }

        return true;
    }

    private prepareDisplayedView(): void {
        if (this.selectedDate && this.selectedDate.month && this.selectedDate.year) {
            this.currentlyDisplayed = { month: this.selectedDate.month, year: this.selectedDate.year };
        } else {
            const tempDate = FdDate.getToday();
            this.currentlyDisplayed = { month: tempDate.month, year: tempDate.year };
        }
    }

    public selectedYear(yearSelected: number) {
        console.log(`you clicked ${yearSelected}`);
        this.activeView = 'day';
        this.currentlyDisplayed.year = yearSelected;
    }

}
