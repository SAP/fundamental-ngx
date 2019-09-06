/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 * </div>
 * ```
 */
export class ProductTileMediaDirective extends AbstractFdNgxClass {
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
        this._addClassToElement('fd-product-tile__media');
        if (this.photo) {
            this._addStyleToElement('background-image', 'url(' + this.photo + ')');
        }
    }
}
ProductTileMediaDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-product-tile-media]',
            },] }
];
/** @nocollapse */
ProductTileMediaDirective.ctorParameters = () => [
    { type: ElementRef }
];
ProductTileMediaDirective.propDecorators = {
    photo: [{ type: Input }]
};
if (false) {
    /**
     * The image url.
     * @type {?}
     */
    ProductTileMediaDirective.prototype.photo;
    /**
     * @type {?}
     * @private
     */
    ProductTileMediaDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC10aWxlLW1lZGlhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3Byb2R1Y3QtdGlsZS1tZWRpYS9wcm9kdWN0LXRpbGUtbWVkaWEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7O0FBYXZFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxrQkFBa0I7Ozs7O0lBSzdELFlBQW9CLFVBQXNCO1FBQ3RDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURGLGVBQVUsR0FBVixVQUFVLENBQVk7SUFFMUMsQ0FBQzs7Ozs7SUFHRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFBO1NBQ3pFO0lBQ0wsQ0FBQzs7O1lBbkJKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLHlCQUF5QjthQUN0Qzs7OztZQWJtQixVQUFVOzs7b0JBZ0J6QixLQUFLOzs7Ozs7O0lBQU4sMENBQXVCOzs7OztJQUdYLCtDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogQ29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIHByb2R1Y3QgdGlsZSBtZWRpYSBjb250YWluZXIuXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGZkLXByb2R1Y3QtdGlsZS1tZWRpYSBbcGhvdG9dPVwiJ2h0dHBzOi8vdGVjaG5lLnlhYXMuaW8vaW1hZ2VzL3Byb2R1Y3QtdGh1bWJuYWlsLXdpZGUucG5nJ1wiPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXByb2R1Y3QtdGlsZS1tZWRpYV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0VGlsZU1lZGlhRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcbiAgICAvKiogVGhlIGltYWdlIHVybC4gKi9cbiAgICBASW5wdXQoKSBwaG90bzogc3RyaW5nO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXByb2R1Y3QtdGlsZV9fbWVkaWEnKTtcbiAgICAgICAgaWYgKHRoaXMucGhvdG8pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFN0eWxlVG9FbGVtZW50KCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnICsgdGhpcy5waG90byArICcpJylcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==