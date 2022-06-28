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
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Placement, FormStates, ValueStateAriaMessageService } from '@fundamental-ngx/core/shared';
import { DatetimeAdapter, DATE_TIME_FORMATS, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TimeComponent } from '@fundamental-ngx/core/time';
import { PopoverFormMessageService } from '@fundamental-ngx/core/form';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { InputGroupInputDirective } from '@fundamental-ngx/core/input-group';

import { createMissingDateImplementationError } from './errors';

let timePickerCounter = 0;

@Component({
    selector: 'fd-time-picker',
    templateUrl: './time-picker.component.html',
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-time-picker fd-timepicker-custom'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimePickerComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TimePickerComponent),
            multi: true
        },
        PopoverFormMessageService,
        PopoverService
    ],
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent<D>
    implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy, Validator
{
    /**
     * Date time object representation
     */
    @Input()
    time: Nullable<D>;

    /** Id attribute for input element inside TimePicker component */
    @Input()
    inputId: string;

    /** Uses compact time picker. */
    @Input()
    compact?: boolean;

    /** Disables the component. */
    @Input()
    disabled: boolean;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /**
     * When set to false, uses the 24 hour clock (hours ranging from 0 to 23).
     * Default value based on the current locale format option
     */
    @Input()
    meridian: boolean;

    /**
     * When set to false, hides the input for seconds.
     * Default value based on the current locale format option
     * */
    @Input()
    displaySeconds: boolean;

    /**
     * When set to false, hides the input for minutes.
     * Default value based on the current locale format option
     * */
    @Input()
    displayMinutes: boolean;

    /**
     * When set to false, hides the input for hours.
     * Default value based on the current locale format option
     * */
    @Input()
    displayHours: boolean;

    /**
     * Default time picker placeholder which is set dependant on the hours, minutes and seconds.
     * Otherwise It can be set to a default value
     */
    @Input()
    placeholder: string;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel: string;

    /** Aria label for the time picker toggle button. */
    @Input()
    timePickerButtonLabel: string;

    /** Whether a null input is considered valid(success). */
    @Input()
    allowNull = true;

    /** Defines if time component should be used with tablet mode */
    @Input()
    tablet = false;

    /** Text displayed in message */
    @Input()
    set message(message: string) {
        this._message = message;
        this._popoverFormMessage.message = message;
    }

    /** @hidden */
    _message: string | null = null;

    /** Type of the message. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    set messageType(messageType: FormStates) {
        this._messageType = messageType;
        this._popoverFormMessage.messageType = messageType;
    }

    /** @hidden */
    _messageType: FormStates | null = null;

    /**
     * The trigger events that will open/close the message box.
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    set messageTriggers(triggers: string[]) {
        this._messageTriggers = triggers;
        this._popoverFormMessage.triggers = triggers;
    }

    /** @hidden */
    _messageTriggers: string[] = ['focusin', 'focusout'];

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** Whether to validate the time picker input. */
    @Input()
    useValidation = true;

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
        if (this._state == null && this.useValidation && this._isInvalidTimeInput) {
            return 'error';
        }
        return this._state ?? 'default';
    }

    private _state: FormStates | null = null;

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

    /**
     * When set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigitsTime = false;

    /**
     * Display format option to customize time format in input control.
     * Must be a format option that is understandable by DatetimeAdapter.
     */
    @Input()
    displayFormat: unknown;

    /**
     * Parse format option to customize time format in input control.
     * Must be a format option that is understandable by DatetimeAdapter.
     */
    @Input()
    parseFormat: unknown;

    /**
     * Value state "success" aria message.
     */
    @Input()
    valueStateSuccessMessage: string = this._valueStateAriaMessagesService.success;

    /**
     * Value state "information" aria message.
     */
    @Input()
    valueStateInformationMessage: string = this._valueStateAriaMessagesService.information;

    /**
     * Value state "warning" aria message.
     */
    @Input()
    valueStateWarningMessage: string = this._valueStateAriaMessagesService.warning;

    /**
     * Value state "error" aria message.
     */
    @Input()
    valueStateErrorMessage: string = this._valueStateAriaMessagesService.error;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent<D>;

    /** @hidden */
    @ViewChild('inputGroupComponent', { read: ElementRef })
    _inputGroupElement: ElementRef;

    /** @hidden */
    @ViewChild(InputGroupInputDirective, { read: ElementRef })
    _inputElement: ElementRef;

    /**
     * @hidden
     * Whether the input time is valid(success). Internal use.
     */
    _isInvalidTimeInput = false;

    /**
     * @hidden
     * Indicates when popover is opened
     */
    isOpen: boolean;

    /** @hidden */
    _meridian: boolean;

    /** @hidden */
    _displaySeconds: boolean;

    /** @hidden */
    _displayMinutes: boolean;

    /** @hidden */
    _displayHours: boolean;

    /**
     * @hidden
     * Input field value
     */
    _inputTimeValue = '';

    _formValueStateMessageId = `fd-time-picker-form-message-${timePickerCounter++}`;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: (_: Nullable<D>) => void = () => {};
    /** @hidden */
    onTouched: () => void = () => {};

    /** @hidden */
    get _placeholder(): string {
        return this.placeholder || this._getPlaceholder();
    }

    /** @hidden */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats,
        private _popoverFormMessage: PopoverFormMessageService,
        @Optional() private _contentDensityService: ContentDensityService,
        private _valueStateAriaMessagesService: ValueStateAriaMessageService
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    ngOnInit(): void {
        this._calculateTimeOptions();
        this._formatTimeInputField();

        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._changeDetectorRef.markForCheck();
                })
            );
        }

        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._calculateTimeOptions();
            this._formatTimeInputField();
            this._changeDetectorRef.detectChanges();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            ['displayHours', 'displayMinutes', 'displaySeconds', 'meridian', 'displayFormat'].some(
                (change) => change in changes
            )
        ) {
            this._calculateTimeOptions();
        }
        if (changes.displayFormat) {
            this._formatTimeInputField();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.initialiseVariablesInMessageService();
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(): { [key: string]: any } | null {
        if (this._isInvalidTimeInput) {
            return {
                timeValidation: {
                    valid: false
                }
            };
        }

        return null;
    }

    /**
     * Returns the current value of the time input.
     */
    getTime(): Nullable<D> {
        return this.time;
    }

    /**
     * Returns format options to be used during time formatting.
     */
    getDisplayFormat(): unknown {
        return this.displayFormat || this._dateTimeFormats.display.timeInput;
    }

    /**
     * Returns format options to be used during time parsing.
     */
    getParseFormat(): unknown {
        return this.parseFormat || this._dateTimeFormats.parse.timeInput;
    }

    /** @hidden */
    _getFormattedTime(time = this.time): string {
        let formattedTime = '';

        try {
            if (this.allowNull && time === null) {
                return '';
            }
            formattedTime = this._dateTimeAdapter.format(time!, this.getDisplayFormat());
        } catch (e) {}

        return formattedTime;
    }

    /**
     *  @hidden
     *  When the open state is changed, there should be at least one active item, which by default is hour.
     */
    _setIsOpen(isOpen: boolean): void {
        this.isOpen = isOpen;
        this._onOpenStateChanged(isOpen);
    }

    /**
     * @hidden
     * Time input field changes handler
     */
    _timeInputChanged(inputValue: string): void {
        inputValue = inputValue.trim();

        // check if value has been changed
        if (this._inputTimeValue === inputValue) {
            return;
        }

        this._inputTimeValue = inputValue;

        if (inputValue === '') {
            this.time = null;
            this._isInvalidTimeInput = !this.allowNull;
        }

        if (inputValue !== '') {
            this.time = this._dateTimeAdapter.parse(inputValue, this.getParseFormat());
            this._isInvalidTimeInput = !this._dateTimeAdapter.isValid(this.time!);
        }

        this.onChange(this.time);

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    _inputGroupClicked($event: MouseEvent): void {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this._setIsOpen(true);
        }
    }

    /** @hidden */
    _addOnButtonClicked(): void {
        if (!this.disabled) {
            this._setIsOpen(!this.isOpen);
        }
    }

    /** @hidden */
    _popoverClosed(): void {
        this._setIsOpen(false);
    }

    /** @hidden */
    _getPlaceholder(): string {
        let retVal = '';

        if (this._displayHours) {
            retVal = retVal + 'hh';
        }
        if (this._displayMinutes) {
            retVal = retVal + ':mm';
        }
        if (this._displaySeconds) {
            retVal = retVal + ':ss';
        }
        if (this._meridian) {
            retVal = retVal + ' am/pm';
        }

        return retVal;
    }

    /** @hidden */
    _timeComponentValueChanged(time: D): void {
        if (this._dateTimeAdapter.dateTimesEqual(time, this.time!)) {
            return;
        }
        this._inputTimeValue = this._getFormattedTime(time);
        this.time = time;
        this._isInvalidTimeInput = !this._dateTimeAdapter.isValid(time);
        this.onChange(time);
        this._changeDetectorRef.detectChanges();
    }

    // #region ControlValueAccessor

    /** @hidden */
    registerOnChange(fn: (time: Nullable<D>) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    writeValue(time: D): void {
        if (!time) {
            this.time = null;
            this._inputTimeValue = '';
            this._isInvalidTimeInput = !this.allowNull;
        } else {
            this.time = this._dateTimeAdapter.parse(time, this.getParseFormat());
            this._inputTimeValue = this._getFormattedTime(time);
            this._isInvalidTimeInput = !this._dateTimeAdapter.isValid(time);
        }
        this._changeDetectorRef.markForCheck();
    }

    // #endregion ControlValueAccessor

    /** @hidden */
    _formatTimeInputField(time = this.time): string {
        return (this._inputTimeValue = this._getFormattedTime(time));
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
        if (isOpen) {
            this._changeDetectorRef.detectChanges();
            this.child.focusActiveColumn();
        }
        // focus input control every time popup is closed
        if (!isOpen && this._inputElement) {
            this._inputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    private _calculateTimeOptions(): void {
        const format = this.getDisplayFormat();

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
    private initialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.message = this._message ?? '';
        this._popoverFormMessage.triggers = this._messageTriggers;
        this._popoverFormMessage.messageType = this._state ?? 'default';
    }
}
