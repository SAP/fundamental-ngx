import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL, FormStates } from '@fundamental-ngx/cdk/forms';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    CalendarType,
    CalendarYearGrid,
    DateRange,
    DaysOfWeek,
    FdCalendarView,
    FdCalendarViewEnum
} from '@fundamental-ngx/core/calendar';
import { DatePickerComponent, DatePickerComponent as FdDatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { DATE_TIME_FORMATS, DatetimeAdapter, DateTimeFormats } from '@fundamental-ngx/core/datetime';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { Placement, SpecialDayRule } from '@fundamental-ngx/core/shared';
import { BaseInput } from '@fundamental-ngx/platform/shared';

/**
 * The Platform date picker component is a wrapper around fd-date-picker using platform form.
 * It is able to provide form field functionalities as well along with fd-date-picker functions.
 *
 * <fdp-form-group #ffg [formGroup]="datePickerForm">
 *      <fdp-form-field #ffl1 id="birthday">
 *          <fdp-date-picker name="birthday" type="single" [formControl]="ffl1.formControl"></fdp-date-picker>
 *      </fdp-form-field>
 * </fdp-form-group>
 *
 */

@Component({
    selector: 'fdp-date-picker',
    templateUrl: './date-picker.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FD_FORM_FIELD_CONTROL, useExisting: PlatformDatePickerComponent, multi: true }],
    host: {
        '(blur)': 'onTouched()'
    },
    imports: [DatePickerComponent, FormsModule]
})
export class PlatformDatePickerComponent<D> extends BaseInput {
    /**
     * date-picker value set as controller value
     */
    @Input()
    set value(value: D | Array<D> | DateRange<D> | Array<DateRange<D>>) {
        super.setValue(value);
    }
    get value(): DateRange<D> | D {
        return super.getValue();
    }

    /** below code taken from core/date-picker */
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = 'single';

    /** The currently selected date model in single mode. */
    @Input()
    selectedDate: Nullable<D>;

    /** The currently selected date model in multiple mode. */
    @Input()
    selectedMultipleDates: Array<D> = [];

    /** The currently selected date model with start and end in range mode. */
    @Input()
    selectedRangeDate: DateRange<D>;

    /** The currently selected date model with multiple ranges. */
    @Input()
    selectedMultipleDateRanges: Array<DateRange<D>> = [];

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek;

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect = false;

    /** Whether to validate the date picker input. */
    @Input()
    useValidation = true;

    /** Enables Today-Selection-Button if true */
    @Input()
    showTodayButton = false;

    /** Label for Today-Selection-Button */
    @Input()
    todayButtonLabel = 'Today';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = FdCalendarViewEnum.Day;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /** Defines if date picker should be closed after date choose */
    @Input()
    closeOnDateChoose = true;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: FormStates) {
        super.state = state;
    }
    get state(): FormStates {
        if (this.fdDatePickerComponent?._isInvalidDateInput || !this._datePickerValid) {
            return 'error';
        }

        return super.state;
    }

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__item--legend-{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with FdDate object as a parameter. ex:
     * `rule: (fdDate: FdDate) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule<D>[] = [];

    /**
     * Object to customize year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    yearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 5,
        yearMapping: (num: number) => num.toString()
    };

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    aggregatedYearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 3,
        yearMapping: (num: number) => num.toString()
    };

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = true;

    /**
     * Whether the user wants to select multiple days or multiple range dates.
     * If `displayWeekNumbers` is true, the user can click on the week number to mark the related row.
     * The user can click on week days to mark the related column.
     * Note: Clickable selection for week row or column does not work for range selections.
     */
    @Input()
    allowMultipleSelection = false;

    /** Whether the date picker is open. Can be used through two-way binding. */
    @Input()
    isOpen = false;

    /** Should date picker be inlined. */
    @Input()
    inline = true;

    /**
     * Whether to recalculate value from the input as user types or on blur.
     * By default, updates the value as user types.
     * @default false
     */
    @Input()
    processInputOnBlur = false;

    /**
     * Whether to prevent page scrolling when focusing date picker input field after calendar has been closed.
     */
    @Input()
    preventScrollOnFocus = false;

    /** Whether date picker should rendered in mobile mode. */
    @Input()
    mobile = false;

    /** Mobile mode configuration. */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Whether calendar is used inside mobile in landscape mode, it also adds close button on right side */
    @Input()
    mobileLandscape = false;

    /** Whether calendar is used inside mobile in portrait mode */
    @Input()
    mobilePortrait = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange = new EventEmitter<boolean>();

    /** Event thrown every time selected date in single mode is changed */
    @Output()
    readonly selectedDateChange: EventEmitter<Nullable<D>> = new EventEmitter<Nullable<D>>();

    /** Event thrown every time the selected dates in multiple mode are changed. */
    @Output()
    readonly selectedMultipleDatesChange: EventEmitter<Array<D>> = new EventEmitter<Array<D>>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    readonly selectedRangeDateChange: EventEmitter<DateRange<D>> = new EventEmitter<DateRange<D>>();

    /** Event thrown every time the first or last date in multiple range mode is changed. */
    @Output()
    readonly selectedMultipleDateRangesChange: EventEmitter<Array<DateRange<D>>> = new EventEmitter<
        Array<DateRange<D>>
    >();

    /** Event thrown every time calendar active view is changed */
    @Output()
    readonly activeViewChange = new EventEmitter<FdCalendarView>();

    /**
     * @hidden core date-picker as child
     */
    @ViewChild(FdDatePickerComponent)
    fdDatePickerComponent: FdDatePickerComponent<D>;

    /** @hidden */
    private _datePickerValid = true;

    /** @hidden */
    private readonly _dateTimeAdapter = inject<DatetimeAdapter<D>>(DatetimeAdapter, {
        optional: true
    });

    /** @hidden */
    private readonly _dateTimeFormats = inject<DateTimeFormats>(DATE_TIME_FORMATS, {
        optional: true
    });

    /** @hidden */
    constructor() {
        super();

        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }
    }

    /**
     * Function used to disable certain dates in the calendar.
     */
    @Input()
    disableFunction: (value: D) => boolean = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     */
    @Input()
    disableRangeStartFunction: (value: D) => boolean = () => false;

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     */
    @Input()
    disableRangeEndFunction: (value: D) => boolean = () => false;

    /** @hidden */
    writeValue(value: D | Array<D> | DateRange<D> | Array<DateRange<D>> | null): void {
        super.writeValue(value);
        this.detectChanges();
    }

    /**
     * validates date on date change.
     * @param value D | DateRange<D>
     */
    handleDateChange(value: D | Array<D> | DateRange<D> | Array<DateRange<D>>): void {
        this.value = value;

        if (this.allowMultipleSelection) {
            if (this.type === 'single' && !this.value && !this.allowNull) {
                this._datePickerValid = false;
            } else if (this.type === 'range' && !this.allowNull) {
                const dateRanges = this.value as Array<DateRange<D>>;
                this._datePickerValid = dateRanges.every((range) => !!range.start);
            } else {
                this._datePickerValid = true;
            }

            this.stateChanges.next('date picker: handleDateInputChange');

            if (this.type === 'single') {
                this.handleSelectedMultipleDatesChange(this.selectedMultipleDates);
            } else if (this.type === 'range') {
                this.handleSelectedMultipleDateRangesChange(this.selectedMultipleDateRanges);
            }
        } else {
            if (this.type === 'single' && !this.value && !this.allowNull) {
                this._datePickerValid = false;
            } else if (this.type === 'range' && !this.allowNull) {
                const dateRange = this.value as DateRange<D>;
                this._datePickerValid = !!dateRange.start;
            } else {
                this._datePickerValid = true;
            }

            this.stateChanges.next('date picker: handleDateInputChange');

            if (this.type === 'single') {
                this.handleSelectedDateChange(this.selectedDate);
            } else if (this.type === 'range') {
                this.handleSelectedRangeDateChange(this.selectedRangeDate);
            }
        }
        this.markForCheck();
    }

    /**
     * Method that handles changes when popover is opened or closed.
     */
    handleOpenChange = (open: boolean): void => {
        this.isOpenChange.emit(open);
    };

    /** @hidden */
    handleSelectedDateChange = (fdDate: Nullable<D>): void => {
        this.selectedDateChange.emit(fdDate);
    };

    /** @hidden */
    handleSelectedMultipleDatesChange = (fdDate: Array<D>): void => {
        this.selectedMultipleDatesChange.emit(fdDate);
    };

    /** @hidden */
    handleSelectedRangeDateChange = (fdRangeDate: DateRange<D>): void => {
        this.selectedRangeDateChange.emit(fdRangeDate);
    };

    /** @hidden */
    handleSelectedMultipleDateRangesChange = (fdRangeDate: Array<DateRange<D>>): void => {
        this.selectedMultipleDateRangesChange.emit(fdRangeDate);
    };

    /** @hidden */
    handleActiveViewChange = (fdCalendarView: FdCalendarView): void => {
        this.activeViewChange.emit(fdCalendarView);
    };
}

/** @hidden */
export function createMissingDateImplementationError(provider: string): Error {
    return Error(
        `FdpDatePicker: No provider found for ${provider}. You must import one of the following ` +
            `modules at your application root: FdDateModule, or provide a ` +
            `custom implementation.`
    );
}
