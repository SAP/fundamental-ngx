import { ChangeDetectorRef, Component, forwardRef, HostBinding, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeFormatParser } from './format/time-parser';

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
        }
    ],
    styleUrls: ['./time-picker.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimePickerComponent implements ControlValueAccessor, OnInit {

    /** @hidden */
    @HostBinding('class.fd-time-picker')
    timepickerclass = true;

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

    /** Whether to perform visual validation on the picker input. */
    @Input()
    validate: boolean = true;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel: string = 'Time picker input';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull: boolean = true;

    /** @hidden Whether the input time is valid. Internal use. */
    isInvalidTimeInput: boolean = false;

    /** @hidden */
    @ViewChild(TimeComponent)
    child: TimeComponent;

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
    ngOnInit(): void {
        this.placeholder = this.getPlaceholder();
    }

    /**
     * Returns the current value of the time input.
     */
    getTime(): TimeObject {
        return this.time;
    }

    /** @hidden */
    getFormattedTime(): string {
        const formattedTime = this.timeAdapter.format(this.time, this.meridian);
        return formattedTime !== undefined ? formattedTime : '';
    }

    /** @hidden */
    timeInputChanged(timeFromInput) {
        const time = this.timeAdapter.parse(timeFromInput, this.displaySeconds, this.meridian);
        if (time) {
            this.isInvalidTimeInput = false;
            this.child.setDisplayedHour();
            this.time = Object.assign(this.time, time);
            this.onChange(time);
        } else {
            if (this.allowNull && timeFromInput === '') {
                this.isInvalidTimeInput = false;
                this.child.setDisplayedHour();
                this.onChange({hour: null, minutes: null, seconds: null});
            } else {
                this.isInvalidTimeInput = true;
            }
        }
    }

    /** @hidden */
    inputGroupClicked($event) {
        if (!this.isOpen && !this.disabled) {
            $event.stopPropagation();
            this.isOpen = true;
        }
    }

    /** @hidden */
    onFocusHandler() {
        if (!this.isOpen) {
            this.isOpen = true;
        }
    }

    /** @hidden */
    addOnButtonClicked() {
        if (!this.disabled) {
            this.isOpen = !this.isOpen;
        }
    }

    /** @hidden */
    popoverClosed() {
        this.isOpen = false;
    }

    /** @hidden */
    getPlaceholder(): string {
        let retVal;
        if (this.displaySeconds) {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss am/pm';
            } else {
                retVal = 'hh' + ':' + 'mm' + ':' + 'ss';
            }
        } else {
            if (this.meridian) {
                retVal = 'hh' + ':' + 'mm' + ' am/pm';
            } else {
                retVal = 'hh' + ':' + 'mm';
            }
        }

        return retVal;
    }

    /** @hidden */
    timeFromTimeComponentChanged() {
        this.cd.detectChanges();
        this.onChange(this.time);
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
    }

    /** @hidden */
    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = time;
    }

    /** @hidden */
    constructor(private cd: ChangeDetectorRef,
                public timeAdapter: TimeFormatParser) {}
}
