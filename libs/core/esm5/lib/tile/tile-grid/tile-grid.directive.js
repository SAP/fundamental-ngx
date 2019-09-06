/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Directive that represents a tile grid.
 * A Tile Gird is a collection of fd-tile components in a gird layout.
 * ```html
 * <fd-tile-grid [col]="3">
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 1</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 *          <div fd-tile-content>
 *              <h2 fd-tile-title>Tile Tile 2</h2>
 *              <p>Tile Description</p>
 *          </div>
 *      </fd-tile>
 *      <fd-tile>
 * </fd-tile-grid>
 * ```
 */
var TileGridDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TileGridDirective, _super);
    /** @hidden */
    function TileGridDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TileGridDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    };
    TileGridDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tile-grid]'
                },] }
    ];
    /** @nocollapse */
    TileGridDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TileGridDirective.propDecorators = {
        col: [{ type: Input }]
    };
    return TileGridDirective;
}(AbstractFdNgxClass));
export { TileGridDirective };
if (false) {
    /**
     * The number of columns in the grid layout.
     * The default is 3-col grid.
     * @type {?}
     */
    TileGridDirective.prototype.col;
    /**
     * @type {?}
     * @private
     */
    TileGridDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1ncmlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3RpbGUtZ3JpZC90aWxlLWdyaWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJ2RTtJQUt1Qyw2Q0FBa0I7SUFlckQsY0FBYztJQUNkLDJCQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFFMUMsQ0FBQztJQVhELGNBQWM7Ozs7O0lBQ2QsMENBQWM7Ozs7SUFBZDtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7O2dCQWxCSixTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkE1Qm1CLFVBQVU7OztzQkFrQ3pCLEtBQUs7O0lBY1Ysd0JBQUM7Q0FBQSxBQXhCRCxDQUt1QyxrQkFBa0IsR0FtQnhEO1NBbkJZLGlCQUFpQjs7Ozs7OztJQUsxQixnQ0FBcUI7Ozs7O0lBV1QsdUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IHJlcHJlc2VudHMgYSB0aWxlIGdyaWQuIFxuICogQSBUaWxlIEdpcmQgaXMgYSBjb2xsZWN0aW9uIG9mIGZkLXRpbGUgY29tcG9uZW50cyBpbiBhIGdpcmQgbGF5b3V0LiBcbiAqIGBgYGh0bWxcbiAqIDxmZC10aWxlLWdyaWQgW2NvbF09XCIzXCI+XG4gKiAgICAgIDxmZC10aWxlPlxuICogICAgICAgICAgPGRpdiBmZC10aWxlLWNvbnRlbnQ+XG4gKiAgICAgICAgICAgICAgPGgyIGZkLXRpbGUtdGl0bGU+VGlsZSBUaWxlIDE8L2gyPlxuICogICAgICAgICAgICAgIDxwPlRpbGUgRGVzY3JpcHRpb248L3A+XG4gKiAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgPC9mZC10aWxlPlxuICogICAgICA8ZmQtdGlsZT5cbiAqICAgICAgICAgIDxkaXYgZmQtdGlsZS1jb250ZW50PlxuICogICAgICAgICAgICAgIDxoMiBmZC10aWxlLXRpdGxlPlRpbGUgVGlsZSAyPC9oMj5cbiAqICAgICAgICAgICAgICA8cD5UaWxlIERlc2NyaXB0aW9uPC9wPlxuICogICAgICAgICAgPC9kaXY+XG4gKiAgICAgIDwvZmQtdGlsZT5cbiAqICAgICAgPGZkLXRpbGU+XG4gKiA8L2ZkLXRpbGUtZ3JpZD5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC10aWxlLWdyaWRdJ1xufSlcbmV4cG9ydCBjbGFzcyBUaWxlR3JpZERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG4gICAgLyoqIFxuICAgICAqIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZCBsYXlvdXQuXG4gICAgICogVGhlIGRlZmF1bHQgaXMgMy1jb2wgZ3JpZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2w6IG51bWJlcjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC10aWxlLWdyaWQnKTtcbiAgICAgICAgaWYgKHRoaXMuY29sKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtdGlsZS1ncmlkLS0nICsgdGhpcy5jb2wgKyAnY29sJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=