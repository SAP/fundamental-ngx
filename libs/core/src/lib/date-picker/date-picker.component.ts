import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input, Optional,
    Output, ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarComponent, CalendarType, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarService } from '../calendar/calendar.service';
import { FdRangeDate } from '../calendar/models/fd-range-date';
import { DateFormatParser } from './format/date-parser';
import { DatePipe } from '@angular/common';
import { FormStates } from '../form/form-control/form-states';

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
        },
        DatePipe
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements ControlValueAccessor, Validator {

    /** @hidden The value of the input */
    inputFieldDate: string = null;

    /** @hidden Whether the date input is invalid */
    isInvalidDateInput: boolean = false;

    /** @hidden Whether the date picker is open */
    isOpen: boolean = false;

    /** @hidden */
    @ViewChild(CalendarComponent)
    calendarComponent: CalendarComponent;

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = 'single';

    /** Date picker input placeholder string */
    @Input()
    placeholder: string = 'mm/dd/yyyy';

    /** Date Format displayed on input. See more options: https://angular.io/api/common/DatePipe */
    @Input()
    format: string = 'MM/dd/yyyy';

    /** Locale for date pipe. See more https://angular.io/guide/i18n */
    @Input()
    locale: string;

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

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `invalid`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable: boolean = true;

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
            this.inputFieldDate = this._formatDate(date);
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
            this.isInvalidDateInput = !this.isModelValid();
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
            this.inputFieldDate = this._formatDate(dates.start)
                + this.dateAdapter.rangeDelimiter
                + this._formatDate(dates.end)
            ;
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this.isInvalidDateInput = !this.isModelValid();
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
        public dateAdapter: DateFormatParser,
        private _changeDetectionRef: ChangeDetectorRef,
        @Optional() private _datePipe: DatePipe
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
        };
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
        this._changeDetectionRef.detectChanges();
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
            if (this._isSingleModelValid(this.selectedDate)) {
                this.inputFieldDate = this._formatDate(selected);
                this._refreshCurrentlyDisplayedCalendarDate(selected);
            } else {
                this.inputFieldDate = '';
            }

        } else {
            /**
             * For range mode, if the date is invalid, model is changed, but it does not refresh currently
             * displayed day view, or input field text
             */
            selected = <FdRangeDate>selected;

            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };

                if (this._isRangeModelValid(this.selectedRangeDate)) {
                    this._refreshCurrentlyDisplayedCalendarDate(selected.start);
                    this.inputFieldDate = this._formatDate(selected.start) +
                        this.dateAdapter.rangeDelimiter + this._formatDate(selected.end);
                } else {
                    this.inputFieldDate = '';
                }
            } else {
                this.inputFieldDate = '';
            }
        }
        this._changeDetectionRef.detectChanges();
        this.isInvalidDateInput = !this.isModelValid();
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput
     */
    dateStringUpdate(date: string): void {
        this.inputFieldDate = date;
        /** Case when there is single mode */
        if (this.type === 'single') {

            let fdDate = this.dateAdapter.parse(date);

            /** Check if dates are equal, if so, there is no need to make any changes */
            if (!CalendarService.datesEqual(fdDate, this.selectedDate)) {
                this.isInvalidDateInput = !this._isSingleModelValid(fdDate);

                /** Check if date is valid, if it's not, there is no need to refresh calendar */
                if (!this.isInvalidDateInput && date) {
                    this._refreshCurrentlyDisplayedCalendarDate(fdDate);
                } else {
                    /** Whether string is invalid, by passed block or disable functions there is forced Invalid Object, */
                    fdDate = this._invalidDate();
                }
                /**
                 * Date in model is changed no matter if the parsed date from string is valid or not.
                 */
                this.selectedDate = fdDate;
                this.onChange(this.selectedDate);
                this.selectedDateChange.emit(this.selectedDate);
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

                let selectedRangeDate: FdRangeDate = null;

                /** If the end date is before the start date, there is need to replace them  */
                if ((firstDate.getTimeStamp() > secondDate.getTimeStamp()) && secondDate.isDateValid()) {
                    selectedRangeDate = { start: secondDate, end: firstDate };
                } else {
                    selectedRangeDate = { start: firstDate, end: secondDate };
                }

                this.isInvalidDateInput = !this._isRangeModelValid(selectedRangeDate);

                /** If start date is invalid, because of format, block or disable function, there is invalidDate forced */
                if (!this._isStartDateValid(selectedRangeDate.start)) {
                    selectedRangeDate.start = this._invalidDate();
                }

                /** If end date is invalid, because of format, block or disable function, there is invalidDate forced */
                if (!this._isEndDateValid(selectedRangeDate.end)) {
                    selectedRangeDate.end = this._invalidDate();
                }

                /** Whole object is changed, even it's invalid */
                this.selectedRangeDate = selectedRangeDate;

                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange(this.selectedRangeDate);

                /** Check if start date is valid, if it's not, there is no need o refresh calendar */
                if (this._isStartDateValid(this.selectedRangeDate.start)) {
                    this._refreshCurrentlyDisplayedCalendarDate(this.selectedRangeDate.start);
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
            return this._isSingleModelValid(this.selectedDate);
        } else {
            return this._isRangeModelValid(this.selectedRangeDate);
        }
    }

    /** Method that returns info if single model given is valid */
    private _isSingleModelValid(fdDate: FdDate): boolean {
        return (
            this._isFdDateValid(fdDate) &&
            !this.disableFunction(fdDate) &&
            !this.blockFunction(fdDate)
        ) || (!this.inputFieldDate && this.allowNull);
    }

    /** Method that returns info if range date model given is valid */
    private _isRangeModelValid(fdRangeDate: FdRangeDate): boolean {
        return (fdRangeDate &&
                this._isStartDateValid(fdRangeDate.start) &&
                this._isEndDateValid(fdRangeDate.end)
            ) || (!this.inputFieldDate && this.allowNull);
    }

    /** Method that returns info if end date model given is valid */
    private _isEndDateValid(endDate: FdDate): boolean {
        return this._isFdDateValid(endDate) &&
            !this.disableRangeEndFunction(endDate) &&
            !this.blockRangeEndFunction(endDate);
    }

    /** Method that returns info if start date model given is valid */
    private _isStartDateValid(startDate: FdDate): boolean {
        return this._isFdDateValid(startDate) &&
            !this.disableRangeStartFunction(startDate) &&
            !this.blockRangeStartFunction(startDate);
    }

    /** Method that returns info if end date model given is valid */
    private _isFdDateValid(fdDate: FdDate): boolean {
        return fdDate &&
            fdDate instanceof FdDate &&
            fdDate.isDateValid();
    }

    private _invalidDate(): FdDate {
        return this.dateAdapter.parse('InVaLiDDaTe');
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: FdDate): void {
        if (this.calendarComponent) {
            this.calendarComponent.setCurrentlyDisplayed(date);
        }
    }

    /**
     * @hidden
     * If there is any format function provided, it is used. Otherwise date format follows angular DatePipe functionality.
     */
    private _formatDate(fdDate: FdDate): string {

        const customFormattedDate: string = this.dateAdapter.format(fdDate);

        if (customFormattedDate) {
            return customFormattedDate;
        } else {
            return this._datePipe.transform(fdDate.toDate(), this.format, null, this.locale);
        }
    }

}
