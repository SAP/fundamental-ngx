import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarType, FdCalendarView } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { FdRangeDate } from '../calendar/models/fd-range-date';
import { DateFormatParser } from './format/date-parser';

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

    /** @hidden The value of the input */
    inputFieldDate = null;

    /** @hidden Whether the date input is invalid */
    isInvalidDateInput: boolean = false;

    /** @hidden Whether the date picker is open */
    isOpen: boolean = false;

    /** @hidden */
    @ViewChild(CalendarComponent) calendarComponent: CalendarComponent;

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
    public selectedRangeDate: FdRangeDate = { start: null, end: null };

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

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    public activeView: FdCalendarView = 'day';

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether the date picker is disabled. */
    @Input()
    disabled: boolean;

    /** Fired when a new date is selected. */
    @Output()
    public readonly selectedDateChange: EventEmitter<FdDate> = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    public readonly selectedRangeDateChange: EventEmitter<FdRangeDate> = new EventEmitter<FdRangeDate>();

    /** Event thrown every time calendar active view is changed */
    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** @hidden */
    onChange: any = (selected: any) => {
    };

    /** @hidden */
    onTouched: any = () => {
    };

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeStartFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeEndFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    blockRangeStartFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    blockRangeEndFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    blockFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Method that handle calendar active view change and throws event.
     */
    public handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** @hidden */
    public closeFromCalendar(): void {
        if (this.type === 'single') {
            this.closeCalendar();
        }
    }

    /** Opens the calendar */
    openCalendar(): void {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }

    /** Toggles the calendar open or closed */
    public toggleCalendar(): void {
        this.onTouched();
        this.isOpen = !this.isOpen;
    }

    /** Closes the calendar if it is open */
    public closeCalendar(): void {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    public handleSingleDateChange(date: FdDate): void {
        if (date) {
            this.inputFieldDate = this.dateAdapter.format(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    public handleRangeDateChange(dates: FdRangeDate): void {
        if (dates &&
            (!CalendarService.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !CalendarService.datesEqual(this.selectedRangeDate.end, dates.end))
        ) {
            this.inputFieldDate = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end)
            ;
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
        }
    }

    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    public handleInputChange(strDate: string): void {
        this.dateStringUpdate(strDate);
    }

    /** @hidden */
    constructor(
        public dateAdapter: DateFormatParser
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

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    writeValue(selected: FdRangeDate | FdDate): void {
        if (!selected) {
            this.inputFieldDate = '';
            return;
        }
        if (this.type.toLocaleLowerCase() === 'single') {
            selected = <FdDate>selected;
            this.selectedDate = selected;
            this.calendarComponent.setCurrentlyDisplayed(this.selectedDate);
            this.inputFieldDate = this.dateAdapter.format(selected);
        } else {
            selected = <FdRangeDate>selected;
            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };
                this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                this.inputFieldDate = this.dateAdapter.format(selected.start) +
                    this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.end)
                ;
            } else {
                this.inputFieldDate = '';
            }
        }
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     * */
    dateStringUpdate(date: string): void {
        if (date) {
            if (this.type === 'single') {
                const fdDate = this.dateAdapter.parse(date);
                this.isInvalidDateInput = !fdDate.isDateValid();

                // If is correct and data is not exactly the same
                if (!this.isInvalidDateInput && !CalendarService.datesEqual(fdDate, this.selectedDate)) {
                    this.selectedDate = fdDate;
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                    this.onChange(this.selectedDate);
                    this.selectedDateChange.emit(this.selectedDate);
                } else {

                }
            } else {
                const currentDates = date.split(this.dateAdapter.rangeDelimiter);
                const firstDate = this.dateAdapter.parse(currentDates[0]);
                const secondDate = this.dateAdapter.parse(currentDates[1]);
                this.isInvalidDateInput =
                    !firstDate.isDateValid() ||
                    !secondDate.isDateValid()
                ;

                // If is correct and data is not exactly the same
                if (!this.isInvalidDateInput &&
                    (!CalendarService.datesEqual(firstDate, this.selectedRangeDate.start) ||
                        !CalendarService.datesEqual(secondDate, this.selectedRangeDate.end))) {

                    if (firstDate.getTimeStamp() > secondDate.getTimeStamp()) {
                        this.selectedRangeDate = { start: secondDate, end: firstDate };
                    } else {
                        this.selectedRangeDate = { start: firstDate, end: secondDate };
                    }

                    this.selectedRangeDateChange.emit(this.selectedRangeDate);
                    this.onChange({ start: this.selectedRangeDate.start, end: this.selectedRangeDate.end });
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                }
            }
        } else if (!this.allowNull) {
            this.isInvalidDateInput = true;
        }
    }

}
