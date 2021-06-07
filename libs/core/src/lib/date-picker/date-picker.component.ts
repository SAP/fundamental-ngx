import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Placement } from '@fundamental-ngx/core/shared';
import { FormStates } from '@fundamental-ngx/core/shared';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';
import { CalendarComponent, CalendarType, DaysOfWeek, FdCalendarView } from '@fundamental-ngx/core/calendar';
import { CalendarYearGrid } from '@fundamental-ngx/core/calendar';
import { DateRange } from '@fundamental-ngx/core/calendar';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DateTimeFormats, DATE_TIME_FORMATS } from '@fundamental-ngx/core/datetime';
import { createMissingDateImplementationError } from './errors';
import { PopoverFormMessageService } from '@fundamental-ngx/core/form';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { ContentDensityService } from '@fundamental-ngx/core/utils';

/**
 * The datetime picker component is an opinionated composition of the fd-popover and
 * fd-calendar components to accomplish the UI pattern for picking a date.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-date-picker [(ngModel)]="date"></fd-date-picker>
 * ```
 *
 */
@Component({
    selector: 'fd-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-date-picker]': 'true',
        '[class.fd-date-picker-custom]': 'true'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        },
        PopoverFormMessageService,
        PopoverService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent<D> implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor, Validator {

    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = 'single';

    /** Date picker input placeholder string */
    @Input()
    placeholder = '';

    /** Whether this is the compact input date picker */
    @Input()
    compact?: boolean;

    /** Id attribute for input element inside DatePicker component */
    @Input()
    inputId: string;

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

    /** The currently selected CalendarDay model */
    @Input()
    selectedDate: D;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    selectedRangeDate: DateRange<D> = { start: null, end: null };

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect = false;

    /** Whether to validate the date picker input. */
    @Input()
    useValidation = true;

    /** Aria label for the datepicker input. */
    @Input()
    dateInputLabel = 'Date input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayCalendarToggleLabel = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = 'day';

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /** Whether the date picker is disabled. */
    @Input()
    disabled: boolean;

    /** Defines if date picker should be closed after date choose */
    @Input()
    closeOnDateChoose = true;

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
    /** @hidden */
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

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = true;

    /** Whether the date picker is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange = new EventEmitter<boolean>();

    /** Fired when a new date is selected. */
    @Output()
    readonly selectedDateChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event thrown every time calendar active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** @hidden */
    @ViewChild(CalendarComponent)
    _calendarComponent: CalendarComponent<D>;

    /** @hidden */
    @ViewChild('inputGroupComponent', { read: ElementRef  })
    _inputGroupElement: ElementRef

    /** @hidden The value of the input */
    _inputFieldDate: string = null;

    /** @hidden Whether the date input is invalid */
    _isInvalidDateInput = false;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /**
     * Function used to disable certain dates in the calendar.
     * @param date date representation
     */
    @Input()
    disableFunction = function (_: D): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param date date representation
     */
    @Input()
    disableRangeStartFunction = function (_: D): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param date date representation
     */
    @Input()
    disableRangeEndFunction = function (_: D): boolean {
        return false;
    };

    /** @hidden */
    onChange: any = (_: any) => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    get rangeDelimiter(): string {
        return this._dateTimeFormats.rangeDelimiter;
    }

    /** @hidden */
    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        private _popoverFormMessage: PopoverFormMessageService,
        @Optional() private _contentDensityService: ContentDensityService
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this.formatInputDate(this.selectedDate);
            this._changeDetectionRef.detectChanges();
        });
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener.subscribe(density => {
                this.compact = density !== 'cozy';
                this._changeDetectionRef.markForCheck();
            }));
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._InitialiseVariablesInMessageService();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * Method that handle calendar active view change and throws event.
     */
    public handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** @hidden */
    public closeFromCalendar(): void {
        if (this.type === 'single' && this.closeOnDateChoose) {
            this.closeCalendar();
        }
    }

    /** Opens the calendar */
    openCalendar(): void {
        if (!this.disabled) {
            this.onTouched();
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
            this._changeMessageVisibility();
        }
    }

    /** Toggles the calendar open or closed */
    public toggleCalendar(): void {
        this.onTouched();
        this.isOpen = !this.isOpen;
        this.isOpenChange.emit(this.isOpen);
        this._changeMessageVisibility();
    }

    /** Closes the calendar if it is open */
    public closeCalendar(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
            this._changeMessageVisibility();
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    public handleSingleDateChange(date: D): void {
        if (date) {
            this.selectedDate = date;
            this.selectedDateChange.emit(date);
            this.onChange(date);
            this.formatInputDate(date);
            this._isInvalidDateInput = !this.isModelValid();
        }
    }

    /**
     * @hidden
     * Method that is triggered date formatting in the date control
     */
    public formatInputDate(date: D): void {
        if (date) {
            this._inputFieldDate = this._formatDate(date);
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    public handleRangeDateChange(dates: DateRange<D>): void {
        if (
            dates &&
            (!this._dateTimeAdapter.datesEqual(this.selectedRangeDate.start, dates.start) ||
                !this._dateTimeAdapter.datesEqual(this.selectedRangeDate.end, dates.end))
        ) {
            this._inputFieldDate = this._formatDateRange(dates);
            this.selectedRangeDate = { start: dates.start, end: dates.end };
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);
            this._isInvalidDateInput = !this.isModelValid();
        }
    }

    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    public handleInputChange(strDate: string): void {
        this.dateStringUpdate(strDate);
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
        return this.isModelValid()
            ? null
            : {
                  dateValidation: {
                      valid: false
                  }
              };
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
        this._changeDetectionRef.detectChanges();
    }

    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     */
    writeValue(selected: DateRange<D> | D): void {
        /** If written value is not defined, null, empty string */
        if (!selected) {
            this._inputFieldDate = '';
            this._changeDetectionRef.detectChanges();
            return;
        }
        if (this.type === 'single') {
            /**
             * For single mode, if the date is invalid, model is changed, it refresh currently
             * input field text, but it does not refresh currently displayed day
             */
            selected = selected as D;
            this.selectedDate = selected;

            if (this._isSingleModelValid(this.selectedDate)) {
                this._inputFieldDate = this._formatDate(selected);
                this._refreshCurrentlyDisplayedCalendarDate(selected);
            } else {
                this._inputFieldDate = '';
            }
        } else {
            /**
             * For range mode, if the date is invalid, model is changed, but it does not refresh currently
             * displayed day view, or input field text
             */
            selected = selected as DateRange<D>;

            if (selected.start) {
                this.selectedRangeDate = { start: selected.start, end: selected.end };

                if (this._isRangeModelValid(this.selectedRangeDate)) {
                    this._refreshCurrentlyDisplayedCalendarDate(selected.start);
                    this._inputFieldDate = this._formatDateRange(selected);
                } else {
                    this._inputFieldDate = '';
                }
            } else {
                this._inputFieldDate = '';
            }
        }
        this._changeDetectionRef.detectChanges();
        this._isInvalidDateInput = !this.isModelValid();
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes to state of _isInvalidDateInput
     */
    dateStringUpdate(dateStr: string): void {
        this._inputFieldDate = dateStr;
        /** Case when there is single mode */
        if (this.type === 'single') {
            const date = this._dateTimeAdapter.parse(dateStr, this._dateTimeFormats.parse.dateInput);

            /** Check if dates are equal, if so, there is no need to make any changes */
            if (!this._dateTimeAdapter.datesEqual(date, this.selectedDate)) {
                this._isInvalidDateInput = !this._isSingleModelValid(date);

                /** Check if date is valid, if it's not, there is no need to refresh calendar */
                if (!this._isInvalidDateInput && dateStr) {
                    this._refreshCurrentlyDisplayedCalendarDate(date);
                }

                /**
                 * Date in model is changed no matter if the parsed date from string is valid or not.
                 */
                this.selectedDate = date;
                this.onChange(this.selectedDate);
                this.selectedDateChange.emit(this.selectedDate);
            }

            /** Case when there is range mode */
        } else {
            const [startDateStr, endDateStr] = dateStr.split(this.rangeDelimiter);
            const startDate = this._dateTimeAdapter.parse(startDateStr, this._dateTimeFormats.parse.dateInput);
            const endDate = this._dateTimeAdapter.parse(endDateStr, this._dateTimeFormats.parse.dateInput);

            /**
             * Check if dates are equal, if dates are the same there is no need to make any changes
             * Date in model is changed no matter if the parsed dates from string are valid or not.
             */
            if (
                !this._dateTimeAdapter.datesEqual(startDate, this.selectedRangeDate.start) ||
                !this._dateTimeAdapter.datesEqual(endDate, this.selectedRangeDate.end)
            ) {
                let selectedRangeDate: DateRange<D> = null;

                /** If the end date is before the start date, there is need to replace them  */
                if (
                    this._dateTimeAdapter.isValid(startDate) &&
                    this._dateTimeAdapter.isValid(endDate) &&
                    this._dateTimeAdapter.compareDate(startDate, endDate) > 0
                ) {
                    selectedRangeDate = { start: endDate, end: startDate };
                } else {
                    selectedRangeDate = { start: startDate, end: endDate };
                }

                this._isInvalidDateInput = !this._isRangeModelValid(selectedRangeDate);

                /** Whole object is changed, even it's invalid */
                this.selectedRangeDate = selectedRangeDate;

                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange(this.selectedRangeDate);

                /** Check if start date is valid, if it's not, there is no need o refresh calendar */
                if (this._isStartDateValid(this.selectedRangeDate.start)) {
                    this._refreshCurrentlyDisplayedCalendarDate(this.selectedRangeDate.start);
                }
            }
        }

        if (!dateStr && this.allowNull) {
            this._isInvalidDateInput = false;
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean {
        if (this.type === 'single') {
            return this._isSingleModelValid(this.selectedDate);
        } else {
            return this._isRangeModelValid(this.selectedRangeDate);
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

    /** Method that returns info if single model given is valid */
    private _isSingleModelValid(date: D): boolean {
        return (this._isDateValid(date) && !this.disableFunction(date)) || (!this._inputFieldDate && this.allowNull);
    }

    /** Method that returns info if range date model given is valid */
    private _isRangeModelValid(fdRangeDate: DateRange<D>): boolean {
        return (
            (fdRangeDate && this._isStartDateValid(fdRangeDate.start) && this._isEndDateValid(fdRangeDate.end)) ||
            (!this._inputFieldDate && this.allowNull)
        );
    }

    /** Method that returns info if end date model given is valid */
    private _isEndDateValid(endDate: D): boolean {
        return this._isDateValid(endDate) && !this.disableRangeEndFunction(endDate);
    }

    /** Method that returns info if start date model given is valid */
    private _isStartDateValid(startDate: D): boolean {
        return this._isDateValid(startDate) && !this.disableRangeStartFunction(startDate);
    }

    /** Method that returns info if given date model is valid */
    private _isDateValid(date: D): boolean {
        return this._dateTimeAdapter.isValid(date);
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: D): void {
        if (this._calendarComponent) {
            this._calendarComponent.setCurrentlyDisplayed(date);
        }
    }

    /** @hidden */
    private _formatDate(date: D): string {
        return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateInput);
    }

    /** @hidden */
    private _formatDateRange(dateRange: DateRange<D>): string {
        const startDate = this._formatDate(dateRange.start);
        const endDate = this._formatDate(dateRange.end);
        return startDate + this.rangeDelimiter + endDate;
    }

    /** @hidden */
    private _InitialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.message = this._message;
        this._popoverFormMessage.triggers = this._messageTriggers;
        this._popoverFormMessage.messageType = this._state;
    }
}
