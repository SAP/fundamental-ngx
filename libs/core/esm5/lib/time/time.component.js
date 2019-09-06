/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { TimeObject } from './time-object';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeI18nLabels } from './i18n/time-i18n-labels';
import { TimeI18n } from './i18n/time-i18n';
var TimeComponent = /** @class */ (function () {
    function TimeComponent(timeI18nLabels, timeI18n) {
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
        function (time) {
        });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () {
        });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimeComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    TimeComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    TimeComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    TimeComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} time
     * @return {?}
     */
    function (time) {
        if (!time) {
            return;
        }
        this.time = time;
        this.setDisplayedHour();
    };
    /** @hidden
     * Reacts only when there is meridian or time input change
     */
    /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    TimeComponent.prototype.ngOnChanges = /**
     * @hidden
     * Reacts only when there is meridian or time input change
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.meridian || changes.time) {
            this.setDisplayedHour();
        }
    };
    /** @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     */
    /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    TimeComponent.prototype.setDisplayedHour = /**
     * @hidden
     * Changes displayed hour value, used mostly when the model hour is changed
     * @return {?}
     */
    function () {
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
    };
    /** @hidden
     * Handles changes of displayed hour value from template.
     */
    /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    TimeComponent.prototype.displayedHourChanged = /**
     * @hidden
     * Handles changes of displayed hour value from template.
     * @return {?}
     */
    function () {
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
    };
    /** @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     */
    /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    TimeComponent.prototype.inputBlur = /**
     * @hidden
     * Handles the blur events from inputs. Also rewrite values if they are incorrect, prevents from negative or too big
     * values. Also changes period if it's on meridian type and hour is bigger than 12.
     * @param {?} inputType
     * @return {?}
     */
    function (inputType) {
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
    };
    /** Increases the hour value by one. */
    /**
     * Increases the hour value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseHour = /**
     * Increases the hour value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Decreases the hour value by one. */
    /**
     * Decreases the hour value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseHour = /**
     * Decreases the hour value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Increases the minute value by one. */
    /**
     * Increases the minute value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseMinute = /**
     * Increases the minute value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Decreases the minute value by one. */
    /**
     * Decreases the minute value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseMinute = /**
     * Decreases the minute value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Increases the second value by one. */
    /**
     * Increases the second value by one.
     * @return {?}
     */
    TimeComponent.prototype.increaseSecond = /**
     * Increases the second value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Decreases the second value by one. */
    /**
     * Decreases the second value by one.
     * @return {?}
     */
    TimeComponent.prototype.decreaseSecond = /**
     * Decreases the second value by one.
     * @return {?}
     */
    function () {
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
    };
    /** Toggles the period (am/pm). */
    /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    TimeComponent.prototype.togglePeriod = /**
     * Toggles the period (am/pm).
     * @return {?}
     */
    function () {
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
    };
    /** @hidden
     * Handles minutes model change from template
     * */
    /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    TimeComponent.prototype.minuteModelChange = /**
     * @hidden
     * Handles minutes model change from template
     *
     * @return {?}
     */
    function () {
        if (!(this.time.minute > 59 || this.time.minute < 0) || !this.validate) {
            this.onChange(this.time);
        }
    };
    /** @hidden
     * Handles seconds model change from template
     * */
    /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    TimeComponent.prototype.secondModelChange = /**
     * @hidden
     * Handles seconds model change from template
     *
     * @return {?}
     */
    function () {
        if (!(this.time.second > 59 || this.time.second < 0) || !this.validate) {
            this.onChange(this.time);
        }
    };
    /** @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     */
    /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    TimeComponent.prototype.periodModelChange = /**
     * @hidden
     * Handles period model change. depending on current hour and new period changes hours by +/- 12
     * @return {?}
     */
    function () {
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
    };
    /** @hidden
     * Handles last button keyboard events
     */
    /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    TimeComponent.prototype.lastButtonKeydown = /**
     * @hidden
     * Handles last button keyboard events
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === 'Tab' && !event.shiftKey) {
            event.preventDefault();
            this.focusArrowLeft.emit();
        }
    };
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     */
    /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    TimeComponent.prototype.isPm = /**
     * @hidden
     * Defines if period is PM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var pmMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianPm : this.timeI18n.meridianPm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === pmMeridian;
    };
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     */
    /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    TimeComponent.prototype.isAm = /**
     * @hidden
     * Defines if period is AM, Considers the fact that period should be case sensitive
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var amMeridian = this.timeI18n.meridianCaseSensitive ? this.timeI18n.meridianAm : this.timeI18n.meridianAm.toLocaleUpperCase();
        period = this.timeI18n.meridianCaseSensitive ? period : period.toLocaleUpperCase();
        return period === amMeridian;
    };
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
                            function () { return TimeComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: ["input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}"]
                }] }
    ];
    /** @nocollapse */
    TimeComponent.ctorParameters = function () { return [
        { type: TimeI18nLabels },
        { type: TimeI18n }
    ]; };
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
    return TimeComponent;
}());
export { TimeComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGltZS90aW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFNUM7SUF5R0ksdUJBQ1csY0FBOEIsRUFDOUIsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7Ozs7O1FBcEZwQixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBSzFCLGFBQVEsR0FBWSxJQUFJLENBQUM7Ozs7UUFVekIsYUFBUSxHQUFZLElBQUksQ0FBQzs7OztRQUt6QixtQkFBYyxHQUFZLElBQUksQ0FBQzs7OztRQUl4QyxtQkFBYyxHQUFZLElBQUksQ0FBQzs7OztRQU0vQixpQkFBWSxHQUFZLElBQUksQ0FBQzs7Ozs7Ozs7O1FBVzdCLFNBQUksR0FBZSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7Ozs7UUFJNUMsbUJBQWMsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7Ozs7OztRQVl2RSxrQkFBYSxHQUFXLENBQUMsQ0FBQzs7OztRQUcxQixhQUFROzs7O1FBQUcsVUFBQyxJQUFnQjtRQUM1QixDQUFDLEVB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Q0FHTCxLQUFLOytCQU1MLEtBQUs7dUJBV0wsS0FBSztpQ0FJTCxNQUFNOztJQXNUWCxvQkFBQztDQUFBLEFBelhELElBeVhDO1NBeFdZLGFBQWE7Ozs7Ozs7SUFNdEIsaUNBQW1DOzs7OztJQUtuQyxpQ0FBa0M7Ozs7O0lBS2xDLGlDQUEyQjs7Ozs7SUFLM0IsaUNBQWtDOzs7OztJQUtsQyx1Q0FBd0M7Ozs7O0lBR3hDLHVDQUMrQjs7Ozs7SUFLL0IscUNBQzZCOzs7Ozs7Ozs7O0lBVTdCLDZCQUNxRDs7Ozs7SUFHckQsdUNBQ3VFOzs7Ozs7SUFLdkUsK0JBQWU7Ozs7Ozs7O0lBT2Ysc0NBQTBCOzs7OztJQUcxQixpQ0FDRTs7Ozs7SUFHRixrQ0FDRTs7SUFrQkUsdUNBQXFDOztJQUNyQyxpQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGltZU9iamVjdCB9IGZyb20gJy4vdGltZS1vYmplY3QnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVGltZUkxOG5MYWJlbHMgfSBmcm9tICcuL2kxOG4vdGltZS1pMThuLWxhYmVscyc7XG5pbXBvcnQgeyBUaW1lSTE4biB9IGZyb20gJy4vaTE4bi90aW1lLWkxOG4nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXRpbWUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90aW1lLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgY2xhc3M6ICdmZC10aW1lIGZkLWhhcy1kaXNwbGF5LWJsb2NrJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZUNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRpbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8qKlxuICAgICAqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgdXNlcyB0aGUgMjQgaG91ciBjbG9jayAoaG91cnMgcmFuZ2luZyBmcm9tIDAgdG8gMjMpXG4gICAgICogYW5kIGRvZXMgbm90IGRpc3BsYXkgYSBwZXJpb2QgY29udHJvbC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBtZXJpZGlhbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgZG9lcyBub3Qgc2V0IHRoZSBpbnB1dCBmaWVsZCB0byBpbnZhbGlkIHN0YXRlIG9uIGludmFsaWQgZW50cnkuXG4gICAgICovXG4gICAgQElucHV0KCkgdmFsaWRhdGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQElucHV0IERpc2FibGVzIHRoZSBjb21wb25lbnQuXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBASW5wdXQgV2hlbiBzZXQgdG8gZmFsc2UsIGhpZGVzIHRoZSBidXR0b25zIHRoYXQgaW5jcmVtZW50IGFuZCBkZWNyZW1lbnQgdGhlIGNvcnJlc3BvbmRpbmcgaW5wdXQuXG4gICAgICovXG4gICAgQElucHV0KCkgc3Bpbm5lcnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogQElucHV0IFdoZW4gc2V0IHRvIGZhbHNlLCBoaWRlcyB0aGUgaW5wdXQgZm9yIHNlY29uZHMuXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzcGxheVNlY29uZHM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBJbnB1dCBXaGVuIHNldCB0byBmYWxzZSwgaGlkZXMgdGhlIGlucHV0IGZvciBtaW51dGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheU1pbnV0ZXM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqXG4gICAgICogV2hlbiBzZXQgdG8gZmFsc2UsIGhpZGVzIHRoZSBpbnB1dCBmb3IgaG91cnNcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlIb3VyczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKipcbiAgICAgKiBASW5wdXQgQW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhyZWUgaW50ZWdlciBwcm9wZXJ0aWVzOiAnaG91cicgKHJhbmdpbmcgZnJvbSAwIHRvIDIzKSxcbiAgICAgKiAnbWludXRlJyAocmFuZ2luZyBmcm9tIDAgdG8gNTkpLCBhbmQgJ3NlY29uZCcgKHJhbmdpbmcgZnJvbSAwIHRvIDU5KS4gVGhpcyBpcyB0aGUgbW9kZWwgdGhlIGNvbXBvbmVudCBjb25zdW1lcy4gRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzb25cbiAgICAgKiB7IGhvdXI6IDEyLCBtaW51dGU6IDAsIHNlY29uZDogMCB9XG4gICAgICogYGBgXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0aW1lOiBUaW1lT2JqZWN0ID0geyBob3VyOiAwLCBtaW51dGU6IDAsIHNlY29uZDogMCB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBmb2N1c0Fycm93TGVmdDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBVc2VkIG9ubHkgaW4gbWVyaWRpYW4gbW9kZS4gU3RvcmVzIGluZm9ybWF0aW9uIHRoZSBjdXJyZW50IGFtL3BtIHN0YXRlLlxuICAgICAqL1xuICAgIHBlcmlvZDogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBWYXJpYWJsZSB0aGF0IGlzIGRpc3BsYXllZCBhcyBhbiBob3VyLlxuICAgICAqIEZvciBtZXJpZGlhbiBtb2RlIHJhbmdpbmcgZnJvbSAwIHRvIDEyLFxuICAgICAqIEZvciBub24tbWVyaWRpYW4gbW9kZSByYW5naW5nIGZyb20gMCB0byAyMywgYW5kIHJlZmxlY3RzIHRoZSBob3VyIHZhbHVlXG4gICAgICovXG4gICAgZGlzcGxheWVkSG91cjogbnVtYmVyID0gMDtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2UgPSAodGltZTogVGltZU9iamVjdCkgPT4ge1xuICAgIH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZCA9ICgpID0+IHtcbiAgICB9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodGltZTogVGltZU9iamVjdCkgPT4gdm9pZCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyB0aW1lSTE4bkxhYmVsczogVGltZUkxOG5MYWJlbHMsXG4gICAgICAgIHB1YmxpYyB0aW1lSTE4bjogVGltZUkxOG5cbiAgICApIHt9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodGltZTogVGltZU9iamVjdCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRpbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnNldERpc3BsYXllZEhvdXIoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIFJlYWN0cyBvbmx5IHdoZW4gdGhlcmUgaXMgbWVyaWRpYW4gb3IgdGltZSBpbnB1dCBjaGFuZ2VcbiAgICAgKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLm1lcmlkaWFuIHx8IGNoYW5nZXMudGltZSkge1xuICAgICAgICAgICAgdGhpcy5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIENoYW5nZXMgZGlzcGxheWVkIGhvdXIgdmFsdWUsIHVzZWQgbW9zdGx5IHdoZW4gdGhlIG1vZGVsIGhvdXIgaXMgY2hhbmdlZFxuICAgICAqL1xuICAgIHNldERpc3BsYXllZEhvdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tZXJpZGlhbikge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gdGhpcy50aW1lLmhvdXI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLmhvdXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IDEyO1xuICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQW07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLmhvdXIgPiAxMikge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gdGhpcy50aW1lLmhvdXIgLSAxMjtcbiAgICAgICAgICAgIHRoaXMucGVyaW9kID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhblBtO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5ob3VyID09PSAxMikge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gMTI7XG4gICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5QbTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkSG91ciA9IHRoaXMudGltZS5ob3VyO1xuICAgICAgICAgICAgdGhpcy5wZXJpb2QgPSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQW07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIEhhbmRsZXMgY2hhbmdlcyBvZiBkaXNwbGF5ZWQgaG91ciB2YWx1ZSBmcm9tIHRlbXBsYXRlLlxuICAgICAqL1xuICAgIGRpc3BsYXllZEhvdXJDaGFuZ2VkKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMubWVyaWRpYW4pIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucGVyaW9kID09PSB0aGlzLnRpbWVJMThuLm1lcmlkaWFuQW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWRIb3VyID09PSAxMikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbWUuaG91ciA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLmRpc3BsYXllZEhvdXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnBlcmlvZCA9PT0gdGhpcy50aW1lSTE4bi5tZXJpZGlhblBtKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzcGxheWVkSG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLmRpc3BsYXllZEhvdXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLmRpc3BsYXllZEhvdXIgKyAxMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogSGFuZGxlcyB0aGUgYmx1ciBldmVudHMgZnJvbSBpbnB1dHMuIEFsc28gcmV3cml0ZSB2YWx1ZXMgaWYgdGhleSBhcmUgaW5jb3JyZWN0LCBwcmV2ZW50cyBmcm9tIG5lZ2F0aXZlIG9yIHRvbyBiaWdcbiAgICAgKiB2YWx1ZXMuIEFsc28gY2hhbmdlcyBwZXJpb2QgaWYgaXQncyBvbiBtZXJpZGlhbiB0eXBlIGFuZCBob3VyIGlzIGJpZ2dlciB0aGFuIDEyLlxuICAgICAqL1xuICAgIGlucHV0Qmx1cihpbnB1dFR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGlucHV0VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnaG91cic6IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZEhvdXIgPSBNYXRoLnJvdW5kKE1hdGguYWJzKHRoaXMuZGlzcGxheWVkSG91cikpICUgMjQ7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLmRpc3BsYXllZEhvdXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXJpZGlhbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNwbGF5ZWRIb3VyID4gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGVyaW9kID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhblBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gdGhpcy5kaXNwbGF5ZWRIb3VyICE9PSAxMiA/IHRoaXMuZGlzcGxheWVkSG91ciAlIDEyIDogdGhpcy5kaXNwbGF5ZWRIb3VyO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlzcGxheWVkSG91ciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRIb3VyID0gMTI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5BbTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQW0odGhpcy5wZXJpb2QpICYmIHRoaXMuZGlzcGxheWVkSG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gTWF0aC5hYnMoTWF0aC5yb3VuZCh0aGlzLnRpbWUubWludXRlKSAlIDYwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gTWF0aC5hYnMoTWF0aC5yb3VuZCh0aGlzLnRpbWUuc2Vjb25kKSAlIDYwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ3BlcmlvZCc6IHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBXaGVuIHRoZXJlIGlzIGludmFsaWQgcGVyaW9kLCBmdW5jdGlvbiBjaGFuZ2VzIHBlcmlvZCB0byB2YWxpZCBiYXNpbmcgb24gYWN0dWFsIGhvdXJcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGVyaW9kIHx8XG4gICAgICAgICAgICAgICAgICAgICghdGhpcy5pc1BtKHRoaXMucGVyaW9kKSAmJiAhdGhpcy5pc0FtKHRoaXMucGVyaW9kKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogSW5jcmVhc2VzIHRoZSBob3VyIHZhbHVlIGJ5IG9uZS4gKi9cbiAgICBpbmNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUuaG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5ob3VyID09PSAyMykge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLnRpbWUuaG91ciArIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogRGVjcmVhc2VzIHRoZSBob3VyIHZhbHVlIGJ5IG9uZS4gKi9cbiAgICBkZWNyZWFzZUhvdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRpbWUuaG91ciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5ob3VyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUuaG91ciA9IDIzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLnRpbWUuaG91ciAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXREaXNwbGF5ZWRIb3VyKCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogSW5jcmVhc2VzIHRoZSBtaW51dGUgdmFsdWUgYnkgb25lLiAqL1xuICAgIGluY3JlYXNlTWludXRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50aW1lLm1pbnV0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50aW1lLm1pbnV0ZSA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLm1pbnV0ZSA9PT0gNTkpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5taW51dGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5pbmNyZWFzZUhvdXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5taW51dGUgPSB0aGlzLnRpbWUubWludXRlICsgMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIERlY3JlYXNlcyB0aGUgbWludXRlIHZhbHVlIGJ5IG9uZS4gKi9cbiAgICBkZWNyZWFzZU1pbnV0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZS5taW51dGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5taW51dGUgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZS5taW51dGUgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5taW51dGUgPSA1OTtcbiAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VIb3VyKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWUubWludXRlID0gdGhpcy50aW1lLm1pbnV0ZSAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgIH1cblxuICAgIC8qKiBJbmNyZWFzZXMgdGhlIHNlY29uZCB2YWx1ZSBieSBvbmUuICovXG4gICAgaW5jcmVhc2VTZWNvbmQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlTZWNvbmRzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lLnNlY29uZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zZWNvbmQgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUuc2Vjb25kID09PSA1OSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zZWNvbmQgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VNaW51dGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLnNlY29uZCA9IHRoaXMudGltZS5zZWNvbmQgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICB9XG5cbiAgICAvKiogRGVjcmVhc2VzIHRoZSBzZWNvbmQgdmFsdWUgYnkgb25lLiAqL1xuICAgIGRlY3JlYXNlU2Vjb25kKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5U2Vjb25kcykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGltZS5zZWNvbmQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWUuc2Vjb25kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lLnNlY29uZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zZWNvbmQgPSA1OTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlYXNlTWludXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGltZS5zZWNvbmQgPSB0aGlzLnRpbWUuc2Vjb25kIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudGltZSk7XG4gICAgfVxuXG4gICAgLyoqIFRvZ2dsZXMgdGhlIHBlcmlvZCAoYW0vcG0pLiAqL1xuICAgIHRvZ2dsZVBlcmlvZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZS5ob3VyIDwgMjQgJiYgdGhpcy50aW1lLmhvdXIgPj0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNBbSh0aGlzLnBlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5QbTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZE1vZGVsQ2hhbmdlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNQbSh0aGlzLnBlcmlvZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5BbTtcbiAgICAgICAgICAgICAgICB0aGlzLnBlcmlvZE1vZGVsQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlblxuICAgICAqIEhhbmRsZXMgbWludXRlcyBtb2RlbCBjaGFuZ2UgZnJvbSB0ZW1wbGF0ZVxuICAgICAqICovXG4gICAgbWludXRlTW9kZWxDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMudGltZS5taW51dGUgPiA1OSB8fCB0aGlzLnRpbWUubWludXRlIDwgMCkgfHwgIXRoaXMudmFsaWRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy50aW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuXG4gICAgICogSGFuZGxlcyBzZWNvbmRzIG1vZGVsIGNoYW5nZSBmcm9tIHRlbXBsYXRlXG4gICAgICogKi9cbiAgICBzZWNvbmRNb2RlbENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy50aW1lLnNlY29uZCA+IDU5IHx8IHRoaXMudGltZS5zZWNvbmQgPCAwKSB8fCAhdGhpcy52YWxpZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBIYW5kbGVzIHBlcmlvZCBtb2RlbCBjaGFuZ2UuIGRlcGVuZGluZyBvbiBjdXJyZW50IGhvdXIgYW5kIG5ldyBwZXJpb2QgY2hhbmdlcyBob3VycyBieSArLy0gMTJcbiAgICAgKi9cbiAgICBwZXJpb2RNb2RlbENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudGltZSAmJiAhdGhpcy50aW1lLmhvdXIpIHtcbiAgICAgICAgICAgIHRoaXMudGltZS5ob3VyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50aW1lLmhvdXIgPCAyNCAmJiB0aGlzLnRpbWUuaG91ciA+PSAwKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1BtKHRoaXMucGVyaW9kKSAmJiB0aGlzLnRpbWUuaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLnRpbWUuaG91ciArIDEyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRpbWUuaG91ciA+PSAxMiAmJiB0aGlzLmlzQW0odGhpcy5wZXJpb2QpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aW1lLmhvdXIgPSB0aGlzLnRpbWUuaG91ciAtIDEyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnRpbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW5cbiAgICAgKiBIYW5kbGVzIGxhc3QgYnV0dG9uIGtleWJvYXJkIGV2ZW50c1xuICAgICAqL1xuICAgIGxhc3RCdXR0b25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5jb2RlID09PSAnVGFiJyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQXJyb3dMZWZ0LmVtaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBEZWZpbmVzIGlmIHBlcmlvZCBpcyBQTSwgQ29uc2lkZXJzIHRoZSBmYWN0IHRoYXQgcGVyaW9kIHNob3VsZCBiZSBjYXNlIHNlbnNpdGl2ZVxuICAgICAqL1xuICAgIHByaXZhdGUgaXNQbShwZXJpb2Q6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBwbU1lcmlkaWFuID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkNhc2VTZW5zaXRpdmUgPyB0aGlzLnRpbWVJMThuLm1lcmlkaWFuUG0gOiB0aGlzLnRpbWVJMThuLm1lcmlkaWFuUG0udG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgcGVyaW9kID0gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkNhc2VTZW5zaXRpdmUgPyBwZXJpb2QgOiBwZXJpb2QudG9Mb2NhbGVVcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIHBlcmlvZCA9PT0gcG1NZXJpZGlhbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogRGVmaW5lcyBpZiBwZXJpb2QgaXMgQU0sIENvbnNpZGVycyB0aGUgZmFjdCB0aGF0IHBlcmlvZCBzaG91bGQgYmUgY2FzZSBzZW5zaXRpdmVcbiAgICAgKi9cbiAgICBwcml2YXRlIGlzQW0ocGVyaW9kOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgYW1NZXJpZGlhbiA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5DYXNlU2Vuc2l0aXZlID8gdGhpcy50aW1lSTE4bi5tZXJpZGlhbkFtIDogdGhpcy50aW1lSTE4bi5tZXJpZGlhbkFtLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIHBlcmlvZCA9IHRoaXMudGltZUkxOG4ubWVyaWRpYW5DYXNlU2Vuc2l0aXZlID8gcGVyaW9kIDogcGVyaW9kLnRvTG9jYWxlVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBwZXJpb2QgPT09IGFtTWVyaWRpYW47XG4gICAgfVxufVxuIl19