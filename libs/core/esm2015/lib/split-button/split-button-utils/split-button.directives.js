/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directive used to identify the template which will populate the main action button.
 * Used to achieve complex buttons that require more than a string.
 * ```html
 *    <fd-button-split>
 *        <ng-template fd-button-split-action-title>
 *            <p>Paragraph 1</p>
 *            <p>Paragraph 2</p>
 *        </ng-template>
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 * </fd-button-split>
 * ```
 */
export class SplitButtonActionTitle {
}
SplitButtonActionTitle.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-action-title]'
            },] }
];
/**
 *   Directive used to specify menu list of items for dropdown.
 * ```html
 *    <fd-button-split>
 *        Action Button
 *        <div fd-button-split-menu>
 *            <fd-menu>
 *                <ul fd-menu-list>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option</a>
 *                    </li>
 *                    <li fd-menu-item>
 *                       <a [routerLink]="'/'">option2</a>
 *                    </li>
 *                </ul>
 *            </fd-menu>
 *        </div>
 *    </fd-button-split>
 * </fd-button-split>
 * ```
 */
export class SplitButtonMenuDirective {
}
SplitButtonMenuDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-menu]',
            },] }
];
/**
 * Not for external use. Portal to render the complex title template.
 */
export class SplitButtonLoadActionTitle {
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
SplitButtonLoadActionTitle.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-split-button-load-action-title]'
            },] }
];
/** @nocollapse */
SplitButtonLoadActionTitle.ctorParameters = () => [
    { type: ViewContainerRef }
];
SplitButtonLoadActionTitle.propDecorators = {
    content: [{ type: Input, args: ['fd-split-button-load-action-title',] }]
};
if (false) {
    /** @type {?} */
    SplitButtonLoadActionTitle.prototype.content;
    /**
     * @type {?}
     * @private
     */
    SplitButtonLoadActionTitle.prototype.contentRef;
    /**
     * @type {?}
     * @private
     */
    SplitButtonLoadActionTitle.prototype.viewRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtYnV0dG9uLmRpcmVjdGl2ZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvc3BsaXQtYnV0dG9uL3NwbGl0LWJ1dHRvbi11dGlscy9zcGxpdC1idXR0b24uZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBbUIsS0FBSyxFQUFVLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQ3pHLE1BQU0sT0FBTyxzQkFBc0I7OztZQUxsQyxTQUFTLFNBQUM7OztnQkFHUCxRQUFRLEVBQUUsZ0NBQWdDO2FBQzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCRCxNQUFNLE9BQU8sd0JBQXdCOzs7WUFKcEMsU0FBUyxTQUFDOztnQkFFUCxRQUFRLEVBQUUsd0JBQXdCO2FBQ3JDOzs7OztBQWFELE1BQU0sT0FBTywwQkFBMEI7Ozs7SUFNbkMsWUFBb0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7SUFBRyxDQUFDOzs7O0lBRWpELFFBQVE7UUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7O1lBaEJKLFNBQVMsU0FBQzs7O2dCQUdQLFFBQVEsRUFBRSxxQ0FBcUM7YUFDbEQ7Ozs7WUF2RWdFLGdCQUFnQjs7O3NCQXlFNUUsS0FBSyxTQUFDLG1DQUFtQzs7OztJQUExQyw2Q0FDMEI7Ozs7O0lBRTFCLGdEQUF5Qzs7Ozs7SUFFN0IsNkNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIElucHV0LCBPbkluaXQsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHVzZWQgdG8gaWRlbnRpZnkgdGhlIHRlbXBsYXRlIHdoaWNoIHdpbGwgcG9wdWxhdGUgdGhlIG1haW4gYWN0aW9uIGJ1dHRvbi5cbiAqIFVzZWQgdG8gYWNoaWV2ZSBjb21wbGV4IGJ1dHRvbnMgdGhhdCByZXF1aXJlIG1vcmUgdGhhbiBhIHN0cmluZy5cbiAqYGBgaHRtbFxuICogICAgPGZkLWJ1dHRvbi1zcGxpdD5cbiAqICAgICAgICA8bmctdGVtcGxhdGUgZmQtYnV0dG9uLXNwbGl0LWFjdGlvbi10aXRsZT5cbiAqICAgICAgICAgICAgPHA+UGFyYWdyYXBoIDE8L3A+XG4gKiAgICAgICAgICAgIDxwPlBhcmFncmFwaCAyPC9wPlxuICogICAgICAgIDwvbmctdGVtcGxhdGU+XG4gKiAgICAgICAgPGRpdiBmZC1idXR0b24tc3BsaXQtbWVudT5cbiAqICAgICAgICAgICAgPGZkLW1lbnU+XG4gKiAgICAgICAgICAgICAgICA8dWwgZmQtbWVudS1saXN0PlxuICogICAgICAgICAgICAgICAgICAgIDxsaSBmZC1tZW51LWl0ZW0+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiJy8nXCI+b3B0aW9uPC9hPlxuICogICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICAgICAgICAgPGxpIGZkLW1lbnUtaXRlbT5cbiAqICAgICAgICAgICAgICAgICAgICAgICA8YSBbcm91dGVyTGlua109XCInLydcIj5vcHRpb24yPC9hPlxuICogICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICAgICA8L3VsPlxuICogICAgICAgICAgICA8L2ZkLW1lbnU+XG4gKiAgICAgICAgPC9kaXY+XG4gKiAgICA8L2ZkLWJ1dHRvbi1zcGxpdD5cbiAqPC9mZC1idXR0b24tc3BsaXQ+XG4gKmBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1zcGxpdC1idXR0b24tYWN0aW9uLXRpdGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRCdXR0b25BY3Rpb25UaXRsZSB7fVxuXG5cbi8qKlxuICogICBEaXJlY3RpdmUgdXNlZCB0byBzcGVjaWZ5IG1lbnUgbGlzdCBvZiBpdGVtcyBmb3IgZHJvcGRvd24uXG4gKmBgYGh0bWxcbiAqICAgIDxmZC1idXR0b24tc3BsaXQ+XG4gKiAgICAgICAgQWN0aW9uIEJ1dHRvblxuICogICAgICAgIDxkaXYgZmQtYnV0dG9uLXNwbGl0LW1lbnU+XG4gKiAgICAgICAgICAgIDxmZC1tZW51PlxuICogICAgICAgICAgICAgICAgPHVsIGZkLW1lbnUtbGlzdD5cbiAqICAgICAgICAgICAgICAgICAgICA8bGkgZmQtbWVudS1pdGVtPlxuICogICAgICAgICAgICAgICAgICAgICAgIDxhIFtyb3V0ZXJMaW5rXT1cIicvJ1wiPm9wdGlvbjwvYT5cbiAqICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgICAgICAgIDxsaSBmZC1tZW51LWl0ZW0+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgPGEgW3JvdXRlckxpbmtdPVwiJy8nXCI+b3B0aW9uMjwvYT5cbiAqICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgICAgICAgPC91bD5cbiAqICAgICAgICAgICAgPC9mZC1tZW51PlxuICogICAgICAgIDwvZGl2PlxuICogICAgPC9mZC1idXR0b24tc3BsaXQ+XG4gKjwvZmQtYnV0dG9uLXNwbGl0PlxuICpgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXNwbGl0LWJ1dHRvbi1tZW51XScsXG59KVxuZXhwb3J0IGNsYXNzIFNwbGl0QnV0dG9uTWVudURpcmVjdGl2ZSB7fVxuXG5cblxuLyoqXG4gKiBOb3QgZm9yIGV4dGVybmFsIHVzZS4gUG9ydGFsIHRvIHJlbmRlciB0aGUgY29tcGxleCB0aXRsZSB0ZW1wbGF0ZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtc3BsaXQtYnV0dG9uLWxvYWQtYWN0aW9uLXRpdGxlXSdcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRCdXR0b25Mb2FkQWN0aW9uVGl0bGUgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgnZmQtc3BsaXQtYnV0dG9uLWxvYWQtYWN0aW9uLXRpdGxlJylcbiAgICBjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSBjb250ZW50UmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld1JlZjogVmlld0NvbnRhaW5lclJlZikge31cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdSZWYuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5jb250ZW50UmVmID0gdGhpcy52aWV3UmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLmNvbnRlbnQpO1xuICAgIH1cbn1cbiJdfQ==