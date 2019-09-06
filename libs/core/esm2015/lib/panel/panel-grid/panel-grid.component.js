/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Use a panel grid to arrange panels evenly in a grid layout.
 */
export class PanelGridComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the grid should have a gap.
         */
        this.nogap = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-panel-grid');
        if (this.nogap) {
            this._addClassToElement('fd-panel-grid--nogap');
        }
        if (this.col) {
            this._addClassToElement('fd-panel-grid--' + this.col + 'col');
        }
    }
}
PanelGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-panel-grid',
                template: "<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PanelGridComponent.ctorParameters = () => [
    { type: ElementRef }
];
PanelGridComponent.propDecorators = {
    col: [{ type: Input }],
    nogap: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFuZWwvcGFuZWwtZ3JpZC9wYW5lbC1ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQWUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBVXZFLE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxrQkFBa0I7Ozs7O0lBU3RELFlBQW9CLFVBQXNCO1FBQ3RDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURGLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFIakMsVUFBSyxHQUFZLEtBQUssQ0FBQztJQUtoQyxDQUFDOzs7OztJQUdELGNBQWM7UUFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFekMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7OztZQTdCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLHFDQUEwQztnQkFDMUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFWbUIsVUFBVTs7O2tCQWN6QixLQUFLO29CQUdMLEtBQUs7Ozs7Ozs7SUFITixpQ0FBcUI7Ozs7O0lBR3JCLG1DQUFnQzs7Ozs7SUFHcEIsd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFVzZSBhIHBhbmVsIGdyaWQgdG8gYXJyYW5nZSBwYW5lbHMgZXZlbmx5IGluIGEgZ3JpZCBsYXlvdXQuXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcGFuZWwtZ3JpZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLWdyaWQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxHcmlkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBOdW1iZXIgb2YgY29sdW1ucyBmb3IgdGhlIGdyaWQuICovXG4gICAgQElucHV0KCkgY29sOiBudW1iZXI7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZ3JpZCBzaG91bGQgaGF2ZSBhIGdhcC4gKi9cbiAgICBASW5wdXQoKSBub2dhcDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXBhbmVsLWdyaWQnKTtcblxuICAgICAgICBpZiAodGhpcy5ub2dhcCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXBhbmVsLWdyaWQtLW5vZ2FwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5jb2wpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1wYW5lbC1ncmlkLS0nICsgdGhpcy5jb2wgKyAnY29sJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=