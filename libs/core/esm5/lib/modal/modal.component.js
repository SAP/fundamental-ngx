/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, HostListener, Optional, TemplateRef, Type, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { modalFadeNgIf } from './modal-utils/modal-animations';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
import focusTrap from 'focus-trap';
import { ModalRef } from './modal-utils/modal-ref';
var ModalComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ModalComponent, _super);
    function ModalComponent(elRef, componentFactoryResolver, cdRef, modalRef) {
        var _this = _super.call(this, elRef) || this;
        _this.elRef = elRef;
        _this.componentFactoryResolver = componentFactoryResolver;
        _this.cdRef = cdRef;
        _this.modalRef = modalRef;
        _this.escKeyCloseable = true;
        _this.focusTrapped = true;
        _this.ariaLabelledBy = null;
        _this.ariaLabel = null;
        _this.ariaDescribedBy = null;
        _this.backdropClickCloseable = true;
        _this.hasBackdrop = true;
        _this.modalPanelClass = '';
        return _this;
    }
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._setProperties();
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.focusTrap) {
            this.focusTrap.deactivate();
        }
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.childComponentType) {
            if (this.childComponentType instanceof Type) {
                this.loadFromComponent(this.childComponentType);
            }
            else if (this.childComponentType instanceof TemplateRef) {
                this.loadFromTemplate(this.childComponentType);
            }
        }
        if (this.focusTrapped) {
            try {
                this.focusTrap = focusTrap(this.elRef.nativeElement, {
                    clickOutsideDeactivates: this.backdropClickCloseable && this.hasBackdrop,
                    escapeDeactivates: false,
                    initialFocus: this.elRef.nativeElement
                });
                this.focusTrap.activate();
            }
            catch (e) {
                console.warn('Attempted to focus trap the modal, but no tabbable elements were found.');
            }
        }
        this.cdRef.detectChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ModalComponent.prototype.closeModalEsc = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.escKeyCloseable && event.key === 'Escape') {
            this.modalRef.dismiss('escape');
        }
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    ModalComponent.prototype.loadFromComponent = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.containerRef.clear();
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.componentRef = this.containerRef.createComponent(componentFactory);
    };
    /**
     * @private
     * @param {?} content
     * @return {?}
     */
    ModalComponent.prototype.loadFromTemplate = /**
     * @private
     * @param {?} content
     * @return {?}
     */
    function (content) {
        this.containerRef.clear();
        /** @type {?} */
        var context = {
            $implicit: this.modalRef
        };
        this.componentRef = this.containerRef.createEmbeddedView(content, context);
    };
    /**
     * @return {?}
     */
    ModalComponent.prototype._setProperties = /**
     * @return {?}
     */
    function () {
        if (this.modalPanelClass) {
            this._addClassToElement(this.modalPanelClass);
        }
    };
    ModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal',
                    template: "<div class=\"fd-modal__content fd-modal__content--overrides\" role=\"document\">\n    <ng-content select=\"fd-modal-header\"></ng-content>\n    <ng-content select=\"fd-modal-body\"></ng-content>\n    <ng-content select=\"fd-modal-footer\"></ng-content>\n    <ng-container #vc></ng-container>\n    <ng-content></ng-content>\n</div>\n",
                    host: {
                        'role': 'dialog',
                        '[class.fd-modal]': 'true',
                        '[class.fd-modal-custom]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-label]': 'ariaLabel',
                        '[attr.aria-describedby]': 'ariaDescribedBy',
                        '[attr.aria-modal]': 'true',
                        '[attr.id]': 'id',
                        'tabindex': '-1',
                        '[@modal-fade]': ''
                    },
                    animations: [
                        modalFadeNgIf
                    ],
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-modal-custom{max-width:none;z-index:1000;position:absolute}.fd-modal-custom:focus{outline:0}.fd-modal__content--overrides{height:100%;width:100%;min-height:inherit;min-width:inherit;max-height:inherit;max-width:inherit;display:flex;flex-direction:column}"]
                }] }
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: ChangeDetectorRef },
        { type: ModalRef, decorators: [{ type: Optional }] }
    ]; };
    ModalComponent.propDecorators = {
        containerRef: [{ type: ViewChild, args: ['vc', { read: ViewContainerRef },] }],
        closeModalEsc: [{ type: HostListener, args: ['keyup', ['$event'],] }]
    };
    return ModalComponent;
}(AbstractFdNgxClass));
export { ModalComponent };
if (false) {
    /** @type {?} */
    ModalComponent.prototype.containerRef;
    /** @type {?} */
    ModalComponent.prototype.id;
    /** @type {?} */
    ModalComponent.prototype.escKeyCloseable;
    /** @type {?} */
    ModalComponent.prototype.focusTrapped;
    /** @type {?} */
    ModalComponent.prototype.ariaLabelledBy;
    /** @type {?} */
    ModalComponent.prototype.ariaLabel;
    /** @type {?} */
    ModalComponent.prototype.ariaDescribedBy;
    /** @type {?} */
    ModalComponent.prototype.childComponentType;
    /** @type {?} */
    ModalComponent.prototype.backdropClickCloseable;
    /** @type {?} */
    ModalComponent.prototype.hasBackdrop;
    /** @type {?} */
    ModalComponent.prototype.modalPanelClass;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.componentRef;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.focusTrap;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.cdRef;
    /**
     * @type {?}
     * @private
     */
    ModalComponent.prototype.modalRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGFsL21vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFFSCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULHdCQUF3QixFQUV4QixVQUFVLEVBRVYsWUFBWSxFQUdaLFFBQVEsRUFDUixXQUFXLEVBQ1gsSUFBSSxFQUNKLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRW5EO0lBcUJvQywwQ0FBa0I7SUE2QmxELHdCQUFvQixLQUFpQixFQUNqQix3QkFBa0QsRUFDbEQsS0FBd0IsRUFDWixRQUFrQjtRQUhsRCxZQUlJLGtCQUFNLEtBQUssQ0FBQyxTQUNmO1FBTG1CLFdBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsOEJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNaLGNBQVEsR0FBUixRQUFRLENBQVU7UUF6QmxELHFCQUFlLEdBQVksSUFBSSxDQUFDO1FBRWhDLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLG9CQUFjLEdBQVcsSUFBSSxDQUFDO1FBRTlCLGVBQVMsR0FBVyxJQUFJLENBQUM7UUFFekIscUJBQWUsR0FBVyxJQUFJLENBQUM7UUFJL0IsNEJBQXNCLEdBQVksSUFBSSxDQUFDO1FBRXZDLGlCQUFXLEdBQWEsSUFBSSxDQUFDO1FBRTdCLHFCQUFlLEdBQVcsRUFBRSxD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aEMseUJBQXlCLEVBQUUsaUJBQWlCO3dCQUM1QyxtQkFBbUIsRUFBRSxNQUFNO3dCQUMzQixXQUFXLEVBQUUsSUFBSTt3QkFDakIsVUFBVSxFQUFFLElBQUk7d0JBQ2hCLGVBQWUsRUFBRSxFQUFFO3FCQUN0QjtvQkFDRCxVQUFVLEVBQUU7d0JBQ1IsYUFBYTtxQkFDaEI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN4Qzs7OztnQkFyQ0csVUFBVTtnQkFGVix3QkFBd0I7Z0JBRnhCLGlCQUFpQjtnQkFtQlosUUFBUSx1QkF1REEsUUFBUTs7OytCQTlCcEIsU0FBUyxTQUFDLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQztnQ0FtRXhDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBMEJyQyxxQkFBQztDQUFBLEFBcEhELENBcUJvQyxrQkFBa0IsR0ErRnJEO1NBL0ZZLGNBQWM7OztJQUV2QixzQ0FDK0I7O0lBRS9CLDRCQUFXOztJQUVYLHlDQUFnQzs7SUFFaEMsc0NBQTZCOztJQUU3Qix3Q0FBOEI7O0lBRTlCLG1DQUF5Qjs7SUFFekIseUNBQStCOztJQUUvQiw0Q0FBaUQ7O0lBRWpELGdEQUF1Qzs7SUFFdkMscUNBQTZCOztJQUU3Qix5Q0FBNkI7Ozs7O0lBRTdCLHNDQUErRDs7Ozs7SUFFL0QsbUNBQXVCOzs7OztJQUVYLCtCQUF5Qjs7Ozs7SUFDekIsa0RBQTBEOzs7OztJQUMxRCwrQkFBZ0M7Ozs7O0lBQ2hDLGtDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBDb21wb25lbnQsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBFbGVtZW50UmVmLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBUZW1wbGF0ZVJlZixcbiAgICBUeXBlLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3Q29udGFpbmVyUmVmLFxuICAgIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbW9kYWxGYWRlTmdJZiB9IGZyb20gJy4vbW9kYWwtdXRpbHMvbW9kYWwtYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuaW1wb3J0IGZvY3VzVHJhcCBmcm9tICdmb2N1cy10cmFwJztcbmltcG9ydCB7IE1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC11dGlscy9tb2RhbC1yZWYnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW1vZGFsJyxcbiAgICBzdHlsZVVybHM6IFsnbW9kYWwuY29tcG9uZW50LnNjc3MnXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3JvbGUnOiAnZGlhbG9nJyxcbiAgICAgICAgJ1tjbGFzcy5mZC1tb2RhbF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MuZmQtbW9kYWwtY3VzdG9tXSc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxsZWRieV0nOiAnYXJpYUxhYmVsbGVkQnknLFxuICAgICAgICAnW2F0dHIuYXJpYS1sYWJlbF0nOiAnYXJpYUxhYmVsJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2FyaWFEZXNjcmliZWRCeScsXG4gICAgICAgICdbYXR0ci5hcmlhLW1vZGFsXSc6ICd0cnVlJyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCcsXG4gICAgICAgICd0YWJpbmRleCc6ICctMScsXG4gICAgICAgICdbQG1vZGFsLWZhZGVdJzogJydcbiAgICB9LFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgbW9kYWxGYWRlTmdJZlxuICAgIF0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBWaWV3Q2hpbGQoJ3ZjJywge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KVxuICAgIGNvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICAgIGlkOiBzdHJpbmc7XG5cbiAgICBlc2NLZXlDbG9zZWFibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZm9jdXNUcmFwcGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgYXJpYUxhYmVsOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgYXJpYURlc2NyaWJlZEJ5OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgY2hpbGRDb21wb25lbnRUeXBlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuXG4gICAgYmFja2Ryb3BDbGlja0Nsb3NlYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBoYXNCYWNrZHJvcDogYm9vbGVhbiAgPSB0cnVlO1xuXG4gICAgbW9kYWxQYW5lbENsYXNzOiBzdHJpbmcgPSAnJztcblxuICAgIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55PiB8IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuXG4gICAgcHJpdmF0ZSBmb2N1c1RyYXA6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIG1vZGFsUmVmOiBNb2RhbFJlZikge1xuICAgICAgICBzdXBlcihlbFJlZik7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NldFByb3BlcnRpZXMoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVHJhcC5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRDb21wb25lbnRUeXBlIGluc3RhbmNlb2YgVHlwZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZEZyb21Db21wb25lbnQodGhpcy5jaGlsZENvbXBvbmVudFR5cGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoaWxkQ29tcG9uZW50VHlwZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkRnJvbVRlbXBsYXRlKHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5mb2N1c1RyYXBwZWQpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c1RyYXAgPSBmb2N1c1RyYXAodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LCB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrT3V0c2lkZURlYWN0aXZhdGVzOiB0aGlzLmJhY2tkcm9wQ2xpY2tDbG9zZWFibGUgJiYgdGhpcy5oYXNCYWNrZHJvcCxcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlRGVhY3RpdmF0ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBpbml0aWFsRm9jdXM6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNUcmFwLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdBdHRlbXB0ZWQgdG8gZm9jdXMgdHJhcCB0aGUgbW9kYWwsIGJ1dCBubyB0YWJiYWJsZSBlbGVtZW50cyB3ZXJlIGZvdW5kLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleXVwJywgWyckZXZlbnQnXSlcbiAgICBjbG9zZU1vZGFsRXNjKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVzY0tleUNsb3NlYWJsZSAmJiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsUmVmLmRpc21pc3MoJ2VzY2FwZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkRnJvbUNvbXBvbmVudChjb250ZW50OiBUeXBlPGFueT4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJSZWYuY2xlYXIoKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbnRlbnQpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMuY29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRGcm9tVGVtcGxhdGUoY29udGVudDogVGVtcGxhdGVSZWY8YW55Pik6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRhaW5lclJlZi5jbGVhcigpO1xuICAgICAgICBjb25zdCBjb250ZXh0ID0ge1xuICAgICAgICAgICAgJGltcGxpY2l0OiB0aGlzLm1vZGFsUmVmXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy5jb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbnRlbnQsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIF9zZXRQcm9wZXJ0aWVzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RhbFBhbmVsQ2xhc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KHRoaXMubW9kYWxQYW5lbENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==