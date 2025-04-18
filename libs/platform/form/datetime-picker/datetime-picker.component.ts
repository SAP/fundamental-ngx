import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    inject
} from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { FD_FORM_FIELD_CONTROL, FormStates } from '@fundamental-ngx/cdk/forms';

import { CalendarYearGrid, DaysOfWeek, FdCalendarView, FdCalendarViewEnum } from '@fundamental-ngx/core/calendar';
import { DATE_TIME_FORMATS, DateTimeFormats, DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent } from '@fundamental-ngx/core/datetime-picker';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { Placement, SpecialDayRule } from '@fundamental-ngx/core/shared';
import { BaseInput } from '@fundamental-ngx/platform/shared';
import { createMissingDateImplementationError } from './errors';

@Component({
    selector: 'fdp-datetime-picker',
    templateUrl: './datetime-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FD_FORM_FIELD_CONTROL, useExisting: PlatformDatetimePickerComponent, multi: true }],
    imports: [DatetimePickerComponent, FormsModule]
})
export class PlatformDatetimePickerComponent<D> extends BaseInput implements AfterViewInit {
    /**
     * value for datetime
     */
    @Input()
    set value(value: D) {
        super.setValue(value);
    }
    get value(): D {
        return super.getValue();
    }

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
    startingDayOfWeek: DaysOfWeek;

    /** Actually shown active view one of 'day' | 'month' | 'year' in calendar component*/
    @Input()
    activeView: FdCalendarView = FdCalendarViewEnum.Day;

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

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: FormStates | undefined) {
        super.state = state;
    }

    get state(): FormStates {
        if (this.dateTimePickerComponent?.isInvalidDateInput) {
            // if any other error from core dtp
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

    /** Event thrown every time calendar active view is changed */
    @Output()
    readonly activeViewChange: EventEmitter<FdCalendarView> = new EventEmitter<FdCalendarView>();

    /** Event emitted when the date changes. This can be a time or day change. */
    @Output()
    readonly datetimeChange: EventEmitter<D> = new EventEmitter<D>();

    /** Event emitted when popover closes. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onClose: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(DatetimePickerComponent)
    dateTimePickerComponent: DatetimePickerComponent<D>;

    /** @hidden */
    @ViewChild(DatetimePickerComponent, { static: true, read: ElementRef })
    protected _elRef: ElementRef;

    /** @hidden */
    @ViewChild(DatetimePickerComponent, { static: true, read: NgControl })
    protected _control: NgControl;

    /** @hidden */
    get _isRequired(): boolean {
        return !!this.formField?.required;
    }

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

        // default model value
        this.value = this._dateTimeAdapter.now();
    }

    /**
     * Function used to disable certain dates in the calendar.
     * @param fdDate FdDate
     */
    @Input()
    disableFunction: (value: D) => boolean = () => false;

    /**
     * @hidden
     */
    ngAfterViewInit(): void {
        // if used with platform forms, adjust width of datetimepicker to take 100% container space
        if (this.formField) {
            this._adjustPickerWidth();
        }
    }

    /** @hidden */
    writeValue(value: D): void {
        super.writeValue(value);
        this.markForCheck();
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
            if (this.dateTimePickerComponent._isInvalidDateInput) {
                if (this.ngControl?.control && this._control.value) {
                    this.ngControl.control.setErrors(this._control.errors);
                }
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

    /**
     * @hidden
     * method that adjusts width of datetimepicker to take 100% container space
     */
    private _adjustPickerWidth(): void {
        const customPopoverEl = this._elRef.nativeElement.querySelector('.fd-datetime .fd-popover-custom');
        if (!customPopoverEl) {
            return;
        }
        customPopoverEl.style.display = 'inline';
    }
}
