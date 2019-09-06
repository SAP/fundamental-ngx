/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
import { modalFadeNgIf } from './modal-animations';
import { ModalRef } from './modal-ref';
export class ModalBackdrop extends AbstractFdNgxClass {
    /**
     * @param {?} elRef
     * @param {?} modalRef
     */
    constructor(elRef, modalRef) {
        super(elRef);
        this.elRef = elRef;
        this.modalRef = modalRef;
        this.backdropClass = '';
        this.backdropClickCloseable = true;
        this.overlayMain = true;
        this.overlayModal = true;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._setProperties();
    }
    /**
     * @return {?}
     */
    _setProperties() {
        if (this.backdropClass) {
            this._addClassToElement(this.backdropClass);
        }
    }
    /**
     * @return {?}
     */
    closeModal() {
        if (this.backdropClickCloseable) {
            this.modalRef.dismiss('backdrop');
        }
    }
}
ModalBackdrop.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-overlay',
                template: ``,
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
ModalBackdrop.ctorParameters = () => [
    { type: ElementRef },
    { type: ModalRef }
];
ModalBackdrop.propDecorators = {
    overlayMain: [{ type: HostBinding, args: ['class.fd-overlay',] }],
    overlayModal: [{ type: HostBinding, args: ['class.fd-overlay--modal',] }],
    closeModal: [{ type: HostListener, args: ['click',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kYWwvbW9kYWwtdXRpbHMvbW9kYWwtYmFja2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFjdkMsTUFBTSxPQUFPLGFBQWMsU0FBUSxrQkFBa0I7Ozs7O0lBUWpELFlBQW9CLEtBQWlCLEVBQ2pCLFFBQWtCO1FBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUZHLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVB0QyxrQkFBYSxHQUFXLEVBQUUsQ0FBQztRQUMzQiwyQkFBc0IsR0FBWSxJQUFJLENBQUM7UUFFTixnQkFBVyxHQUFHLElBQUksQ0FBQztRQUNaLGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBSzVELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDOzs7O0lBR0QsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQzs7O1lBeENKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUU7b0JBQ0YsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLGVBQWUsRUFBRSxFQUFFO2lCQUN0QjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1IsYUFBYTtpQkFDaEI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7Ozs7WUFoQm1CLFVBQVU7WUFHckIsUUFBUTs7OzBCQW1CWixXQUFXLFNBQUMsa0JBQWtCOzJCQUM5QixXQUFXLFNBQUMseUJBQXlCO3lCQWlCckMsWUFBWSxTQUFDLE9BQU87Ozs7SUFyQnJCLHNDQUEyQjs7SUFDM0IsK0NBQXVDOztJQUV2QyxvQ0FBb0Q7O0lBQ3BELHFDQUE0RDs7Ozs7SUFFaEQsOEJBQXlCOzs7OztJQUN6QixpQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5pbXBvcnQgeyBtb2RhbEZhZGVOZ0lmIH0gZnJvbSAnLi9tb2RhbC1hbmltYXRpb25zJztcbmltcG9ydCB7IE1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW1vZGFsLW92ZXJsYXknLFxuICAgIHRlbXBsYXRlOiBgYCxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICdbQG1vZGFsLWZhZGVdJzogJydcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbW9kYWxGYWRlTmdJZlxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEJhY2tkcm9wIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGJhY2tkcm9wQ2xhc3M6IHN0cmluZyA9ICcnO1xuICAgIGJhY2tkcm9wQ2xpY2tDbG9zZWFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1vdmVybGF5Jykgb3ZlcmxheU1haW4gPSB0cnVlO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtb3ZlcmxheS0tbW9kYWwnKSBvdmVybGF5TW9kYWwgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZikge1xuICAgICAgICBzdXBlcihlbFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICBfc2V0UHJvcGVydGllcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYmFja2Ryb3BDbGFzcykge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQodGhpcy5iYWNrZHJvcENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICBjbG9zZU1vZGFsKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5iYWNrZHJvcENsaWNrQ2xvc2VhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmLmRpc21pc3MoJ2JhY2tkcm9wJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=