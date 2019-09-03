import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarType, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { FdRangeDate } from '../calendar/models/fd-range-date';
import { DateFormatParser } from './format/date-parser';

/**
 * The datetime picker component is an opinionated composition of the fd-popover and
 * fd-calendar components to accomplish the UI pattern for picking a date.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-date-picker [(ngModel)]="date"></fd-date-picker>
 * ```
 */
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
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class DatePickerComponent implements ControlValueAccessor, Validator {

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

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** Whether to validate the date picker input. */
    @Input()
    useValidation: boolean = true;

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

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
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

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any
    } {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        }
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
        /** If written value is not defined, null, empty string */
        if (!selected) {
            this.inputFieldDate = '';
            return;
        }
        if (this.type === 'single') {
            /**
             * For single mode, if the date is invalid, model is changed, it refresh currently
             * input field text, but it does not refresh currently displayed day
             */
            selected = <FdDate>selected;
            this.selectedDate = selected;
            this.inputFieldDate = this.dateAdapter.format(selected);
            if (this.isModelValid()) {
                this.calendarComponent.setCurrentlyDisplayed(this.selectedDate);
            }

        } else {
            /**
             * For range mode, if the date is invalid, model is changed, but it does not refresh currently
             * displayed day view, or input field text
             */
            selected = <FdRangeDate>selected;

            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };

                if (this.isModelValid()) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                    this.inputFieldDate = this.dateAdapter.format(selected.start) +
                        this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.end);
                }
            } else {
                this.inputFieldDate = '';
            }
        }
        this.isInvalidDateInput = !this.isModelValid();
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     */
    dateStringUpdate(date: string): void {
        /** Case when there is single mode */
        if (this.type === 'single') {

            const fdDate = this.dateAdapter.parse(date);

            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed date fro string is valid or not.
             */
            if (!CalendarService.datesEqual(fdDate, this.selectedDate)) {
                this.isInvalidDateInput = !fdDate.isDateValid();
                this.selectedDate = fdDate;
                this.onChange(this.selectedDate);
                this.selectedDateChange.emit(this.selectedDate);

                /** Check if date is valid, if it's not, there is no need to refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(fdDate);
                }
            }


            /** Case when there is range mode */
        } else {
            const currentDates = date.split(this.dateAdapter.rangeDelimiter);
            const firstDate = this.dateAdapter.parse(currentDates[0]);
            const secondDate = this.dateAdapter.parse(currentDates[1]);

            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed dates from string are valid or not.
             */
            if (!CalendarService.datesEqual(firstDate, this.selectedRangeDate.start) ||
                !CalendarService.datesEqual(secondDate, this.selectedRangeDate.end)) {

                this.isInvalidDateInput = !firstDate.isDateValid() || !secondDate.isDateValid();

                /** If the end date is before the start date, there is need to replace them  */
                if ((firstDate.getTimeStamp() > secondDate.getTimeStamp()) && secondDate.isDateValid()) {
                    this.selectedRangeDate = { start: secondDate, end: firstDate };
                } else {
                    this.selectedRangeDate = { start: firstDate, end: secondDate };
                }

                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange({ start: this.selectedRangeDate.start, end: this.selectedRangeDate.end });

                /** Check if dates are valid, if it's not, there is no need o refresh calendar */
                if (!this.isInvalidDateInput) {
                    this.calendarComponent.setCurrentlyDisplayed(this.selectedRangeDate.start);
                }
            }
        }

        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    public isModelValid(): boolean {
        if (this.type === 'single') {
            return this.selectedDate &&
                this.selectedDate instanceof FdDate &&
                this.selectedDate.isDateValid();
        } else {
            return this.selectedRangeDate &&
                (
                    this.selectedRangeDate.start &&
                    this.selectedRangeDate.start instanceof FdDate &&
                    this.selectedRangeDate.start.isDateValid()
                ) && (
                    this.selectedRangeDate.end &&
                    this.selectedRangeDate.end instanceof FdDate &&
                    this.selectedRangeDate.end.isDateValid()
                );
        }
    }

}
