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
var TabTitleDirective = /** @class */ (function () {
    function TabTitleDirective() {
    }
    TabTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-title]'
                },] }
    ];
    return TabTitleDirective;
}());
export { TabTitleDirective };
/**
 * Not for external use. Portal to render the complex title template.
 */
var TabLoadTitleDirective = /** @class */ (function () {
    function TabLoadTitleDirective(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @return {?}
     */
    TabLoadTitleDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.viewRef.clear();
        this.contentRef = this.viewRef.createEmbeddedView(this.content);
    };
    TabLoadTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-load-title]'
                },] }
    ];
    /** @nocollapse */
    TabLoadTitleDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    TabLoadTitleDirective.propDecorators = {
        content: [{ type: Input, args: ['fd-tab-load-title',] }]
    };
    return TabLoadTitleDirective;
}());
export { TabLoadTitleDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGFicy90YWItdXRpbHMvdGFiLWRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBVSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZXpHO0lBQUE7SUFNQSxDQUFDOztnQkFOQSxTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7SUFFRCx3QkFBQztDQUFBLEFBTkQsSUFNQztTQURZLGlCQUFpQjs7OztBQU05QjtJQVdJLCtCQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtJQUFHLENBQUM7Ozs7SUFFakQsd0NBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7O2dCQWhCSixTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUscUJBQXFCO2lCQUNsQzs7OztnQkE5QmdFLGdCQUFnQjs7OzBCQWdDNUUsS0FBSyxTQUFDLG1CQUFtQjs7SUFXOUIsNEJBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQVpZLHFCQUFxQjs7O0lBQzlCLHdDQUMwQjs7Ozs7SUFFMUIsMkNBQXlDOzs7OztJQUU3Qix3Q0FBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVtYmVkZGVkVmlld1JlZiwgSW5wdXQsIE9uSW5pdCwgVGVtcGxhdGVSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdXNlZCB0byBpZGVudGlmeSB0aGUgdGVtcGxhdGUgd2hpY2ggd2lsbCBwb3B1bGF0ZSB0aGUgdGFiIGhlYWRlci5cbiAqIFVzZWQgdG8gYWNoaWV2ZSBjb21wbGV4IGhlYWRlcnMgdGhhdCByZXF1aXJlIG1vcmUgdGhhbiBhIHN0cmluZy5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtdGFiPlxuICogICAgICA8bmctdGVtcGxhdGUgZmQtdGFiLXRpdGxlPlxuICogICAgICAgICAgPGZkLWljb24gW2dseXBoXT1cIidkZWxldGUnXCI+PC9mZC1pY29uPlxuICogICAgICAgICAgPHNwYW4+VGFiIExhYmVsPC9zcGFuPlxuICogICAgICA8L25nLXRlbXBsYXRlPlxuICogPC9mZC10YWI+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtdGFiLXRpdGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgVGFiVGl0bGVEaXJlY3RpdmUge1xufVxuXG4vKipcbiAqIE5vdCBmb3IgZXh0ZXJuYWwgdXNlLiBQb3J0YWwgdG8gcmVuZGVyIHRoZSBjb21wbGV4IHRpdGxlIHRlbXBsYXRlLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC10YWItbG9hZC10aXRsZV0nXG59KVxuZXhwb3J0IGNsYXNzIFRhYkxvYWRUaXRsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCdmZC10YWItbG9hZC10aXRsZScpXG4gICAgY29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHByaXZhdGUgY29udGVudFJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdSZWY6IFZpZXdDb250YWluZXJSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3UmVmLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuY29udGVudFJlZiA9IHRoaXMudmlld1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5jb250ZW50KTtcbiAgICB9XG59XG4iXX0=