import { Component, Input, OnInit, HostListener, ElementRef, EventEmitter, Output, forwardRef, ViewChild, OnDestroy } from '@angular/core';
import { CalendarDay } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';

/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 */
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
export class DatetimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

    /** @hidden Reference to the inner time component. */
    @ViewChild(TimeComponent)
    timeComponent: TimeComponent;

    /** Placeholder for the inner input element. */
    @Input()
    placeholder: string = 'mm/dd/yyyy, hh:mm:ss am';

    /** Whether the component should be in compact mode. */
    @Input()
    compact: boolean = false;

    /** Whether the time component should be meridian (am/pm). */
    @Input()
    meridian: boolean = true;

    /** Whether the component is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the time component shows spinners for changing the time. */
    @Input()
    spinners: boolean = true;

    /** Whether the time component shows seconds. */
    @Input()
    displaySeconds: boolean = true;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    validate: boolean = true;

    /** Current selected date. Two-way binding is supported. */
    @Input()
    date: Date = new Date();

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen: boolean = false;

    /** Event emitted when the date changes. This can be a time or day change. */
    @Output()
    readonly dateChange: EventEmitter<Date> = new EventEmitter<Date>();

    /** Event emitted when the day changes from the calendar. */
    @Output()
    readonly calendarChange: EventEmitter<Date> = new EventEmitter<Date>();

    /** Event emitted when the time changes from the time component. */
    @Output()
    readonly timeChange: EventEmitter<Date> = new EventEmitter<Date>();

    /** Event emitted when popover closes. */
    @Output()
    readonly onClose: EventEmitter<Date> = new EventEmitter<Date>();

    /**
     * @hidden Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     */
    inputFieldDate = null;

    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    isInvalidDateInput: boolean = false;

    /** @hidden Observable used internally. */
    dateFromInput: Subject<string> = new Subject();

    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use. */
    selectedDay: CalendarDay = {
        date: null
    };

    /** Subscription of the dateFromInput. */
    private dateFromInputSubscription: Subscription;

    /** The disableFunction for the calendar. */
    @Input()
    startingDayOfWeek: number = 0;

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };

    /** The blockFunction for the calendar. */
    @Input()
    blockFunction = function(d): boolean {
        return false;
    };

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Toggles the popover. */
    togglePopover(): void {
        if (this.isOpen) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }

    /** Opens the popover. */
    openPopover(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.inputValueChange(this.date);
            if (this.isInvalidDateInput) {
                this.inputFieldDate = null;
            }
        }
    }

    /** Closes the popover */
    closePopover(): void {
        if (this.isOpen) {
            this.onClose.emit(this.date);
            this.isOpen = false;
        }
    }

    updatePickerInputHandler(d): void {
        if (d.selectedDay && d.selectedDay.date) {
            d.selectedDay.date.setHours(this.date.getHours());
            d.selectedDay.date.setMinutes(this.date.getMinutes());
            d.selectedDay.date.setSeconds(this.date.getSeconds());
            d.selectedDay.date.setMilliseconds(this.date.getMilliseconds());
            const previous = this.date.getTime();
            this.selectedDay = d.selectedDay;
            this.date = d.selectedDay.date;
            this.inputFieldDate = this.date.toLocaleString();
            this.time = {hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds()};
            if (this.date.getTime() !== previous) {
                this.calendarChange.emit(this.date);
                this.dateChange.emit(this.date);
                this.onChange(this.date);
            }
        } else if (d === '') {
            this.selectedDay.date = null;
            this.selectedDay.selected = null;
            this.time.second = null;
            this.time.minute = null;
            this.time.hour = null;
            this.timeComponent.displayedHour = null;
            this.timeComponent.period = 'am';
            this.timeComponent.oldPeriod = 'am';
            this.calendarChange.emit(null);
            this.timeChange.emit(null);
            this.dateChange.emit(null);
            this.onChange(this.selectedDay.date);
        }
    }

    /** @hidden */
    isInvalidDateInputHandler(e): void {
        this.isInvalidDateInput = e;
    }

    /** @hidden */
    inputValueChange(e): void {
        const temp = new Date(e);
        /*
         Need to check if current locale toDateString contains AM or PM. If the current locale has it and it is absent
         from the user's input, the meridian should be considered invalid
         */
        const localeMeridian = new Date().toLocaleTimeString().slice(-2);
        let meridianValid = true;
        if ((localeMeridian === 'AM' || localeMeridian === 'PM') &&
            (typeof e === 'string' && e.slice(-2) !== 'AM' && e.slice(-2) !== 'PM')) {
            meridianValid = false;
        }
        
        if (meridianValid && temp.toLocaleDateString() !== 'Invalid Date') {
            const newValue = {hour: temp.getHours(), minute: temp.getMinutes(), second: temp.getSeconds()};
            if (newValue.hour !== this.time.hour || newValue.minute !== this.time.minute || newValue.second !== this.time.second) {
                this.time = newValue;
                this.setTime(true);
            }
            this.dateFromInput.next(temp.toLocaleDateString());
        } else {
            this.isInvalidDateInput = true;
            this.dateFromInput.next('');
        }
    }

    /** @hidden */
    @HostListener('document:keydown.escape', [])
    onEscapeKeydownHandler(): void {
        this.closePopover();
    }

    /** @hidden */
    @HostListener('document:click', ['$event'])
    public onGlobalClick(event: MouseEvent): void {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.date && this.inputFieldDate !== null) {
            this.selectedDay.date = this.date;
            this.time = {hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds()};
        }
        if (this.dateFromInput) {
            this.dateFromInputSubscription = this.dateFromInput.subscribe(date => {
                this.updatePickerInputHandler(date);
            });
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    }

    /** @hidden */
    constructor(private elRef: ElementRef) {}

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
    writeValue(selected: Date): void {
        if (!selected) {
            return;
        }
        this.selectedDay.date = selected;
        this.time = {hour: selected.getHours(), minute: selected.getMinutes(), second: selected.getSeconds()}
        this.date = this.selectedDay.date;
        this.setTime();
    }

    /** @hidden */
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

    /** @hidden */
    focusArrowLeft(): void {
        this.elRef.nativeElement.querySelector('#arrowLeft').focus();
    }

}
