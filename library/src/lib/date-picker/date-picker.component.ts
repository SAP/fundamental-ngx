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
export class DatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
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
    selectedDay: CalendarDay = {
        date: null
    };

    /** Fired when a new date is selected. */
    @Output()
    selectedDayChange = new EventEmitter();

    /** The currently selected first CalendarDay in a range type calendar. */
    @Input()
    selectedRangeFirst: CalendarDay = {
        date: null
    };

    /** Fired when the user selects a new first date in a range of dates is selected. */
    @Output()
    selectedRangeFirstChange = new EventEmitter();

    /** The currently selected last CalendarDay in a range type calendar. */
    @Input()
    selectedRangeLast: CalendarDay = {
        date: null
    };

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
    placement: Placement = 'auto';

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

    /** Opens the calendar */
    openCalendar(e) {
        this.isOpen = true;
        this.getInputValue(e);
    }

    /** Toggles the calendar open or closed */
    toggleCalendar(e) {
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
    }

    /** Closes the calendar if it is open */
    closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

    /** @hidden */
    updateDatePickerInputHandler(d) {
        if (this.type === 'single') {
            if (d.selectedDay.date) {
                const newInputDate = this.dateAdapter.format(d.selectedDay.date);
                if (this.inputFieldDate !== newInputDate) {
                    this.inputFieldDate = newInputDate;
                    this.selectedDay = d.selectedDay;
                    this.selectedDayChange.emit(this.selectedDay);
                    this.onChange({date: this.selectedDay.date});
                }
            }
        } else {
            if (d.selectedFirstDay.date) {
                const newInputDates = this.dateAdapter.format(d.selectedFirstDay.date) + this.dateAdapter.rangeDelimiter
                    + this.dateAdapter.format(d.selectedLastDay.date);
                if (this.inputFieldDate !== newInputDates) {
                    this.inputFieldDate = newInputDates;
                    this.selectedRangeFirst = d.selectedFirstDay;
                    this.selectedRangeLast = d.selectedLastDay;
                    this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                    this.selectedRangeLastChange.emit(this.selectedRangeLast);
                    this.onChange({date: this.selectedRangeFirst.date, rangeEnd: this.selectedRangeLast.date});
                }
            }
        }
    }

    /** @hidden */
    isInvalidDateInputHandler(e) {
        this.isInvalidDateInput = e;
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

    /** @hidden */
    @HostListener('document:click', ['$event'])
    public onGlobalClick(event: MouseEvent) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.closeCalendar();
        }
    }

    /** @hidden */
    ngOnInit() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.subscribe(date => {
                if (date && typeof date === 'object') {
                    this.updateDatePickerInputHandler(date);
                } else if (date === '' && this.allowNull) {
                    this.isInvalidDateInput = false;
                    if (this.type === 'single') {
                        this.selectedDay.date = null;
                        this.selectedDay.selected = null;
                        this.onChange({date: this.selectedDay.date});
                    } else {
                        this.selectedRangeFirst.date = null;
                        this.selectedRangeFirst.selected = null;
                        this.selectedRangeLast.date = null;
                        this.selectedRangeLast.selected = null;
                        this.onChange({date: this.selectedRangeFirst.date, rangeEnd: this.selectedRangeLast.date});
                    }
                } else {
                    this.isInvalidDateInput = true;
                }
            })
        }
    }

    /** @hidden */
    ngOnDestroy() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.unsubscribe();
        }
    }

    constructor(private eRef: ElementRef, public dateAdapter: DateFormatParser) {}

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
        // void for now
    }

    /** @hidden */
    writeValue(selected: {date: Date, rangeEnd?: Date}): void {
        if (!selected) {
            return;
        }
        if (this.type.toLocaleLowerCase() === 'single') {
            this.selectedDay.date = selected.date;
            if (selected.date !== null) {
                this.inputFieldDate = this.dateAdapter.format(selected.date);
            } else {
                this.inputFieldDate = '';
            }
        } else {
            this.selectedRangeFirst.date = selected.date;
            this.selectedRangeLast.date = selected.rangeEnd;
            if (selected.date !== null) {
                this.inputFieldDate = this.dateAdapter.format(selected.date) +
                    this.dateAdapter.rangeDelimiter + this.dateAdapter.format(selected.rangeEnd);
            } else {
                this.inputFieldDate = '';
            }
        }
    }
}
