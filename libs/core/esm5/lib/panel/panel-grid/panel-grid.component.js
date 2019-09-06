/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
var PanelGridComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PanelGridComponent, _super);
    /** @hidden */
    function PanelGridComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the grid should have a gap.
         */
        _this.nogap = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    PanelGridComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-panel-grid');
        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    };
    PanelGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-grid',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    PanelGridComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PanelGridComponent.propDecorators = {
        col: [{ type: Input }],
        nogap: [{ type: Input }]
    };
    return PanelGridComponent;
}(AbstractFdNgxClass));
export { PanelGridComponent };
if (false) {
    /**
     * Number of columns for the grid.
     * @type {?}
     */
    PanelGridComponent.prototype.col;
    /**
     * Whether the grid should have a gap.
     * @type {?}
     */
    PanelGridComponent.prototype.nogap;
    /**
     * @type {?}
     * @private
     */
    PanelGridComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFuZWwvcGFuZWwtZ3JpZC9wYW5lbC1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFlLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQUt2RTtJQUt3Qyw4Q0FBa0I7SUFRdEQsY0FBYztJQUNkLDRCQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQUhqQyxXQUFLLEdBQVksS0FBSyxDQUFDOztJQUtoQyxDQUFDO0lBRUQsY0FBYzs7Ozs7SUFDZCwyQ0FBYzs7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDOztnQkE3QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO29CQUN6QixxQ0FBMEM7b0JBQzFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7OztnQkFWbUIsVUFBVTs7O3NCQWN6QixLQUFLO3dCQUdMLEtBQUs7O0lBbUJWLHlCQUFDO0NBQUEsQUE5QkQsQ0FLd0Msa0JBQWtCLEdBeUJ6RDtTQXpCWSxrQkFBa0I7Ozs7OztJQUczQixpQ0FBcUI7Ozs7O0lBR3JCLG1DQUFnQzs7Ozs7SUFHcEIsd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFVzZSBhIHBhbmVsIGdyaWQgdG8gYXJyYW5nZSBwYW5lbHMgZXZlbmx5IGluIGEgZ3JpZCBsYXlvdXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcGFuZWwtZ3JpZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLWdyaWQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxHcmlkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBmb3IgdGhlIGdyaWQuICovXG4gICAgQElucHV0KCkgY29sOiBudW1iZXI7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZ3JpZCBzaG91bGQgaGF2ZSBhIGdhcC4gKi9cbiAgICBASW5wdXQoKSBub2dhcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXBhbmVsLWdyaWQnKTtcblxuICAgICAgICBpZiAodGhpcy5ub2dhcCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXBhbmVsLWdyaWQtLW5vZ2FwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1wYW5lbC1ncmlkLS0nICsgdGhpcy5jb2wgKyAnY29sJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=