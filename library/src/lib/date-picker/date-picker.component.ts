import {
    Component,
    Input,
    OnInit,
    HostListener,
    ElementRef,
    EventEmitter,
    Output,
    forwardRef,
    HostBinding,
    OnDestroy
} from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

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
    disableFunction = function(d): boolean {
        return false;
    };
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    onChange: any = (selected: any) => {};
    onTouched: any = () => {};

    openCalendar(e) {
        this.isOpen = !this.isOpen;
        this.getInputValue(e);
        if (this.isInvalidDateInput) {
            this.inputFieldDate = null;
        }
    }

    closeCalendar() {
        if (this.isOpen) {
            if (this.isInvalidDateInput) {
                this.inputFieldDate = null;
            }
            this.isOpen = false;
        }
    }

    onBlurHandler() {
        if (this.isOpen) {
            if (this.isInvalidDateInput) {
                this.inputFieldDate = null;
            }
        }
    }

    updateDatePickerInputHandler(d) {
        if (this.type === 'single') {
            if (d.selectedDay.date) {
                this.inputFieldDate = d.selectedDay.date.toLocaleDateString();
                this.selectedDay = d.selectedDay;
                this.selectedDayChange.emit(this.selectedDay);
                this.onChange({date: this.selectedDay.date});
            }
        } else {
            if (d.selectedFirstDay.date) {
                this.selectedRangeFirst = d.selectedFirstDay;
                this.selectedRangeLast = d.selectedLastDay;
                this.selectedRangeFirstChange.emit(this.selectedRangeFirst);
                this.selectedRangeLastChange.emit(this.selectedRangeLast);
                this.inputFieldDate = d.selectedFirstDay.date.toLocaleDateString() + ' - ' + d.selectedLastDay.date.toLocaleDateString();
                this.onChange({date: this.selectedRangeFirst.date, rangeEnd: this.selectedRangeLast.date});
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

    @HostListener('document:click', ['$event.path'])
    public onGlobalClick(targetElementPath: Array<any>) {
        const elementRefInPath = targetElementPath.find(e => e === this.eRef.nativeElement);
        if (!elementRefInPath) {
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

    constructor(private eRef: ElementRef) {}

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
                this.inputFieldDate = selected.date.toLocaleDateString();
            } else {
                this.inputFieldDate = '';
            }
        } else {
            this.selectedRangeFirst.date = selected.date;
            this.selectedRangeLast.date = selected.rangeEnd;
            if (selected.date !== null) {
                this.inputFieldDate = selected.date.toLocaleDateString() + ' - ' + selected.rangeEnd.toLocaleDateString();
            } else {
                this.inputFieldDate = '';
            }
        }
    }
}
