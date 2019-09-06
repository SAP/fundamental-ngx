import { Type, TemplateRef } from '@angular/core';
import { ModalConfig } from '../modal-utils/modal-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { ModalRef } from '../modal-utils/modal-ref';
/**
 * Service used to dynamically generate a modal.
 */
export declare class ModalService {
    private dynamicComponentService;
    private modals;
    /** @hidden */
    constructor(dynamicComponentService: DynamicComponentService);
    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     */
    hasOpenModals(): boolean;
    /**
     * Dismisses all currently open modals.
     */
    dismissAll(): void;
    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param contentType Content of the modal component.
     * @param modalConfig Configuration of the modal component.
     */
    open(contentType: Type<any> | TemplateRef<any>, modalConfig?: ModalConfig): ModalRef;
    private destroyModalComponent;
    private setModalSize;
    private setModalPosition;
}
