import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import {
    CalendarYearGrid,
    DatetimePickerComponent,
    DaysOfWeek,
    FdCalendarView,
    FdDate,
    FdDatetime,
    SpecialDayRule
} from '@fundamental-ngx/core';
import { Placement } from 'popper.js';
import { BaseInput } from '../base.input';
import { FormField } from '../form-field';
import { FormFieldControl, Status } from '../public_api';

@Component({
    selector: 'fdp-datetime-picker',
    templateUrl: './datetime-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformDatetimePickerComponent, multi: true }]
})
export class PlatformDatetimePickerComponent extends BaseInput implements OnInit, OnDestroy {
    /**
     * value for datetime
     */
    @Input()
    get value(): FdDatetime {
        return super.getValue();
    }
    set value(value: FdDatetime) {
        super.setValue(value);
    }

    /** value for the meridian property. */
    @Input()
    meridian: boolean;

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

    /** Date Format displayed on input. See more options: https://angular.io/api/common/DatePipe */
    @Input()
    format = 'MM/dd/yyyy, HH:mm:ss';

    /** Locale for date pipe. See more https://angular.io/guide/i18n */
    @Input()
    locale: string;

    /** Whether the time component shows seconds. */
    @Input()
    displaySeconds = true;

    /** Whether the time component shows minutes. */
    @Input()
    displayMinutes = true;

    /** Whether the time component shows hours. */
    @Input()
    displayHours = true;

    /** Whether to perform visual validation on the picker input. */
    @Input()
    useValidation = true;

    /** Current selected date. Two-way binding is supported. */
    @Input()
    date: FdDatetime = FdDatetime.getToday();

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
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input() keepTwoDigitsTime = false;

    @Input()
    set state(state: Status) {
        this._state = state ? state : 'default';
    }

    get state(): Status {
        if (this.dateTimePickerComponent && this.dateTimePickerComponent.isInvalidDateInput) {
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
    readonly datetimeChange: EventEmitter<FdDatetime> = new EventEmitter<FdDatetime>();

    /** Event emitted when popover closes. */
    @Output()
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild(DatetimePickerComponent)
    dateTimePickerComponent: DatetimePickerComponent;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    private _state: Status;

    @ViewChild(DatetimePickerComponent, { static: true, read: ElementRef })
    protected _elRef: ElementRef;

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction = (fdDate: FdDate): boolean => {
        return false;
    };

    constructor(
        protected _cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(_cd, ngControl, ngForm, formField, formControl);
    }
    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        // set default placeholder value
        if (!this.placeholder) {
            this.placeholder = this.format;
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.dateTimePickerComponent?.ngOnDestroy();
    }
    /** @hidden */
    writeValue(value: FdDatetime): void {
        super.writeValue(value);
        // emit events
        if (value) {
            this._handleDatetimeChange(value);
        }
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
     * @param value inputted
     */
    handleDatetimeInputChange(value: FdDatetime): void {
        if (this.dateTimePickerComponent) {
            if (this.dateTimePickerComponent.isInvalidDateInput) {
                this.state = 'error';
            } else {
                if (!this.dateTimePickerComponent.inputFieldDate && !this.allowNull) {
                    this.state = 'error'; // null value in not allowNull should throw error
                } else {
                    this.state = undefined; // resetting to default state
                }
            }
            // only set the value if it is a valid datetime object
            if (this.dateTimePickerComponent.inputFieldDate) {
                this.value = value;
            }

            this.stateChanges.next('datetime picker: handleDatetimeInputChange');
        }
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

    /**
     * @hidden
     * internal method that calls date/time change events
     */
    _handleDatetimeChange(value: FdDatetime): void {
        this.dateTimePickerComponent?.handleDateChange(value.date);
        this.dateTimePickerComponent?.handleTimeChange(value.time);

        this.datetimeChange.emit(value);
    }
}
