import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    DestroyRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { DynamicComponentService, FocusTrapService, Nullable } from '@fundamental-ngx/cdk/utils';
import { BarComponent, BarElementDirective, BarRightDirective } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    CalendarComponent,
    CalendarType,
    CalendarTypeEnum,
    CalendarYearGrid,
    DateRange,
    DaysOfWeek,
    FdCalendarView,
    FdCalendarViewEnum,
    NavigationButtonDisableFunction
} from '@fundamental-ngx/core/calendar';
import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import {
    FormItemControl,
    FormMessageComponent,
    PopoverFormMessageService,
    registerFormItemControl
} from '@fundamental-ngx/core/form';
import { InputGroupComponent, InputGroupInputDirective } from '@fundamental-ngx/core/input-group';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverModule, PopoverService } from '@fundamental-ngx/core/popover';
import { Placement, SpecialDayRule } from '@fundamental-ngx/core/shared';
import { FdLanguageKeyIdentifier, FdTranslatePipe } from '@fundamental-ngx/i18n';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DatePickerMobileComponent } from './date-picker-mobile/date-picker-mobile.component';
import { DatePicker } from './date-picker.model';
import { createMissingDateImplementationError } from './errors';
import { FD_DATE_PICKER_COMPONENT, FD_DATE_PICKER_MOBILE_CONFIG } from './tokens';

let datePickerCounter = 0;

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
    styleUrl: './date-picker.component.scss',
    host: {
        '(blur)': 'onTouched()',
        '[class.fd-date-picker]': 'true',
        '[class.fd-date-picker-custom]': 'inline'
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
        {
            provide: FD_DATE_PICKER_COMPONENT,
            useExisting: DatePickerComponent
        },
        registerFormItemControl(DatePickerComponent),
        PopoverFormMessageService,
        PopoverService,
        DynamicComponentService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgTemplateOutlet,
        PopoverModule,
        FormMessageComponent,
        InputGroupComponent,
        InputGroupInputDirective,
        FormsModule,
        CalendarComponent,
        BarComponent,
        BarRightDirective,
        BarElementDirective,
        ButtonComponent,
        FdTranslatePipe
    ]
})
export class DatePickerComponent<D>
    implements
        DatePicker<D>,
        OnInit,
        OnDestroy,
        OnChanges,
        AfterViewInit,
        ControlValueAccessor,
        Validator,
        FormItemControl
{
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = CalendarTypeEnum.Single;

    /** Date picker input placeholder string */
    @Input()
    placeholder = '';

    /** ID attribute for input element inside DatePicker component */
    @Input()
    inputId: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Define a custom datetime format. Can be a string for DayjsDatetimeAdapter or object for FdDatetimeAdapter */
    @Input()
    customDateTimeFormat: unknown;

    /** Text displayed in message */
    @Input()
    set message(message: string) {
        this._message = message;
    }

    /** The trigger events that will open/close the message box.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    set messageTriggers(triggers: string[]) {
        this._messageTriggers = triggers;
        this._popoverFormMessage.triggers = triggers;
    }

    /** The currently selected date model in single mode. */
    @Input()
    selectedDate: Nullable<D>;

    /** The currently selected date model in multiple mode. */
    @Input()
    selectedMultipleDates: Array<D> = [];

    /** The currently selected date model with start and end in range mode. */
    @Input()
    selectedRangeDate: DateRange<D> = { start: null, end: null };

    /** The currently selected date model with multiple ranges. */
    @Input()
    selectedMultipleDateRanges: Array<DateRange<D>> = [];

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek;

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect = false;

    /** Whether to validate the date picker input. */
    @Input()
    useValidation = true;

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = FdCalendarViewEnum.Day;

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

    /** Enables Today-Selection-Button if true */
    @Input()
    showTodayButton = false;

    /** Label for Today-Selection-Button */
    @Input()
    todayButtonLabel = 'Today';

    /**
     * Function used to disable previous button in the calendar header.
     */
    @Input()
    previousButtonDisableFunction: NavigationButtonDisableFunction<D>;

    /**
     * Function used to disable next button in the calendar header.
     */
    @Input()
    nextButtonDisableFunction: NavigationButtonDisableFunction<D>;

    /** The unique ID of the calendar legend, if the date picker calendar is to display a legend. */
    @Input()
    associatedLegendId: string;

    /**
     *  The state of the form control - applies css classes.
     *  Also, this is applied to message.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: Nullable<FormStates>) {
        this._state = state || 'default';
    }

    /** @hidden */
    get state(): FormStates {
        if (this._state == null && this.useValidation && this._isInvalidDateInput) {
            return 'error';
        }
        return this._state;
    }

    /**
     * @deprecated Popover is toggled with f4 key
     */
    @Input()
    buttonFocusable = false;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
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

    /**
     * Whether the user wants to select multiple days or multiple range dates.
     * If `displayWeekNumbers` is true, the user can click on the week number to mark the related row.
     * The user can click on week days to mark the related column.
     * Note: Clickable selection for week row or column does not work for range selections.
     */
    @Input()
    allowMultipleSelection = false;

    /** Whether the date picker is open. Can be used through two-way binding. */
    @Input()
    set isOpen(value: boolean) {
        if (value === this._isOpen) {
            return;
        }
        this._isOpen = value;
        this._showPopoverContents = value;
        this._changeDetectionRef.detectChanges();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    /** Should date picker be inlined. */
    @Input()
    inline = true;

    /** aria-labelledby for element describing date-picker. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * Whether to recalculate value from the input as user types or on blur.
     * By default, updates the value as user types.
     * @default false
     */
    @Input({ transform: booleanAttribute })
    processInputOnBlur = false;

    /**
     * Whether to prevent page scrolling when focusing date picker input field after calendar has been closed.
     */
    @Input()
    preventScrollOnFocus = false;

    /** Whether date picker should rendered in mobile mode. */
    @Input()
    mobile = false;

    /** Mobile mode configuration. */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    @Input()
    mobileLandscape = false;

    /** Whether calendar is used inside mobile in portrait mode */
    @Input()
    mobilePortrait = false;

    /** Whether to select and display the date range in MM/YYYY or YYYY format
     * For month and year format value is 'month'
     * For year format value is 'year'
     */
    @Input()
    dateRangeFormat = '';

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange = new EventEmitter<boolean>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<Nullable<D>> = new EventEmitter<Nullable<D>>();

    /** Event thrown every time the selected dates in multiple mode are changed. */
    @Output()
    readonly selectedMultipleDatesChange: EventEmitter<Array<D>> = new EventEmitter<Array<D>>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event thrown every time the first or last date in multiple range mode is changed. */
    @Output()
    readonly selectedMultipleDateRangesChange: EventEmitter<Array<DateRange<D>>> = new EventEmitter<
        Array<DateRange<D>>
    >();

    /** Event thrown every time calendar active view is changed */
    @Output()
    readonly activeViewChange = new EventEmitter<FdCalendarView>();

    /** @hidden */
    @ViewChild('inputGroupComponent', {
        read: ElementRef
    })
    _inputGroupElement: ElementRef;

    /** @hidden */
    @ViewChild(InputGroupInputDirective, {
        read: ElementRef
    })
    _inputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('controlTemplate')
    private readonly _controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('calendarTemplate')
    private readonly _calendarTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('popoverMessageTemplate')
    private readonly _messagePopoverTemplate: TemplateRef<any>;

    /** @hideen */
    @ViewChildren(CalendarComponent)
    private readonly _calendars: QueryList<CalendarComponent<D>>;

    /** @hidden */
    _calendarComponent: CalendarComponent<D>;

    /** @hidden */
    _message: string | null = null;

    /** @hidden */
    _messageTriggers: string[] = ['focusin', 'focusout'];

    /** @hidden The value of the input */
    _inputFieldDate: string | null = null;

    /** @hidden Whether the date input is invalid */
    _isInvalidDateInput = false;

    /** @hidden */
    _showPopoverContents = false;

    /** @hidden */
    readonly _formValueStateMessageId = `fd-date-picker-form-message-${datePickerCounter++}`;

    /** @hidden */
    private _isOpen = false;

    /** @hidden */
    private _calendarPendingDate: Nullable<D>;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _state: FormStates = 'default';

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _dynamicComponentService = inject(DynamicComponentService);

    /** @hidden */
    private readonly _focusTrapService = inject(FocusTrapService, {
        optional: true
    });

    /** @hidden */
    private _mobileComponentRef: Nullable<ComponentRef<DatePickerMobileComponent<D>>>;

    /** @hidden */
    get _rangeDelimiter(): string {
        return this._dateTimeFormats.rangeDelimiter;
    }

    /**
     * Date input aria label key based on type
     * @hidden
     */
    get _dateInputArialLabelKey(): FdLanguageKeyIdentifier {
        // return either input value or a key for "fdTranslate" pipe
        return this.type === CalendarTypeEnum.Range
            ? 'coreDatePicker.dateRangeInputLabel'
            : 'coreDatePicker.dateInputLabel';
    }

    /** @hidden */
    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional()
        private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional()
        @Inject(DATE_TIME_FORMATS)
        private _dateTimeFormats: DateTimeFormats,
        private _popoverFormMessage: PopoverFormMessageService
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    /**
     * Function used to disable certain dates in the calendar.
     */
    @Input()
    disableFunction: (value: D) => boolean = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     */
    @Input()
    disableRangeStartFunction: (value: D) => boolean = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     */
    @Input()
    disableRangeEndFunction: (value: D) => boolean = () => false;

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** @hidden */
    dialogApprove(): void {}

    /** @hidden */
    dialogDismiss(prevValue: D | Array<D> | DateRange<D> | Array<DateRange<D>>): void {
        if (this.allowMultipleSelection) {
            if (this._isMultipleDateRanges(prevValue)) {
                this.handleMultipleDateRangesChange(prevValue);
            } else {
                const value = prevValue as Array<D>;
                this.handleMultipleDatesChange(value);
            }
        } else {
            if (this._isDateRange(prevValue)) {
                this.handleRangeDateChange(prevValue);
            } else {
                const value = prevValue as D;
                this.handleSingleDateChange(value);
            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        // initial view should be month or year if dateRangeFormat is provided
        if (this.dateRangeFormat === 'month') {
            this.activeView = FdCalendarViewEnum.Month;
        } else if (this.dateRangeFormat === 'year') {
            this.activeView = FdCalendarViewEnum.Year;
        }

        this._dateTimeAdapter.localeChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this.formatInputDate(this.selectedDate);
            this._changeDetectionRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('isOpen' in changes) {
            this._showPopoverContents = this.isOpen;
            this._changeDetectionRef.detectChanges();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._InitialiseVariablesInMessageService();

        this._calendars.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            const calendar = this._calendars.first;
            this._calendarComponent = calendar;
            setTimeout(() => {
                if (this._calendarComponent) {
                    this._focusTrapService?.pauseCurrentFocusTrap();
                } else {
                    this._focusTrapService?.unpauseCurrentFocusTrap();
                }

                calendar?.setCurrentlyDisplayed(this._calendarPendingDate);
                calendar?.initialFocus();
            });
        });

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._mobileComponentRef?.destroy();
    }

    /**
     * Method that handle calendar active view change and throws event.
     */
    handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** @hidden */
    closeFromCalendar(): void {
        if (this.type === CalendarTypeEnum.Single && this.closeOnDateChoose && !this.allowMultipleSelection) {
            this.onTouched();
            this.closeCalendar();
        }
    }

    /** Opens the calendar */
    openCalendar(): void {
        if (this.disabled) {
            return;
        }
        this._setOpenState(true);
        this._changeMessageVisibility();
    }

    /** Toggles the calendar open or closed */
    toggleCalendar(): void {
        if (this.disabled) {
            return;
        }
        this._setOpenState(!this.isOpen);
        if (!this.isOpen) {
            this.onTouched();
        }
        this._changeMessageVisibility();
    }

    /** Closes the calendar if it is open */
    closeCalendar(): void {
        if (!this.isOpen) {
            return;
        }
        this._setOpenState(false);
        this._changeMessageVisibility();
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected single date changed
     */
    handleSingleDateChange(date: D): void {
        if (!date) {
            return;
        }
        this.selectedDate = date;
        this.selectedDateChange.emit(date);
        this.onChange(date);
        this._refreshCurrentlyDisplayedCalendarDate(date);
        this.formatInputDate(date);
        this._isInvalidDateInput = !this.isModelValid();
        if (this.closeOnDateChoose && this.type === CalendarTypeEnum.Single) {
            this.closeCalendar();
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from the calendar component when the selected multiple dates change.
     */
    handleMultipleDatesChange(dates: Array<D>): void {
        if (!dates || dates.length === 0) {
            this.selectedMultipleDates = [];
            this.selectedMultipleDatesChange.emit([]);
            this.onChange([]);
            this._refreshCurrentlyDisplayedCalendarDate(null);
            this._inputFieldDate = null;
            return;
        }
        this.selectedMultipleDates = dates;
        this.selectedMultipleDatesChange.emit(dates);
        this.onChange(dates);
        /** Assuming the first date in the array is used for refresh */
        if (this.showTodayButton) {
            this._refreshCurrentlyDisplayedCalendarDate(dates[0]);
        }
        this._inputFieldDate = this.formatDateArray(dates);
        this._isInvalidDateInput = !this.isModelValid();
    }

    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected range date changed
     */
    handleRangeDateChange(dates: DateRange<D>): void {
        const startChanged = !this._dateTimeAdapter.datesEqual(dates.start, this.selectedRangeDate.start);
        const endChanged = !this._dateTimeAdapter.datesEqual(dates.end, this.selectedRangeDate.end);
        if (dates && (startChanged || endChanged)) {
            const shouldClose = this.closeOnDateChoose && dates.end !== null;
            if (dates.end !== null) {
                this._inputFieldDate = this._formatDateRange(dates);
                this.selectedRangeDate = {
                    start: dates.start,
                    end: dates.end
                };
                this.selectedRangeDateChange.emit(this.selectedRangeDate);
                this.onChange(this.selectedRangeDate);
                this._refreshCurrentlyDisplayedCalendarDate(dates.start);
                this._isInvalidDateInput = !this.isModelValid();
            }
            if (shouldClose) {
                this.closeCalendar();
            }
        }
    }

    /**
     * @hidden
     * Method that is triggered by events from the calendar component when the selected multiple range dates change.
     */
    handleMultipleDateRangesChange(dates: Array<DateRange<D>>): void {
        let hasChanged = false;

        // Check for changes in the date ranges
        if (dates.length !== this.selectedMultipleDateRanges.length) {
            hasChanged = true;
        } else {
            for (let i = 0; i < dates.length; i++) {
                if (
                    !this._dateTimeAdapter.datesEqual(dates[i].start, this.selectedMultipleDateRanges[i].start) ||
                    !this._dateTimeAdapter.datesEqual(dates[i].end, this.selectedMultipleDateRanges[i].end)
                ) {
                    hasChanged = true;
                    break;
                }
            }
        }

        // If any date range has changed, update the internal state and emit changes
        if (hasChanged) {
            this.selectedMultipleDateRanges = dates;

            // Update the formatted input field
            this._inputFieldDate = this._formatMultipleDateRanges(dates);

            // Emit the change event
            this.selectedMultipleDateRangesChange.emit(this.selectedMultipleDateRanges);

            // Perform any additional actions such as updating the model or refreshing the calendar
            this.onChange(this.selectedMultipleDateRanges);
            // if you want to refresh the calendar view, you can use the following line
            // this._refreshCurrentlyDisplayedCalendarDate(dates[0].start);
            this._calendarPendingDate = dates[0].start;
            this._isInvalidDateInput = !this.isModelValid();
        }
    }

    /**
     * @hidden
     * Method that is triggered date formatting in the date control
     */
    formatInputDate(date: Nullable<D>): void {
        if (!date) {
            return;
        }
        this._inputFieldDate = this._formatDate(date);
    }

    /**
     * @hidden
     * Method that is triggered when Today-Selection-Button clicked, it changes selected date or date range to today's date
     */
    onTodayButtonClick(): void {
        const todayDate = this._dateTimeAdapter.today();
        if (this.allowMultipleSelection) {
            if (this.type === CalendarTypeEnum.Single) {
                this.handleMultipleDatesChange([todayDate]);
                this.closeFromCalendar();
            } else if (this.type === CalendarTypeEnum.Range) {
                this.handleMultipleDateRangesChange([
                    {
                        start: todayDate,
                        end: todayDate
                    }
                ]);
            }
        } else {
            if (this.type === CalendarTypeEnum.Single) {
                this.handleSingleDateChange(todayDate);
                this.closeFromCalendar();
            } else if (this.type === CalendarTypeEnum.Range) {
                this.handleRangeDateChange({
                    start: todayDate,
                    end: todayDate
                });
            }
        }
    }

    /**
     * @hidden
     * Method that is triggered when the text input is confirmed to ba changed, by clicking enter, or blur
     */
    handleInputChange(strDate: string, isTypeEvent: boolean): void {
        if ((isTypeEvent && this.processInputOnBlur) || (!isTypeEvent && !this.processInputOnBlur)) {
            // if processInputOnBlur === true, ignore type event
            // if processInputOnBlur === false, ignore blur/enter event
            return;
        }
        this.dateStringUpdate(strDate);
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(): {
        [key: string]: any;
    } | null {
        return this.isModelValid()
            ? null
            : {
                  dateValidation: {
                      valid: false
                  }
              };
    }

    /** @hidden */
    registerOnChange(
        fn: (selected: any) => {
            void;
        }
    ): void {
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
    writeValue(selected: D | Array<D> | DateRange<D> | Array<DateRange<D>> | null): void {
        /** If written value is not defined, null, empty string */
        if (!selected) {
            this._inputFieldDate = '';
            this._refreshCurrentlyDisplayedCalendarDate(this._dateTimeAdapter.today());
            this.selectedRangeDate = {
                start: null,
                end: null
            };
            this.selectedDate = null;
            this.selectedMultipleDates = [];
            this.selectedMultipleDateRanges = [];
            this._changeDetectionRef.detectChanges();
            return;
        }
        if (this.allowMultipleSelection && Array.isArray(selected)) {
            if (this.type === CalendarTypeEnum.Single) {
                /**
                 * For single mode, if the date is invalid, model is changed, it refreshes currently
                 * input field text, but it does not refresh currently displayed day
                 */
                // selected = this._parseDate(selected)
                selected = <Array<D>>selected;

                this.selectedMultipleDates = selected;
                this._inputFieldDate = this.formatDateArray(selected);
                this._refreshCurrentlyDisplayedCalendarDate(selected[0]);
            }
            if (this.type === CalendarTypeEnum.Range) {
                /**
                 * For range mode, if the date is invalid, model is changed, but it does not refresh currently
                 * displayed day view, or input field text
                 */
                selected = selected as Array<DateRange<D>>;
                if (selected && selected.length > 0) {
                    const filteredRanges = selected.filter((range) => range.start !== null && range.end !== null);
                    if (filteredRanges.length > 0) {
                        this.selectedMultipleDateRanges = filteredRanges.map((range) => ({
                            start: this._parseDate(range.start),
                            end: this._parseDate(range.end)
                        }));
                        this._refreshCurrentlyDisplayedCalendarDate(filteredRanges[0].start);
                        this._inputFieldDate = this._formatMultipleDateRanges(filteredRanges);
                    } else {
                        this._inputFieldDate = '';
                    }
                } else {
                    this._inputFieldDate = '';
                }
            }
        } else {
            if (this.type === CalendarTypeEnum.Single) {
                /**
                 * For single mode, if the date is invalid, model is changed, it refreshes currently
                 * input field text, but it does not refresh currently displayed day
                 */
                selected = this._parseDate(selected) as D;
                this.selectedDate = selected;
                this._inputFieldDate = this._formatDate(selected);
                this._refreshCurrentlyDisplayedCalendarDate(selected);
            }
            if (this.type === CalendarTypeEnum.Range) {
                /**
                 * For range mode, if the date is invalid, model is changed, but it does not refresh currently
                 * displayed day view, or input field text
                 */
                selected = selected as DateRange<D>;
                if (selected?.start) {
                    this.selectedRangeDate = {
                        start: this._parseDate(selected.start),
                        end: this._parseDate(selected.end)
                    };
                    this._refreshCurrentlyDisplayedCalendarDate(selected.start);
                    this._inputFieldDate = this._formatDateRange(selected);
                } else {
                    this._inputFieldDate = '';
                }
            }
        }

        this._isInvalidDateInput = !this.isModelValid();
        this._changeDetectionRef.detectChanges();
    }

    /**
     * @hidden
     * Method, which is responsible for transforming string to date, depending on type or
     * validation the results are different. It also changes the state of _isInvalidDateInput
     */
    dateStringUpdate(dateStr: string): void {
        this._inputFieldDate = dateStr;
        if (this.allowMultipleSelection) {
            if (this.type === CalendarTypeEnum.Single) {
                this.updateMultipleDates(dateStr);
            } else {
                this._updateMultipleDateRanges(dateStr);
            }
        } else {
            if (this.type === CalendarTypeEnum.Single) {
                this._updateSingleDate(dateStr);
            } else {
                this._updateRangeDate(dateStr);
            }
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isModelValid(): boolean {
        if (this.allowMultipleSelection) {
            if (this.type === CalendarTypeEnum.Single) {
                return this._isMultipleModelValid(this.selectedMultipleDates);
            } else {
                return this._isMultipleRangesModelValid(this.selectedMultipleDateRanges);
            }
        } else {
            if (this.type === CalendarTypeEnum.Single) {
                return this._isSingleModelValid(this.selectedDate);
            } else {
                return this._isRangeModelValid(this.selectedRangeDate);
            }
        }
    }

    /** Returns current selected date. */
    getSelectedDate(): D | Array<D> | DateRange<D> | Array<DateRange<D>> {
        return (
            this.selectedDate || this.selectedMultipleDates || this.selectedRangeDate || this.selectedMultipleDateRanges
        );
    }

    /** @hidden */
    _changeMessageVisibility(): void {
        if (this.isOpen) {
            this._popoverFormMessage.hide();
        } else {
            this._popoverFormMessage.show();
        }
    }

    /** @hidden */
    _onOpenStateChanged(isOpen: boolean): void {
        this.isOpenChange.emit(isOpen);
        this._changeMessageVisibility();
        // focus input control every time popup is closed
        if (!isOpen && this._inputElement) {
            this._inputElement.nativeElement.focus({
                preventScroll: this.preventScrollOnFocus
            });
        }
    }

    /**
     * Renders the calendar right before the popover is opened.
     * Used for correct calculations of overlay position and size.
     */
    _beforePopoverOpen(): void {
        this._showPopoverContents = true;
        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    _onBlur(event: FocusEvent): void {
        this.onTouched();
        this.handleInputChange((event.target as any).value, false);
    }

    /** Method that returns info if single model given is valid */
    private _isSingleModelValid(date: Nullable<D>): boolean {
        return (this._isDateValid(date) && !this.disableFunction(date)) || (!date && this.allowNull);
    }

    /** Method that returns info if multiple date model given is valid */
    private _isMultipleModelValid(dates: Array<Nullable<D>>): boolean {
        return dates?.every((date) => this._isSingleModelValid(date));
    }

    /** Method that returns info if range date model given is valid */
    private _isRangeModelValid(fdRangeDate: DateRange<D>): boolean {
        return (
            (fdRangeDate && this._isStartDateValid(fdRangeDate.start) && this._isEndDateValid(fdRangeDate.end)) ||
            (!fdRangeDate.start && !fdRangeDate.end && this.allowNull)
        );
    }

    /** Method that returns info if multiple range date model given is valid */
    private _isMultipleRangesModelValid(ranges: Array<DateRange<D>>): boolean {
        if (!ranges || ranges.length === 0) {
            return this.allowNull;
        }
        return ranges.every((range) => range.start && range.end && this._isRangeModelValid(range));
    }

    /** Method that returns info if end date model given is valid */
    private _isEndDateValid(endDate: Nullable<D>): boolean {
        return this._isDateValid(endDate) && !this.disableRangeEndFunction(endDate);
    }

    /** Method that returns info if start date model given is valid */
    private _isStartDateValid(startDate: Nullable<D>): boolean {
        return this._isDateValid(startDate) && !this.disableRangeStartFunction(startDate);
    }

    /** Method that returns info if given date model is valid */
    private _isDateValid(date: Nullable<D>): date is D {
        return this._dateTimeAdapter.isValid(date);
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: Nullable<D>): void {
        this._calendarPendingDate = date;
        this._calendarComponent?.setCurrentlyDisplayed(date);
    }

    /** @hidden */
    private _formatDate(date: Nullable<D>): string {
        if (this.customDateTimeFormat) {
            return this._dateTimeAdapter.format(date, this.customDateTimeFormat);
        }
        return this._dateTimeAdapter.format(date, this._dateTimeFormats.display.dateInput);
    }

    /** @hidden */
    private formatDateArray(dates: Array<D>): string {
        return dates.map((date) => this._formatDate(date)).join(', ');
    }

    /** @hidden */
    private _parseDate(date: unknown): D | null {
        return this._dateTimeAdapter.parse(date, this._dateTimeFormats.parse.dateInput);
    }

    /**
     * Helper method to parse a date string into an array of dates.
     * @param dateStr The date string to parse.
     * @returns An array of dates.
     */
    private parseDateString(dateStr: string): D[] {
        return dateStr
            .split(',')
            .map((date) => this._parseDate(date.trim()))
            .filter((date) => date !== null) as D[];
    }

    /** @hidden */
    private _formatDateRange(dateRange: DateRange<D>): string {
        const startDate = this._formatDate(dateRange.start);
        const endDate = this._formatDate(dateRange.end);
        return startDate + this._rangeDelimiter + endDate;
    }

    /** @hidden */
    private _formatMultipleDateRanges(dateRanges: Array<DateRange<D>>): string {
        return dateRanges.map((dateRange) => this._formatDateRange(dateRange)).join(', ');
    }

    /** @hidden */
    private _InitialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.triggers = this._messageTriggers;
        this._popoverFormMessage.message = this._messagePopoverTemplate;
    }

    /** @hidden */
    private _setOpenState(isOpen: boolean): void {
        this._showPopoverContents = isOpen;
        this._changeDetectionRef.detectChanges();
        this.isOpen = isOpen;
        this.isOpenChange.emit(this.isOpen);
        this._changeDetectionRef.detectChanges();
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        const injector = Injector.create({
            providers: [
                { provide: FD_DATE_PICKER_COMPONENT, useValue: this },
                {
                    provide: FD_DATE_PICKER_MOBILE_CONFIG,
                    useValue: { calendarTemplate: this._calendarTemplate, controlTemplate: this._controlTemplate }
                }
            ],
            parent: this._injector
        });

        this._mobileComponentRef = this._dynamicComponentService.createDynamicComponent(
            {},
            DatePickerMobileComponent<D>,
            {
                container: 'body'
            },
            {
                injector
            }
        );
    }

    /** @hidden */
    private _isDateRange(value: any): value is DateRange<D> {
        return !!value && value.start && value.end;
    }

    /** @hidden */
    private _isMultipleDateRanges(value: any): value is Array<DateRange<D>> {
        return Array.isArray(value) && value.every((item) => this._isDateRange(item));
    }

    /**
     * @hidden
     * Updates the selected single date from a date string.
     * @param dateStr The date string to parse and update the selected date.
     */
    private _updateSingleDate(dateStr: string): void {
        if (!dateStr) {
            this._isInvalidDateInput = !this.allowNull;
            this.selectedDate = null;
            this._refreshCurrentlyDisplayedCalendarDate(this.selectedDate);
            this.onChange(this.selectedDate);
            this.selectedDateChange.emit(this.selectedDate);
            return;
        }
        const date = this._parseDate(dateStr);

        if (!this._dateTimeAdapter.datesEqual(date, this.selectedDate)) {
            this._isInvalidDateInput = !this._isSingleModelValid(date);

            if (!this._isInvalidDateInput) {
                this._refreshCurrentlyDisplayedCalendarDate(date);
            }

            this.selectedDate = date;
            this.onChange(this.selectedDate);
            this.selectedDateChange.emit(this.selectedDate);
        }
    }

    /**
     * @hidden
     * Updates the selected range date from a date string.
     * @param dateStr The date string to parse and update the selected range date.
     */
    private _updateRangeDate(dateStr: string): void {
        if (!dateStr) {
            this._isInvalidDateInput = !this.allowNull;
            this.selectedRangeDate = { start: null, end: null };
            this._refreshCurrentlyDisplayedCalendarDate(this.selectedRangeDate.start);
            this.onChange(this.selectedRangeDate);
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            return;
        }

        const [startDateStr, endDateStr] = dateStr.split(this._rangeDelimiter);
        const startDate = this._parseDate(startDateStr);
        const endDate = this._parseDate(endDateStr);

        if (
            !this._dateTimeAdapter.datesEqual(startDate, this.selectedRangeDate.start) ||
            !this._dateTimeAdapter.datesEqual(endDate, this.selectedRangeDate.end)
        ) {
            let selectedRangeDate: DateRange<D> | null = null;

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
            this.selectedRangeDate = selectedRangeDate;
            this.selectedRangeDateChange.emit(this.selectedRangeDate);
            this.onChange(this.selectedRangeDate);

            if (this._isStartDateValid(this.selectedRangeDate.start)) {
                this._refreshCurrentlyDisplayedCalendarDate(this.selectedRangeDate.start);
            }
        }
    }

    /**
     * @hidden
     * Updates the selected multiple dates from a date string.
     * @param dateStr The date string to parse and update the selected multiple dates.
     */
    private updateMultipleDates(dateStr: string): void {
        if (!dateStr) {
            this._isInvalidDateInput = !this.allowNull;
            this.selectedMultipleDates = [];
            this._refreshCurrentlyDisplayedCalendarDate(null);
            this.onChange(this.selectedMultipleDates);
            this.selectedMultipleDatesChange.emit(this.selectedMultipleDates);
            return;
        }

        const parsedDates = this.parseDateString(dateStr);

        // Check if the new parsed dates are different from the previously selected dates
        const datesChanged = !this._areDatesEqual(parsedDates, this.selectedMultipleDates);

        if (datesChanged) {
            this._isInvalidDateInput = !this._isMultipleModelValid(parsedDates);

            if (!this._isInvalidDateInput) {
                this._refreshCurrentlyDisplayedCalendarDate(parsedDates[0]);
            }

            this.selectedMultipleDates = parsedDates;
            this.onChange(this.selectedMultipleDates);
            this.selectedMultipleDatesChange.emit(this.selectedMultipleDates);
        }
    }

    /** Helper method to compare two arrays of dates */
    private _areDatesEqual(dates1: D[], dates2: D[]): boolean {
        if (dates1.length !== dates2.length) {
            return false;
        }
        return dates1.every((date, index) => this._dateTimeAdapter.datesEqual(date, dates2[index]));
    }

    /**
     * @hidden
     * Updates the selected multiple date ranges from a date string.
     * @param dateStr The date string to parse and update the selected multiple date ranges.
     */
    private _updateMultipleDateRanges(dateStr: string): void {
        if (!dateStr) {
            this._isInvalidDateInput = !this.allowNull;
            this.selectedMultipleDateRanges = [{ start: null, end: null }];
            this._refreshCurrentlyDisplayedCalendarDate(null);
            this.onChange(this.selectedMultipleDateRanges);
            this.selectedMultipleDateRangesChange.emit(this.selectedMultipleDateRanges);
            return;
        }

        const rangeStrings = dateStr.split(',').map((range) => range.trim());
        const parsedRanges = rangeStrings.map((rangeStr) => {
            const [startStr, endStr] = rangeStr.split(this._rangeDelimiter).map((date) => date.trim());
            return {
                start: this._parseDate(startStr),
                end: this._parseDate(endStr)
            };
        });

        // Check if the new parsed ranges are different from the previously selected ranges
        const rangesChanged = !this._areDateRangesEqual(parsedRanges, this.selectedMultipleDateRanges);

        this._isInvalidDateInput = !this._isMultipleRangesModelValid(parsedRanges);

        if (!this._isInvalidDateInput && rangesChanged) {
            if (this._isStartDateValid(this.selectedMultipleDateRanges[0].start)) {
                this._refreshCurrentlyDisplayedCalendarDate(this.selectedMultipleDateRanges[0].start);
            }
            this.selectedMultipleDateRanges = parsedRanges;
            this.onChange(this.selectedMultipleDateRanges);
            this.selectedMultipleDateRangesChange.emit(this.selectedMultipleDateRanges);
        }
    }

    /** Helper method to compare two arrays of date ranges */
    private _areDateRangesEqual(ranges1: DateRange<D>[], ranges2: DateRange<D>[]): boolean {
        if (ranges1.length !== ranges2.length) {
            return false;
        }
        return ranges1.every(
            (range, index) =>
                this._dateTimeAdapter.datesEqual(range.start, ranges2[index].start) &&
                this._dateTimeAdapter.datesEqual(range.end, ranges2[index].end)
        );
    }
}
