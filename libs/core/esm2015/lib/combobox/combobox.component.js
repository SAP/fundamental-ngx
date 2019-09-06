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
export class ComboboxComponent {
    /**
     * @param {?} elRef
     * @param {?} menuKeyboardService
     */
    constructor(elRef, menuKeyboardService) {
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
        this.setupFocusTrap();
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
     * @return {?}
     */
    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngAfterViewInit() {
        this.menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((/**
         * @param {?} index
         * @return {?}
         */
        index => this.onMenuClickHandler(index)));
        this.menuKeyboardService.focusEscapeBeforeList = (/**
         * @return {?}
         */
        () => this.searchInputElement.nativeElement.focus());
        this.menuKeyboardService.focusEscapeAfterList = (/**
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
                this.menuItems.first.focus();
            }
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @return {?}
     */
    onInputKeyupHandler(event) {
        if (this.inputText &&
            this.inputText.length &&
            event.code !== 'Escape' &&
            event.code !== 'Space' &&
            event.code !== 'Enter') {
            this.isOpen = true;
            this.isOpenChangeHandle(this.isOpen);
        }
    }
    /**
     * @hidden
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    onMenuKeydownHandler(event, index) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    }
    /**
     * @hidden
     * @param {?} index
     * @return {?}
     */
    onMenuClickHandler(index) {
        /** @type {?} */
        const selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this.handleClickActions(selectedItem);
            this.itemClicked.emit({ item: selectedItem, index: index });
        }
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
        if (this.communicateByObject) {
            this.onChange(this.getOptionObjectByDisplayedValue(value));
        }
        else {
            this.onChange(value);
        }
        this.onTouched();
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (this.communicateByObject) {
            this.inputTextValue = this.displayFn(value);
        }
        else {
            this.inputTextValue = value;
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
     * @return {?}
     */
    handleSearchTermChange() {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }
    /**
     * @hidden
     * @return {?}
     */
    onPrimaryButtonClick() {
        if (this.searchFunction) {
            this.searchFunction();
        }
    }
    /**
     * @hidden
     * @param {?} isOpen
     * @return {?}
     */
    isOpenChangeHandle(isOpen) {
        this.isOpen = isOpen;
        this.onTouched();
        if (isOpen) {
            this.focusTrap.activate();
        }
        else {
            this.focusTrap.deactivate();
        }
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
    /**
     * @private
     * @param {?} term
     * @return {?}
     */
    handleClickActions(term) {
        if (this.closeOnSelect) {
            this.isOpen = false;
            this.isOpenChangeHandle(this.isOpen);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }
    /**
     * @private
     * @param {?} displayValue
     * @return {?}
     */
    getOptionObjectByDisplayedValue(displayValue) {
        return this.dropdownValues.find((/**
         * @param {?} value
         * @return {?}
         */
        value => this.displayFn(value) === displayValue));
    }
    /**
     * @private
     * @return {?}
     */
    setupFocusTrap() {
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
    }
}
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
                        () => ComboboxComponent)),
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
ComboboxComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: MenuKeyboardService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm9ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2NvbWJvYm94L2NvbWJvYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDTSxXQUFXLEVBQzFCLFNBQVMsRUFDVCxZQUFZLEVBQ1osaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVoRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNwRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLFNBQXdCLE1BQU0sWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBZ0NsRCxNQUFNLE9BQU8saUJBQWlCOzs7OztJQTRHMUIsWUFDWSxLQUFpQixFQUNqQixtQkFBd0M7UUFEeEMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUNqQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCOzs7O1FBMUdwRCxtQkFBYyxHQUFVLEVBQUUsQ0FBQzs7Ozs7UUFLM0IsYUFBUSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7UUFZeEMsVUFBSyxHQUFXLHVCQUF1QixDQUFDOzs7Ozs7UUFReEMsYUFBUSxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7UUFXL0IsY0FBUyxHQUFXLE9BQU8sQ0FBQzs7OztRQVE1QixZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7O1FBSTdCLGtCQUFhLEdBQVksSUFBSSxDQUFDOzs7O1FBSTlCLGlCQUFZLEdBQVksSUFBSSxDQUFDOzs7Ozs7UUFNN0Isd0JBQW1CLEdBQVksS0FBSyxDQUFDOzs7Ozs7O1FBT3JDLGNBQVMsR0FBYSxJQUFJLENBQUMsY0FBYyxDQUFDOzs7O1FBSWpDLGdCQUFXLEdBQStCLElBQUksWUFBWSxFQUFnQixDQUFDOzs7O1FBV3BGLG9CQUFlLEdBQVUsRUFBRSxDQUFDOzs7O1FBRzVCLFdBQU0sR0FBWSxLQUFLLENBQUM7Ozs7UUFTUCxlQUFVLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7Ozs7UUFHakUsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFDOzs7O1FBRzFCLGNBQVM7OztRQUFRLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBQztJQUt2QixDQUFDOzs7OztJQUdMLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUdELFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN2RSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM3RTtpQkFBTTtnQkFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDOUM7U0FDSjtJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBR0QsZUFBZTtRQUNYLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXO2FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxxQkFBcUI7OztRQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQztRQUNyRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsb0JBQW9COzs7UUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUEsQ0FBQztJQUM5RCxDQUFDOzs7Ozs7SUFHRCxxQkFBcUIsQ0FBQyxLQUFLO1FBQ3ZCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMvQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDekI7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQ25DLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hDO1NBQ0o7SUFDTCxDQUFDOzs7Ozs7SUFHRCxtQkFBbUIsQ0FBQyxLQUFvQjtRQUNwQyxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1lBQ3JCLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUN2QixLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDdEIsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7Ozs7Ozs7SUFHRCxvQkFBb0IsQ0FBQyxLQUFvQixFQUFFLEtBQWE7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNwRixDQUFDOzs7Ozs7SUFHRCxrQkFBa0IsQ0FBQyxLQUFhOztjQUN0QixZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDaEQsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxJQUFJLFNBQVM7UUFDVCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBR0QsSUFBSSxTQUFTLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzVCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDOUQ7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO2FBQU07WUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUMvQjtJQUNMLENBQUM7Ozs7OztJQUdELGdCQUFnQixDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBR0Qsc0JBQXNCO1FBQ2xCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5RSxDQUFDOzs7OztJQUdELG9CQUFvQjtRQUNoQixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCO0lBQ0wsQ0FBQzs7Ozs7O0lBR0Qsa0JBQWtCLENBQUMsTUFBZTtRQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQy9CO0lBQ0wsQ0FBQzs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQzs7Ozs7O0lBRU8sY0FBYyxDQUFDLEdBQVE7UUFDM0IsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBRU8sYUFBYSxDQUFDLFlBQW1CLEVBQUUsVUFBa0I7O2NBQ25ELFdBQVcsR0FBRyxVQUFVLENBQUMsaUJBQWlCLEVBQUU7UUFDbEQsT0FBTyxZQUFZLENBQUMsTUFBTTs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQzlCLElBQUksSUFBSSxFQUFFO2dCQUNOLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6RTtRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsSUFBSTtRQUMzQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOzs7Ozs7SUFFTywrQkFBK0IsQ0FBQyxZQUFvQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSTs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxZQUFZLEVBQUMsQ0FBQztJQUNyRixDQUFDOzs7OztJQUVPLGNBQWM7UUFDbEIsSUFBSTtZQUNBLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO2dCQUNqRCx1QkFBdUIsRUFBRSxJQUFJO2dCQUM3Qix1QkFBdUIsRUFBRSxJQUFJO2dCQUM3QixpQkFBaUIsRUFBRSxLQUFLO2FBQzNCLENBQUMsQ0FBQztTQUNOO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLENBQUMsSUFBSSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7U0FDdkU7SUFDTCxDQUFDOzs7WUEvU0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2Qiw0bUZBQXdDO2dCQUV4QyxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBQzt3QkFDaEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7b0JBQ0QsbUJBQW1CO2lCQUN0QjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0Ysa0NBQWtDLEVBQUUsTUFBTTtvQkFDMUMsMkJBQTJCLEVBQUUsTUFBTTtpQkFDdEM7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBbERHLFVBQVU7WUFnQkwsbUJBQW1COzs7NkJBc0N2QixLQUFLO3VCQUtMLEtBQUs7dUJBSUwsS0FBSzswQkFJTCxLQUFLO29CQUlMLEtBQUs7dUJBUUwsS0FBSzsyQkFPTCxLQUFLO3dCQUlMLEtBQUs7NkJBSUwsS0FBSztzQkFJTCxLQUFLOzJCQUlMLEtBQUs7NEJBSUwsS0FBSzsyQkFJTCxLQUFLO2tDQU1MLEtBQUs7d0JBT0wsS0FBSzswQkFJTCxNQUFNO3dCQUlOLFlBQVksU0FBQyxpQkFBaUI7aUNBSTlCLFNBQVMsU0FBQyxvQkFBb0I7Ozs7Ozs7SUFqRi9CLDJDQUMyQjs7Ozs7O0lBSTNCLHFDQUN3Qzs7Ozs7SUFHeEMscUNBQ2tCOzs7OztJQUdsQix3Q0FDb0I7Ozs7O0lBR3BCLGtDQUN3Qzs7Ozs7OztJQU94QyxxQ0FDK0I7Ozs7OztJQU0vQix5Q0FDK0I7Ozs7O0lBRy9CLHNDQUM0Qjs7Ozs7SUFHNUIsMkNBQ3lCOzs7OztJQUd6QixvQ0FDeUI7Ozs7O0lBR3pCLHlDQUM2Qjs7Ozs7SUFHN0IsMENBQzhCOzs7OztJQUc5Qix5Q0FDNkI7Ozs7Ozs7SUFLN0IsZ0RBQ3FDOzs7Ozs7OztJQU1yQyxzQ0FDMEM7Ozs7O0lBRzFDLHdDQUNvRjs7Ozs7SUFHcEYsc0NBQ3dDOzs7OztJQUd4QywrQ0FDK0I7Ozs7O0lBRy9CLDRDQUE0Qjs7Ozs7SUFHNUIsbUNBQXdCOzs7OztJQUd4QiwyQ0FBdUI7Ozs7O0lBR3ZCLHNDQUE0Qjs7Ozs7O0lBRzVCLHVDQUFpRTs7Ozs7SUFHakUscUNBQTBCOzs7OztJQUcxQixzQ0FBMkI7Ozs7O0lBR3ZCLGtDQUF5Qjs7Ozs7SUFDekIsZ0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENvbXBvbmVudCxcbiAgICBFbGVtZW50UmVmLFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBmb3J3YXJkUmVmLFxuICAgIElucHV0LFxuICAgIE9uQ2hhbmdlcywgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPdXRwdXQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uL21lbnUvbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDb21ib2JveEl0ZW0gfSBmcm9tICcuL2NvbWJvYm94LWl0ZW0nO1xuaW1wb3J0IHsgTWVudUtleWJvYXJkU2VydmljZSB9IGZyb20gJy4uL21lbnUvbWVudS1rZXlib2FyZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBmb2N1c1RyYXAsIHsgRm9jdXNUcmFwIH0gZnJvbSAnZm9jdXMtdHJhcCc7XG5cbi8qKlxuICogQWxsb3dzIHVzZXJzIHRvIGZpbHRlciB0aHJvdWdoIHJlc3VsdHMgYW5kIHNlbGVjdCBhIHZhbHVlLlxuICpcbiAqIFN1cHBvcnRzIEFuZ3VsYXIgRm9ybXMuXG4gKiBgYGBodG1sXG4gKiA8ZmQtY29tYm9ib3hcbiAqICAgICAgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCJcbiAqICAgICAgW2Ryb3Bkb3duVmFsdWVzXT1cImRyb3Bkb3duVmFsdWVzXCJcbiAqICAgICAgW3BsYWNlaG9sZGVyXT1cIidUeXBlIHNvbWUgdGV4dC4uLidcIj5cbiAqIDwvZmQtY29tYm9ib3g+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1jb21ib2JveCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbWJvYm94LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9jb21ib2JveC5jb21wb25lbnQuc2NzcyddLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IENvbWJvYm94Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIE1lbnVLZXlib2FyZFNlcnZpY2VcbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5mZC1jb21ib2JveC1jdXN0b20tY2xhc3NdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLmZkLWNvbWJvYm94LWlucHV0XSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBDb21ib2JveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8qKiBWYWx1ZXMgdG8gYmUgZmlsdGVyZWQgaW4gdGhlIHNlYXJjaCBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRyb3Bkb3duVmFsdWVzOiBhbnlbXSA9IFtdO1xuXG4gICAgLyoqIEZpbHRlciBmdW5jdGlvbi4gQWNjZXB0cyBhbiBhcnJheSBvZiBvYmplY3RzIGFuZCBhIHNlYXJjaCB0ZXJtIGFzIGFyZ3VtZW50c1xuICAgICAqIGFuZCByZXR1cm5zIGEgc3RyaW5nLiBTZWUgc2VhcmNoIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZmlsdGVyRm46IEZ1bmN0aW9uID0gdGhpcy5kZWZhdWx0RmlsdGVyO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHNlYXJjaCBpbnB1dCBpcyBkaXNhYmxlZC4gKiovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBvZiB0aGUgc2VhcmNoIGlucHV0LiAqKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKiogSWNvbiB0byBkaXNwbGF5IGluIHRoZSByaWdodC1zaWRlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdseXBoOiBzdHJpbmcgPSAnbmF2aWdhdGlvbi1kb3duLWFycm93JztcblxuICAgIC8qKlxuICAgICAqICBUaGUgdHJpZ2dlciBldmVudHMgdGhhdCB3aWxsIG9wZW4vY2xvc2UgdGhlIG9wdGlvbnMgcG9wb3ZlciwgYnkgZGVmYXVsdCBpdCBpcyBjbGljaywgc28gaWYgdXNlciBjbGljayBvblxuICAgICAqICBpbnB1dCBmaWVsZCwgdGhlIHBvcG92ZXIgd2l0aCBvcHRpb25zIHdpbGwgb3BlbiBvciBjbG9zZVxuICAgICAqICBBY2NlcHRzIGFueSBbSFRNTCBET00gRXZlbnRzXShodHRwczovL3d3dy53M3NjaG9vbHMuY29tL2pzcmVmL2RvbV9vYmpfZXZlbnQuYXNwKS5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHRyaWdnZXJzOiBzdHJpbmdbXSA9IFsnY2xpY2snXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0ZW1wbGF0ZSB3aXRoIHdoaWNoIHRvIGRpc3BsYXkgdGhlIGluZGl2aWR1YWwgbGlzdGVkIGl0ZW1zLlxuICAgICAqIFVzZSBpdCBieSBwYXNzaW5nIGFuIG5nLXRlbXBsYXRlIHdpdGggaW1wbGljaXQgY29udGVudC4gU2VlIGV4YW1wbGVzIGZvciBtb3JlIGluZm8uXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogTWF4IGhlaWdodCBvZiB0aGUgcG9wb3Zlci4gQW55IG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpbGwgYmUgYWNjZXNzaWJsZSB0aHJvdWdoIHNjcm9sbGluZy4gKi9cbiAgICBASW5wdXQoKVxuICAgIG1heEhlaWdodDogc3RyaW5nID0gJzIwMHB4JztcblxuICAgIC8qKiBTZWFyY2ggZnVuY3Rpb24gdG8gZXhlY3V0ZSB3aGVuIHRoZSBFbnRlciBrZXkgaXMgcHJlc3NlZCBvbiB0aGUgbWFpbiBpbnB1dC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNlYXJjaEZ1bmN0aW9uOiBGdW5jdGlvbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzZWFyY2ggaW5wdXQgc2hvdWxkIGJlIGRpc3BsYXllZCBpbiBjb21wYWN0IG1vZGUuICovXG4gICAgQElucHV0KClcbiAgICBjb21wYWN0OiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbWF0Y2hpbmcgc3RyaW5nIHNob3VsZCBiZSBoaWdobGlnaHRlZCBkdXJpbmcgZmlsdHJhdGlvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGhpZ2hsaWdodGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcG9wb3ZlciBzaG91bGQgY2xvc2Ugd2hlbiBhIHVzZXIgc2VsZWN0cyBhIHJlc3VsdC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNsb3NlT25TZWxlY3Q6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGZpZWxkIHNob3VsZCBiZSBwb3B1bGF0ZWQgd2l0aCB0aGUgcmVzdWx0IHBpY2tlZCBieSB0aGUgdXNlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIGZpbGxPblNlbGVjdDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogRGVmaW5lcyBpZiBjb21ib2JveCBzaG91bGQgYmVoYXZlIHNhbWUgYXMgZHJvcGRvd24uIFdoZW4gaXQncyBlbmFibGVkIHdyaXRpbmcgaW5zaWRlIHRleHQgaW5wdXQgd29uJ3RcbiAgICAgKiB0cmlnZ2VyIG9uQ2hhbmdlIGZ1bmN0aW9uLCB1bnRpbCBpdCBtYXRjaGVzIG9uZSBvZiBkaXNwbGF5ZWQgZHJvcGRvd24gdmFsdWVzLiBBbHNvIGNvbW11bmljYXRpbmcgd2l0aCBjb21ib2JveFxuICAgICAqIGNhbiBiZSBhY2hpZXZlZCBvbmx5IGJ5IG9iamVjdHMgd2l0aCBzYW1lIHR5cGUgYXMgZHJvcGRvd25WYWx1ZSAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tbXVuaWNhdGVCeU9iamVjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIERpc3BsYXkgZnVuY3Rpb24uIEFjY2VwdHMgYW4gb2JqZWN0IG9mIHRoZSBzYW1lIHR5cGUgYXMgdGhlXG4gICAgICogaXRlbXMgcGFzc2VkIHRvIGRyb3Bkb3duVmFsdWVzIGFzIGFyZ3VtZW50LCBhbmQgb3V0cHV0cyBhIHN0cmluZy5cbiAgICAgKiBBbiBhcnJvdyBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBhY2Nlc3MgdGhlICp0aGlzKiBrZXl3b3JkIGluIHRoZSBjYWxsaW5nIGNvbXBvbmVudC5cbiAgICAgKiBTZWUgc2VhcmNoIGlucHV0IGV4YW1wbGVzIGZvciBkZXRhaWxzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzcGxheUZuOiBGdW5jdGlvbiA9IHRoaXMuZGVmYXVsdERpc3BsYXk7XG5cbiAgICAvKiogRXZlbnQgZW1pdHRlZCB3aGVuIGFuIGl0ZW0gaXMgY2xpY2tlZC4gVXNlICokZXZlbnQqIHRvIHJldHJpZXZlIGl0LiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGl0ZW1DbGlja2VkOiBFdmVudEVtaXR0ZXI8Q29tYm9ib3hJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8Q29tYm9ib3hJdGVtPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkcmVuKE1lbnVJdGVtRGlyZWN0aXZlKVxuICAgIG1lbnVJdGVtczogUXVlcnlMaXN0PE1lbnVJdGVtRGlyZWN0aXZlPjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXRFbGVtZW50JylcbiAgICBzZWFyY2hJbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGRpc3BsYXllZFZhbHVlczogYW55W10gPSBbXTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlucHV0VGV4dFZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHB1YmxpYyBmb2N1c1RyYXA6IEZvY3VzVHJhcDtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHJpdmF0ZSByZWFkb25seSBvbkRlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBtZW51S2V5Ym9hcmRTZXJ2aWNlOiBNZW51S2V5Ym9hcmRTZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRyb3Bkb3duVmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZHJvcGRvd25WYWx1ZXM7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXR1cEZvY3VzVHJhcCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kcm9wZG93blZhbHVlcyAmJiAoY2hhbmdlcy5kcm9wZG93blZhbHVlcyB8fCBjaGFuZ2VzLnNlYXJjaFRlcm0pKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5pbnB1dFRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZHJvcGRvd25WYWx1ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kkLm5leHQoKTtcbiAgICAgICAgdGhpcy5vbkRlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWVudUtleWJvYXJkU2VydmljZS5pdGVtQ2xpY2tlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMub25EZXN0cm95JCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGluZGV4ID0+IHRoaXMub25NZW51Q2xpY2tIYW5kbGVyKGluZGV4KSk7XG4gICAgICAgIHRoaXMubWVudUtleWJvYXJkU2VydmljZS5mb2N1c0VzY2FwZUJlZm9yZUxpc3QgPSAoKSA9PiB0aGlzLnNlYXJjaElucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMubWVudUtleWJvYXJkU2VydmljZS5mb2N1c0VzY2FwZUFmdGVyTGlzdCA9ICgpID0+IHsgfTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uSW5wdXRLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0VudGVyJyAmJiB0aGlzLnNlYXJjaEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEZ1bmN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuY29kZSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy5tZW51SXRlbXMgJiYgdGhpcy5tZW51SXRlbXMuZmlyc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVJdGVtcy5maXJzdC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbklucHV0S2V5dXBIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dCAmJlxuICAgICAgICAgICAgdGhpcy5pbnB1dFRleHQubGVuZ3RoICYmXG4gICAgICAgICAgICBldmVudC5jb2RlICE9PSAnRXNjYXBlJyAmJlxuICAgICAgICAgICAgZXZlbnQuY29kZSAhPT0gJ1NwYWNlJyAmJlxuICAgICAgICAgICAgZXZlbnQuY29kZSAhPT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2VIYW5kbGUodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbk1lbnVLZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLm1lbnVLZXlib2FyZFNlcnZpY2Uua2V5RG93bkhhbmRsZXIoZXZlbnQsIGluZGV4LCB0aGlzLm1lbnVJdGVtcy50b0FycmF5KCkpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25NZW51Q2xpY2tIYW5kbGVyKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJdGVtID0gdGhpcy5kaXNwbGF5ZWRWYWx1ZXNbaW5kZXhdO1xuICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrQWN0aW9ucyhzZWxlY3RlZEl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5pdGVtQ2xpY2tlZC5lbWl0KHsgaXRlbTogc2VsZWN0ZWRJdGVtLCBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogR2V0IHRoZSBpbnB1dCB0ZXh0IG9mIHRoZSBpbnB1dC4gKi9cbiAgICBnZXQgaW5wdXRUZXh0KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VGV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIGlucHV0IHRleHQgb2YgdGhlIGlucHV0LiAqL1xuICAgIHNldCBpbnB1dFRleHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAodGhpcy5jb21tdW5pY2F0ZUJ5T2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuZ2V0T3B0aW9uT2JqZWN0QnlEaXNwbGF5ZWRWYWx1ZSh2YWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jb21tdW5pY2F0ZUJ5T2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdGhpcy5kaXNwbGF5Rm4odmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBoYW5kbGVTZWFyY2hUZXJtQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BsYXllZFZhbHVlcyA9IHRoaXMuZmlsdGVyRm4odGhpcy5kcm9wZG93blZhbHVlcywgdGhpcy5pbnB1dFRleHQpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25QcmltYXJ5QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNlYXJjaEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaEZ1bmN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlzT3BlbkNoYW5nZUhhbmRsZShpc09wZW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBpc09wZW47XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHREaXNwbGF5KHN0cjogYW55KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlZmF1bHRGaWx0ZXIoY29udGVudEFycmF5OiBhbnlbXSwgc2VhcmNoVGVybTogc3RyaW5nKTogYW55W10ge1xuICAgICAgICBjb25zdCBzZWFyY2hMb3dlciA9IHNlYXJjaFRlcm0udG9Mb2NhbGVMb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnRBcnJheS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlGbihpdGVtKS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaExvd2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDbGlja0FjdGlvbnModGVybSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc09wZW5DaGFuZ2VIYW5kbGUodGhpcy5pc09wZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpbGxPblNlbGVjdCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dFRleHQgPSB0aGlzLmRpc3BsYXlGbih0ZXJtKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VhcmNoVGVybUNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRPcHRpb25PYmplY3RCeURpc3BsYXllZFZhbHVlKGRpc3BsYXlWYWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25WYWx1ZXMuZmluZCh2YWx1ZSA9PiB0aGlzLmRpc3BsYXlGbih2YWx1ZSkgPT09IGRpc3BsYXlWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXR1cEZvY3VzVHJhcCgpOiB2b2lkIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwID0gZm9jdXNUcmFwKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJldHVybkZvY3VzT25EZWFjdGl2YXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVzY2FwZURlYWN0aXZhdGVzOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5zdWNjZXNzZnVsIGF0dGVtcHRpbmcgdG8gZm9jdXMgdHJhcCB0aGUgQ29tYm9ib3guJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==