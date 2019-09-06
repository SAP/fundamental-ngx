/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
/** @type {?} */
let listCheckboxUniqueId = 0;
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
export class ListCheckboxComponent {
    constructor() {
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
     * Set the value of the *isChecked* property.
     * @return {?}
     */
    get isChecked() {
        return this.checked;
    }
    /**
     * Set the value of the *isChecked* property.
     * @param {?} value
     * @return {?}
     */
    set isChecked(value) {
        this.checked = value;
        this.onChange(value);
        this.onTouched();
        this.onToggle.emit({ id: this.id, value: value });
        if (this.checked) {
            this.onActivated.emit(this.id);
        }
    }
    /**
     * @hidden
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.checked = value;
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
                        () => ListCheckboxComponent)),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jaGVja2JveC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbGlzdC9saXN0LWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEcsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUVyRSxvQkFBb0IsR0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7QUE2QnBDLE1BQU0sT0FBTyxxQkFBcUI7SUFoQmxDOzs7O1FBb0JJLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFJekIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUlqQixhQUFRLEdBQStDLElBQUksWUFBWSxFQUFnQyxDQUFDOzs7O1FBSXhHLGdCQUFXLEdBQXlCLElBQUksWUFBWSxFQUFVLENBQUM7Ozs7UUFJeEUsT0FBRSxHQUFXLG1CQUFtQixHQUFHLG9CQUFvQixFQUFFLENBQUM7Ozs7UUFHMUQsYUFBUTs7O1FBQVEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFDOzs7O1FBR3pCLGNBQVM7OztRQUFRLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztJQWtDOUIsQ0FBQzs7Ozs7SUEvQkcsSUFBSSxTQUFTO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Ozs7OztJQUdELElBQUksU0FBUyxDQUFDLEtBQUs7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBRWhELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7Ozs7OztJQUdELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7OztJQUdELGdCQUFnQixDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7Ozs7SUFHRCxpQkFBaUIsQ0FBQyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7OztZQTFFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsSUFBSSxFQUFFO29CQUNGLEtBQUssRUFBRSxvQ0FBb0M7b0JBQzNDLFdBQVcsRUFBRSxJQUFJO2lCQUNwQjtnQkFDRCw0WUFBNkM7Z0JBQzdDLFNBQVMsRUFBRTtvQkFDUDt3QkFDSSxPQUFPLEVBQUUsaUJBQWlCO3dCQUMxQixXQUFXLEVBQUUsVUFBVTs7O3dCQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFDO3dCQUNwRCxLQUFLLEVBQUUsSUFBSTtxQkFDZDtpQkFDSjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7O3NCQUlJLEtBQUs7dUJBSUwsS0FBSzt1QkFJTCxNQUFNOzBCQUlOLE1BQU07aUJBSU4sS0FBSzs7Ozs7OztJQWhCTix3Q0FDeUI7Ozs7O0lBR3pCLHlDQUMwQjs7Ozs7SUFHMUIseUNBQ2lIOzs7OztJQUdqSCw0Q0FDd0U7Ozs7O0lBR3hFLG1DQUMwRDs7Ozs7SUFHMUQseUNBQXlCOzs7OztJQUd6QiwwQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSW5wdXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxubGV0IGxpc3RDaGVja2JveFVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGEgY2hlY2tib3ggbGlzdC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtbGlzdD5cbiAqICAgIDxsaSBmZC1saXN0LWl0ZW0+XG4gKiAgICAgICA8ZmQtbGlzdC1jaGVja2JveD5MaXN0IGl0ZW0gMTwvZmQtbGlzdC1jaGVja2JveD5cbiAqICAgIDwvbGk+XG4gKiA8L2ZkLWxpc3Q+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1saXN0LWNoZWNrYm94JyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtZm9ybV9faXRlbSBmZC1mb3JtX19pdGVtLS1jaGVjaycsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbGlzdC1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTGlzdENoZWNrYm94Q29tcG9uZW50KSxcbiAgICAgICAgICAgIG11bHRpOiB0cnVlXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTGlzdENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaXRlbSBjaGVja2JveCBpcyBjaGVja2VkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2hlY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGxpc3QgaXRlbSBjaGVja2JveCBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiB0aGUgc3RhdGUgb2YgdGhlIGNoZWNrYm94IGNoYW5nZXMuIFBhc3NlcyBiYWNrIHRoZSBpZCBhbmQgdGhlIHZhbHVlLiAqL1xuICAgIEBPdXRwdXQoKVxuICAgIHJlYWRvbmx5IG9uVG9nZ2xlOiBFdmVudEVtaXR0ZXI8e2lkOiBzdHJpbmcsIHZhbHVlOiBib29sZWFufT4gPSBuZXcgRXZlbnRFbWl0dGVyPHtpZDogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbn0+KCk7XG5cbiAgICAvKiogRXZlbnQgZmlyZWQgd2hlbiB0aGUgY2hlY2tib3ggYmVjb21lcyBhY3RpdmUuICovXG4gICAgQE91dHB1dCgpXG4gICAgcmVhZG9ubHkgb25BY3RpdmF0ZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgICAvKiogVGhlIGlkIG9mIHRoZSBjaGVja2JveC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGlkOiBzdHJpbmcgPSAnZmQtbGlzdC1jaGVja2JveC0nICsgbGlzdENoZWNrYm94VW5pcXVlSWQrKztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgb25DaGFuZ2U6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBvblRvdWNoZWQ6IGFueSA9ICgpID0+IHt9O1xuXG4gICAgLyoqIFNldCB0aGUgdmFsdWUgb2YgdGhlICppc0NoZWNrZWQqIHByb3BlcnR5LiAqL1xuICAgIGdldCBpc0NoZWNrZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrZWQ7XG4gICAgfVxuXG4gICAgLyoqIFNldCB0aGUgdmFsdWUgb2YgdGhlICppc0NoZWNrZWQqIHByb3BlcnR5LiAqL1xuICAgIHNldCBpc0NoZWNrZWQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLm9uVG9nZ2xlLmVtaXQoe2lkOiB0aGlzLmlkLCB2YWx1ZTogdmFsdWV9KTtcblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZhdGVkLmVtaXQodGhpcy5pZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm4pIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbn1cbiJdfQ==