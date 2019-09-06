/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
/**
 * Select component intended to mimic the behaviour of the native select element.
 */
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        var _this = this;
        /**
         * @hidden
         */
        this.fdDropdownClass = true;
        /**
         * Whether the select component is disabled.
         */
        this.disabled = false;
        /**
         * Open state of the select.
         */
        this.isOpen = false;
        /**
         * Whether the select is in compact mode.
         */
        this.compact = false;
        /**
         * Popper.js options of the popover.
         */
        this.popperOptions = {
            placement: 'bottom-start',
            modifiers: {
                preventOverflow: {
                    enabled: true,
                    escapeWithReference: true,
                    boundariesElement: 'scrollParent'
                }
            }
        };
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * Event emitted when the popover open state changes.
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Event emitted when the selected value of the select changes.
         */
        this.valueChange = new EventEmitter();
        /**
         * Subject triggered when the component is destroyed.
         */
        this.destroy$ = new Subject();
        /**
         * Observable triggered when an option has its selectedChange event fire.
         */
        this.optionsStatusChanges = (/** @type {?} */ (defer((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var options = _this.options;
            if (options) {
                return options.changes.pipe(startWith(options), switchMap((/**
                 * @return {?}
                 */
                function () { return merge.apply(void 0, tslib_1.__spread(options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                function (option) { return option.selectedChange; })))); })));
            }
        }))));
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        function () { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        function () { });
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    SelectComponent.prototype.isOpenChangeHandle = /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.value) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (_this.value) {
                    _this.selectValue(_this.value, false);
                }
            }));
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.ngAfterContentInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        // If the observable state changes, reset the options and initialize selection.
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        function () {
            _this.resetOptions();
            _this.initSelection();
        }));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.ngOnDestroy = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    /** Toggles the open state of the select. */
    /**
     * Toggles the open state of the select.
     * @return {?}
     */
    SelectComponent.prototype.toggle = /**
     * Toggles the open state of the select.
     * @return {?}
     */
    function () {
        if (this.isOpen && !this.disabled) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /** Opens the select popover body. */
    /**
     * Opens the select popover body.
     * @return {?}
     */
    SelectComponent.prototype.open = /**
     * Opens the select popover body.
     * @return {?}
     */
    function () {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /** Closes the select popover body. */
    /**
     * Closes the select popover body.
     * @return {?}
     */
    SelectComponent.prototype.close = /**
     * Closes the select popover body.
     * @return {?}
     */
    function () {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SelectComponent.prototype.registerOnChange = /**
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
    SelectComponent.prototype.registerOnTouched = /**
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
    SelectComponent.prototype.setDisabledState = /**
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
     * @param {?} value
     * @return {?}
     */
    SelectComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this.options) {
            this.selectValue(value, false);
        }
        else {
            // Defer the selection of the value to support forms
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                if (_this.options) {
                    _this.selectValue(value, false);
                }
            }));
        }
    };
    Object.defineProperty(SelectComponent.prototype, "triggerValue", {
        /** Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder. */
        get: /**
         * Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder.
         * @return {?}
         */
        function () {
            return this.selected ? this.selected.viewValueText : this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SelectComponent.prototype.keydownHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.code) {
            case ('ArrowUp'): {
                event.preventDefault();
                this.decrementFocused();
                break;
            }
            case ('ArrowDown'): {
                event.preventDefault();
                this.incrementFocused();
                break;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SelectComponent.prototype.resizeScrollHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    };
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @param option The option component to search for.
     * @param fireEvents Whether to fire change events.
     */
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    SelectComponent.prototype.selectOption = /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    function (option, fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        if (!this.isOptionActive(option)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            option.setSelected(true, false);
            this.selected = option;
            this.updateValue(fireEvents);
            this.close();
            return option;
        }
        return;
    };
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @param value Value to search for.
     * @param fireEvents Whether to fire change events.
     */
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    SelectComponent.prototype.selectValue = /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    function (value, fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        /** @type {?} */
        var matchOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.value != null && option.value === value;
        }));
        // If not match is found, set everything to null
        // This is mostly only for cases where a user removes an active option
        if (!matchOption) {
            this.unselectOptions();
            return;
        }
        // If match is found, select the new value
        if (matchOption && !this.isOptionActive(matchOption)) {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            matchOption.setSelected(true, false);
            this.selected = matchOption;
            this.updateValue(fireEvents);
            this.close();
        }
        return matchOption;
    };
    /**
     * Updates the value parameter with optional events.
     * @param fireEvents If true, function fires valueChange, onChange and onTouched events.
     */
    /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    SelectComponent.prototype.updateValue = /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    function (fireEvents) {
        if (fireEvents === void 0) { fireEvents = true; }
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    };
    /**
     * Function used to reset the options state.
     */
    /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.resetOptions = /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        // Create observable that fires when the options change or the component is destroyed.
        /** @type {?} */
        var destroyCurrentObs = merge(this.options.changes, this.destroy$);
        // Subscribe to observable defined in component properties which fires when an option is clicked.
        // Destroy if the observable defined above triggers.
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((/**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            _this.selectOption(instance);
        }));
    };
    /** Selection initialization when a change occurs in options. */
    /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.initSelection = /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    function () {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    };
    /**
     * Function that tests whether the tested option is currently selected.
     * @param option Option to test against the selected option.
     */
    /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    SelectComponent.prototype.isOptionActive = /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    function (option) {
        return option && this.selected && option === this.selected;
    };
    /** Method that focuses the next option in the list, or the first one if the last one is currently focused. */
    /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.incrementFocused = /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    function () {
        // Get active focused element
        /** @type {?} */
        var activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        var correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.getHtmlElement() === activeElement;
        }));
        if (correspondingOption) {
            /** @type {?} */
            var arrayOptions = this.options.toArray();
            /** @type {?} */
            var index = arrayOptions.indexOf(correspondingOption);
            // If active option is the last option, focus the first one
            // Otherwise, focus the next option.
            if (index === this.options.length - 1) {
                arrayOptions[0].focus();
            }
            else {
                arrayOptions[index + 1].focus();
            }
        }
        else if (this.options) {
            this.options.first.focus();
        }
    };
    /** Method that focuses the previous option in the list, or the last one if the last one is currently focused. */
    /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.decrementFocused = /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    function () {
        // Get active focused element
        /** @type {?} */
        var activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        var correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        function (option) {
            return option.getHtmlElement() === activeElement;
        }));
        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            /** @type {?} */
            var arrayOptions = this.options.toArray();
            /** @type {?} */
            var index = arrayOptions.indexOf(correspondingOption);
            if (index === 0) {
                arrayOptions[this.options.length - 1].focus();
            }
            else {
                arrayOptions[index - 1].focus();
            }
        }
        else if (this.options) {
            this.options.first.focus();
        }
    };
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     */
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    SelectComponent.prototype.unselectOptions = /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            if (_this.selected) {
                _this.selected.setSelected(false, false);
            }
            _this.selected = undefined;
            _this.value = undefined;
            _this.valueChange.emit(undefined);
            _this.onChange(undefined);
        }));
    };
    SelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-select',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            (isOpenChange)=\"isOpenChangeHandle($event)\"\n            [options]=\"popperOptions\"\n            [fillControlMode]=\"fillControlMode\"\n            [appendTo]=\"appendTo\"\n            class=\"fd-select-popover-custom\">\n    <fd-popover-control>\n        <ng-container *ngIf=\"triggerTemplate\">\n            <ng-container *ngTemplateOutlet=\"triggerTemplate; context: {$implicit: this}\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!triggerTemplate\">\n            <button class=\"fd-dropdown__control fd-button fd-select-button-custom\"\n                    aria-haspopup=\"true\"\n                    [ngClass]=\"{'fd-button--compact': compact}\"\n                    [attr.aria-expanded]=\"isOpen\"\n                    [disabled]=\"disabled\">\n                <span class=\"fd-select-text-custom\">{{triggerValue}}</span>\n            </button>\n        </ng-container>\n    </fd-popover-control>\n    <fd-popover-body\n        class=\"fd-select-popover-body-custom\"\n        [style.maxHeight]=\"maxHeight || (calculatedMaxHeight + 'px')\">\n        <ng-content></ng-content>\n    </fd-popover-body>\n</fd-popover>\n",
                    encapsulation: ViewEncapsulation.None,
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return SelectComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        '[class.fd-select-custom]': 'true',
                        'role': 'listbox',
                    },
                    styles: [".fd-select-custom{display:inline-block;width:100%}.fd-select-custom .fd-select-popover-custom{display:block}.fd-select-custom .fd-select-popover-custom fd-popover-container{min-width:100%;overflow:auto}.fd-select-custom .fd-select-button-custom{display:flex;align-items:flex-end;justify-content:space-between}.fd-select-custom .fd-select-button-custom::after{flex-shrink:0;margin-top:0}.fd-select-custom .fd-select-text-custom{text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden}.fd-select-custom .fd-select-popover-body-custom{display:block}"]
                }] }
    ];
    SelectComponent.propDecorators = {
        fdDropdownClass: [{ type: HostBinding, args: ['class.fd-dropdown',] }],
        options: [{ type: ContentChildren, args: [OptionComponent, { descendants: true },] }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        isOpen: [{ type: Input }],
        value: [{ type: Input }],
        compact: [{ type: Input }],
        maxHeight: [{ type: Input }],
        popperOptions: [{ type: Input }],
        fillControlMode: [{ type: Input }],
        triggerTemplate: [{ type: Input }],
        appendTo: [{ type: Input }],
        isOpenChange: [{ type: Output }],
        valueChange: [{ type: Output }],
        keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        resizeScrollHandler: [{ type: HostListener, args: ['window:resize',] }]
    };
    return SelectComponent;
}());
export { SelectComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    SelectComponent.prototype.fdDropdownClass;
    /**
     * @hidden
     * @type {?}
     */
    SelectComponent.prototype.options;
    /**
     * Whether the select component is disabled.
     * @type {?}
     */
    SelectComponent.prototype.disabled;
    /**
     * Placeholder for the select. Appears in the triggerbox if no option is selected.
     * @type {?}
     */
    SelectComponent.prototype.placeholder;
    /**
     * Open state of the select.
     * @type {?}
     */
    SelectComponent.prototype.isOpen;
    /**
     * Current value of the selected option.
     * @type {?}
     */
    SelectComponent.prototype.value;
    /**
     * Whether the select is in compact mode.
     * @type {?}
     */
    SelectComponent.prototype.compact;
    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling.
     * @type {?}
     */
    SelectComponent.prototype.maxHeight;
    /**
     * Popper.js options of the popover.
     * @type {?}
     */
    SelectComponent.prototype.popperOptions;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     * @type {?}
     */
    SelectComponent.prototype.fillControlMode;
    /**
     * Template with which to display the trigger box.
     * @type {?}
     */
    SelectComponent.prototype.triggerTemplate;
    /**
     * The element to which the popover should be appended.
     * @type {?}
     */
    SelectComponent.prototype.appendTo;
    /**
     * Event emitted when the popover open state changes.
     * @type {?}
     */
    SelectComponent.prototype.isOpenChange;
    /**
     * Event emitted when the selected value of the select changes.
     * @type {?}
     */
    SelectComponent.prototype.valueChange;
    /**
     * @hidden
     * @type {?}
     */
    SelectComponent.prototype.calculatedMaxHeight;
    /**
     * Current selected option component reference.
     * @type {?}
     * @private
     */
    SelectComponent.prototype.selected;
    /**
     * Subject triggered when the component is destroyed.
     * @type {?}
     * @private
     */
    SelectComponent.prototype.destroy$;
    /**
     * Observable triggered when an option has its selectedChange event fire.
     * @type {?}
     * @private
     */
    SelectComponent.prototype.optionsStatusChanges;
    /**
     * @hidden
     * @type {?}
     */
    SelectComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    SelectComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFSCxTQUFTLEVBQ1QsZUFBZSxFQUNmLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDbkQsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQWlCLFdBQVcsRUFDckMsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBT2pFO0lBQUE7UUFBQSxpQkE4WUM7Ozs7UUF6WEcsb0JBQWUsR0FBWSxJQUFJLENBQUM7Ozs7UUFRaEMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQVExQixXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBUXhCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFRekIsa0JBQWEsR0FBa0I7WUFDM0IsU0FBUyxFQUFFLGNBQWM7WUFDekIsU0FBUyxFQUFFO2dCQUNQLGVBQWUsRUFBRTtvQkFDYixPQUFPLEVBQUUsSUFBSTtvQkFDYixtQkFBbUIsRUFBRSxJQUFJO29CQUN6QixpQkFBaUIsRUFBRSxjQUFjO2lCQUNwQzthQUNKO1NBQ0osQ0FBQzs7Ozs7OztRQVNGLG9CQUFlLEdBQW9CLFVBQVUsQ0FBQzs7OztRQVlyQyxpQkFBWSxHQUNmLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7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TCxLQUFLO3lCQUlMLEtBQUs7d0JBSUwsS0FBSzswQkFJTCxLQUFLOzRCQUlMLEtBQUs7Z0NBSUwsS0FBSztrQ0FrQkwsS0FBSztrQ0FJTCxLQUFLOzJCQUlMLEtBQUs7K0JBSUwsTUFBTTs4QkFLTixNQUFNO2lDQTRITixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO3NDQWlCbEMsWUFBWSxTQUFDLGVBQWU7O0lBMEtqQyxzQkFBQztDQUFBLEFBOVlELElBOFlDO1NBN1hZLGVBQWU7Ozs7OztJQUd4QiwwQ0FDZ0M7Ozs7O0lBR2hDLGtDQUNvQzs7Ozs7SUFHcEMsbUNBQzBCOzs7OztJQUcxQixzQ0FDb0I7Ozs7O0lBR3BCLGlDQUN3Qjs7Ozs7SUFHeEIsZ0NBQ1c7Ozs7O0lBR1gsa0NBQ3lCOzs7OztJQUd6QixvQ0FDa0I7Ozs7O0lBR2xCLHdDQVVFOzs7Ozs7OztJQVFGLDBDQUM4Qzs7Ozs7SUFHOUMsMENBQ2tDOzs7OztJQUdsQyxtQ0FDK0I7Ozs7O0lBRy9CLHVDQUVrQzs7Ozs7SUFHbEMsc0NBRThCOzs7OztJQUc5Qiw4Q0FBNEI7Ozs7OztJQUc1QixtQ0FBa0M7Ozs7OztJQUdsQyxtQ0FBK0Q7Ozs7OztJQUcvRCwrQ0FRa0M7Ozs7O0lBR2xDLG1DQUE4Qjs7Ozs7SUFHOUIsb0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9wdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vb3B0aW9uL29wdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmZXIsIG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUG9wcGVyT3B0aW9ucyB9IGZyb20gJ3BvcHBlci5qcyc7XG5pbXBvcnQgeyBQb3BvdmVyRmlsbE1vZGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXItZGlyZWN0aXZlL3BvcG92ZXIuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBTZWxlY3QgY29tcG9uZW50IGludGVuZGVkIHRvIG1pbWljIHRoZSBiZWhhdmlvdXIgb2YgdGhlIG5hdGl2ZSBzZWxlY3QgZWxlbWVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1zZWxlY3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlbGVjdC5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5mZC1zZWxlY3QtY3VzdG9tXSc6ICd0cnVlJyxcbiAgICAgICAgJ3JvbGUnOiAnbGlzdGJveCcsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWRyb3Bkb3duJylcbiAgICBmZERyb3Bkb3duQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkcmVuKE9wdGlvbkNvbXBvbmVudCwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIG9wdGlvbnM6IFF1ZXJ5TGlzdDxPcHRpb25Db21wb25lbnQ+O1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlbGVjdCBjb21wb25lbnQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIGZvciB0aGUgc2VsZWN0LiBBcHBlYXJzIGluIHRoZSB0cmlnZ2VyYm94IGlmIG5vIG9wdGlvbiBpcyBzZWxlY3RlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKiogT3BlbiBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQ3VycmVudCB2YWx1ZSBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgaXMgaW4gY29tcGFjdCBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIE1heCBoZWlnaHQgb2YgdGhlIHBvcG92ZXIuIEFueSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aWxsIGJlIGFjY2Vzc2libGUgdGhyb3VnaCBzY3JvbGxpbmcuICovXG4gICAgQElucHV0KClcbiAgICBtYXhIZWlnaHQ6IHN0cmluZztcblxuICAgIC8qKiBQb3BwZXIuanMgb3B0aW9ucyBvZiB0aGUgcG9wb3Zlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBvcHBlck9wdGlvbnM6IFBvcHBlck9wdGlvbnMgPSB7XG4gICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbS1zdGFydCcsXG4gICAgICAgIG1vZGlmaWVyczoge1xuICAgICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlc2NhcGVXaXRoUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiAnc2Nyb2xsUGFyZW50J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByZXNldCBvcHRpb25zIGZvciB0aGUgcG9wb3ZlciBib2R5IHdpZHRoLlxuICAgICAqICogYGF0LWxlYXN0YCB3aWxsIGFwcGx5IGEgbWluaW11bSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIGBlcXVhbGAgd2lsbCBhcHBseSBhIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogTGVhdmUgYmxhbmsgZm9yIG5vIGVmZmVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxDb250cm9sTW9kZTogUG9wb3ZlckZpbGxNb2RlID0gJ2F0LWxlYXN0JztcblxuICAgIC8qKiBUZW1wbGF0ZSB3aXRoIHdoaWNoIHRvIGRpc3BsYXkgdGhlIHRyaWdnZXIgYm94LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHJpZ2dlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIFRoZSBlbGVtZW50IHRvIHdoaWNoIHRoZSBwb3BvdmVyIHNob3VsZCBiZSBhcHBlbmRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFwcGVuZFRvOiBIVE1MRWxlbWVudCB8ICdib2R5JztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHBvcG92ZXIgb3BlbiBzdGF0ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGlzT3BlbkNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+XG4gICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgdmFsdWUgb2YgdGhlIHNlbGVjdCBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjYWxjdWxhdGVkTWF4SGVpZ2h0OiBudW1iZXI7XG5cbiAgICAvKiogQ3VycmVudCBzZWxlY3RlZCBvcHRpb24gY29tcG9uZW50IHJlZmVyZW5jZS4gKi9cbiAgICBwcml2YXRlIHNlbGVjdGVkOiBPcHRpb25Db21wb25lbnQ7XG5cbiAgICAvKiogU3ViamVjdCB0cmlnZ2VyZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC4gKi9cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBPYnNlcnZhYmxlIHRyaWdnZXJlZCB3aGVuIGFuIG9wdGlvbiBoYXMgaXRzIHNlbGVjdGVkQ2hhbmdlIGV2ZW50IGZpcmUuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcHRpb25zU3RhdHVzQ2hhbmdlczogT2JzZXJ2YWJsZTxPcHRpb25Db21wb25lbnQ+ID0gZGVmZXIoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuY2hhbmdlcy5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aChvcHRpb25zKSxcbiAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4gbWVyZ2UoLi4ub3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5zZWxlY3RlZENoYW5nZSkpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pIGFzIE9ic2VydmFibGU8T3B0aW9uQ29tcG9uZW50PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaXNPcGVuQ2hhbmdlSGFuZGxlKGlzT3BlbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmlzT3BlbiA9IGlzT3BlbjtcbiAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdChpc09wZW4pO1xuICAgICAgICB0aGlzLnJlc2l6ZVNjcm9sbEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKGNoYW5nZXMudmFsdWUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0VmFsdWUodGhpcy52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gSWYgdGhlIG9ic2VydmFibGUgc3RhdGUgY2hhbmdlcywgcmVzZXQgdGhlIG9wdGlvbnMgYW5kIGluaXRpYWxpemUgc2VsZWN0aW9uLlxuICAgICAgICB0aGlzLm9wdGlvbnMuY2hhbmdlcy5waXBlKHN0YXJ0V2l0aChudWxsKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZXNldE9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdFNlbGVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBUb2dnbGVzIHRoZSBvcGVuIHN0YXRlIG9mIHRoZSBzZWxlY3QuICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5pc09wZW4gJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIE9wZW5zIHRoZSBzZWxlY3QgcG9wb3ZlciBib2R5LiAqL1xuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc09wZW4gJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsb3NlcyB0aGUgc2VsZWN0IHBvcG92ZXIgYm9keS4gKi9cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2UuZW1pdCh0aGlzLmlzT3Blbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRGVmZXIgdGhlIHNlbGVjdGlvbiBvZiB0aGUgdmFsdWUgdG8gc3VwcG9ydCBmb3Jtc1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFZhbHVlKHZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgY3VycmVudCB0cmlnZ2VyIHZhbHVlIGlmIHRoZXJlIGlzIGEgc2VsZWN0ZWQgb3B0aW9uLiBPdGhlcndpc2UsIHJldHVybnMgdGhlIHBsYWNlaG9sZGVyLiAqL1xuICAgIGdldCB0cmlnZ2VyVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkLnZpZXdWYWx1ZVRleHQgOiB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICgnQXJyb3dVcCcpOiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlbWVudEZvY3VzZWQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgKCdBcnJvd0Rvd24nKToge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZW1lbnRGb2N1c2VkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICAgIHJlc2l6ZVNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlZE1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuNDU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0cyBhbiBvcHRpb24gYnkgb3B0aW9uIGNvbXBvbmVudCByZWZlcmVuY2UuIFByZWZlcnJlZCBtZXRob2Qgb2Ygc2VsZWN0aW9uLlxuICAgICAqIEBwYXJhbSBvcHRpb24gVGhlIG9wdGlvbiBjb21wb25lbnQgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0gZmlyZUV2ZW50cyBXaGV0aGVyIHRvIGZpcmUgY2hhbmdlIGV2ZW50cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbGVjdE9wdGlvbihvcHRpb246IE9wdGlvbkNvbXBvbmVudCwgZmlyZUV2ZW50czogYm9vbGVhbiA9IHRydWUpOiBPcHRpb25Db21wb25lbnQgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcHRpb25BY3RpdmUob3B0aW9uKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNldFNlbGVjdGVkKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG9wdGlvbjtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZmlyZUV2ZW50cyk7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3RzIGFuIG9wdGlvbiBieSB2YWx1ZS4gSWYgdHdvIGNvbXBvbmVudHMgaGF2ZSB0aGUgc2FtZSB2YWx1ZSwgdGhlIGZpcnN0IG9uZSBmb3VuZCBpcyBzZWxlY3RlZC5cbiAgICAgKiBSZWNvbW1lbmQgdXNpbmcgc2VsZWN0T3B0aW9uIGdlbmVyYWxseS5cbiAgICAgKiBAcGFyYW0gdmFsdWUgVmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICAgKiBAcGFyYW0gZmlyZUV2ZW50cyBXaGV0aGVyIHRvIGZpcmUgY2hhbmdlIGV2ZW50cy5cbiAgICAgKi9cbiAgICBwcml2YXRlIHNlbGVjdFZhbHVlKHZhbHVlOiBhbnksIGZpcmVFdmVudHM6IGJvb2xlYW4gPSB0cnVlKTogT3B0aW9uQ29tcG9uZW50IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgbWF0Y2hPcHRpb24gPSB0aGlzLm9wdGlvbnMuZmluZCgob3B0aW9uOiBPcHRpb25Db21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24udmFsdWUgIT0gbnVsbCAmJiBvcHRpb24udmFsdWUgPT09IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJZiBub3QgbWF0Y2ggaXMgZm91bmQsIHNldCBldmVyeXRoaW5nIHRvIG51bGxcbiAgICAgICAgLy8gVGhpcyBpcyBtb3N0bHkgb25seSBmb3IgY2FzZXMgd2hlcmUgYSB1c2VyIHJlbW92ZXMgYW4gYWN0aXZlIG9wdGlvblxuICAgICAgICBpZiAoIW1hdGNoT3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnVuc2VsZWN0T3B0aW9ucygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbWF0Y2ggaXMgZm91bmQsIHNlbGVjdCB0aGUgbmV3IHZhbHVlXG4gICAgICAgIGlmIChtYXRjaE9wdGlvbiAmJiAhdGhpcy5pc09wdGlvbkFjdGl2ZShtYXRjaE9wdGlvbikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zZXRTZWxlY3RlZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2hPcHRpb24uc2V0U2VsZWN0ZWQodHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IG1hdGNoT3B0aW9uO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGZpcmVFdmVudHMpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoT3B0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHZhbHVlIHBhcmFtZXRlciB3aXRoIG9wdGlvbmFsIGV2ZW50cy5cbiAgICAgKiBAcGFyYW0gZmlyZUV2ZW50cyBJZiB0cnVlLCBmdW5jdGlvbiBmaXJlcyB2YWx1ZUNoYW5nZSwgb25DaGFuZ2UgYW5kIG9uVG91Y2hlZCBldmVudHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZShmaXJlRXZlbnRzOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5zZWxlY3RlZC52YWx1ZTtcbiAgICAgICAgaWYgKGZpcmVFdmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdXNlZCB0byByZXNldCB0aGUgb3B0aW9ucyBzdGF0ZS5cbiAgICAgKi9cbiAgICBwcml2YXRlIHJlc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgLy8gQ3JlYXRlIG9ic2VydmFibGUgdGhhdCBmaXJlcyB3aGVuIHRoZSBvcHRpb25zIGNoYW5nZSBvciB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAgICAgICAgY29uc3QgZGVzdHJveUN1cnJlbnRPYnMgPSBtZXJnZSh0aGlzLm9wdGlvbnMuY2hhbmdlcywgdGhpcy5kZXN0cm95JCk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIG9ic2VydmFibGUgZGVmaW5lZCBpbiBjb21wb25lbnQgcHJvcGVydGllcyB3aGljaCBmaXJlcyB3aGVuIGFuIG9wdGlvbiBpcyBjbGlja2VkLlxuICAgICAgICAvLyBEZXN0cm95IGlmIHRoZSBvYnNlcnZhYmxlIGRlZmluZWQgYWJvdmUgdHJpZ2dlcnMuXG4gICAgICAgIHRoaXMub3B0aW9uc1N0YXR1c0NoYW5nZXMucGlwZSh0YWtlVW50aWwoZGVzdHJveUN1cnJlbnRPYnMpKS5zdWJzY3JpYmUoKGluc3RhbmNlOiBPcHRpb25Db21wb25lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0T3B0aW9uKGluc3RhbmNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIFNlbGVjdGlvbiBpbml0aWFsaXphdGlvbiB3aGVuIGEgY2hhbmdlIG9jY3VycyBpbiBvcHRpb25zLiAqL1xuICAgIHByaXZhdGUgaW5pdFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFZhbHVlKHRoaXMudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgdGVzdHMgd2hldGhlciB0aGUgdGVzdGVkIG9wdGlvbiBpcyBjdXJyZW50bHkgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIG9wdGlvbiBPcHRpb24gdG8gdGVzdCBhZ2FpbnN0IHRoZSBzZWxlY3RlZCBvcHRpb24uXG4gICAgICovXG4gICAgcHJpdmF0ZSBpc09wdGlvbkFjdGl2ZShvcHRpb246IE9wdGlvbkNvbXBvbmVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gb3B0aW9uICYmIHRoaXMuc2VsZWN0ZWQgJiYgb3B0aW9uID09PSB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBmb2N1c2VzIHRoZSBuZXh0IG9wdGlvbiBpbiB0aGUgbGlzdCwgb3IgdGhlIGZpcnN0IG9uZSBpZiB0aGUgbGFzdCBvbmUgaXMgY3VycmVudGx5IGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBpbmNyZW1lbnRGb2N1c2VkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIEdldCBhY3RpdmUgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIEdldCBjb3JyZXNwb25kaW5nIG9wdGlvbiBlbGVtZW50IHRvIHRoZSBhYm92ZVxuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQob3B0aW9uID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uZ2V0SHRtbEVsZW1lbnQoKSA9PT0gYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5T3B0aW9ucyA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFycmF5T3B0aW9ucy5pbmRleE9mKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuXG4gICAgICAgICAgICAvLyBJZiBhY3RpdmUgb3B0aW9uIGlzIHRoZSBsYXN0IG9wdGlvbiwgZm9jdXMgdGhlIGZpcnN0IG9uZVxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBmb2N1cyB0aGUgbmV4dCBvcHRpb24uXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMub3B0aW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgYXJyYXlPcHRpb25zWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5T3B0aW9uc1tpbmRleCArIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBNZXRob2QgdGhhdCBmb2N1c2VzIHRoZSBwcmV2aW91cyBvcHRpb24gaW4gdGhlIGxpc3QsIG9yIHRoZSBsYXN0IG9uZSBpZiB0aGUgbGFzdCBvbmUgaXMgY3VycmVudGx5IGZvY3VzZWQuICovXG4gICAgcHJpdmF0ZSBkZWNyZW1lbnRGb2N1c2VkKCk6IHZvaWQge1xuXG4gICAgICAgIC8vIEdldCBhY3RpdmUgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIEdldCBjb3JyZXNwb25kaW5nIG9wdGlvbiBlbGVtZW50IHRvIHRoZSBhYm92ZVxuICAgICAgICBjb25zdCBjb3JyZXNwb25kaW5nT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQob3B0aW9uID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uZ2V0SHRtbEVsZW1lbnQoKSA9PT0gYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSWYgYWN0aXZlIG9wdGlvbiBpcyB0aGUgZmlyc3Qgb3B0aW9uLCBmb2N1cyB0aGUgbGFzdCBvbmVcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBmb2N1cyB0aGUgcHJldmlvdXMgb3B0aW9uLlxuICAgICAgICBpZiAoY29ycmVzcG9uZGluZ09wdGlvbikge1xuICAgICAgICAgICAgY29uc3QgYXJyYXlPcHRpb25zID0gdGhpcy5vcHRpb25zLnRvQXJyYXkoKTtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXJyYXlPcHRpb25zLmluZGV4T2YoY29ycmVzcG9uZGluZ09wdGlvbik7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFycmF5T3B0aW9uc1t0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXJyYXlPcHRpb25zW2luZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5maXJzdC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIHVzZWQgdG8gaGFuZGxlIGNhc2VzIHdoZXJlIGEgdXNlciByZW1vdmVzIHRoZSBjdXJyZW50bHkgYWN0aXZlIG9wdGlvbi5cbiAgICAgKiBUaGUgdGltZW91dCBpcyByZXF1aXJlZCBiZWNhdXNlIHRoaXMgY2FuIGhhcHBlbiBhZnRlciB0aGUgdmlldyBoYXMgYmVlbiBjaGVja2VkLlxuICAgICAqL1xuICAgIHByaXZhdGUgdW5zZWxlY3RPcHRpb25zKCk6IHZvaWQge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zZXRTZWxlY3RlZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG4iXX0=