import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    QueryList,
    OnInit,
    ViewChildren,
    ViewEncapsulation,
    AfterViewInit,
    Optional,
    OnDestroy,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { DatetimeAdapter } from '../datetime/datetime-adapter';
import { Meridian, SelectableViewItem } from './models';
import { createMissingDateImplementationError } from './errors';
import { TimeI18n } from './i18n/time-i18n';
import { TimeColumnConfig } from './time-column/time-column-config';
import { TimeColumnComponent } from './time-column/time-column.component';
import { KeyUtil } from '../utils/functions';
import { ContentDensityService } from '../utils/public_api';

export type FdTimeActiveView = 'hour' | 'minute' | 'second' | 'meridian';

type HourViewItem = SelectableViewItem<number>;
type MinuteViewItem = SelectableViewItem<number>;
type SecondViewItem = SelectableViewItem<number>;
type MeridianViewItem = SelectableViewItem<Meridian>;

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
export class TimeComponent<D> implements OnInit, OnChanges, OnDestroy, AfterViewInit, ControlValueAccessor {
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

    /** @Input Defines if time component should be used in compact mode */
    @Input()
    compact: boolean = null;

    /** @Input Defines if time component should be used in tablet mode */
    @Input()
    tablet = false;

    /**
     * @Input An object that contains datetime representation
     */
    @Input()
    time: D;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /** @hidden */
    @ViewChildren(TimeColumnComponent)
    columns: QueryList<TimeColumnComponent<unknown, SelectableViewItem<unknown>>>;

    /** Active column view to iterate with */
    activeView: FdTimeActiveView = 'hour';

    /**
     * @hidden
     * container for [0 - 23] hours
     */
    hourViewItems: HourViewItem[] = [];
    /**
     * @hidden
     * reference to currently selected hourViewItems element
     */
    activeHourViewItem: HourViewItem;

    /**
     * @hidden
     * container for [0 - 59] minutes
     */
    minuteViewItems: MinuteViewItem[] = [];
    /**
     * @hidden
     * reference to currently selected minuteViewItems element
     */
    activeMinuteViewItem: MinuteViewItem;

    /**
     * @hidden
     * container for [0 - 59] seconds
     */
    secondViewItems: SecondViewItem[] = [];
    /**
     * @hidden
     * reference to currently selected secondViewItems element
     */
    activeSecondViewItem: SecondViewItem;

    /**
     * @hidden
     * container for [am, pm] meridian values
     */
    meridianViewItems: MeridianViewItem[] = [];
    /**
     * @hidden
     * reference to currently selected meridianViewItems element
     */
    activeMeridianViewItem: MeridianViewItem;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _timeI18nLabels: TimeI18n,
        // Use @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() private _contentDensityService: ContentDensityService
    ) {
        if (!_dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }

        // Set default time 00:00:00
        this.time = _dateTimeAdapter.today();
    }

    /** @hidden */
    ngOnInit(): void {
        this._dateTimeAdapter.localeChanges.pipe(takeUntil(this._onDestroy$)).subscribe(() => {
            this._setUpViewGrid();
            this._changeDetectorRef.detectChanges();
        });

        this._setUpViewGrid();

        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this._changeDetectorRef.detectChanges();
            }))
        }
    }

    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.meridian || changes.time) {
            this._setUpViewGrid();
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
        this.refreshColumns();
    }

    /** @hidden */
    onChange = (time: D) => {};

    /** @hidden */
    onTouched = () => {};

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
    refreshColumns(): void {
        this.columns.forEach((column) => column.setValueOfActive());
    }

    /**
     * @hidden
     * Handles meridian change.
     * This implicitly changes hours by +/- 12
     */
    handleMeridianChange(meridian: Meridian): void {
        const hourOffset: number = meridian === Meridian.AM ? -12 : 12;
        const currentHour = this._getModelHour();
        const newHour = Math.max(0, Math.min(23, currentHour + hourOffset));

        this.handleHourChange(newHour);
    }

    /** @hidden */
    handleSecondChange(second: number): void {
        this.time = this._dateTimeAdapter.setSeconds(this.time, second);
        this._calculateActiveSecondViewItem();
        this.onChange(this.time);
    }

    /** @hidden */
    handleMinuteChange(minute: number): void {
        this.time = this._dateTimeAdapter.setMinutes(this.time, minute);
        this._calculateActiveMinuteViewItem();
        this.onChange(this.time);
    }

    /**
     * @hidden
     * Handles changes of displayed hour value from template.
     */
    handleHourChange(hour: number): void {
        this.time = this._dateTimeAdapter.setHours(this.time, hour);
        this._calculateActiveHourViewItem();

        if (this.meridian) {
            this._calculateActiveMeridianViewItem();
        }

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
        if (KeyUtil.isKeyCode(event, LEFT_ARROW)) {
            this.handlePreviousColumnFocus(this.activeView);
            event.preventDefault();
        } else if (KeyUtil.isKeyCode(event, RIGHT_ARROW)) {
            this.handleNextColumnFocus(this.activeView);
            event.preventDefault();
        }
    }

    /** @hidden */
    writeValue(time: D): void {
        if (!time) {
            return;
        }
        this.time = time;

        this._setUpActiveViewItems();

        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    changeActive(view: FdTimeActiveView): void {
        this.activeView = view;
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    isActive(view: FdTimeActiveView): boolean {
        return this.activeView === view;
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

    /** @hidden */
    private _setUpViewGrid(): void {
        this._constructHourViewItems();
        this._constructMinuteViewItems();
        this._constructSecondViewItems();
        this._constructMeridianViewItems();
        // update reference to active view items
        this._setUpActiveViewItems();
    }

    /** @hidden */
    private _setUpActiveViewItems(): void {
        this._calculateActiveHourViewItem();
        this._calculateActiveMinuteViewItem();
        this._calculateActiveSecondViewItem();
        this._calculateActiveMeridianViewItem();
    }

    /** @hidden */
    private _constructHourViewItems(): void {
        this.hourViewItems = this._dateTimeAdapter
            .getHourNames({ meridian: this.meridian, twoDigit: this.keepTwoDigits })
            .map((name, hour) => {
                return {
                    value: hour,
                    label: name
                };
            });
    }

    /** @hidden */
    private _constructMinuteViewItems(): void {
        this.minuteViewItems = this._dateTimeAdapter
            .getMinuteNames({ twoDigit: this.keepTwoDigits })
            .map((name, minute) => {
                return {
                    value: minute,
                    label: name
                };
            });
    }

    /** @hidden */
    private _constructSecondViewItems(): void {
        this.secondViewItems = this._dateTimeAdapter
            .getSecondNames({ twoDigit: this.keepTwoDigits })
            .map((name, second) => {
                return {
                    value: second,
                    label: name
                };
            });
    }

    /** @hidden */
    private _constructMeridianViewItems(): void {
        const [amLabel, pmLabel] = this._dateTimeAdapter.getDayPeriodNames();
        this.meridianViewItems = [
            { value: Meridian.AM, label: amLabel },
            { value: Meridian.PM, label: pmLabel }
        ];
    }

    /** @hidden */
    private _calculateActiveHourViewItem(): void {
        const hour = this._getModelHour();
        this.activeHourViewItem = this.hourViewItems.find(({ value }) => value === hour);
    }

    /** @hidden */
    private _calculateActiveMinuteViewItem(): void {
        const minute = this._getModelMinute();
        this.activeMinuteViewItem = this.minuteViewItems.find(({ value }) => value === minute);
    }

    /** @hidden */
    private _calculateActiveSecondViewItem(): void {
        const second = this._getModelSecond();
        this.activeSecondViewItem = this.secondViewItems.find(({ value }) => value === second);
    }

    /** @hidden */
    private _calculateActiveMeridianViewItem(): void {
        const meridian = this._getDayPeriodByHour();
        this.activeMeridianViewItem = this.meridianViewItems.find(({ value }) => value === meridian);
    }

    /**
     * @hidden
     * Model hours (0 - 23)
     */
    private _getModelHour(): number {
        return this._dateTimeAdapter.getHours(this.time);
    }

    /**
     * @hidden
     * Model minutes (0 - 59)
     */
    private _getModelMinute(): number {
        return this._dateTimeAdapter.getMinutes(this.time);
    }

    /**
     * @hidden
     * Model seconds (0 - 59)
     */
    private _getModelSecond(): number {
        return this._dateTimeAdapter.getSeconds(this.time);
    }

    /**
     * @hidden
     * Get meridian period based on a given hours
     */
    private _getDayPeriodByHour(hour = this._getModelHour()): Meridian {
        return this._isPm(hour) ? Meridian.PM : Meridian.AM;
    }

    /** @hidden */
    private _isPm(hours: number = this._getModelHour()): boolean {
        return hours >= 12;
    }
}
