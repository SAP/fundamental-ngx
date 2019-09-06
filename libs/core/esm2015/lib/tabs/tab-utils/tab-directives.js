/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive used to identify the template which will populate the tab header.
 * Used to achieve complex headers that require more than a string.
 *
 * ```html
 * <fd-tab>
 *      <ng-template fd-tab-title>
 *          <fd-icon [glyph]="'delete'"></fd-icon>
 *          <span>Tab Label</span>
 *      </ng-template>
 * </fd-tab>
 * ```
 */
export class TabTitleDirective {
}
TabTitleDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-title]'
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
export class TabLoadTitleDirective {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    }
}
TabLoadTitleDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tab-load-title]'
            },] }
];
/** @nocollapse */
TabLoadTitleDirective.ctorParameters = () => [
    { type: ViewContainerRef }
];
TabLoadTitleDirective.propDecorators = {
    content: [{ type: Input, args: ['fd-tab-load-title',] }]
};
if (false) {
    /** @type {?} */
    TabLoadTitleDirective.prototype.content;
    /**
     * @type {?}
     * @private
     */
    TabLoadTitleDirective.prototype.contentRef;
    /**
     * @type {?}
     * @private
     */
    TabLoadTitleDirective.prototype.viewRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWItdXRpbHMvdGFiLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBVSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBb0J6RyxNQUFNLE9BQU8saUJBQWlCOzs7WUFMN0IsU0FBUyxTQUFDOzs7Z0JBR1AsUUFBUSxFQUFFLGdCQUFnQjthQUM3Qjs7Ozs7QUFZRCxNQUFNLE9BQU8scUJBQXFCOzs7O0lBTTlCLFlBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO0lBQUcsQ0FBQzs7OztJQUVqRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7OztZQWhCSixTQUFTLFNBQUM7OztnQkFHUCxRQUFRLEVBQUUscUJBQXFCO2FBQ2xDOzs7O1lBOUJnRSxnQkFBZ0I7OztzQkFnQzVFLEtBQUssU0FBQyxtQkFBbUI7Ozs7SUFBMUIsd0NBQzBCOzs7OztJQUUxQiwyQ0FBeUM7Ozs7O0lBRTdCLHdDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB1c2VkIHRvIGlkZW50aWZ5IHRoZSB0ZW1wbGF0ZSB3aGljaCB3aWxsIHBvcHVsYXRlIHRoZSB0YWIgaGVhZGVyLlxuICogVXNlZCB0byBhY2hpZXZlIGNvbXBsZXggaGVhZGVycyB0aGF0IHJlcXVpcmUgbW9yZSB0aGFuIGEgc3RyaW5nLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC10YWI+XG4gKiAgICAgIDxuZy10ZW1wbGF0ZSBmZC10YWItdGl0bGU+XG4gKiAgICAgICAgICA8ZmQtaWNvbiBbZ2x5cGhdPVwiJ2RlbGV0ZSdcIj48L2ZkLWljb24+XG4gKiAgICAgICAgICA8c3Bhbj5UYWIgTGFiZWw8L3NwYW4+XG4gKiAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiA8L2ZkLXRhYj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC10YWItdGl0bGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBUYWJUaXRsZURpcmVjdGl2ZSB7XG59XG5cbi8qKlxuICogTm90IGZvciBleHRlcm5hbCB1c2UuIFBvcnRhbCB0byByZW5kZXIgdGhlIGNvbXBsZXggdGl0bGUgdGVtcGxhdGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXRhYi1sb2FkLXRpdGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiTG9hZFRpdGxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoJ2ZkLXRhYi1sb2FkLXRpdGxlJylcbiAgICBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb250ZW50UmVmID0gdGhpcy52aWV3UmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbn1cbiJdfQ==