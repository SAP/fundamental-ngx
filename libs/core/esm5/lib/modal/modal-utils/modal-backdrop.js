/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { modalFadeNgIf } from './modal-animations';
import { ModalRef } from './modal-ref';
var ModalBackdrop = /** @class */ (function (_super) {
    tslib_1.__extends(ModalBackdrop, _super);
    function ModalBackdrop(elRef, modalRef) {
        var _this = _super.call(this, elRef) || this;
        _this.elRef = elRef;
        _this.modalRef = modalRef;
        _this.backdropClass = '';
        _this.backdropClickCloseable = true;
        _this.overlayMain = true;
        _this.overlayModal = true;
        return _this;
    }
    /**
     * @return {?}
     */
    ModalBackdrop.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    /**
     * @return {?}
     */
    ModalBackdrop.prototype._setProperties = /**
     * @return {?}
     */
    function () {
        if (this.backdropClass) {
            this._addClassToElement(this.backdropClass);
        }
    };
    /**
     * @return {?}
     */
    ModalBackdrop.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        if (this.backdropClickCloseable) {
            this.modalRef.dismiss('backdrop');
        }
    };
    ModalBackdrop.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-overlay',
                    template: "",
                    host: {
                        'tabindex': '-1',
                        '[@modal-fade]': ''
                    },
                    animations: [
                        modalFadeNgIf
                    ],
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    ModalBackdrop.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ModalRef }
    ]; };
    ModalBackdrop.propDecorators = {
        overlayMain: [{ type: HostBinding, args: ['class.fd-overlay',] }],
        overlayModal: [{ type: HostBinding, args: ['class.fd-overlay--modal',] }],
        closeModal: [{ type: HostListener, args: ['click',] }]
    };
    return ModalBackdrop;
}(AbstractFdNgxClass));
export { ModalBackdrop };
if (false) {
    /** @type {?} */
    ModalBackdrop.prototype.backdropClass;
    /** @type {?} */
    ModalBackdrop.prototype.backdropClickCloseable;
    /** @type {?} */
    ModalBackdrop.prototype.overlayMain;
    /** @type {?} */
    ModalBackdrop.prototype.overlayModal;
    /**
     * @type {?}
     * @private
     */
    ModalBackdrop.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    ModalBackdrop.prototype.modalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kYWwvbW9kYWwtdXRpbHMvbW9kYWwtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDO0lBWW1DLHlDQUFrQjtJQVFqRCx1QkFBb0IsS0FBaUIsRUFDakIsUUFBa0I7UUFEdEMsWUFFSSxrQkFBTSxLQUFLLENBQUMsU0FDZjtRQUhtQixXQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ2pCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFQdEMsbUJBQWEsR0FBVyxFQUFFLENBQUM7UUFDM0IsNEJBQXNCLEdBQVksSUFBSSxDQUFDO1FBRU4saUJBQVcsR0FBRyxJQUFJLENBQUM7UUFDWixrQkFBWSxHQUFHLElBQUksQ0FBQzs7SUFLNUQsQ0FBQzs7OztJQUVELGdDQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7O0lBRUQsc0NBQWM7OztJQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDOzs7O0lBR0Qsa0NBQVU7OztJQURWO1FBRUksSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDOztnQkF4Q0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRTt3QkFDRixVQUFVLEVBQUUsSUFBSTt3QkFDaEIsZUFBZSxFQUFFLEVBQUU7cUJBQ3RCO29CQUNELFVBQVUsRUFBRTt3QkFDUixhQUFhO3FCQUNoQjtvQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7Ozs7Z0JBaEJtQixVQUFVO2dCQUdyQixRQUFROzs7OEJBbUJaLFdBQVcsU0FBQyxrQkFBa0I7K0JBQzlCLFdBQVcsU0FBQyx5QkFBeUI7NkJBaUJyQyxZQUFZLFNBQUMsT0FBTzs7SUFNekIsb0JBQUM7Q0FBQSxBQXpDRCxDQVltQyxrQkFBa0IsR0E2QnBEO1NBN0JZLGFBQWE7OztJQUV0QixzQ0FBMkI7O0lBQzNCLCtDQUF1Qzs7SUFFdkMsb0NBQW9EOztJQUNwRCxxQ0FBNEQ7Ozs7O0lBRWhELDhCQUF5Qjs7Ozs7SUFDekIsaUNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuaW1wb3J0IHsgbW9kYWxGYWRlTmdJZiB9IGZyb20gJy4vbW9kYWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1tb2RhbC1vdmVybGF5JyxcbiAgICB0ZW1wbGF0ZTogYGAsXG4gICAgaG9zdDoge1xuICAgICAgICAndGFiaW5kZXgnOiAnLTEnLFxuICAgICAgICAnW0Btb2RhbC1mYWRlXSc6ICcnXG4gICAgfSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIG1vZGFsRmFkZU5nSWZcbiAgICBdLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxCYWNrZHJvcCBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBiYWNrZHJvcENsYXNzOiBzdHJpbmcgPSAnJztcbiAgICBiYWNrZHJvcENsaWNrQ2xvc2VhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtb3ZlcmxheScpIG92ZXJsYXlNYWluID0gdHJ1ZTtcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW92ZXJsYXktLW1vZGFsJykgb3ZlcmxheU1vZGFsID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBtb2RhbFJlZjogTW9kYWxSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxSZWYpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZXRQcm9wZXJ0aWVzKCk7XG4gICAgfVxuXG4gICAgX3NldFByb3BlcnRpZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmJhY2tkcm9wQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KHRoaXMuYmFja2Ryb3BDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gICAgY2xvc2VNb2RhbCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3BDbGlja0Nsb3NlYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbFJlZi5kaXNtaXNzKCdiYWNrZHJvcCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19