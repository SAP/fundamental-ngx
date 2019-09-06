/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { OptionComponent } from './option/option.component';
import { defer, merge, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
/**
 * Select component intended to mimic the behaviour of the native select element.
 */
export class SelectComponent {
    constructor() {
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
        () => {
            /** @type {?} */
            const options = this.options;
            if (options) {
                return options.changes.pipe(startWith(options), switchMap((/**
                 * @return {?}
                 */
                () => merge(...options.map((/**
                 * @param {?} option
                 * @return {?}
                 */
                option => option.selectedChange))))));
            }
        }))));
        /**
         * @hidden
         */
        this.onChange = (/**
         * @return {?}
         */
        () => { });
        /**
         * @hidden
         */
        this.onTouched = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    isOpenChangeHandle(isOpen) {
        this.isOpen = isOpen;
        this.isOpenChange.emit(isOpen);
        this.resizeScrollHandler();
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.value) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                if (this.value) {
                    this.selectValue(this.value, false);
                }
            }));
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterContentInit() {
        // If the observable state changes, reset the options and initialize selection.
        this.options.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe((/**
         * @return {?}
         */
        () => {
            this.resetOptions();
            this.initSelection();
        }));
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * Toggles the open state of the select.
     * @return {?}
     */
    toggle() {
        if (this.isOpen && !this.disabled) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Opens the select popover body.
     * @return {?}
     */
    open() {
        if (!this.isOpen && !this.disabled) {
            this.isOpen = true;
            this.isOpenChange.emit(this.isOpen);
        }
    }
    /**
     * Closes the select popover body.
     * @return {?}
     */
    close() {
        if (this.isOpen && !this.disabled) {
            this.isOpen = false;
            this.isOpenChange.emit(this.isOpen);
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
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.options) {
            this.selectValue(value, false);
        }
        else {
            // Defer the selection of the value to support forms
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                if (this.options) {
                    this.selectValue(value, false);
                }
            }));
        }
    }
    /**
     * Returns the current trigger value if there is a selected option. Otherwise, returns the placeholder.
     * @return {?}
     */
    get triggerValue() {
        return this.selected ? this.selected.viewValueText : this.placeholder;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
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
    }
    /**
     * @hidden
     * @return {?}
     */
    resizeScrollHandler() {
        this.calculatedMaxHeight = window.innerHeight * 0.45;
    }
    /**
     * Selects an option by option component reference. Preferred method of selection.
     * @private
     * @param {?} option The option component to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    selectOption(option, fireEvents = true) {
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
    }
    /**
     * Selects an option by value. If two components have the same value, the first one found is selected.
     * Recommend using selectOption generally.
     * @private
     * @param {?} value Value to search for.
     * @param {?=} fireEvents Whether to fire change events.
     * @return {?}
     */
    selectValue(value, fireEvents = true) {
        /** @type {?} */
        const matchOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        (option) => {
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
    }
    /**
     * Updates the value parameter with optional events.
     * @private
     * @param {?=} fireEvents If true, function fires valueChange, onChange and onTouched events.
     * @return {?}
     */
    updateValue(fireEvents = true) {
        this.value = this.selected.value;
        if (fireEvents) {
            this.valueChange.emit(this.value);
            this.onChange(this.value);
            this.onTouched();
        }
    }
    /**
     * Function used to reset the options state.
     * @private
     * @return {?}
     */
    resetOptions() {
        // Create observable that fires when the options change or the component is destroyed.
        /** @type {?} */
        const destroyCurrentObs = merge(this.options.changes, this.destroy$);
        // Subscribe to observable defined in component properties which fires when an option is clicked.
        // Destroy if the observable defined above triggers.
        this.optionsStatusChanges.pipe(takeUntil(destroyCurrentObs)).subscribe((/**
         * @param {?} instance
         * @return {?}
         */
        (instance) => {
            this.selectOption(instance);
        }));
    }
    /**
     * Selection initialization when a change occurs in options.
     * @private
     * @return {?}
     */
    initSelection() {
        if (this.value) {
            this.selected = undefined;
            this.selectValue(this.value, false);
        }
    }
    /**
     * Function that tests whether the tested option is currently selected.
     * @private
     * @param {?} option Option to test against the selected option.
     * @return {?}
     */
    isOptionActive(option) {
        return option && this.selected && option === this.selected;
    }
    /**
     * Method that focuses the next option in the list, or the first one if the last one is currently focused.
     * @private
     * @return {?}
     */
    incrementFocused() {
        // Get active focused element
        /** @type {?} */
        const activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        const correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            return option.getHtmlElement() === activeElement;
        }));
        if (correspondingOption) {
            /** @type {?} */
            const arrayOptions = this.options.toArray();
            /** @type {?} */
            const index = arrayOptions.indexOf(correspondingOption);
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
    }
    /**
     * Method that focuses the previous option in the list, or the last one if the last one is currently focused.
     * @private
     * @return {?}
     */
    decrementFocused() {
        // Get active focused element
        /** @type {?} */
        const activeElement = document.activeElement;
        // Get corresponding option element to the above
        /** @type {?} */
        const correspondingOption = this.options.find((/**
         * @param {?} option
         * @return {?}
         */
        option => {
            return option.getHtmlElement() === activeElement;
        }));
        // If active option is the first option, focus the last one
        // Otherwise, focus the previous option.
        if (correspondingOption) {
            /** @type {?} */
            const arrayOptions = this.options.toArray();
            /** @type {?} */
            const index = arrayOptions.indexOf(correspondingOption);
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
    }
    /**
     * Method used to handle cases where a user removes the currently active option.
     * The timeout is required because this can happen after the view has been checked.
     * @private
     * @return {?}
     */
    unselectOptions() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            if (this.selected) {
                this.selected.setSelected(false, false);
            }
            this.selected = undefined;
            this.value = undefined;
            this.valueChange.emit(undefined);
            this.onChange(undefined);
        }));
    }
}
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
                        () => SelectComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvc2VsZWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxlQUFlLEVBQ2YsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUNuRCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFBaUIsV0FBVyxFQUNyQyxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUF3QmpFLE1BQU0sT0FBTyxlQUFlO0lBakI1Qjs7OztRQXFCSSxvQkFBZSxHQUFZLElBQUksQ0FBQzs7OztRQVFoQyxhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBUTFCLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFReEIsWUFBTyxHQUFZLEtBQUssQ0FBQzs7OztRQVF6QixrQkFBYSxHQUFrQjtZQUMzQixTQUFTLEVBQUUsY0FBYztZQUN6QixTQUFTLEVBQUU7Z0JBQ1AsZUFBZSxFQUFFO29CQUNiLE9BQU8sRUFBRSxJQUFJO29CQUNiLG1CQUFtQixFQUFFLElBQUk7b0JBQ3pCLGlCQUFpQixFQUFFLGNBQWM7aUJBQ3BDO2FBQ0o7U0FDSixDQUFDOzs7Ozs7O1FBU0Ysb0JBQWUsR0FBb0IsVUFBVSxDQUFDOzs7O1FBWXJDLGlCQUFZLEdBQ2YsSUFBSSxZQUFZLEVBQVcsQ0FB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b250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgQ29udGVudENoaWxkcmVuLFxuICAgIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lcixcbiAgICBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPcHRpb25Db21wb25lbnQgfSBmcm9tICcuL29wdGlvbi9vcHRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmVyLCBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBvcHBlck9wdGlvbnMgfSBmcm9tICdwb3BwZXIuanMnO1xuaW1wb3J0IHsgUG9wb3ZlckZpbGxNb2RlIH0gZnJvbSAnLi4vcG9wb3Zlci9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogU2VsZWN0IGNvbXBvbmVudCBpbnRlbmRlZCB0byBtaW1pYyB0aGUgYmVoYXZpb3VyIG9mIHRoZSBuYXRpdmUgc2VsZWN0IGVsZW1lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtc2VsZWN0LWN1c3RvbV0nOiAndHJ1ZScsXG4gICAgICAgICdyb2xlJzogJ2xpc3Rib3gnLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3ksIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1kcm9wZG93bicpXG4gICAgZmREcm9wZG93bkNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihPcHRpb25Db21wb25lbnQsIHsgZGVzY2VuZGFudHM6IHRydWUgfSlcbiAgICBvcHRpb25zOiBRdWVyeUxpc3Q8T3B0aW9uQ29tcG9uZW50PjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWxlY3QgY29tcG9uZW50IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIHNlbGVjdC4gQXBwZWFycyBpbiB0aGUgdHJpZ2dlcmJveCBpZiBubyBvcHRpb24gaXMgc2VsZWN0ZWQuICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqIE9wZW4gc3RhdGUgb2YgdGhlIHNlbGVjdC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEN1cnJlbnQgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIG9wdGlvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VsZWN0IGlzIGluIGNvbXBhY3QgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBNYXggaGVpZ2h0IG9mIHRoZSBwb3BvdmVyLiBBbnkgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2lsbCBiZSBhY2Nlc3NpYmxlIHRocm91Z2ggc2Nyb2xsaW5nLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4SGVpZ2h0OiBzdHJpbmc7XG5cbiAgICAvKiogUG9wcGVyLmpzIG9wdGlvbnMgb2YgdGhlIHBvcG92ZXIuICovXG4gICAgQElucHV0KClcbiAgICBwb3BwZXJPcHRpb25zOiBQb3BwZXJPcHRpb25zID0ge1xuICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20tc3RhcnQnLFxuICAgICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgZXNjYXBlV2l0aFJlZmVyZW5jZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogJ3Njcm9sbFBhcmVudCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcmVzZXQgb3B0aW9ucyBmb3IgdGhlIHBvcG92ZXIgYm9keSB3aWR0aC5cbiAgICAgKiAqIGBhdC1sZWFzdGAgd2lsbCBhcHBseSBhIG1pbmltdW0gd2lkdGggdG8gdGhlIGJvZHkgZXF1aXZhbGVudCB0byB0aGUgd2lkdGggb2YgdGhlIGNvbnRyb2wuXG4gICAgICogKiBgZXF1YWxgIHdpbGwgYXBwbHkgYSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIExlYXZlIGJsYW5rIGZvciBubyBlZmZlY3QuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWxsQ29udHJvbE1vZGU6IFBvcG92ZXJGaWxsTW9kZSA9ICdhdC1sZWFzdCc7XG5cbiAgICAvKiogVGVtcGxhdGUgd2l0aCB3aGljaCB0byBkaXNwbGF5IHRoZSB0cmlnZ2VyIGJveC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHRyaWdnZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIC8qKiBUaGUgZWxlbWVudCB0byB3aGljaCB0aGUgcG9wb3ZlciBzaG91bGQgYmUgYXBwZW5kZWQuICovXG4gICAgQElucHV0KClcbiAgICBhcHBlbmRUbzogSFRNTEVsZW1lbnQgfCAnYm9keSc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwb3BvdmVyIG9wZW4gc3RhdGUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpc09wZW5DaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlbGVjdGVkIHZhbHVlIG9mIHRoZSBzZWxlY3QgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT5cbiAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY2FsY3VsYXRlZE1heEhlaWdodDogbnVtYmVyO1xuXG4gICAgLyoqIEN1cnJlbnQgc2VsZWN0ZWQgb3B0aW9uIGNvbXBvbmVudCByZWZlcmVuY2UuICovXG4gICAgcHJpdmF0ZSBzZWxlY3RlZDogT3B0aW9uQ29tcG9uZW50O1xuXG4gICAgLyoqIFN1YmplY3QgdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogT2JzZXJ2YWJsZSB0cmlnZ2VyZWQgd2hlbiBhbiBvcHRpb24gaGFzIGl0cyBzZWxlY3RlZENoYW5nZSBldmVudCBmaXJlLiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb3B0aW9uc1N0YXR1c0NoYW5nZXM6IE9ic2VydmFibGU8T3B0aW9uQ29tcG9uZW50PiA9IGRlZmVyKCgpID0+IHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgob3B0aW9ucyksXG4gICAgICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+IG1lcmdlKC4uLm9wdGlvbnMubWFwKG9wdGlvbiA9PiBvcHRpb24uc2VsZWN0ZWRDaGFuZ2UpKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KSBhcyBPYnNlcnZhYmxlPE9wdGlvbkNvbXBvbmVudD47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbkNoYW5nZUhhbmRsZShpc09wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBpc09wZW47XG4gICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQoaXNPcGVuKTtcbiAgICAgICAgdGhpcy5yZXNpemVTY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmIChjaGFuZ2VzLnZhbHVlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFZhbHVlKHRoaXMudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIElmIHRoZSBvYnNlcnZhYmxlIHN0YXRlIGNoYW5nZXMsIHJlc2V0IHRoZSBvcHRpb25zIGFuZCBpbml0aWFsaXplIHNlbGVjdGlvbi5cbiAgICAgICAgdGhpcy5vcHRpb25zLmNoYW5nZXMucGlwZShzdGFydFdpdGgobnVsbCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRPcHRpb25zKCk7XG4gICAgICAgICAgICB0aGlzLmluaXRTZWxlY3Rpb24oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVG9nZ2xlcyB0aGUgb3BlbiBzdGF0ZSBvZiB0aGUgc2VsZWN0LiAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBPcGVucyB0aGUgc2VsZWN0IHBvcG92ZXIgYm9keS4gKi9cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuaXNPcGVuICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbkNoYW5nZS5lbWl0KHRoaXMuaXNPcGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBDbG9zZXMgdGhlIHNlbGVjdCBwb3BvdmVyIGJvZHkuICovXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzT3BlbiAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlLmVtaXQodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VmFsdWUodmFsdWUsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIERlZmVyIHRoZSBzZWxlY3Rpb24gb2YgdGhlIHZhbHVlIHRvIHN1cHBvcnQgZm9ybXNcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSh2YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIGN1cnJlbnQgdHJpZ2dlciB2YWx1ZSBpZiB0aGVyZSBpcyBhIHNlbGVjdGVkIG9wdGlvbi4gT3RoZXJ3aXNlLCByZXR1cm5zIHRoZSBwbGFjZWhvbGRlci4gKi9cbiAgICBnZXQgdHJpZ2dlclZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkID8gdGhpcy5zZWxlY3RlZC52aWV3VmFsdWVUZXh0IDogdGhpcy5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIGtleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAoJ0Fycm93VXAnKToge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZW1lbnRGb2N1c2VkKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlICgnQXJyb3dEb3duJyk6IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaW5jcmVtZW50Rm9jdXNlZCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICByZXNpemVTY3JvbGxIYW5kbGVyKCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZWRNYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiAwLjQ1O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdHMgYW4gb3B0aW9uIGJ5IG9wdGlvbiBjb21wb25lbnQgcmVmZXJlbmNlLiBQcmVmZXJyZWQgbWV0aG9kIG9mIHNlbGVjdGlvbi5cbiAgICAgKiBAcGFyYW0gb3B0aW9uIFRoZSBvcHRpb24gY29tcG9uZW50IHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIGZpcmVFdmVudHMgV2hldGhlciB0byBmaXJlIGNoYW5nZSBldmVudHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RPcHRpb24ob3B0aW9uOiBPcHRpb25Db21wb25lbnQsIGZpcmVFdmVudHM6IGJvb2xlYW4gPSB0cnVlKTogT3B0aW9uQ29tcG9uZW50IHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzT3B0aW9uQWN0aXZlKG9wdGlvbikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zZXRTZWxlY3RlZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3B0aW9uLnNldFNlbGVjdGVkKHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBvcHRpb247XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlKGZpcmVFdmVudHMpO1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0cyBhbiBvcHRpb24gYnkgdmFsdWUuIElmIHR3byBjb21wb25lbnRzIGhhdmUgdGhlIHNhbWUgdmFsdWUsIHRoZSBmaXJzdCBvbmUgZm91bmQgaXMgc2VsZWN0ZWQuXG4gICAgICogUmVjb21tZW5kIHVzaW5nIHNlbGVjdE9wdGlvbiBnZW5lcmFsbHkuXG4gICAgICogQHBhcmFtIHZhbHVlIFZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAgICogQHBhcmFtIGZpcmVFdmVudHMgV2hldGhlciB0byBmaXJlIGNoYW5nZSBldmVudHMuXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWxlY3RWYWx1ZSh2YWx1ZTogYW55LCBmaXJlRXZlbnRzOiBib29sZWFuID0gdHJ1ZSk6IE9wdGlvbkNvbXBvbmVudCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IG1hdGNoT3B0aW9uID0gdGhpcy5vcHRpb25zLmZpbmQoKG9wdGlvbjogT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlICE9IG51bGwgJiYgb3B0aW9uLnZhbHVlID09PSB2YWx1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSWYgbm90IG1hdGNoIGlzIGZvdW5kLCBzZXQgZXZlcnl0aGluZyB0byBudWxsXG4gICAgICAgIC8vIFRoaXMgaXMgbW9zdGx5IG9ubHkgZm9yIGNhc2VzIHdoZXJlIGEgdXNlciByZW1vdmVzIGFuIGFjdGl2ZSBvcHRpb25cbiAgICAgICAgaWYgKCFtYXRjaE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy51bnNlbGVjdE9wdGlvbnMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG1hdGNoIGlzIGZvdW5kLCBzZWxlY3QgdGhlIG5ldyB2YWx1ZVxuICAgICAgICBpZiAobWF0Y2hPcHRpb24gJiYgIXRoaXMuaXNPcHRpb25BY3RpdmUobWF0Y2hPcHRpb24pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc2V0U2VsZWN0ZWQoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hdGNoT3B0aW9uLnNldFNlbGVjdGVkKHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBtYXRjaE9wdGlvbjtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVWYWx1ZShmaXJlRXZlbnRzKTtcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRjaE9wdGlvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB2YWx1ZSBwYXJhbWV0ZXIgd2l0aCBvcHRpb25hbCBldmVudHMuXG4gICAgICogQHBhcmFtIGZpcmVFdmVudHMgSWYgdHJ1ZSwgZnVuY3Rpb24gZmlyZXMgdmFsdWVDaGFuZ2UsIG9uQ2hhbmdlIGFuZCBvblRvdWNoZWQgZXZlbnRzLlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlVmFsdWUoZmlyZUV2ZW50czogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuc2VsZWN0ZWQudmFsdWU7XG4gICAgICAgIGlmIChmaXJlRXZlbnRzKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHVzZWQgdG8gcmVzZXQgdGhlIG9wdGlvbnMgc3RhdGUuXG4gICAgICovXG4gICAgcHJpdmF0ZSByZXNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIC8vIENyZWF0ZSBvYnNlcnZhYmxlIHRoYXQgZmlyZXMgd2hlbiB0aGUgb3B0aW9ucyBjaGFuZ2Ugb3IgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gICAgICAgIGNvbnN0IGRlc3Ryb3lDdXJyZW50T2JzID0gbWVyZ2UodGhpcy5vcHRpb25zLmNoYW5nZXMsIHRoaXMuZGVzdHJveSQpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBvYnNlcnZhYmxlIGRlZmluZWQgaW4gY29tcG9uZW50IHByb3BlcnRpZXMgd2hpY2ggZmlyZXMgd2hlbiBhbiBvcHRpb24gaXMgY2xpY2tlZC5cbiAgICAgICAgLy8gRGVzdHJveSBpZiB0aGUgb2JzZXJ2YWJsZSBkZWZpbmVkIGFib3ZlIHRyaWdnZXJzLlxuICAgICAgICB0aGlzLm9wdGlvbnNTdGF0dXNDaGFuZ2VzLnBpcGUodGFrZVVudGlsKGRlc3Ryb3lDdXJyZW50T2JzKSkuc3Vic2NyaWJlKChpbnN0YW5jZTogT3B0aW9uQ29tcG9uZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdE9wdGlvbihpbnN0YW5jZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKiBTZWxlY3Rpb24gaW5pdGlhbGl6YXRpb24gd2hlbiBhIGNoYW5nZSBvY2N1cnMgaW4gb3B0aW9ucy4gKi9cbiAgICBwcml2YXRlIGluaXRTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSh0aGlzLnZhbHVlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHRlc3RzIHdoZXRoZXIgdGhlIHRlc3RlZCBvcHRpb24gaXMgY3VycmVudGx5IHNlbGVjdGVkLlxuICAgICAqIEBwYXJhbSBvcHRpb24gT3B0aW9uIHRvIHRlc3QgYWdhaW5zdCB0aGUgc2VsZWN0ZWQgb3B0aW9uLlxuICAgICAqL1xuICAgIHByaXZhdGUgaXNPcHRpb25BY3RpdmUob3B0aW9uOiBPcHRpb25Db21wb25lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbiAmJiB0aGlzLnNlbGVjdGVkICYmIG9wdGlvbiA9PT0gdGhpcy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgZm9jdXNlcyB0aGUgbmV4dCBvcHRpb24gaW4gdGhlIGxpc3QsIG9yIHRoZSBmaXJzdCBvbmUgaWYgdGhlIGxhc3Qgb25lIGlzIGN1cnJlbnRseSBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgaW5jcmVtZW50Rm9jdXNlZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBHZXQgYWN0aXZlIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBHZXQgY29ycmVzcG9uZGluZyBvcHRpb24gZWxlbWVudCB0byB0aGUgYWJvdmVcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLmdldEh0bWxFbGVtZW50KCkgPT09IGFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjb3JyZXNwb25kaW5nT3B0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBhcnJheU9wdGlvbnMgPSB0aGlzLm9wdGlvbnMudG9BcnJheSgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhcnJheU9wdGlvbnMuaW5kZXhPZihjb3JyZXNwb25kaW5nT3B0aW9uKTtcblxuICAgICAgICAgICAgLy8gSWYgYWN0aXZlIG9wdGlvbiBpcyB0aGUgbGFzdCBvcHRpb24sIGZvY3VzIHRoZSBmaXJzdCBvbmVcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgZm9jdXMgdGhlIG5leHQgb3B0aW9uLlxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLm9wdGlvbnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIGFycmF5T3B0aW9uc1swXS5mb2N1cygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcnJheU9wdGlvbnNbaW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmZpcnN0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogTWV0aG9kIHRoYXQgZm9jdXNlcyB0aGUgcHJldmlvdXMgb3B0aW9uIGluIHRoZSBsaXN0LCBvciB0aGUgbGFzdCBvbmUgaWYgdGhlIGxhc3Qgb25lIGlzIGN1cnJlbnRseSBmb2N1c2VkLiAqL1xuICAgIHByaXZhdGUgZGVjcmVtZW50Rm9jdXNlZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBHZXQgYWN0aXZlIGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBHZXQgY29ycmVzcG9uZGluZyBvcHRpb24gZWxlbWVudCB0byB0aGUgYWJvdmVcbiAgICAgICAgY29uc3QgY29ycmVzcG9uZGluZ09wdGlvbiA9IHRoaXMub3B0aW9ucy5maW5kKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLmdldEh0bWxFbGVtZW50KCkgPT09IGFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIElmIGFjdGl2ZSBvcHRpb24gaXMgdGhlIGZpcnN0IG9wdGlvbiwgZm9jdXMgdGhlIGxhc3Qgb25lXG4gICAgICAgIC8vIE90aGVyd2lzZSwgZm9jdXMgdGhlIHByZXZpb3VzIG9wdGlvbi5cbiAgICAgICAgaWYgKGNvcnJlc3BvbmRpbmdPcHRpb24pIHtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5T3B0aW9ucyA9IHRoaXMub3B0aW9ucy50b0FycmF5KCk7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IGFycmF5T3B0aW9ucy5pbmRleE9mKGNvcnJlc3BvbmRpbmdPcHRpb24pO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICBhcnJheU9wdGlvbnNbdGhpcy5vcHRpb25zLmxlbmd0aCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFycmF5T3B0aW9uc1tpbmRleCAtIDFdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB1c2VkIHRvIGhhbmRsZSBjYXNlcyB3aGVyZSBhIHVzZXIgcmVtb3ZlcyB0aGUgY3VycmVudGx5IGFjdGl2ZSBvcHRpb24uXG4gICAgICogVGhlIHRpbWVvdXQgaXMgcmVxdWlyZWQgYmVjYXVzZSB0aGlzIGNhbiBoYXBwZW4gYWZ0ZXIgdGhlIHZpZXcgaGFzIGJlZW4gY2hlY2tlZC5cbiAgICAgKi9cbiAgICBwcml2YXRlIHVuc2VsZWN0T3B0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc2V0U2VsZWN0ZWQoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19