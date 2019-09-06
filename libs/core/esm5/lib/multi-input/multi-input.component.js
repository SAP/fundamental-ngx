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
var MultiInputComponent = /** @class */ (function () {
    /** @hidden */
    function MultiInputComponent(elRef) {
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
     * @return {?}
     */
    MultiInputComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    MultiInputComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.searchTerm) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    MultiInputComponent.prototype.registerOnChange = /**
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
    MultiInputComponent.prototype.registerOnTouched = /**
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
    MultiInputComponent.prototype.setDisabledState = /**
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
     * @param {?} selected
     * @return {?}
     */
    MultiInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected) {
            this.selected = selected;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    MultiInputComponent.prototype.handleSelect = /**
     * @hidden
     * @param {?} checked
     * @param {?} value
     * @return {?}
     */
    function (checked, value) {
        /** @type {?} */
        var previousLength = this.selected.length;
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
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    MultiInputComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.searchTermChange.emit(this.searchTerm);
        this.displayedValues = this.filterFn(this.dropdownValues, this.searchTerm);
        this.popoverRef.updatePopover();
    };
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    MultiInputComponent.prototype.defaultFilter = /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    function (contentArray, searchTerm) {
        var _this = this;
        /** @type {?} */
        var searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (item) {
                return _this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        }));
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    MultiInputComponent.prototype.defaultDisplay = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    MultiInputComponent.prototype.clickHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        if (!this.elRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    };
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
                            function () { return MultiInputComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-multi-input-custom{display:block}.fd-multi-input-custom .fd-multi-input-popover-size{overflow:auto;display:block}.fd-multi-input-custom .fd-multi-input-popover-custom{display:block}.fd-multi-input-custom .fd-multi-input-menu-overflow{overflow:auto}.fd-multi-input-custom .fd-multi-input-token-spacing{margin:0 4px 4px 0}.fd-multi-input-custom .fd-multi-input-token-spacing:last-child{margin-right:0}"]
                }] }
    ];
    /** @nocollapse */
    MultiInputComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return MultiInputComponent;
}());
export { MultiInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL211bHRpLWlucHV0L211bHRpLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7Ozs7Ozs7QUFTaEU7SUE2R0ksY0FBYztJQUNkLDZCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBckZyQyxvQkFBZSxHQUFHLElBQUksQ0FBQzs7OztRQUl2QixnQkFBVyxHQUFXLEVBQUUsQ0FBQzs7OztRQUl6QixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBSTFCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsY0FBUyxHQUFXLE9BQU8sQ0FBQzs7OztRQUk1QixVQUFLLEdBQVcsdUJBQXVCLENBQUM7Ozs7UUFJeEMsbUJBQWMsR0FBVSxFQUFFLENBQUM7Ozs7UUFRM0IsY0FBUyxHQUFZLElBQUksQ0FBQzs7OztRQUkxQixhQUFRLEdBQVUsRUFBRSxDQUFDOzs7Ozs7UUFNckIsYUFBUSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7Ozs7UUFPeEMsY0FBUyxHQUFhLElBQUksQ0FBQyxjQUFjLENBQUM7Ozs7UUFJMUMsd0JBQW1CLEdBQVcsa0JBQWtCLENBQUM7Ozs7Ozs7UUFTakQsb0JBQWUsR0FBb0IsVUFBVSxDQUFDOzs7O1FBSXJDLHFCQUFnQixHQUF5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QUFuQixDQUFtQixFQUFDOzRCQUNsRCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7O2dCQXZDRyxVQUFVOzs7NkJBMkNULFNBQVMsU0FBQyxnQkFBZ0I7a0NBSTFCLFdBQVcsU0FBQyxzQkFBc0I7OEJBSWxDLEtBQUs7MkJBSUwsS0FBSzswQkFJTCxLQUFLOzRCQUlMLEtBQUs7d0JBSUwsS0FBSztpQ0FJTCxLQUFLOzZCQUlMLEtBQUs7NEJBSUwsS0FBSzsyQkFJTCxLQUFLOzJCQU1MLEtBQUs7NEJBT0wsS0FBSztzQ0FJTCxLQUFLO2tDQVNMLEtBQUs7bUNBSUwsTUFBTTtpQ0FJTixNQUFNOytCQWtHTixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBUTlDLDBCQUFDO0NBQUEsQUF4TUQsSUF3TUM7U0F2TFksbUJBQW1COzs7Ozs7SUFHNUIseUNBQzZCOzs7OztJQUc3Qiw4Q0FDdUI7Ozs7O0lBR3ZCLDBDQUN5Qjs7Ozs7SUFHekIsdUNBQzBCOzs7OztJQUcxQixzQ0FDeUI7Ozs7O0lBR3pCLHdDQUM0Qjs7Ozs7SUFHNUIsb0NBQ3dDOzs7OztJQUd4Qyw2Q0FDMkI7Ozs7O0lBRzNCLHlDQUNtQjs7Ozs7SUFHbkIsd0NBQzBCOzs7OztJQUcxQix1Q0FDcUI7Ozs7Ozs7SUFLckIsdUNBQ3dDOzs7Ozs7OztJQU14Qyx3Q0FDMEM7Ozs7O0lBRzFDLGtEQUNpRDs7Ozs7Ozs7SUFRakQsOENBQzhDOzs7OztJQUc5QywrQ0FDNkU7Ozs7O0lBRzdFLDZDQUN5RTs7Ozs7SUFHekUsOENBQTRCOzs7OztJQUc1QixxQ0FBZTs7Ozs7SUFHZix1Q0FBK0I7Ozs7O0lBRy9CLHdDQUFnQzs7Ozs7SUFHcEIsb0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgSW5wdXQsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBQb3BvdmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vcG9wb3Zlci9wb3BvdmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3BvdmVyRmlsbE1vZGUgfSBmcm9tICcuLi9wb3BvdmVyL3BvcG92ZXItZGlyZWN0aXZlL3BvcG92ZXIuZGlyZWN0aXZlJztcblxuLyoqXG4gKiBJbnB1dCBmaWVsZCB3aXRoIG11bHRpcGxlIHNlbGVjdGlvbiBlbmFibGVkLiBTaG91bGQgYmUgdXNlZCB3aGVuIGEgdXNlciBjYW4gc2VsZWN0IGJldHdlZW4gYVxuICogbGltaXRlZCBudW1iZXIgb2YgcHJlLWRlZmluZWQgb3B0aW9ucyB3aXRoIGEgZmlsdGVyLWVuYWJsZWQgY29udGV4dC5cbiAqXG4gKiBTdXBwb3J0cyBBbmd1bGFyIEZvcm1zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW11bHRpLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbXVsdGktaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL211bHRpLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcbiAgICAgICAgJ1tjbGFzcy5mZC1tdWx0aS1pbnB1dC1jdXN0b21dJzogJ3RydWUnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aUlucHV0Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uQ2hhbmdlcyB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoUG9wb3ZlckNvbXBvbmVudClcbiAgICBwb3BvdmVyUmVmOiBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW11bHRpLWlucHV0JylcbiAgICBtdWx0aUlucHV0Q2xhc3MgPSB0cnVlO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIGZvciB0aGUgaW5wdXQgZmllbGQuICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGluIGNvbXBhY3QgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBNYXggaGVpZ2h0IG9mIHRoZSBwb3BvdmVyLiBBbnkgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2lsbCBiZSBhY2Nlc3NpYmxlIHRocm91Z2ggc2Nyb2xsaW5nLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4SGVpZ2h0OiBzdHJpbmcgPSAnMzAwcHgnO1xuXG4gICAgLyoqIEljb24gb2YgdGhlIGJ1dHRvbiBvbiB0aGUgcmlnaHQgb2YgdGhlIGlucHV0IGZpZWxkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2x5cGg6IHN0cmluZyA9ICduYXZpZ2F0aW9uLWRvd24tYXJyb3cnO1xuXG4gICAgLyoqIFZhbHVlcyB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIHVuZmlsdGVyZWQgZHJvcGRvd24uICovXG4gICAgQElucHV0KClcbiAgICBkcm9wZG93blZhbHVlczogYW55W10gPSBbXTtcblxuICAgIC8qKiBTZWFyY2ggdGVybSwgb3IgbW9yZSBzcGVjaWZpY2FsbHkgdGhlIHZhbHVlIG9mIHRoZSBpbm5lciBpbnB1dCBmaWVsZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNlYXJjaFRlcm06IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWFyY2ggdGVybSBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgaW4gcmVzdWx0cy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZ2hsaWdodDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogU2VsZWN0ZWQgZHJvcGRvd24gaXRlbXMuICovXG4gICAgQElucHV0KClcbiAgICBzZWxlY3RlZDogYW55W10gPSBbXTtcblxuICAgIC8qKiBGaWx0ZXIgZnVuY3Rpb24uIEFjY2VwdHMgYW4gYXJyYXkgYW5kIGEgc3RyaW5nIGFzIGFyZ3VtZW50cywgYW5kIG91dHB1dHMgYW4gYXJyYXkuXG4gICAgICogQW4gYXJyb3cgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSAqdGhpcyoga2V5d29yZCBpbiB0aGUgY2FsbGluZyBjb21wb25lbnQuXG4gICAgICogU2VlIG11bHRpIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyRm46IEZ1bmN0aW9uID0gdGhpcy5kZWZhdWx0RmlsdGVyO1xuXG4gICAgLyoqIERpc3BsYXkgZnVuY3Rpb24uIEFjY2VwdHMgYW4gb2JqZWN0IG9mIHRoZSBzYW1lIHR5cGUgYXMgdGhlXG4gICAgICogaXRlbXMgcGFzc2VkIHRvIGRyb3Bkb3duVmFsdWVzIGFzIGFyZ3VtZW50LCBhbmQgb3V0cHV0cyBhIHN0cmluZy5cbiAgICAgKiBBbiBhcnJvdyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlICp0aGlzKiBrZXl3b3JkIGluIHRoZSBjYWxsaW5nIGNvbXBvbmVudC5cbiAgICAgKiBTZWUgbXVsdGkgaW5wdXQgZXhhbXBsZXMgZm9yIGRldGFpbHMuICovXG4gICAgQElucHV0KClcbiAgICBkaXNwbGF5Rm46IEZ1bmN0aW9uID0gdGhpcy5kZWZhdWx0RGlzcGxheTtcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgbXVsdGkgaW5wdXQgYm9keS4gKi9cbiAgICBASW5wdXQoKVxuICAgIG11bHRpSW5wdXRCb2R5TGFiZWw6IHN0cmluZyA9ICdNdWx0aSBpbnB1dCBib2R5JztcblxuICAgIC8qKlxuICAgICAqIFByZXNldCBvcHRpb25zIGZvciB0aGUgcG9wb3ZlciBib2R5IHdpZHRoLlxuICAgICAqICogYGF0LWxlYXN0YCB3aWxsIGFwcGx5IGEgbWluaW11bSB3aWR0aCB0byB0aGUgYm9keSBlcXVpdmFsZW50IHRvIHRoZSB3aWR0aCBvZiB0aGUgY29udHJvbC5cbiAgICAgKiAqIGBlcXVhbGAgd2lsbCBhcHBseSBhIHdpZHRoIHRvIHRoZSBib2R5IGVxdWl2YWxlbnQgdG8gdGhlIHdpZHRoIG9mIHRoZSBjb250cm9sLlxuICAgICAqICogTGVhdmUgYmxhbmsgZm9yIG5vIGVmZmVjdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxDb250cm9sTW9kZTogUG9wb3ZlckZpbGxNb2RlID0gJ2F0LWxlYXN0JztcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNlYXJjaCB0ZXJtIGNoYW5nZXMuIFVzZSAqJGV2ZW50KiB0byBhY2Nlc3MgdGhlIG5ldyB0ZXJtLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHNlYXJjaFRlcm1DaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCBpdGVtcyBjaGFuZ2UuIFVzZSAqJGV2ZW50KiB0byBhY2Nlc3MgdGhlIG5ldyBzZWxlY3RlZCBhcnJheS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGRpc3BsYXllZFZhbHVlczogYW55W10gPSBbXTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaXNPcGVuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikgeyB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duVmFsdWVzICYmIChjaGFuZ2VzLmRyb3Bkb3duVmFsdWVzIHx8IGNoYW5nZXMuc2VhcmNoVGVybSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFRlcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5zZWFyY2hUZXJtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZShzZWxlY3RlZDogYW55W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGhhbmRsZVNlbGVjdChjaGVja2VkOiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNMZW5ndGggPSB0aGlzLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNwbGljZSh0aGlzLnNlbGVjdGVkLmluZGV4T2YodmFsdWUpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBwb3BvdmVyIHBsYWNlbWVudCB1cGRhdGVcbiAgICAgICAgaWYgKChwcmV2aW91c0xlbmd0aCA9PT0gMCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gMSkgfHxcbiAgICAgICAgICAgIChwcmV2aW91c0xlbmd0aCA9PT0gMSAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9wb3ZlclJlZi51cGRhdGVQb3BvdmVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuc2VsZWN0ZWQpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBoYW5kbGVTZWFyY2hUZXJtQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlYXJjaFRlcm1DaGFuZ2UuZW1pdCh0aGlzLnNlYXJjaFRlcm0pO1xuICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5zZWFyY2hUZXJtKTtcbiAgICAgICAgdGhpcy5wb3BvdmVyUmVmLnVwZGF0ZVBvcG92ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRGaWx0ZXIoY29udGVudEFycmF5OiBhbnlbXSwgc2VhcmNoVGVybTogc3RyaW5nKTogYW55W10ge1xuICAgICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHNlYXJjaFRlcm0udG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRBcnJheS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlGbihpdGVtKS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RGlzcGxheShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50J10pXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=