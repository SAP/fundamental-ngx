import {
    Injectable,
    ComponentRef,
    Type,
    TemplateRef, Inject
} from '@angular/core';
import { DialogComponent } from '../dialog.component';
import { DialogBackdrop } from '../dialog-utils/dialog-backdrop';
import { DialogContainer } from '../dialog-utils/dialog-container';
import { DialogConfig } from '../dialog-utils/dialog-config';
import { DialogPosition } from '../dialog-utils/dialog-position';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { DialogRef } from '../dialog-utils/dialog-ref';

/**
 * Service used to dynamically generate a dialog.
 */
@Injectable()
export class DialogService {
    private modals: {
        modalRef: ComponentRef<DialogComponent>,
        backdropRef?: ComponentRef<DialogBackdrop>,
        containerRef?: ComponentRef<DialogContainer>
    }[] = [];

    /** @hidden */
    constructor(
        @Inject(DynamicComponentService) private _dynamicComponentService: DynamicComponentService
    ) {}

    /**
     * Status of the dialog service.
     * Returns true if there are open dialogs, false otherwise.
     */
    public hasOpenModals(): boolean {
        return this.modals && this.modals.length > 0;
    }

    /**
     * Dismisses all currently open dialogs.
     */
    public dismissAll(): void {
        this.modals.forEach(item => {
            this._destroyModalComponent(item.modalRef);
        });
    }

    /**
     * Opens a dialog component with a content of type TemplateRef or a component type.
     * @param contentType Content of the dialog component.
     * @param dialogConfig Configuration of the dialog component.
     */
    public open(contentType: Type<any> | TemplateRef<any>, modalConfig: DialogConfig = new DialogConfig()): DialogRef {

        // Get default values from model
        modalConfig = Object.assign(new DialogConfig(), modalConfig);

        // Instantiate dialog ref service
        const service: DialogRef = new DialogRef();
        service.data = modalConfig.data;

        // Create Container
        const container: ComponentRef<DialogContainer> = this._dynamicComponentService
            .createDynamicComponent <DialogContainer>(contentType, DialogContainer, modalConfig);

        // Add classes to container native element
        if (modalConfig.containerClass) {
            container.location.nativeElement.classList.add(modalConfig.containerClass);
        }

        // Define Container to put backdrop and component to container
        modalConfig.container = container.location.nativeElement;

        // Create Backdrop
        let backdrop: ComponentRef<DialogBackdrop>;
        if (modalConfig.hasBackdrop) {
            backdrop = this._dynamicComponentService.createDynamicComponent<DialogBackdrop>
                (contentType, DialogBackdrop, modalConfig, [service]);
        }

        // Create Component
        const component = this._dynamicComponentService
            .createDynamicComponent <DialogComponent>(contentType, DialogComponent, modalConfig, [service]);

        // Sizing
        this._setModalSize(component, modalConfig);

        // Positioning
        this._setModalPosition(component, modalConfig.position);

        this.modals.push({
            modalRef: component,
            containerRef: container,
            backdropRef: backdrop
        });

        const defaultBehaviourOnClose = () => {
            this._destroyModalComponent(component);
            refSub.unsubscribe();
        };

        const refSub = service.afterClosed
            .subscribe(defaultBehaviourOnClose, defaultBehaviourOnClose);

        return service;
    }

    private _destroyModalComponent(modal: ComponentRef<DialogComponent>): void {

        const arrayRef = this.modals.find((item) => item.modalRef === modal);
        const indexOf = this.modals.indexOf(arrayRef);
        this._dynamicComponentService.destroyComponent(arrayRef.modalRef);
        this._dynamicComponentService.destroyComponent(arrayRef.containerRef);
        arrayRef.containerRef.destroy();
        arrayRef.modalRef.destroy();

        if (arrayRef.backdropRef) {
            this._dynamicComponentService.destroyComponent(arrayRef.backdropRef);
            arrayRef.backdropRef.destroy();
        }

        this.modals[indexOf] = null;
        this.modals = this.modals.filter(item => item !== null && item !== undefined);

    }

    private _setModalSize(componentRef: ComponentRef<DialogComponent>, configObj: DialogConfig): void {
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;
    }

    private _setModalPosition(componentRef: ComponentRef<DialogComponent>, position: DialogPosition): void {
        if (position) {
            this._removeCurrentPositionModifiers(componentRef, position);
            componentRef.location.nativeElement.style.top = position.top;
            componentRef.location.nativeElement.style.bottom = position.bottom;
            componentRef.location.nativeElement.style.right = position.right;
            componentRef.location.nativeElement.style.left = position.left;
        }
    }

    private _removeCurrentPositionModifiers(componentRef: ComponentRef<DialogComponent>, position: DialogPosition): void {

        const isXPositionSet: boolean = !!(position.right || position.left);
        const isYPositionSet: boolean = !!(position.bottom || position.top);

        if (isYPositionSet) {
            componentRef.location.nativeElement.style.top = 'auto';
            componentRef.location.nativeElement.style.bottom = 'auto';
            componentRef.location.nativeElement.style.transform = 'translate(-50%, 0)';
        }

        if (isXPositionSet) {
            componentRef.location.nativeElement.style.right = 'auto';
            componentRef.location.nativeElement.style.left = 'auto';
            componentRef.location.nativeElement.style.transform = 'translate(0, -50%)';
        }

        if (isXPositionSet && isYPositionSet) {
            componentRef.location.nativeElement.style.transform = 'translate(0, 0)'
        }
    }
}
