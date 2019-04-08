import {
    ComponentFactoryResolver,
    Injectable,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
    Type,
    TemplateRef
} from '@angular/core';
import { ModalComponent } from '../modal.component';
import { ModalBackdrop } from '../modal-utils/modal-backdrop';
import { ModalContainer } from '../modal-utils/modal-container';
import { ModalConfig } from '../modal-utils/modal-config';
import { ModalRef } from '../modal-utils/modal-ref';
import { ModalInjector } from '../modal-utils/modal-injector';

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
    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {}

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

        // Setup injectable data
        const configMap = new WeakMap();
        const modalRef = new ModalRef();
        modalRef.data = (modalConfig ? modalConfig.data : undefined);
        configMap.set(ModalRef, modalRef);

        // Prepare container
        const containerFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainer);
        const containerRef = containerFactory.create(this.injector);
        this.appRef.attachView(containerRef.hostView);

        // Prepare modal
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const componentRef = componentFactory.create(new ModalInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);

        // Prepare backdrop
        let backdropRef;
        if (modalConfig.hasBackdrop) {
            const backdropFactory = this.componentFactoryResolver.resolveComponentFactory(ModalBackdrop);
            backdropRef = backdropFactory.create(new ModalInjector(this.injector, configMap));
            this.appRef.attachView(backdropRef.hostView);
        }

        // Subscribe to close of modalRef
        const refSub = modalRef.afterClosed.subscribe(() => {
            this.destroyModalComponent(componentRef);
            refSub.unsubscribe();
        }, () => {
            this.destroyModalComponent(componentRef);
            refSub.unsubscribe();
        });

        // Assign component attributes
        const configObj = Object.assign({}, modalConfig);
        Object.keys(configObj).forEach(key => {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];

                if (modalConfig.hasBackdrop) {
                    backdropRef.instance[key] = configObj[key];
                }
            }
        });
        componentRef.instance.childComponentType = contentType;

        // Sizing
        componentRef.location.nativeElement.style.minWidth = configObj.minWidth;
        componentRef.location.nativeElement.style.minHeight = configObj.minHeight;
        componentRef.location.nativeElement.style.maxWidth = configObj.maxWidth;
        componentRef.location.nativeElement.style.maxHeight = configObj.maxHeight;
        componentRef.location.nativeElement.style.width = configObj.width;
        componentRef.location.nativeElement.style.height = configObj.height;

        // Render container
        const containerEl = (containerRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(containerEl);

        // Render backdrop
        if (modalConfig.hasBackdrop) {
            const domBackdrop = (backdropRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            containerRef.location.nativeElement.appendChild(domBackdrop);
        }

        // Render modal
        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        containerRef.location.nativeElement.appendChild(domElement);

        this.modals.push({modalRef: componentRef, backdropRef: backdropRef, containerRef: containerRef});
        return modalRef;
    }

    private destroyModalComponent(modal: ComponentRef<ModalComponent>) {
        const arrayRef = this.modals.find((item) => item.modalRef === modal);
        const indexOf = this.modals.indexOf(arrayRef);
        this.appRef.detachView(arrayRef.modalRef.hostView);
        this.appRef.detachView(arrayRef.containerRef.hostView);
        arrayRef.containerRef.destroy();
        arrayRef.modalRef.destroy();

        if (arrayRef.backdropRef) {
            this.appRef.detachView(arrayRef.backdropRef.hostView);
            arrayRef.backdropRef.destroy();
        }

        this.modals[indexOf] = null;
        this.modals = this.modals.filter(item => item !== null && item !== undefined);
    }

}
