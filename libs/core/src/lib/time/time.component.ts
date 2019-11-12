import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { TimeObject } from './time-object';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeI18nLabels } from './i18n/time-i18n-labels';
import { TimeI18n } from './i18n/time-i18n';

@Component({
    selector: 'fd-time',
    templateUrl: './time.component.html',
    styleUrls: ['./time.component.scss'],
    host: {
        '(blur)': 'onTouched()',
        class: 'fd-time fd-has-display-block'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeComponent implements OnChanges, ControlValueAccessor {

    /**
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control.
     */
    @Input() meridian: boolean = false;

    /**
     *  @Input When set to false, does not set the input field to invalid state on invalid entry.
     */
    @Input() validate: boolean = true;

    /**
     * @Input Disables the component.
     */
    @Input() disabled: boolean;

    /**
     * @Input When set to false, hides the buttons that increment and decrement the corresponding input.
     */
    @Input() spinners: boolean = true;

    /**
     * @Input When set to false, hides the input for seconds.
     */
    @Input() displaySeconds: boolean = true;

    /** @Input When set to false, hides the input for minutes. */
    @Input()
    displayMinutes: boolean = true;

    /**
     * When set to false, hides the input for hours
     */
    @Input()
    displayHours: boolean = true;

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

    /** @hidden */
    @Output()
    readonly focusArrowLeft: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden
     * Used only in meridian mode. Stores information the current am/pm state.
     */
    period: string;

    /** @hidden
     * Variable that is displayed as an hour.
     * For meridian mode ranging from 0 to 12,
     * For non-meridian mode ranging from 0 to 23, and reflects the hour value
     */
    displayedHour: number = 0;

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
        this.changeDetRef.detectChanges();
    }

    constructor(
        public timeI18nLabels: TimeI18nLabels,
        public timeI18n: TimeI18n,
        private changeDetRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    writeValue(time: TimeObject): void {
        if (!time) {
            return;
        }
        this.time = Object.assign({}, time);
        this.setDisplayedHour();
        this.changeDetRef.detectChanges();
    }

    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
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
            this.period = this.timeI18n.meridianAm;
        } else if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = this.timeI18n.meridianPm;
        } else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = this.timeI18n.meridianPm;
        } else {
            this.displayedHour = this.time.hour;
            this.period = this.timeI18n.meridianAm;
        }
    }

    /** @hidden
     * Handles changes of displayed hour value from template.
     */
    displayedHourChanged(): void {
        if (!this.meridian) {
            this.time.hour = this.displayedHour;
        } else {
            if (this.period === this.timeI18n.meridianAm) {
                if (this.displayedHour === 12) {
                    this.time.hour = 0;
                } else {
                    this.time.hour = this.displayedHour;
                }
            } else if (this.period === this.timeI18n.meridianPm) {
                if (this.displayedHour === 12) {
                    this.time.hour = this.displayedHour;
                } else {
                    this.time.hour = this.displayedHour + 12;
                }
            }
        }
        this.onChange(this.time);
    }

    /** @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     */
    inputBlur(inputType: string): void {
        switch (inputType) {
            case 'hour': {
                this.displayedHour = Math.round(Math.abs(this.displayedHour)) % 24;
                this.time.hour = this.displayedHour;

                if (this.meridian) {
                    if (this.displayedHour > 12) {
                        this.period = this.timeI18n.meridianPm;
                        this.displayedHour = this.displayedHour !== 12 ? this.displayedHour % 12 : this.displayedHour;
                    } else if (this.displayedHour === 0) {
                        this.displayedHour = 12;
                        this.period = this.timeI18n.meridianAm;
                    } else if (this.isAm(this.period) && this.displayedHour === 12) {
                        this.time.hour = 0;
                    }
                }
                break;
            }
            case 'minute': {
                this.time.minute = Math.abs(Math.round(this.time.minute) % 60);
                break;
            }
            case 'second': {
                this.time.second = Math.abs(Math.round(this.time.second) % 60);
                break;
            }
            case 'period': {
                /**
                 * When there is invalid period, function changes period to valid basing on actual hour
                 */
                if (!this.period ||
                    (!this.isPm(this.period) && !this.isAm(this.period))
                ) {
                    this.setDisplayedHour();
                }
            }
        }
        this.onChange(this.time);
    }

    /** Increases the hour value by one. */
    increaseHour(): void {
        if (this.time.hour === null) {
            this.time.hour = 0;
        } else if (this.time.hour === 23) {
            this.time.hour = 0;
        } else {
            this.time.hour = this.time.hour + 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    }

    /** Decreases the hour value by one. */
    decreaseHour(): void {
        if (this.time.hour === null) {
            this.time.hour = 0;
        } else if (this.time.hour === 0) {
            this.time.hour = 23;
        } else {
            this.time.hour = this.time.hour - 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    }

    /** Increases the minute value by one. */
    increaseMinute(): void {
        if (this.time.minute === null) {
            this.time.minute = 0;
        } else if (this.time.minute === 59) {
            this.time.minute = 0;
            this.increaseHour();
        } else {
            this.time.minute = this.time.minute + 1;
        }
        this.onChange(this.time);
    }

    /** Decreases the minute value by one. */
    decreaseMinute(): void {
        if (this.time.minute === null) {
            this.time.minute = 0;
        } else if (this.time.minute === 0) {
            this.time.minute = 59;
            this.decreaseHour();
        } else {
            this.time.minute = this.time.minute - 1;
        }
        this.onChange(this.time);
    }

    /** Increases the second value by one. */
    increaseSecond(): void {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            } else if (this.time.second === 59) {
                this.time.second = 0;
                this.increaseMinute();
            } else {
                this.time.second = this.time.second + 1;
            }
        }
        this.onChange(this.time);
    }

    /** Decreases the second value by one. */
    decreaseSecond(): void {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            } else if (this.time.second === 0) {
                this.time.second = 59;
                this.decreaseMinute();
            } else {
                this.time.second = this.time.second - 1;
            }
        }
        this.onChange(this.time);
    }

    /** Toggles the period (am/pm). */
    togglePeriod(): void {
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isAm(this.period)) {
                this.period = this.timeI18n.meridianPm;
                this.periodModelChange();
            } else if (this.isPm(this.period)) {
                this.period = this.timeI18n.meridianAm;
                this.periodModelChange();
            }
        }
    }

    /** @hidden
     * Handles minutes model change from template
     * */
    minuteModelChange(): void {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

    /** @hidden
     * Handles seconds model change from template
     * */
    secondModelChange(): void {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }

    /** @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     */
    periodModelChange(): void {
        if (this.time && !this.time.hour) {
            this.time.hour = 0;
        }
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isPm(this.period) && this.time.hour < 12) {
                this.time.hour = this.time.hour + 12;
            } else if (this.time.hour >= 12 && this.isAm(this.period)) {
                this.time.hour = this.time.hour - 12;
            }
            this.onChange(this.time);
        }
    }

    /** @hidden
     * Handles last button keyboard events
     */
    lastButtonKeydown(event: KeyboardEvent): void {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    }

    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     */
    private isPm(period: string): boolean {
        const pmMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianPm : this.timeI18n.meridianPm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === pmMeridian;
    }

    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     */
    private isAm(period: string): boolean {
        const amMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianAm : this.timeI18n.meridianAm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === amMeridian;
    }
}
