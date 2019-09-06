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
export class InputGroupNumberComponent {
    constructor() {
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
     * Get the value of the text input.
     * @return {?}
     */
    get inputText() {
        return this.inputTextValue;
    }
    /**
     * Set the value of the text input.
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
     * @hidden
     * @return {?}
     */
    stepUpClicked() {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
    /**
     * @hidden
     * @return {?}
     */
    stepDownClicked() {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
}
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
                        () => InputGroupNumberComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAtbnVtYmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1ncm91cC9pbnB1dC1ncm91cC1udW1iZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7QUFzQnpFLE1BQU0sT0FBTyx5QkFBeUI7SUFadEM7Ozs7UUF1QkksZ0JBQVcsR0FBVyxTQUFTLENBQUM7Ozs7UUFJaEMsa0JBQWEsR0FBVyxXQUFXLENBQUM7Ozs7UUFNcEMsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDOzs7O1FBR3pCLGNBQVM7OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQTBDOUIsQ0FBQzs7Ozs7SUF2Q0csSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQy9CLENBQUM7Ozs7OztJQUdELElBQUksU0FBUyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7SUFHRCxVQUFVLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7O0lBR0QsaUJBQWlCLENBQUMsRUFBRTtRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQUdELGFBQWE7UUFDVCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsZUFBZTtRQUNYLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7O1lBN0VKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxzNUJBQWtEO2dCQUNsRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQzt3QkFDeEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0o7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozt1QkFHSSxLQUFLOzBCQUlMLEtBQUs7MEJBSUwsS0FBSzs0QkFJTCxLQUFLOzs7Ozs7O0lBWk4sNkNBQ2tCOzs7OztJQUdsQixnREFDb0I7Ozs7O0lBR3BCLGdEQUNnQzs7Ozs7SUFHaEMsa0RBQ29DOzs7OztJQUdwQyxtREFBdUI7Ozs7O0lBR3ZCLDZDQUF5Qjs7Ozs7SUFHekIsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhbiBpbnRlZ2VyIHZhbHVlIGlucHV0LlxuICogVGhlIHZhbHVlIGlzIGluY3JlYXNlZCBvciBkZWNyZWFzZWQgdXNpbmcgdGhlIHNwaW5uZXIgYWRkLW9uLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1pbnB1dC1ncm91cC1udW1iZXIgW2Rpc2FibGVkXT1cImZhbHNlXCIgWyhuZ01vZGVsKV09XCJudW1iZXJWYWx1ZVwiPjwvZmQtaW5wdXQtZ3JvdXAtbnVtYmVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtaW5wdXQtZ3JvdXAtbnVtYmVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtZ3JvdXAtbnVtYmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEdyb3VwTnVtYmVyQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cE51bWJlckNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGZpZWxkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKiBBcmlhIGxhYmVsIGZvciB0aGUgJ3N0ZXAgdXAnIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBVcExhYmVsOiBzdHJpbmcgPSAnU3RlcCB1cCc7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlICdzdGVwIGRvd24nIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIHN0ZXBEb3duTGFiZWw6IHN0cmluZyA9ICdTdGVwIGRvd24nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbnB1dFRleHRWYWx1ZTogbnVtYmVyO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dCBpbnB1dC4gKi9cbiAgICBnZXQgaW5wdXRUZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFRleHRWYWx1ZTtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSB2YWx1ZSBvZiB0aGUgdGV4dCBpbnB1dC4gKi9cbiAgICBzZXQgaW5wdXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc3RlcFVwQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSsrO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMuaW5wdXRUZXh0VmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgc3RlcERvd25DbGlja2VkKCkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlLS07XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5pbnB1dFRleHRWYWx1ZSk7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgfVxufVxuIl19