import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { Placement } from 'popper.js';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';
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
    @ViewChild(CalendarComponent)
    calendarComponent: CalendarComponent;

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
    isInvalidDateInput: boolean = false;

    /** @hidden The Time object which interacts with the inner Time component. Internal use. */
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use. */
    selectedDate: FdDate;

    /** Subscription of the dateFromInput. */
    private dateFromInputSubscription: Subscription;

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
    onChange: any = (selected: any) => {
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

    /** @hidden */
    isInvalidDateInputHandler(e): void {
        this.isInvalidDateInput = e;
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
            this.selectedDate = this.date.date;
            this.time = this.date.time;
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
                public dateTimeAdapter: DateTimeFormatParser
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
        if (selected.isDateValid() && selected.isTimeValid()) {
            this.selectedDate = selected.date;
            this.time = selected.time;
            this.date = new FdDatetime(this.selectedDate, this.time);
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.setInput(this.date);
        }
    }

    /** @hidden */
    handleDateChange(date: FdDate): void {
        if (!CalendarService.datesEqual(date, this.selectedDate)) {
            this.selectedDate = date;
            this.date = new FdDatetime(this.selectedDate, this.time);
            this.setInput(this.date);
            this.onChange(this.date);
        }
    }

    /** @hidden */
    handleTimeChange(time: TimeObject): void {
        this.time = time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.setInput(this.date);
        this.onChange(this.date);
    }

    /** @hidden */
    focusArrowLeft(): void {
        if (this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    }

    /** @hidden */
    handleInputChange(date: string): void {
        if (date) {
            const fdTimeDate = this.dateTimeAdapter.parse(date);
            this.isInvalidDateInput = !(fdTimeDate.isDateValid() && fdTimeDate.isTimeValid());

            if (!this.isInvalidDateInput) {
                this.selectedDate = fdTimeDate.date;
                this.time = fdTimeDate.time;
                this.calendarComponent.setCurrentlyDisplayed(fdTimeDate.date);
                this.date = new FdDatetime(this.selectedDate, this.time);
                this.onChange(fdTimeDate);
            }
        } else if (this.allowNull) {
            this.isInvalidDateInput = false;
            this.date = FdDatetime.GetToday();
            this.selectedDate = this.date.date;
            this.time = this.date.time;
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.onChange(null);
        } else {
            this.isInvalidDateInput = true;
        }
    }

    private setInput(fdDateTime: FdDatetime): void {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
    }

}
