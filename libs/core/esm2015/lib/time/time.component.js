/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { TimeObject } from './time-object';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeI18nLabels } from './i18n/time-i18n-labels';
import { TimeI18n } from './i18n/time-i18n';
export class TimeComponent {
    /**
     * @param {?} timeI18nLabels
     * @param {?} timeI18n
     */
    constructor(timeI18nLabels, timeI18n) {
        this.timeI18nLabels = timeI18nLabels;
        this.timeI18n = timeI18n;
        /**
         * \@Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
         * and does not display a period control.
         */
        this.meridian = false;
        /**
         * \@Input When set to false, does not set the input field to invalid state on invalid entry.
         */
        this.validate = true;
        /**
         * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
         */
        this.spinners = true;
        /**
         * \@Input When set to false, hides the input for seconds.
         */
        this.displaySeconds = true;
        /**
         * \@Input When set to false, hides the input for minutes.
         */
        this.displayMinutes = true;
        /**
         * When set to false, hides the input for hours
         */
        this.displayHours = true;
        /**
         * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
         * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
         *
         * ```json
         * { hour: 12, minute: 0, second: 0 }
         * ```
         */
        this.time = { hour: 0, minute: 0, second: 0 };
        /**
         * @hidden
         */
        this.focusArrowLeft = new EventEmitter();
        /**
         * @hidden
         * Variable that is displayed as an hour.
         * For meridian mode ranging from 0 to 12,
         * For non-meridian mode ranging from 0 to 23, and reflects the hour value
         */
        this.displayedHour = 0;
        /**
         * @hidden
         */
        this.onChange = (/**
         * @param {?} time
         * @return {?}
         */
        (time) => {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => {
        });
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
     * @param {?} time
     * @return {?}
     */
    writeValue(time) {
        if (!time) {
            return;
        }
        this.time = time;
        this.setDisplayedHour();
    }
    /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
        }
    }
    /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    setDisplayedHour() {
        if (!this.meridian) {
            this.displayedHour = this.time.hour;
        }
        else if (this.time.hour === 0) {
            this.displayedHour = 12;
            this.period = this.timeI18n.meridianAm;
        }
        else if (this.time.hour > 12) {
            this.displayedHour = this.time.hour - 12;
            this.period = this.timeI18n.meridianPm;
        }
        else if (this.time.hour === 12) {
            this.displayedHour = 12;
            this.period = this.timeI18n.meridianPm;
        }
        else {
            this.displayedHour = this.time.hour;
            this.period = this.timeI18n.meridianAm;
        }
    }
    /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    displayedHourChanged() {
        if (!this.meridian) {
            this.time.hour = this.displayedHour;
        }
        else {
            if (this.period === this.timeI18n.meridianAm) {
                if (this.displayedHour === 12) {
                    this.time.hour = 0;
                }
                else {
                    this.time.hour = this.displayedHour;
                }
            }
            else if (this.period === this.timeI18n.meridianPm) {
                if (this.displayedHour === 12) {
                    this.time.hour = this.displayedHour;
                }
                else {
                    this.time.hour = this.displayedHour + 12;
                }
            }
        }
        this.onChange(this.time);
    }
    /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    inputBlur(inputType) {
        switch (inputType) {
            case 'hour': {
                this.displayedHour = Math.round(Math.abs(this.displayedHour)) % 24;
                this.time.hour = this.displayedHour;
                if (this.meridian) {
                    if (this.displayedHour > 12) {
                        this.period = this.timeI18n.meridianPm;
                        this.displayedHour = this.displayedHour !== 12 ? this.displayedHour % 12 : this.displayedHour;
                    }
                    else if (this.displayedHour === 0) {
                        this.displayedHour = 12;
                        this.period = this.timeI18n.meridianAm;
                    }
                    else if (this.isAm(this.period) && this.displayedHour === 12) {
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
                    (!this.isPm(this.period) && !this.isAm(this.period))) {
                    this.setDisplayedHour();
                }
            }
        }
        this.onChange(this.time);
    }
    /**
     * Increases the hour value by one.
     * @return {?}
     */
    increaseHour() {
        if (this.time.hour === null) {
            this.time.hour = 0;
        }
        else if (this.time.hour === 23) {
            this.time.hour = 0;
        }
        else {
            this.time.hour = this.time.hour + 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    }
    /**
     * Decreases the hour value by one.
     * @return {?}
     */
    decreaseHour() {
        if (this.time.hour === null) {
            this.time.hour = 0;
        }
        else if (this.time.hour === 0) {
            this.time.hour = 23;
        }
        else {
            this.time.hour = this.time.hour - 1;
        }
        this.setDisplayedHour();
        this.onChange(this.time);
    }
    /**
     * Increases the minute value by one.
     * @return {?}
     */
    increaseMinute() {
        if (this.time.minute === null) {
            this.time.minute = 0;
        }
        else if (this.time.minute === 59) {
            this.time.minute = 0;
            this.increaseHour();
        }
        else {
            this.time.minute = this.time.minute + 1;
        }
        this.onChange(this.time);
    }
    /**
     * Decreases the minute value by one.
     * @return {?}
     */
    decreaseMinute() {
        if (this.time.minute === null) {
            this.time.minute = 0;
        }
        else if (this.time.minute === 0) {
            this.time.minute = 59;
            this.decreaseHour();
        }
        else {
            this.time.minute = this.time.minute - 1;
        }
        this.onChange(this.time);
    }
    /**
     * Increases the second value by one.
     * @return {?}
     */
    increaseSecond() {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            }
            else if (this.time.second === 59) {
                this.time.second = 0;
                this.increaseMinute();
            }
            else {
                this.time.second = this.time.second + 1;
            }
        }
        this.onChange(this.time);
    }
    /**
     * Decreases the second value by one.
     * @return {?}
     */
    decreaseSecond() {
        if (this.displaySeconds) {
            if (this.time.second === null) {
                this.time.second = 0;
            }
            else if (this.time.second === 0) {
                this.time.second = 59;
                this.decreaseMinute();
            }
            else {
                this.time.second = this.time.second - 1;
            }
        }
        this.onChange(this.time);
    }
    /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    togglePeriod() {
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isAm(this.period)) {
                this.period = this.timeI18n.meridianPm;
                this.periodModelChange();
            }
            else if (this.isPm(this.period)) {
                this.period = this.timeI18n.meridianAm;
                this.periodModelChange();
            }
        }
    }
    /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    minuteModelChange() {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }
    /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    secondModelChange() {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    }
    /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    periodModelChange() {
        if (this.time && !this.time.hour) {
            this.time.hour = 0;
        }
        if (this.time.hour < 24 && this.time.hour >= 0) {
            if (this.isPm(this.period) && this.time.hour < 12) {
                this.time.hour = this.time.hour + 12;
            }
            else if (this.time.hour >= 12 && this.isAm(this.period)) {
                this.time.hour = this.time.hour - 12;
            }
            this.onChange(this.time);
        }
    }
    /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    lastButtonKeydown(event) {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    }
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    isPm(period) {
        /** @type {?} */
        const pmMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianPm : this.timeI18n.meridianPm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === pmMeridian;
    }
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    isAm(period) {
        /** @type {?} */
        const amMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianAm : this.timeI18n.meridianAm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === amMeridian;
    }
}
TimeComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-time',
                template: "<div *ngIf=\"displayHours\"\n    class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseHour()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseHoursLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"displayedHour\"\n               fd-only-digits\n               [ngClass]=\"{\n                'is-disabled': disabled,\n                'is-invalid': ((displayedHour > 24 || displayedHour < 0) && validate)\n               }\"\n               (ngModelChange)=\"displayedHourChanged()\"\n               (blur)=\"inputBlur('hour')\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.hoursPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.hoursLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseHour()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseHoursLabel\"></button>\n    </div>\n</div>\n\n<div *ngIf=\"displayMinutes\"\n    class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseMinute()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseMinutesLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"time.minute\"\n               fd-only-digits\n               (ngModelChange)=\"minuteModelChange()\"\n               (blur)=\"inputBlur('minute')\"\n               [ngClass]=\"{'is-disabled': disabled, 'is-invalid': ((time.minute > 59 || time.minute < 0) && validate)}\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.minutesPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.minutesLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseMinute()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseMinutesLabel\"></button>\n    </div>\n</div>\n<div *ngIf=\"displaySeconds\"\n     class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"increaseSecond()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increaseSecondsLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"time.second\"\n               fd-only-digits\n               (ngModelChange)=\"secondModelChange()\"\n               (blur)=\"inputBlur('second')\"\n               [ngClass]=\"{'is-disabled': disabled, 'is-invalid': ((time.second > 59 || time.second < 0) && validate)}\"\n               class=\"fd-form__control\"\n               type=\"number\"\n               placeholder=\"{{timeI18n?.secondsPlaceholder}}\"\n               (keydown)=\"!meridian && !spinners ? lastButtonKeydown($event) : ''\"\n               [attr.aria-label]=\"timeI18nLabels?.secondsLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"decreaseSecond()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreaseSecondsLabel\"\n                (keydown)=\"!meridian ? lastButtonKeydown($event) : ''\"></button>\n    </div>\n</div>\n<div *ngIf=\"meridian\"\n     class=\"fd-time__item\">\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"togglePeriod()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-up-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.increasePeriodLabel\"></button>\n    </div>\n    <div class=\"fd-time__input\">\n        <input [(ngModel)]=\"period\"\n               [ngClass]=\"{'is-disabled': disabled}\"\n               class=\"fd-form__control\"\n               (blur)=\"inputBlur('period')\"\n               (ngModelChange)=\"periodModelChange()\"\n               type=\"text\"\n               placeholder=\"{{timeI18n?.meridianPlaceholder}}\"\n               [attr.aria-label]=\"timeI18nLabels?.periodLabel\"/>\n    </div>\n    <div class=\"fd-time__control\">\n        <button *ngIf=\"spinners\"\n                [ngClass]=\"{'is-disabled': disabled}\"\n                (click)=\"togglePeriod()\"\n                type=\"button\"\n                class=\" fd-button--light fd-button--xs sap-icon--navigation-down-arrow\"\n                [attr.aria-label]=\"timeI18nLabels?.decreasePeriodLabel\"\n                (keydown)=\"lastButtonKeydown($event)\"></button>\n    </div>\n</div>\n",
                host: {
                    '(blur)': 'onTouched()',
                    class: 'fd-time fd-has-display-block'
                },
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => TimeComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"]
            }] }
];
/** @nocollapse */
TimeComponent.ctorParameters = () => [
    { type: TimeI18nLabels },
    { type: TimeI18n }
];
TimeComponent.propDecorators = {
    meridian: [{ type: Input }],
    validate: [{ type: Input }],
    disabled: [{ type: Input }],
    spinners: [{ type: Input }],
    displaySeconds: [{ type: Input }],
    displayMinutes: [{ type: Input }],
    displayHours: [{ type: Input }],
    time: [{ type: Input }],
    focusArrowLeft: [{ type: Output }]
};
if (false) {
    /**
     * \@Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control.
     * @type {?}
     */
    TimeComponent.prototype.meridian;
    /**
     * \@Input When set to false, does not set the input field to invalid state on invalid entry.
     * @type {?}
     */
    TimeComponent.prototype.validate;
    /**
     * \@Input Disables the component.
     * @type {?}
     */
    TimeComponent.prototype.disabled;
    /**
     * \@Input When set to false, hides the buttons that increment and decrement the corresponding input.
     * @type {?}
     */
    TimeComponent.prototype.spinners;
    /**
     * \@Input When set to false, hides the input for seconds.
     * @type {?}
     */
    TimeComponent.prototype.displaySeconds;
    /**
     * \@Input When set to false, hides the input for minutes.
     * @type {?}
     */
    TimeComponent.prototype.displayMinutes;
    /**
     * When set to false, hides the input for hours
     * @type {?}
     */
    TimeComponent.prototype.displayHours;
    /**
     * \@Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     * @type {?}
     */
    TimeComponent.prototype.time;
    /**
     * @hidden
     * @type {?}
     */
    TimeComponent.prototype.focusArrowLeft;
    /**
     * @hidden
     * Used only in meridian mode. Stores information the current am/pm state.
     * @type {?}
     */
    TimeComponent.prototype.period;
    /**
     * @hidden
     * Variable that is displayed as an hour.
     * For meridian mode ranging from 0 to 12,
     * For non-meridian mode ranging from 0 to 23, and reflects the hour value
     * @type {?}
     */
    TimeComponent.prototype.displayedHour;
    /**
     * @hidden
     * @type {?}
     */
    TimeComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    TimeComponent.prototype.onTouched;
    /** @type {?} */
    TimeComponent.prototype.timeI18nLabels;
    /** @type {?} */
    TimeComponent.prototype.timeI18n;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGltZS90aW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFtQjVDLE1BQU0sT0FBTyxhQUFhOzs7OztJQXdGdEIsWUFDVyxjQUE4QixFQUM5QixRQUFrQjtRQURsQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTs7Ozs7UUFwRnBCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFLMUIsYUFBUSxHQUFZLElBQUksQ0FBQzs7OztRQVV6QixhQUFRLEdBQVksSUFBSSxDQUFDOzs7O1FBS3pCLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBSXhDLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBTS9CLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7Ozs7Ozs7UUFXN0IsU0FBSSxHQUFlLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7OztRQUk1QyxtQkFBYyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDOzs7Ozs7O1FBWXZFLGtCQUFhLEdBQVcsQ0FBQyxDQUFDOzs7O1FBRzFCLGFBQVE7Ozs7UUFBRyxDQUFD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QUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDbkYsT0FBTyxNQUFNLEtBQUssVUFBVSxDQUFDO0lBQ2pDLENBQUM7OztZQXhYSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLDZ0TEFBb0M7Z0JBRXBDLElBQUksRUFBRTtvQkFDRixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsS0FBSyxFQUFFLDhCQUE4QjtpQkFDeEM7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFDO3dCQUM1QyxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7WUFuQlEsY0FBYztZQUNkLFFBQVE7Ozt1QkF5QlosS0FBSzt1QkFLTCxLQUFLO3VCQUtMLEtBQUs7dUJBS0wsS0FBSzs2QkFLTCxLQUFLOzZCQUdMLEtBQUs7MkJBTUwsS0FBSzttQkFXTCxLQUFLOzZCQUlMLE1BQU07Ozs7Ozs7O0lBNUNQLGlDQUFtQzs7Ozs7SUFLbkMsaUNBQWtDOzs7OztJQUtsQyxpQ0FBMkI7Ozs7O0lBSzNCLGlDQUFrQzs7Ozs7SUFLbEMsdUNBQXdDOzs7OztJQUd4Qyx1Q0FDK0I7Ozs7O0lBSy9CLHFDQUM2Qjs7Ozs7Ozs7OztJQVU3Qiw2QkFDcUQ7Ozs7O0lBR3JELHVDQUN1RTs7Ozs7O0lBS3ZFLCtCQUFlOzs7Ozs7OztJQU9mLHNDQUEwQjs7Ozs7SUFHMUIsaUNBQ0U7Ozs7O0lBR0Ysa0NBQ0U7O0lBa0JFLHVDQUFxQzs7SUFDckMsaUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRpbWVPYmplY3QgfSBmcm9tICcuL3RpbWUtb2JqZWN0JztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFRpbWVJMThuTGFiZWxzIH0gZnJvbSAnLi9pMThuL3RpbWUtaTE4bi1sYWJlbHMnO1xuaW1wb3J0IHsgVGltZUkxOG4gfSBmcm9tICcuL2kxOG4vdGltZS1pMThuJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10aW1lJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGltZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGltZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgIGNsYXNzOiAnZmQtdGltZSBmZC1oYXMtZGlzcGxheS1ibG9jaydcbiAgICB9LFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUaW1lQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICAvKipcbiAgICAgKiBASW5wdXQgV2hlbiBzZXQgdG8gZmFsc2UsIHVzZXMgdGhlIDI0IGhvdXIgY2xvY2sgKGhvdXJzIHJhbmdpbmcgZnJvbSAwIHRvIDIzKVxuICAgICAqIGFuZCBkb2VzIG5vdCBkaXNwbGF5IGEgcGVyaW9kIGNvbnRyb2wuXG4gICAgICovXG4gICAgQElucHV0KCkgbWVyaWRpYW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqICBASW5wdXQgV2hlbiBzZXQgdG8gZmFsc2UsIGRvZXMgbm90IHNldCB0aGUgaW5wdXQgZmllbGQgdG8gaW52YWxpZCBzdGF0ZSBvbiBpbnZhbGlkIGVudHJ5LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHZhbGlkYXRlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBJbnB1dCBEaXNhYmxlcyB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgYnV0dG9ucyB0aGF0IGluY3JlbWVudCBhbmQgZGVjcmVtZW50IHRoZSBjb3JyZXNwb25kaW5nIGlucHV0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNwaW5uZXJzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgaGlkZXMgdGhlIGlucHV0IGZvciBzZWNvbmRzLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGRpc3BsYXlTZWNvbmRzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBASW5wdXQgV2hlbiBzZXQgdG8gZmFsc2UsIGhpZGVzIHRoZSBpbnB1dCBmb3IgbWludXRlcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlNaW51dGVzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKlxuICAgICAqIFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgaW5wdXQgZm9yIGhvdXJzXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5SG91cnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQElucHV0IEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRocmVlIGludGVnZXIgcHJvcGVydGllczogJ2hvdXInIChyYW5naW5nIGZyb20gMCB0byAyMyksXG4gICAgICogJ21pbnV0ZScgKHJhbmdpbmcgZnJvbSAwIHRvIDU5KSwgYW5kICdzZWNvbmQnIChyYW5naW5nIGZyb20gMCB0byA1OSkuIFRoaXMgaXMgdGhlIG1vZGVsIHRoZSBjb21wb25lbnQgY29uc3VtZXMuIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc29uXG4gICAgICogeyBob3VyOiAxMiwgbWludXRlOiAwLCBzZWNvbmQ6IDAgfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGltZTogVGltZU9iamVjdCA9IHsgaG91cjogMCwgbWludXRlOiAwLCBzZWNvbmQ6IDAgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgZm9jdXNBcnJvd0xlZnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogVXNlZCBvbmx5IGluIG1lcmlkaWFuIG1vZGUuIFN0b3JlcyBpbmZvcm1hdGlvbiB0aGUgY3VycmVudCBhbS9wbSBzdGF0ZS5cbiAgICAgKi9cbiAgICBwZXJpb2Q6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogVmFyaWFibGUgdGhhdCBpcyBkaXNwbGF5ZWQgYXMgYW4gaG91ci5cbiAgICAgKiBGb3IgbWVyaWRpYW4gbW9kZSByYW5naW5nIGZyb20gMCB0byAxMixcbiAgICAgKiBGb3Igbm9uLW1lcmlkaWFuIG1vZGUgcmFuZ2luZyBmcm9tIDAgdG8gMjMsIGFuZCByZWZsZWN0cyB0aGUgaG91ciB2YWx1ZVxuICAgICAqL1xuICAgIGRpc3BsYXllZEhvdXI6IG51bWJlciA9IDA7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlID0gKHRpbWU6IFRpbWVPYmplY3QpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gICAgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHRpbWU6IFRpbWVPYmplY3QpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgdGltZUkxOG5MYWJlbHM6IFRpbWVJMThuTGFiZWxzLFxuICAgICAgICBwdWJsaWMgdGltZUkxOG46IFRpbWVJMThuXG4gICAgKSB7fVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHRpbWU6IFRpbWVPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgdGhpcy5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBSZWFjdHMgb25seSB3aGVuIHRoZXJlIGlzIG1lcmlkaWFuIG9yIHRpbWUgaW5wdXQgY2hhbmdlXG4gICAgICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAoY2hhbmdlcy5tZXJpZGlhbiB8fCBjaGFuZ2VzLnRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGlzcGxheWVkSG91cigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBDaGFuZ2VzIGRpc3BsYXllZCBob3VyIHZhbHVlLCB1c2VkIG1vc3RseSB3aGVuIHRoZSBtb2RlbCBob3VyIGlzIGNoYW5nZWRcbiAgICAgKi9cbiAgICBzZXREaXNwbGF5ZWRIb3VyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IHRoaXMudGltZS5ob3VyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5ob3VyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEhvdXIgPSAxMjtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkFtO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5ob3VyID4gMTIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IHRoaXMudGltZS5ob3VyIC0gMTI7XG4gICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5QbTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUuaG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IDEyO1xuICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuUG07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZEhvdXIgPSB0aGlzLnRpbWUuaG91cjtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkFtO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBIYW5kbGVzIGNoYW5nZXMgb2YgZGlzcGxheWVkIGhvdXIgdmFsdWUgZnJvbSB0ZW1wbGF0ZS5cbiAgICAgKi9cbiAgICBkaXNwbGF5ZWRIb3VyQ2hhbmdlZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm1lcmlkaWFuKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUuaG91ciA9IHRoaXMuZGlzcGxheWVkSG91cjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlcmlvZCA9PT0gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkFtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkSG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZXJpb2QgPT09IHRoaXMudGltZUkxOG4ubWVyaWRpYW5QbSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXllZEhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyICsgMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIEhhbmRsZXMgdGhlIGJsdXIgZXZlbnRzIGZyb20gaW5wdXRzLiBBbHNvIHJld3JpdGUgdmFsdWVzIGlmIHRoZXkgYXJlIGluY29ycmVjdCwgcHJldmVudHMgZnJvbSBuZWdhdGl2ZSBvciB0b28gYmlnXG4gICAgICogdmFsdWVzLiBBbHNvIGNoYW5nZXMgcGVyaW9kIGlmIGl0J3Mgb24gbWVyaWRpYW4gdHlwZSBhbmQgaG91ciBpcyBiaWdnZXIgdGhhbiAxMi5cbiAgICAgKi9cbiAgICBpbnB1dEJsdXIoaW5wdXRUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChpbnB1dFR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gTWF0aC5yb3VuZChNYXRoLmFicyh0aGlzLmRpc3BsYXllZEhvdXIpKSAlIDI0O1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkSG91ciA+IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5QbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IHRoaXMuZGlzcGxheWVkSG91ciAhPT0gMTIgPyB0aGlzLmRpc3BsYXllZEhvdXIgJSAxMiA6IHRoaXMuZGlzcGxheWVkSG91cjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRpc3BsYXllZEhvdXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IDEyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQW07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0FtKHRoaXMucGVyaW9kKSAmJiB0aGlzLmRpc3BsYXllZEhvdXIgPT09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWUuaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLm1pbnV0ZSA9IE1hdGguYWJzKE1hdGgucm91bmQodGhpcy50aW1lLm1pbnV0ZSkgJSA2MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOiB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLnNlY29uZCA9IE1hdGguYWJzKE1hdGgucm91bmQodGhpcy50aW1lLnNlY29uZCkgJSA2MCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICdwZXJpb2QnOiB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogV2hlbiB0aGVyZSBpcyBpbnZhbGlkIHBlcmlvZCwgZnVuY3Rpb24gY2hhbmdlcyBwZXJpb2QgdG8gdmFsaWQgYmFzaW5nIG9uIGFjdHVhbCBob3VyXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBlcmlvZCB8fFxuICAgICAgICAgICAgICAgICAgICAoIXRoaXMuaXNQbSh0aGlzLnBlcmlvZCkgJiYgIXRoaXMuaXNBbSh0aGlzLnBlcmlvZCkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGlzcGxheWVkSG91cigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIEluY3JlYXNlcyB0aGUgaG91ciB2YWx1ZSBieSBvbmUuICovXG4gICAgaW5jcmVhc2VIb3VyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lLmhvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUuaG91ciA9PT0gMjMpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy50aW1lLmhvdXIgKyAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGlzcGxheWVkSG91cigpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIERlY3JlYXNlcyB0aGUgaG91ciB2YWx1ZSBieSBvbmUuICovXG4gICAgZGVjcmVhc2VIb3VyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lLmhvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUuaG91ciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSAyMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy50aW1lLmhvdXIgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RGlzcGxheWVkSG91cigpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIEluY3JlYXNlcyB0aGUgbWludXRlIHZhbHVlIGJ5IG9uZS4gKi9cbiAgICBpbmNyZWFzZU1pbnV0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZS5taW51dGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5taW51dGUgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5taW51dGUgPT09IDU5KSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gMDtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VIb3VyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gdGhpcy50aW1lLm1pbnV0ZSArIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgIH1cblxuICAgIC8qKiBEZWNyZWFzZXMgdGhlIG1pbnV0ZSB2YWx1ZSBieSBvbmUuICovXG4gICAgZGVjcmVhc2VNaW51dGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUubWludXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUubWludXRlID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gNTk7XG4gICAgICAgICAgICB0aGlzLmRlY3JlYXNlSG91cigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lLm1pbnV0ZSA9IHRoaXMudGltZS5taW51dGUgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogSW5jcmVhc2VzIHRoZSBzZWNvbmQgdmFsdWUgYnkgb25lLiAqL1xuICAgIGluY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZS5zZWNvbmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLnNlY29uZCA9PT0gNTkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmluY3JlYXNlTWludXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zZWNvbmQgPSB0aGlzLnRpbWUuc2Vjb25kICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIERlY3JlYXNlcyB0aGUgc2Vjb25kIHZhbHVlIGJ5IG9uZS4gKi9cbiAgICBkZWNyZWFzZVNlY29uZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcGxheVNlY29uZHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRpbWUuc2Vjb25kID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLnNlY29uZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5zZWNvbmQgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gNTk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZU1pbnV0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gdGhpcy50aW1lLnNlY29uZCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBwZXJpb2QgKGFtL3BtKS4gKi9cbiAgICB0b2dnbGVQZXJpb2QoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUuaG91ciA8IDI0ICYmIHRoaXMudGltZS5ob3VyID49IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQW0odGhpcy5wZXJpb2QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuUG07XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJpb2RNb2RlbENoYW5nZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzUG0odGhpcy5wZXJpb2QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQW07XG4gICAgICAgICAgICAgICAgdGhpcy5wZXJpb2RNb2RlbENoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBIYW5kbGVzIG1pbnV0ZXMgbW9kZWwgY2hhbmdlIGZyb20gdGVtcGxhdGVcbiAgICAgKiAqL1xuICAgIG1pbnV0ZU1vZGVsQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLnRpbWUubWludXRlID4gNTkgfHwgdGhpcy50aW1lLm1pbnV0ZSA8IDApIHx8ICF0aGlzLnZhbGlkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIEhhbmRsZXMgc2Vjb25kcyBtb2RlbCBjaGFuZ2UgZnJvbSB0ZW1wbGF0ZVxuICAgICAqICovXG4gICAgc2Vjb25kTW9kZWxDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMudGltZS5zZWNvbmQgPiA1OSB8fCB0aGlzLnRpbWUuc2Vjb25kIDwgMCkgfHwgIXRoaXMudmFsaWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogSGFuZGxlcyBwZXJpb2QgbW9kZWwgY2hhbmdlLiBkZXBlbmRpbmcgb24gY3VycmVudCBob3VyIGFuZCBuZXcgcGVyaW9kIGNoYW5nZXMgaG91cnMgYnkgKy8tIDEyXG4gICAgICovXG4gICAgcGVyaW9kTW9kZWxDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUgJiYgIXRoaXMudGltZS5ob3VyKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUuaG91ciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudGltZS5ob3VyIDwgMjQgJiYgdGhpcy50aW1lLmhvdXIgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNQbSh0aGlzLnBlcmlvZCkgJiYgdGhpcy50aW1lLmhvdXIgPCAxMikge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy50aW1lLmhvdXIgKyAxMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLmhvdXIgPj0gMTIgJiYgdGhpcy5pc0FtKHRoaXMucGVyaW9kKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy50aW1lLmhvdXIgLSAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogSGFuZGxlcyBsYXN0IGJ1dHRvbiBrZXlib2FyZCBldmVudHNcbiAgICAgKi9cbiAgICBsYXN0QnV0dG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ1RhYicgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0Fycm93TGVmdC5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRGVmaW5lcyBpZiBwZXJpb2QgaXMgUE0sIENvbnNpZGVycyB0aGUgZmFjdCB0aGF0IHBlcmlvZCBzaG91bGQgYmUgY2FzZSBzZW5zaXRpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzUG0ocGVyaW9kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgcG1NZXJpZGlhbiA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5DYXNlU2Vuc2l0aXZlID8gdGhpcy50aW1lSTE4bi5tZXJpZGlhblBtIDogdGhpcy50aW1lSTE4bi5tZXJpZGlhblBtLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIHBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5DYXNlU2Vuc2l0aXZlID8gcGVyaW9kIDogcGVyaW9kLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBwZXJpb2QgPT09IHBtTWVyaWRpYW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIERlZmluZXMgaWYgcGVyaW9kIGlzIEFNLCBDb25zaWRlcnMgdGhlIGZhY3QgdGhhdCBwZXJpb2Qgc2hvdWxkIGJlIGNhc2Ugc2Vuc2l0aXZlXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc0FtKHBlcmlvZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGFtTWVyaWRpYW4gPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQ2FzZVNlbnNpdGl2ZSA/IHRoaXMudGltZUkxOG4ubWVyaWRpYW5BbSA6IHRoaXMudGltZUkxOG4ubWVyaWRpYW5BbS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICBwZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQ2FzZVNlbnNpdGl2ZSA/IHBlcmlvZCA6IHBlcmlvZC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gcGVyaW9kID09PSBhbU1lcmlkaWFuO1xuICAgIH1cbn1cbiJdfQ==