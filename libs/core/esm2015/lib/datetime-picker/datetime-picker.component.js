/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeComponent } from '../time/time.component';
import { DateTimeFormatParser } from './format/datetime-parser';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarComponent } from '../calendar/calendar.component';
import { FdDatetime } from './models/fd-datetime';
/**
 * The datetime picker component is an opinionated composition of the fd-popover,
 * fd-calendar and fd-time components to accomplish the UI pattern for picking a date and time.
 * Supports Angular Forms.
 * ```html
 * <fd-date-time-picker [(ngModel)]="dateTime"></fd-date-time-picker>
 * ```
 */
export class DatetimePickerComponent {
    /**
     * @hidden
     * @param {?} elRef
     * @param {?} changeDetRef
     * @param {?} dateTimeAdapter
     */
    constructor(elRef, changeDetRef, dateTimeAdapter) {
        this.elRef = elRef;
        this.changeDetRef = changeDetRef;
        this.dateTimeAdapter = dateTimeAdapter;
        /**
         * @hidden Date of the input field. Internal use.
         * For programmatic selection, use two-way binding on the date input.
         */
        this.inputFieldDate = null;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.isInvalidDateInput = false;
        /**
         * @hidden The Time object which interacts with the inner Time component. Internal use.
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * Placeholder for the inner input element.
         */
        this.placeholder = 'mm/dd/yyyy, hh:mm:ss am';
        /**
         * Whether the component should be in compact mode.
         */
        this.compact = false;
        /**
         *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
         *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
         */
        this.placement = 'bottom-start';
        /**
         * Whether the time component should be meridian (am/pm).
         */
        this.meridian = true;
        /**
         * Whether the time component shows spinners for changing the time.
         */
        this.spinners = true;
        /**
         * Whether the time component shows seconds.
         */
        this.displaySeconds = true;
        /**
         * Whether the time component shows minutes.
         */
        this.displayMinutes = true;
        /**
         * Whether the time component shows hours.
         */
        this.displayHours = true;
        /**
         * Whether to perform visual validation on the picker input.
         */
        this.useValidation = true;
        /**
         * Current selected date. Two-way binding is supported.
         */
        this.date = FdDatetime.getToday();
        /**
         * Whether the popover is open. Two-way binding is supported.
         */
        this.isOpen = false;
        /**
         * The disableFunction for the calendar.
         */
        this.startingDayOfWeek = 1;
        /**
         * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
         */
        this.activeView = 'day';
        /**
         * Aria label for the datetime picker input.
         */
        this.datetimeInputLabel = 'Datetime input';
        /**
         * Aria label for the button to show/hide the calendar.
         */
        this.displayDatetimeToggleLabel = 'Display calendar toggle';
        /**
         * Whether a null input is considered valid.
         */
        this.allowNull = true;
        /**
         * Event thrown every time calendar active view is changed
         */
        this.activeViewChange = new EventEmitter();
        /**
         * Event emitted when the date changes. This can be a time or day change.
         */
        this.dateChange = new EventEmitter();
        /**
         * Event emitted when the day changes from the calendar.
         */
        this.calendarChange = new EventEmitter();
        /**
         * Event emitted when the time changes from the time component.
         */
        this.timeChange = new EventEmitter();
        /**
         * Event emitted when popover closes.
         */
        this.onClose = new EventEmitter();
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} selected
         * @return {?}
         */
        (selected) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
        /**
         * Function used to disable certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.disableFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.disableRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to disable certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.disableRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range start selection.
         * @param fdDate FdDate
         */
        this.blockRangeStartFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar for the range end selection.
         * @param fdDate FdDate
         */
        this.blockRangeEndFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
        /**
         * Function used to block certain dates in the calendar.
         * @param fdDate FdDate
         */
        this.blockFunction = (/**
         * @param {?} fdDate
         * @return {?}
         */
        function (fdDate) {
            return false;
        });
    }
    /**
     * @hidden
     * Function that implements Validator Interface, adds validation support for forms
     * @param {?} control
     * @return {?}
     */
    validate(control) {
        return this.isModelValid() ? null : {
            dateValidation: {
                valid: false
            }
        };
    }
    /**
     * Toggles the popover.
     * @return {?}
     */
    togglePopover() {
        this.onTouched();
        if (this.isOpen) {
            this.closePopover();
        }
        else {
            this.openPopover();
        }
    }
    /**
     * Method that handle calendar active view change and throws event.
     * @param {?} activeView
     * @return {?}
     */
    handleCalendarActiveViewChange(activeView) {
        this.activeViewChange.emit(activeView);
    }
    /**
     * Opens the popover.
     * @return {?}
     */
    openPopover() {
        if (!this.isOpen && !this.disabled) {
            this.onTouched();
            this.isOpen = true;
        }
    }
    /**
     * Closes the popover and refresh model
     * @return {?}
     */
    closePopover() {
        if (this.isOpen) {
            this.handleInputChange(this.inputFieldDate);
            this.onClose.emit();
            this.isOpen = false;
        }
    }
    /**
     * @hidden
     * @param {?} e
     * @return {?}
     */
    isInvalidDateInputHandler(e) {
        this.isInvalidDateInput = e;
    }
    /**
     * @hidden
     * @return {?}
     */
    onEscapeKeydownHandler() {
        this.closePopover();
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onGlobalClick(event) {
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.closePopover();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.date && this.inputFieldDate !== null) {
            this.selectedDate = this.date.date;
            this.time = this.date.time;
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        if (this.dateFromInputSubscription) {
            this.dateFromInputSubscription.unsubscribe();
        }
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @hidden
     * Function that provides support for ControlValueAccessor that allows to use [(ngModel)] or forms
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        if (!selected || !(selected instanceof FdDatetime)) {
            return;
        }
        this.selectedDate = selected.date;
        this.time = selected.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        if (this.isModelValid()) {
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.setInput(this.date);
        }
    }
    /**
     * @hidden
     * Method that is triggered by events from calendar component, when there is selected date changed.
     * If invalid time model is detected, it takes time model data from TimeComponent.
     * @param {?} date
     * @return {?}
     */
    handleDateChange(date) {
        this.selectedDate = date;
        if (!this.date.isTimeValid()) {
            this.time = this.timeComponent.time;
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    }
    /**
     * @hidden
     * Method that is triggered by events from time component, when there is selected time changed
     * @param {?} time
     * @return {?}
     */
    handleTimeChange(time) {
        this.time = time;
        if (!this.selectedDate || !this.selectedDate.isDateValid()) {
            this.selectedDate = FdDate.getToday();
        }
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.setInput(this.date);
        this.onChange(this.date);
    }
    /**
     * @hidden
     * @return {?}
     */
    focusArrowLeft() {
        if (this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow')) {
            this.elRef.nativeElement.querySelector('#' + this.calendarComponent.id + '-left-arrow').focus();
        }
    }
    /**
     * @hidden
     * Method, which is responsible for transforming string to datetime, depending on type or
     * validation the results are different. It also changes to state of isInvalidDateInput.
     * @param {?} date
     * @return {?}
     */
    handleInputChange(date) {
        /** @type {?} */
        const fdTimeDate = this.dateTimeAdapter.parse(date);
        this.selectedDate = fdTimeDate.date;
        this.time = fdTimeDate.time;
        this.date = new FdDatetime(this.selectedDate, this.time);
        this.isInvalidDateInput = !this.isModelValid();
        this.onChange(fdTimeDate);
        if (!this.isInvalidDateInput) {
            this.calendarComponent.setCurrentlyDisplayed(fdTimeDate.date);
        }
        if (!date && this.allowNull) {
            this.isInvalidDateInput = false;
            this.date = FdDatetime.getToday();
            this.selectedDate = this.date.date;
            this.time = this.date.time;
            this.calendarComponent.setCurrentlyDisplayed(this.date.date);
            this.onChange(null);
        }
        else if (!this.allowNull) {
            this.isInvalidDateInput = true;
        }
    }
    /**
     * Method that provides information if model selected date/dates have properly types and are valid
     * @return {?}
     */
    isModelValid() {
        return this.date &&
            this.date instanceof FdDatetime &&
            this.date.isDateValid() && this.date.isTimeValid();
    }
    /**
     * @private
     * @param {?} fdDateTime
     * @return {?}
     */
    setInput(fdDateTime) {
        this.inputFieldDate = this.dateTimeAdapter.format(fdDateTime);
        this.changeDetRef.detectChanges();
    }
}
DatetimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-datetime-picker',
                template: "<div class=\"fd-datetime\">\n    <fd-popover [(isOpen)]=\"isOpen\"\n                (isOpenChange)=\"handleInputChange(dateTimePicker.value)\"\n                [closeOnOutsideClick]=\"false\"\n                [closeOnEscapeKey]=\"false\"\n                [triggers]=\"[]\"\n                [disabled]=\"disabled\"\n                [placement]=\"placement\">\n        <fd-popover-control>\n            <div class=\"fd-input-group fd-input-group--after\"\n                 [ngClass]=\"{'fd-input-group--compact' : compact}\">\n                <input type=\"text\"\n                       #dateTimePicker\n                       [attr.aria-label]=\"datetimeInputLabel\"\n                       [(ngModel)]=\"inputFieldDate\"\n                       [placeholder]=\"placeholder\"\n                       (keyup.enter)=\"handleInputChange(dateTimePicker.value)\"\n                       (click)=\"openPopover()\"\n                       [ngClass]=\"{ 'fd-input--compact': compact, 'is-invalid': isInvalidDateInput && useValidation }\"\n                       [disabled]=\"disabled\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button class=\"fd-popover__control fd-button--icon fd-button--light sap-icon--date-time\"\n                            (click)=\"togglePopover()\" [attr.aria-label]=\"displayDatetimeToggleLabel\"\n                            [attr.aria-expanded]=\"isOpen\" type=\"button\" [disabled]=\"disabled\"></button>\n                </span>\n            </div>\n        </fd-popover-control>\n        <fd-popover-body\n            [attr.aria-expanded]=\"isOpen\"\n            [attr.aria-hidden]=\"!isOpen\"\n            [style.display]=\"'block'\">\n            <div class=\"fd-datetime__container\">\n                <fd-calendar calType=\"single\"\n                             [activeView]=\"activeView\"\n                             (activeViewChange)=\"handleCalendarActiveViewChange($event)\"\n                             [disableFunction]=\"disableFunction ? disableFunction : null\"\n                             [blockFunction]=\"blockFunction ? blockFunction : null\"\n                             [disableRangeStartFunction]=\"disableRangeStartFunction ? disableRangeStartFunction : null\"\n                             [disableRangeEndFunction]=\"disableRangeEndFunction ? disableRangeEndFunction : null\"\n                             [blockRangeStartFunction]=\"blockRangeStartFunction ? blockRangeStartFunction : null\"\n                             [blockRangeEndFunction]=\"blockRangeEndFunction ? blockRangeEndFunction : null\"\n                             [selectedDate]=\"selectedDate\"\n                             (selectedDateChange)=\"handleDateChange($event)\"\n                             (isValidDateChange)=\"isInvalidDateInputHandler($event)\"\n                             [escapeFocusFunction]=\"null\"\n                             [startingDayOfWeek]=\"startingDayOfWeek\"></fd-calendar>\n                <div class=\"fd-datetime__separator\"></div>\n                <fd-time [disabled]=\"disabled\"\n                         [meridian]=\"meridian\"\n                         [ngModel]=\"time\"\n                         (ngModelChange)=\"handleTimeChange($event)\"\n                         [spinners]=\"spinners\"\n                         [displaySeconds]=\"displaySeconds\"\n                         [displayMinutes]=\"displayMinutes\"\n                         [displayHours]=\"displayHours\"\n                         (focusArrowLeft)=\"focusArrowLeft()\"></fd-time>\n            </div>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n",
                host: {
                    '(blur)': 'onTouched()',
                    '[class.fd-datetime-host]': 'true'
                },
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatetimePickerComponent)),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => DatetimePickerComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-datetime-host{display:inline-block;width:230px}.fd-datetime-host .fd-datetime{display:block}.fd-datetime-host .fd-datetime__container{display:flex;align-items:center;margin:0 16px}.fd-datetime-host .fd-datetime__separator{background-color:#d3d3d3;width:1px;margin:42px 28px;-ms-grid-row-align:stretch;align-self:stretch}.fd-datetime-host .fd-datetime fd-popover{display:block}.fd-datetime-host .fd-datetime fd-time{width:auto}"]
            }] }
];
/** @nocollapse */
DatetimePickerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: DateTimeFormatParser }
];
DatetimePickerComponent.propDecorators = {
    timeComponent: [{ type: ViewChild, args: [TimeComponent,] }],
    calendarComponent: [{ type: ViewChild, args: [CalendarComponent,] }],
    placeholder: [{ type: Input }],
    compact: [{ type: Input }],
    placement: [{ type: Input }],
    meridian: [{ type: Input }],
    disabled: [{ type: Input }],
    spinners: [{ type: Input }],
    displaySeconds: [{ type: Input }],
    displayMinutes: [{ type: Input }],
    displayHours: [{ type: Input }],
    useValidation: [{ type: Input }],
    date: [{ type: Input }],
    isOpen: [{ type: Input }],
    startingDayOfWeek: [{ type: Input }],
    activeView: [{ type: Input }],
    datetimeInputLabel: [{ type: Input }],
    displayDatetimeToggleLabel: [{ type: Input }],
    allowNull: [{ type: Input }],
    activeViewChange: [{ type: Output }],
    dateChange: [{ type: Output }],
    calendarChange: [{ type: Output }],
    timeChange: [{ type: Output }],
    onClose: [{ type: Output }],
    disableFunction: [{ type: Input }],
    disableRangeStartFunction: [{ type: Input }],
    disableRangeEndFunction: [{ type: Input }],
    blockRangeStartFunction: [{ type: Input }],
    blockRangeEndFunction: [{ type: Input }],
    blockFunction: [{ type: Input }],
    onEscapeKeydownHandler: [{ type: HostListener, args: ['document:keydown.escape', [],] }],
    onGlobalClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /**
     * @hidden Reference to the inner time component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.timeComponent;
    /**
     * @hidden Reference to the inner calendar component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.calendarComponent;
    /**
     * @hidden Date of the input field. Internal use.
     * For programmatic selection, use two-way binding on the date input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.inputFieldDate;
    /**
     * @hidden The Time object which interacts with the inner Time component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.isInvalidDateInput;
    /**
     * @hidden The Time object which interacts with the inner Time component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.time;
    /**
     * @hidden The CalendarDay object which interacts with the inner Calendar component. Internal use.
     * @type {?}
     */
    DatetimePickerComponent.prototype.selectedDate;
    /**
     * Subscription of the dateFromInput.
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.dateFromInputSubscription;
    /**
     * Placeholder for the inner input element.
     * @type {?}
     */
    DatetimePickerComponent.prototype.placeholder;
    /**
     * Whether the component should be in compact mode.
     * @type {?}
     */
    DatetimePickerComponent.prototype.compact;
    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     * @type {?}
     */
    DatetimePickerComponent.prototype.placement;
    /**
     * Whether the time component should be meridian (am/pm).
     * @type {?}
     */
    DatetimePickerComponent.prototype.meridian;
    /**
     * Whether the component is disabled.
     * @type {?}
     */
    DatetimePickerComponent.prototype.disabled;
    /**
     * Whether the time component shows spinners for changing the time.
     * @type {?}
     */
    DatetimePickerComponent.prototype.spinners;
    /**
     * Whether the time component shows seconds.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displaySeconds;
    /**
     * Whether the time component shows minutes.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayMinutes;
    /**
     * Whether the time component shows hours.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayHours;
    /**
     * Whether to perform visual validation on the picker input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.useValidation;
    /**
     * Current selected date. Two-way binding is supported.
     * @type {?}
     */
    DatetimePickerComponent.prototype.date;
    /**
     * Whether the popover is open. Two-way binding is supported.
     * @type {?}
     */
    DatetimePickerComponent.prototype.isOpen;
    /**
     * The disableFunction for the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.startingDayOfWeek;
    /**
     * Actually shown active view one of 'day' | 'month' | 'year' in calendar component
     * @type {?}
     */
    DatetimePickerComponent.prototype.activeView;
    /**
     * Aria label for the datetime picker input.
     * @type {?}
     */
    DatetimePickerComponent.prototype.datetimeInputLabel;
    /**
     * Aria label for the button to show/hide the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.displayDatetimeToggleLabel;
    /**
     * Whether a null input is considered valid.
     * @type {?}
     */
    DatetimePickerComponent.prototype.allowNull;
    /**
     * Event thrown every time calendar active view is changed
     * @type {?}
     */
    DatetimePickerComponent.prototype.activeViewChange;
    /**
     * Event emitted when the date changes. This can be a time or day change.
     * @type {?}
     */
    DatetimePickerComponent.prototype.dateChange;
    /**
     * Event emitted when the day changes from the calendar.
     * @type {?}
     */
    DatetimePickerComponent.prototype.calendarChange;
    /**
     * Event emitted when the time changes from the time component.
     * @type {?}
     */
    DatetimePickerComponent.prototype.timeChange;
    /**
     * Event emitted when popover closes.
     * @type {?}
     */
    DatetimePickerComponent.prototype.onClose;
    /**
     * @hidden
     * @type {?}
     */
    DatetimePickerComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    DatetimePickerComponent.prototype.onTouched;
    /**
     * Function used to disable certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableFunction;
    /**
     * Function used to disable certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableRangeStartFunction;
    /**
     * Function used to disable certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.disableRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar for the range start selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockRangeStartFunction;
    /**
     * Function used to block certain dates in the calendar for the range end selection.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockRangeEndFunction;
    /**
     * Function used to block certain dates in the calendar.
     * \@param fdDate FdDate
     * @type {?}
     */
    DatetimePickerComponent.prototype.blockFunction;
    /**
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    DatetimePickerComponent.prototype.changeDetRef;
    /** @type {?} */
    DatetimePickerComponent.prototype.dateTimeAdapter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9kYXRldGltZS1waWNrZXIvZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXlDLGFBQWEsRUFBRSxpQkFBaUIsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBR3BILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEQsT0FBTyxFQUFFLGlCQUFpQixFQUE4QixNQUFNLGdDQUFnQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7O0FBZ0NsRCxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7O0lBd1FoQyxZQUFvQixLQUFpQixFQUNqQixZQUErQixFQUNoQyxlQUFxQztRQUZwQyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBc0I7Ozs7O1FBNVB4RCxtQkFBYyxHQUFXLElBQUksQ0FBQzs7OztRQUc5Qix1QkFBa0IsR0FBWSxLQUFLLENBQUM7Ozs7UUFHcEMsU0FBSSxHQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFD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Q3pCLCtDQUF1Qzs7SUFDdkMsa0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IsIFZhbGlkYXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGltZU9iamVjdCB9IGZyb20gJy4uL3RpbWUvdGltZS1vYmplY3QnO1xuaW1wb3J0IHsgVGltZUNvbXBvbmVudCB9IGZyb20gJy4uL3RpbWUvdGltZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGxhY2VtZW50IH0gZnJvbSAncG9wcGVyLmpzJztcbmltcG9ydCB7IERhdGVUaW1lRm9ybWF0UGFyc2VyIH0gZnJvbSAnLi9mb3JtYXQvZGF0ZXRpbWUtcGFyc2VyJztcbmltcG9ydCB7IEZkRGF0ZSB9IGZyb20gJy4uL2NhbGVuZGFyL21vZGVscy9mZC1kYXRlJztcbmltcG9ydCB7IENhbGVuZGFyQ29tcG9uZW50LCBEYXlzT2ZXZWVrLCBGZENhbGVuZGFyVmlldyB9IGZyb20gJy4uL2NhbGVuZGFyL2NhbGVuZGFyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGZERhdGV0aW1lIH0gZnJvbSAnLi9tb2RlbHMvZmQtZGF0ZXRpbWUnO1xuXG4vKipcbiAqIFRoZSBkYXRldGltZSBwaWNrZXIgY29tcG9uZW50IGlzIGFuIG9waW5pb25hdGVkIGNvbXBvc2l0aW9uIG9mIHRoZSBmZC1wb3BvdmVyLFxuICogZmQtY2FsZW5kYXIgYW5kIGZkLXRpbWUgY29tcG9uZW50cyB0byBhY2NvbXBsaXNoIHRoZSBVSSBwYXR0ZXJuIGZvciBwaWNraW5nIGEgZGF0ZSBhbmQgdGltZS5cbiAqIFN1cHBvcnRzIEFuZ3VsYXIgRm9ybXMuXG4gKiBgYGBodG1sXG4gKiA8ZmQtZGF0ZS10aW1lLXBpY2tlciBbKG5nTW9kZWwpXT1cImRhdGVUaW1lXCI+PC9mZC1kYXRlLXRpbWUtcGlja2VyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtZGF0ZXRpbWUtcGlja2VyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGF0ZXRpbWUtcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kYXRldGltZS1waWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgICcoYmx1ciknOiAnb25Ub3VjaGVkKCknLFxuICAgICAgICAnW2NsYXNzLmZkLWRhdGV0aW1lLWhvc3RdJzogJ3RydWUnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBEYXRldGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRGF0ZXRpbWVQaWNrZXJDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBEYXRldGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgVmFsaWRhdG9yIHtcblxuICAgIC8qKiBAaGlkZGVuIFJlZmVyZW5jZSB0byB0aGUgaW5uZXIgdGltZSBjb21wb25lbnQuICovXG4gICAgQFZpZXdDaGlsZChUaW1lQ29tcG9uZW50KVxuICAgIHRpbWVDb21wb25lbnQ6IFRpbWVDb21wb25lbnQ7XG5cbiAgICAvKiogQGhpZGRlbiBSZWZlcmVuY2UgdG8gdGhlIGlubmVyIGNhbGVuZGFyIGNvbXBvbmVudC4gKi9cbiAgICBAVmlld0NoaWxkKENhbGVuZGFyQ29tcG9uZW50KVxuICAgIGNhbGVuZGFyQ29tcG9uZW50OiBDYWxlbmRhckNvbXBvbmVudDtcblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW4gRGF0ZSBvZiB0aGUgaW5wdXQgZmllbGQuIEludGVybmFsIHVzZS5cbiAgICAgKiBGb3IgcHJvZ3JhbW1hdGljIHNlbGVjdGlvbiwgdXNlIHR3by13YXkgYmluZGluZyBvbiB0aGUgZGF0ZSBpbnB1dC5cbiAgICAgKi9cbiAgICBpbnB1dEZpZWxkRGF0ZTogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKiBAaGlkZGVuIFRoZSBUaW1lIG9iamVjdCB3aGljaCBpbnRlcmFjdHMgd2l0aCB0aGUgaW5uZXIgVGltZSBjb21wb25lbnQuIEludGVybmFsIHVzZS4gKi9cbiAgICBpc0ludmFsaWREYXRlSW5wdXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuIFRoZSBUaW1lIG9iamVjdCB3aGljaCBpbnRlcmFjdHMgd2l0aCB0aGUgaW5uZXIgVGltZSBjb21wb25lbnQuIEludGVybmFsIHVzZS4gKi9cbiAgICB0aW1lOiBUaW1lT2JqZWN0ID0geyBob3VyOiAwLCBtaW51dGU6IDAsIHNlY29uZDogMCB9O1xuXG4gICAgLyoqIEBoaWRkZW4gVGhlIENhbGVuZGFyRGF5IG9iamVjdCB3aGljaCBpbnRlcmFjdHMgd2l0aCB0aGUgaW5uZXIgQ2FsZW5kYXIgY29tcG9uZW50LiBJbnRlcm5hbCB1c2UuICovXG4gICAgc2VsZWN0ZWREYXRlOiBGZERhdGU7XG5cbiAgICAvKiogU3Vic2NyaXB0aW9uIG9mIHRoZSBkYXRlRnJvbUlucHV0LiAqL1xuICAgIHByaXZhdGUgZGF0ZUZyb21JbnB1dFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIGZvciB0aGUgaW5uZXIgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnbW0vZGQveXl5eSwgaGg6bW06c3MgYW0nO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgaW4gY29tcGFjdCBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogIFRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcG92ZXIuIEl0IGNhbiBiZSBvbmUgb2Y6IHRvcCwgdG9wLXN0YXJ0LCB0b3AtZW5kLCBib3R0b20sXG4gICAgICogIGJvdHRvbS1zdGFydCwgYm90dG9tLWVuZCwgcmlnaHQsIHJpZ2h0LXN0YXJ0LCByaWdodC1lbmQsIGxlZnQsIGxlZnQtc3RhcnQsIGxlZnQtZW5kLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBQbGFjZW1lbnQgPSAnYm90dG9tLXN0YXJ0JztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0aW1lIGNvbXBvbmVudCBzaG91bGQgYmUgbWVyaWRpYW4gKGFtL3BtKS4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1lcmlkaWFuOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBjb21wb25lbnQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0aW1lIGNvbXBvbmVudCBzaG93cyBzcGlubmVycyBmb3IgY2hhbmdpbmcgdGhlIHRpbWUuICovXG4gICAgQElucHV0KClcbiAgICBzcGlubmVyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGltZSBjb21wb25lbnQgc2hvd3Mgc2Vjb25kcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0aW1lIGNvbXBvbmVudCBzaG93cyBtaW51dGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheU1pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRpbWUgY29tcG9uZW50IHNob3dzIGhvdXJzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUhvdXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRvIHBlcmZvcm0gdmlzdWFsIHZhbGlkYXRpb24gb24gdGhlIHBpY2tlciBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHVzZVZhbGlkYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEN1cnJlbnQgc2VsZWN0ZWQgZGF0ZS4gVHdvLXdheSBiaW5kaW5nIGlzIHN1cHBvcnRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRhdGU6IEZkRGF0ZXRpbWUgPSBGZERhdGV0aW1lLmdldFRvZGF5KCk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBpcyBvcGVuLiBUd28td2F5IGJpbmRpbmcgaXMgc3VwcG9ydGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVGhlIGRpc2FibGVGdW5jdGlvbiBmb3IgdGhlIGNhbGVuZGFyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhcnRpbmdEYXlPZldlZWs6IERheXNPZldlZWsgPSAxO1xuXG4gICAgLyoqIEFjdHVhbGx5IHNob3duIGFjdGl2ZSB2aWV3IG9uZSBvZiAnZGF5JyB8ICdtb250aCcgfCAneWVhcicgaW4gY2FsZW5kYXIgY29tcG9uZW50Ki9cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBhY3RpdmVWaWV3OiBGZENhbGVuZGFyVmlldyA9ICdkYXknO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSBkYXRldGltZSBwaWNrZXIgaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBkYXRldGltZUlucHV0TGFiZWw6IHN0cmluZyA9ICdEYXRldGltZSBpbnB1dCc7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGJ1dHRvbiB0byBzaG93L2hpZGUgdGhlIGNhbGVuZGFyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheURhdGV0aW1lVG9nZ2xlTGFiZWw6IHN0cmluZyA9ICdEaXNwbGF5IGNhbGVuZGFyIHRvZ2dsZSc7XG5cbiAgICAvKiogV2hldGhlciBhIG51bGwgaW5wdXQgaXMgY29uc2lkZXJlZCB2YWxpZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFsbG93TnVsbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRXZlbnQgdGhyb3duIGV2ZXJ5IHRpbWUgY2FsZW5kYXIgYWN0aXZlIHZpZXcgaXMgY2hhbmdlZCAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyByZWFkb25seSBhY3RpdmVWaWV3Q2hhbmdlOiBFdmVudEVtaXR0ZXI8RmRDYWxlbmRhclZpZXc+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZENhbGVuZGFyVmlldz4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGRhdGUgY2hhbmdlcy4gVGhpcyBjYW4gYmUgYSB0aW1lIG9yIGRheSBjaGFuZ2UuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgZGF0ZUNoYW5nZTogRXZlbnRFbWl0dGVyPEZkRGF0ZXRpbWU+ID0gbmV3IEV2ZW50RW1pdHRlcjxGZERhdGV0aW1lPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgZGF5IGNoYW5nZXMgZnJvbSB0aGUgY2FsZW5kYXIuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgY2FsZW5kYXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxGZERhdGV0aW1lPiA9IG5ldyBFdmVudEVtaXR0ZXI8RmREYXRldGltZT4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHRpbWUgY2hhbmdlcyBmcm9tIHRoZSB0aW1lIGNvbXBvbmVudC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSB0aW1lQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmREYXRldGltZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZkRGF0ZXRpbWU+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHBvcG92ZXIgY2xvc2VzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9IChzZWxlY3RlZDogYW55KSA9PiB7XG4gICAgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gZGlzYWJsZSBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhci5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZUZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGRpc2FibGUgY2VydGFpbiBkYXRlcyBpbiB0aGUgY2FsZW5kYXIgZm9yIHRoZSByYW5nZSBzdGFydCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVSYW5nZVN0YXJ0RnVuY3Rpb24gPSBmdW5jdGlvbihmZERhdGU6IEZkRGF0ZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gZGlzYWJsZSBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIGVuZCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVSYW5nZUVuZEZ1bmN0aW9uID0gZnVuY3Rpb24oZmREYXRlOiBGZERhdGUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB1c2VkIHRvIGJsb2NrIGNlcnRhaW4gZGF0ZXMgaW4gdGhlIGNhbGVuZGFyIGZvciB0aGUgcmFuZ2Ugc3RhcnQgc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBmZERhdGUgRmREYXRlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBibG9ja1JhbmdlU3RhcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBibG9jayBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhciBmb3IgdGhlIHJhbmdlIGVuZCBzZWxlY3Rpb24uXG4gICAgICogQHBhcmFtIGZkRGF0ZSBGZERhdGVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGJsb2NrUmFuZ2VFbmRGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byBibG9jayBjZXJ0YWluIGRhdGVzIGluIHRoZSBjYWxlbmRhci5cbiAgICAgKiBAcGFyYW0gZmREYXRlIEZkRGF0ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgYmxvY2tGdW5jdGlvbiA9IGZ1bmN0aW9uKGZkRGF0ZTogRmREYXRlKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEZ1bmN0aW9uIHRoYXQgaW1wbGVtZW50cyBWYWxpZGF0b3IgSW50ZXJmYWNlLCBhZGRzIHZhbGlkYXRpb24gc3VwcG9ydCBmb3IgZm9ybXNcbiAgICAgKi9cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7XG4gICAgICAgIFtrZXk6IHN0cmluZ106IGFueVxuICAgIH0ge1xuICAgICAgICByZXR1cm4gdGhpcy5pc01vZGVsVmFsaWQoKSA/IG51bGwgOiB7XG4gICAgICAgICAgICBkYXRlVmFsaWRhdGlvbjoge1xuICAgICAgICAgICAgICAgIHZhbGlkOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBwb3BvdmVyLiAqL1xuICAgIHRvZ2dsZVBvcG92ZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVBvcG92ZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlblBvcG92ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0aGF0IGhhbmRsZSBjYWxlbmRhciBhY3RpdmUgdmlldyBjaGFuZ2UgYW5kIHRocm93cyBldmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlQ2FsZW5kYXJBY3RpdmVWaWV3Q2hhbmdlKGFjdGl2ZVZpZXc6IEZkQ2FsZW5kYXJWaWV3KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlVmlld0NoYW5nZS5lbWl0KGFjdGl2ZVZpZXcpO1xuICAgIH1cblxuICAgIC8qKiBPcGVucyB0aGUgcG9wb3Zlci4gKi9cbiAgICBvcGVuUG9wb3ZlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3BlbiAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIHBvcG92ZXIgYW5kIHJlZnJlc2ggbW9kZWwgKi9cbiAgICBjbG9zZVBvcG92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVJbnB1dENoYW5nZSh0aGlzLmlucHV0RmllbGREYXRlKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZS5lbWl0KCk7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpc0ludmFsaWREYXRlSW5wdXRIYW5kbGVyKGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSBlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6a2V5ZG93bi5lc2NhcGUnLCBbXSlcbiAgICBvbkVzY2FwZUtleWRvd25IYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsb3NlUG9wb3ZlcigpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIHB1YmxpYyBvbkdsb2JhbENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2VQb3BvdmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kYXRlICYmIHRoaXMuaW5wdXRGaWVsZERhdGUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gdGhpcy5kYXRlLmRhdGU7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLmRhdGUudGltZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRhdGVGcm9tSW5wdXRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZGF0ZUZyb21JbnB1dFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2hhbmdlRGV0UmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBwdWJsaWMgZGF0ZVRpbWVBZGFwdGVyOiBEYXRlVGltZUZvcm1hdFBhcnNlclxuICAgICkge1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHNlbGVjdGVkOiBhbnkpID0+IHsgdm9pZCB9KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRnVuY3Rpb24gdGhhdCBwcm92aWRlcyBzdXBwb3J0IGZvciBDb250cm9sVmFsdWVBY2Nlc3NvciB0aGF0IGFsbG93cyB0byB1c2UgWyhuZ01vZGVsKV0gb3IgZm9ybXNcbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHNlbGVjdGVkOiBGZERhdGV0aW1lKTogdm9pZCB7XG4gICAgICAgIGlmICghc2VsZWN0ZWQgfHwgIShzZWxlY3RlZCBpbnN0YW5jZW9mIEZkRGF0ZXRpbWUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBzZWxlY3RlZC5kYXRlO1xuICAgICAgICB0aGlzLnRpbWUgPSBzZWxlY3RlZC50aW1lO1xuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRmREYXRldGltZSh0aGlzLnNlbGVjdGVkRGF0ZSwgdGhpcy50aW1lKTtcbiAgICAgICAgaWYgKHRoaXMuaXNNb2RlbFZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuc2V0Q3VycmVudGx5RGlzcGxheWVkKHRoaXMuZGF0ZS5kYXRlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5wdXQodGhpcy5kYXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBNZXRob2QgdGhhdCBpcyB0cmlnZ2VyZWQgYnkgZXZlbnRzIGZyb20gY2FsZW5kYXIgY29tcG9uZW50LCB3aGVuIHRoZXJlIGlzIHNlbGVjdGVkIGRhdGUgY2hhbmdlZC5cbiAgICAgKiBJZiBpbnZhbGlkIHRpbWUgbW9kZWwgaXMgZGV0ZWN0ZWQsIGl0IHRha2VzIHRpbWUgbW9kZWwgZGF0YSBmcm9tIFRpbWVDb21wb25lbnQuXG4gICAgICovXG4gICAgaGFuZGxlRGF0ZUNoYW5nZShkYXRlOiBGZERhdGUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBkYXRlO1xuICAgICAgICBpZiAoIXRoaXMuZGF0ZS5pc1RpbWVWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUgPSB0aGlzLnRpbWVDb21wb25lbnQudGltZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRmREYXRldGltZSh0aGlzLnNlbGVjdGVkRGF0ZSwgdGhpcy50aW1lKTtcbiAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSAhdGhpcy5pc01vZGVsVmFsaWQoKTtcbiAgICAgICAgdGhpcy5zZXRJbnB1dCh0aGlzLmRhdGUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIE1ldGhvZCB0aGF0IGlzIHRyaWdnZXJlZCBieSBldmVudHMgZnJvbSB0aW1lIGNvbXBvbmVudCwgd2hlbiB0aGVyZSBpcyBzZWxlY3RlZCB0aW1lIGNoYW5nZWRcbiAgICAgKi9cbiAgICBoYW5kbGVUaW1lQ2hhbmdlKHRpbWU6IFRpbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkRGF0ZSB8fCAhdGhpcy5zZWxlY3RlZERhdGUuaXNEYXRlVmFsaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBGZERhdGUuZ2V0VG9kYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGUgPSBuZXcgRmREYXRldGltZSh0aGlzLnNlbGVjdGVkRGF0ZSwgdGhpcy50aW1lKTtcbiAgICAgICAgdGhpcy5pc0ludmFsaWREYXRlSW5wdXQgPSAhdGhpcy5pc01vZGVsVmFsaWQoKTtcbiAgICAgICAgdGhpcy5zZXRJbnB1dCh0aGlzLmRhdGUpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBmb2N1c0Fycm93TGVmdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuaWQgKyAnLWxlZnQtYXJyb3cnKSkge1xuICAgICAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5pZCArICctbGVmdC1hcnJvdycpLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogTWV0aG9kLCB3aGljaCBpcyByZXNwb25zaWJsZSBmb3IgdHJhbnNmb3JtaW5nIHN0cmluZyB0byBkYXRldGltZSwgZGVwZW5kaW5nIG9uIHR5cGUgb3JcbiAgICAgKiB2YWxpZGF0aW9uIHRoZSByZXN1bHRzIGFyZSBkaWZmZXJlbnQuIEl0IGFsc28gY2hhbmdlcyB0byBzdGF0ZSBvZiBpc0ludmFsaWREYXRlSW5wdXQuXG4gICAgICovXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UoZGF0ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZkVGltZURhdGUgPSB0aGlzLmRhdGVUaW1lQWRhcHRlci5wYXJzZShkYXRlKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBmZFRpbWVEYXRlLmRhdGU7XG4gICAgICAgIHRoaXMudGltZSA9IGZkVGltZURhdGUudGltZTtcbiAgICAgICAgdGhpcy5kYXRlID0gbmV3IEZkRGF0ZXRpbWUodGhpcy5zZWxlY3RlZERhdGUsIHRoaXMudGltZSk7XG4gICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gIXRoaXMuaXNNb2RlbFZhbGlkKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UoZmRUaW1lRGF0ZSk7XG4gICAgICAgIGlmICghdGhpcy5pc0ludmFsaWREYXRlSW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXJDb21wb25lbnQuc2V0Q3VycmVudGx5RGlzcGxheWVkKGZkVGltZURhdGUuZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkYXRlICYmIHRoaXMuYWxsb3dOdWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW52YWxpZERhdGVJbnB1dCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kYXRlID0gRmREYXRldGltZS5nZXRUb2RheSgpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSB0aGlzLmRhdGUuZGF0ZTtcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRoaXMuZGF0ZS50aW1lO1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhckNvbXBvbmVudC5zZXRDdXJyZW50bHlEaXNwbGF5ZWQodGhpcy5kYXRlLmRhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5hbGxvd051bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNJbnZhbGlkRGF0ZUlucHV0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBwcm92aWRlcyBpbmZvcm1hdGlvbiBpZiBtb2RlbCBzZWxlY3RlZCBkYXRlL2RhdGVzIGhhdmUgcHJvcGVybHkgdHlwZXMgYW5kIGFyZSB2YWxpZCAqL1xuICAgIHB1YmxpYyBpc01vZGVsVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGUgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZSBpbnN0YW5jZW9mIEZkRGF0ZXRpbWUgJiZcbiAgICAgICAgICAgIHRoaXMuZGF0ZS5pc0RhdGVWYWxpZCgpICYmIHRoaXMuZGF0ZS5pc1RpbWVWYWxpZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0SW5wdXQoZmREYXRlVGltZTogRmREYXRldGltZSk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0RmllbGREYXRlID0gdGhpcy5kYXRlVGltZUFkYXB0ZXIuZm9ybWF0KGZkRGF0ZVRpbWUpO1xuICAgICAgICB0aGlzLmNoYW5nZURldFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuXG59XG4iXX0=