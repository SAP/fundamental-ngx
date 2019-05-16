import {
    Component,
    Input,
    OnInit,
    HostListener,
    ElementRef,
    forwardRef,
    HostBinding,
    Output,
    EventEmitter,
    OnDestroy
} from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { DateFormatParser } from '../calendar/format/date-parser';

@Component({
    selector: 'fd-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
    inputFieldDate = null;
    isInvalidDateInput: boolean = false;
    isOpen: boolean = false;
    dateFromDatePicker: Subject<string> = new Subject();

    @HostBinding('class.fd-date-picker') true;

    @Input()
    type: CalendarType = 'single';

    @Input()
    placeholder: string = 'mm/dd/yyyy';

    @Input()
    compact: boolean = false;

    @Input()
    selectedDay: CalendarDay = {
        date: null
    };

    @Output()
    selectedDayChange = new EventEmitter();

    @Input()
    selectedRangeFirst: CalendarDay = {
        date: null
    };

    @Output()
    selectedRangeFirstChange = new EventEmitter();

    @Input()
    selectedRangeLast: CalendarDay = {
        date: null
    };

    @Output()
    selectedRangeLastChange = new EventEmitter();

    @Input()
    startingDayOfWeek: number = 0;

    @Input() validate: boolean = true;

    /** Aria label for the datepicker input. */
    @Input()
    dateInputLabel: string = 'Date input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayCalendarToggleLabel: string = 'Display calendar toggle';

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };
    @Input()
    disableRangeStartFunction = function(d): boolean {
        return false;
    };
    @Input()
    disableRangeEndFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockRangeStartFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockRangeEndFunction = function(d): boolean {
        return false;
    };

    onChange: any = (selected: any) => {};
    onTouched: any = () => {};

    openCalendar(e) {
        this.isOpen = true;
        this.getInputValue(e);
    }

    toggleCalendar(e) {
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
    }

    closeCalendar() {
        if (this.isOpen) {
            this.isOpen = false;
        }
    }

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

    isInvalidDateInputHandler(e) {
        this.isInvalidDateInput = e;
    }

    getInputValue(e) {
        this.dateFromDatePicker.next(e);
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.closeCalendar();
    }

    @HostListener('document:click', ['$event'])
    public onGlobalClick(event: MouseEvent) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.closeCalendar();
        }
    }

    ngOnInit() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.subscribe(date => {
                if (date && typeof date === 'object') {
                    this.updateDatePickerInputHandler(date);
                } else if (date === '') {
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
                }
            })
        }
    }

    ngOnDestroy() {
        if (this.dateFromDatePicker) {
            this.dateFromDatePicker.unsubscribe();
        }
    }

    constructor(private eRef: ElementRef, public dateAdapter: DateFormatParser) {}

    registerOnChange(fn: (selected: any) => {void}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        // void for now
    }

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
