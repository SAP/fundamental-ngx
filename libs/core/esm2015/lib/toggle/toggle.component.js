/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
let toggleUniqueId = 0;
/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
export class ToggleComponent {
    constructor() {
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
        if (this.size && this.size !== 'xs' && this.size !== 's' && this.size !== 'l') {
            this.size = null;
        }
    }
    /**
     * Set focus on the input element.
     * @return {?}
     */
    focus() {
        this.inputElement.nativeElement.focus();
    }
    /**
     * Get the id of the inner input element of the toggle.
     * @return {?}
     */
    get innerInputId() {
        return `${this.id}-input`;
    }
    /**
     * Get the isChecked property of the toggle.
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Set the isChecked property of the toggle.
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.checkedChange.emit(value);
    }
    /**
     * @hidden
     * @param {?} value Sets the value of the *checked* property of the toggle.
     * @return {?}
     */
    writeValue(value) {
        this.checked = value;
    }
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onChange* event of the toggle.
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @hidden
     * @param {?} fn User defined function that handles the *onTouch* event of the toggle.
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @hidden
     * @param {?} isDisabled Sets the value of the *disabled* property of the toggle.
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
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
                        () => ToggleComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90b2dnbGUvdG9nZ2xlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNySSxPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBRXJFLGNBQWMsR0FBVyxDQUFDOzs7OztBQXVCOUIsTUFBTSxPQUFPLGVBQWU7SUFqQjVCOzs7O1FBK0JJLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsT0FBRSxHQUFXLFlBQVksR0FBRyxjQUFjLEVBQUUsQ0FBQzs7OztRQUk3QyxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGNBQVMsR0FBVyxJQUFJLENBQUM7Ozs7UUFJekIsbUJBQWMsR0FBVyxJQUFJLENBQUM7Ozs7O1FBT3JCLGtCQUFhLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7Ozs7UUFHNUUsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDOzs7O1FBR3pCLGNBQVM7OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQWdFOUIsQ0FBQzs7Ozs7SUE3REcsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRTtZQUMzRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUNwQjtJQUNMLENBQUM7Ozs7O0lBR00sS0FBSztRQUNSLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBR0QsSUFBSSxZQUFZO1FBQ1osT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQztJQUM5QixDQUFDOzs7OztJQUdELElBQUksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFHRCxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7O0lBTUQsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQU1ELGlCQUFpQixDQUFDLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Ozs7O0lBTUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQzs7O1lBMUhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsdXBCQUFzQztnQkFFdEMsU0FBUyxFQUFFO29CQUNQO3dCQUNJLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFdBQVcsRUFBRSxVQUFVOzs7d0JBQUMsR0FBRyxFQUFFLENBQUMsZUFBZSxFQUFDO3dCQUM5QyxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjtnQkFDRCxJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHFEQUFxRDtvQkFDNUQsV0FBVyxFQUFFLElBQUk7aUJBQ3BCO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7OzJCQUdJLFNBQVMsU0FBQyxPQUFPO21CQU9qQixLQUFLO3VCQUlMLEtBQUs7aUJBSUwsS0FBSztzQkFJTCxLQUFLO3dCQUlMLEtBQUs7NkJBSUwsS0FBSzs0QkFPTCxNQUFNOzs7Ozs7O0lBbENQLHVDQUMyQzs7Ozs7O0lBTTNDLCtCQUNhOzs7OztJQUdiLG1DQUMwQjs7Ozs7SUFHMUIsNkJBQzZDOzs7OztJQUc3QyxrQ0FDeUI7Ozs7O0lBR3pCLG9DQUN5Qjs7Ozs7SUFHekIseUNBQzhCOzs7Ozs7SUFNOUIsd0NBQzRFOzs7OztJQUc1RSxtQ0FBeUI7Ozs7O0lBR3pCLG9DQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxubGV0IHRvZ2dsZVVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFRoZSBUb2dnbGUgY29tcG9uZW50IGlzIHVzZWQgdG8gYWN0aXZhdGUgb3IgZGVhY3RpdmF0ZSBhbiBlbGVtZW50LlxuICogSXQgdXNlcyBhIHZpc3VhbCBtZXRhcGhvciB0byBpbmZvcm0gdGhlIHVzZXIgb2YgdGhlIHN0YXRlIG9mIHRoZSB0b2dnbGUuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtdG9nZ2xlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi90b2dnbGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUb2dnbGVDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWVcbiAgICAgICAgfVxuICAgIF0sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLWZvcm1fX2l0ZW0gZmQtZm9ybV9faXRlbS0tY2hlY2sgZmQtdG9nZ2xlLWN1c3RvbScsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUb2dnbGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JylcbiAgICBpbnB1dEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgdG9nZ2xlLlxuICAgICAqIENhbiBiZSBvbmUgb2YgdGhlIGZvdXIgKnhzKiwgKnMqLCAqbCosICplcnJvciogb3IgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNpemU6IHN0cmluZztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSB0b2dnbGUgaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIElkIGZvciB0aGUgdG9nZ2xlIGNvbXBvbmVudC4gSWYgb21pdHRlZCwgYSB1bmlxdWUgb25lIGlzIGdlbmVyYXRlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmcgPSAnZmQtdG9nZ2xlLScgKyB0b2dnbGVVbmlxdWVJZCsrO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRvZ2dsZSBpcyBjaGVja2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIGFyaWEtbGFiZWwgYXR0cmlidXRlIG9mIHRoZSBpbm5lciBpbnB1dCBlbGVtZW50LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgYXJpYUxhYmVsOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoqIGFyaWEtbGFiZWxsZWRieSBhdHRyaWJ1dGUgb2YgdGhlIGlubmVyIGlucHV0IGVsZW1lbnQuICovXG4gICAgQElucHV0KClcbiAgICBhcmlhTGFiZWxsZWRieTogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSB0b2dnbGUgY2hhbmdlcy5cbiAgICAgKiAqJGV2ZW50KiBjYW4gYmUgdXNlZCB0byByZXRyaWV2ZSB0aGUgbmV3IHN0YXRlIG9mIHRoZSB0b2dnbGUuXG4gICAgICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgY2hlY2tlZENoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvbkNoYW5nZTogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uVG91Y2hlZDogYW55ID0gKCkgPT4ge307XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zaXplICYmIHRoaXMuc2l6ZSAhPT0gJ3hzJyAmJiB0aGlzLnNpemUgIT09ICdzJyAmJiB0aGlzLnNpemUgIT09ICdsJykge1xuICAgICAgICAgICAgdGhpcy5zaXplID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBTZXQgZm9jdXMgb24gdGhlIGlucHV0IGVsZW1lbnQuICovXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgaWQgb2YgdGhlIGlubmVyIGlucHV0IGVsZW1lbnQgb2YgdGhlIHRvZ2dsZS4gKi9cbiAgICBnZXQgaW5uZXJJbnB1dElkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmlkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgLyoqIEdldCB0aGUgaXNDaGVja2VkIHByb3BlcnR5IG9mIHRoZSB0b2dnbGUuICovXG4gICAgZ2V0IGlzQ2hlY2tlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKiogU2V0IHRoZSBpc0NoZWNrZWQgcHJvcGVydHkgb2YgdGhlIHRvZ2dsZS4gKi9cbiAgICBzZXQgaXNDaGVja2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5jaGVja2VkQ2hhbmdlLmVtaXQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBoaWRkZW5cbiAgICAgKiBAcGFyYW0gdmFsdWUgU2V0cyB0aGUgdmFsdWUgb2YgdGhlICpjaGVja2VkKiBwcm9wZXJ0eSBvZiB0aGUgdG9nZ2xlLlxuICAgICAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogQHBhcmFtIGZuIFVzZXIgZGVmaW5lZCBmdW5jdGlvbiB0aGF0IGhhbmRsZXMgdGhlICpvbkNoYW5nZSogZXZlbnQgb2YgdGhlIHRvZ2dsZS5cbiAgICAgKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICogQHBhcmFtIGZuIFVzZXIgZGVmaW5lZCBmdW5jdGlvbiB0aGF0IGhhbmRsZXMgdGhlICpvblRvdWNoKiBldmVudCBvZiB0aGUgdG9nZ2xlLlxuICAgICAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGhpZGRlblxuICAgICAqIEBwYXJhbSBpc0Rpc2FibGVkIFNldHMgdGhlIHZhbHVlIG9mIHRoZSAqZGlzYWJsZWQqIHByb3BlcnR5IG9mIHRoZSB0b2dnbGUuXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgIH1cblxufVxuIl19