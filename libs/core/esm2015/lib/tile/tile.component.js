/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Tile is used to display information in a simple container format.
 * ```html
 * <fd-tile>
 *     <fd-tile-content>
 *         <h2 fd-tile-title>Tile Tile</h2>
 *         <p>Tile Description</p>
 *     </fd-tile-content>
 * </fd-tile>
 * ```
 */
export class TileComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the tile is disabled.
         */
        this.disabled = false;
        /**
         * Whether the tile is rendered as a button.
         */
        this.isButton = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
        if (this.rowSpan) {
            this._addClassToElement('fd-has-grid-row-span-' + this.rowSpan);
        }
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.colorAccent) {
            this._addClassToElement('fd-has-background-color-accent-' + this.colorAccent);
        }
    }
}
TileComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-tile',
                host: {
                    '[attr.role]': '(this.isButton === true ? \'button\' : \'\')'
                },
                template: "<ng-content select=\"[fd-tile-media]\"></ng-content>\n<ng-content select=\"[fd-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
TileComponent.ctorParameters = () => [
    { type: ElementRef }
];
TileComponent.propDecorators = {
    disabled: [{ type: Input }],
    isButton: [{ type: Input }],
    rowSpan: [{ type: Input }],
    columnSpan: [{ type: Input }],
    colorAccent: [{ type: Input }]
};
if (false) {
    /**
     * Whether the tile is disabled.
     * @type {?}
     */
    TileComponent.prototype.disabled;
    /**
     * Whether the tile is rendered as a button.
     * @type {?}
     */
    TileComponent.prototype.isButton;
    /**
     * Specifies the number of rows a tile should span.
     * @type {?}
     */
    TileComponent.prototype.rowSpan;
    /**
     * Specifies the number of columns a tile should span.
     * @type {?}
     */
    TileComponent.prototype.columnSpan;
    /**
     * A number specifying the background color of the tile.
     * @type {?}
     */
    TileComponent.prototype.colorAccent;
    /**
     * @type {?}
     * @private
     */
    TileComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGlsZS90aWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7Ozs7Ozs7QUFxQnBFLE1BQU0sT0FBTyxhQUFjLFNBQVEsa0JBQWtCOzs7OztJQWtDakQsWUFBb0IsVUFBc0I7UUFDdEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBREYsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQWhDakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUcxQixhQUFRLEdBQVksS0FBSyxDQUFDO0lBK0JuQyxDQUFDOzs7OztJQW5CRCxjQUFjO1FBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkU7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6RTtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUNBQWlDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQzs7O1lBdkNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsSUFBSSxFQUFFO29CQUNGLGFBQWEsRUFBRSw4Q0FBOEM7aUJBQ2hFO2dCQUNELHFKQUFvQztnQkFDcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFyQm1CLFVBQVU7Ozt1QkF3QnpCLEtBQUs7dUJBR0wsS0FBSztzQkFHTCxLQUFLO3lCQUdMLEtBQUs7MEJBR0wsS0FBSzs7Ozs7OztJQVpOLGlDQUFtQzs7Ozs7SUFHbkMsaUNBQW1DOzs7OztJQUduQyxnQ0FBeUI7Ozs7O0lBR3pCLG1DQUE0Qjs7Ozs7SUFHNUIsb0NBQTZCOzs7OztJQW9CakIsbUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogVGlsZSBpcyB1c2VkIHRvIGRpc3BsYXkgaW5mb3JtYXRpb24gaW4gYSBzaW1wbGUgY29udGFpbmVyIGZvcm1hdC5cbiAqIGBgYGh0bWxcbiAqIDxmZC10aWxlPlxuICogICAgIDxmZC10aWxlLWNvbnRlbnQ+XG4gKiAgICAgICAgIDxoMiBmZC10aWxlLXRpdGxlPlRpbGUgVGlsZTwvaDI+XG4gKiAgICAgICAgIDxwPlRpbGUgRGVzY3JpcHRpb248L3A+XG4gKiAgICAgPC9mZC10aWxlLWNvbnRlbnQ+XG4gKiA8L2ZkLXRpbGU+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10aWxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICcodGhpcy5pc0J1dHRvbiA9PT0gdHJ1ZSA/IFxcJ2J1dHRvblxcJyA6IFxcJ1xcJyknXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGlsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBUaWxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcbiAgICAvKiogV2hldGhlciB0aGUgdGlsZSBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHRpbGUgaXMgcmVuZGVyZWQgYXMgYSBidXR0b24uICovXG4gICAgQElucHV0KCkgaXNCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiByb3dzIGEgdGlsZSBzaG91bGQgc3Bhbi4gKi9cbiAgICBASW5wdXQoKSByb3dTcGFuOiBudW1iZXI7XG5cbiAgICAvKiogU3BlY2lmaWVzIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhIHRpbGUgc2hvdWxkIHNwYW4uICovXG4gICAgQElucHV0KCkgY29sdW1uU3BhbjogbnVtYmVyO1xuXG4gICAgLyoqIEEgbnVtYmVyIHNwZWNpZnlpbmcgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIHRpbGUuICovXG4gICAgQElucHV0KCkgY29sb3JBY2NlbnQ6IG51bWJlcjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC10aWxlJyk7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yb3dTcGFuKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaGFzLWdyaWQtcm93LXNwYW4tJyArIHRoaXMucm93U3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sdW1uU3Bhbikge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWhhcy1ncmlkLWNvbHVtbi1zcGFuLScgKyB0aGlzLmNvbHVtblNwYW4pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNvbG9yQWNjZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaGFzLWJhY2tncm91bmQtY29sb3ItYWNjZW50LScgKyB0aGlzLmNvbG9yQWNjZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==