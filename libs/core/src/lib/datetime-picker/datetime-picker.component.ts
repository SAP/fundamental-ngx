import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation,
    Inject,
    OnChanges, AfterViewInit
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Placement } from 'popper.js';

import { DatetimeAdapter } from '../datetime/datetime-adapter';
import { DateTimeFormats, DATE_TIME_FORMATS } from '../datetime/datetime-formats';
import { CalendarComponent, DaysOfWeek, FdCalendarView } from '../calendar/calendar.component';
import { CalendarYearGrid } from '../calendar/models/calendar-year-grid';
import { SpecialDayRule } from '../calendar/models/special-day-rule';
import { FormStates } from '../form/form-control/form-states';

import { createMissingDateImplementationError } from './errors';
import { PopoverFormMessageService } from '../form/form-message/popover-form-message.service';
import { PopoverService } from '../popover/popover-service/popover.service';

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
        '(blur)': 'onTouched()'
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
        PopoverFormMessageService,
        PopoverService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimePickerComponent<D> implements OnInit, OnDestroy, OnChanges, AfterViewInit, ControlValueAccessor, Validator {
    /** Placeholder for the inner input element. */
    @Input()
    placeholder = '';

    /** Whether the component should be in compact mode. */
    @Input()
    compact = false;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /** Whether the component is disabled. */
    @Input()
    disabled: boolean;

    /**
     * Whether the time component should be meridian (am/pm).
     * Default value is based on the current locale format option
     * */
    @Input()
    meridian: boolean;

    /**
     * Whether the time component shows seconds.
     * Default value is based on the current locale format option
     * */
    @Input()
    displaySeconds: boolean;

    /** Text displayed in message */
    @Input()
    set message(message: string) {
        this._message = message;
        this._popoverFormMessage.message = message;
    }
    /** @hidden */
    _message: string = null;

    /** The trigger events that will open/close the message box.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    set messageTriggers(triggers: string[]) {
        this._messageTriggers = triggers;
        this._popoverFormMessage.triggers = triggers;
    }
    /** @hidden */
    _messageTriggers: string[] = ['mouseenter', 'mouseleave'];

    /**
     * Whether the time component shows minutes.
     * Default value is based on the current locale format option
     * */
    @Input()
    displayMinutes: boolean;

    /**
     * Whether the time component shows hours.
     * Default value is based on the current locale format option
     * */
    @Input()
    displayHours: boolean;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    useValidation = true;

    /** Current selected date. Two-way binding is supported. */
    @Input()
    date: D;

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen = false;

    /** The disableFunction for the calendar. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    public activeView: FdCalendarView = 'day';

    /** Aria label for the datetime picker input. */
    @Input()
    datetimeInputLabel = 'Datetime input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayDatetimeToggleLabel = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /**
     * @Input when set to true time component will use 2 digits for each number.
     * For example 9 will become 09
     * but 12 will be kept as 12.
     * Only uses by time component and does not change input format
     */
    @Input() keepTwoDigitsTime = false;

    /**
     *  The state of the form control - applies css classes.
     *  Also this is applied to message.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: FormStates) {
        this._state = state;
        this._popoverFormMessage.messageType = state;
    }
    get state(): FormStates {
        return this._state;
    }
    /** @hidden */
    private _state: FormStates = null;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable = true;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__special-day--{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with FdDate object as a parameter. ex:
     * `rule: (fdDate: FdDate) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule<D>[] = [];

    /**
     * Object to customize year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    yearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 5
    };

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    aggregatedYearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 3
    };

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends = true;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = true;

    /** Whether or not to show the datetime picker footer with OK/cancel buttons. */
    @Input()
    showFooter = true;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange = new EventEmitter<boolean>();

    /** Event thrown every time calendar active view is changed */
    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event emitted when the date changes. This can be a time or day change. */
    @Output()
    readonly dateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event emitted when the day changes from the calendar. */
    @Output()
    readonly calendarChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event emitted when the time changes from the time component. */
    @Output()
    readonly timeChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event emitted when popover closes. */
    @Output()
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    /** Indicates when datetime input is in invalid state. */
    get isInvalidDateInput(): boolean {
        return this._isInvalidDateInput;
    }

    /** @hidden Reference to the inner calendar component. */
    @ViewChild(CalendarComponent)
    _calendarComponent: CalendarComponent<D>;

    /** @hidden */
    @ViewChild('inputGroupComponent', { read: ElementRef })
    _inputGroupElement: ElementRef;

    /**
     * @hidden
     * Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     */
    _inputFieldDate: string = null;

    /** @hidden */
    _isInvalidDateInput = false;

    /** @hidden The temporary Time object for use before 'OK' is pressed. Internal use. */
    _tempTime: D;

    /** @hidden The temporary CalendarDay object for use before 'OK' is pressed. Internal use. */
    _tempDate: D;

    /** @hidden */
    _meridian: boolean;

    /** @hidden */
    _displaySeconds: boolean;

    /** @hidden */
    _displayMinutes: boolean;

    /** @hidden */
    _displayHours: boolean;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange = (_: D) => {
    };

    /** @hidden */
    onTouched = () => {
    };

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function(_: D): boolean {
        return false;
    };

    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        private _popoverFormMessage: PopoverFormMessageService
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }

        // default model value
        this.date = _dateTimeAdapter.now();
    }

    /** @hidden */
    ngOnChanges(changes): void {
        if (changes.date) {
            this._setTempDateTime();
        }

        if (['displayHours', 'displayMinutes', 'displaySeconds', 'meridian'].some((input) => input in changes)) {
            this._calculateTimeOptions();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.date) {
            this._setTempDateTime();
        }

        this._calculateTimeOptions();

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._setInput(this.date);
            this._calculateTimeOptions();
            this._changeDetRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._InitialiseVariablesInMessageService();
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(
        control: AbstractControl
    ): {
        [key: string]: any;
    } {
        return this.isCurrentModelValid() && !this._isInvalidDateInput
            ? null
            : {
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
    handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** Opens the popover. */
    openPopover(): void {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
            this._changeMessageVisibility();
        }
    }

    /** Closes the popover and refresh model */
    closePopover(): void {
        if (this.isOpen) {
            this.handleInputChange(this._inputFieldDate);
            this.onClose.emit();
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
            this._changeMessageVisibility();
        }
    }

    /** @hidden */
    setInvalidDateInputHandler(isInvalid: boolean): void {
        this._isInvalidDateInput = isInvalid;
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
        this._changeDetRef.detectChanges();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    writeValue(selected: D): void {
        if (!this._dateTimeAdapter.isValid(selected)) {
            this._inputFieldDate = '';
            this._changeDetRef.detectChanges();
            return;
        }
        this.date = selected;
        this._setTempDateTime();
        if (this.isCurrentModelValid()) {
            this._refreshCurrentlyDisplayedCalendarDate(this.date);
            this._setInput(this.date);
        }
        this._changeDetRef.detectChanges();
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     */
    handleDateChange(date: D): void {
        this._tempDate = date;
        if (!this.showFooter) {
            this.submit();
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     */
    handleTimeChange(time: D): void {
        this._tempTime = time;
        if (!this.showFooter) {
            this.submit();
        }
    }

    /**
     * @hidden
     * Method that is triggered when 'OK' button is pressed.
     */
    submit(): void {
        const currentDate = this._tempDate;
        const currentTime = this._tempTime;

        this.date = this._dateTimeAdapter.setTime(
            currentDate,
            this._dateTimeAdapter.getHours(currentTime),
            this._dateTimeAdapter.getMinutes(currentTime),
            this._dateTimeAdapter.getSeconds(currentTime)
        );

        this._isInvalidDateInput = !this.isCurrentModelValid();

        this._setInput(this.date);

        this.onChange(this.date);

        if (this.showFooter) {
            this.closePopover();
            this._changeDetRef.detectChanges();
        }
    }

    /**
     * @hidden
     * Function that is called when 'Cancel' button is pressed.
     */
    cancel(): void {
        this._tempDate = this.date;
        this._tempTime = this.date;
        this.closePopover();
    }

    /** @hidden */
    focusArrowLeft(): void {
        if (this._elRef.nativeElement.querySelector('#' + this._calendarComponent.id + '-left-arrow')) {
            this._elRef.nativeElement.querySelector('#' + this._calendarComponent.id + '-left-arrow').focus();
        }
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of _isInvalidDateInput.
     */
    handleInputChange(inputStr: string): void {
        const date = this._dateTimeAdapter.parse(inputStr, this._dateTimeFormats.parse.dateTimeInput);
        this._isInvalidDateInput = !this._isModelValid(date);

        if (!this._isInvalidDateInput) {
            this.date = date;
            this._setTempDateTime();
            this.onChange(date);
            this._refreshCurrentlyDisplayedCalendarDate(date);
        } else {
            this.onChange(this.date);
        }

        if (!inputStr && this.allowNull) {
            this._isInvalidDateInput = false;
            this.date = this._dateTimeAdapter.now();
            this._setTempDateTime();
            this._refreshCurrentlyDisplayedCalendarDate(this.date);
            this.onChange(null);
        } else if (!inputStr && !this.allowNull) {
            this._isInvalidDateInput = true;
        }
    }

    /** @hidden */
    _changeMessageVisibility(): void {
        if (this.isOpen) {
            this._popoverFormMessage.hide();
        } else {
            this._popoverFormMessage.show();
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    public isCurrentModelValid(): boolean {
        return this._isModelValid(this.date);
    }

    /** Method that provides information if FdDateTime passed as arg has properly types and is valid */
    private _isModelValid(date: D): boolean {
        return this._dateTimeAdapter.isValid(date);
    }

    private _setInput(dateTime: D): void {
        this._inputFieldDate = this._formatDateTime(dateTime);
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: D): void {
        if (this._calendarComponent) {
            this._calendarComponent.setCurrentlyDisplayed(date);
        }
    }

    /**
     * @hidden
     * Format date time entity.
     */
    private _formatDateTime(dateTime: D): string {
        const formattedDate: string = this._dateTimeAdapter.format(
            dateTime,
            this._dateTimeFormats.display.dateTimeInput
        );
        return formattedDate || '';
    }

    /** @hidden */
    private _InitialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.message = this._message;
        this._popoverFormMessage.triggers = this._messageTriggers;
        this._popoverFormMessage.messageType = this._state;
    }

    /** @hidden */
    private _setTempDateTime(): void {
        this._tempDate = this.date;
        this._tempTime = this.date;
    }

    /** @hidden */
    private _calculateTimeOptions(): void {
        const format = this._dateTimeFormats.display.dateTimeInput;

        // default meridian option based on format option
        this._meridian =
            this.meridian != null ? this.meridian : this._dateTimeAdapter.isTimeFormatIncludesDayPeriod(format);

        // default seconds option based on format option
        this._displaySeconds =
            this.displaySeconds != null
                ? this.displaySeconds
                : this._dateTimeAdapter.isTimeFormatIncludesSeconds(format);

        // default minutes option based on format option
        this._displayMinutes =
            this.displayMinutes != null
                ? this.displayMinutes
                : this._dateTimeAdapter.isTimeFormatIncludesMinutes(format);

        // default hours option based on format option
        this._displayHours =
            this.displayHours != null ? this.displayHours : this._dateTimeAdapter.isTimeFormatIncludesHours(format);
    }
}
