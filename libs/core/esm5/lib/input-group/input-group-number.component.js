/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * The component that represents an integer value input.
 * The value is increased or decreased using the spinner add-on.
 *
 * ```html
 * <fd-input-group-number [disabled]="false" [(ngModel)]="numberValue"></fd-input-group-number>
 * ```
 */
var InputGroupNumberComponent = /** @class */ (function () {
    function InputGroupNumberComponent() {
        /**
         * Aria label for the 'step up' button.
         */
        this.stepUpLabel = 'Step up';
        /**
         * Aria label for the 'step down' button.
         */
        this.stepDownLabel = 'Step down';
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
    Object.defineProperty(InputGroupNumberComponent.prototype, "inputText", {
        /** Get the value of the text input. */
        get: /**
         * Get the value of the text input.
         * @return {?}
         */
        function () {
            return this.inputTextValue;
        },
        /** Set the value of the text input. */
        set: /**
         * Set the value of the text input.
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
    InputGroupNumberComponent.prototype.writeValue = /**
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
    InputGroupNumberComponent.prototype.registerOnChange = /**
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
    InputGroupNumberComponent.prototype.registerOnTouched = /**
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
    InputGroupNumberComponent.prototype.stepUpClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    InputGroupNumberComponent.prototype.stepDownClicked = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    };
    InputGroupNumberComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-input-group-number',
                    template: "<div class=\"fd-input-group fd-input-group--after\">\n        <input class=\"\"\n               type=\"number\"\n               name=\"\"\n               [disabled]=\"disabled\"\n               [(ngModel)]=\"inputText\"\n               placeholder=\"{{placeholder}}\" />\n        <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon fd-input-group__addon--after\">\n                <button class=\"fd-input-group__button fd-input-group__button--step-up sap-icon--slim-arrow-up\"\n                        [attr.aria-label]=\"stepUpLabel\"\n                        (click)=\"stepUpClicked()\"></button>\n                <button class=\"fd-input-group__button fd-input-group__button--step-down sap-icon--slim-arrow-down\"\n                        [attr.aria-label]=\"stepDownLabel\"\n                        (click)=\"stepDownClicked()\"></button>\n        </span>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return InputGroupNumberComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    InputGroupNumberComponent.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        stepUpLabel: [{ type: Input }],
        stepDownLabel: [{ type: Input }]
    };
    return InputGroupNumberComponent;
}());
export { InputGroupNumberComponent };
if (false) {
    /**
     * Whether the input is disabled.
     * @type {?}
     */
    InputGroupNumberComponent.prototype.disabled;
    /**
     * Placeholder for the input field.
     * @type {?}
     */
    InputGroupNumberComponent.prototype.placeholder;
    /**
     * Aria label for the 'step up' button.
     * @type {?}
     */
    InputGroupNumberComponent.prototype.stepUpLabel;
    /**
     * Aria label for the 'step down' button.
     * @type {?}
     */
    InputGroupNumberComponent.prototype.stepDownLabel;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupNumberComponent.prototype.inputTextValue;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupNumberComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupNumberComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAtbnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1ncm91cC9pbnB1dC1ncm91cC1udW1iZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFVekU7SUFBQTs7OztRQXVCSSxnQkFBVyxHQUFXLFNBQVMsQ0FBQzs7OztRQUloQyxrQkFBYSxHQUFXLFdBQVcsQ0FBQzs7OztRQU1wQyxhQUFROzs7UUFBUSxjQUFPLENBQUMsRUFBQzs7OztRQUd6QixjQUFTOzs7UUFBUSxjQUFPLENBQUMsRUFBQztJQTBDOUIsQ0FBQztJQXZDRyxzQkFBSSxnREFBUztRQURiLHVDQUF1Qzs7Ozs7UUFDdkM7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQztRQUVELHVDQUF1Qzs7Ozs7O1FBQ3ZDLFVBQWMsS0FBSztZQUNmLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQVBBO0lBU0QsY0FBYzs7Ozs7O0lBQ2QsOENBQVU7Ozs7O0lBQVYsVUFBVyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxjQUFjOzs7Ozs7SUFDZCxvREFBZ0I7Ozs7O0lBQWhCLFVBQWlCLEVBQUU7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsY0FBYzs7Ozs7O0lBQ2QscURBQWlCOzs7OztJQUFqQixVQUFrQixFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxjQUFjOzs7OztJQUNkLGlEQUFhOzs7O0lBQWI7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxjQUFjOzs7OztJQUNkLG1EQUFlOzs7O0lBQWY7UUFDSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7O2dCQTdFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsczVCQUFrRDtvQkFDbEQsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVOzs7NEJBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixFQUFDOzRCQUN4RCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7OzsyQkFHSSxLQUFLOzhCQUlMLEtBQUs7OEJBSUwsS0FBSztnQ0FJTCxLQUFLOztJQW9EVixnQ0FBQztDQUFBLEFBOUVELElBOEVDO1NBbEVZLHlCQUF5Qjs7Ozs7O0lBRWxDLDZDQUNrQjs7Ozs7SUFHbEIsZ0RBQ29COzs7OztJQUdwQixnREFDZ0M7Ozs7O0lBR2hDLGtEQUNvQzs7Ozs7SUFHcEMsbURBQXVCOzs7OztJQUd2Qiw2Q0FBeUI7Ozs7O0lBR3pCLDhDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgZm9yd2FyZFJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYW4gaW50ZWdlciB2YWx1ZSBpbnB1dC5cbiAqIFRoZSB2YWx1ZSBpcyBpbmNyZWFzZWQgb3IgZGVjcmVhc2VkIHVzaW5nIHRoZSBzcGlubmVyIGFkZC1vbi5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtaW5wdXQtZ3JvdXAtbnVtYmVyIFtkaXNhYmxlZF09XCJmYWxzZVwiIFsobmdNb2RlbCldPVwibnVtYmVyVmFsdWVcIj48L2ZkLWlucHV0LWdyb3VwLW51bWJlcj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWlucHV0LWdyb3VwLW51bWJlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2lucHV0LWdyb3VwLW51bWJlci5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRHcm91cE51bWJlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIElucHV0R3JvdXBOdW1iZXJDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogUGxhY2Vob2xkZXIgZm9yIHRoZSBpbnB1dCBmaWVsZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlICdzdGVwIHVwJyBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBzdGVwVXBMYWJlbDogc3RyaW5nID0gJ1N0ZXAgdXAnO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSAnc3RlcCBkb3duJyBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBzdGVwRG93bkxhYmVsOiBzdHJpbmcgPSAnU3RlcCBkb3duJztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaW5wdXRUZXh0VmFsdWU6IG51bWJlcjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEdldCB0aGUgdmFsdWUgb2YgdGhlIHRleHQgaW5wdXQuICovXG4gICAgZ2V0IGlucHV0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRUZXh0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHQgaW5wdXQuICovXG4gICAgc2V0IGlucHV0VGV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHN0ZXBVcENsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUrKztcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLmlucHV0VGV4dFZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHN0ZXBEb3duQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZS0tO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuaW5wdXRUZXh0VmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cbn1cbiJdfQ==