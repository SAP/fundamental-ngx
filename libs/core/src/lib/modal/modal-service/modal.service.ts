import {
    Injectable,
    ComponentRef,
    Type,
    TemplateRef, Inject
} from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalBackdrop } from '../modal-utils/modal-backdrop';
import { ModalContainer } from '../modal-utils/modal-container';
import { ModalConfig } from '../modal-utils/modal-config';
import { ModalPosition } from '../modal-utils/modal-position';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { ModalRef } from '../modal-utils/modal-ref';

/**
 * Service used to dynamically generate a modal.
 */
@Injectable()
export class ModalService {
    private modals: {
        modalRef: ComponentRef<ModalComponent>,
        backdropRef?: ComponentRef<ModalBackdrop>,
        containerRef?: ComponentRef<ModalContainer>
    }[] = [];

    /** @hidden */
    constructor(
        @Inject(DynamicComponentService) private dynamicComponentService: DynamicComponentService
    ) {}

    /**
     * Status of the modal service.
     * Returns true if there are open modals, false otherwise.
     */
    public hasOpenModals(): boolean {
        return this.modals && this.modals.length > 0;
    }

    /**
     * Dismisses all currently open modals.
     */
    public dismissAll(): void {
        this.modals.forEach(item => {
            this.destroyModalComponent(item.modalRef);
        });
    }

    /**
     * Opens a modal component with a content of type TemplateRef or a component type.
     * @param contentType Content of the modal component.
     * @param modalConfig Configuration of the modal component.
     */
    public open(contentType: Type<any> | TemplateRef<any>, modalConfig: ModalConfig = new ModalConfig()): ModalRef {

        // Get default values from model
        modalConfig = Object.assign(new ModalConfig(), modalConfig);

        // Instantiate modal ref service
        const service: ModalRef = new ModalRef();
        service.data = modalConfig.data;

        // Create Container
        const container: ComponentRef<ModalContainer> = this.dynamicComponentService.createDynamicComponent
            < ModalContainer > (contentType, ModalContainer, modalConfig)
        ;

        // Add classes to container native element
        if (modalConfig.containerClass) {
            container.location.nativeElement.classList.add(modalConfig.containerClass);
        }

        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;

        // Create Backdrop
        let backdrop: ComponentRef<ModalBackdrop>;
        if (modalConfig.hasBackdrop) {
            backdrop = this.dynamicComponentService.createDynamicComponent<ModalBackdrop>
                (contentType, ModalBackdrop, modalConfig, [service])
            ;
        }

        // Create Component
        const component = this.dynamicComponentService.createDynamicComponent
            < ModalComponent > (contentType, ModalComponent, modalConfig, [service])
        ;

        // Sizing
        this.setModalSize(component, modalConfig);

        // Positioning
        this.setModalPosition(component, modalConfig.position);

        this.modals.push({
            modalRef: component,
            containerRef: container,
            backdropRef: backdrop
        });

        const defaultBehaviourOnClose = () => {
            this.destroyModalComponent(component);
            refSub.unsubscribe();
        };

        const refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose)
        ;

        return service;
    }

    private destroyModalComponent(modal: ComponentRef<ModalComponent>): void {

        const arrayRef = this.modals.find((item) => item.modalRef === modal);
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
        this.modals = this.modals.filter(item => item !== null && item !== undefined);

    }

    private setModalSize(componentRef: ComponentRef<ModalComponent>, configObj: ModalConfig): void {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    }

    private setModalPosition(componentRef: ComponentRef<ModalComponent>, position: ModalPosition): void {
        if (position) {
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    }
}
