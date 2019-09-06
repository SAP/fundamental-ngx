/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group [placement]="'after'" [addOnText]="'$'" [placeholder]="'Amount'">
 * </fd-input-group>
 * ```
 */
export class InputGroupComponent {
    constructor() {
        /**
         * Whether the input group is in compact mode.
         */
        this.compact = false;
        /**
         * Event emitted when the add-on button is clicked.
         */
        this.addOnButtonClicked = new EventEmitter();
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
     * @param {?} $event
     * @return {?}
     */
    buttonClicked($event) {
        this.addOnButtonClicked.emit($event);
    }
}
InputGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-input-group',
                template: "<div class=\"fd-input-group\"\n     [ngClass]=\"{'fd-input-group--after': placement !== 'before',\n        'fd-input-group--before': placement === 'before', 'fd-input-group--inline': inline === true,\n        'fd-input-group--compact' : compact}\">\n  <input [(ngModel)]=\"inputText\"\n         [disabled]=\"disabled\"\n         type=\"text\"\n         *ngIf=\"placement !== 'before'\"\n         placeholder=\"{{placeholder}}\"\n         [ngClass]=\"{'fd-input--compact' : compact}\">\n  <span *ngIf=\"!button\"\n        class=\"fd-input-group__addon\"\n        [ngClass]=\"{'fd-input-group__addon--after': placement !== 'before',\n          'fd-input-group__addon--before': placement === 'before'}\">\n    <ng-container *ngIf=\"!glyph\">{{addOnText}}</ng-container>\n    <span *ngIf=\"glyph\"\n          [ngClass]=\"'sap-icon--' + glyph\"></span>\n  </span>\n  <span *ngIf=\"button\"\n        class=\"fd-input-group__addon fd-input-group__addon--button\"\n        [ngClass]=\"{'fd-input-group__addon--after': placement !== 'before', 'fd-input-group__addon--before': placement === 'before'}\">\n    <button [disabled]=\"disabled\"\n            *ngIf=\"!glyph\"\n            (click)=\"buttonClicked($event)\"\n            class=\"fd-button--light\">{{addOnText}}</button>\n    <button [disabled]=\"disabled\"\n            *ngIf=\"glyph\"\n            (click)=\"buttonClicked($event)\"\n            class=\"fd-button--icon fd-button--light\"\n            [ngClass]=\"'sap-icon--' + glyph\"></button>\n  </span>\n  <input [(ngModel)]=\"inputText\"\n         *ngIf=\"placement === 'before'\"\n         [disabled]=\"disabled\"\n         type=\"text\"\n         placeholder=\"{{placeholder}}\"\n         [ngClass]=\"{'fd-input--compact' : compact}\">\n</div>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef((/**
                         * @return {?}
                         */
                        () => InputGroupComponent)),
                        multi: true
                    }
                ],
                encapsulation: ViewEncapsulation.None
            }] }
];
InputGroupComponent.propDecorators = {
    placement: [{ type: Input }],
    compact: [{ type: Input }],
    inline: [{ type: Input }],
    placeholder: [{ type: Input }],
    addOnText: [{ type: Input }],
    glyph: [{ type: Input }],
    button: [{ type: Input }],
    disabled: [{ type: Input }],
    addOnButtonClicked: [{ type: Output }]
};
if (false) {
    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     * @type {?}
     */
    InputGroupComponent.prototype.placement;
    /**
     * Whether the input group is in compact mode.
     * @type {?}
     */
    InputGroupComponent.prototype.compact;
    /**
     * Whether the input group is inline.
     * @type {?}
     */
    InputGroupComponent.prototype.inline;
    /**
     * Placeholder for the input group.
     * @type {?}
     */
    InputGroupComponent.prototype.placeholder;
    /**
     * The text for the add-on.
     * @type {?}
     */
    InputGroupComponent.prototype.addOnText;
    /**
     * The icon value for the add-on.
     * @type {?}
     */
    InputGroupComponent.prototype.glyph;
    /**
     * Whether the icon add-on or the text add-on is a button.
     * @type {?}
     */
    InputGroupComponent.prototype.button;
    /**
     * Whether the input group is disabled.
     * @type {?}
     */
    InputGroupComponent.prototype.disabled;
    /**
     * Event emitted when the add-on button is clicked.
     * @type {?}
     */
    InputGroupComponent.prototype.addOnButtonClicked;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupComponent.prototype.inputTextValue;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    InputGroupComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2lucHV0LWdyb3VwL2lucHV0LWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBdUJ6RSxNQUFNLE9BQU8sbUJBQW1CO0lBWmhDOzs7O1FBc0JJLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUE0QnpCLHVCQUFrQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDOzs7O1FBTWhFLGFBQVE7OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQzs7OztRQUd6QixjQUFTOzs7UUFBUSxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7SUFpQzlCLENBQUM7Ozs7O0lBOUJHLElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDOzs7Ozs7SUFHRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBR0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBR0QsZ0JBQWdCLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUdELGlCQUFpQixDQUFDLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBR0QsYUFBYSxDQUFDLE1BQU07UUFDaEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7WUEzRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLHN1REFBMkM7Z0JBQzNDLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixFQUFDO3dCQUNsRCxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7O3dCQU1JLEtBQUs7c0JBSUwsS0FBSztxQkFJTCxLQUFLOzBCQUlMLEtBQUs7d0JBSUwsS0FBSztvQkFJTCxLQUFLO3FCQUlMLEtBQUs7dUJBSUwsS0FBSztpQ0FJTCxNQUFNOzs7Ozs7OztJQWhDUCx3Q0FDa0I7Ozs7O0lBR2xCLHNDQUN5Qjs7Ozs7SUFHekIscUNBQ2dCOzs7OztJQUdoQiwwQ0FDb0I7Ozs7O0lBR3BCLHdDQUNrQjs7Ozs7SUFHbEIsb0NBQ2M7Ozs7O0lBR2QscUNBQ2dCOzs7OztJQUdoQix1Q0FDa0I7Ozs7O0lBR2xCLGlEQUNnRTs7Ozs7SUFHaEUsNkNBQXVCOzs7OztJQUd2Qix1Q0FBeUI7Ozs7O0lBR3pCLHdDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGFuIGlucHV0IGdyb3VwLlxuICogVGhlIGlucHV0IGdyb3VwIGluY2x1ZGVzIGZvcm0gaW5wdXRzIHdpdGggYWRkLW9ucyB0aGF0IGFsbG93IHRoZSB1c2VyIHRvIGJldHRlciB1bmRlcnN0YW5kIHRoZSBpbmZvcm1hdGlvbiBiZWluZyBlbnRlcmVkLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1pbnB1dC1ncm91cCBbcGxhY2VtZW50XT1cIidhZnRlcidcIiBbYWRkT25UZXh0XT1cIickJ1wiIFtwbGFjZWhvbGRlcl09XCInQW1vdW50J1wiPlxuICogPC9mZC1pbnB1dC1ncm91cD5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWlucHV0LWdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaW5wdXQtZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElucHV0R3JvdXBDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dEdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICAgIC8qKiBcbiAgICAgKiBUaGUgcGxhY2VtZW50IG9mIHRoZSBhZGQtb24uIFxuICAgICAqIE9wdGlvbnMgaW5jbHVkZSAqYmVmb3JlKiBhbmQgKmFmdGVyKlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2VtZW50OiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgZ3JvdXAgaXMgaW4gY29tcGFjdCBtb2RlLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGlucHV0IGdyb3VwIGlzIGlubGluZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlubGluZTogYm9vbGVhbjtcblxuICAgIC8qKiBQbGFjZWhvbGRlciBmb3IgdGhlIGlucHV0IGdyb3VwLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIC8qKiBUaGUgdGV4dCBmb3IgdGhlIGFkZC1vbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFkZE9uVGV4dDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBpY29uIHZhbHVlIGZvciB0aGUgYWRkLW9uLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2x5cGg6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBpY29uIGFkZC1vbiBvciB0aGUgdGV4dCBhZGQtb24gaXMgYSBidXR0b24uICovXG4gICAgQElucHV0KClcbiAgICBidXR0b246IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgaW5wdXQgZ3JvdXAgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIGFkZC1vbiBidXR0b24gaXMgY2xpY2tlZC4gKi9cbiAgICBAT3V0cHV0KClcbiAgICBhZGRPbkJ1dHRvbkNsaWNrZWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGlucHV0VGV4dFZhbHVlOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBHZXQgdGhlIHZhbHVlIG9mIHRoZSB0ZXh0IGlucHV0LiAqL1xuICAgIGdldCBpbnB1dFRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VGV4dFZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIHZhbHVlIG9mIHRoZSB0ZXh0IGlucHV0LiAqL1xuICAgIHNldCBpbnB1dFRleHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5pbnB1dFRleHRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmlucHV0VGV4dFZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBidXR0b25DbGlja2VkKCRldmVudCkge1xuICAgICAgICB0aGlzLmFkZE9uQnV0dG9uQ2xpY2tlZC5lbWl0KCRldmVudCk7XG4gICAgfVxufVxuIl19