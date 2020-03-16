import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { Placement } from 'popper.js';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarComponent, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { FdDatetime } from './models/fd-datetime';
import { FormStates } from '../form/form-control/form-states';
import { DatePipe } from '@angular/common';

/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 * Supports Angular Forms.
 * ```html
 * <fd-date-time-picker [(ngModel)]="dateTime"></fd-date-time-picker>
 * ```
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
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatetimePickerComponent),
            multi: true
        },
        DatePipe
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor, Validator {

    /** @hidden Reference to the inner time component. */
    @ViewChild(TimeComponent, { static: false })
    timeComponent: TimeComponent;

    /** @hidden Reference to the inner calendar component. */
    @ViewChild(CalendarComponent, { static: false })
    calendarComponent: CalendarComponent;

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

    /** Placeholder for the inner input element. */
    @Input()
    placeholder: string = 'mm/dd/yyyy, hh:mm:ss am';

    /** Whether the component should be in compact mode. */
    @Input()
    compact: boolean = false;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether the time component should be meridian (am/pm). */
    @Input()
    meridian: boolean = true;

    /** Date Format displayed on input. See more options: https://angular.io/api/common/DatePipe */
    @Input()
    format: string = 'MM/dd/yyyy, HH:mm:ss';

    /** Locale for date pipe. See more https://angular.io/guide/i18n */
    @Input()
    locale: string;

    /** Whether the component is disabled. */
    @Input()
    disabled: boolean;

    /** Whether the time component shows spinners for changing the time. */
    @Input()
    spinners: boolean = true;

    /** Whether the time component shows seconds. */
    @Input()
    displaySeconds: boolean = true;

    /** Whether the time component shows minutes. */
    @Input()
    displayMinutes: boolean = true;

    /** Whether the time component shows hours. */
    @Input()
    displayHours: boolean = true;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    useValidation: boolean = true;

    /** Current selected date. Two-way binding is supported. */
    @Input()
    date: FdDatetime = FdDatetime.getToday();

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen: boolean = false;

    /** The disableFunction for the calendar. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    public activeView: FdCalendarView = 'day';

    /** Aria label for the datetime picker input. */
    @Input()
    datetimeInputLabel: string = 'Datetime input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayDatetimeToggleLabel: string = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull: boolean = true;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input() keepTwoDigitsTime: boolean = false;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `invalid`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable: boolean = true;

    /** Event thrown every time calendar active view is changed */
    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

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

    /** @hidden */
    onChange: any = (selected: any) => {
    };

    /** @hidden */
    onTouched: any = () => {
    };

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to block certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    blockFunction = function(fdDate: FdDate): boolean {
        return false;
    };

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any
    } {
        return ( this.isCurrentModelValid() && !this.isInvalidDateInput ) ? null : {
            dateValidation: {
                valid: false
            }
        };
    }

    /** Toggles the popover. */
    togglePopover(): void {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }

    /**
     * Method that handle calendar active view change and throws event.
     */
    public handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** Opens the popover. */
    openPopover(): void {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }

    /** Closes the popover and refresh model */
    closePopover(): void {
        if (this.isOpen) {
            this.handleInputChange(this.inputFieldDate);
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
        if (!this._elRef.nativeElement.contains(event.target)) {
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
    constructor(private _elRef: ElementRef,
                private _changeDetRef: ChangeDetectorRef,
                public dateTimeAdapter: DateTimeFormatParser,
                @Optional() private _datePipe: DatePipe
    ) {}

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
        this._changeDetRef.detectChanges();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    writeValue(selected: FdDatetime): void {
        if (!selected || !(selected instanceof FdDatetime)) {
            return;
        }
        this.selectedDate = selected.date;
        this.time = selected.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        if (this.isCurrentModelValid()) {
            this._refreshCurrentlyDisplayedCalendarDate(this.date.date);
            this._setInput(this.date);
        }
        this._changeDetRef.detectChanges();
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     */
    handleDateChange(date: FdDate): void {
        this.selectedDate = date;
        if (!this.date.isTimeValid()) {
            this.time = this.timeComponent.time;
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isCurrentModelValid();
        this._setInput(this.date);
        this.onChange(this.date);
    }

    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     */
    handleTimeChange(time: TimeObject): void {
        this.time = time;
        if (!this.selectedDate || !this.selectedDate.isDateValid()) {
            this.selectedDate = FdDate.getToday();
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isCurrentModelValid();
        this._setInput(this.date);
        this.onChange(this.date);
    }

    /** @hidden */
    focusArrowLeft(): void {
        if (this._elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this._elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     */
    handleInputChange(date: string): void {
        const fdTimeDate = this.dateTimeAdapter.parse(date);
        this.isInvalidDateInput = !this._isModelValid(fdTimeDate);
        if (!this.isInvalidDateInput) {
            this.selectedDate = fdTimeDate.date;
            this.time = fdTimeDate.time;
            this.date = new FdDatetime(this.selectedDate, this.time);
            this.onChange(fdTimeDate);
            this._refreshCurrentlyDisplayedCalendarDate(fdTimeDate.date);
        } else {
            this.onChange(this.date);
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
            this.date = FdDatetime.getToday();
            this.selectedDate = this.date.date;
            this.time = this.date.time;
            this._refreshCurrentlyDisplayedCalendarDate(this.date.date);
            this.onChange(null);
        } else if (!date && !this.allowNull) {
            this.isInvalidDateInput = true;
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    public isCurrentModelValid(): boolean {
        return this._isModelValid(this.date);
    }

    /** Method that provides information if FdDateTime passed as arg has properly types and is valid */
    private _isModelValid(fdDateTime: FdDatetime): boolean {
        return fdDateTime &&
            fdDateTime instanceof FdDatetime &&
            this._isDateValid(fdDateTime) &&
            fdDateTime.isTimeValid()
        ;
    }

    /** Method that provides information if Date is valid */
    private _isDateValid(fdDateTime: FdDatetime): boolean {
        return fdDateTime && fdDateTime.isDateValid() &&
            !this.disableFunction(fdDateTime.date) &&
            !this.blockFunction(fdDateTime.date)
        ;
    }

    private _setInput(fdDateTime: FdDatetime): void {
        this.inputFieldDate = this._formatDateTime(fdDateTime);
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: FdDate): void {
        if (this.calendarComponent) {
            this.calendarComponent.setCurrentlyDisplayed(date);
        }
    }

    /**
     * @hidden
     * If there is any format function provided, it is used. Otherwise date format follows angular DatePipe functionality.
     */
    private _formatDateTime(fdDateTime: FdDatetime): string {

        const customFormattedDate: string = this.dateTimeAdapter.format(fdDateTime);

        if (customFormattedDate) {
            return customFormattedDate;
        } else {
            return this._datePipe.transform(fdDateTime.toDate(), this.format, null, this.locale);
        }
    }

}
