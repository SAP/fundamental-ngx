import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
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
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Placement } from '@fundamental-ngx/core/shared';

import { DATE_TIME_FORMATS, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { createMissingDateImplementationError } from './errors';

import { TimeComponent } from '@fundamental-ngx/core/time';
import { FormStates } from '@fundamental-ngx/core/shared';
import { PopoverFormMessageService } from '@fundamental-ngx/core/form';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
@Component({
    selector: 'fd-time-picker',
    templateUrl: './time-picker.component.html',
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-timepicker-custom'
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
export class TimePickerComponent<D> implements ControlValueAccessor, OnInit, AfterViewInit, OnChanges, OnDestroy, Validator {
    /**
     * @Input date time object representation
     */
    @Input()
    time: D;

    /** Id attribute for input element inside TimePicker component */
    @Input()
    inputId: string;

    /** @Input Uses compact time picker. */
    @Input()
    compact?: boolean;

    /** @Input Disables the component. */
    @Input()
    disabled: boolean;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /**
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23).
     * Default value based on the current locale format option
     */
    @Input()
    meridian: boolean;

    /**
     * @Input When set to false, hides the input for seconds.
     * Default value based on the current locale format option
     * */
    @Input()
    displaySeconds: boolean;

    /**
     * @Input When set to false, hides the input for minutes.
     * Default value based on the current locale format option
     * */
    @Input()
    displayMinutes: boolean;

    /**
     * @Input When set to false, hides the input for hours.
     * Default value based on the current locale format option
     * */
    @Input()
    displayHours: boolean;

    /** @Input Default time picker placeholder which is set dependant on the hours, minutes and seconds.
     * Otherwise It can be set to a default value
     */
    @Input()
    placeholder: string;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel = 'Time picker input';

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
    _message: string = null;

    /** Type of the message. Can be 'success' | 'error' | 'warning' | 'information' */
    @Input()
    set messageType(messageType: FormStates) {
        this._messageType = messageType;
        this._popoverFormMessage.messageType = messageType;
    }
    /** @hidden */
    _messageType: FormStates = null;

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
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

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
    private _state: FormStates = null;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable = true;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
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

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange = new EventEmitter<boolean>();

    /** @hidden */
    @HostBinding('class.fd-time-picker')
    timePickerClass = true;

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent<D>;

    /** @hidden */
    @ViewChild('inputGroupComponent', { read: ElementRef  })
    _inputGroupElement: ElementRef;

    /** @hidden Whether the input time is valid(success). Internal use. */
    isInvalidTimeInput = false;

    /** @hidden */
    period: string;

    /** @hidden */
    isOpen: boolean;

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
    private _subscriptions = new Subscription();

    /** @hidden */
    onChange: (_: D) => void = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    get _placeholder(): string {
        return this.placeholder || this.getPlaceholder();
    }

    /** @hidden */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
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

    ngOnInit(): void {
        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._calculateTimeOptions();
            this._changeDetectorRef.detectChanges();
        });

        this._calculateTimeOptions();

        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener.subscribe(density => {
                this.compact = density !== 'cozy';
                this._changeDetectorRef.markForCheck();
            }))
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            ['displayHours', 'displayMinutes', 'displaySeconds', 'meridian', 'displayFormat'].some(
                (input) => input in changes
            )
        ) {
            this._calculateTimeOptions();
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
        return this.isInvalidTimeInput
            ? {
                  timeValidation: {
                      valid: false
                  }
              }
            : null;
    }

    /**
     * Returns the current value of the time input.
     */
    getTime(): D {
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
    getFormattedTime(): string {
        let formattedTime = '';

        try {
            formattedTime = this._dateTimeAdapter.format(this.time, this.getDisplayFormat());
        } catch (e) {}

        return formattedTime;
    }

    /**
     *  @hidden
     * When the is open state is changed, there should be at least one active item, which by default is hour.
     */
    handleIsOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.isOpenChange.emit(this.isOpen);
        this._changeMessageVisibility();
    }

    /** @hidden */
    timeInputChanged(timeFromInput: string): void {
        // parse
        const time = this._dateTimeAdapter.parse(timeFromInput, this.getParseFormat());

        if (this._dateTimeAdapter.isValid(time)) {
            this.isInvalidTimeInput = false;
            this.time = time;
            this.onChange(time);
        } else {
            if (this.allowNull && timeFromInput === '') {
                this.isInvalidTimeInput = false;
                this.onChange(time);
            } else {
                this.isInvalidTimeInput = true;
                this.onChange(time);
            }
        }

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    inputGroupClicked($event: MouseEvent): void {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.handleIsOpenChange(true);
        }
    }

    /** @hidden */
    addOnButtonClicked(): void {
        if (!this.disabled) {
            this.handleIsOpenChange(!this.isOpen);
        }
    }

    /** @hidden */
    popoverClosed(): void {
        this.handleIsOpenChange(false);
    }

    /** @hidden */
    getPlaceholder(): string {
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
    timeFromTimeComponentChanged(time: D): void {
        this.time = time;
        this.onChange(time);
        this.isInvalidTimeInput = false;
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    registerOnChange(fn: (time: D) => void): void {
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
            if (!this.allowNull) {
                this.isInvalidTimeInput = true;
            }
        } else {
            this.isInvalidTimeInput = false;
            this.time = time;
        }
        this._changeDetectorRef.markForCheck();
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
    private _InitialiseVariablesInMessageService(): void {
        this._popoverFormMessage.init(this._inputGroupElement);
        this._popoverFormMessage.message = this._message;
        this._popoverFormMessage.triggers = this._messageTriggers;
        this._popoverFormMessage.messageType = this._state;
    }
}
