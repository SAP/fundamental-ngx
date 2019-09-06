/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var TileComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TileComponent, _super);
    /** @hidden */
    function TileComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the tile is disabled.
         */
        _this.disabled = false;
        /**
         * Whether the tile is rendered as a button.
         */
        _this.isButton = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TileComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
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
    };
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
    TileComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TileComponent.propDecorators = {
        disabled: [{ type: Input }],
        isButton: [{ type: Input }],
        rowSpan: [{ type: Input }],
        columnSpan: [{ type: Input }],
        colorAccent: [{ type: Input }]
    };
    return TileComponent;
}(AbstractFdNgxClass));
export { TileComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvdGlsZS90aWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7Ozs7O0FBYXBFO0lBUW1DLHlDQUFrQjtJQWlDakQsY0FBYztJQUNkLHVCQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQWhDakMsY0FBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUcxQixjQUFRLEdBQVksS0FBSyxDQUFDOztJQStCbkMsQ0FBQztJQXBCRCxjQUFjOzs7OztJQUNkLHNDQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNuRTtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pFO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQ0FBaUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDOztnQkF2Q0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixJQUFJLEVBQUU7d0JBQ0YsYUFBYSxFQUFFLDhDQUE4QztxQkFDaEU7b0JBQ0QscUpBQW9DO29CQUNwQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7Ozs7Z0JBckJtQixVQUFVOzs7MkJBd0J6QixLQUFLOzJCQUdMLEtBQUs7MEJBR0wsS0FBSzs2QkFHTCxLQUFLOzhCQUdMLEtBQUs7O0lBdUJWLG9CQUFDO0NBQUEsQUE3Q0QsQ0FRbUMsa0JBQWtCLEdBcUNwRDtTQXJDWSxhQUFhOzs7Ozs7SUFFdEIsaUNBQW1DOzs7OztJQUduQyxpQ0FBbUM7Ozs7O0lBR25DLGdDQUF5Qjs7Ozs7SUFHekIsbUNBQTRCOzs7OztJQUc1QixvQ0FBNkI7Ozs7O0lBb0JqQixtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBUaWxlIGlzIHVzZWQgdG8gZGlzcGxheSBpbmZvcm1hdGlvbiBpbiBhIHNpbXBsZSBjb250YWluZXIgZm9ybWF0LlxuICogYGBgaHRtbFxuICogPGZkLXRpbGU+XG4gKiAgICAgPGZkLXRpbGUtY29udGVudD5cbiAqICAgICAgICAgPGgyIGZkLXRpbGUtdGl0bGU+VGlsZSBUaWxlPC9oMj5cbiAqICAgICAgICAgPHA+VGlsZSBEZXNjcmlwdGlvbjwvcD5cbiAqICAgICA8L2ZkLXRpbGUtY29udGVudD5cbiAqIDwvZmQtdGlsZT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXRpbGUnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnJvbGVdJzogJyh0aGlzLmlzQnV0dG9uID09PSB0cnVlID8gXFwnYnV0dG9uXFwnIDogXFwnXFwnKSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnLi90aWxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRpbGVDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBXaGV0aGVyIHRoZSB0aWxlIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGlsZSBpcyByZW5kZXJlZCBhcyBhIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKSBpc0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFNwZWNpZmllcyB0aGUgbnVtYmVyIG9mIHJvd3MgYSB0aWxlIHNob3VsZCBzcGFuLiAqL1xuICAgIEBJbnB1dCgpIHJvd1NwYW46IG51bWJlcjtcblxuICAgIC8qKiBTcGVjaWZpZXMgdGhlIG51bWJlciBvZiBjb2x1bW5zIGEgdGlsZSBzaG91bGQgc3Bhbi4gKi9cbiAgICBASW5wdXQoKSBjb2x1bW5TcGFuOiBudW1iZXI7XG5cbiAgICAvKiogQSBudW1iZXIgc3BlY2lmeWluZyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgdGlsZS4gKi9cbiAgICBASW5wdXQoKSBjb2xvckFjY2VudDogbnVtYmVyO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXRpbGUnKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdpcy1kaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJvd1NwYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1oYXMtZ3JpZC1yb3ctc3Bhbi0nICsgdGhpcy5yb3dTcGFuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb2x1bW5TcGFuKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtaGFzLWdyaWQtY29sdW1uLXNwYW4tJyArIHRoaXMuY29sdW1uU3Bhbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29sb3JBY2NlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1oYXMtYmFja2dyb3VuZC1jb2xvci1hY2NlbnQtJyArIHRoaXMuY29sb3JBY2NlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxufVxuIl19