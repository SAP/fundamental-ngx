import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TimeObject } from './time-object';
import { ControlValueAccessor } from '@angular/forms';
import { TimeI18nLabels } from './i18n/time-i18n-labels';
import { TimeI18n } from './i18n/time-i18n';
export declare class TimeComponent implements OnChanges, ControlValueAccessor {
    timeI18nLabels: TimeI18nLabels;
    timeI18n: TimeI18n;
    /**
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control.
     */
    meridian: boolean;
    /**
     *  @Input When set to false, does not set the input field to invalid state on invalid entry.
     */
    validate: boolean;
    /**
     * @Input Disables the component.
     */
    disabled: boolean;
    /**
     * @Input When set to false, hides the buttons that increment and decrement the corresponding input.
     */
    spinners: boolean;
    /**
     * @Input When set to false, hides the input for seconds.
     */
    displaySeconds: boolean;
    /** @Input When set to false, hides the input for minutes. */
    displayMinutes: boolean;
    /**
     * When set to false, hides the input for hours
     */
    displayHours: boolean;
    /**
     * @Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     */
    time: TimeObject;
    /** @hidden */
    readonly focusArrowLeft: EventEmitter<void>;
    /** @hidden
     * Used only in meridian mode. Stores information the current am/pm state.
     */
    period: string;
    /** @hidden
     * Variable that is displayed as an hour.
     * For meridian mode ranging from 0 to 12,
     * For non-meridian mode ranging from 0 to 23, and reflects the hour value
     */
    displayedHour: number;
    /** @hidden */
    onChange: (time: TimeObject) => void;
    /** @hidden */
    onTouched: () => void;
    /** @hidden */
    registerOnChange(fn: (time: TimeObject) => void): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    constructor(timeI18nLabels: TimeI18nLabels, timeI18n: TimeI18n);
    /** @hidden */
    writeValue(time: TimeObject): void;
    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     */
    setDisplayedHour(): void;
    /** @hidden
     * Handles changes of displayed hour value from template.
     */
    displayedHourChanged(): void;
    /** @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     */
    inputBlur(inputType: string): void;
    /** Increases the hour value by one. */
    increaseHour(): void;
    /** Decreases the hour value by one. */
    decreaseHour(): void;
    /** Increases the minute value by one. */
    increaseMinute(): void;
    /** Decreases the minute value by one. */
    decreaseMinute(): void;
    /** Increases the second value by one. */
    increaseSecond(): void;
    /** Decreases the second value by one. */
    decreaseSecond(): void;
    /** Toggles the period (am/pm). */
    togglePeriod(): void;
    /** @hidden
     * Handles minutes model change from template
     * */
    minuteModelChange(): void;
    /** @hidden
     * Handles seconds model change from template
     * */
    secondModelChange(): void;
    /** @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     */
    periodModelChange(): void;
    /** @hidden
     * Handles last button keyboard events
     */
    lastButtonKeydown(event: KeyboardEvent): void;
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     */
    private isPm;
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     */
    private isAm;
}
