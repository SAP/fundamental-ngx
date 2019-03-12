import {
    Component,
    Input,
    OnInit,
    HostListener,
    ElementRef,
    EventEmitter,
    Output,
    forwardRef,
    ChangeDetectorRef,
    HostBinding
} from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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
export class DatePickerComponent implements OnInit, ControlValueAccessor {
    inputFieldDate = null;
    isValidDateInput: boolean = false;
    isOpen: boolean = false;
    dateFromDatePicker = new BehaviorSubject<string>('');

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
        if (this.isValidDateInput) {
            this.inputFieldDate = null;
        }
    }

    closeCalendar() {
        if (this.isOpen) {
            if (this.isValidDateInput) {
                this.inputFieldDate = null;
            }
            this.isOpen = false;
        }
    }

    onBlurHandler() {
        if (this.isOpen) {
            if (this.isValidDateInput) {
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
        this.isValidDateInput = e;
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

    ngOnInit() {}

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
            this.inputFieldDate = selected.date.toLocaleDateString();
        } else {
            this.selectedRangeFirst.date = selected.date;
            this.selectedRangeLast.date = selected.rangeEnd;
            this.inputFieldDate = selected.date.toLocaleDateString() + ' - ' + selected.rangeEnd.toLocaleDateString();
        }
    }
}
