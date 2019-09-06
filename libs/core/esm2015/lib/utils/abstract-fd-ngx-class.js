/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AbstractFdNgxClass {
    /**
     * @hidden
     * @protected
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this._elementRef = elementRef;
        this._setProperties();
    }
    /**
     * @hidden
     * @param {?} className
     * @return {?}
     */
    _addClassToElement(className) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).classList.add(...className.split(' '));
    }
    /**
     * @hidden
     * @param {?} attribute
     * @param {?} value
     * @return {?}
     */
    _addStyleToElement(attribute, value) {
        ((/** @type {?} */ (this._elementRef.nativeElement))).style[attribute] = value;
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnChanges() {
        /** @type {?} */
        const classList = ((/** @type {?} */ (this._elementRef.nativeElement))).classList;
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }
        if (this.class) {
            this._addClassToElement(this.class);
        }
        this._setProperties();
    }
    /**
     * @hidden
     * @return {?}
     */
    ngOnInit() {
        this._setProperties();
    }
}
AbstractFdNgxClass.propDecorators = {
    class: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZmQtbmd4LWNsYXNzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFpQyxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7O0FBVXJFLE1BQU0sT0FBZ0Isa0JBQWtCOzs7Ozs7SUF3QnBDLFlBQXNCLFVBQXNCO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7Ozs7SUFiRCxrQkFBa0IsQ0FBQyxTQUFpQjtRQUNoQyxDQUFDLG1CQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7Ozs7Ozs7SUFHRCxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsS0FBSztRQUMvQixDQUFDLG1CQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzdFLENBQUM7Ozs7O0lBU0QsV0FBVzs7Y0FDRCxTQUFTLEdBQUcsQ0FBQyxtQkFBQSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBZSxDQUFDLENBQUMsU0FBUztRQUMzRSxPQUFPLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUdELFFBQVE7UUFDSixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O29CQXhDQSxLQUFLOzs7Ozs7O0lBSE4seUNBQWdDOzs7OztJQUdoQyxtQ0FBZTs7Ozs7O0lBT2YsOERBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qXG4gVGhpcyBhYnN0cmFjdCBjbGFzcyBhbGxvd3MgdGhlIHVzZXIgdG8gc2V0IHRoZWlyIG93biBjdXN0b20gc3R5bGVzIG9uIGEgRnVuZGFtZW50YWwgTkdYIGRpcmVjdGl2ZSwgaW4gYWRkaXRpb24gdG8gdGhlXG4gc3R5bGVzIHRoZSBsaWJyYXJ5IG5lZWRzIHRvIGFkZCBpdHNlbGYuXG4gV2hlbiBsaWJyYXJ5IHN0eWxlcyB3ZXJlIGFkZGVkIHRocm91Z2ggdGhlIGRpcmVjdGl2ZSdzIGhvc3Q6IHsnW2NsYXNzXSd9IHByb3BlcnR5LCBhbnkgc3R5bGVzIHRoZSB1c2VyIGFkZGVkIHdvdWxkIGJlXG4gb3ZlcndyaXR0ZW4uICBCeSBleHRlbmRpbmcgdGhpcyBjbGFzcywgd2UgaW5zdGVhZCBhZGQgbGlicmFyeSBzdHlsZXMgdG8gdGhlIHVzZXIncyBjbGFzc0xpc3QgcmF0aGVyIHRoYW4gcmVwbGFjZSB0aGVtLlxuICovXG5cbi8qKiBAaGlkZGVuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RGZE5neENsYXNzIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBJbnB1dCgpIGNsYXNzOyAvLyB1c2VyJ3MgY3VzdG9tIGNsYXNzZXNcblxuICAgIC8qXG4gICAgIGVhY2ggZGlyZWN0aXZlIHRoYXQgZXh0ZW5kcyB0aGlzIGNsYXNzIHdpbGwgaW1wbGVtZW50IHRoaXMgZnVuY3Rpb24gYW5kIHBvcHVsYXRlIGl0IHdpdGggb25lIG9yIG1vcmUgY2FsbHMgdG9cbiAgICAgdGhlICdfYWRkQ2xhc3NUb0VsZW1lbnQnIGZ1bmN0aW9uLCBwYXNzaW5nIHRoZSBzdHlsZSBuYW1lcyB0byBiZSBhZGRlZCB3aXRoIGVhY2ggY2FsbFxuICAgICAqL1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgYWJzdHJhY3QgX3NldFByb3BlcnRpZXMoKTogdm9pZDtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX2FkZENsYXNzVG9FbGVtZW50KGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gICAgICAgICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lLnNwbGl0KCcgJykpO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX2FkZFN0eWxlVG9FbGVtZW50KGF0dHJpYnV0ZSwgdmFsdWUpIHtcbiAgICAgICAgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGVbYXR0cmlidXRlXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICBjb25zdCBjbGFzc0xpc3QgPSAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3Q7XG4gICAgICAgIHdoaWxlIChjbGFzc0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZShjbGFzc0xpc3QuaXRlbSgwKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KHRoaXMuY2xhc3MpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLl9zZXRQcm9wZXJ0aWVzKCk7XG4gICAgfVxufVxuIl19