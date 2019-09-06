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
export class SearchInputComponent {
    constructor() {
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
     * @param {?} event
     * @return {?}
     */
    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    onInputKeyupHandler() {
        if (this.inputText && this.inputText.length) {
            this.isOpen = true;
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?=} term
     * @return {?}
     */
    onMenuKeydownHandler(event, term) {
        if (event.code === 'Enter' && term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
        else if (event.code === 'ArrowDown') {
            event.preventDefault();
            /** @type {?} */
            let foundItem = false;
            /** @type {?} */
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem) {
                    if (menuItemsArray[index + 1]) {
                        menuItemsArray[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem = true;
                }
            }));
        }
        else if (event.code === 'ArrowUp') {
            event.preventDefault();
            /** @type {?} */
            let foundItem = false;
            /** @type {?} */
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((/**
             * @param {?} item
             * @param {?} index
             * @return {?}
             */
            (item, index) => {
                if (!foundItem) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        this.searchInputElement.nativeElement.focus();
                        foundItem = true;
                    }
                    else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray[index - 1]) {
                            menuItemsArray[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem = true;
                    }
                }
            }));
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} term
     * @return {?}
     */
    onMenuClickHandler(event, term) {
        if (term) {
            this.handleClickActions(term);
            this.itemClicked.emit({ item: term, index: this.dropdownValues.indexOf(term) });
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    shellbarSearchInputClicked(event) {
        event.stopPropagation();
    }
    /**
     * Get the input text of the input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the input text of the input.
     * @param {?} value
     * @return {?}
     */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.inputTextValue = value;
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
     * @private
     * @param {?} term
     * @return {?}
     */
    handleClickActions(term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        if (isDevMode()) {
            console.warn('Search Input is deprecated. Please use Combobox instead. Visit the fundamental-ngx wiki for more information.');
        }
    }
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            }
            else {
                this.displayedValues = this.dropdownValues;
            }
        }
    }
    /**
     * @hidden
     * @return {?}
     */
    handleSearchTermChange() {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
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
}
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
                        () => SearchInputComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWFyY2gtaW5wdXQvc2VhcmNoLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUFFLFNBQVMsRUFHaEIsTUFBTSxFQUNOLFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7Ozs7QUF3QmhFLE1BQU0sT0FBTyxvQkFBb0I7SUFoQmpDOzs7O1FBb0JJLG1CQUFjLEdBQVUsRUFBRSxDQUFDOzs7OztRQUszQixhQUFRLEdBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7OztRQVl4QyxlQUFVLEdBQVksS0FBSyxDQUFDOzs7O1FBSTVCLFVBQUssR0FBVyxRQUFRLENBQUM7Ozs7UUFJekIsY0FBUyxHQUFXLE9BQU8sQ0FBQzs7OztRQVE1QixZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7O1FBSTdCLGtCQUFhLEdBQVksSUFBSSxDQUFDOzs7O1FBSTlCLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7Ozs7O1FBTzdCLGNBQVMsR0FBYSxJQUFJLENBQUMsY0FBYyxDQUFDOzs7O1FBSTFDLGdCQUFXLEdBQTZDLElBQUksWUFBWSxFQUE4QixDQUFDOzs7O1FBV3ZHLG9CQUFlLEdBQVUsRUFBRSxDQUFDOzs7O1FBRzVCLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFPeEIscUJBQWdCLEdBQUcsSUFB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d0JBT0wsS0FBSzswQkFJTCxNQUFNO3dCQUlOLFlBQVksU0FBQyxpQkFBaUI7aUNBSTlCLFNBQVMsU0FBQyxvQkFBb0I7K0JBYTlCLFdBQVcsU0FBQyx1QkFBdUI7NEJBSW5DLFdBQVcsU0FBQywrQkFBK0I7Ozs7Ozs7SUFqRjVDLDhDQUMyQjs7Ozs7O0lBSTNCLHdDQUN3Qzs7Ozs7SUFHeEMsd0NBQ2tCOzs7OztJQUdsQiwyQ0FDb0I7Ozs7O0lBR3BCLDBDQUM0Qjs7Ozs7SUFHNUIscUNBQ3lCOzs7OztJQUd6Qix5Q0FDNEI7Ozs7O0lBRzVCLDhDQUN5Qjs7Ozs7SUFHekIsdUNBQ3lCOzs7OztJQUd6Qiw0Q0FDNkI7Ozs7O0lBRzdCLDZDQUM4Qjs7Ozs7SUFHOUIsNENBQzZCOzs7Ozs7OztJQU03Qix5Q0FDMEM7Ozs7O0lBRzFDLDJDQUN1Rzs7Ozs7SUFHdkcseUNBQ3dDOzs7OztJQUd4QyxrREFDK0I7Ozs7O0lBRy9CLCtDQUE0Qjs7Ozs7SUFHNUIsc0NBQXdCOzs7OztJQUd4Qiw4Q0FBdUI7Ozs7O0lBR3ZCLGdEQUN3Qjs7Ozs7SUFHeEIsNkNBQ2dDOzs7OztJQXdFaEMsd0NBQXlCOzs7OztJQUd6Qix5Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIEhvc3RCaW5kaW5nLFxuICAgIElucHV0LCBpc0Rldk1vZGUsXG4gICAgT25DaGFuZ2VzLFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDaGlsZHJlbixcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1lbnVJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi4vbWVudS9tZW51LWl0ZW0uZGlyZWN0aXZlJztcblxuLyoqXG4gKiBBbGxvd3MgdXNlcnMgdG8gZmlsdGVyIHRocm91Z2ggcmVzdWx0cyBhbmQgc2VsZWN0LlxuICogQ2FuIGFsc28gYmUgY3VzdG9taXplZCB0byBleGVjdXRlIGEgc2VhcmNoIGZ1bmN0aW9uLlxuICpcbiAqIFN1cHBvcnRzIEFuZ3VsYXIgRm9ybXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtc2VhcmNoLWlucHV0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VhcmNoLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtaW5wdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBTZWFyY2hJbnB1dENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtc2VhcmNoLWlucHV0LWN1c3RvbSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgLyoqIFZhbHVlcyB0byBiZSBmaWx0ZXJlZCBpbiB0aGUgc2VhcmNoIGlucHV0LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZHJvcGRvd25WYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICAvKiogRmlsdGVyIGZ1bmN0aW9uLiBBY2NlcHRzIGFuIGFycmF5IG9mIG9iamVjdHMgYW5kIGEgc2VhcmNoIHRlcm0gYXMgYXJndW1lbnRzXG4gICAgICogYW5kIHJldHVybnMgYSBzdHJpbmcuIFNlZSBzZWFyY2ggaW5wdXQgZXhhbXBsZXMgZm9yIGRldGFpbHMuICovXG4gICAgQElucHV0KClcbiAgICBmaWx0ZXJGbjogRnVuY3Rpb24gPSB0aGlzLmRlZmF1bHRGaWx0ZXI7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VhcmNoIGlucHV0IGlzIGRpc2FibGVkLiAqKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIG9mIHRoZSBzZWFyY2ggaW5wdXQuICoqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWFyY2ggaW5wdXQgaXMgaW4gYSBzaGVsbGJhciAqKi9cbiAgICBASW5wdXQoKVxuICAgIGluU2hlbGxiYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJY29uIHRvIGRpc3BsYXkgaW4gdGhlIHJpZ2h0LXNpZGUgYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2x5cGg6IHN0cmluZyA9ICdzZWFyY2gnO1xuXG4gICAgLyoqIE1heCBoZWlnaHQgb2YgdGhlIHBvcG92ZXIuIEFueSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aWxsIGJlIGFjY2Vzc2libGUgdGhyb3VnaCBzY3JvbGxpbmcuICovXG4gICAgQElucHV0KClcbiAgICBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICAvKiogU2VhcmNoIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWQgb24gdGhlIG1haW4gaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBzZWFyY2hGdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VhcmNoIGlucHV0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gY29tcGFjdCBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIG1hdGNoaW5nIHN0cmluZyBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgZHVyaW5nIGZpbHRyYXRpb24uICovXG4gICAgQElucHV0KClcbiAgICBoaWdobGlnaHRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSB1c2VyIHNlbGVjdHMgYSByZXN1bHQuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBmaWVsZCBzaG91bGQgYmUgcG9wdWxhdGVkIHdpdGggdGhlIHJlc3VsdCBwaWNrZWQgYnkgdGhlIHVzZXIuICovXG4gICAgQElucHV0KClcbiAgICBmaWxsT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIERpc3BsYXkgZnVuY3Rpb24uIEFjY2VwdHMgYW4gb2JqZWN0IG9mIHRoZSBzYW1lIHR5cGUgYXMgdGhlXG4gICAgICogaXRlbXMgcGFzc2VkIHRvIGRyb3Bkb3duVmFsdWVzIGFzIGFyZ3VtZW50LCBhbmQgb3V0cHV0cyBhIHN0cmluZy5cbiAgICAgKiBBbiBhcnJvdyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlICp0aGlzKiBrZXl3b3JkIGluIHRoZSBjYWxsaW5nIGNvbXBvbmVudC5cbiAgICAgKiBTZWUgc2VhcmNoIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUZuOiBGdW5jdGlvbiA9IHRoaXMuZGVmYXVsdERpc3BsYXk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZC4gVXNlICokZXZlbnQqIHRvIHJldHJpZXZlIGl0LiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIGl0ZW1DbGlja2VkOiBFdmVudEVtaXR0ZXI8e2l0ZW06IGFueSwgaW5kZXg6IG51bWJlcn0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7aXRlbTogYW55LCBpbmRleDogbnVtYmVyfT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZHJlbihNZW51SXRlbURpcmVjdGl2ZSlcbiAgICBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxNZW51SXRlbURpcmVjdGl2ZT47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0RWxlbWVudCcpXG4gICAgc2VhcmNoSW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBkaXNwbGF5ZWRWYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbnB1dFRleHRWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXNlYXJjaC1pbnB1dCcpXG4gICAgc2VhcmNoSW5wdXRDbGFzcyA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtc2VhcmNoLWlucHV0LS1jbG9zZWQnKVxuICAgIHNoZWxsQmFyQ2xhc3MgPSB0aGlzLmluU2hlbGxiYXI7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uSW5wdXRLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJyAmJiB0aGlzLnNlYXJjaEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEZ1bmN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMgJiYgdGhpcy5tZW51SXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVJdGVtcy5maXJzdC5pdGVtRWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbklucHV0S2V5dXBIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5pbnB1dFRleHQgJiYgdGhpcy5pbnB1dFRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uTWVudUtleWRvd25IYW5kbGVyKGV2ZW50LCB0ZXJtPykge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJyAmJiB0ZXJtKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrQWN0aW9ucyh0ZXJtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNsaWNrZWQuZW1pdCh7aXRlbTogdGVybSwgaW5kZXg6IHRoaXMuZHJvcGRvd25WYWx1ZXMuaW5kZXhPZih0ZXJtKX0pO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGZvdW5kSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbWVudUl0ZW1zQXJyYXkgPSB0aGlzLm1lbnVJdGVtcy50b0FycmF5KCk7XG4gICAgICAgICAgICBtZW51SXRlbXNBcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpdGVtLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdICYmICFmb3VuZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lbnVJdGVtc0FycmF5W2luZGV4ICsgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtc0FycmF5W2luZGV4ICsgMV0uaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3VuZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbGV0IGZvdW5kSXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgbWVudUl0ZW1zQXJyYXkgPSB0aGlzLm1lbnVJdGVtcy50b0FycmF5KCk7XG4gICAgICAgICAgICBtZW51SXRlbXNBcnJheS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZm91bmRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpdGVtLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEl0ZW0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGl0ZW0uaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZW51SXRlbXNBcnJheVtpbmRleCAtIDFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1zQXJyYXlbaW5kZXggLSAxXS5pdGVtRWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJdGVtID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbk1lbnVDbGlja0hhbmRsZXIoZXZlbnQsIHRlcm0pIHtcbiAgICAgICAgaWYgKHRlcm0pIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tBY3Rpb25zKHRlcm0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZC5lbWl0KHtpdGVtOiB0ZXJtLCBpbmRleDogdGhpcy5kcm9wZG93blZhbHVlcy5pbmRleE9mKHRlcm0pfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNoZWxsYmFyU2VhcmNoSW5wdXRDbGlja2VkKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEdldCB0aGUgaW5wdXQgdGV4dCBvZiB0aGUgaW5wdXQuICovXG4gICAgZ2V0IGlucHV0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRUZXh0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgaW5wdXQgdGV4dCBvZiB0aGUgaW5wdXQuICovXG4gICAgc2V0IGlucHV0VGV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUNsaWNrQWN0aW9ucyh0ZXJtKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZmlsbE9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VGV4dCA9IHRoaXMuZGlzcGxheUZuKHRlcm0pO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVTZWFyY2hUZXJtQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1NlYXJjaCBJbnB1dCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIENvbWJvYm94IGluc3RlYWQuIFZpc2l0IHRoZSBmdW5kYW1lbnRhbC1uZ3ggd2lraSBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duVmFsdWVzICYmIChjaGFuZ2VzLmRyb3Bkb3duVmFsdWVzIHx8IGNoYW5nZXMuc2VhcmNoVGVybSkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0VGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gdGhpcy5maWx0ZXJGbih0aGlzLmRyb3Bkb3duVmFsdWVzLCB0aGlzLmlucHV0VGV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gIHRoaXMuZHJvcGRvd25WYWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGhhbmRsZVNlYXJjaFRlcm1DaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzcGxheWVkVmFsdWVzID0gdGhpcy5maWx0ZXJGbih0aGlzLmRyb3Bkb3duVmFsdWVzLCB0aGlzLmlucHV0VGV4dCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RGlzcGxheShzdHI6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RmlsdGVyKGNvbnRlbnRBcnJheTogYW55W10sIHNlYXJjaFRlcm06IHN0cmluZyk6IGFueVtdIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBzZWFyY2hUZXJtLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBjb250ZW50QXJyYXkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Rm4oaXRlbSkudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19