import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    QueryList,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation,
    AfterViewInit
} from '@angular/core';
import { TimeObject } from './time-object';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeI18n } from './i18n/time-i18n';
import { TimeColumnConfig } from './time-column/time-column-config';
import { TimeColumnComponent, TimeColumnItemOutput } from './time-column/time-column.component';
import { KeyUtil } from '../utils/functions/key-util';

export type FdTimeActiveView = 'hour' | 'minute' | 'second' | 'meridian';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    host: {
        '(blur)': 'onTouched()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimeComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    /**
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control.
     */
    @Input()
    meridian = false;

    /**
     *  @Input When set to false, does not set the input field to invalid state on invalid entry.
     */
    @Input()
    validate = true;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigits = false;

    /**
     * @Input Disables the component.
     */
    @Input()
    disabled: boolean;

    /**
     * @Input When set to false, hides the input for seconds.
     */
    @Input()
    displaySeconds = true;

    /** @Input When set to false, hides the input for minutes. */
    @Input()
    displayMinutes = true;

    /**
     * When set to false, hides the input for hours
     */
    @Input()
    displayHours = true;

    /** Defines if time component should be used with compact mode */
    @Input()
    compact = false;

    /** Defines if time component should be used with tablet mode */
    @Input()
    tablet = false;

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

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /** @hidden */
    @ViewChildren(TimeColumnComponent)
    columns: QueryList<TimeColumnComponent>;

    /** @hidden
     * Used only in meridian mode. Stores information the current am/pm state.
     */
    period: string;

    /** @hidden container for [1 - 12/24] values */
    hours: number[];

    /** @hidden container for [1 - 60] values */
    minutes: number[];

    /** @hidden container for [am, pm] values */
    meridians: string[];

    activeView: FdTimeActiveView = 'hour';

    /** @hidden
     * Variable that is displayed as an hour.
     * For meridian mode ranging from 0 to 12,
     * For non-meridian mode ranging from 0 to 23, and reflects the hour value
     */
    displayedHour = 0;

    /** @hidden */
    onChange = (time: TimeObject) => {
    };

    /** @hidden */
    onTouched = () => {
    };

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
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    constructor(
        private _timeI18nLabels: TimeI18n,
        private _changeDetRef: ChangeDetectorRef
    ) {
    }

    /** @hidden */
    ngOnInit(): void {
        this._setUpTimeGrid();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.refreshTime();
    }

    /** @hidden */
    refreshTime(): void {
        this.columns.forEach(column => column.setValueOfActive());
    }

    /** @hidden */
    handleSecondChange(second: number): void {
        this.time.second = second;
        this.onChange(this.time);
    }

    /** @hidden */
    handleMinuteChange(minute: number): void {
        this.time.minute = minute;
        this.onChange(this.time);
    }

    /** @hidden */
    handleNextColumnFocus(column: FdTimeActiveView): void {
        if (column === 'hour' && this.displayMinutes) {
            this.changeActive('minute');
        } else if (column === 'hour' && this.meridian) {
            this.changeActive('meridian');
        } else if (column === 'minute' && this.displaySeconds) {
            this.changeActive('second');
        } else if (column === 'minute' && this.meridian) {
            this.changeActive('meridian');
        } else if (column === 'second' && this.meridian) {
            this.changeActive('meridian');
        } else if (column === 'second') {
            this.changeActive('hour');
        } else if (column === 'meridian') {
            this.changeActive('hour');
        }
    }

    /** @hidden */
    handlePreviousColumnFocus(column: FdTimeActiveView): void {
        if (column === 'hour' && this.meridian) {
            this.changeActive('meridian');
        } else if (column === 'hour' && this.displaySeconds) {
            this.changeActive('second');
        } else if (column === 'minute') {
            this.changeActive('hour');
        } else if (column === 'second') {
            this.changeActive('minute');
        } else if (column === 'meridian') {
            if (this.displaySeconds) {
                this.changeActive('second');
            } else if (this.displayMinutes) {
                this.changeActive('minute');
            } else {
                this.changeActive('hour');
            }
        }
    }

    /** @hidden */
    handleKeyDownEvent(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'ArrowLeft')) {
            this.handlePreviousColumnFocus(this.activeView);
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowRight')) {
            this.handleNextColumnFocus(this.activeView);
            event.preventDefault();
        }
    }

    /** @hidden */
    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = Object.assign({}, time);
        this.setDisplayedHour();
        this._changeDetRef.detectChanges();
    }

    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
            this._setUpTimeGrid();
        }
    }

    /** @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     */
    setDisplayedHour(): void {
        if (!this.meridian) {
            this.displayedHour = this.time.hour;
        } else if (this.time.hour === 0) {
            this.displayedHour = 12;
            this.period = this._timeI18nLabels.meridianAm;
        } else if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = this._timeI18nLabels.meridianPm;
        } else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = this._timeI18nLabels.meridianPm;
        } else {
            this.displayedHour = this.time.hour;
            this.period = this._timeI18nLabels.meridianAm;
        }

        if (this.time) {
            this.time = { ...this.time };
        }
    }

    /** @hidden
     * Handles changes of displayed hour value from template.
     */
    displayedHourChanged(changedHourOutput: TimeColumnItemOutput): void {
        if (!this.meridian) {
            this.time.hour = changedHourOutput.value;
            this.displayedHour = changedHourOutput.value
        } else {
            this._periodByHoursChange(changedHourOutput.value, changedHourOutput.after);
            this.displayedHour = changedHourOutput.value;
            if (this._isAm(this.period)) {
                if (this.displayedHour === 12) {
                    this.time.hour = 0;
                } else {
                    this.time.hour = this.displayedHour;
                }
            } else if (this._isPm(this.period)) {
                if (this.displayedHour === 12) {
                    this.time.hour = this.displayedHour;
                } else {
                    this.time.hour = this.displayedHour + 12;
                }
            }
        }
        this.onChange(this.time);
    }

    /** @hidden */
    changeActive(view: FdTimeActiveView): void {
        this.activeView = view;
        this._changeDetRef.detectChanges();
    }

    /** @hidden */
    isActive(view: FdTimeActiveView): boolean {
        return this.activeView === view;
    }

    /** @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     */
    periodModelChange(): void {
        if (this.time && !this.time.hour) {
            this.time.hour = 0;
        }
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this._isPm(this.period) && this.time.hour < 12) {
                this.time.hour = this.time.hour + 12;
            } else if (this.time.hour >= 12 && this._isAm(this.period)) {
                this.time.hour = this.time.hour - 12;
            }
            this.onChange(this.time);
        }
    }

    /** Configuration for hours column */
    getHoursConfig(): TimeColumnConfig {
        return {
            decreaseLabel: this._timeI18nLabels.decreaseHoursLabel,
            increaseLabel: this._timeI18nLabels.increaseHoursLabel,
            label: this._timeI18nLabels.hoursLabel
        };
    }

    /** Configuration for minutes column */
    getMinutesConfig(): TimeColumnConfig {
        return {
            decreaseLabel: this._timeI18nLabels.decreaseMinutesLabel,
            increaseLabel: this._timeI18nLabels.increaseMinutesLabel,
            label: this._timeI18nLabels.minutesLabel
        };
    }

    /** Configuration for seconds column */
    getSecondsConfig(): TimeColumnConfig {
        return {
            decreaseLabel: this._timeI18nLabels.decreaseSecondsLabel,
            increaseLabel: this._timeI18nLabels.increaseSecondsLabel,
            label: this._timeI18nLabels.secondsLabel
        };
    }

    /** Configuration for period column */
    getPeriodConfig(): TimeColumnConfig {
        return {
            decreaseLabel: this._timeI18nLabels.decreasePeriodLabel,
            increaseLabel: this._timeI18nLabels.increasePeriodLabel,
            label: this._timeI18nLabels.periodLabel
        };
    }

    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     */
    private _isPm(period: string): boolean {
        const pmMeridian = this._timeI18nLabels.meridianPm.toLocaleUpperCase();
        period = period.toLocaleUpperCase();
        return period === pmMeridian;
    }

    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     */
    private _isAm(period: string): boolean {
        const amMeridian = this._timeI18nLabels.meridianAm.toLocaleUpperCase();
        period = period.toLocaleUpperCase();
        return period === amMeridian;
    }

    /** @hidden */
    private _setUpTimeGrid(): void {
        this.hours = [];
        this.minutes = [];
        this.period = this._timeI18nLabels.meridianAm;

        const hoursAmount = this.meridian ? 12 : 24;
        const hourColumnMultiply = this.meridian ? 4 : 2;

        for (let j = 0; j < hourColumnMultiply; j++) {
            for (let i = 0; i < hoursAmount; i++) {
                this.hours.push(i + (this.meridian ? 1 : 0));
            }
        }

        const minutesAmount = 60;
        for (let i = 0; i < minutesAmount; i++) {
            this.minutes.push(i);
        }

        this.meridians = [this._timeI18nLabels.meridianAm, this._timeI18nLabels.meridianPm];
    }

    /** @hidden */
    private _periodByHoursChange(newHour: number, after: boolean): void {
        const shouldChange: boolean = (after ? (newHour < this.displayedHour) : (newHour > this.displayedHour));
        if (shouldChange) {
            this.period = this._isAm(this.period) ? this._timeI18nLabels.meridianPm : this._timeI18nLabels.meridianAm;
        }
    }
}
