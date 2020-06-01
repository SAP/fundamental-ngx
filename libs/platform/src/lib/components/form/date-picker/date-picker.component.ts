import { NgControl, NgForm } from '@angular/forms';
import { ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ViewEncapsulation, ViewChild } from '@angular/core';
import { CalendarType, CalendarYearGrid, DatePickerComponent as CoreDatePickerComponent } from '@fundamental-ngx/core';
import { DaysOfWeek, FdCalendarView, FdDate, FdRangeDate, SpecialDayRule } from '@fundamental-ngx/core';
import { Placement } from 'popper.js';
import { FormFieldControl } from '../form-control';
import { BaseInput } from '../base.input';

/**
 * Date-Picker implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-Date-Picker-Component-Technical-Design
 * documents.
 *
 * Core datePicker is wrapped here to work with platform form. Core datepicker properties
 * and Event has been exposed in the same way.
 */

@Component({
    selector: 'fdp-date-picker',
    templateUrl: './date-picker.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: DatePickerComponent, multi: true }]
})
export class DatePickerComponent extends BaseInput {
    /**
     * core datepicker as child
     */
    @ViewChild(CoreDatePickerComponent)
    coreDatePicker: CoreDatePickerComponent;

    /**
     * datepicker value set as controler value
     */
    @Input()
    get value(): any {
        return super.getValue();
    }

    set value(value: any) {
        super.setValue(value);
    }

    /** below code taken from core/date-picker */
    /** The type of calendar, 'single' for single date selection or 'range' for a range of dates. */
    @Input()
    type: CalendarType = 'single';

    /** Date Format displayed on input. See more options: https://angular.io/api/common/DatePipe */
    @Input()
    format: string = 'MM/dd/yyyy';

    /** Locale for date pipe. See more https://angular.io/guide/i18n */
    @Input()
    locale: string;

    /** The currently selected CalendarDay model */
    @Input()
    selectedDate: FdDate;

    /** The currently selected FdDates model start and end in range mode. */
    @Input()
    public selectedRangeDate: FdRangeDate = { start: null, end: null };

    /** The day of the week the calendar should start on. 1 represents Sunday, 2 is Monday, 3 is Tuesday, and so on. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /**
     * Whether user wants to mark day cells on hover.
     * Works only on range mode, when start date is selected on Day View.
     */
    @Input()
    rangeHoverEffect: boolean = false;

    /** Whether to validate the date picker input. */
    @Input()
    useValidation: boolean = true;

    /** Aria label for the datepicker input. */
    @Input()
    dateInputLabel: string = 'Date input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayCalendarToggleLabel: string = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull: boolean = true;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    public activeView: FdCalendarView = 'day';

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** Defines if date picker should be closed after date choose */
    @Input()
    closeOnDateChoose: boolean = true;

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable: boolean = true;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__special-day--{{number}}`] is available there:
     * https://sap.github.io/fundamental-styles/components/calendar.html calendar special days section
     * Rule accepts method with FdDate object as a parameter. ex:
     * `rule: (fdDate: FdDate) => fdDate.getDay() === 1`, which will mark all sundays as special day.
     */
    @Input()
    specialDaysRules: SpecialDayRule[] = [];

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
    markWeekends: boolean = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers: boolean = true;

    /** Fired when a new date is selected. */
    @Output()
    public readonly selectedDateChange: EventEmitter<FdDate> = new EventEmitter<FdDate>();

    /** Event thrown every time selected first or last date in range mode is changed */
    @Output()
    public readonly selectedRangeDateChange: EventEmitter<FdRangeDate> = new EventEmitter<FdRangeDate>();

    /** Event thrown every time calendar active view is changed */
    @Output()
    public readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeStartFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * @param fdDate FdDate
     */
    @Input()
    disableRangeEndFunction = function (fdDate: FdDate): boolean {
        return false;
    };

    constructor(
        protected _cd: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_cd, ngControl, ngForm);
    }

    writeValue(value: FdDate | FdRangeDate): void {
        super.writeValue(value);
        this._cd.detectChanges();
    }

    setDisabledState(isDisabled: boolean) {
        if (this.ngControl.disabled !== isDisabled && isDisabled) {
            this.ngControl.control.disable();
        }
        super.setDisabledState(isDisabled);
    }

    public handleDateChange(value: FdDate | FdRangeDate): void {
        this.onTouched();

        let finalValue = value;
        if (this.coreDatePicker && !this.coreDatePicker.isModelValid()) {
            finalValue = null;
        }
        this.value = finalValue;
    }

    public handleSelectedDateChange(fdDate: FdDate): void {
        this.selectedDateChange.emit(fdDate);
    }

    public handleSelectedRangeDateChange(fdRangeDate: FdRangeDate): void {
        this.selectedRangeDateChange.emit(fdRangeDate);
    }

    public handleActiveViewChange(fdCalendarView: FdCalendarView): void {
        this.activeViewChange.emit(fdCalendarView);
    }
}
