/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Panels are used to encapsulate part of the content, form elements, lists, collections, etc., on a page.
 */
export class PanelComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * @hidden
         */
        this.fdPanelClass = true;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.columnSpan) {
            this._addClassToElement('fd-has-grid-column-span-' + this.columnSpan);
        }
        if (this.backgroundImage) {
            this._addStyleToElement('background-image', 'url("' + this.backgroundImage + '")');
        }
    }
}
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-panel',
                template: "<ng-content select=\"fd-panel-header\"></ng-content>\n<ng-content select=\"fd-panel-filters\"></ng-content>\n<ng-content select=\"fd-panel-body\"></ng-content>\n<ng-content select=\"fd-panel-footer\"></ng-content>\n<ng-content></ng-content>\n",
                host: {
                    '[class.fd-has-display-block]': 'true'
                },
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PanelComponent.ctorParameters = () => [
    { type: ElementRef }
];
PanelComponent.propDecorators = {
    columnSpan: [{ type: Input }],
    backgroundImage: [{ type: Input }],
    fdPanelClass: [{ type: HostBinding, args: ['class.fd-panel',] }]
};
if (false) {
    /**
     * \@Input Column span for the panel in the grid system
     * @type {?}
     */
    PanelComponent.prototype.columnSpan;
    /**
     * \@Input Background image of the panel.
     * @type {?}
     */
    PanelComponent.prototype.backgroundImage;
    /**
     * @hidden
     * @type {?}
     */
    PanelComponent.prototype.fdPanelClass;
    /**
     * @type {?}
     * @private
     */
    PanelComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3BhbmVsL3BhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQWFwRSxNQUFNLE9BQU8sY0FBZSxTQUFRLGtCQUFrQjs7Ozs7SUF5QmxELFlBQW9CLFVBQXNCO1FBQ3RDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURGLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFiMUMsaUJBQVksR0FBWSxJQUFJLENBQUM7SUFlN0IsQ0FBQzs7Ozs7SUFaRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekU7UUFDRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3RGO0lBQ0wsQ0FBQzs7O1lBOUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsOFBBQXFDO2dCQUNyQyxJQUFJLEVBQUU7b0JBQ0YsOEJBQThCLEVBQUUsTUFBTTtpQkFDekM7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFibUIsVUFBVTs7O3lCQWlCekIsS0FBSzs4QkFJTCxLQUFLOzJCQUlMLFdBQVcsU0FBQyxnQkFBZ0I7Ozs7Ozs7SUFSN0Isb0NBQ21COzs7OztJQUduQix5Q0FDd0I7Ozs7O0lBR3hCLHNDQUM2Qjs7Ozs7SUFhakIsb0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFBhbmVscyBhcmUgdXNlZCB0byBlbmNhcHN1bGF0ZSBwYXJ0IG9mIHRoZSBjb250ZW50LCBmb3JtIGVsZW1lbnRzLCBsaXN0cywgY29sbGVjdGlvbnMsIGV0Yy4sIG9uIGEgcGFnZS5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1wYW5lbCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtaGFzLWRpc3BsYXktYmxvY2tdJzogJ3RydWUnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBASW5wdXQgQ29sdW1uIHNwYW4gZm9yIHRoZSBwYW5lbCBpbiB0aGUgZ3JpZCBzeXN0ZW0gKi9cbiAgICBASW5wdXQoKVxuICAgIGNvbHVtblNwYW46IG51bWJlcjtcblxuICAgIC8qKiBASW5wdXQgQmFja2dyb3VuZCBpbWFnZSBvZiB0aGUgcGFuZWwuICovXG4gICAgQElucHV0KClcbiAgICBiYWNrZ3JvdW5kSW1hZ2U6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1wYW5lbCcpXG4gICAgZmRQYW5lbENsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtblNwYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1oYXMtZ3JpZC1jb2x1bW4tc3Bhbi0nICsgdGhpcy5jb2x1bW5TcGFuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5iYWNrZ3JvdW5kSW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFN0eWxlVG9FbGVtZW50KCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyB0aGlzLmJhY2tncm91bmRJbWFnZSArICdcIiknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==