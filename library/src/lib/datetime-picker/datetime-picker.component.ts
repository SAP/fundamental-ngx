import { Component, Input, OnInit, HostListener, ElementRef, EventEmitter, Output, forwardRef } from '@angular/core';
import { CalendarDay } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TimeObject } from '../time/time-object';
import { PopperOptions } from 'popper.js';

@Component({
    selector: 'fd-datetime-picker',
    templateUrl: './datetime-picker.component.html',
    styleUrls: ['./datetime-picker.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatetimePickerComponent),
            multi: true
        }
    ]
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
    inputFieldDate = null;
    isValidDateInput: boolean = false;
    isOpen: boolean = false;
    dateFromInput = new BehaviorSubject<string>('');

    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    selectedDay: CalendarDay = {
        date: null
    };

    @Input()
    placeholder: string = 'mm/dd/yyyy, hh:mm:ss am';

    @Input()
    compact: boolean = false;

    @Input() meridian: boolean = true;

    @Input() disabled: boolean;

    @Input() spinners: boolean = true;

    @Input() displaySeconds: boolean = true;

    @Input()
    date: Date = new Date();

    @Output()
    dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Output()
    calendarChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Output()
    timeChange: EventEmitter<Date> = new EventEmitter<Date>();

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };

    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    onChange: any = () => {};
    onTouched: any = () => {};

    openPopover(e) {
        this.isOpen = !this.isOpen;
        this.inputValueChange(e);
        if (this.isValidDateInput) {
            this.inputFieldDate = null;
        }
    }

    closePopover() {
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

    updatePickerInputHandler(d) {
        if (d.selectedDay && d.selectedDay.date) {
            d.selectedDay.date.setHours(this.date.getHours());
            d.selectedDay.date.setMinutes(this.date.getMinutes());
            d.selectedDay.date.setSeconds(this.date.getSeconds());
            d.selectedDay.date.setMilliseconds(this.date.getMilliseconds());
            const previous = this.date.getTime();
            this.selectedDay = d.selectedDay;
            this.date = d.selectedDay.date;
            this.inputFieldDate = this.date.toLocaleString();
            if (this.date.getTime() !== previous) {
                this.calendarChange.emit(this.date);
                this.dateChange.emit(this.date);
                this.onChange(this.date);
            }
        }
    }

    isInvalidDateInputHandler(e) {
        this.isValidDateInput = e;
    }

    inputValueChange(e): void {
        const temp = new Date(e);
        if (isNaN(temp.getTime())) {
            this.inputFieldDate = this.date.toLocaleString();
        } else {
            const newValue = {hour: temp.getHours(), minute: temp.getMinutes(), second: temp.getSeconds()};
            if (newValue.hour !== this.time.hour || newValue.minute !== this.time.minute || newValue.second !== this.time.second) {
                this.time = newValue;
                this.setTime(true);
            }
            this.dateFromInput.next(temp.toLocaleDateString());
        }
    }

    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler() {
        this.closePopover();
    }

    @HostListener('document:click', ['$event.path'])
    public onGlobalClick(targetElementPath: Array<any>) {
        const elementRefInPath = targetElementPath.find(e => e === this.eRef.nativeElement);
        if (!elementRefInPath) {
            this.closePopover();
        }
    }

    ngOnInit() {
        if (this.date) {
            this.selectedDay.date = this.date;
            this.time = {hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds()};
            this.inputFieldDate = this.date.toLocaleString();
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
        this.disabled = isDisabled;
    }

    writeValue(selected: Date): void {
        if (!selected) {
            return;
        }
        this.selectedDay.date = selected;
        this.time = {hour: selected.getHours(), minute: selected.getMinutes(), second: selected.getSeconds()}
        this.date = this.selectedDay.date;
        this.setTime();
    }

    setTime(fireEvents = false): void {
        this.date.setHours(this.time.hour);
        this.date.setMinutes(this.time.minute);
        this.date.setSeconds(this.time.second);
        this.inputFieldDate = this.date.toLocaleString();

        if (fireEvents) {
            this.timeChange.emit(this.date);
            this.dateChange.emit(this.date);
            this.onChange(this.date);
        }
    }

    focusArrowLeft() {
        this.eRef.nativeElement.querySelector('#arrowLeft').focus();
    }

}
