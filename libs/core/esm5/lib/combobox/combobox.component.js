/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import focusTrap from 'focus-trap';
/**
 * Allows users to filter through results and select a value.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-combobox
 *      [(ngModel)]="searchTerm"
 *      [dropdownValues]="dropdownValues"
 *      [placeholder]="'Type some text...'">
 * </fd-combobox>
 * ```
 */
var ComboboxComponent = /** @class */ (function () {
    function ComboboxComponent(elRef, menuKeyboardService) {
        this.elRef = elRef;
        this.menuKeyboardService = menuKeyboardService;
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
         * Icon to display in the right-side button.
         */
        this.glyph = 'navigation-down-arrow';
        /**
         *  The trigger events that will open/close the options popover, by default it is click, so if user click on
         *  input field, the popover with options will open or close
         *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
         */
        this.triggers = ['click'];
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
         * Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
         * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
         * can be achieved only by objects with same type as dropdownValue
         */
        this.communicateByObject = false;
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
        this.onDestroy$ = new Subject();
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
    ComboboxComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        this.setupFocusTrap();
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} changes
     * @return {?}
     */
    ComboboxComponent.prototype.ngOnChanges = /**
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
    /**
     * @return {?}
     */
    ComboboxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.ngAfterViewInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        var _this = this;
        this.menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        function (index) { return _this.onMenuClickHandler(index); }));
        this.menuKeyboardService.focusEscapeBeforeList = (/**
         * @return {?}
         */
        function () { return _this.searchInputElement.nativeElement.focus(); });
        this.menuKeyboardService.focusEscapeAfterList = (/**
         * @return {?}
         */
        function () { });
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ComboboxComponent.prototype.onInputKeydownHandler = /**
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
                this.menuItems.first.focus();
            }
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    ComboboxComponent.prototype.onInputKeyupHandler = /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.inputText &&
            this.inputText.length &&
            event.code !== 'Escape' &&
            event.code !== 'Space' &&
            event.code !== 'Enter') {
            this.isOpen = true;
            this.isOpenChangeHandle(this.isOpen);
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    ComboboxComponent.prototype.onMenuKeydownHandler = /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    function (event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    ComboboxComponent.prototype.onMenuClickHandler = /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this.handleClickActions(selectedItem);
            this.itemClicked.emit({ item: selectedItem, index: index });
        }
    };
    Object.defineProperty(ComboboxComponent.prototype, "inputText", {
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
            if (this.communicateByObject) {
                this.onChange(this.getOptionObjectByDisplayedValue(value));
            }
            else {
                this.onChange(value);
            }
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
    ComboboxComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.communicateByObject) {
            this.inputTextValue = this.displayFn(value);
        }
        else {
            this.inputTextValue = value;
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ComboboxComponent.prototype.registerOnChange = /**
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
    ComboboxComponent.prototype.registerOnTouched = /**
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
     * @return {?}
     */
    ComboboxComponent.prototype.handleSearchTermChange = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ComboboxComponent.prototype.onPrimaryButtonClick = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.searchFunction) {
            this.searchFunction();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    ComboboxComponent.prototype.isOpenChangeHandle = /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    function (isOpen) {
        this.isOpen = isOpen;
        this.onTouched();
        if (isOpen) {
            this.focusTrap.activate();
        }
        else {
            this.focusTrap.deactivate();
        }
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    ComboboxComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    ComboboxComponent.prototype.defaultDisplay = /**
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
    ComboboxComponent.prototype.defaultFilter = /**
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
     * @param {?} term
     * @return {?}
     */
    ComboboxComponent.prototype.handleClickActions = /**
     * @private
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
            this.isOpenChangeHandle(this.isOpen);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    };
    /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    ComboboxComponent.prototype.getOptionObjectByDisplayedValue = /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    function (displayValue) {
        var _this = this;
        return this.dropdownValues.find((/**
         * @param {?} value
         * @return {?}
         */
        function (value) { return _this.displayFn(value) === displayValue; }));
    };
    /**
     * @private
     * @return {?}
     */
    ComboboxComponent.prototype.setupFocusTrap = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            this.focusTrap = focusTrap(this.elRef.nativeElement, {
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                escapeDeactivates: false
            });
        }
        catch (e) {
            console.warn('Unsuccessful attempting to focus trap the Combobox.');
        }
    };
    ComboboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-combobox',
                    template: "<fd-popover [isOpen]=\"isOpen\"\n            (isOpenChange)=\"isOpenChangeHandle($event)\"\n            [fillControlMode]=\"'at-least'\"\n            [triggers]=\"triggers\"\n            [disabled]=\"disabled\"\n            class=\"fd-combobox-popover-custom\"\n            [ngClass]=\"{'fd-popover-body--display-none': displayedValues && !displayedValues.length}\">\n    <fd-popover-control>\n        <div class=\"fd-combobox-control\">\n            <div class=\"fd-input-group fd-input-group--after\" [ngClass]=\"{'fd-input-group--compact': compact}\">\n                <input #searchInputElement type=\"text\" class=\"fd-input\" [ngClass]=\"{'fd-input--compact': compact}\"\n                       (keydown)=\"onInputKeydownHandler($event)\"\n                       (keyup)=\"onInputKeyupHandler($event)\"\n                       [disabled]=\"disabled\"\n                       [(ngModel)]=\"inputText\"\n                       (ngModelChange)=\"handleSearchTermChange()\"\n                       placeholder=\"{{placeholder}}\">\n                <span class=\"fd-input-group__addon fd-input-group__addon--after fd-input-group__addon--button\">\n                    <button fd-button\n                            tabindex=\"-1\"\n                            type=\"button\"\n                            [fdType]=\"'light'\"\n                            [glyph]=\"glyph\"\n                            [disabled]=\"disabled\"\n                            (click)=\"onPrimaryButtonClick()\">\n                    </button>\n                </span>\n            </div>\n        </div>\n    </fd-popover-control>\n    <fd-popover-body *ngIf=\"displayedValues && displayedValues.length\">\n        <fd-menu class=\"fd-combobox-input-menu-overflow\"\n                 [style.maxHeight]=\"maxHeight\">\n            <ng-content></ng-content>\n            <ul fd-menu-list>\n                <li *ngFor=\"let term of displayedValues; let index = index;\"\n                    (click)=\"onMenuClickHandler(index)\"\n                    (keydown)=\"onMenuKeydownHandler($event, index)\"\n                    fd-menu-item\n                    tabindex=\"0\">\n                    <span *ngIf=\"!itemTemplate\"\n                          [innerHTML]=\"term | displayFnPipe:displayFn | highlight:inputText:highlighting\"\n                    ></span>\n                    <ng-container *ngIf=\"itemTemplate\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: term}\"></ng-container>\n                    </ng-container>\n                </li>\n            </ul>\n        </fd-menu>\n    </fd-popover-body>\n</fd-popover>\n\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ComboboxComponent; })),
                            multi: true
                        },
                        MenuKeyboardService
                    ],
                    host: {
                        '[class.fd-combobox-custom-class]': 'true',
                        '[class.fd-combobox-input]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-combobox-custom-class,.fd-combobox-custom-class .fd-combobox-popover-custom{display:block}.fd-combobox-custom-class .fd-combobox-input-menu-overflow{overflow:auto}"]
                }] }
    ];
    /** @nocollapse */
    ComboboxComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MenuKeyboardService }
    ]; };
    ComboboxComponent.propDecorators = {
        dropdownValues: [{ type: Input }],
        filterFn: [{ type: Input }],
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        glyph: [{ type: Input }],
        triggers: [{ type: Input }],
        itemTemplate: [{ type: Input }],
        maxHeight: [{ type: Input }],
        searchFunction: [{ type: Input }],
        compact: [{ type: Input }],
        highlighting: [{ type: Input }],
        closeOnSelect: [{ type: Input }],
        fillOnSelect: [{ type: Input }],
        communicateByObject: [{ type: Input }],
        displayFn: [{ type: Input }],
        itemClicked: [{ type: Output }],
        menuItems: [{ type: ViewChildren, args: [MenuItemDirective,] }],
        searchInputElement: [{ type: ViewChild, args: ['searchInputElement',] }]
    };
    return ComboboxComponent;
}());
export { ComboboxComponent };
if (false) {
    /**
     * Values to be filtered in the search input.
     * @type {?}
     */
    ComboboxComponent.prototype.dropdownValues;
    /**
     * Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details.
     * @type {?}
     */
    ComboboxComponent.prototype.filterFn;
    /**
     * Whether the search input is disabled. *
     * @type {?}
     */
    ComboboxComponent.prototype.disabled;
    /**
     * Placeholder of the search input. *
     * @type {?}
     */
    ComboboxComponent.prototype.placeholder;
    /**
     * Icon to display in the right-side button.
     * @type {?}
     */
    ComboboxComponent.prototype.glyph;
    /**
     *  The trigger events that will open/close the options popover, by default it is click, so if user click on
     *  input field, the popover with options will open or close
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     * @type {?}
     */
    ComboboxComponent.prototype.triggers;
    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     * @type {?}
     */
    ComboboxComponent.prototype.itemTemplate;
    /**
     * Max height of the popover. Any overflowing elements will be accessible through scrolling.
     * @type {?}
     */
    ComboboxComponent.prototype.maxHeight;
    /**
     * Search function to execute when the Enter key is pressed on the main input.
     * @type {?}
     */
    ComboboxComponent.prototype.searchFunction;
    /**
     * Whether the search input should be displayed in compact mode.
     * @type {?}
     */
    ComboboxComponent.prototype.compact;
    /**
     * Whether the matching string should be highlighted during filtration.
     * @type {?}
     */
    ComboboxComponent.prototype.highlighting;
    /**
     * Whether the popover should close when a user selects a result.
     * @type {?}
     */
    ComboboxComponent.prototype.closeOnSelect;
    /**
     * Whether the input field should be populated with the result picked by the user.
     * @type {?}
     */
    ComboboxComponent.prototype.fillOnSelect;
    /**
     * Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
     * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
     * can be achieved only by objects with same type as dropdownValue
     * @type {?}
     */
    ComboboxComponent.prototype.communicateByObject;
    /**
     * Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details.
     * @type {?}
     */
    ComboboxComponent.prototype.displayFn;
    /**
     * Event emitted when an item is clicked. Use *$event* to retrieve it.
     * @type {?}
     */
    ComboboxComponent.prototype.itemClicked;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.menuItems;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.searchInputElement;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.displayedValues;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.isOpen;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.inputTextValue;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.focusTrap;
    /**
     * @hidden
     * @type {?}
     * @private
     */
    ComboboxComponent.prototype.onDestroy$;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    ComboboxComponent.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    ComboboxComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    ComboboxComponent.prototype.menuKeyboardService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm9ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbWJvYm94L2NvbWJvYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDTSxXQUFXLEVBQzFCLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLFNBQXdCLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBY2xEO0lBOEhJLDJCQUNZLEtBQWlCLEVBQ2pCLG1CQUF3QztRQUR4QyxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7Ozs7UUExR3BELG1CQUFjLEdBQVUsRUFBRSxDQUFDOzs7OztRQUszQixhQUFRLEdBQWEsSUFBSSxDQUFDLGFBQWEsQ0FBQzs7OztRQVl4QyxVQUFLLEdBQVcsdUJBQXVCLENBQUM7Ozs7OztRQVF4QyxhQUFRLEdBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7OztRQVcvQixjQUFTLEdBQVcsT0FBTyxDQUFDOzs7O1FBUTVCLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsaUJBQVksR0FBWSxJQUFJLENBQUM7Ozs7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SUwsS0FBSztzQ0FNTCxLQUFLOzRCQU9MLEtBQUs7OEJBSUwsTUFBTTs0QkFJTixZQUFZLFNBQUMsaUJBQWlCO3FDQUk5QixTQUFTLFNBQUMsb0JBQW9COztJQTJNbkMsd0JBQUM7Q0FBQSxBQWpURCxJQWlUQztTQS9SWSxpQkFBaUI7Ozs7OztJQUcxQiwyQ0FDMkI7Ozs7OztJQUkzQixxQ0FDd0M7Ozs7O0lBR3hDLHFDQUNrQjs7Ozs7SUFHbEIsd0NBQ29COzs7OztJQUdwQixrQ0FDd0M7Ozs7Ozs7SUFPeEMscUNBQytCOzs7Ozs7SUFNL0IseUNBQytCOzs7OztJQUcvQixzQ0FDNEI7Ozs7O0lBRzVCLDJDQUN5Qjs7Ozs7SUFHekIsb0NBQ3lCOzs7OztJQUd6Qix5Q0FDNkI7Ozs7O0lBRzdCLDBDQUM4Qjs7Ozs7SUFHOUIseUNBQzZCOzs7Ozs7O0lBSzdCLGdEQUNxQzs7Ozs7Ozs7SUFNckMsc0NBQzBDOzs7OztJQUcxQyx3Q0FDb0Y7Ozs7O0lBR3BGLHNDQUN3Qzs7Ozs7SUFHeEMsK0NBQytCOzs7OztJQUcvQiw0Q0FBNEI7Ozs7O0lBRzVCLG1DQUF3Qjs7Ozs7SUFHeEIsMkNBQXVCOzs7OztJQUd2QixzQ0FBNEI7Ozs7OztJQUc1Qix1Q0FBaUU7Ozs7O0lBR2pFLHFDQUEwQjs7Ozs7SUFHMUIsc0NBQTJCOzs7OztJQUd2QixrQ0FBeUI7Ozs7O0lBQ3pCLGdEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDb21wb25lbnQsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBJbnB1dCxcbiAgICBPbkNoYW5nZXMsIE9uRGVzdHJveSxcbiAgICBPbkluaXQsXG4gICAgT3V0cHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZixcbiAgICBWaWV3Q2hpbGQsXG4gICAgVmlld0NoaWxkcmVuLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuLi9tZW51L21lbnUtaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29tYm9ib3hJdGVtIH0gZnJvbSAnLi9jb21ib2JveC1pdGVtJztcbmltcG9ydCB7IE1lbnVLZXlib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9tZW51L21lbnUta2V5Ym9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgZm9jdXNUcmFwLCB7IEZvY3VzVHJhcCB9IGZyb20gJ2ZvY3VzLXRyYXAnO1xuXG4vKipcbiAqIEFsbG93cyB1c2VycyB0byBmaWx0ZXIgdGhyb3VnaCByZXN1bHRzIGFuZCBzZWxlY3QgYSB2YWx1ZS5cbiAqXG4gKiBTdXBwb3J0cyBBbmd1bGFyIEZvcm1zLlxuICogYGBgaHRtbFxuICogPGZkLWNvbWJvYm94XG4gKiAgICAgIFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiXG4gKiAgICAgIFtkcm9wZG93blZhbHVlc109XCJkcm9wZG93blZhbHVlc1wiXG4gKiAgICAgIFtwbGFjZWhvbGRlcl09XCInVHlwZSBzb21lIHRleHQuLi4nXCI+XG4gKiA8L2ZkLWNvbWJvYm94PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtY29tYm9ib3gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb21ib2JveC5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY29tYm9ib3guY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBDb21ib2JveENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBNZW51S2V5Ym9hcmRTZXJ2aWNlXG4gICAgXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtY29tYm9ib3gtY3VzdG9tLWNsYXNzXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy5mZC1jb21ib2JveC1pbnB1dF0nOiAndHJ1ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ29tYm9ib3hDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICAvKiogVmFsdWVzIHRvIGJlIGZpbHRlcmVkIGluIHRoZSBzZWFyY2ggaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBkcm9wZG93blZhbHVlczogYW55W10gPSBbXTtcblxuICAgIC8qKiBGaWx0ZXIgZnVuY3Rpb24uIEFjY2VwdHMgYW4gYXJyYXkgb2Ygb2JqZWN0cyBhbmQgYSBzZWFyY2ggdGVybSBhcyBhcmd1bWVudHNcbiAgICAgKiBhbmQgcmV0dXJucyBhIHN0cmluZy4gU2VlIHNlYXJjaCBpbnB1dCBleGFtcGxlcyBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbHRlckZuOiBGdW5jdGlvbiA9IHRoaXMuZGVmYXVsdEZpbHRlcjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWFyY2ggaW5wdXQgaXMgZGlzYWJsZWQuICoqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogUGxhY2Vob2xkZXIgb2YgdGhlIHNlYXJjaCBpbnB1dC4gKiovXG4gICAgQElucHV0KClcbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuXG4gICAgLyoqIEljb24gdG8gZGlzcGxheSBpbiB0aGUgcmlnaHQtc2lkZSBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBnbHlwaDogc3RyaW5nID0gJ25hdmlnYXRpb24tZG93bi1hcnJvdyc7XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIHRyaWdnZXIgZXZlbnRzIHRoYXQgd2lsbCBvcGVuL2Nsb3NlIHRoZSBvcHRpb25zIHBvcG92ZXIsIGJ5IGRlZmF1bHQgaXQgaXMgY2xpY2ssIHNvIGlmIHVzZXIgY2xpY2sgb25cbiAgICAgKiAgaW5wdXQgZmllbGQsIHRoZSBwb3BvdmVyIHdpdGggb3B0aW9ucyB3aWxsIG9wZW4gb3IgY2xvc2VcbiAgICAgKiAgQWNjZXB0cyBhbnkgW0hUTUwgRE9NIEV2ZW50c10oaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9qc3JlZi9kb21fb2JqX2V2ZW50LmFzcCkuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICB0cmlnZ2Vyczogc3RyaW5nW10gPSBbJ2NsaWNrJ107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGVtcGxhdGUgd2l0aCB3aGljaCB0byBkaXNwbGF5IHRoZSBpbmRpdmlkdWFsIGxpc3RlZCBpdGVtcy5cbiAgICAgKiBVc2UgaXQgYnkgcGFzc2luZyBhbiBuZy10ZW1wbGF0ZSB3aXRoIGltcGxpY2l0IGNvbnRlbnQuIFNlZSBleGFtcGxlcyBmb3IgbW9yZSBpbmZvLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgLyoqIE1heCBoZWlnaHQgb2YgdGhlIHBvcG92ZXIuIEFueSBvdmVyZmxvd2luZyBlbGVtZW50cyB3aWxsIGJlIGFjY2Vzc2libGUgdGhyb3VnaCBzY3JvbGxpbmcuICovXG4gICAgQElucHV0KClcbiAgICBtYXhIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICAvKiogU2VhcmNoIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgRW50ZXIga2V5IGlzIHByZXNzZWQgb24gdGhlIG1haW4gaW5wdXQuICovXG4gICAgQElucHV0KClcbiAgICBzZWFyY2hGdW5jdGlvbjogRnVuY3Rpb247XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2VhcmNoIGlucHV0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW4gY29tcGFjdCBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIG1hdGNoaW5nIHN0cmluZyBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQgZHVyaW5nIGZpbHRyYXRpb24uICovXG4gICAgQElucHV0KClcbiAgICBoaWdobGlnaHRpbmc6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHBvcG92ZXIgc2hvdWxkIGNsb3NlIHdoZW4gYSB1c2VyIHNlbGVjdHMgYSByZXN1bHQuICovXG4gICAgQElucHV0KClcbiAgICBjbG9zZU9uU2VsZWN0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBmaWVsZCBzaG91bGQgYmUgcG9wdWxhdGVkIHdpdGggdGhlIHJlc3VsdCBwaWNrZWQgYnkgdGhlIHVzZXIuICovXG4gICAgQElucHV0KClcbiAgICBmaWxsT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIERlZmluZXMgaWYgY29tYm9ib3ggc2hvdWxkIGJlaGF2ZSBzYW1lIGFzIGRyb3Bkb3duLiBXaGVuIGl0J3MgZW5hYmxlZCB3cml0aW5nIGluc2lkZSB0ZXh0IGlucHV0IHdvbid0XG4gICAgICogdHJpZ2dlciBvbkNoYW5nZSBmdW5jdGlvbiwgdW50aWwgaXQgbWF0Y2hlcyBvbmUgb2YgZGlzcGxheWVkIGRyb3Bkb3duIHZhbHVlcy4gQWxzbyBjb21tdW5pY2F0aW5nIHdpdGggY29tYm9ib3hcbiAgICAgKiBjYW4gYmUgYWNoaWV2ZWQgb25seSBieSBvYmplY3RzIHdpdGggc2FtZSB0eXBlIGFzIGRyb3Bkb3duVmFsdWUgKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbW11bmljYXRlQnlPYmplY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBEaXNwbGF5IGZ1bmN0aW9uLiBBY2NlcHRzIGFuIG9iamVjdCBvZiB0aGUgc2FtZSB0eXBlIGFzIHRoZVxuICAgICAqIGl0ZW1zIHBhc3NlZCB0byBkcm9wZG93blZhbHVlcyBhcyBhcmd1bWVudCwgYW5kIG91dHB1dHMgYSBzdHJpbmcuXG4gICAgICogQW4gYXJyb3cgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gYWNjZXNzIHRoZSAqdGhpcyoga2V5d29yZCBpbiB0aGUgY2FsbGluZyBjb21wb25lbnQuXG4gICAgICogU2VlIHNlYXJjaCBpbnB1dCBleGFtcGxlcyBmb3IgZGV0YWlscy4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc3BsYXlGbjogRnVuY3Rpb24gPSB0aGlzLmRlZmF1bHREaXNwbGF5O1xuXG4gICAgLyoqIEV2ZW50IGVtaXR0ZWQgd2hlbiBhbiBpdGVtIGlzIGNsaWNrZWQuIFVzZSAqJGV2ZW50KiB0byByZXRyaWV2ZSBpdC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBpdGVtQ2xpY2tlZDogRXZlbnRFbWl0dGVyPENvbWJvYm94SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPENvbWJvYm94SXRlbT4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZHJlbihNZW51SXRlbURpcmVjdGl2ZSlcbiAgICBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxNZW51SXRlbURpcmVjdGl2ZT47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0RWxlbWVudCcpXG4gICAgc2VhcmNoSW5wdXRFbGVtZW50OiBFbGVtZW50UmVmO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBkaXNwbGF5ZWRWYWx1ZXM6IGFueVtdID0gW107XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbnB1dFRleHRWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwdWJsaWMgZm9jdXNUcmFwOiBGb2N1c1RyYXA7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHByaXZhdGUgcmVhZG9ubHkgb25EZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4geyB9O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgbWVudUtleWJvYXJkU2VydmljZTogTWVudUtleWJvYXJkU2VydmljZVxuICAgICkgeyB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0dXBGb2N1c1RyYXAoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcGRvd25WYWx1ZXMgJiYgKGNoYW5nZXMuZHJvcGRvd25WYWx1ZXMgfHwgY2hhbmdlcy5zZWFyY2hUZXJtKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRUZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmZpbHRlckZuKHRoaXMuZHJvcGRvd25WYWx1ZXMsIHRoaXMuaW5wdXRUZXh0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmRyb3Bkb3duVmFsdWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5uZXh0KCk7XG4gICAgICAgIHRoaXMub25EZXN0cm95JC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1lbnVLZXlib2FyZFNlcnZpY2UuaXRlbUNsaWNrZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLm9uRGVzdHJveSQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpbmRleCA9PiB0aGlzLm9uTWVudUNsaWNrSGFuZGxlcihpbmRleCkpO1xuICAgICAgICB0aGlzLm1lbnVLZXlib2FyZFNlcnZpY2UuZm9jdXNFc2NhcGVCZWZvcmVMaXN0ID0gKCkgPT4gdGhpcy5zZWFyY2hJbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB0aGlzLm1lbnVLZXlib2FyZFNlcnZpY2UuZm9jdXNFc2NhcGVBZnRlckxpc3QgPSAoKSA9PiB7IH07XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbklucHV0S2V5ZG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT09ICdFbnRlcicgJiYgdGhpcy5zZWFyY2hGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmNvZGUgPT09ICdBcnJvd0Rvd24nKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYgKHRoaXMubWVudUl0ZW1zICYmIHRoaXMubWVudUl0ZW1zLmZpcnN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZW51SXRlbXMuZmlyc3QuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25JbnB1dEtleXVwSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pbnB1dFRleHQgJiZcbiAgICAgICAgICAgIHRoaXMuaW5wdXRUZXh0Lmxlbmd0aCAmJlxuICAgICAgICAgICAgZXZlbnQuY29kZSAhPT0gJ0VzY2FwZScgJiZcbiAgICAgICAgICAgIGV2ZW50LmNvZGUgIT09ICdTcGFjZScgJiZcbiAgICAgICAgICAgIGV2ZW50LmNvZGUgIT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlSGFuZGxlKHRoaXMuaXNPcGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25NZW51S2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5tZW51S2V5Ym9hcmRTZXJ2aWNlLmtleURvd25IYW5kbGVyKGV2ZW50LCBpbmRleCwgdGhpcy5tZW51SXRlbXMudG9BcnJheSgpKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uTWVudUNsaWNrSGFuZGxlcihpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IHRoaXMuZGlzcGxheWVkVmFsdWVzW2luZGV4XTtcbiAgICAgICAgaWYgKHNlbGVjdGVkSXRlbSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDbGlja0FjdGlvbnMoc2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbUNsaWNrZWQuZW1pdCh7IGl0ZW06IHNlbGVjdGVkSXRlbSwgaW5kZXg6IGluZGV4IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgaW5wdXQgdGV4dCBvZiB0aGUgaW5wdXQuICovXG4gICAgZ2V0IGlucHV0VGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFRleHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSBpbnB1dCB0ZXh0IG9mIHRoZSBpbnB1dC4gKi9cbiAgICBzZXQgaW5wdXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgaWYgKHRoaXMuY29tbXVuaWNhdGVCeU9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmdldE9wdGlvbk9iamVjdEJ5RGlzcGxheWVkVmFsdWUodmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY29tbXVuaWNhdGVCeU9iamVjdCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHRoaXMuZGlzcGxheUZuKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaGFuZGxlU2VhcmNoVGVybUNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5ZWRWYWx1ZXMgPSB0aGlzLmZpbHRlckZuKHRoaXMuZHJvcGRvd25WYWx1ZXMsIHRoaXMuaW5wdXRUZXh0KTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uUHJpbWFyeUJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hGdW5jdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpc09wZW5DaGFuZ2VIYW5kbGUoaXNPcGVuOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNPcGVuID0gaXNPcGVuO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcC5hY3RpdmF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RGlzcGxheShzdHI6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZWZhdWx0RmlsdGVyKGNvbnRlbnRBcnJheTogYW55W10sIHNlYXJjaFRlcm06IHN0cmluZyk6IGFueVtdIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoTG93ZXIgPSBzZWFyY2hUZXJtLnRvTG9jYWxlTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBjb250ZW50QXJyYXkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Rm4oaXRlbSkudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hMb3dlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2tBY3Rpb25zKHRlcm0pOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPblNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuQ2hhbmdlSGFuZGxlKHRoaXMuaXNPcGVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maWxsT25TZWxlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gdGhpcy5kaXNwbGF5Rm4odGVybSk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVNlYXJjaFRlcm1DaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0T3B0aW9uT2JqZWN0QnlEaXNwbGF5ZWRWYWx1ZShkaXNwbGF5VmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVmFsdWVzLmZpbmQodmFsdWUgPT4gdGhpcy5kaXNwbGF5Rm4odmFsdWUpID09PSBkaXNwbGF5VmFsdWUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBGb2N1c1RyYXAoKTogdm9pZCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcCA9IGZvY3VzVHJhcCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgICAgICBjbGlja091dHNpZGVEZWFjdGl2YXRlczogdHJ1ZSxcbiAgICAgICAgICAgICAgICByZXR1cm5Gb2N1c09uRGVhY3RpdmF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlc2NhcGVEZWFjdGl2YXRlczogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1Vuc3VjY2Vzc2Z1bCBhdHRlbXB0aW5nIHRvIGZvY3VzIHRyYXAgdGhlIENvbWJvYm94LicpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=