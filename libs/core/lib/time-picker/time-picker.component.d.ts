import { ChangeDetectorRef, OnInit } from '@angular/core';
import { TimeObject } from '../time/time-object';
import { TimeComponent } from '../time/time.component';
import { ControlValueAccessor } from '@angular/forms';
import { TimeFormatParser } from './format/time-parser';
export declare class TimePickerComponent implements ControlValueAccessor, OnInit {
    private cd;
    timeAdapter: TimeFormatParser;
    /** @hidden */
    timepickerclass: boolean;
    /**
     * @Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     */
    time: TimeObject;
    /** @Input Uses compact time picker. */
    compact: boolean;
    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    meridian: boolean;
    /** @Input Disables the component. */
    disabled: boolean;
    /** @Input When set to false, hides the buttons that increment and decrement the corresponding input. */
    spinners: boolean;
    /** @Input When set to false, hides the input for seconds. */
    displaySeconds: boolean;
    /** @Input When set to false, hides the input for minutes. */
    displayMinutes: boolean;
    /** @Input When set to false, hides the input for hours. */
    displayHours: boolean;
    /** Whether to perform visual validation on the picker input. */
    validate: boolean;
    /** Aria label for the time picker input. */
    timePickerInputLabel: string;
    /** Whether a null input is considered valid. */
    allowNull: boolean;
    /** @hidden Whether the input time is valid. Internal use. */
    isInvalidTimeInput: boolean;
    /** @hidden */
    child: TimeComponent;
    /** @hidden */
    period: string;
    /** @hidden */
    isOpen: boolean;
    /** @hidden */
    placeholder: string;
    /** @hidden */
    onChange: Function;
    /** @hidden */
    onTouched: Function;
    /** @hidden */
    ngOnInit(): void;
    /**
     * Returns the current value of the time input.
     */
    getTime(): TimeObject;
    /** @hidden */
    getFormattedTime(): string;
    /** @hidden */
    timeInputChanged(timeFromInput: any): void;
    /** @hidden */
    inputGroupClicked($event: any): void;
    /** @hidden */
    onFocusHandler(): void;
    /** @hidden */
    addOnButtonClicked(): void;
    /** @hidden */
    popoverClosed(): void;
    /** @hidden */
    getPlaceholder(): string;
    /** @hidden */
    timeFromTimeComponentChanged(): void;
    /** @hidden */
    registerOnChange(fn: (time: TimeObject) => void): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    writeValue(time: TimeObject): void;
    /** @hidden */
    constructor(cd: ChangeDetectorRef, timeAdapter: TimeFormatParser);
}
