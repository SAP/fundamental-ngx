/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalBackdrop } from '../modal-utils/modal-backdrop';
import { ModalContainer } from '../modal-utils/modal-container';
import { ModalConfig } from '../modal-utils/modal-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { ModalRef } from '../modal-utils/modal-ref';
/**
 * Service used to dynamically generate a modal.
 */
var ModalService = /** @class */ (function () {
    /** @hidden */
    function ModalService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.modals = [];
    }
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     */
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    ModalService.prototype.hasOpenModals = /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    function () {
        return this.modals && this.modals.length > 0;
    };
    /**
     * Dismisses all currently open modals.
     */
    /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    ModalService.prototype.dismissAll = /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    function () {
        var _this = this;
        this.modals.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.destroyModalComponent(item.modalRef);
        }));
    };
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param contentType Content of the modal component.
     * @param modalConfig Configuration of the modal component.
     */
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    ModalService.prototype.open = /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    function (contentType, modalConfig) {
        var _this = this;
        if (modalConfig === void 0) { modalConfig = new ModalConfig(); }
        // Get default values from model
        modalConfig = Object.assign(new ModalConfig(), modalConfig);
        // Instantiate modal ref service
        /** @type {?} */
        var service = new ModalRef();
        service.data = modalConfig.data;
        // Create Container
        /** @type {?} */
        var container = this.dynamicComponentService.createDynamicComponent(contentType, ModalContainer, modalConfig);
        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;
        // Create Backdrop
        /** @type {?} */
        var backdrop;
        if (modalConfig.hasBackdrop) {
            backdrop = this.dynamicComponentService.createDynamicComponent(contentType, ModalBackdrop, modalConfig, [service]);
        }
        // Create Component
        /** @type {?} */
        var component = this.dynamicComponentService.createDynamicComponent(contentType, ModalComponent, modalConfig, [service]);
        // Sizing
        this.setModalSize(component, modalConfig);
        // Positioning
        this.setModalPosition(component, modalConfig.position);
        this.modals.push({
            modalRef: component,
            containerRef: container,
            backdropRef: backdrop
        });
        /** @type {?} */
        var defaultBehaviourOnClose = (/**
         * @return {?}
         */
        function () {
            _this.destroyModalComponent(component);
            refSub.unsubscribe();
        });
        /** @type {?} */
        var refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);
        return service;
    };
    /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    ModalService.prototype.destroyModalComponent = /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    function (modal) {
        /** @type {?} */
        var arrayRef = this.modals.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.modalRef === modal; }));
        /** @type {?} */
        var indexOf = this.modals.indexOf(arrayRef);
        this.dynamicComponentService.destroyComponent(arrayRef.modalRef);
        this.dynamicComponentService.destroyComponent(arrayRef.containerRef);
        arrayRef.containerRef.destroy();
        arrayRef.modalRef.destroy();
        if (arrayRef.backdropRef) {
            this.dynamicComponentService.destroyComponent(arrayRef.backdropRef);
            arrayRef.backdropRef.destroy();
        }
        this.modals[indexOf] = null;
        this.modals = this.modals.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item !== null && item !== undefined; }));
    };
    /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    ModalService.prototype.setModalSize = /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    function (componentRef, configObj) {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    };
    /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    ModalService.prototype.setModalPosition = /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    function (componentRef, position) {
        if (position) {
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    };
    ModalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: DynamicComponentService, decorators: [{ type: Inject, args: [DynamicComponentService,] }] }
    ]; };
    return ModalService;
}());
export { ModalService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ModalService.prototype.modals;
    /**
     * @type {?}
     * @private
     */
    ModalService.prototype.dynamicComponentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC1zZXJ2aWNlL21vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxVQUFVLEVBR0csTUFBTSxFQUN0QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDbEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBS3BEO0lBUUksY0FBYztJQUNkLHNCQUM2Qyx1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVJyRixXQUFNLEdBSVIsRUFBRSxDQUFDO0lBS04sQ0FBQztJQUVKOzs7T0FHRzs7Ozs7O0lBQ0ksb0NBQWE7Ozs7O0lBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksaUNBQVU7Ozs7SUFBakI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsSUFBSTtZQUNwQixLQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSSwyQkFBSTs7Ozs7O0lBQVgsVUFBWSxXQUF5QyxFQUFFLFdBQTRDO1FBQW5HLGlCQW9EQztRQXBEc0QsNEJBQUEsRUFBQSxrQkFBK0IsV0FBVyxFQUFFO1FBRS9GLGdDQUFnQztRQUNoQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7WUFHdEQsT0FBTyxHQUFhLElBQUksUUFBUSxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQzs7O1lBRzFCLFNBQVMsR0FBaUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHNCQUFzQixDQUMzRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQztRQUdqRSw4REFBOEQ7UUFDOUQsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQzs7O1lBR3JELFFBQXFDO1FBQ3pDLElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUN6QixRQUFRLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHNCQUFzQixDQUN6RCxXQUFXLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQ3ZEO1NBQ0o7OztZQUdLLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQzdDLFdBQVcsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHNUUsU0FBUztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTFDLGNBQWM7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLFdBQVcsRUFBRSxRQUFRO1NBQ3hCLENBQUMsQ0FBQzs7WUFFRyx1QkFBdUI7OztRQUFHO1lBQzVCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFBOztZQUVLLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVzthQUM3QixTQUFTLENBQUMsdUJBQXVCLEVBQUUsdUJBQXVCLENBQUM7UUFHaEUsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRU8sNENBQXFCOzs7OztJQUE3QixVQUE4QixLQUFtQzs7WUFFdkQsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTs7OztRQUFDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQXZCLENBQXVCLEVBQUM7O1lBQzlELE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDN0MsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUU1QixJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwRSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO0lBRWxGLENBQUM7Ozs7Ozs7SUFFTyxtQ0FBWTs7Ozs7O0lBQXBCLFVBQXFCLFlBQTBDLEVBQUUsU0FBc0I7UUFDbkYsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3hFLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUMxRSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDeEUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQzFFLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNsRSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7SUFDeEUsQ0FBQzs7Ozs7OztJQUVPLHVDQUFnQjs7Ozs7O0lBQXhCLFVBQXlCLFlBQTBDLEVBQUUsUUFBdUI7UUFDeEYsSUFBSSxRQUFRLEVBQUU7WUFDVixZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDN0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ25FLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNqRSxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7U0FDbEU7SUFDTCxDQUFDOztnQkE1SEosVUFBVTs7OztnQkFORix1QkFBdUIsdUJBZ0J2QixNQUFNLFNBQUMsdUJBQXVCOztJQW1IdkMsbUJBQUM7Q0FBQSxBQTdIRCxJQTZIQztTQTVIWSxZQUFZOzs7Ozs7SUFDckIsOEJBSVM7Ozs7O0lBSUwsK0NBQXlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBJbmplY3RhYmxlLFxuICAgIENvbXBvbmVudFJlZixcbiAgICBUeXBlLFxuICAgIFRlbXBsYXRlUmVmLCBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEJhY2tkcm9wIH0gZnJvbSAnLi4vbW9kYWwtdXRpbHMvbW9kYWwtYmFja2Ryb3AnO1xuaW1wb3J0IHsgTW9kYWxDb250YWluZXIgfSBmcm9tICcuLi9tb2RhbC11dGlscy9tb2RhbC1jb250YWluZXInO1xuaW1wb3J0IHsgTW9kYWxDb25maWcgfSBmcm9tICcuLi9tb2RhbC11dGlscy9tb2RhbC1jb25maWcnO1xuaW1wb3J0IHsgTW9kYWxQb3NpdGlvbiB9IGZyb20gJy4uL21vZGFsLXV0aWxzL21vZGFsLXBvc2l0aW9uJztcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvZHluYW1pYy1jb21wb25lbnQvZHluYW1pYy1jb21wb25lbnQuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbFJlZiB9IGZyb20gJy4uL21vZGFsLXV0aWxzL21vZGFsLXJlZic7XG5cbi8qKlxuICogU2VydmljZSB1c2VkIHRvIGR5bmFtaWNhbGx5IGdlbmVyYXRlIGEgbW9kYWwuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNb2RhbFNlcnZpY2Uge1xuICAgIHByaXZhdGUgbW9kYWxzOiB7XG4gICAgICAgIG1vZGFsUmVmOiBDb21wb25lbnRSZWY8TW9kYWxDb21wb25lbnQ+LFxuICAgICAgICBiYWNrZHJvcFJlZj86IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wPixcbiAgICAgICAgY29udGFpbmVyUmVmPzogQ29tcG9uZW50UmVmPE1vZGFsQ29udGFpbmVyPlxuICAgIH1bXSA9IFtdO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgQEluamVjdChEeW5hbWljQ29tcG9uZW50U2VydmljZSkgcHJpdmF0ZSBkeW5hbWljQ29tcG9uZW50U2VydmljZTogRHluYW1pY0NvbXBvbmVudFNlcnZpY2VcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBTdGF0dXMgb2YgdGhlIG1vZGFsIHNlcnZpY2UuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBvcGVuIG1vZGFscywgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNPcGVuTW9kYWxzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbHMgJiYgdGhpcy5tb2RhbHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNtaXNzZXMgYWxsIGN1cnJlbnRseSBvcGVuIG1vZGFscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzbWlzc0FsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2RhbHMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveU1vZGFsQ29tcG9uZW50KGl0ZW0ubW9kYWxSZWYpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhIG1vZGFsIGNvbXBvbmVudCB3aXRoIGEgY29udGVudCBvZiB0eXBlIFRlbXBsYXRlUmVmIG9yIGEgY29tcG9uZW50IHR5cGUuXG4gICAgICogQHBhcmFtIGNvbnRlbnRUeXBlIENvbnRlbnQgb2YgdGhlIG1vZGFsIGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gbW9kYWxDb25maWcgQ29uZmlndXJhdGlvbiBvZiB0aGUgbW9kYWwgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuKGNvbnRlbnRUeXBlOiBUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+LCBtb2RhbENvbmZpZzogTW9kYWxDb25maWcgPSBuZXcgTW9kYWxDb25maWcoKSk6IE1vZGFsUmVmIHtcblxuICAgICAgICAvLyBHZXQgZGVmYXVsdCB2YWx1ZXMgZnJvbSBtb2RlbFxuICAgICAgICBtb2RhbENvbmZpZyA9IE9iamVjdC5hc3NpZ24obmV3IE1vZGFsQ29uZmlnKCksIG1vZGFsQ29uZmlnKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBtb2RhbCByZWYgc2VydmljZVxuICAgICAgICBjb25zdCBzZXJ2aWNlOiBNb2RhbFJlZiA9IG5ldyBNb2RhbFJlZigpO1xuICAgICAgICBzZXJ2aWNlLmRhdGEgPSBtb2RhbENvbmZpZy5kYXRhO1xuXG4gICAgICAgIC8vIENyZWF0ZSBDb250YWluZXJcbiAgICAgICAgY29uc3QgY29udGFpbmVyOiBDb21wb25lbnRSZWY8TW9kYWxDb250YWluZXI+ID0gdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVEeW5hbWljQ29tcG9uZW50XG4gICAgICAgICAgICA8IE1vZGFsQ29udGFpbmVyID4gKGNvbnRlbnRUeXBlLCBNb2RhbENvbnRhaW5lciwgbW9kYWxDb25maWcpXG4gICAgICAgIDtcblxuICAgICAgICAvLyBEZWZpbmUgQ29udGFpbmVyIHRvIHB1dCBiYWNrZHJvcCBhbmQgY29tcG9uZW50IHRvIGNvbnRhaW5lclxuICAgICAgICBtb2RhbENvbmZpZy5jb250YWluZXIgPSBjb250YWluZXIubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBDcmVhdGUgQmFja2Ryb3BcbiAgICAgICAgbGV0IGJhY2tkcm9wOiBDb21wb25lbnRSZWY8TW9kYWxCYWNrZHJvcD47XG4gICAgICAgIGlmIChtb2RhbENvbmZpZy5oYXNCYWNrZHJvcCkge1xuICAgICAgICAgICAgYmFja2Ryb3AgPSB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZUR5bmFtaWNDb21wb25lbnQ8TW9kYWxCYWNrZHJvcD5cbiAgICAgICAgICAgICAgICAoY29udGVudFR5cGUsIE1vZGFsQmFja2Ryb3AsIG1vZGFsQ29uZmlnLCBbc2VydmljZV0pXG4gICAgICAgICAgICA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgQ29tcG9uZW50XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlRHluYW1pY0NvbXBvbmVudFxuICAgICAgICAgICAgPCBNb2RhbENvbXBvbmVudCA+IChjb250ZW50VHlwZSwgTW9kYWxDb21wb25lbnQsIG1vZGFsQ29uZmlnLCBbc2VydmljZV0pXG4gICAgICAgIDtcblxuICAgICAgICAvLyBTaXppbmdcbiAgICAgICAgdGhpcy5zZXRNb2RhbFNpemUoY29tcG9uZW50LCBtb2RhbENvbmZpZyk7XG5cbiAgICAgICAgLy8gUG9zaXRpb25pbmdcbiAgICAgICAgdGhpcy5zZXRNb2RhbFBvc2l0aW9uKGNvbXBvbmVudCwgbW9kYWxDb25maWcucG9zaXRpb24pO1xuXG4gICAgICAgIHRoaXMubW9kYWxzLnB1c2goe1xuICAgICAgICAgICAgbW9kYWxSZWY6IGNvbXBvbmVudCxcbiAgICAgICAgICAgIGNvbnRhaW5lclJlZjogY29udGFpbmVyLFxuICAgICAgICAgICAgYmFja2Ryb3BSZWY6IGJhY2tkcm9wXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGRlZmF1bHRCZWhhdmlvdXJPbkNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95TW9kYWxDb21wb25lbnQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJlZlN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlZlN1YiA9IHNlcnZpY2UuYWZ0ZXJDbG9zZWRcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGVmYXVsdEJlaGF2aW91ck9uQ2xvc2UsIGRlZmF1bHRCZWhhdmlvdXJPbkNsb3NlKVxuICAgICAgICA7XG5cbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95TW9kYWxDb21wb25lbnQobW9kYWw6IENvbXBvbmVudFJlZjxNb2RhbENvbXBvbmVudD4pOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBhcnJheVJlZiA9IHRoaXMubW9kYWxzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubW9kYWxSZWYgPT09IG1vZGFsKTtcbiAgICAgICAgY29uc3QgaW5kZXhPZiA9IHRoaXMubW9kYWxzLmluZGV4T2YoYXJyYXlSZWYpO1xuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmRlc3Ryb3lDb21wb25lbnQoYXJyYXlSZWYubW9kYWxSZWYpO1xuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmRlc3Ryb3lDb21wb25lbnQoYXJyYXlSZWYuY29udGFpbmVyUmVmKTtcbiAgICAgICAgYXJyYXlSZWYuY29udGFpbmVyUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgYXJyYXlSZWYubW9kYWxSZWYuZGVzdHJveSgpO1xuXG4gICAgICAgIGlmIChhcnJheVJlZi5iYWNrZHJvcFJlZikge1xuICAgICAgICAgICAgdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5kZXN0cm95Q29tcG9uZW50KGFycmF5UmVmLmJhY2tkcm9wUmVmKTtcbiAgICAgICAgICAgIGFycmF5UmVmLmJhY2tkcm9wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW9kYWxzW2luZGV4T2ZdID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb2RhbHMgPSB0aGlzLm1vZGFscy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBudWxsICYmIGl0ZW0gIT09IHVuZGVmaW5lZCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE1vZGFsU2l6ZShjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxNb2RhbENvbXBvbmVudD4sIGNvbmZpZ09iajogTW9kYWxDb25maWcpOiB2b2lkIHtcbiAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWluV2lkdGggPSBjb25maWdPYmoubWluV2lkdGg7XG4gICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLm1pbkhlaWdodCA9IGNvbmZpZ09iai5taW5IZWlnaHQ7XG4gICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLm1heFdpZHRoID0gY29uZmlnT2JqLm1heFdpZHRoO1xuICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBjb25maWdPYmoubWF4SGVpZ2h0O1xuICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IGNvbmZpZ09iai53aWR0aDtcbiAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY29uZmlnT2JqLmhlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldE1vZGFsUG9zaXRpb24oY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TW9kYWxDb21wb25lbnQ+LCBwb3NpdGlvbjogTW9kYWxQb3NpdGlvbik6IHZvaWQge1xuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IHBvc2l0aW9uLnRvcDtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLmJvdHRvbSA9IHBvc2l0aW9uLmJvdHRvbTtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0ID0gcG9zaXRpb24ucmlnaHQ7XG4gICAgICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gcG9zaXRpb24ubGVmdDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==