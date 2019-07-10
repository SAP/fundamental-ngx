import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateFormatParser } from '../calendar/format/date-parser';
import { Placement } from 'popper.js';
import { FdDate } from '../calendar/calendar2/models/fd-date';

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
    /** @hidden Subject the calendar subscribes to when the date value from the datePicker component changes. For internal use. */
    dateFromDatePicker: Subject<string> = new Subject();

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
    selectedDay: FdDate;

    /** Fired when a new date is selected. */
    @Output()
    selectedDayChange = new EventEmitter();

    /** The currently selected first CalendarDay in a range type calendar. */
    @Input()
    selectedRangeFirst: FdDate;

    /** Fired when the user selects a new first date in a range of dates is selected. */
    @Output()
    selectedRangeFirstChange = new EventEmitter();

    /** The currently selected last CalendarDay in a range type calendar. */
    @Input()
    selectedRangeLast: FdDate;

    /** Fired when the user selects a new last date in a range of dates is selected. */
    @Output()
    selectedRangeLastChange = new EventEmitter();

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
    onChange: any = (selected: any) => {};
    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    public closeFromCalendar() {
        if (this.type  === 'single') {
            console.log(this.type);
            this.closeCalendar();
        }
    }

    /** Opens the calendar */
    openCalendar(e) {
        if (!this.disabled) {
            this.onTouched({date: this.selectedDay});
            this.isOpen = true;
            this.getInputValue(e);
        }
    }

    /** Toggles the calendar open or closed */
    public toggleCalendar(e) {
        this.onTouched({date: this.selectedDay});
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
    }

    /** Closes the calendar if it is open */
    public closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    public handleSingleDateChange(date: FdDate) {
        if (date) {
            const newInputDate = this.dateAdapter.format(date);
            this.inputFieldDate = newInputDate;
            this.selectedDay = date;
            this.selectedDayChange.emit(date);
            console.log(date, 'changed');
            this.onChange({ date: date });
        }
    }

    public handleRangeDateChange(dates: { start: FdDate, end: FdDate }) {
        if (dates) {
            const newInputDates = this.dateAdapter.format(dates.start) + this.dateAdapter.rangeDelimiter
                + this.dateAdapter.format(dates.end)
            ;
            this.inputFieldDate = newInputDates;
            this.selectedRangeFirst = dates.start;
            this.selectedRangeLast = dates.end;
            this.selectedRangeFirstChange.emit(dates.start);
            this.selectedRangeLastChange.emit(dates.end);
            this.onChange({ date: dates.start, rangeEnd: dates.end });
        }
    }

    public handleInputChange(strDate: string) {
        this.inputFieldDate = strDate;
    }

    /** @hidden */
    isInvalidDateInputHandler(event: {isValid: boolean}) {
        if (event) {
            console.log(event);
            this.isInvalidDateInput = !event.isValid;
        }
    }

    /** @hidden */
    getInputValue(e) {
        this.dateFromDatePicker.next(e);
    }

    /** @hidden */
    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.closeCalendar();
    }

    constructor(public dateAdapter: DateFormatParser) {}

    /** @hidden */
    registerOnChange(fn: (selected: any) => {void}): void {
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
    writeValue(selected: {date: FdDate, rangeEnd?: FdDate}): void {
        if (!selected) {
            return;
        }
        if (this.type.toLocaleLowerCase() === 'single') {
            this.selectedDay = selected.date;
            if (selected.date !== null) {
                this.inputFieldDate = this.dateAdapter.format(selected.date);
            } else {
                this.inputFieldDate = '';
            }
        } else {
            this.selectedRangeFirst = selected.date;
            this.selectedRangeLast = selected.rangeEnd;
            if (selected.date !== null) {
                this.inputFieldDate = this.dateAdapter.format(selected.date) +
                    this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.rangeEnd);
            } else {
                this.inputFieldDate = '';
            }
        }
    }
}
