/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var toggleUniqueId = 0;
/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
var ToggleComponent = /** @class */ (function () {
    function ToggleComponent() {
        /**
         * Whether the toggle is disabled.
         */
        this.disabled = false;
        /**
         * Id for the toggle component. If omitted, a unique one is generated.
         */
        this.id = 'fd-toggle-' + toggleUniqueId++;
        /**
         * Whether the toggle is checked.
         */
        this.checked = false;
        /**
         * aria-label attribute of the inner input element.
         */
        this.ariaLabel = null;
        /**
         * aria-labelledby attribute of the inner input element.
         */
        this.ariaLabelledby = null;
        /**
         * Event fired when the state of the toggle changes.
         * *$event* can be used to retrieve the new state of the toggle.
         */
        this.checkedChange = new EventEmitter();
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
    ToggleComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    };
    /** Set focus on the input element. */
    /**
     * Set focus on the input element.
     * @return {?}
     */
    ToggleComponent.prototype.focus = /**
     * Set focus on the input element.
     * @return {?}
     */
    function () {
        this.inputElement.nativeElement.focus();
    };
    Object.defineProperty(ToggleComponent.prototype, "innerInputId", {
        /** Get the id of the inner input element of the toggle. */
        get: /**
         * Get the id of the inner input element of the toggle.
         * @return {?}
         */
        function () {
            return this.id + "-input";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleComponent.prototype, "isChecked", {
        /** Get the isChecked property of the toggle. */
        get: /**
         * Get the isChecked property of the toggle.
         * @return {?}
         */
        function () {
            return this.checked;
        },
        /** Set the isChecked property of the toggle. */
        set: /**
         * Set the isChecked property of the toggle.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.checked = value;
            this.onChange(value);
            this.onTouched();
            this.checkedChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the toggle.
     */
    /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    function (value) {
        this.checked = value;
    };
    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the toggle.
     */
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.registerOnChange = /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the toggle.
     */
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the toggle.
     */
    /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    ToggleComponent.prototype.setDisabledState = /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ToggleComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-toggle',
                    template: "<label class=\"fd-form__label\" [attr.for]=\"innerInputId\">\n    <span class=\"fd-toggle fd-form__control\" [ngClass]=\"(this.size ? ('fd-toggle--' + this.size) : '')\">\n        <input #input\n               type=\"checkbox\"\n               [id]=\"innerInputId\"\n               [disabled]=\"this.disabled\"\n               [attr.aria-checked]=\"checked\"\n               [attr.aria-label]=\"this.ariaLabel\"\n               [attr.aria-labelledby]=\"this.ariaLabelledby\"\n               [(ngModel)]=\"this.isChecked\">\n        <span class=\"fd-toggle__switch\" role=\"presentation\"></span>\n    </span>\n    <ng-content></ng-content>\n</label>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ToggleComponent; })),
                            multi: true
                        }
                    ],
                    host: {
                        class: 'fd-form__item fd-form__item--check fd-toggle-custom',
                        '[attr.id]': 'id',
                    },
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-toggle-custom{display:block}"]
                }] }
    ];
    ToggleComponent.propDecorators = {
        inputElement: [{ type: ViewChild, args: ['input',] }],
        size: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }],
        checked: [{ type: Input }],
        ariaLabel: [{ type: Input }],
        ariaLabelledby: [{ type: Input }],
        checkedChange: [{ type: Output }]
    };
    return ToggleComponent;
}());
export { ToggleComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ToggleComponent.prototype.inputElement;
    /**
     * The size of the toggle.
     * Can be one of the four *xs*, *s*, *l*, *error* or default.
     * @type {?}
     */
    ToggleComponent.prototype.size;
    /**
     * Whether the toggle is disabled.
     * @type {?}
     */
    ToggleComponent.prototype.disabled;
    /**
     * Id for the toggle component. If omitted, a unique one is generated.
     * @type {?}
     */
    ToggleComponent.prototype.id;
    /**
     * Whether the toggle is checked.
     * @type {?}
     */
    ToggleComponent.prototype.checked;
    /**
     * aria-label attribute of the inner input element.
     * @type {?}
     */
    ToggleComponent.prototype.ariaLabel;
    /**
     * aria-labelledby attribute of the inner input element.
     * @type {?}
     */
    ToggleComponent.prototype.ariaLabelledby;
    /**
     * Event fired when the state of the toggle changes.
     * *$event* can be used to retrieve the new state of the toggle.
     * @type {?}
     */
    ToggleComponent.prototype.checkedChange;
    /**
     * @hidden
     * @type {?}
     */
    ToggleComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    ToggleComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBRXJFLGNBQWMsR0FBVyxDQUFDOzs7OztBQU05QjtJQUFBOzs7O1FBK0JJLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsT0FBRSxHQUFXLFlBQVksR0FBRyxjQUFjLEVBQUUsQ0FBQzs7OztRQUk3QyxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGNBQVMsR0FBVyxJQUFJLENBQUM7Ozs7UUFJekIsbUJBQWMsR0FBVyxJQUFJLENBQUM7Ozs7O1FBT3JCLGtCQUFhLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHNUUsYUFBUTs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7Ozs7UUFHekIsY0FBUzs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7SUFnRTlCLENBQUM7SUE5REcsY0FBYzs7Ozs7SUFDZCxrQ0FBUTs7OztJQUFSO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQzNFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0wsQ0FBQztJQUVELHNDQUFzQzs7Ozs7SUFDL0IsK0JBQUs7Ozs7SUFBWjtRQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFHRCxzQkFBSSx5Q0FBWTtRQURoQiwyREFBMkQ7Ozs7O1FBQzNEO1lBQ0ksT0FBVSxJQUFJLENBQUMsRUFBRSxXQUFRLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxzQ0FBUztRQURiLGdEQUFnRDs7Ozs7UUFDaEQ7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQztRQUVELGdEQUFnRDs7Ozs7O1FBQ2hELFVBQWMsS0FBSztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQVJBO0lBVUQ7OztPQUdHOzs7Ozs7SUFDSCxvQ0FBVTs7Ozs7SUFBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMENBQWdCOzs7OztJQUFoQixVQUFpQixFQUFFO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMkNBQWlCOzs7OztJQUFqQixVQUFrQixFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDBDQUFnQjs7Ozs7SUFBaEIsVUFBaUIsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQzs7Z0JBMUhKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsV0FBVztvQkFDckIsdXBCQUFzQztvQkFFdEMsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVOzs7NEJBQUMsY0FBTSxPQUFBLGVBQWUsRUFBZixDQUFlLEVBQUM7NEJBQzlDLEtBQUssRUFBRSxJQUFJO3lCQUNkO3FCQUNKO29CQUNELElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUscURBQXFEO3dCQUM1RCxXQUFXLEVBQUUsSUFBSTtxQkFDcEI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7OytCQUdJLFNBQVMsU0FBQyxPQUFPO3VCQU9qQixLQUFLOzJCQUlMLEtBQUs7cUJBSUwsS0FBSzswQkFJTCxLQUFLOzRCQUlMLEtBQUs7aUNBSUwsS0FBSztnQ0FPTCxNQUFNOztJQXVFWCxzQkFBQztDQUFBLEFBNUhELElBNEhDO1NBM0dZLGVBQWU7Ozs7OztJQUV4Qix1Q0FDMkM7Ozs7OztJQU0zQywrQkFDYTs7Ozs7SUFHYixtQ0FDMEI7Ozs7O0lBRzFCLDZCQUM2Qzs7Ozs7SUFHN0Msa0NBQ3lCOzs7OztJQUd6QixvQ0FDeUI7Ozs7O0lBR3pCLHlDQUM4Qjs7Ozs7O0lBTTlCLHdDQUM0RTs7Ozs7SUFHNUUsbUNBQXlCOzs7OztJQUd6QixvQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmxldCB0b2dnbGVVbmlxdWVJZDogbnVtYmVyID0gMDtcblxuLyoqXG4gKiBUaGUgVG9nZ2xlIGNvbXBvbmVudCBpcyB1c2VkIHRvIGFjdGl2YXRlIG9yIGRlYWN0aXZhdGUgYW4gZWxlbWVudC5cbiAqIEl0IHVzZXMgYSB2aXN1YWwgbWV0YXBob3IgdG8gaW5mb3JtIHRoZSB1c2VyIG9mIHRoZSBzdGF0ZSBvZiB0aGUgdG9nZ2xlLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXRvZ2dsZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RvZ2dsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vdG9nZ2xlLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVG9nZ2xlQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdmZC1mb3JtX19pdGVtIGZkLWZvcm1fX2l0ZW0tLWNoZWNrIGZkLXRvZ2dsZS1jdXN0b20nLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJyxcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAVmlld0NoaWxkKCdpbnB1dCcpXG4gICAgaW5wdXRFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNpemUgb2YgdGhlIHRvZ2dsZS5cbiAgICAgKiBDYW4gYmUgb25lIG9mIHRoZSBmb3VyICp4cyosICpzKiwgKmwqLCAqZXJyb3IqIG9yIGRlZmF1bHQuXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzaXplOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJZCBmb3IgdGhlIHRvZ2dsZSBjb21wb25lbnQuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSBpcyBnZW5lcmF0ZWQuICovXG4gICAgQElucHV0KClcbiAgICBpZDogc3RyaW5nID0gJ2ZkLXRvZ2dsZS0nICsgdG9nZ2xlVW5pcXVlSWQrKztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgaXMgY2hlY2tlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBhcmlhLWxhYmVsIGF0dHJpYnV0ZSBvZiB0aGUgaW5uZXIgaW5wdXQgZWxlbWVudC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFyaWFMYWJlbDogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKiBhcmlhLWxhYmVsbGVkYnkgYXR0cmlidXRlIG9mIHRoZSBpbm5lciBpbnB1dCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXJpYUxhYmVsbGVkYnk6IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBzdGF0ZSBvZiB0aGUgdG9nZ2xlIGNoYW5nZXMuXG4gICAgICogKiRldmVudCogY2FuIGJlIHVzZWQgdG8gcmV0cmlldmUgdGhlIG5ldyBzdGF0ZSBvZiB0aGUgdG9nZ2xlLlxuICAgICAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IGNoZWNrZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSAmJiB0aGlzLnNpemUgIT09ICd4cycgJiYgdGhpcy5zaXplICE9PSAncycgJiYgdGhpcy5zaXplICE9PSAnbCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU2V0IGZvY3VzIG9uIHRoZSBpbnB1dCBlbGVtZW50LiAqL1xuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGlkIG9mIHRoZSBpbm5lciBpbnB1dCBlbGVtZW50IG9mIHRoZSB0b2dnbGUuICovXG4gICAgZ2V0IGlubmVySW5wdXRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5pZH0taW5wdXRgO1xuICAgIH1cblxuICAgIC8qKiBHZXQgdGhlIGlzQ2hlY2tlZCBwcm9wZXJ0eSBvZiB0aGUgdG9nZ2xlLiAqL1xuICAgIGdldCBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgaXNDaGVja2VkIHByb3BlcnR5IG9mIHRoZSB0b2dnbGUuICovXG4gICAgc2V0IGlzQ2hlY2tlZCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICAgIHRoaXMuY2hlY2tlZENoYW5nZS5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogQHBhcmFtIHZhbHVlIFNldHMgdGhlIHZhbHVlIG9mIHRoZSAqY2hlY2tlZCogcHJvcGVydHkgb2YgdGhlIHRvZ2dsZS5cbiAgICAgKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEBwYXJhbSBmbiBVc2VyIGRlZmluZWQgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSAqb25DaGFuZ2UqIGV2ZW50IG9mIHRoZSB0b2dnbGUuXG4gICAgICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEBwYXJhbSBmbiBVc2VyIGRlZmluZWQgZnVuY3Rpb24gdGhhdCBoYW5kbGVzIHRoZSAqb25Ub3VjaCogZXZlbnQgb2YgdGhlIHRvZ2dsZS5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBAcGFyYW0gaXNEaXNhYmxlZCBTZXRzIHRoZSB2YWx1ZSBvZiB0aGUgKmRpc2FibGVkKiBwcm9wZXJ0eSBvZiB0aGUgdG9nZ2xlLlxuICAgICAqL1xuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG5cbn1cbiJdfQ==