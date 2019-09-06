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
export class InputGroupSearchComponent {
    constructor() {
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
}
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
                        () => InputGroupSearchComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAtc2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9pbnB1dC1ncm91cC9pbnB1dC1ncm91cC1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7OztBQXFCekUsTUFBTSxPQUFPLHlCQUF5QjtJQVp0Qzs7OztRQXVCSSxlQUFVLEdBQVcsT0FBTyxDQUFDOzs7O1FBTTdCLGFBQVE7OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQzs7OztRQUd6QixjQUFTOzs7UUFBUSxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7SUE0QjlCLENBQUM7Ozs7O0lBekJHLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFHRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUdELGlCQUFpQixDQUFDLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7O1lBM0RKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxnakJBQWtEO2dCQUNsRCxTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksT0FBTyxFQUFFLGlCQUFpQjt3QkFDMUIsV0FBVyxFQUFFLFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQzt3QkFDeEQsS0FBSyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0o7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozt1QkFHSSxLQUFLOzBCQUlMLEtBQUs7eUJBSUwsS0FBSzs7Ozs7OztJQVJOLDZDQUNrQjs7Ozs7SUFHbEIsZ0RBQ1k7Ozs7O0lBR1osK0NBQzZCOzs7OztJQUc3QixtREFBdUI7Ozs7O0lBR3ZCLDZDQUF5Qjs7Ozs7SUFHekIsOENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgZm9yd2FyZFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIHNlYXJjaCBpbnB1dCBncm91cC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtaW5wdXQtZ3JvdXAtc2VhcmNoIFtkaXNhYmxlZF09XCJmYWxzZVwiIFsobmdNb2RlbCldPVwic2VhcmNoVGVybVwiPjwvZmQtaW5wdXQtZ3JvdXAtc2VhcmNoPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtaW5wdXQtZ3JvdXAtc2VhcmNoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtZ3JvdXAtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnB1dEdyb3VwU2VhcmNoQ29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cFNlYXJjaENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGZpZWxkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlICdjbGVhcicgYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xlYXJMYWJlbDogc3RyaW5nID0gJ0NsZWFyJztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgaW5wdXRUZXh0VmFsdWU6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEdldCB0aGUgdmFsdWUgb2YgdGhlIHRleHQgaW5wdXQuICovXG4gICAgZ2V0IGlucHV0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRUZXh0VmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgdmFsdWUgb2YgdGhlIHRleHQgaW5wdXQuICovXG4gICAgc2V0IGlucHV0VGV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG59XG4iXX0=