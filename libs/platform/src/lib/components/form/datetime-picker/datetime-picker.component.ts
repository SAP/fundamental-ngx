import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import {
    CalendarYearGrid,
    DatetimeAdapter,
    DateTimeFormats,
    DatetimePickerComponent,
    DATE_TIME_FORMATS,
    DaysOfWeek,
    FdCalendarView,
    Placement,
    SpecialDayRule
} from '@fundamental-ngx/core';

import { BaseInput } from '../base.input';
import { FormField } from '../form-field';
import { FormFieldControl, Status } from '../form-control';
import { createMissingDateImplementationError } from './errors';

@Component({
    selector: 'fdp-datetime-picker',
    templateUrl: './datetime-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformDatetimePickerComponent, multi: true }]
})
export class PlatformDatetimePickerComponent<D> extends BaseInput {
    /**
     * value for datetime
     */
    @Input()
    get value(): D {
        return super.getValue();
    }
    set value(value: D) {
        super.setValue(value);
    }

    /** Whether the component should be in compact mode. */
    @Input()
    compact = false;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** The element to which the popover should be appended. */
    @Input()
    appendTo: ElementRef;

    /**
     * Whether the time component should be meridian (am/pm).
     * Default value is based on the current locale format option
     * */
    @Input()
    meridian: boolean;

    /**
     * Whether the time component shows seconds.
     * Default value is based on the current locale format option
     * */
    @Input()
    displaySeconds: boolean;

    /**
     * Whether the time component shows minutes.
     * Default value is based on the current locale format option
     * */
    @Input()
    displayMinutes: boolean;

    /**
     * Whether the time component shows hours.
     * Default value is based on the current locale format option
     * */
    @Input()
    displayHours: boolean;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    useValidation = true;

    /** Whether the popover is open. Two-way binding is supported. */
    @Input()
    isOpen = false;

    /** The starting day of week for the calendar. */
    @Input()
    startingDayOfWeek: DaysOfWeek = 1;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = 'day';

    /** Aria label for the datetime picker input. */
    @Input()
    datetimeInputLabel = 'Datetime input';

    /** Aria label for the button to show/hide the calendar. */
    @Input()
    displayDatetimeToggleLabel = 'Display calendar toggle';

    /** Whether a null input is considered valid. */
    @Input()
    allowNull = true;

    /**
     * @Input when set to true time component will use 2 digits for each number.
     * For example 9 will become 09
     * but 12 will be kept as 12.
     * Only uses by time component and does not change input format
     */
    @Input() keepTwoDigitsTime = false;

    @Input()
    set state(state: Status) {
        this._state = state ? state : 'default';
    }

    get state(): Status {
        if (this.dateTimePickerComponent?.isInvalidDateInput) {
            // if any other error from core dtp
            return 'error';
        }
        return this.status || this._state;
    }

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable = true;

    /**
     * Special days mark, it can be used by passing array of object with
     * Special day number, list 1-20 [class:`fd-calendar__special-day--{{number}}`] is available there:
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
        cols: 5
    };

    /**
     * Object to customize aggregated year grid,
     * Row, Columns and method to display year can be modified
     */
    @Input()
    aggregatedYearGrid: CalendarYearGrid = {
        rows: 4,
        cols: 3
    };

    /**
     * Whether user wants to mark sunday/saturday with `fd-calendar__item--weekend` class
     */
    @Input()
    markWeekends = true;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /**
     * Whether user wants to show week numbers next to days
     */
    @Input()
    showWeekNumbers = true;

    /** Whether or not to show the datetime picker footer with submit/cancel buttons. */
    @Input()
    showFooter = true;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange = new EventEmitter<boolean>();

    /** Event thrown every time calendar active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event emitted when the date changes. This can be a time or day change. */
    @Output()
    readonly datetimeChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event emitted when popover closes. */
    @Output()
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild(DatetimePickerComponent)
    dateTimePickerComponent: DatetimePickerComponent<D>;

    @ViewChild(DatetimePickerComponent, { static: true, read: ElementRef })
    protected _elRef: ElementRef;

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = (_: D): boolean => {
        return false;
    };

    constructor(
        protected _cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        // Use here @Optional to avoid angular injection error message and throw our own which is more precise one
        @Optional() private _dateTimeAdapter: DatetimeAdapter<D>,
        @Optional() @Inject(DATE_TIME_FORMATS) private _dateTimeFormats: DateTimeFormats
    ) {
        super(_cd, ngControl, ngForm, formField, formControl);

        if (!this._dateTimeAdapter) {
            throw createMissingDateImplementationError('DateTimeAdapter');
        }
        if (!this._dateTimeFormats) {
            throw createMissingDateImplementationError('DATE_TIME_FORMATS');
        }

        // default model value
        this.value = _dateTimeAdapter.now();
    }

    /** @hidden */
    writeValue(value: D): void {
        super.writeValue(value);
        this._cd.markForCheck();
    }

    /**
     * @hidden
     * override base functionality to catch new disabled state
     */
    setDisabledState(disabled: boolean): void {
        super.setDisabledState(disabled);
        this.dateTimePickerComponent?.setDisabledState(disabled);
    }

    /**
     * @hidden
     * logic to handle validation from both platform forms and core datetiimepicker
     * @param datetime inputted
     */
    handleDatetimeInputChange(datetime: D): void {
        if (this.dateTimePickerComponent) {
            if (this.dateTimePickerComponent.isInvalidDateInput) {
                this.state = 'error';
            } else {
                if (!this.dateTimePickerComponent._inputFieldDate && !this.allowNull) {
                    this.state = 'error'; // null value in not allowNull should throw error
                } else {
                    this.state = undefined; // resetting to default state
                }
            }
            // only set the value if it is a valid datetime object
            if (this.dateTimePickerComponent._inputFieldDate) {
                this.value = datetime;
            }

            this.stateChanges.next('datetime picker: handleDatetimeInputChange');
        }

        this.datetimeChange.emit(datetime);

        this.onTouched();
    }

    /**
     * Method that handles changes when popover is opened or closed.
     */
    handleOpenChange = (open: boolean): void => {
        this.isOpenChange.emit(open);
    };
    /**
     * Method that handle calendar active view change and throws event.
     */
    handleActiveViewChange = (fdCalendarView: FdCalendarView): void => {
        this.activeViewChange.emit(fdCalendarView);
    };
}
