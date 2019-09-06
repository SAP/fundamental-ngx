/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
var listCheckboxUniqueId = 0;
/**
 * The component that represents a checkbox list.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>
 *       <fd-list-checkbox>List item 1</fd-list-checkbox>
 *    </li>
 * </fd-list>
 * ```
 */
var ListCheckboxComponent = /** @class */ (function () {
    function ListCheckboxComponent() {
        /**
         * Whether the list item checkbox is checked.
         */
        this.checked = false;
        /**
         * Whether the list item checkbox is disabled.
         */
        this.disabled = false;
        /**
         * Event fired when the state of the checkbox changes. Passes back the id and the value.
         */
        this.onToggle = new EventEmitter();
        /**
         * Event fired when the checkbox becomes active.
         */
        this.onActivated = new EventEmitter();
        /**
         * The id of the checkbox.
         */
        this.id = 'fd-list-checkbox-' + listCheckboxUniqueId++;
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
    Object.defineProperty(ListCheckboxComponent.prototype, "isChecked", {
        /** Set the value of the *isChecked* property. */
        get: /**
         * Set the value of the *isChecked* property.
         * @return {?}
         */
        function () {
            return this.checked;
        },
        /** Set the value of the *isChecked* property. */
        set: /**
         * Set the value of the *isChecked* property.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.checked = value;
            this.onChange(value);
            this.onTouched();
            this.onToggle.emit({ id: this.id, value: value });
            if (this.checked) {
                this.onActivated.emit(this.id);
            }
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
    ListCheckboxComponent.prototype.writeValue = /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.checked = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    ListCheckboxComponent.prototype.registerOnChange = /**
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
    ListCheckboxComponent.prototype.registerOnTouched = /**
     * @hidden
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    ListCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-list-checkbox',
                    host: {
                        class: 'fd-form__item fd-form__item--check',
                        '[attr.id]': 'id'
                    },
                    template: "<div class=\"fd-form__item fd-form__item--check\">\n    <label class=\"fd-form__label\"\n           [htmlFor]=\"this.id\">\n        <input class=\"fd-form__control\"\n               type=\"checkbox\"\n               [id]=\"this.id\"\n               [(ngModel)]=\"this.isChecked\"\n               [disabled]=\"this.disabled\">\n        <ng-content></ng-content>\n    </label>\n</div>\n",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef((/**
                             * @return {?}
                             */
                            function () { return ListCheckboxComponent; })),
                            multi: true
                        }
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ListCheckboxComponent.propDecorators = {
        checked: [{ type: Input }],
        disabled: [{ type: Input }],
        onToggle: [{ type: Output }],
        onActivated: [{ type: Output }],
        id: [{ type: Input }]
    };
    return ListCheckboxComponent;
}());
export { ListCheckboxComponent };
if (false) {
    /**
     * Whether the list item checkbox is checked.
     * @type {?}
     */
    ListCheckboxComponent.prototype.checked;
    /**
     * Whether the list item checkbox is disabled.
     * @type {?}
     */
    ListCheckboxComponent.prototype.disabled;
    /**
     * Event fired when the state of the checkbox changes. Passes back the id and the value.
     * @type {?}
     */
    ListCheckboxComponent.prototype.onToggle;
    /**
     * Event fired when the checkbox becomes active.
     * @type {?}
     */
    ListCheckboxComponent.prototype.onActivated;
    /**
     * The id of the checkbox.
     * @type {?}
     */
    ListCheckboxComponent.prototype.id;
    /**
     * @hidden
     * @type {?}
     */
    ListCheckboxComponent.prototype.onChange;
    /**
     * @hidden
     * @type {?}
     */
    ListCheckboxComponent.prototype.onTouched;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jaGVja2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUVyRSxvQkFBb0IsR0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7QUFhcEM7SUFBQTs7OztRQW9CSSxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBSXpCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJakIsYUFBUSxHQUErQyxJQUFJLFlBQVksRUFBZ0MsQ0FBQzs7OztRQUl4RyxnQkFBVyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDOzs7O1FBSXhFLE9BQUUsR0FBVyxtQkFBbUIsR0FBRyxvQkFBb0IsRUFBRSxDQUFDOzs7O1FBRzFELGFBQVE7OztRQUFRLGNBQU8sQ0FBQyxFQUFDOzs7O1FBR3pCLGNBQVM7OztRQUFRLGNBQU8sQ0FBQyxFQUFDO0lBa0M5QixDQUFDO0lBL0JHLHNCQUFJLDRDQUFTO1FBRGIsaURBQWlEOzs7OztRQUNqRDtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDO1FBRUQsaURBQWlEOzs7Ozs7UUFDakQsVUFBYyxLQUFLO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUVoRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQzs7O09BWkE7SUFjRCxjQUFjOzs7Ozs7SUFDZCwwQ0FBVTs7Ozs7SUFBVixVQUFXLEtBQVU7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWM7Ozs7OztJQUNkLGdEQUFnQjs7Ozs7SUFBaEIsVUFBaUIsRUFBRTtRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxjQUFjOzs7Ozs7SUFDZCxpREFBaUI7Ozs7O0lBQWpCLFVBQWtCLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBMUVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixJQUFJLEVBQUU7d0JBQ0YsS0FBSyxFQUFFLG9DQUFvQzt3QkFDM0MsV0FBVyxFQUFFLElBQUk7cUJBQ3BCO29CQUNELDRZQUE2QztvQkFDN0MsU0FBUyxFQUFFO3dCQUNQOzRCQUNJLE9BQU8sRUFBRSxpQkFBaUI7NEJBQzFCLFdBQVcsRUFBRSxVQUFVOzs7NEJBQUMsY0FBTSxPQUFBLHFCQUFxQixFQUFyQixDQUFxQixFQUFDOzRCQUNwRCxLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7OzswQkFJSSxLQUFLOzJCQUlMLEtBQUs7MkJBSUwsTUFBTTs4QkFJTixNQUFNO3FCQUlOLEtBQUs7O0lBeUNWLDRCQUFDO0NBQUEsQUE1RUQsSUE0RUM7U0E1RFkscUJBQXFCOzs7Ozs7SUFHOUIsd0NBQ3lCOzs7OztJQUd6Qix5Q0FDMEI7Ozs7O0lBRzFCLHlDQUNpSDs7Ozs7SUFHakgsNENBQ3dFOzs7OztJQUd4RSxtQ0FDMEQ7Ozs7O0lBRzFELHlDQUF5Qjs7Ozs7SUFHekIsMENBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmxldCBsaXN0Q2hlY2tib3hVbmlxdWVJZDogbnVtYmVyID0gMDtcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIGNoZWNrYm94IGxpc3QuXG4gKlxuICogYGBgaHRtbFxuICogPGZkLWxpc3Q+XG4gKiAgICA8bGkgZmQtbGlzdC1pdGVtPlxuICogICAgICAgPGZkLWxpc3QtY2hlY2tib3g+TGlzdCBpdGVtIDE8L2ZkLWxpc3QtY2hlY2tib3g+XG4gKiAgICA8L2xpPlxuICogPC9mZC1saXN0PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbGlzdC1jaGVja2JveCcsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLWZvcm1fX2l0ZW0gZmQtZm9ybV9faXRlbS0tY2hlY2snLFxuICAgICAgICAnW2F0dHIuaWRdJzogJ2lkJ1xuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICcuL2xpc3QtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IExpc3RDaGVja2JveENvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIExpc3RDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gY2hlY2tib3ggaXMgY2hlY2tlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBsaXN0IGl0ZW0gY2hlY2tib3ggaXMgZGlzYWJsZWQuICovXG4gICAgQElucHV0KClcbiAgICBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHN0YXRlIG9mIHRoZSBjaGVja2JveCBjaGFuZ2VzLiBQYXNzZXMgYmFjayB0aGUgaWQgYW5kIHRoZSB2YWx1ZS4gKi9cbiAgICBAT3V0cHV0KClcbiAgICByZWFkb25seSBvblRvZ2dsZTogRXZlbnRFbWl0dGVyPHtpZDogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbn0+ID0gbmV3IEV2ZW50RW1pdHRlcjx7aWQ6IHN0cmluZywgdmFsdWU6IGJvb2xlYW59PigpO1xuXG4gICAgLyoqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIGNoZWNrYm94IGJlY29tZXMgYWN0aXZlLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uQWN0aXZhdGVkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gICAgLyoqIFRoZSBpZCBvZiB0aGUgY2hlY2tib3guICovXG4gICAgQElucHV0KClcbiAgICBpZDogc3RyaW5nID0gJ2ZkLWxpc3QtY2hlY2tib3gtJyArIGxpc3RDaGVja2JveFVuaXF1ZUlkKys7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG9uQ2hhbmdlOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7fTtcblxuICAgIC8qKiBTZXQgdGhlIHZhbHVlIG9mIHRoZSAqaXNDaGVja2VkKiBwcm9wZXJ0eS4gKi9cbiAgICBnZXQgaXNDaGVja2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2VkO1xuICAgIH1cblxuICAgIC8qKiBTZXQgdGhlIHZhbHVlIG9mIHRoZSAqaXNDaGVja2VkKiBwcm9wZXJ0eS4gKi9cbiAgICBzZXQgaXNDaGVja2VkKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vblRvZ2dsZS5lbWl0KHtpZDogdGhpcy5pZCwgdmFsdWU6IHZhbHVlfSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5vbkFjdGl2YXRlZC5lbWl0KHRoaXMuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuKSB7XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XG4gICAgfVxuXG59XG4iXX0=