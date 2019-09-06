/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, ViewEncapsulation } from '@angular/core';
/**
 * Used to represent an option of the select component.
 */
export class OptionComponent {
    /**
     * @hidden
     * @param {?} elRef
     */
    constructor(elRef) {
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
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        if (this.selected && !this.disabled) {
            this.focus();
        }
    }
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @return {?}
     */
    get viewValueText() {
        return this.viewValue ? this.viewValue :
            (((/** @type {?} */ (this.elRef.nativeElement))).textContent || '').trim();
    }
    /**
     * Returns the view value text of the option, or the viewValue input if it exists.
     * @param {?} value
     * @param {?=} fireEvent
     * @return {?}
     */
    setSelected(value, fireEvent = true) {
        this.selected = value;
        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    }
    /**
     * Focuses the element.
     * @return {?}
     */
    focus() {
        ((/** @type {?} */ (this.elRef.nativeElement))).focus();
    }
    /**
     * Returns HTMLElement representation of the component.
     * @return {?}
     */
    getHtmlElement() {
        return (/** @type {?} */ (this.elRef.nativeElement));
    }
    /**
     * @hidden
     * @return {?}
     */
    selectionHandler() {
        if (!this.selected && !this.disabled) {
            this.selected = true;
            this.selectedChange.emit(this);
        }
    }
}
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
OptionComponent.ctorParameters = () => [
    { type: ElementRef }
];
OptionComponent.propDecorators = {
    fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }],
    selected: [{ type: HostBinding, args: ['class.is-selected',] }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    viewValue: [{ type: Input }],
    selectedChange: [{ type: Output }],
    selectionHandler: [{ type: HostListener, args: ['keydown.enter',] }, { type: HostListener, args: ['click',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZWxlY3Qvb3B0aW9uL29wdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFpQnpJLE1BQU0sT0FBTyxlQUFlOzs7OztJQTRCeEIsWUFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs7OztRQXhCckMsb0JBQWUsR0FBWSxJQUFJLENBQUM7Ozs7UUFJaEMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQVExQixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBUWpCLG1CQUFjLEdBQ2pCLElBQUksWUFBWSxFQUFtQixDQUFDO0lBR0YsQ0FBQzs7Ozs7SUFJekMsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQzs7Ozs7SUFHRCxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM3RSxDQUFDOzs7Ozs7O0lBR0QsV0FBVyxDQUFDLEtBQWMsRUFBRSxZQUFxQixJQUFJO1FBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7OztJQUdELEtBQUs7UUFDRCxDQUFDLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0RCxDQUFDOzs7OztJQUdELGNBQWM7UUFDVixPQUFPLG1CQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFlLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFLRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDOzs7WUFuRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQix1Q0FBc0M7Z0JBRXRDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0Ysa0NBQWtDLEVBQUUsTUFBTTtvQkFDMUMsc0JBQXNCLEVBQUUsVUFBVTtvQkFDbEMsWUFBWSxFQUFFLG1CQUFtQjtvQkFDakMsTUFBTSxFQUFFLFFBQVE7aUJBQ25COzthQUNKOzs7O1lBaEJtQixVQUFVOzs7OEJBb0J6QixXQUFXLFNBQUMscUJBQXFCO3VCQUlqQyxXQUFXLFNBQUMsbUJBQW1CO29CQUkvQixLQUFLO3VCQUlMLEtBQUs7d0JBSUwsS0FBSzs2QkFJTCxNQUFNOytCQXlDTixZQUFZLFNBQUMsZUFBZSxjQUM1QixZQUFZLFNBQUMsT0FBTzs7Ozs7OztJQTlEckIsMENBQ2dDOzs7OztJQUdoQyxtQ0FDMEI7Ozs7O0lBRzFCLGdDQUNXOzs7OztJQUdYLG1DQUMwQjs7Ozs7SUFHMUIsb0NBQ2tCOzs7OztJQUdsQix5Q0FFMEM7Ozs7O0lBRzlCLGdDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVXNlZCB0byByZXByZXNlbnQgYW4gb3B0aW9uIG9mIHRoZSBzZWxlY3QgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW9wdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL29wdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vb3B0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtb3B0aW9uLWRlZmF1bHQtY3VzdG9tXSc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcbiAgICAgICAgJ1t0YWJpbmRleF0nOiAnZGlzYWJsZWQgPyAtMSA6IDAnLFxuICAgICAgICAncm9sZSc6ICdvcHRpb24nLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tZW51X19pdGVtJylcbiAgICBmZE1lbnVJdGVtQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmlzLXNlbGVjdGVkJylcbiAgICBzZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSBvcHRpb24uIFNpbWlsYXIgdG8gaG93IGEgbmF0aXZlIHNlbGVjdCBvcGVyYXRlcy4gKi9cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICAvKiogV2hldGhlciB0byBkaXNhYmxlIHRoaXMgb3B0aW9uIHNwZWNpZmljYWxseS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogT3ZlcnJpZGUgZm9yIHRoZSB2aWV3IHZhbHVlIG9mIHRoZSBvcHRpb24uIElmIG5vbmUgaXMgcHJvdmlkZWQsIHRoZSB0ZXh0IGNvbnRlbnQgaXMgdXNlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHZpZXdWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqIEVtaXR0ZWQgd2hlbiB0aGUgc2VsZWN0ZWQgc3RhdGUgY2hhbmdlcy4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPE9wdGlvbkNvbXBvbmVudD5cbiAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPE9wdGlvbkNvbXBvbmVudD4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZikge31cblxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBSZXR1cm5zIHRoZSB2aWV3IHZhbHVlIHRleHQgb2YgdGhlIG9wdGlvbiwgb3IgdGhlIHZpZXdWYWx1ZSBpbnB1dCBpZiBpdCBleGlzdHMuICovXG4gICAgZ2V0IHZpZXdWYWx1ZVRleHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlld1ZhbHVlID8gdGhpcy52aWV3VmFsdWUgOlxuICAgICAgICAgICAgKCh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnRleHRDb250ZW50IHx8ICcnKS50cmltKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgdGhlIHZpZXcgdmFsdWUgdGV4dCBvZiB0aGUgb3B0aW9uLCBvciB0aGUgdmlld1ZhbHVlIGlucHV0IGlmIGl0IGV4aXN0cy4gKi9cbiAgICBzZXRTZWxlY3RlZCh2YWx1ZTogYm9vbGVhbiwgZmlyZUV2ZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKGZpcmVFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEZvY3VzZXMgdGhlIGVsZW1lbnQuICovXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgICh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIFJldHVybnMgSFRNTEVsZW1lbnQgcmVwcmVzZW50YXRpb24gb2YgdGhlIGNvbXBvbmVudC4gKi9cbiAgICBnZXRIdG1sRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVudGVyJylcbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgc2VsZWN0aW9uSGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkICYmICF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19