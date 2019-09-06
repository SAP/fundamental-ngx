/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input } from '@angular/core';
/*
 This abstract class allows the user to set their own custom styles on a Fundamental NGX directive, in addition to the
 styles the library needs to add itself.
 When library styles were added through the directive's host: {'[class]'} property, any styles the user added would be
 overwritten.  By extending this class, we instead add library styles to the user's classList rather than replace them.
 */
/**
 * @hidden
 * @abstract
 */
var AbstractFdNgxClass = /** @class */ (function () {
    /** @hidden */
    function AbstractFdNgxClass(elementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }
    /** @hidden */
    /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    AbstractFdNgxClass.prototype._addClassToElement = /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    function (className) {
        var _a;
        (_a = ((/** @type {?} */ (this._elementRef.nativeElement))).classList).add.apply(_a, tslib_1.__spread(className.split(' ')));
    };
    /** @hidden */
    /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    AbstractFdNgxClass.prototype._addStyleToElement = /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    function (attribute, value) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).style[attribute] = value;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AbstractFdNgxClass.prototype.ngOnChanges = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var classList = ((/** @type {?} */ (this._elementRef.nativeElement))).classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }
        if (this.class) {
            this._addClassToElement(this.class);
        }
        this._setProperties();
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    AbstractFdNgxClass.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    AbstractFdNgxClass.propDecorators = {
        class: [{ type: Input }]
    };
    return AbstractFdNgxClass;
}());
export { AbstractFdNgxClass };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AbstractFdNgxClass.prototype._elementRef;
    /**
     * @hidden
     * @type {?}
     */
    AbstractFdNgxClass.prototype.class;
    /**
     * @hidden
     * @abstract
     * @return {?}
     */
    AbstractFdNgxClass.prototype._setProperties = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZmQtbmd4LWNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBaUMsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7OztBQVVyRTtJQXVCSSxjQUFjO0lBQ2QsNEJBQXNCLFVBQXNCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBZEQsY0FBYzs7Ozs7O0lBQ2QsK0NBQWtCOzs7OztJQUFsQixVQUFtQixTQUFpQjs7UUFDaEMsQ0FBQSxLQUFBLENBQUMsbUJBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQSxDQUFDLEdBQUcsNEJBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRTtJQUMzRixDQUFDO0lBRUQsY0FBYzs7Ozs7OztJQUNkLCtDQUFrQjs7Ozs7O0lBQWxCLFVBQW1CLFNBQVMsRUFBRSxLQUFLO1FBQy9CLENBQUMsbUJBQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDN0UsQ0FBQztJQVFELGNBQWM7Ozs7O0lBQ2Qsd0NBQVc7Ozs7SUFBWDs7WUFDVSxTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsU0FBUztRQUMzRSxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsY0FBYzs7Ozs7SUFDZCxxQ0FBUTs7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7O3dCQXhDQSxLQUFLOztJQXlDVix5QkFBQztDQUFBLEFBN0NELElBNkNDO1NBN0NxQixrQkFBa0I7Ozs7OztJQUNwQyx5Q0FBZ0M7Ozs7O0lBR2hDLG1DQUFlOzs7Ozs7SUFPZiw4REFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBPbkNoYW5nZXMsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLypcbiBUaGlzIGFic3RyYWN0IGNsYXNzIGFsbG93cyB0aGUgdXNlciB0byBzZXQgdGhlaXIgb3duIGN1c3RvbSBzdHlsZXMgb24gYSBGdW5kYW1lbnRhbCBOR1ggZGlyZWN0aXZlLCBpbiBhZGRpdGlvbiB0byB0aGVcbiBzdHlsZXMgdGhlIGxpYnJhcnkgbmVlZHMgdG8gYWRkIGl0c2VsZi5cbiBXaGVuIGxpYnJhcnkgc3R5bGVzIHdlcmUgYWRkZWQgdGhyb3VnaCB0aGUgZGlyZWN0aXZlJ3MgaG9zdDogeydbY2xhc3NdJ30gcHJvcGVydHksIGFueSBzdHlsZXMgdGhlIHVzZXIgYWRkZWQgd291bGQgYmVcbiBvdmVyd3JpdHRlbi4gIEJ5IGV4dGVuZGluZyB0aGlzIGNsYXNzLCB3ZSBpbnN0ZWFkIGFkZCBsaWJyYXJ5IHN0eWxlcyB0byB0aGUgdXNlcidzIGNsYXNzTGlzdCByYXRoZXIgdGhhbiByZXBsYWNlIHRoZW0uXG4gKi9cblxuLyoqIEBoaWRkZW4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZkTmd4Q2xhc3MgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KCkgY2xhc3M7IC8vIHVzZXIncyBjdXN0b20gY2xhc3Nlc1xuXG4gICAgLypcbiAgICAgZWFjaCBkaXJlY3RpdmUgdGhhdCBleHRlbmRzIHRoaXMgY2xhc3Mgd2lsbCBpbXBsZW1lbnQgdGhpcyBmdW5jdGlvbiBhbmQgcG9wdWxhdGUgaXQgd2l0aCBvbmUgb3IgbW9yZSBjYWxscyB0b1xuICAgICB0aGUgJ19hZGRDbGFzc1RvRWxlbWVudCcgZnVuY3Rpb24sIHBhc3NpbmcgdGhlIHN0eWxlIG5hbWVzIHRvIGJlIGFkZGVkIHdpdGggZWFjaCBjYWxsXG4gICAgICovXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBhYnN0cmFjdCBfc2V0UHJvcGVydGllcygpOiB2b2lkO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfYWRkQ2xhc3NUb0VsZW1lbnQoY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWUuc3BsaXQoJyAnKSk7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfYWRkU3R5bGVUb0VsZW1lbnQoYXR0cmlidXRlLCB2YWx1ZSkge1xuICAgICAgICAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zdHlsZVthdHRyaWJ1dGVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICAgICAgdGhpcy5fc2V0UHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9ICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdDtcbiAgICAgICAgd2hpbGUgKGNsYXNzTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdC5pdGVtKDApKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jbGFzcykge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQodGhpcy5jbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0UHJvcGVydGllcygpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG59XG4iXX0=