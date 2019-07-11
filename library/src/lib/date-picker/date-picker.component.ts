import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateFormatParser } from '../calendar/format/date-parser';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/calendar2/models/fd-date';
import { Calendar2Service } from '../calendar/calendar2/calendar2.service';
import { Calendar2Component } from '../calendar/calendar2/calendar2.component';

@Component({
    selector: 'fd-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-date-picker]': 'true',
        '[class.fd-date-picker-custom]': 'true'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements ControlValueAccessor {

    @ViewChild(Calendar2Component) calendarComponent: Calendar2Component;

    /** @hidden The value of the input */
    inputFieldDate = null;
    /** @hidden Whether the date input is invalid */
    isInvalidDateInput: boolean = false;
    /** @hidden Whether the date picker is open */
    isOpen: boolean = false;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = 'single';

    /** Date picker input placeholder string */
    @Input()
    placeholder: string = 'mm/dd/yyyy';

    /** Whether this is the compact input date picker */
    @Input()
    compact: boolean = false;

    /** The currently selected CalendarDay model */
    @Input()
    selectedDate: FdDate;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    public selectedRangeDate: { start: FdDate, end: FdDate } = { start: null, end: null };

    /** Fired when a new date is selected. */
    @Output()
    public readonly selectedDateChange = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    public readonly selectedRangeDateChange = new EventEmitter<{ start: FdDate, end: FdDate }>();

    /** The day of the week the calendar should start on. 0 represents Sunday, 1 is Monday, 2 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: number = 0;

    /** Whether to validate the date picker input. */
    @Input() validate: boolean = true;

    /** Aria label for the datepicker input. */
    @Input()
    dateInputLabel: string = 'Date input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayCalendarToggleLabel: string = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull: boolean = true;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether the date picker is disabled. */
    @Input()
    disabled: boolean;

    /**
     * Function used to disable certain dates in the calendar.
     * @param d Date
     */
    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar.
     * @param d Date
     */
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    disableRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    disableRangeEndFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param d Date
     */
    @Input()
    blockRangeStartFunction = function(d): boolean {
        return false;
    };
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param d Date
     */
    @Input()
    blockRangeEndFunction = function(d): boolean {
        return false;
    };

    /** @hidden */
    onChange: any = (selected: any) => {
    };
    /** @hidden */
    onTouched: any = () => {
    };

    /** @hidden */
    public closeFromCalendar() {
        if (this.type === 'single') {
            console.log(this.type);
            this.closeCalendar();
        }
    }

    /** Opens the calendar */
    openCalendar(e) {
        if (!this.disabled) {
            this.onTouched({ date: this.selectedDate });
            this.isOpen = true;
        }
    }

    /** Toggles the calendar open or closed */
    public toggleCalendar(e) {
        this.onTouched({ date: this.selectedDate });
        this.isOpen = !this.isOpen;
    }

    /** Closes the calendar if it is open */
    public closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    /** @hidden */
    public handleSingleDateChange(date: FdDate) {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange({ date: date });
        }
    }

    /** @hidden */
    public handleRangeDateChange(dates: { start: FdDate, end: FdDate }) {
        if (dates &&
            (!this.calendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !this.calendarService.datesEqual(this.selectedRangeDate.end, dates.end))
        ) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end)
            ;
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange({ date: dates.start, rangeEnd: dates.end });
        }
    }

    /** @hidden */
    public handleInputChange(strDate: string) {
        this.dateStringUpdate(strDate);
    }

    /** @hidden */
    constructor(
        public dateAdapter: DateFormatParser,
        private changeDetRef: ChangeDetectorRef,
        private calendarService: Calendar2Service
    ) {
    }

    /** @hidden */
    registerOnChange(fn: (selected: any) => { void }): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    writeValue(selected: { date: FdDate, rangeEnd?: FdDate }): void {
        if (!selected) {
            return;
        }
        if (this.type.toLocaleLowerCase() === 'single') {
            this.selectedDate = selected.date;
            if (selected.date !== null) {
                this.calendarComponent.setCurrentlyDisplayed(this.selectedDate);
                this.inputFieldDate = this.dateAdapter.format(selected.date);
            } else {
                this.inputFieldDate = '';
            }
        } else {
            this.selectedRangeDate = { start: selected.date, end: selected.rangeEnd };
            if (selected.date !== null) {
                this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                this.inputFieldDate = this.dateAdapter.format(selected.date) +
                    this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.rangeEnd);
            } else {
                this.inputFieldDate = '';
            }
        }
    }

    /** @hidden */
    dateStringUpdate(date: string) {
        if (date) {
            if (this.type === 'single') {
                const fdDate = this.dateAdapter.parse(date);
                this.isInvalidDateInput = !this.calendarService.validateDateFromDatePicker(fdDate);

                // If is correct and data is not exactly the same
                if (!this.isInvalidDateInput && !this.calendarService.datesEqual(fdDate, this.selectedDate)) {
                    this.selectedDate = fdDate;
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                    this.onChange({ date: this.selectedDate });
                    this.selectedDateChange.emit(this.selectedDate);
                } else {
                    this.selectedDate = FdDate.getToday();
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                }
            } else {
                const currentDates = date.split(this.dateAdapter.rangeDelimiter);
                const firstDate = this.dateAdapter.parse(currentDates[0]);
                const secondDate = this.dateAdapter.parse(currentDates[1]);
                this.isInvalidDateInput =
                    !this.calendarService.validateDateFromDatePicker(firstDate) ||
                    !this.calendarService.validateDateFromDatePicker(secondDate);

                // If is correct and data is not exactly the same
                if (!this.isInvalidDateInput &&
                    (!this.calendarService.datesEqual(firstDate, this.selectedRangeDate.start) ||
                        !this.calendarService.datesEqual(secondDate, this.selectedRangeDate.end))) {

                    if (firstDate.toDate().getTime() > secondDate.toDate().getTime()) {
                        this.selectedRangeDate = { start: secondDate, end: firstDate };
                    } else {
                        this.selectedRangeDate = { start: firstDate, end: secondDate };
                    }

                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.onChange({ date: this.selectedRangeDate.start, rangeEnd: this.selectedRangeDate.end });
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                }
            }
        }
    }

}
