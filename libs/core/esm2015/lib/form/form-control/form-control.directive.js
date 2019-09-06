/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
export class FormControlDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-form__control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    }
}
FormControlDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-form-control]'
            },] }
];
/** @nocollapse */
FormControlDirective.ctorParameters = () => [
    { type: ElementRef }
];
FormControlDirective.propDecorators = {
    state: [{ type: Input }]
};
if (false) {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `error`, `warning` or blank for default.
     * @type {?}
     */
    FormControlDirective.prototype.state;
    /**
     * @type {?}
     * @private
     */
    FormControlDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tY29udHJvbC9mb3JtLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7O0FBY3ZFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxrQkFBa0I7Ozs7O0lBa0J4RCxZQUFvQixVQUFzQjtRQUN0QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBRTFDLENBQUM7Ozs7O0lBVkQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQzs7O1lBcEJKLFNBQVMsU0FBQzs7O2dCQUdQLFFBQVEsRUFBRSxtQkFBbUI7YUFDaEM7Ozs7WUFkMEIsVUFBVTs7O29CQXFCaEMsS0FBSzs7Ozs7Ozs7SUFBTixxQ0FDYzs7Ozs7SUFXRiwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSBpbnRlbmRlZCBmb3IgdXNlIG9uIGZvcm0gY29udHJvbHMuXG4gKlxuICogYGBgaHRtbFxuICogPGlucHV0IHR5cGU9XCJ0ZXh0XCIgZmQtZm9ybS1jb250cm9sIC8+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtZm9ybS1jb250cm9sXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICogIFRoZSBzdGF0ZSBvZiB0aGUgZm9ybSBjb250cm9sIC0gYXBwbGllcyBjc3MgY2xhc3Nlcy5cbiAgICAgKiAgQ2FuIGJlIGB2YWxpZGAsIGBlcnJvcmAsIGB3YXJuaW5nYCBvciBibGFuayBmb3IgZGVmYXVsdC5cbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHN0YXRlOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtZm9ybV9fY29udHJvbCcpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2lzLScgKyB0aGlzLnN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==