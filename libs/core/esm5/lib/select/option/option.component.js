/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Used to represent an option of the select component.
 */
var OptionComponent = /** @class */ (function () {
    /** @hidden */
    function OptionComponent(elRef) {
        this.elRef = elRef;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
        /**
         * @hidden
         */
        this.selected = false;
        /**
         * Whether to disable this option specifically.
         */
        this.disabled = false;
        /**
         * Emitted when the selected state changes.
         */
        this.selectedChange = new EventEmitter();
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    OptionComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.selected && !this.disabled) {
            this.focus();
        }
    };
    Object.defineProperty(OptionComponent.prototype, "viewValueText", {
        /** Returns the view value text of the option, or the viewValue input if it exists. */
        get: /**
         * Returns the view value text of the option, or the viewValue input if it exists.
         * @return {?}
         */
        function () {
            return this.viewValue ? this.viewValue :
                (((/** @type {?} */ (this.elRef.nativeElement))).textContent || '').trim();
        },
        enumerable: true,
        configurable: true
    });
    /** Returns the view value text of the option, or the viewValue input if it exists. */
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    OptionComponent.prototype.setSelected = /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    function (value, fireEvent) {
        if (fireEvent === void 0) { fireEvent = true; }
        this.selected = value;
        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    };
    /** Focuses the element. */
    /**
     * Focuses the element.
     * @return {?}
     */
    OptionComponent.prototype.focus = /**
     * Focuses the element.
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this.elRef.nativeElement))).focus();
    };
    /** Returns HTMLElement representation of the component. */
    /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    OptionComponent.prototype.getHtmlElement = /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    function () {
        return (/** @type {?} */ (this.elRef.nativeElement));
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    OptionComponent.prototype.selectionHandler = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (!this.selected && !this.disabled) {
            this.selected = true;
            this.selectedChange.emit(this);
        }
    };
    OptionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-option',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        '[class.fd-option-default-custom]': 'true',
                        '[attr.aria-disabled]': 'disabled',
                        '[tabindex]': 'disabled ? -1 : 0',
                        'role': 'option',
                    },
                    styles: [".fd-option-default-custom{text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden}.fd-option-default-custom:focus{color:var(--fd-color-text-1);background-color:var(--fd-color-background-hover);outline:0}.fd-option-default-custom.is-selected:focus{background-color:var(--fd-color-background-selected-hover)}"]
                }] }
    ];
    /** @nocollapse */
    OptionComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    OptionComponent.propDecorators = {
        fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }],
        selected: [{ type: HostBinding, args: ['class.is-selected',] }],
        value: [{ type: Input }],
        disabled: [{ type: Input }],
        viewValue: [{ type: Input }],
        selectedChange: [{ type: Output }],
        selectionHandler: [{ type: HostListener, args: ['keydown.enter',] }, { type: HostListener, args: ['click',] }]
    };
    return OptionComponent;
}());
export { OptionComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    OptionComponent.prototype.fdMenuItemClass;
    /**
     * @hidden
     * @type {?}
     */
    OptionComponent.prototype.selected;
    /**
     * Value of the option. Similar to how a native select operates.
     * @type {?}
     */
    OptionComponent.prototype.value;
    /**
     * Whether to disable this option specifically.
     * @type {?}
     */
    OptionComponent.prototype.disabled;
    /**
     * Override for the view value of the option. If none is provided, the text content is used.
     * @type {?}
     */
    OptionComponent.prototype.viewValue;
    /**
     * Emitted when the selected state changes.
     * @type {?}
     */
    OptionComponent.prototype.selectedChange;
    /**
     * @type {?}
     * @private
     */
    OptionComponent.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvb3B0aW9uL29wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLekk7SUF1Q0ksY0FBYztJQUNkLHlCQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzs7O1FBeEJyQyxvQkFBZSxHQUFZLElBQUksQ0FBQzs7OztRQUloQyxhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBUTFCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFRakIsbUJBQWMsR0FDakIsSUFBSSxZQUFZLEVBQW1CLENBQUM7SUFHRixDQUFDO0lBR3pDLGNBQWM7Ozs7O0lBQ2Qsa0NBQVE7Ozs7SUFBUjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQztJQUdELHNCQUFJLDBDQUFhO1FBRGpCLHNGQUFzRjs7Ozs7UUFDdEY7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFlLENBQUMsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0UsQ0FBQzs7O09BQUE7SUFFRCxzRkFBc0Y7Ozs7Ozs7SUFDdEYscUNBQVc7Ozs7OztJQUFYLFVBQVksS0FBYyxFQUFFLFNBQXlCO1FBQXpCLDBCQUFBLEVBQUEsZ0JBQXlCO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsMkJBQTJCOzs7OztJQUMzQiwrQkFBSzs7OztJQUFMO1FBQ0ksQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVELDJEQUEyRDs7Ozs7SUFDM0Qsd0NBQWM7Ozs7SUFBZDtRQUNJLE9BQU8sbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQWUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsY0FBYzs7Ozs7SUFHZCwwQ0FBZ0I7Ozs7SUFGaEI7UUFHSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOztnQkFuRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQix1Q0FBc0M7b0JBRXRDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxJQUFJLEVBQUU7d0JBQ0Ysa0NBQWtDLEVBQUUsTUFBTTt3QkFDMUMsc0JBQXNCLEVBQUUsVUFBVTt3QkFDbEMsWUFBWSxFQUFFLG1CQUFtQjt3QkFDakMsTUFBTSxFQUFFLFFBQVE7cUJBQ25COztpQkFDSjs7OztnQkFoQm1CLFVBQVU7OztrQ0FvQnpCLFdBQVcsU0FBQyxxQkFBcUI7MkJBSWpDLFdBQVcsU0FBQyxtQkFBbUI7d0JBSS9CLEtBQUs7MkJBSUwsS0FBSzs0QkFJTCxLQUFLO2lDQUlMLE1BQU07bUNBeUNOLFlBQVksU0FBQyxlQUFlLGNBQzVCLFlBQVksU0FBQyxPQUFPOztJQVF6QixzQkFBQztDQUFBLEFBckZELElBcUZDO1NBekVZLGVBQWU7Ozs7OztJQUd4QiwwQ0FDZ0M7Ozs7O0lBR2hDLG1DQUMwQjs7Ozs7SUFHMUIsZ0NBQ1c7Ozs7O0lBR1gsbUNBQzBCOzs7OztJQUcxQixvQ0FDa0I7Ozs7O0lBR2xCLHlDQUUwQzs7Ozs7SUFHOUIsZ0NBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBVc2VkIHRvIHJlcHJlc2VudCBhbiBvcHRpb24gb2YgdGhlIHNlbGVjdCBjb21wb25lbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtb3B0aW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vb3B0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9vcHRpb24uY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5mZC1vcHRpb24tZGVmYXVsdC1jdXN0b21dJzogJ3RydWUnLFxuICAgICAgICAnW2F0dHIuYXJpYS1kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxuICAgICAgICAnW3RhYmluZGV4XSc6ICdkaXNhYmxlZCA/IC0xIDogMCcsXG4gICAgICAgICdyb2xlJzogJ29wdGlvbicsXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lbnVfX2l0ZW0nKVxuICAgIGZkTWVudUl0ZW1DbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaXMtc2VsZWN0ZWQnKVxuICAgIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogVmFsdWUgb2YgdGhlIG9wdGlvbi4gU2ltaWxhciB0byBob3cgYSBuYXRpdmUgc2VsZWN0IG9wZXJhdGVzLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueTtcblxuICAgIC8qKiBXaGV0aGVyIHRvIGRpc2FibGUgdGhpcyBvcHRpb24gc3BlY2lmaWNhbGx5LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBPdmVycmlkZSBmb3IgdGhlIHZpZXcgdmFsdWUgb2YgdGhlIG9wdGlvbi4gSWYgbm9uZSBpcyBwcm92aWRlZCwgdGhlIHRleHQgY29udGVudCBpcyB1c2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdmlld1ZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKiogRW1pdHRlZCB3aGVuIHRoZSBzZWxlY3RlZCBzdGF0ZSBjaGFuZ2VzLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8T3B0aW9uQ29tcG9uZW50PlxuICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8T3B0aW9uQ29tcG9uZW50PigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmKSB7fVxuXG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCAmJiAhdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHZpZXcgdmFsdWUgdGV4dCBvZiB0aGUgb3B0aW9uLCBvciB0aGUgdmlld1ZhbHVlIGlucHV0IGlmIGl0IGV4aXN0cy4gKi9cbiAgICBnZXQgdmlld1ZhbHVlVGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3VmFsdWUgPyB0aGlzLnZpZXdWYWx1ZSA6XG4gICAgICAgICAgICAoKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkudGV4dENvbnRlbnQgfHwgJycpLnRyaW0oKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyB0aGUgdmlldyB2YWx1ZSB0ZXh0IG9mIHRoZSBvcHRpb24sIG9yIHRoZSB2aWV3VmFsdWUgaW5wdXQgaWYgaXQgZXhpc3RzLiAqL1xuICAgIHNldFNlbGVjdGVkKHZhbHVlOiBib29sZWFuLCBmaXJlRXZlbnQ6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoZmlyZUV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogRm9jdXNlcyB0aGUgZWxlbWVudC4gKi9cbiAgICBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKiogUmV0dXJucyBIVE1MRWxlbWVudCByZXByZXNlbnRhdGlvbiBvZiB0aGUgY29tcG9uZW50LiAqL1xuICAgIGdldEh0bWxFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICBzZWxlY3Rpb25IYW5kbGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2VsZWN0ZWQgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=