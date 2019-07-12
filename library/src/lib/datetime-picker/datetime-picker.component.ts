import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef, HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { CalendarDay } from '../calendar/calendar.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { Placement } from 'popper.js';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/calendar2/models/fd-date';
import { Calendar2Service } from '../calendar/calendar2/calendar2.service';
import { Calendar2Component } from '../calendar/calendar2/calendar2.component';
import { FdDatetime } from './models/fd-datetime';

/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 */
@Component({
    selector: 'fd-datetime-picker',
    templateUrl: './datetime-picker.component.html',
    styleUrls: ['./datetime-picker.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-datetime-host]': 'true'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatetimePickerComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class DatetimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

    /** @hidden Reference to the inner time component. */
    @ViewChild(TimeComponent)
    timeComponent: TimeComponent;

    /** @hidden Reference to the inner calendar component. */
    @ViewChild(Calendar2Component)
    calendarComponent: Calendar2Component;

    /** Placeholder for the inner input element. */
    @Input()
    placeholder: string = 'mm/dd/yyyy, hh:mm:ss am';

    /** Whether the component should be in compact mode. */
    @Input()
    compact: boolean = false;

    /** The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end. */
    @Input()
    placement: Placement = 'bottom-start';

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
    date: FdDatetime = FdDatetime.GetToday();

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen: boolean = false;

    /** The disableFunction for the calendar. */
    @Input()
    startingDayOfWeek: number = 0;

    /** Aria label for the datetime picker input. */
    @Input()
    datetimeInputLabel: string = 'Datetime input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayDatetimeToggleLabel: string = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull: boolean = true;

    /** Event emitted when the date changes. This can be a time or day change. */
    @Output()
    readonly dateChange: EventEmitter<FdDatetime> = new EventEmitter<FdDatetime>();

    /** Event emitted when the day changes from the calendar. */
    @Output()
    readonly calendarChange: EventEmitter<FdDatetime> = new EventEmitter<FdDatetime>();

    /** Event emitted when the time changes from the time component. */
    @Output()
    readonly timeChange: EventEmitter<FdDatetime> = new EventEmitter<FdDatetime>();

    /** Event emitted when popover closes. */
    @Output()
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    /**
     * @hidden Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     */
    inputFieldDate: string = null;

    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    isInvalidDateInput: boolean = false;;

    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use. */
    selectedDate: FdDate;

    /** Subscription of the dateFromInput. */
    private dateFromInputSubscription: Subscription;

    @Input()
    disableFunction = function(d): boolean {
        return false;
    };

    /** The blockFunction for the calendar. */
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

    /** @hidden */
    onChange: any = () => {
    };

    /** @hidden */
    onTouched: any = () => {
    };

    /** Toggles the popover. */
    togglePopover(): void {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }

    /** Opens the popover. */
    openPopover(): void {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }

    /** Closes the popover */
    closePopover(): void {
        if (this.isOpen) {
            this.onClose.emit();
            this.isOpen = false;
        }
    }

    // updatePickerInputHandler(d): void {
    //     if (d.selectedDay && d.selectedDay.date) {
    //         d.selectedDay.date.setHours(this.date.getHours());
    //         d.selectedDay.date.setMinutes(this.date.getMinutes());
    //         d.selectedDay.date.setSeconds(this.date.getSeconds());
    //         d.selectedDay.date.setMilliseconds(this.date.getMilliseconds());
    //         const previous = this.date.getTime();
    //         this.selectedDay = d.selectedDay;
    //         this.date = d.selectedDay.date;
    //         this.inputFieldDate = this.dateTimeAdapter.format(this.date);
    //         this.time = { hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds() };
    //         if (this.date.getTime() !== previous) {
    //             this.calendarChange.emit(this.date);
    //             this.dateChange.emit(this.date);
    //             this.onChange(this.date);
    //         }
    //     } else if (d === '') {
    //         this.selectedDay.date = null;
    //         this.selectedDay.selected = null;
    //         this.time.second = null;
    //         this.time.minute = null;
    //         this.time.hour = null;
    //         this.timeComponent.displayedHour = null;
    //         this.timeComponent.period = 'am';
    //         this.timeComponent.oldPeriod = 'am';
    //         this.calendarChange.emit(null);
    //         this.timeChange.emit(null);
    //         this.dateChange.emit(null);
    //         this.onChange(this.selectedDay.date);
    //     }
    // }
    //
    /** @hidden */
    isInvalidDateInputHandler(e): void {
        this.isInvalidDateInput = e;
    }

    /** @hidden */
    inputValueChange(strDateTime: string): void {
        /*
         Need to check if current locale toDateString contains AM or PM. If the current locale has it and it is absent
         from the user's input, the meridian should be considered invalid
         */
        const meridian = this.extractMeridian(strDateTime);
        if (meridian || !this.meridian) {
            this.handleInputChange(strDateTime);
        } else if (strDateTime === '' && this.allowNull) {
            this.isInvalidDateInput = false;
            this.handleInputChange('');
        } else {
            this.isInvalidDateInput = true;
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
            this.time = { hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds() };
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    }

    /** @hidden */
    constructor(private elRef: ElementRef,
                private dateTimeAdapter: DateTimeFormatParser,
                private calendarService: Calendar2Service
    ) {
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

    /** @hidden */
    writeValue(selected: FdDatetime): void {
        if (!selected) {
            return;
        }
        if (selected.time) {
            this.time = selected.time;
        } else {

        }
        if (selected.date) {
            this.selectedDate = selected.date
        }
    }

    /** @hidden */
    handleDateChange(date: FdDate): void {
        if (!this.calendarService.datesEqual(date, this.selectedDate)) {
            console.log('Date Changed Handler');
            this.selectedDate = date;
            const fdTimeDate = new FdDatetime(this.selectedDate, this.time);
            this.setInput(fdTimeDate);
            console.log(fdTimeDate);
            this.onChange(fdTimeDate);
        }
    }

    /** @hidden */
    handleTimeChange(time: TimeObject): void {
        // TODO: Add equals function
        console.log('Time Changed Handler');
        this.time = time;
        const fdTimeDate = new FdDatetime(this.selectedDate, this.time);
        this.setInput(fdTimeDate);
        this.onChange(fdTimeDate);
    }

    /** @hidden */
    focusArrowLeft(): void {
        this.elRef.nativeElement.querySelector('#arrowLeft').focus();
    }

    handleInputChange(date: string): void {
        if (date) {
            console.log('Input Changed Handler');
            const fdTimeDate = this.dateTimeAdapter.parse(date);
            this.isInvalidDateInput = !this.calendarService.validateDateFromDatePicker(fdTimeDate.date);

            // If is correct and data is not exactly the same
            if (!this.isInvalidDateInput) {
                this.selectedDate = fdTimeDate.date;
                this.time = fdTimeDate.time;
                this.calendarComponent.setCurrentlyDisplayed(fdTimeDate.date);
                this.onChange({ date: fdTimeDate });
            } else {
                // this.selectedDate = FdDate.getToday();
                // this.calendarComponent.setCurrentlyDisplayed(fdDate);
            }
        }
    }

    private setInput(fdDateTime: FdDatetime): void {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
    }

    private extractMeridian(str: string): string {
        if (typeof str === 'string') {
            if (str.slice(-2) === 'AM' || str.slice(-2) === 'am' || str.slice(-2) === 'PM' || str.slice(-2) === 'pm') {
                return str.slice(-2);
            }
        }
        return null;
    }

}
