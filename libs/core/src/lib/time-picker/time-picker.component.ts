import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, first, takeUntil } from 'rxjs/operators';
import { Placement } from 'popper.js';

import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '../datetime';
import { createMissingDateImplementationError } from './errors';

import { TimeComponent } from '../time/time.component';
import { FormStates } from '../form/form-control/form-states';

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
        }
    ],
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent<D> implements ControlValueAccessor, OnDestroy, Validator {
    /**
     * @Input date time object representation
     */
    @Input()
    time: D;

    /** @Input Uses compact time picker. */
    @Input()
    compact = false;

    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    @Input()
    meridian = false;

    /** @Input Disables the component. */
    @Input()
    disabled: boolean;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /** @Input When set to false, hides the input for seconds. */
    @Input()
    displaySeconds = true;

    /** @Input When set to false, hides the input for minutes. */
    @Input()
    displayMinutes = true;

    /** @Input When set to false, hides the input for hours. */
    @Input()
    displayHours = true;

    /** @Input Default time picker placeholder which is set dependant on the hours, minutes and seconds.
     * Otherwise It can be set to a default value
     */
    @Input()
    placeholder: string = this.getPlaceholder();

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel = 'Time picker input';

    /** Whether a null input is considered valid(success). */
    @Input()
    allowNull = true;

    /** Defines if time component should be used with tablet mode */
    @Input()
    tablet = false;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

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

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange = new EventEmitter<boolean>();

    /** @hidden */
    @HostBinding('class.fd-time-picker')
    timePickerClass = true;

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent<D>;

    /** @hidden Whether the input time is valid(success). Internal use. */
    isInvalidTimeInput = false;

    /** @hidden */
    period: string;

    /** @hidden */
    isOpen: boolean;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: (_: D) => void = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
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

    /** @hidden */
    getFormattedTime(): string {
        let formattedTime = '';

        try {
            formattedTime = this._dateTimeAdapter.format(this.time, this._dateTimeFormats.display.timeInput);
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
    }

    /** @hidden */
    timeInputChanged(timeFromInput: string): void {
        // parse
        const time = this._dateTimeAdapter.parse(timeFromInput, this._dateTimeFormats.parse.timeInput);

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
        this._cd.detectChanges();
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
        if (this.displayHours) {
            retVal = retVal + 'hh';
        }
        if (this.displayMinutes) {
            retVal = retVal + ':mm';
        }
        if (this.displaySeconds) {
            retVal = retVal + ':ss';
        }
        if (this.meridian) {
            retVal = retVal + ' am/pm';
        }

        return retVal;
    }

    /** @hidden */
    timeFromTimeComponentChanged(time: D): void {
        Object.keys(time).forEach((key) => (time[key] = time[key] ? time[key] : 0));
        this.time = time;
        this.onChange(time);
        this.isInvalidTimeInput = false;
        this._cd.detectChanges();
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
        this._cd.detectChanges();
    }

    /** @hidden */
    writeValue(time: D): void {
        if (!time) {
            // this.time = null; // TODO: not sure if it's possible to keep null as an object
            if (!this.allowNull) {
                this.isInvalidTimeInput = true;
            }
        } else {
            this.isInvalidTimeInput = false;
            this.time = time;
        }
        this._cd.markForCheck();
    }
}
