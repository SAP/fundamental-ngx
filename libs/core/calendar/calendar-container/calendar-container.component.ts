import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DestroyRef,
    forwardRef,
    inject,
    Injector,
    input,
    model,
    signal,
    TemplateRef,
    viewChild,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { SpecialDayRule } from '@fundamental-ngx/core/shared';

import { CalendarAggregatedYearViewComponent } from '../calendar-views/calendar-aggregated-year-view/calendar-aggregated-year-view.component';
import { CalendarMonthViewComponent } from '../calendar-views/calendar-month-view/calendar-month-view.component';
import { CalendarYearViewComponent } from '../calendar-views/calendar-year-view/calendar-year-view.component';
import { CalendarComponent } from '../calendar.component';
import { CalendarService } from '../calendar.service';
import { CalendarCurrent } from '../models/calendar-current';
import { CalendarYearGrid } from '../models/calendar-year-grid';
import { DisableDateFunction } from '../models/common';
import { DateRange } from '../models/date-range';
import { CalendarType, DaysOfWeek, FdCalendarView } from '../types';

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
        CalendarService,
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
    imports: [
        ButtonComponent,
        CalendarComponent,
        CalendarMonthViewComponent,
        CalendarYearViewComponent,
        CalendarAggregatedYearViewComponent
    ]
})
export class FdCalendarContainerComponent<D> implements ControlValueAccessor {
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

    /** Year view grid configuration. */
    readonly yearViewGrid = input<CalendarYearGrid>({ rows: 4, cols: 5 });

    /** Aggregated year view grid configuration. */
    readonly aggregatedYearViewGrid = input<CalendarYearGrid>({ rows: 4, cols: 3 });

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

    /**
     * Whether the container renders in mobile (phone) mode. On mobile the container
     * collapses to a single month regardless of `months`, and the month/year picker
     * opens full-screen.
     *
     * @default false
     */
    readonly mobile = input(false, { transform: booleanAttribute });

    /**
     * Passthrough mobile-mode configuration for standalone use. Its `dialogConfig`
     * fields (when present) are merged into the picker dialog config; the container's
     * own `mobile` flag always wins for the dialog's full-screen behaviour.
     */
    readonly mobileConfig = input<MobileModeConfig>();

    /** @hidden */
    protected readonly dateTimeAdapter = inject(DatetimeAdapter<D>);

    /** @hidden */
    protected readonly id = 'fd-calendar-container-' + calendarContainerUniqueId++;

    /** @hidden Reference to the picker dialog template rendered via DialogService. */
    protected readonly pickerTemplate = viewChild.required<TemplateRef<unknown>>('pickerTemplate');

    /** The month/year displayed by the first (leftmost/topmost) calendar. */
    protected readonly baseMonth = signal<CalendarCurrent>(this._getInitialMonth());

    /** Shared hover date for cross-calendar hover coordination. */
    protected readonly hoverDate = signal<D | null | undefined>(null);

    /** @hidden Current view of the container-level picker. */
    protected readonly pickerView = signal<'month' | 'year' | 'aggregatedYear'>('month');

    /** @hidden Index of the calendar that triggered the picker (-1 = none). */
    protected readonly pickerCalendarIndex = signal<number>(-1);

    /** @hidden Year anchor for the picker's year/aggregatedYear view. Set when picker opens; shifted by aggregate header arrows. */
    protected readonly pickerYearAnchor = signal<number>(0);

    /** @hidden Range label for year picker (e.g. "2020 - 2039"). */
    protected readonly pickerYearRangeLabel = computed<string>(() => {
        const anchor = this.pickerYearAnchor();
        const grid = this.yearViewGrid();
        const size = grid.cols * grid.rows;
        return `${anchor} - ${anchor + size - 1}`;
    });

    /** @hidden ARIA label for the container picker dialog. */
    protected readonly pickerAriaLabel = computed<string>(() => {
        switch (this.pickerView()) {
            case 'month':
                return 'Month picker';
            case 'year':
                return 'Year picker';
            case 'aggregatedYear':
                return 'Year range picker';
        }
    });

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes = ['fd-calendar-container'];
        if (this.layout() === 'vertical') {
            classes.push('fd-calendar-container--vertical');
        }
        return classes.join(' ');
    });

    /** @hidden Number of calendars actually rendered — collapses to 1 on mobile. */
    protected readonly displayedCount = computed(() => (this.mobile() ? 1 : this.months()));

    /** @hidden */
    protected readonly calendarMonths = computed<CalendarCurrent[]>(() => {
        const base = this.baseMonth();
        const n = this.displayedCount();
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
    private readonly _dialogService = inject(DialogService);

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden Reference to the currently open picker dialog. */
    private _pickerDialogRef: DialogRef | null = null;

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
        this._onChange(range);
    }

    /** Handle single date change from any calendar. */
    protected onDateChange(date: D): void {
        this.selectedDate.set(date);
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

    /** @hidden Intercepts activeViewChange from a calendar in popover mode and opens the container picker. */
    protected onCalendarTriggerView(view: FdCalendarView, index: number): void {
        if (view === 'day') {
            return;
        }
        this.pickerView.set(view as 'month' | 'year' | 'aggregatedYear');
        this.pickerCalendarIndex.set(index);
        // Anchor the picker's year window on the clicked calendar's current year.
        const currentYear = this.calendarMonths()[index]?.year ?? new Date().getFullYear();
        this.pickerYearAnchor.set(currentYear);
        // Close any lingering picker before opening a fresh one.
        this._pickerDialogRef?.close();
        this._pickerDialogRef = this._dialogService.open(
            this.pickerTemplate(),
            {
                ...this.mobileConfig()?.dialogConfig,
                hasBackdrop: true,
                backdropClickCloseable: true,
                escKeyCloseable: true,
                ariaLabel: this.pickerAriaLabel(),
                // Container's own mobile flag always wins so the picker goes full-screen on phone.
                mobile: this.mobile()
            },
            this._injector
        );
        // Null the ref on any dismissal (ESC, backdrop, selection) so the
        // "is a picker open?" state stays truthful and .close() is never
        // called on an already-closed ref.
        this._pickerDialogRef.afterClosed.pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
            next: () => (this._pickerDialogRef = null),
            error: () => (this._pickerDialogRef = null)
        });
    }

    /** @hidden Closes the container-level picker. Focus restore is handled by DialogService. */
    protected closeContainerPicker(): void {
        this._pickerDialogRef?.close();
    }

    /** @hidden Month selected from the picker — update the calendar at the captured index. */
    protected onPickerMonthSelected(month: number): void {
        const calendarIndex = this.pickerCalendarIndex();
        const currentMonths = this.calendarMonths();
        if (calendarIndex < 0 || calendarIndex >= currentMonths.length) {
            return;
        }
        const targetYear = currentMonths[calendarIndex].year;
        const newMonth: CalendarCurrent = { month, year: targetYear };
        this.baseMonth.set(this._shiftMonth(newMonth, -calendarIndex));
        this._pickerDialogRef?.close();
    }

    /** @hidden Year selected from the picker — update calendar, close picker. */
    protected onPickerYearSelected(year: number): void {
        const calendarIndex = this.pickerCalendarIndex();
        const currentMonths = this.calendarMonths();
        if (calendarIndex < 0 || calendarIndex >= currentMonths.length) {
            return;
        }
        const newMonth: CalendarCurrent = { month: currentMonths[calendarIndex].month, year };
        this.baseMonth.set(this._shiftMonth(newMonth, -calendarIndex));
        this._pickerDialogRef?.close();
    }

    /** @hidden Year-range selected — set anchor and navigate back to year view (keep picker open). */
    protected onPickerYearsSelected(startYear: number): void {
        this.pickerYearAnchor.set(startYear);
        this.pickerView.set('year');
        // Do NOT update baseMonth here — that is a separate concern from the picker's own display anchor.
        // baseMonth updates only on final selection (onPickerYearSelected / onPickerMonthSelected).
    }

    /** @hidden Shift picker year window by ±(cols*rows). */
    protected shiftPickerYearWindow(direction: 1 | -1): void {
        const view = this.pickerView();
        if (view === 'year') {
            const size = this.yearViewGrid().cols * this.yearViewGrid().rows;
            this.pickerYearAnchor.update((y) => y + direction * size);
        } else if (view === 'aggregatedYear') {
            const yGrid = this.yearViewGrid();
            const aGrid = this.aggregatedYearViewGrid();
            const size = yGrid.cols * yGrid.rows * aGrid.cols * aGrid.rows;
            this.pickerYearAnchor.update((y) => y + direction * size);
        }
    }

    /** @hidden Click on aggregate year-range label — switch to aggregatedYear view. */
    protected onAggregateYearRangeLabelClick(): void {
        this.pickerView.set('aggregatedYear');
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
