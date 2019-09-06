/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class TileGridDirective extends AbstractFdNgxClass {
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
        this._addClassToElement('fd-tile-grid');
        if (this.col) {
            this._addClassToElement('fd-tile-grid--' + this.col + 'col');
        }
    }
}
TileGridDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-tile-grid]'
            },] }
];
/** @nocollapse */
TileGridDirective.ctorParameters = () => [
    { type: ElementRef }
];
TileGridDirective.propDecorators = {
    col: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1ncmlkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3RpbGUtZ3JpZC90aWxlLWdyaWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QnZFLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxrQkFBa0I7Ozs7O0lBZ0JyRCxZQUFvQixVQUFzQjtRQUN0QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBRTFDLENBQUM7Ozs7O0lBVkQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNoRTtJQUNMLENBQUM7OztZQWxCSixTQUFTLFNBQUM7OztnQkFHUCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzdCOzs7O1lBNUJtQixVQUFVOzs7a0JBa0N6QixLQUFLOzs7Ozs7OztJQUFOLGdDQUFxQjs7Ozs7SUFXVCx1Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgcmVwcmVzZW50cyBhIHRpbGUgZ3JpZC4gXG4gKiBBIFRpbGUgR2lyZCBpcyBhIGNvbGxlY3Rpb24gb2YgZmQtdGlsZSBjb21wb25lbnRzIGluIGEgZ2lyZCBsYXlvdXQuIFxuICogYGBgaHRtbFxuICogPGZkLXRpbGUtZ3JpZCBbY29sXT1cIjNcIj5cbiAqICAgICAgPGZkLXRpbGU+XG4gKiAgICAgICAgICA8ZGl2IGZkLXRpbGUtY29udGVudD5cbiAqICAgICAgICAgICAgICA8aDIgZmQtdGlsZS10aXRsZT5UaWxlIFRpbGUgMTwvaDI+XG4gKiAgICAgICAgICAgICAgPHA+VGlsZSBEZXNjcmlwdGlvbjwvcD5cbiAqICAgICAgICAgIDwvZGl2PlxuICogICAgICA8L2ZkLXRpbGU+XG4gKiAgICAgIDxmZC10aWxlPlxuICogICAgICAgICAgPGRpdiBmZC10aWxlLWNvbnRlbnQ+XG4gKiAgICAgICAgICAgICAgPGgyIGZkLXRpbGUtdGl0bGU+VGlsZSBUaWxlIDI8L2gyPlxuICogICAgICAgICAgICAgIDxwPlRpbGUgRGVzY3JpcHRpb248L3A+XG4gKiAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgPC9mZC10aWxlPlxuICogICAgICA8ZmQtdGlsZT5cbiAqIDwvZmQtdGlsZS1ncmlkPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXRpbGUtZ3JpZF0nXG59KVxuZXhwb3J0IGNsYXNzIFRpbGVHcmlkRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcbiAgICAvKiogXG4gICAgICogVGhlIG51bWJlciBvZiBjb2x1bW5zIGluIHRoZSBncmlkIGxheW91dC5cbiAgICAgKiBUaGUgZGVmYXVsdCBpcyAzLWNvbCBncmlkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbDogbnVtYmVyO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXRpbGUtZ3JpZCcpO1xuICAgICAgICBpZiAodGhpcy5jb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC10aWxlLWdyaWQtLScgKyB0aGlzLmNvbCArICdjb2wnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==