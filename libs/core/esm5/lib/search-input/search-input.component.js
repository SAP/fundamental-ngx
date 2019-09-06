/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, isDevMode, Output, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
/**
 * Allows users to filter through results and select.
 * Can also be customized to execute a search function.
 *
 * Supports Angular Forms.
 */
var SearchInputComponent = /** @class */ (function () {
    function SearchInputComponent() {
        /**
         * Values to be filtered in the search input.
         */
        this.dropdownValues = [];
        /**
         * Filter function. Accepts an array of objects and a search term as arguments
         * and returns a string. See search input examples for details.
         */
        this.filterFn = this.defaultFilter;
        /**
         * Whether the search input is in a shellbar *
         */
        this.inShellbar = false;
        /**
         * Icon to display in the right-side button.
         */
        this.glyph = 'search';
        /**
         * Max height of the popover. Any overflowing elements will be accessible through scrolling.
         */
        this.maxHeight = '200px';
        /**
         * Whether the search input should be displayed in compact mode.
         */
        this.compact = false;
        /**
         * Whether the matching string should be highlighted during filtration.
         */
        this.highlighting = true;
        /**
         * Whether the popover should close when a user selects a result.
         */
        this.closeOnSelect = true;
        /**
         * Whether the input field should be populated with the result picked by the user.
         */
        this.fillOnSelect = true;
        /**
         * Display function. Accepts an object of the same type as the
         * items passed to dropdownValues as argument, and outputs a string.
         * An arrow function can be used to access the *this* keyword in the calling component.
         * See search input examples for details.
         */
        this.displayFn = this.defaultDisplay;
        /**
         * Event emitted when an item is clicked. Use *$event* to retrieve it.
         */
        this.itemClicked = new EventEmitter();
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
        this.searchInputClass = true;
        /**
         * @hidden
         */
        this.shellBarClass = this.inShellbar;
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
     * @param {?} event
     * @return {?}
     */
    SearchInputComponent.prototype.onInputKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.onInputKeyupHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.inputText && this.inputText.length) {
            this.isOpen = true;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    SearchInputComponent.prototype.onMenuKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    function (event, term) {
        var _this = this;
        if (event.code === 'Enter' && term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            /** @type {?} */
            var foundItem_1 = false;
            /** @type {?} */
            var menuItemsArray_1 = this.menuItems.toArray();
            menuItemsArray_1.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem_1) {
                    if (menuItemsArray_1[index + 1]) {
                        menuItemsArray_1[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem_1 = true;
                }
            }));
        }
        else if (event.code === 'ArrowUp') {
            event.preventDefault();
            /** @type {?} */
            var foundItem_2 = false;
            /** @type {?} */
            var menuItemsArray_2 = this.menuItems.toArray();
            menuItemsArray_2.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            function (item, index) {
                if (!foundItem_2) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        _this.searchInputElement.nativeElement.focus();
                        foundItem_2 = true;
                    }
                    else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray_2[index - 1]) {
                            menuItemsArray_2[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem_2 = true;
                    }
                }
            }));
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    SearchInputComponent.prototype.onMenuClickHandler = /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    function (event, term) {
        if (term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    SearchInputComponent.prototype.shellbarSearchInputClicked = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
    };
    Object.defineProperty(SearchInputComponent.prototype, "inputText", {
        /** Get the input text of the input. */
        get: /**
         * Get the input text of the input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the input text of the input. */
        set: /**
         * Set the input text of the input.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputTextValue = value;
            this.onChange(value);
            this.onTouched();
        },
        enumerable: true,
        configurable: true
    });
    /** @hidden */
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    SearchInputComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.inputTextValue = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    SearchInputComponent.prototype.registerOnChange = /**
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
    SearchInputComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    SearchInputComponent.prototype.handleClickActions = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        if (isDevMode()) {
            console.warn('Search Input is deprecated. Please use Combobox instead. Visit the fundamental-ngx wiki for more information.');
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    SearchInputComponent.prototype.ngOnChanges = /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    SearchInputComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    SearchInputComponent.prototype.defaultDisplay = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return str;
    };
    /**
     * @private
     * @param {?} contentArray
     * @param {?} searchTerm
     * @return {?}
     */
    SearchInputComponent.prototype.defaultFilter = /**
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
    SearchInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-search-input',
                    template: "<fd-popover [(isOpen)]=\"isOpen\"\n            [fillControlMode]=\"'at-least'\"\n            [disabled]=\"disabled\"\n            class=\"fd-search-input-popover-custom\"\n            [ngClass]=\"{'fd-popover-body--display-none': displayedValues && !displayedValues.length}\">\n    <fd-popover-control>\n        <div *ngIf=\"!inShellbar\" class=\"fd-combobox-control\">\n            <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                <input #searchInputElement type=\"text\" class=\"fd-input\" [ngClass]=\"{'fd-input--compact': compact}\"\n                       (keydown)=\"onInputKeydownHandler($event)\"\n                       (keyup)=\"onInputKeyupHandler()\"\n                       [disabled]=\"disabled\"\n                       [(ngModel)]=\"inputText\"\n                       (ngModelChange)=\"handleSearchTermChange()\"\n                       placeholder=\"{{placeholder}}\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button type=\"button\" class=\"fd-button--light\" [ngClass]=\"('sap-icon--' + this.glyph)\"></button>\n                </span>\n            </div>\n        </div>\n        <div *ngIf=\"inShellbar\" class=\"fd-search-input__control\">\n            <button tabindex=\"0\" type=\"button\" class=\"fd-button--shell\" [attr.aria-expanded]=\"isOpen\"\n                    [ngClass]=\"('sap-icon--' + this.glyph)\"></button>\n            <div class=\"fd-search-input__closedcontrol\" [attr.aria-hidden]=\"!isOpen\">\n                <div class=\"fd-search-input__controlinput\" [attr.aria-expanded]=\"isOpen\" aria-haspopup=\"true\">\n                    <input type=\"text\" class=\"fd-input\"\n                           (keydown)=\"onInputKeydownHandler($event)\"\n                           (keyup)=\"onInputKeyupHandler()\"\n                           [disabled]=\"disabled\"\n                           [(ngModel)]=\"inputText\"\n                           (ngModelChange)=\"handleSearchTermChange()\"\n                           placeholder=\"{{placeholder}}\"\n                           (click)=\"shellbarSearchInputClicked($event)\">\n                </div>\n            </div>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displayedValues && displayedValues.length\">\n        <fd-menu class=\"fd-search-input-menu-overflow\"\n                 [style.maxHeight]=\"maxHeight\">\n            <ul fd-menu-list>\n                <li fd-menu-item *ngFor=\"let term of displayedValues\"\n                    (click)=\"onMenuClickHandler($event, term)\"\n                    (keydown)=\"onMenuKeydownHandler($event, term)\">\n                    <a tabindex=\"0\" [innerHTML]=\"term | displayFnPipe:displayFn | highlight:inputText:highlighting\"></a>\n                </li>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return SearchInputComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'fd-search-input-custom'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-search-input-custom .fd-search-input-popover-custom{display:block}.fd-search-input-custom .fd-search-input-menu-overflow{overflow:auto}"]
                }] }
    ];
    SearchInputComponent.propDecorators = {
        dropdownValues: [{ type: Input }],
        filterFn: [{ type: Input }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        inShellbar: [{ type: Input }],
        glyph: [{ type: Input }],
        maxHeight: [{ type: Input }],
        searchFunction: [{ type: Input }],
        compact: [{ type: Input }],
        highlighting: [{ type: Input }],
        closeOnSelect: [{ type: Input }],
        fillOnSelect: [{ type: Input }],
        displayFn: [{ type: Input }],
        itemClicked: [{ type: Output }],
        menuItems: [{ type: ViewChildren, args: [MenuItemDirective,] }],
        searchInputElement: [{ type: ViewChild, args: ['searchInputElement',] }],
        searchInputClass: [{ type: HostBinding, args: ['class.fd-search-input',] }],
        shellBarClass: [{ type: HostBinding, args: ['class.fd-search-input--closed',] }]
    };
    return SearchInputComponent;
}());
export { SearchInputComponent };
if (false) {
    /**
     * Values to be filtered in the search input.
     * @type {?}
     */
    SearchInputComponent.prototype.dropdownValues;
    /**
     * Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details.
     * @type {?}
     */
    SearchInputComponent.prototype.filterFn;
    /**
     * Whether the search input is disabled. *
     * @type {?}
     */
    SearchInputComponent.prototype.disabled;
    /**
     * Placeholder of the search input. *
     * @type {?}
     */
    SearchInputComponent.prototype.placeholder;
    /**
     * Whether the search input is in a shellbar *
     * @type {?}
     */
    SearchInputComponent.prototype.inShellbar;
    /**
     * Icon to display in the right-side button.
     * @type {?}
     */
    SearchInputComponent.prototype.glyph;
    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling.
     * @type {?}
     */
    SearchInputComponent.prototype.maxHeight;
    /**
     * Search function to execute when the Enter key is pressed on the main input.
     * @type {?}
     */
    SearchInputComponent.prototype.searchFunction;
    /**
     * Whether the search input should be displayed in compact mode.
     * @type {?}
     */
    SearchInputComponent.prototype.compact;
    /**
     * Whether the matching string should be highlighted during filtration.
     * @type {?}
     */
    SearchInputComponent.prototype.highlighting;
    /**
     * Whether the popover should close when a user selects a result.
     * @type {?}
     */
    SearchInputComponent.prototype.closeOnSelect;
    /**
     * Whether the input field should be populated with the result picked by the user.
     * @type {?}
     */
    SearchInputComponent.prototype.fillOnSelect;
    /**
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details.
     * @type {?}
     */
    SearchInputComponent.prototype.displayFn;
    /**
     * Event emitted when an item is clicked. Use *$event* to retrieve it.
     * @type {?}
     */
    SearchInputComponent.prototype.itemClicked;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.menuItems;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.searchInputElement;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.displayedValues;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.isOpen;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.inputTextValue;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.searchInputClass;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.shellBarClass;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    SearchInputComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUFFLFNBQVMsRUFHaEIsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7QUFRaEU7SUFBQTs7OztRQW9CSSxtQkFBYyxHQUFVLEVBQUUsQ0FBQzs7Ozs7UUFLM0IsYUFBUSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7UUFZeEMsZUFBVSxHQUFZLEtBQUssQ0FBQzs7OztRQUk1QixVQUFLLEdBQVcsUUFBUSxDQUFDOzs7O1FBSXpCLGNBQVMsR0FBVyxPQUFPLENBQUM7Ozs7UUFRNUIsWUFBTyxHQUFZLEtBQUssQ0FBQzs7OztRQUl6QixpQkFBWSxHQUFZLElBQUksQ0FBQzs7OztRQUk3QixrQkFBYSxHQUFZLElBQUksQ0FBQzs7OztRQUk5QixpQkFBWSxHQUFZLElBQUksQ0FBQzs7Ozs7OztRQU83QixjQUFTLEdBQWEsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7OztRQUkxQyxnQkFBVyxHQUE2QyxJQUFJLFlBQVksRUFBOEIsQ0FBQzs7OztRQVd2RyxvQkFBZSxHQUFVLEVBQUUsQ0FBQzs7OztRQUc1QixXQUFNLEdBQVksS0FBSyxDQUFDOzs7O1FBT3hCLHFCQUFnQixHQUFHLElBQUksQ0FBQzs7OztRQUl4QixrQkFB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QUFvQixFQUFDOzRCQUNuRCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLHdCQUF3QjtxQkFDbEM7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7O2lDQUlJLEtBQUs7MkJBS0wsS0FBSzsyQkFJTCxLQUFLOzhCQUlMLEtBQUs7NkJBSUwsS0FBSzt3QkFJTCxLQUFLOzRCQUlMLEtBQUs7aUNBSUwsS0FBSzswQkFJTCxLQUFLOytCQUlMLEtBQUs7Z0NBSUwsS0FBSzsrQkFJTCxLQUFLOzRCQU9MLEtBQUs7OEJBSUwsTUFBTTs0QkFJTixZQUFZLFNBQUMsaUJBQWlCO3FDQUk5QixTQUFTLFNBQUMsb0JBQW9CO21DQWE5QixXQUFXLFNBQUMsdUJBQXVCO2dDQUluQyxXQUFXLFNBQUMsK0JBQStCOztJQTJKaEQsMkJBQUM7Q0FBQSxBQS9QRCxJQStQQztTQS9PWSxvQkFBb0I7Ozs7OztJQUc3Qiw4Q0FDMkI7Ozs7OztJQUkzQix3Q0FDd0M7Ozs7O0lBR3hDLHdDQUNrQjs7Ozs7SUFHbEIsMkNBQ29COzs7OztJQUdwQiwwQ0FDNEI7Ozs7O0lBRzVCLHFDQUN5Qjs7Ozs7SUFHekIseUNBQzRCOzs7OztJQUc1Qiw4Q0FDeUI7Ozs7O0lBR3pCLHVDQUN5Qjs7Ozs7SUFHekIsNENBQzZCOzs7OztJQUc3Qiw2Q0FDOEI7Ozs7O0lBRzlCLDRDQUM2Qjs7Ozs7Ozs7SUFNN0IseUNBQzBDOzs7OztJQUcxQywyQ0FDdUc7Ozs7O0lBR3ZHLHlDQUN3Qzs7Ozs7SUFHeEMsa0RBQytCOzs7OztJQUcvQiwrQ0FBNEI7Ozs7O0lBRzVCLHNDQUF3Qjs7Ozs7SUFHeEIsOENBQXVCOzs7OztJQUd2QixnREFDd0I7Ozs7O0lBR3hCLDZDQUNnQzs7Ozs7SUF3RWhDLHdDQUF5Qjs7Ozs7SUFHekIseUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBIb3N0QmluZGluZyxcbiAgICBJbnB1dCwgaXNEZXZNb2RlLFxuICAgIE9uQ2hhbmdlcyxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uL21lbnUvbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogQWxsb3dzIHVzZXJzIHRvIGZpbHRlciB0aHJvdWdoIHJlc3VsdHMgYW5kIHNlbGVjdC5cbiAqIENhbiBhbHNvIGJlIGN1c3RvbWl6ZWQgdG8gZXhlY3V0ZSBhIHNlYXJjaCBmdW5jdGlvbi5cbiAqXG4gKiBTdXBwb3J0cyBBbmd1bGFyIEZvcm1zLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNlYXJjaC1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VhcmNoLWlucHV0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VhcmNoSW5wdXRDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLXNlYXJjaC1pbnB1dC1jdXN0b20nXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNlYXJjaElucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIC8qKiBWYWx1ZXMgdG8gYmUgZmlsdGVyZWQgaW4gdGhlIHNlYXJjaCBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRyb3Bkb3duVmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gICAgLyoqIEZpbHRlciBmdW5jdGlvbi4gQWNjZXB0cyBhbiBhcnJheSBvZiBvYmplY3RzIGFuZCBhIHNlYXJjaCB0ZXJtIGFzIGFyZ3VtZW50c1xuICAgICAqIGFuZCByZXR1cm5zIGEgc3RyaW5nLiBTZWUgc2VhcmNoIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyRm46IEZ1bmN0aW9uID0gdGhpcy5kZWZhdWx0RmlsdGVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlYXJjaCBpbnB1dCBpcyBkaXNhYmxlZC4gKiovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBvZiB0aGUgc2VhcmNoIGlucHV0LiAqKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VhcmNoIGlucHV0IGlzIGluIGEgc2hlbGxiYXIgKiovXG4gICAgQElucHV0KClcbiAgICBpblNoZWxsYmFyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogSWNvbiB0byBkaXNwbGF5IGluIHRoZSByaWdodC1zaWRlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdseXBoOiBzdHJpbmcgPSAnc2VhcmNoJztcblxuICAgIC8qKiBNYXggaGVpZ2h0IG9mIHRoZSBwb3BvdmVyLiBBbnkgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2lsbCBiZSBhY2Nlc3NpYmxlIHRocm91Z2ggc2Nyb2xsaW5nLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbWF4SGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuXG4gICAgLyoqIFNlYXJjaCBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIEVudGVyIGtleSBpcyBwcmVzc2VkIG9uIHRoZSBtYWluIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2VhcmNoRnVuY3Rpb246IEZ1bmN0aW9uO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlYXJjaCBpbnB1dCBzaG91bGQgYmUgZGlzcGxheWVkIGluIGNvbXBhY3QgbW9kZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbXBhY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBtYXRjaGluZyBzdHJpbmcgc2hvdWxkIGJlIGhpZ2hsaWdodGVkIGR1cmluZyBmaWx0cmF0aW9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaGlnaGxpZ2h0aW5nOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBwb3BvdmVyIHNob3VsZCBjbG9zZSB3aGVuIGEgdXNlciBzZWxlY3RzIGEgcmVzdWx0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgZmllbGQgc2hvdWxkIGJlIHBvcHVsYXRlZCB3aXRoIHRoZSByZXN1bHQgcGlja2VkIGJ5IHRoZSB1c2VyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsbE9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBEaXNwbGF5IGZ1bmN0aW9uLiBBY2NlcHRzIGFuIG9iamVjdCBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoZVxuICAgICAqIGl0ZW1zIHBhc3NlZCB0byBkcm9wZG93blZhbHVlcyBhcyBhcmd1bWVudCwgYW5kIG91dHB1dHMgYSBzdHJpbmcuXG4gICAgICogQW4gYXJyb3cgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSAqdGhpcyoga2V5d29yZCBpbiB0aGUgY2FsbGluZyBjb21wb25lbnQuXG4gICAgICogU2VlIHNlYXJjaCBpbnB1dCBleGFtcGxlcyBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlGbjogRnVuY3Rpb24gPSB0aGlzLmRlZmF1bHREaXNwbGF5O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhbiBpdGVtIGlzIGNsaWNrZWQuIFVzZSAqJGV2ZW50KiB0byByZXRyaWV2ZSBpdC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBpdGVtQ2xpY2tlZDogRXZlbnRFbWl0dGVyPHtpdGVtOiBhbnksIGluZGV4OiBudW1iZXJ9PiA9IG5ldyBFdmVudEVtaXR0ZXI8e2l0ZW06IGFueSwgaW5kZXg6IG51bWJlcn0+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGRyZW4oTWVudUl0ZW1EaXJlY3RpdmUpXG4gICAgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8TWVudUl0ZW1EaXJlY3RpdmU+O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdzZWFyY2hJbnB1dEVsZW1lbnQnKVxuICAgIHNlYXJjaElucHV0RWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgZGlzcGxheWVkVmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpc09wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaW5wdXRUZXh0VmFsdWU6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1zZWFyY2gtaW5wdXQnKVxuICAgIHNlYXJjaElucHV0Q2xhc3MgPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXNlYXJjaC1pbnB1dC0tY2xvc2VkJylcbiAgICBzaGVsbEJhckNsYXNzID0gdGhpcy5pblNoZWxsYmFyO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbklucHV0S2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicgJiYgdGhpcy5zZWFyY2hGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zICYmIHRoaXMubWVudUl0ZW1zLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZmlyc3QuaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25JbnB1dEtleXVwSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRUZXh0ICYmIHRoaXMuaW5wdXRUZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbk1lbnVLZXlkb3duSGFuZGxlcihldmVudCwgdGVybT8pIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicgJiYgdGVybSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0FjdGlvbnModGVybSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1DbGlja2VkLmVtaXQoe2l0ZW06IHRlcm0sIGluZGV4OiB0aGlzLmRyb3Bkb3duVmFsdWVzLmluZGV4T2YodGVybSl9KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5jb2RlID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBmb3VuZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtc0FycmF5ID0gdGhpcy5tZW51SXRlbXMudG9BcnJheSgpO1xuICAgICAgICAgICAgbWVudUl0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaXRlbS5pdGVtRWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSAmJiAhZm91bmRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZW51SXRlbXNBcnJheVtpbmRleCArIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZW51SXRlbXNBcnJheVtpbmRleCArIDFdLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd1VwJykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBmb3VuZEl0ZW0gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IG1lbnVJdGVtc0FycmF5ID0gdGhpcy5tZW51SXRlbXMudG9BcnJheSgpO1xuICAgICAgICAgICAgbWVudUl0ZW1zQXJyYXkuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWZvdW5kSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaXRlbS5pdGVtRWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpdGVtLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVudUl0ZW1zQXJyYXlbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtc0FycmF5W2luZGV4IC0gMV0uaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSXRlbSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25NZW51Q2xpY2tIYW5kbGVyKGV2ZW50LCB0ZXJtKSB7XG4gICAgICAgIGlmICh0ZXJtKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrQWN0aW9ucyh0ZXJtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNsaWNrZWQuZW1pdCh7aXRlbTogdGVybSwgaW5kZXg6IHRoaXMuZHJvcGRvd25WYWx1ZXMuaW5kZXhPZih0ZXJtKX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzaGVsbGJhclNlYXJjaElucHV0Q2xpY2tlZChldmVudCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBHZXQgdGhlIGlucHV0IHRleHQgb2YgdGhlIGlucHV0LiAqL1xuICAgIGdldCBpbnB1dFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VGV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIGlucHV0IHRleHQgb2YgdGhlIGlucHV0LiAqL1xuICAgIHNldCBpbnB1dFRleHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDbGlja0FjdGlvbnModGVybSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpbGxPblNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFRleHQgPSB0aGlzLmRpc3BsYXlGbih0ZXJtKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VhcmNoVGVybUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd25WYWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gdGhpcy5kcm9wZG93blZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdTZWFyY2ggSW5wdXQgaXMgZGVwcmVjYXRlZC4gUGxlYXNlIHVzZSBDb21ib2JveCBpbnN0ZWFkLiBWaXNpdCB0aGUgZnVuZGFtZW50YWwtbmd4IHdpa2kgZm9yIG1vcmUgaW5mb3JtYXRpb24uJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcyAmJiAoY2hhbmdlcy5kcm9wZG93blZhbHVlcyB8fCBjaGFuZ2VzLnNlYXJjaFRlcm0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5pbnB1dFRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9ICB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBoYW5kbGVTZWFyY2hUZXJtQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5pbnB1dFRleHQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdERpc3BsYXkoc3RyOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVmYXVsdEZpbHRlcihjb250ZW50QXJyYXk6IGFueVtdLCBzZWFyY2hUZXJtOiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaExvd2VyID0gc2VhcmNoVGVybS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gY29udGVudEFycmF5LmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUZuKGl0ZW0pLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoTG93ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==