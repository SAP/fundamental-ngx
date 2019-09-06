/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostBinding } from '@angular/core';
/**
 * Applies the panel title style to a header element. It can be used with any header level.
 *
 * ```html
 * <h1 fd-panel-title>Panel Title</h1>
 * <h3 fd-panel-title>Panel Title</h3>
 * ```
 */
var PanelTitleDirective = /** @class */ (function () {
    function PanelTitleDirective() {
        /**
         * @hidden
         */
        this.fdPanelTitleClass = true;
    }
    PanelTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-panel-title]',
                },] }
    ];
    PanelTitleDirective.propDecorators = {
        fdPanelTitleClass: [{ type: HostBinding, args: ['class.fd-panel__title',] }]
    };
    return PanelTitleDirective;
}());
export { PanelTitleDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    PanelTitleDirective.prototype.fdPanelTitleClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtdGl0bGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3BhbmVsL3BhbmVsLXRpdGxlL3BhbmVsLXRpdGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7OztBQVV2RDtJQUFBOzs7O1FBU0ksc0JBQWlCLEdBQVksSUFBSSxDQUFDO0lBQ3RDLENBQUM7O2dCQVZBLFNBQVMsU0FBQzs7O29CQUdQLFFBQVEsRUFBRSxrQkFBa0I7aUJBQy9COzs7b0NBSUksV0FBVyxTQUFDLHVCQUF1Qjs7SUFFeEMsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FMWSxtQkFBbUI7Ozs7OztJQUc1QixnREFDa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXBwbGllcyB0aGUgcGFuZWwgdGl0bGUgc3R5bGUgdG8gYSBoZWFkZXIgZWxlbWVudC4gSXQgY2FuIGJlIHVzZWQgd2l0aCBhbnkgaGVhZGVyIGxldmVsLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxoMSBmZC1wYW5lbC10aXRsZT5QYW5lbCBUaXRsZTwvaDE+XG4gKiA8aDMgZmQtcGFuZWwtdGl0bGU+UGFuZWwgVGl0bGU8L2gzPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXBhbmVsLXRpdGxlXScsXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsVGl0bGVEaXJlY3RpdmUge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXBhbmVsX190aXRsZScpXG4gICAgZmRQYW5lbFRpdGxlQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xufVxuIl19