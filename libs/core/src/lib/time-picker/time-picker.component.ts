import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { TimeFormatParser } from './format/time-parser';
import { FormStates } from '../form/form-control/form-states';
import { PopoverComponent } from '../popover/popover.component';

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
    ],
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit, Validator {

    /**
     * @Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     */
    @Input()
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @Input Uses compact time picker. */
    @Input()
    compact: boolean = false;

    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    @Input()
    meridian: boolean = false;

    /** @Input Disables the component. */
    @Input()
    disabled: boolean;

    /** @Input When set to false, hides the buttons that increment and decrement the corresponding input. */
    @Input()
    spinners: boolean = true;

    /** @Input When set to false, hides the input for seconds. */
    @Input()
    displaySeconds: boolean = true;

    /** @Input When set to false, hides the input for minutes. */
    @Input()
    displayMinutes: boolean = true;

    /** @Input When set to false, hides the input for hours. */
    @Input()
    displayHours: boolean = true;

    // /** Whether to perform visual validation on the picker input. */
    // @Input()
    // validate: boolean = true;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel: string = 'Time picker input';

    /** Whether a null input is considered valid(success). */
    @Input()
    allowNull: boolean = true;

    /** Defines if time component should be used with tablet mode */
    @Input()
    tablet: boolean = false;

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
    buttonFocusable: boolean = true;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigitsTime: boolean = false;

    /** @hidden */
    @HostBinding('class.fd-time-picker')
    timepickerclass = true;

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popover: PopoverComponent;

    /** @hidden Whether the input time is valid(success). Internal use. */
    isInvalidTimeInput: boolean = false;

    /** @hidden */
    period: string;

    /** @hidden */
    isOpen: boolean;

    /** @hidden */
    placeholder: string;

    /** @hidden */
    onChange: Function = () => {};
    /** @hidden */
    onTouched: Function = () => {};

    /** @hidden */
    constructor(private cd: ChangeDetectorRef, public timeAdapter: TimeFormatParser) {}

    /** @hidden */
    ngOnInit(): void {
        this.placeholder = this.getPlaceholder();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.child.changeActive(null);
    }

    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     */
    validate(control: AbstractControl): {
        [key: string]: any;
    } {
        return this.isInvalidTimeInput ? {
            dateValidation: {
                valid: false
            }
        } : null;
    }

    /**
     * Returns the current value of the time input.
     */
    getTime(): TimeObject {
        return this.time;
    }

    /** @hidden */
    getFormattedTime(): string {
        const formattedTime = this.timeAdapter.format(
            this.time,
            this.displaySeconds,
            this.displayMinutes,
            this.meridian
        );
        return formattedTime !== undefined ? formattedTime : '';
    }

    handleIsOpenChange(isOpen: boolean): void {
        this.isOpen = isOpen;
        if (isOpen) {
            this.child.changeActive('hour');
        }
    }

    /** @hidden */
    timeInputChanged(timeFromInput: string): void {
        const time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.displayMinutes, this.meridian);
        if (time) {
            this.isInvalidTimeInput = false;
            this.time = time;
            this.onChange(time);
        } else {
            if (this.allowNull && timeFromInput === '') {
                this.isInvalidTimeInput = false;
                this.onChange({ hour: null, minutes: null, seconds: null });
                this.child.setDisplayedHour();
            } else {
                this.isInvalidTimeInput = true;
            }
        }
    }

    /** @hidden */
    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.handleIsOpenChange(true);
        }
    }

    /** @hidden */
    onFocusHandler() {
        if (!this.isOpen) {
            this.handleIsOpenChange(true);
        }
    }

    /** @hidden */
    addOnButtonClicked() {
        if (!this.disabled) {
            this.handleIsOpenChange(!this.isOpen);
        }
    }

    /** @hidden */
    popoverClosed() {
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
    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
        this.isInvalidTimeInput = false;
    }

    /** @hidden */
    registerOnChange(fn: (time: TimeObject) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cd.detectChanges();
    }

    /** @hidden */
    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = time;
        this.cd.markForCheck();
    }
}
