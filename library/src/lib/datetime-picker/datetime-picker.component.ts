import { Component, Input, OnInit, HostListener, ElementRef, EventEmitter, Output, forwardRef } from '@angular/core';
import { CalendarDay, CalendarType } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

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

    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
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
        if (d.selectedDay.date) {
            this.inputFieldDate = d.selectedDay.date.toLocaleDateString();
            this.selectedDay = d.selectedDay;
            this.selectedDayChange.emit(this.selectedDay);
            this.onChange({date: this.selectedDay.date});
        }
    }

    isInvalidDateInputHandler(e) {
        this.isValidDateInput = e;
    }

    getInputValue(e) {
        this.dateFromInput.next(e);
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

    writeValue(selected: Date): void {
        if (!selected) {
            return;
        }
        if (this.type.toLocaleLowerCase() === 'single') {
            this.selectedDay.date = selected;
            this.inputFieldDate = selected.toLocaleDateString();
        }
    }
}
