/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Label directive, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
export class LabelDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        this.status = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    }
}
LabelDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-label]'
            },] }
];
/** @nocollapse */
LabelDirective.ctorParameters = () => [
    { type: ElementRef }
];
LabelDirective.propDecorators = {
    status: [{ type: Input }]
};
if (false) {
    /**
     * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
     * @type {?}
     */
    LabelDirective.prototype.status;
    /**
     * @type {?}
     * @private
     */
    LabelDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2JhZGdlLWxhYmVsL2xhYmVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7OztBQVVwRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGtCQUFrQjs7Ozs7SUFhbEQsWUFBb0IsVUFBc0I7UUFDdEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBREYsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQVhqQyxXQUFNLEdBQVcsRUFBRSxDQUFDO0lBYTdCLENBQUM7Ozs7O0lBVkQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7OztZQWRKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLFlBQVk7YUFDekI7Ozs7WUFWbUIsVUFBVTs7O3FCQWF6QixLQUFLOzs7Ozs7O0lBQU4sZ0NBQTZCOzs7OztJQVdqQixvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIExhYmVsIGRpcmVjdGl2ZSwgdXNlZCB0byBpbmRpY2F0ZSBzdGF0dXMsIHdpdGhvdXQgYW55IGJhY2tncm91bmQgb3IgYm9yZGVyXG4gKiBDb2xvcnMsIGdlbmVyYWxseSBpbiBjb21iaW5hdGlvbiB3aXRoIHRleHQsIGFyZSB1c2VkIHRvIGVhc2lseSBoaWdobGlnaHQgdGhlIHN0YXRlIG9mIGFuIG9iamVjdC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWxhYmVsXSdcbn0pXG5leHBvcnQgY2xhc3MgTGFiZWxEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBDb2xvciBjb2RlZCBzdGF0dXMgZm9yIHRoZSBsYWJlbC4gT3B0aW9ucyBhcmUgJ3N1Y2Nlc3MnLCAnd2FybmluZycsIGFuZCAnZXJyb3InLiBMZWF2ZSBlbXB0eSBmb3IgZGVmYXVsdCBsYWJlbC4gKi9cbiAgICBASW5wdXQoKSBzdGF0dXM6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWxhYmVsJyk7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWxhYmVsLS0nICsgdGhpcy5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxufVxuIl19