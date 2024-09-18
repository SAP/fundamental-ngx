import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    EventEmitter,
    forwardRef,
    inject,
    Inject,
    Injector,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import {
    CalendarComponent,
    CalendarYearGrid,
    DaysOfWeek,
    FdCalendarView,
    FdCalendarViewEnum
} from '@fundamental-ngx/core/calendar';
import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FormItemControl, PopoverFormMessageService, registerFormItemControl } from '@fundamental-ngx/core/form';
import { InputGroupInputDirective } from '@fundamental-ngx/core/input-group';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { Placement, SpecialDayRule } from '@fundamental-ngx/core/shared';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { DynamicComponentService, FocusTrapService, Nullable } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormMessageComponent } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { TimeModule } from '@fundamental-ngx/core/time';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { DatetimePickerMobileComponent } from './datetime-picker-mobile/datetime-picker-mobile.component';
import { DateTimePicker } from './datetime-picker.model';
import { createMissingDateImplementationError } from './errors';
import { FD_DATETIME_PICKER_COMPONENT, FD_DATETIME_PICKER_MOBILE_CONFIG } from './tokens';

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
    styleUrl: './datetime-picker.component.scss',
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
        {
            provide: FD_DATETIME_PICKER_COMPONENT,
            useExisting: DatetimePickerComponent
        },
        registerFormItemControl(DatetimePickerComponent),
        PopoverFormMessageService,
        PopoverService,
        DynamicComponentService
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-datetime'
    },
    standalone: true,
    imports: [
        NgTemplateOutlet,
        PopoverModule,
        InputGroupModule,
        FormsModule,
        FormMessageComponent,
        SegmentedButtonComponent,
        ButtonComponent,
        CalendarComponent,
        NgClass,
        TimeModule,
        BarModule,
        FdTranslatePipe
    ]
})
export class DatetimePickerComponent<D>
    implements
        DateTimePicker<D>,
        OnInit,
        OnDestroy,
        OnChanges,
        AfterViewInit,
        ControlValueAccessor,
        Validator,
        FormItemControl
{
    /** Placeholder for the inner input element. */
    @Input()
    placeholder = '';

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

    /** Id attribute for input element inside DateTimePicker component */
    @Input()
    inputId: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Define a custom datetime format. Can be a string for DayjsDatetimeAdapter or object for FdDatetimeAdapter  */
    @Input()
    customDateTimeFormat: unknown;

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

    /** aria-labelledby for element describing date-picker. */
    @Input()
    ariaLabelledBy: Nullable<string>;

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
    }

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
    date: Nullable<D>;

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen = false;

    /** The disableFunction for the calendar. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = FdCalendarViewEnum.Day;

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /**
     * @Input when set to true time component will use 2 digits for each number.
     * For example 9 will become 09
     * but 12 will be kept as 12.
     * Only uses by time component and does not change input format
     */
    @Input()
    keepTwoDigitsTime = false;

    /**
     *  The state of the form control - applies css classes.
     *  Also this is applied to message.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: FormStates) {
        this._state = state;
    }

    get state(): FormStates {
        if (this.useValidation && this.isInvalidDateInput) {
            return 'error';
        }
        return this._state;
    }

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

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

    /** Whether to render datetime picker in mobile mode. */
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
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    /** Event emitted when datepicker changes it's "touched" state. */
    @Output()
    readonly touched: EventEmitter<void> = new EventEmitter<void>();

    /** Indicates when datetime input is in invalid state. */
    get isInvalidDateInput(): boolean {
        return this._isInvalidDateInput && this._touched;
    }

    /** @hidden Reference to the inner calendar component. */
    @ViewChild(CalendarComponent, { static: false })
    private set _calendarCmp(calendar: CalendarComponent<D>) {
        setTimeout(() => {
            calendar?.setCurrentlyDisplayed(this._calendarPendingDate);
            calendar?.initialFocus();
        });
        this._calendarComponent = calendar;
    }

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
    @ViewChild('formMessageTemplate')
    private readonly _formMessageTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('pickerTemplate')
    private readonly _pickerTemplate: TemplateRef<any>;

    /** @hidden */
    _calendarComponent: CalendarComponent<D>;

    /** @hidden */
    _message: string | null = null;

    /** @hidden */
    _messageTriggers: string[] = ['focusin', 'focusout'];

    /**
     * @hidden
     * Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     */
    _inputFieldDate: string | null = null;

    /** @hidden */
    _isInvalidDateInput = false;

    /** @hidden The temporary Time object for use before 'OK' is pressed. Internal use. */
    _tempTime: Nullable<D>;

    /** @hidden The temporary CalendarDay object for use before 'OK' is pressed. Internal use. */
    _tempDate: Nullable<D>;

    /** @hidden */
    _meridian: boolean;

    /** @hidden */
    _displaySeconds: boolean;

    /** @hidden */
    _displayMinutes: boolean;

    /** @hidden */
    _displayHours: boolean;

    /** @hidden whether to display date or time in mobile mode */
    _displayType: 'date' | 'time' = 'date';

    /** @hidden */
    _showPopoverContents = false;

    /** @hidden */
    private _state: FormStates = 'default';

    /** @hidden */
    private _calendarPendingDate: Nullable<D>;

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _dynamicComponentService = inject(DynamicComponentService);

    /** @hidden */
    private readonly _focusTrapService = inject(FocusTrapService, {
        optional: true
    });

    /** @hidden */
    private _mobileComponentRef: Nullable<ComponentRef<DatetimePickerMobileComponent<D>>>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _touched = false;

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

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction: (value: D) => boolean = () => false;

    /** @hidden */
    onChange: (value: D | null) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnChanges(changes): void {
        if (changes.date) {
            this._setTempDateTime();
        }

        if (['displayHours', 'displayMinutes', 'displaySeconds', 'meridian'].some((input) => input in changes)) {
            this._calculateTimeOptions();
        }

        if ('isOpen' in changes) {
            this._showPopoverContents = this.isOpen;
            this._changeDetRef.detectChanges();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.date) {
            this._setTempDateTime();
        }

        this._calculateTimeOptions();

        this._subscriptions.add(
            this._dateTimeAdapter.localeChanges.pipe(filter(() => this._inputFieldDate !== '')).subscribe(() => {
                this._setInput(this.date);
                this._calculateTimeOptions();
                this._changeDetRef.detectChanges();
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._mobileComponentRef?.destroy();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._InitialiseVariablesInMessageService();

        if (this.mobile) {
            this._setUpMobileMode();
        }

        // update bindings after rendering
        // is needed to preperly reflect error state
        setTimeout(() => {
            this._changeDetRef.markForCheck();
        });
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(): { [key: string]: any } | null {
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
        if (this.isOpen) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }

    /**
     * Method that handles calendar active view change and throws event.
     */
    handleCalendarActiveViewChange(activeView: FdCalendarView): void {
        this.activeViewChange.emit(activeView);
    }

    /** Method that handles blur events on datetime picker input */
    handleOnTouched(event?: FocusEvent): void {
        this._touched = true;
        this.onTouched();
        this.touched.next();
        if (event) {
            this.handleInputChange((<HTMLInputElement>event.target).value, false);
        }
    }

    /** Opens the popover. */
    openPopover(): void {
        if (!this.isOpen && !this.disabled) {
            this._focusTrapService?.pauseCurrentFocusTrap();
            this._showPopoverContents = true;
            this._changeDetRef.detectChanges();
            this.isOpen = true;
            this._onOpenStateChanged(this.isOpen);
        }
    }

    /** Closes the popover and refresh model */
    closePopover(): void {
        if (!this.isOpen) {
            return;
        }
        this.onClose.emit();
        this.isOpen = false;
        this._changeDetRef.detectChanges();
        this._onOpenStateChanged(this.isOpen);
        this._focusTrapService?.unpauseCurrentFocusTrap();
        this.handleOnTouched();
        this._showPopoverContents = false;
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
    writeValue(selected: Nullable<D>): void {
        this.date = this._parseDate(selected);
        this._isInvalidDateInput = !this._isModelValid(this.date);
        if (this.isCurrentModelValid()) {
            this._setTempDateTime();
            this._refreshCurrentlyDisplayedCalendarDate(this.date);
        }
        this._setInput(this.date);
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
        // marking date & time as not null, errors will be caught below
        const currentDate = this._tempDate!;
        let currentTime = this._tempTime;

        if (!currentTime) {
            currentTime = this._dateTimeAdapter.today();
        }

        try {
            this.date = this._dateTimeAdapter.setTime(
                currentDate,
                this._dateTimeAdapter.getHours(currentTime),
                this._dateTimeAdapter.getMinutes(currentTime),
                this._dateTimeAdapter.getSeconds(currentTime)
            );
        } catch {
            this.date = null;
        }
        this._isInvalidDateInput = !this.isCurrentModelValid();

        this._setInput(this.date);

        this.onChange(this.date);

        if (this.showFooter) {
            this.closePopover();
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

    /**
     * @hidden
     * Looks like no one uses it. Should be removed?
     */
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
    handleInputChange(inputStr: string, isTypeEvent: boolean): void {
        if ((isTypeEvent && this.processInputOnBlur) || (!isTypeEvent && !this.processInputOnBlur)) {
            // if processInputOnBlur === true, ignore type event
            // if processInputOnBlur === false, ignore blur/enter event
            return;
        }
        this._inputFieldDate = inputStr ?? '';
        if (!inputStr) {
            this._isInvalidDateInput = !this.allowNull;
            this.date = null;
            this.onChange(null);
            return;
        }
        this.date = this._parseDate(inputStr);
        this._isInvalidDateInput = !this._isModelValid(this.date);

        if (!this._isInvalidDateInput) {
            this._setTempDateTime();
            this._refreshCurrentlyDisplayedCalendarDate(this.date);
        }
        this.onChange(this.date);
    }

    /** @hidden */
    dialogApprove(): void {
        this.isOpen = false;
        this.submit();
    }

    /** Method used to restore original value for mobile mode. */
    dialogDismiss(value: D): void {
        this.date = value;
        this.isOpen = false;
        this._setInput(this.date);

        this.onChange(this.date);
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
        if (!isOpen) {
            this._showPopoverContents = false;
            this._changeDetRef.detectChanges();
        }
    }

    /** Method that provides information if model selected date/dates have properly types and are valid */
    isCurrentModelValid(): boolean {
        return this._isModelValid(this.date);
    }

    /** Method that provides information if FdDateTime passed as arg has properly types and is valid */
    private _isModelValid(date: Nullable<D>): boolean {
        return (date === null && this.allowNull) || this._dateTimeAdapter.isValid(date);
    }

    /** @hidden */
    private _setInput(dateTime: Nullable<D>): void {
        this._inputFieldDate = dateTime ? this._formatDateTime(dateTime) : '';
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    private _refreshCurrentlyDisplayedCalendarDate(date: Nullable<D>): void {
        this._calendarPendingDate = date;
    }

    /**
     * @hidden
     * Format date time entity.
     */
    private _formatDateTime(dateTime: D): string {
        const formattedDate: string = this.customDateTimeFormat
            ? this._dateTimeAdapter.format(dateTime, this.customDateTimeFormat)
            : this._dateTimeAdapter.format(dateTime, this._dateTimeFormats.display.dateTimeInput);
        return formattedDate || '';
    }

    /** @hidden */
    private _InitialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.message = this._formMessageTemplate;
        this._popoverFormMessage.triggers = this._messageTriggers;
    }

    /** @hidden */
    private _parseDate(date: unknown): D | null {
        return this._dateTimeAdapter.parse(date, this._dateTimeFormats.parse.dateTimeInput);
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

    /** @hidden */
    private _setUpMobileMode(): void {
        const injector = Injector.create({
            providers: [
                { provide: FD_DATETIME_PICKER_COMPONENT, useValue: this },
                {
                    provide: FD_DATETIME_PICKER_MOBILE_CONFIG,
                    useValue: { pickerTemplate: this._pickerTemplate }
                }
            ],
            parent: this._injector
        });

        this._mobileComponentRef = this._dynamicComponentService.createDynamicComponent(
            {},
            DatetimePickerMobileComponent<D>,
            {
                container: 'body'
            },
            {
                injector
            }
        );
    }
}
