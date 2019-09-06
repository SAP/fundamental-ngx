/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * The component that represents a search input group.
 *
 * ```html
 * <fd-input-group-search [disabled]="false" [(ngModel)]="searchTerm"></fd-input-group-search>
 * ```
 */
var InputGroupSearchComponent = /** @class */ (function () {
    function InputGroupSearchComponent() {
        /**
         * Aria label for the 'clear' button.
         */
        this.clearLabel = 'Clear';
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
    Object.defineProperty(InputGroupSearchComponent.prototype, "inputText", {
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
    InputGroupSearchComponent.prototype.writeValue = /**
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
    InputGroupSearchComponent.prototype.registerOnChange = /**
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
    InputGroupSearchComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    InputGroupSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-input-group-search',
                    template: "<div class=\"fd-input-group\">\n      <input type=\"search\"\n             [disabled]=\"disabled\"\n             [(ngModel)]=\"inputText\"\n             placeholder=\"{{placeholder}}\" />\n      <span class=\"fd-input-group__addon fd-input-group__addon--button fd-input-group__addon\">\n            <button *ngIf=\"inputText\"\n                    class=\"fd-input-group__button fd-input-group__button--clear\"\n                    [attr.aria-label]=\"clearLabel\"\n                    (click)=\"inputText = '';\"></button>\n      </span>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return InputGroupSearchComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    InputGroupSearchComponent.propDecorators = {
        disabled: [{ type: Input }],
        placeholder: [{ type: Input }],
        clearLabel: [{ type: Input }]
    };
    return InputGroupSearchComponent;
}());
export { InputGroupSearchComponent };
if (false) {
    /**
     * Whether the input is disabled.
     * @type {?}
     */
    InputGroupSearchComponent.prototype.disabled;
    /**
     * Placeholder for the input field.
     * @type {?}
     */
    InputGroupSearchComponent.prototype.placeholder;
    /**
     * Aria label for the 'clear' button.
     * @type {?}
     */
    InputGroupSearchComponent.prototype.clearLabel;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupSearchComponent.prototype.inputTextValue;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupSearchComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupSearchComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1ncm91cC9pbnB1dC1ncm91cC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQVN6RTtJQUFBOzs7O1FBdUJJLGVBQVUsR0FBVyxPQUFPLENBQUM7Ozs7UUFNN0IsYUFBUTs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7Ozs7UUFHekIsY0FBUzs7O1FBQVEsY0FBTyxDQUFDLEVBQUM7SUE0QjlCLENBQUM7SUF6Qkcsc0JBQUksZ0RBQVM7UUFEYix1Q0FBdUM7Ozs7O1FBQ3ZDO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7UUFFRCx1Q0FBdUM7Ozs7OztRQUN2QyxVQUFjLEtBQUs7WUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDOzs7T0FQQTtJQVNELGNBQWM7Ozs7OztJQUNkLDhDQUFVOzs7OztJQUFWLFVBQVcsS0FBVTtRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsY0FBYzs7Ozs7O0lBQ2Qsb0RBQWdCOzs7OztJQUFoQixVQUFpQixFQUFFO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGNBQWM7Ozs7OztJQUNkLHFEQUFpQjs7Ozs7SUFBakIsVUFBa0IsRUFBRTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOztnQkEzREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLGdqQkFBa0Q7b0JBQ2xELFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVTs7OzRCQUFDLGNBQU0sT0FBQSx5QkFBeUIsRUFBekIsQ0FBeUIsRUFBQzs0QkFDeEQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0o7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7MkJBR0ksS0FBSzs4QkFJTCxLQUFLOzZCQUlMLEtBQUs7O0lBc0NWLGdDQUFDO0NBQUEsQUE1REQsSUE0REM7U0FoRFkseUJBQXlCOzs7Ozs7SUFFbEMsNkNBQ2tCOzs7OztJQUdsQixnREFDWTs7Ozs7SUFHWiwrQ0FDNkI7Ozs7O0lBRzdCLG1EQUF1Qjs7Ozs7SUFHdkIsNkNBQXlCOzs7OztJQUd6Qiw4Q0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBmb3J3YXJkUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGEgc2VhcmNoIGlucHV0IGdyb3VwLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1pbnB1dC1ncm91cC1zZWFyY2ggW2Rpc2FibGVkXT1cImZhbHNlXCIgWyhuZ01vZGVsKV09XCJzZWFyY2hUZXJtXCI+PC9mZC1pbnB1dC1ncm91cC1zZWFyY2g+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1pbnB1dC1ncm91cC1zZWFyY2gnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pbnB1dC1ncm91cC1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0R3JvdXBTZWFyY2hDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEdyb3VwU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIGZvciB0aGUgaW5wdXQgZmllbGQuICovXG4gICAgQElucHV0KClcbiAgICBwbGFjZWhvbGRlcjtcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgJ2NsZWFyJyBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBjbGVhckxhYmVsOiBzdHJpbmcgPSAnQ2xlYXInO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbnB1dFRleHRWYWx1ZTogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dCBpbnB1dC4gKi9cbiAgICBnZXQgaW5wdXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFRleHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dCBpbnB1dC4gKi9cbiAgICBzZXQgaW5wdXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cbn1cbiJdfQ==