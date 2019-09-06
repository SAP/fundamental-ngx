/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
export class MultiInputComponent {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        /**
         * @hidden
         */
        this.multiInputClass = true;
        /**
         * Placeholder for the input field.
         */
        this.placeholder = '';
        /**
         * Whether the input is disabled.
         */
        this.disabled = false;
        /**
         * Whether the input is in compact mode.
         */
        this.compact = false;
        /**
         * Max height of the popover. Any overflowing elements will be accessible through scrolling.
         */
        this.maxHeight = '300px';
        /**
         * Icon of the button on the right of the input field.
         */
        this.glyph = 'navigation-down-arrow';
        /**
         * Values to be displayed in the unfiltered dropdown.
         */
        this.dropdownValues = [];
        /**
         * Whether the search term should be highlighted in results.
         */
        this.highlight = true;
        /**
         * Selected dropdown items.
         */
        this.selected = [];
        /**
         * Filter function. Accepts an array and a string as arguments, and outputs an array.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See multi input examples for details.
         */
        this.filterFn = this.defaultFilter;
        /**
         * Display function. Accepts an object of the same type as the
         * items passed to dropdownValues as argument, and outputs a string.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See multi input examples for details.
         */
        this.displayFn = this.defaultDisplay;
        /**
         * Aria label for the multi input body.
         */
        this.multiInputBodyLabel = 'Multi input body';
        /**
         * Preset options for the popover body width.
         * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
         * * `equal` will apply a width to the body equivalent to the width of the control.
         * * Leave blank for no effect.
         */
        this.fillControlMode = 'at-least';
        /**
         * Event emitted when the search term changes. Use *$event* to access the new term.
         */
        this.searchTermChange = new EventEmitter();
        /**
         * Event emitted when the selected items change. Use *$event* to access the new selected array.
         */
        this.selectedChange = new EventEmitter();
        /**
         * @hidden
         */
        this.displayedValues = [];
        /**
         * @hidden
         */
        this.isOpen = false;
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
     * @return {?}
     */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
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
     * @param {?} selected
     * @return {?}
     */
    writeValue(selected) {
        if (selected) {
            this.selected = selected;
        }
    }
    /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    handleSelect(checked, value) {
        /** @type {?} */
        const previousLength = this.selected.length;
        if (checked) {
            this.selected.push(value);
        }
        else {
            this.selected.splice(this.selected.indexOf(value), 1);
        }
        // Handle popover placement update
        if ((previousLength === 0 && this.selected.length === 1) ||
            (previousLength === 1 && this.selected.length === 0)) {
            this.popoverRef.updatePopover();
        }
        this.onChange(this.selected);
        this.selectedChange.emit(this.selected);
    }
    /**
     * @hidden
     * @return {?}
     */
    handleSearchTermChange() {
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this.popoverRef.updatePopover();
    }
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    defaultFilter(contentArray, searchTerm) {
        /** @type {?} */
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    defaultDisplay(str) {
        return str;
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        event.stopPropagation();
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}
MultiInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-multi-input',
                template: "<div class=\"fd-multi-input-field\">\n    <fd-popover [(isOpen)]=\"isOpen\"\n                [triggers]=\"[]\"\n                [disabled]=\"disabled\"\n                [fillControlMode]=\"fillControlMode\"\n                class=\"fd-multi-input-popover-custom\">\n        <fd-popover-control>\n            <div class=\"fd-combobox-control\"\n                 [attr.aria-label]=\"multiInputBodyLabel\"\n                 [attr.aria-expanded]=\"isOpen\">\n                <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                    <input type=\"text\" class=\"fd-input\"\n                           [ngClass]=\"{'fd-input--compact': compact}\"\n                           [placeholder]=\"placeholder\"\n                           [disabled]=\"disabled\"\n                           [(ngModel)]=\"searchTerm\"\n                           (ngModelChange)=\"handleSearchTermChange()\"\n                           (keypress)=\"isOpen = true\"\n                           (click)=\"isOpen = !isOpen\">\n                    <span class=\"fd-input-group__addon fd-input-group__addon--after\n                        fd-input-group__addon--button\">\n                            <button class=\"fd-button--light\" type=\"button\"\n                                    [ngClass]=\"('sap-icon--' + glyph)\"\n                                    [disabled]=\"disabled\"\n                                    (click)=\"isOpen = !isOpen\"></button>\n                        </span>\n                </div>\n            </div>\n        </fd-popover-control>\n        <fd-popover-body [attr.aria-hidden]=\"!isOpen\">\n            <fd-menu class=\"fd-multi-input-menu-overflow\"\n                     *ngIf=\"displayedValues && displayedValues.length\"\n                     [style.maxHeight]=\"maxHeight\">\n                <ul fd-menu-list>\n                    <li *ngFor=\"let value of displayedValues\">\n                        <label fd-menu-item>\n                            <input type=\"checkbox\" class=\"fd-checkbox\"\n                                   [ngModel]=\"selected ? selected.indexOf(value) !== -1 : false\"\n                                   (ngModelChange)=\"handleSelect($event, value)\">\n                            <span [innerHtml]=\"value | displayFnPipe:displayFn | highlight:searchTerm:highlight\"></span>\n                        </label>\n                    </li>\n                </ul>\n            </fd-menu>\n            <ng-content></ng-content>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n<div class=\"fd-multi-input-tags\">\n    <fd-token \n            *ngFor=\"let token of selected\"\n            [disabled]=this.disabled\n            (onCloseClick)=\"handleSelect(false, token)\"\n            class=\"fd-multi-input-token-spacing\">\n        {{token | displayFnPipe:displayFn}}\n    </fd-token>\n</div>\n\n",
                host: {
                    '(blur)': 'onTouched()',
                    '[class.fd-multi-input-custom]': 'true'
                },
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => MultiInputComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [".fd-multi-input-custom{display:block}.fd-multi-input-custom .fd-multi-input-popover-size{overflow:auto;display:block}.fd-multi-input-custom .fd-multi-input-popover-custom{display:block}.fd-multi-input-custom .fd-multi-input-menu-overflow{overflow:auto}.fd-multi-input-custom .fd-multi-input-token-spacing{margin:0 4px 4px 0}.fd-multi-input-custom .fd-multi-input-token-spacing:last-child{margin-right:0}"]
            }] }
];
/** @nocollapse */
MultiInputComponent.ctorParameters = () => [
    { type: ElementRef }
];
MultiInputComponent.propDecorators = {
    popoverRef: [{ type: ViewChild, args: [PopoverComponent,] }],
    multiInputClass: [{ type: HostBinding, args: ['class.fd-multi-input',] }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    compact: [{ type: Input }],
    maxHeight: [{ type: Input }],
    glyph: [{ type: Input }],
    dropdownValues: [{ type: Input }],
    searchTerm: [{ type: Input }],
    highlight: [{ type: Input }],
    selected: [{ type: Input }],
    filterFn: [{ type: Input }],
    displayFn: [{ type: Input }],
    multiInputBodyLabel: [{ type: Input }],
    fillControlMode: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    selectedChange: [{ type: Output }],
    clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.popoverRef;
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.multiInputClass;
    /**
     * Placeholder for the input field.
     * @type {?}
     */
    MultiInputComponent.prototype.placeholder;
    /**
     * Whether the input is disabled.
     * @type {?}
     */
    MultiInputComponent.prototype.disabled;
    /**
     * Whether the input is in compact mode.
     * @type {?}
     */
    MultiInputComponent.prototype.compact;
    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling.
     * @type {?}
     */
    MultiInputComponent.prototype.maxHeight;
    /**
     * Icon of the button on the right of the input field.
     * @type {?}
     */
    MultiInputComponent.prototype.glyph;
    /**
     * Values to be displayed in the unfiltered dropdown.
     * @type {?}
     */
    MultiInputComponent.prototype.dropdownValues;
    /**
     * Search term, or more specifically the value of the inner input field.
     * @type {?}
     */
    MultiInputComponent.prototype.searchTerm;
    /**
     * Whether the search term should be highlighted in results.
     * @type {?}
     */
    MultiInputComponent.prototype.highlight;
    /**
     * Selected dropdown items.
     * @type {?}
     */
    MultiInputComponent.prototype.selected;
    /**
     * Filter function. Accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     * @type {?}
     */
    MultiInputComponent.prototype.filterFn;
    /**
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details.
     * @type {?}
     */
    MultiInputComponent.prototype.displayFn;
    /**
     * Aria label for the multi input body.
     * @type {?}
     */
    MultiInputComponent.prototype.multiInputBodyLabel;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     * @type {?}
     */
    MultiInputComponent.prototype.fillControlMode;
    /**
     * Event emitted when the search term changes. Use *$event* to access the new term.
     * @type {?}
     */
    MultiInputComponent.prototype.searchTermChange;
    /**
     * Event emitted when the selected items change. Use *$event* to access the new selected array.
     * @type {?}
     */
    MultiInputComponent.prototype.selectedChange;
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.displayedValues;
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.isOpen;
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    MultiInputComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    MultiInputComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL211bHRpLWlucHV0L211bHRpLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7QUEwQmhFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBNkY1QixZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBckZyQyxvQkFBZSxHQUFHLElBQUksQ0FBQzs7OztRQUl2QixnQkFBVyxHQUFXLEVBQUUsQ0FBQzs7OztRQUl6QixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBSTFCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsY0FBUyxHQUFXLE9BQU8sQ0FBQzs7OztRQUk1QixVQUFLLEdBQVcsdUJBQXVCLENBQUM7Ozs7UUFJeEMsbUJBQWMsR0FBVSxFQUFFLENBQUM7Ozs7UUFRM0IsY0FBUyxHQUFZLElBQUksQ0FBQzs7OztRQUkxQixhQUFRLEdBQVUsRUFBRSxDQUFDOzs7Ozs7UUFNckIsYUFBUSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7UUFPeEMsY0FBUyxHQUFhLElBQUksQ0FBQyxjQUFjLENBQUM7Ozs7UUFJMUMsd0JBQW1CLEdBQVcsa0JBQWtCLENBQUM7Ozs7Ozs7UUFTakQsb0JBQWUsR0FBb0IsVUFBVSxDQUFDOzs7O1FBSXJD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O3dCQUlMLEtBQUs7b0JBSUwsS0FBSzs2QkFJTCxLQUFLO3lCQUlMLEtBQUs7d0JBSUwsS0FBSzt1QkFJTCxLQUFLO3VCQU1MLEtBQUs7d0JBT0wsS0FBSztrQ0FJTCxLQUFLOzhCQVNMLEtBQUs7K0JBSUwsTUFBTTs2QkFJTixNQUFNOzJCQWtHTixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7SUE1SzFDLHlDQUM2Qjs7Ozs7SUFHN0IsOENBQ3VCOzs7OztJQUd2QiwwQ0FDeUI7Ozs7O0lBR3pCLHVDQUMwQjs7Ozs7SUFHMUIsc0NBQ3lCOzs7OztJQUd6Qix3Q0FDNEI7Ozs7O0lBRzVCLG9DQUN3Qzs7Ozs7SUFHeEMsNkNBQzJCOzs7OztJQUczQix5Q0FDbUI7Ozs7O0lBR25CLHdDQUMwQjs7Ozs7SUFHMUIsdUNBQ3FCOzs7Ozs7O0lBS3JCLHVDQUN3Qzs7Ozs7Ozs7SUFNeEMsd0NBQzBDOzs7OztJQUcxQyxrREFDaUQ7Ozs7Ozs7O0lBUWpELDhDQUM4Qzs7Ozs7SUFHOUMsK0NBQzZFOzs7OztJQUc3RSw2Q0FDeUU7Ozs7O0lBR3pFLDhDQUE0Qjs7Ozs7SUFHNUIscUNBQWU7Ozs7O0lBR2YsdUNBQStCOzs7OztJQUcvQix3Q0FBZ0M7Ozs7O0lBR3BCLG9DQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIEVsZW1lbnRSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIGZvcndhcmRSZWYsXG4gICAgSG9zdEJpbmRpbmcsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbXBvbmVudCB9IGZyb20gJy4uL3BvcG92ZXIvcG9wb3Zlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wb3ZlckZpbGxNb2RlIH0gZnJvbSAnLi4vcG9wb3Zlci9wb3BvdmVyLWRpcmVjdGl2ZS9wb3BvdmVyLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogSW5wdXQgZmllbGQgd2l0aCBtdWx0aXBsZSBzZWxlY3Rpb24gZW5hYmxlZC4gU2hvdWxkIGJlIHVzZWQgd2hlbiBhIHVzZXIgY2FuIHNlbGVjdCBiZXR3ZWVuIGFcbiAqIGxpbWl0ZWQgbnVtYmVyIG9mIHByZS1kZWZpbmVkIG9wdGlvbnMgd2l0aCBhIGZpbHRlci1lbmFibGVkIGNvbnRleHQuXG4gKlxuICogU3VwcG9ydHMgQW5ndWxhciBGb3Jtcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1tdWx0aS1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL211bHRpLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tdWx0aS1pbnB1dC5jb21wb25lbnQuc2NzcyddLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXG4gICAgICAgICdbY2xhc3MuZmQtbXVsdGktaW5wdXQtY3VzdG9tXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlJbnB1dENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKFBvcG92ZXJDb21wb25lbnQpXG4gICAgcG9wb3ZlclJlZjogUG9wb3ZlckNvbXBvbmVudDtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tdWx0aS1pbnB1dCcpXG4gICAgbXVsdGlJbnB1dENsYXNzID0gdHJ1ZTtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGZpZWxkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBpbiBjb21wYWN0IG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogTWF4IGhlaWdodCBvZiB0aGUgcG9wb3Zlci4gQW55IG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpbGwgYmUgYWNjZXNzaWJsZSB0aHJvdWdoIHNjcm9sbGluZy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1heEhlaWdodDogc3RyaW5nID0gJzMwMHB4JztcblxuICAgIC8qKiBJY29uIG9mIHRoZSBidXR0b24gb24gdGhlIHJpZ2h0IG9mIHRoZSBpbnB1dCBmaWVsZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdseXBoOiBzdHJpbmcgPSAnbmF2aWdhdGlvbi1kb3duLWFycm93JztcblxuICAgIC8qKiBWYWx1ZXMgdG8gYmUgZGlzcGxheWVkIGluIHRoZSB1bmZpbHRlcmVkIGRyb3Bkb3duLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHJvcGRvd25WYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICAvKiogU2VhcmNoIHRlcm0sIG9yIG1vcmUgc3BlY2lmaWNhbGx5IHRoZSB2YWx1ZSBvZiB0aGUgaW5uZXIgaW5wdXQgZmllbGQuICovXG4gICAgQElucHV0KClcbiAgICBzZWFyY2hUZXJtOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VhcmNoIHRlcm0gc2hvdWxkIGJlIGhpZ2hsaWdodGVkIGluIHJlc3VsdHMuICovXG4gICAgQElucHV0KClcbiAgICBoaWdobGlnaHQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFNlbGVjdGVkIGRyb3Bkb3duIGl0ZW1zLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VsZWN0ZWQ6IGFueVtdID0gW107XG5cbiAgICAvKiogRmlsdGVyIGZ1bmN0aW9uLiBBY2NlcHRzIGFuIGFycmF5IGFuZCBhIHN0cmluZyBhcyBhcmd1bWVudHMsIGFuZCBvdXRwdXRzIGFuIGFycmF5LlxuICAgICAqIEFuIGFycm93IGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIGFjY2VzcyB0aGUgKnRoaXMqIGtleXdvcmQgaW4gdGhlIGNhbGxpbmcgY29tcG9uZW50LlxuICAgICAqIFNlZSBtdWx0aSBpbnB1dCBleGFtcGxlcyBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbHRlckZuOiBGdW5jdGlvbiA9IHRoaXMuZGVmYXVsdEZpbHRlcjtcblxuICAgIC8qKiBEaXNwbGF5IGZ1bmN0aW9uLiBBY2NlcHRzIGFuIG9iamVjdCBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoZVxuICAgICAqIGl0ZW1zIHBhc3NlZCB0byBkcm9wZG93blZhbHVlcyBhcyBhcmd1bWVudCwgYW5kIG91dHB1dHMgYSBzdHJpbmcuXG4gICAgICogQW4gYXJyb3cgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSAqdGhpcyoga2V5d29yZCBpbiB0aGUgY2FsbGluZyBjb21wb25lbnQuXG4gICAgICogU2VlIG11bHRpIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUZuOiBGdW5jdGlvbiA9IHRoaXMuZGVmYXVsdERpc3BsYXk7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIG11bHRpIGlucHV0IGJvZHkuICovXG4gICAgQElucHV0KClcbiAgICBtdWx0aUlucHV0Qm9keUxhYmVsOiBzdHJpbmcgPSAnTXVsdGkgaW5wdXQgYm9keSc7XG5cbiAgICAvKipcbiAgICAgKiBQcmVzZXQgb3B0aW9ucyBmb3IgdGhlIHBvcG92ZXIgYm9keSB3aWR0aC5cbiAgICAgKiAqIGBhdC1sZWFzdGAgd2lsbCBhcHBseSBhIG1pbmltdW0gd2lkdGggdG8gdGhlIGJvZHkgZXF1aXZhbGVudCB0byB0aGUgd2lkdGggb2YgdGhlIGNvbnRyb2wuXG4gICAgICogKiBgZXF1YWxgIHdpbGwgYXBwbHkgYSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIExlYXZlIGJsYW5rIGZvciBubyBlZmZlY3QuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBmaWxsQ29udHJvbE1vZGU6IFBvcG92ZXJGaWxsTW9kZSA9ICdhdC1sZWFzdCc7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWFyY2ggdGVybSBjaGFuZ2VzLiBVc2UgKiRldmVudCogdG8gYWNjZXNzIHRoZSBuZXcgdGVybS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWFyY2hUZXJtQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgaXRlbXMgY2hhbmdlLiBVc2UgKiRldmVudCogdG8gYWNjZXNzIHRoZSBuZXcgc2VsZWN0ZWQgYXJyYXkuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgc2VsZWN0ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnlbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBkaXNwbGF5ZWRWYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7IH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd25WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gdGhpcy5kcm9wZG93blZhbHVlcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcyAmJiAoY2hhbmdlcy5kcm9wZG93blZhbHVlcyB8fCBjaGFuZ2VzLnNlYXJjaFRlcm0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hUZXJtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmZpbHRlckZuKHRoaXMuZHJvcGRvd25WYWx1ZXMsIHRoaXMuc2VhcmNoVGVybSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gdGhpcy5kcm9wZG93blZhbHVlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUoc2VsZWN0ZWQ6IGFueVtdKTogdm9pZCB7XG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBoYW5kbGVTZWxlY3QoY2hlY2tlZDogYW55LCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzTGVuZ3RoID0gdGhpcy5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2godmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UodGhpcy5zZWxlY3RlZC5pbmRleE9mKHZhbHVlKSwgMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgcG9wb3ZlciBwbGFjZW1lbnQgdXBkYXRlXG4gICAgICAgIGlmICgocHJldmlvdXNMZW5ndGggPT09IDAgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IDEpIHx8XG4gICAgICAgICAgICAocHJldmlvdXNMZW5ndGggPT09IDEgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJSZWYudXBkYXRlUG9wb3ZlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaGFuZGxlU2VhcmNoVGVybUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWFyY2hUZXJtQ2hhbmdlLmVtaXQodGhpcy5zZWFyY2hUZXJtKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmZpbHRlckZuKHRoaXMuZHJvcGRvd25WYWx1ZXMsIHRoaXMuc2VhcmNoVGVybSk7XG4gICAgICAgIHRoaXMucG9wb3ZlclJlZi51cGRhdGVQb3BvdmVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RmlsdGVyKGNvbnRlbnRBcnJheTogYW55W10sIHNlYXJjaFRlcm06IHN0cmluZyk6IGFueVtdIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBzZWFyY2hUZXJtLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBjb250ZW50QXJyYXkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Rm4oaXRlbSkudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdERpc3BsYXkoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGNsaWNrSGFuZGxlcihldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKCF0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19