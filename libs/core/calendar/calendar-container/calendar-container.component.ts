import {
    ChangeDetectionStrategy,
    Component,
    computed,
    forwardRef,
    inject,
    input,
    model,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

import { CalendarComponent } from '../calendar.component';
import { CalendarCurrent } from '../models/calendar-current';
import { DisableDateFunction } from '../models/common';
import { DateRange } from '../models/date-range';
import { CalendarType, DaysOfWeek } from '../types';

let calendarContainerUniqueId = 0;

/**
 * Calendar container component that renders multiple calendars side-by-side
 * with synchronized navigation and shared selection state.
 *
 * ```html
 * <fd-calendar-container
 *     calType="range"
 *     [(selectedRangeDate)]="dateRange">
 * </fd-calendar-container>
 * ```
 */
@Component({
    selector: 'fd-calendar-container',
    templateUrl: './calendar-container.component.html',
    styleUrl: './calendar-container.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FdCalendarContainerComponent),
            multi: true
        }
    ],
    host: {
        '[class]': 'cssClass()',
        role: 'group',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.id]': 'id'
    },
    imports: [CalendarComponent]
})
export class FdCalendarContainerComponent<D> implements ControlValueAccessor {
    /** Emitted when the selected range changes. */
    readonly selectedRangeDateChange = output<DateRange<D>>();

    /** Emitted when the selected date changes (single mode). */
    readonly selectedDateChange = output<D>();

    /** Layout direction. 'horizontal' shows side-by-side; 'vertical' stacks. */
    readonly layout = input<'horizontal' | 'vertical'>('horizontal');

    /** The selection mode. Only 'range' and 'single' are supported. */
    readonly calType = input<CalendarType>('range');

    /** Selected range (start + end). */
    readonly selectedRangeDate = model<DateRange<D>>(new DateRange<D>(null, null));

    /** Selected single date (when calType is 'single'). */
    readonly selectedDate = model<D | null>(null);

    /** Whether to show the range hover effect across both calendars. */
    readonly rangeHoverEffect = input(true);

    /** Whether to mark weekends. */
    readonly markWeekends = input(true);

    /** Whether to show week numbers. */
    readonly showWeekNumbers = input(false);

    /** Starting day of the week (1=Sunday, 2=Monday, etc.). */
    readonly startingDayOfWeek = input<DaysOfWeek>();

    /** Function to disable specific dates. */
    readonly disableFunction = input<DisableDateFunction<D>>();

    /** Function to disable specific dates for range start selection. */
    readonly disableRangeStartFunction = input<DisableDateFunction<D>>();

    /** Function to disable specific dates for range end selection. */
    readonly disableRangeEndFunction = input<DisableDateFunction<D>>();

    /** Special day marking rules. */
    readonly specialDaysRules = input<SpecialDayRule<D>[]>([]);

    /**
     * Number of calendar months to render side-by-side (horizontal) or stacked (vertical).
     * Clamped to the range 1..4. Values outside this range are silently coerced
     * (0 → 1, 5+ → 4, negatives → 1, fractions truncated).
     *
     * @default 2
     */
    readonly months = input<number, number>(2, {
        transform: (v: number) => Math.min(4, Math.max(1, Math.trunc(v)))
    });

    /** @hidden */
    protected readonly dateTimeAdapter = inject(DatetimeAdapter<D>);

    /** @hidden */
    protected readonly id = 'fd-calendar-container-' + calendarContainerUniqueId++;

    /** The month/year displayed by the first (leftmost/topmost) calendar. */
    protected readonly baseMonth = signal<CalendarCurrent>(this._getInitialMonth());

    /** Shared hover date for cross-calendar hover coordination. */
    protected readonly hoverDate = signal<D | null | undefined>(null);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes = ['fd-calendar-container'];
        if (this.layout() === 'vertical') {
            classes.push('fd-calendar-container--vertical');
        }
        return classes.join(' ');
    });

    /** @hidden */
    protected readonly calendarMonths = computed<CalendarCurrent[]>(() => {
        const base = this.baseMonth();
        const n = this.months();
        return Array.from({ length: n }, (_, i) => this._shiftMonth(base, i));
    });

    /** @hidden */
    protected readonly ariaLabel = computed(() => {
        const months = this.calendarMonths();
        const n = months.length;
        if (n === 1) {
            return `Calendar showing ${this.getMonthLabel(months[0])}`;
        }
        if (n === 2) {
            return `Calendar showing ${this.getMonthLabel(months[0])} and ${this.getMonthLabel(months[1])}`;
        }
        return `Calendar showing ${this.getMonthLabel(months[0])} through ${this.getMonthLabel(months[n - 1])}`;
    });

    /** @hidden */
    writeValue(value: DateRange<D> | D | null): void {
        if (value == null) {
            return;
        }
        if (this.calType() === 'range') {
            const range = value as DateRange<D>;
            this.selectedRangeDate.set(range);
            if (range.start && this.dateTimeAdapter.isValid(range.start)) {
                this.baseMonth.set({
                    month: this.dateTimeAdapter.getMonth(range.start),
                    year: this.dateTimeAdapter.getYear(range.start)
                });
            }
        } else {
            const date = value as D;
            this.selectedDate.set(date);
            if (this.dateTimeAdapter.isValid(date)) {
                this.baseMonth.set({
                    month: this.dateTimeAdapter.getMonth(date),
                    year: this.dateTimeAdapter.getYear(date)
                });
            }
        }
    }

    /** @hidden */
    registerOnChange(fn: (_: DateRange<D> | D | null) => void): void {
        this._onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    /** Handle range date change from any calendar. */
    protected onRangeChange(range: DateRange<D>): void {
        this.selectedRangeDate.set(range);
        this.selectedRangeDateChange.emit(range);
        this._onChange(range);
    }

    /** Handle single date change from any calendar. */
    protected onDateChange(date: D): void {
        this.selectedDate.set(date);
        this.selectedDateChange.emit(date);
        this._onChange(date);
    }

    /** Handle hover date changes for cross-calendar coordination. */
    protected onHoverChange(date: D | null | undefined): void {
        this.hoverDate.set(date);
    }

    /** Handle navigation events from inner calendars — sync all calendars. */
    protected onCalendarNavigated(newMonth: CalendarCurrent, index: number): void {
        this.baseMonth.set(this._shiftMonth(newMonth, -index));
    }

    /** @hidden */
    protected getMonthLabel(cal: CalendarCurrent): string {
        const monthNames = this.dateTimeAdapter.getMonthNames('long');
        return monthNames[cal.month - 1] + ' ' + cal.year;
    }

    /** @hidden */
    protected getSlotAriaLabel(m: CalendarCurrent, index: number): string {
        const total = this.calendarMonths().length;
        return total === 1 ? this.getMonthLabel(m) : `Calendar ${index + 1} of ${total}: ${this.getMonthLabel(m)}`;
    }

    /** @hidden */
    private _onChange: (_: DateRange<D> | D | null) => void = () => {};

    /** @hidden */
    private _onTouched: () => void = () => {};

    /** @hidden */
    private _shiftMonth(cur: CalendarCurrent, delta: number): CalendarCurrent {
        // Normalise to a zero-based month index, add delta, then convert back.
        const totalMonths = cur.year * 12 + (cur.month - 1) + delta;
        const year = Math.floor(totalMonths / 12);
        const month = (totalMonths % 12) + 1;
        return { month, year };
    }

    /** @hidden */
    private _getInitialMonth(): CalendarCurrent {
        const today = this.dateTimeAdapter.today();
        return {
            month: this.dateTimeAdapter.getMonth(today),
            year: this.dateTimeAdapter.getYear(today)
        };
    }
}
