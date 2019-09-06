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
export class ModalService {
    /**
     * @hidden
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.modals = [];
    }
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     * @return {?}
     */
    hasOpenModals() {
        return this.modals && this.modals.length > 0;
    }
    /**
     * Dismisses all currently open modals.
     * @return {?}
     */
    dismissAll() {
        this.modals.forEach((/**
         * @param {?} item
         * @return {?}
         */
        item => {
            this.destroyModalComponent(item.modalRef);
        }));
    }
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param {?} contentType Content of the modal component.
     * @param {?=} modalConfig Configuration of the modal component.
     * @return {?}
     */
    open(contentType, modalConfig = new ModalConfig()) {
        // Get default values from model
        modalConfig = Object.assign(new ModalConfig(), modalConfig);
        // Instantiate modal ref service
        /** @type {?} */
        const service = new ModalRef();
        service.data = modalConfig.data;
        // Create Container
        /** @type {?} */
        const container = this.dynamicComponentService.createDynamicComponent(contentType, ModalContainer, modalConfig);
        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;
        // Create Backdrop
        /** @type {?} */
        let backdrop;
        if (modalConfig.hasBackdrop) {
            backdrop = this.dynamicComponentService.createDynamicComponent(contentType, ModalBackdrop, modalConfig, [service]);
        }
        // Create Component
        /** @type {?} */
        const component = this.dynamicComponentService.createDynamicComponent(contentType, ModalComponent, modalConfig, [service]);
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
        const defaultBehaviourOnClose = (/**
         * @return {?}
         */
        () => {
            this.destroyModalComponent(component);
            refSub.unsubscribe();
        });
        /** @type {?} */
        const refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);
        return service;
    }
    /**
     * @private
     * @param {?} modal
     * @return {?}
     */
    destroyModalComponent(modal) {
        /** @type {?} */
        const arrayRef = this.modals.find((/**
         * @param {?} item
         * @return {?}
         */
        (item) => item.modalRef === modal));
        /** @type {?} */
        const indexOf = this.modals.indexOf(arrayRef);
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
        item => item !== null && item !== undefined));
    }
    /**
     * @private
     * @param {?} componentRef
     * @param {?} configObj
     * @return {?}
     */
    setModalSize(componentRef, configObj) {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    }
    /**
     * @private
     * @param {?} componentRef
     * @param {?} position
     * @return {?}
     */
    setModalPosition(componentRef, position) {
        if (position) {
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    }
}
ModalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ModalService.ctorParameters = () => [
    { type: DynamicComponentService, decorators: [{ type: Inject, args: [DynamicComponentService,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC1zZXJ2aWNlL21vZGFsLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxVQUFVLEVBR0csTUFBTSxFQUN0QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFMUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDbEcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7O0FBTXBELE1BQU0sT0FBTyxZQUFZOzs7OztJQVFyQixZQUM2Qyx1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQVJyRixXQUFNLEdBSVIsRUFBRSxDQUFDO0lBS04sQ0FBQzs7Ozs7O0lBTUcsYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBS00sVUFBVTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7O0lBT00sSUFBSSxDQUFDLFdBQXlDLEVBQUUsY0FBMkIsSUFBSSxXQUFXLEVBQUU7UUFFL0YsZ0NB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QUF1Qjs7Ozs7OztJQVJuQyw4QkFJUzs7Ozs7SUFJTCwrQ0FBeUYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdGFibGUsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIFR5cGUsXG4gICAgVGVtcGxhdGVSZWYsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsQmFja2Ryb3AgfSBmcm9tICcuLi9tb2RhbC11dGlscy9tb2RhbC1iYWNrZHJvcCc7XG5pbXBvcnQgeyBNb2RhbENvbnRhaW5lciB9IGZyb20gJy4uL21vZGFsLXV0aWxzL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgeyBNb2RhbENvbmZpZyB9IGZyb20gJy4uL21vZGFsLXV0aWxzL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQgeyBNb2RhbFBvc2l0aW9uIH0gZnJvbSAnLi4vbW9kYWwtdXRpbHMvbW9kYWwtcG9zaXRpb24nO1xuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IE1vZGFsUmVmIH0gZnJvbSAnLi4vbW9kYWwtdXRpbHMvbW9kYWwtcmVmJztcblxuLyoqXG4gKiBTZXJ2aWNlIHVzZWQgdG8gZHluYW1pY2FsbHkgZ2VuZXJhdGUgYSBtb2RhbC5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1vZGFsU2VydmljZSB7XG4gICAgcHJpdmF0ZSBtb2RhbHM6IHtcbiAgICAgICAgbW9kYWxSZWY6IENvbXBvbmVudFJlZjxNb2RhbENvbXBvbmVudD4sXG4gICAgICAgIGJhY2tkcm9wUmVmPzogQ29tcG9uZW50UmVmPE1vZGFsQmFja2Ryb3A+LFxuICAgICAgICBjb250YWluZXJSZWY/OiBDb21wb25lbnRSZWY8TW9kYWxDb250YWluZXI+XG4gICAgfVtdID0gW107XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KER5bmFtaWNDb21wb25lbnRTZXJ2aWNlKSBwcml2YXRlIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZVxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIFN0YXR1cyBvZiB0aGUgbW9kYWwgc2VydmljZS5cbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG9wZW4gbW9kYWxzLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgcHVibGljIGhhc09wZW5Nb2RhbHMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFscyAmJiB0aGlzLm1vZGFscy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc21pc3NlcyBhbGwgY3VycmVudGx5IG9wZW4gbW9kYWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBkaXNtaXNzQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vZGFscy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95TW9kYWxDb21wb25lbnQoaXRlbS5tb2RhbFJlZik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wZW5zIGEgbW9kYWwgY29tcG9uZW50IHdpdGggYSBjb250ZW50IG9mIHR5cGUgVGVtcGxhdGVSZWYgb3IgYSBjb21wb25lbnQgdHlwZS5cbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGUgQ29udGVudCBvZiB0aGUgbW9kYWwgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBtb2RhbENvbmZpZyBDb25maWd1cmF0aW9uIG9mIHRoZSBtb2RhbCBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIG9wZW4oY29udGVudFR5cGU6IFR5cGU8YW55PiB8IFRlbXBsYXRlUmVmPGFueT4sIG1vZGFsQ29uZmlnOiBNb2RhbENvbmZpZyA9IG5ldyBNb2RhbENvbmZpZygpKTogTW9kYWxSZWYge1xuXG4gICAgICAgIC8vIEdldCBkZWZhdWx0IHZhbHVlcyBmcm9tIG1vZGVsXG4gICAgICAgIG1vZGFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbihuZXcgTW9kYWxDb25maWcoKSwgbW9kYWxDb25maWcpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIG1vZGFsIHJlZiBzZXJ2aWNlXG4gICAgICAgIGNvbnN0IHNlcnZpY2U6IE1vZGFsUmVmID0gbmV3IE1vZGFsUmVmKCk7XG4gICAgICAgIHNlcnZpY2UuZGF0YSA9IG1vZGFsQ29uZmlnLmRhdGE7XG5cbiAgICAgICAgLy8gQ3JlYXRlIENvbnRhaW5lclxuICAgICAgICBjb25zdCBjb250YWluZXI6IENvbXBvbmVudFJlZjxNb2RhbENvbnRhaW5lcj4gPSB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmNyZWF0ZUR5bmFtaWNDb21wb25lbnRcbiAgICAgICAgICAgIDwgTW9kYWxDb250YWluZXIgPiAoY29udGVudFR5cGUsIE1vZGFsQ29udGFpbmVyLCBtb2RhbENvbmZpZylcbiAgICAgICAgO1xuXG4gICAgICAgIC8vIERlZmluZSBDb250YWluZXIgdG8gcHV0IGJhY2tkcm9wIGFuZCBjb21wb25lbnQgdG8gY29udGFpbmVyXG4gICAgICAgIG1vZGFsQ29uZmlnLmNvbnRhaW5lciA9IGNvbnRhaW5lci5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIENyZWF0ZSBCYWNrZHJvcFxuICAgICAgICBsZXQgYmFja2Ryb3A6IENvbXBvbmVudFJlZjxNb2RhbEJhY2tkcm9wPjtcbiAgICAgICAgaWYgKG1vZGFsQ29uZmlnLmhhc0JhY2tkcm9wKSB7XG4gICAgICAgICAgICBiYWNrZHJvcCA9IHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlRHluYW1pY0NvbXBvbmVudDxNb2RhbEJhY2tkcm9wPlxuICAgICAgICAgICAgICAgIChjb250ZW50VHlwZSwgTW9kYWxCYWNrZHJvcCwgbW9kYWxDb25maWcsIFtzZXJ2aWNlXSlcbiAgICAgICAgICAgIDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBDb21wb25lbnRcbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVEeW5hbWljQ29tcG9uZW50XG4gICAgICAgICAgICA8IE1vZGFsQ29tcG9uZW50ID4gKGNvbnRlbnRUeXBlLCBNb2RhbENvbXBvbmVudCwgbW9kYWxDb25maWcsIFtzZXJ2aWNlXSlcbiAgICAgICAgO1xuXG4gICAgICAgIC8vIFNpemluZ1xuICAgICAgICB0aGlzLnNldE1vZGFsU2l6ZShjb21wb25lbnQsIG1vZGFsQ29uZmlnKTtcblxuICAgICAgICAvLyBQb3NpdGlvbmluZ1xuICAgICAgICB0aGlzLnNldE1vZGFsUG9zaXRpb24oY29tcG9uZW50LCBtb2RhbENvbmZpZy5wb3NpdGlvbik7XG5cbiAgICAgICAgdGhpcy5tb2RhbHMucHVzaCh7XG4gICAgICAgICAgICBtb2RhbFJlZjogY29tcG9uZW50LFxuICAgICAgICAgICAgY29udGFpbmVyUmVmOiBjb250YWluZXIsXG4gICAgICAgICAgICBiYWNrZHJvcFJlZjogYmFja2Ryb3BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGVmYXVsdEJlaGF2aW91ck9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lNb2RhbENvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgcmVmU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVmU3ViID0gc2VydmljZS5hZnRlckNsb3NlZFxuICAgICAgICAgICAgLnN1YnNjcmliZShkZWZhdWx0QmVoYXZpb3VyT25DbG9zZSwgZGVmYXVsdEJlaGF2aW91ck9uQ2xvc2UpXG4gICAgICAgIDtcblxuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGRlc3Ryb3lNb2RhbENvbXBvbmVudChtb2RhbDogQ29tcG9uZW50UmVmPE1vZGFsQ29tcG9uZW50Pik6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGFycmF5UmVmID0gdGhpcy5tb2RhbHMuZmluZCgoaXRlbSkgPT4gaXRlbS5tb2RhbFJlZiA9PT0gbW9kYWwpO1xuICAgICAgICBjb25zdCBpbmRleE9mID0gdGhpcy5tb2RhbHMuaW5kZXhPZihhcnJheVJlZik7XG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuZGVzdHJveUNvbXBvbmVudChhcnJheVJlZi5tb2RhbFJlZik7XG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuZGVzdHJveUNvbXBvbmVudChhcnJheVJlZi5jb250YWluZXJSZWYpO1xuICAgICAgICBhcnJheVJlZi5jb250YWluZXJSZWYuZGVzdHJveSgpO1xuICAgICAgICBhcnJheVJlZi5tb2RhbFJlZi5kZXN0cm95KCk7XG5cbiAgICAgICAgaWYgKGFycmF5UmVmLmJhY2tkcm9wUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmRlc3Ryb3lDb21wb25lbnQoYXJyYXlSZWYuYmFja2Ryb3BSZWYpO1xuICAgICAgICAgICAgYXJyYXlSZWYuYmFja2Ryb3BSZWYuZGVzdHJveSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2RhbHNbaW5kZXhPZl0gPSBudWxsO1xuICAgICAgICB0aGlzLm1vZGFscyA9IHRoaXMubW9kYWxzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG51bGwgJiYgaXRlbSAhPT0gdW5kZWZpbmVkKTtcblxuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TW9kYWxTaXplKGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPE1vZGFsQ29tcG9uZW50PiwgY29uZmlnT2JqOiBNb2RhbENvbmZpZyk6IHZvaWQge1xuICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IGNvbmZpZ09iai5taW5XaWR0aDtcbiAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWluSGVpZ2h0ID0gY29uZmlnT2JqLm1pbkhlaWdodDtcbiAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4V2lkdGggPSBjb25maWdPYmoubWF4V2lkdGg7XG4gICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbmZpZ09iai5tYXhIZWlnaHQ7XG4gICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gY29uZmlnT2JqLndpZHRoO1xuICAgICAgICBjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBjb25maWdPYmouaGVpZ2h0O1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0TW9kYWxQb3NpdGlvbihjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxNb2RhbENvbXBvbmVudD4sIHBvc2l0aW9uOiBNb2RhbFBvc2l0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gcG9zaXRpb24udG9wO1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUuYm90dG9tID0gcG9zaXRpb24uYm90dG9tO1xuICAgICAgICAgICAgY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUucmlnaHQgPSBwb3NpdGlvbi5yaWdodDtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBwb3NpdGlvbi5sZWZ0O1xuICAgICAgICB9XG4gICAgfVxufVxuIl19