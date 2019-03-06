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
import { ModalComponent } from './modal.component';
import { ModalOverlayComponent } from './modal-overlay.component';
import { ModalContainerComponent } from './modal-container.component';
import { ModalConfig } from './modal-config';
import { ModalRef } from './modal-ref';

@Injectable()
export class ModalService {
    private modals: {modalRef: ComponentRef<ModalComponent>, overlayRef?: ComponentRef<ModalOverlayComponent>}[] = [];
    private modalContainerRef: ComponentRef<ModalContainerComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {}

    public hasOpenModals(): boolean {
        return this.modals && this.modals.length > 0;
    }

    public dismissAll(): void {
        this.modals.forEach(item => {
            this.destroyModalComponent(item.modalRef);
        });
    }

    public open(contentType: Type<any> | TemplateRef<any>, modalConfig: ModalConfig = new ModalConfig()): ModalRef {

        if (!this.modals || this.modals.length === 0) {
            this.openModalContainer();
        }


    }

    private destroyModalComponent(modal: ComponentRef<ModalComponent>) {
        const arrayRef = this.modals.find((item) => item.modalRef === modal);
        this.appRef.detachView(arrayRef.modalRef.hostView);
        this.appRef.detachView(arrayRef.overlayRef.hostView);
        arrayRef.modalRef.destroy();
        arrayRef.overlayRef.destroy();
        this.modals[this.modals.indexOf(arrayRef)] = null;
        this.modals = this.modals.filter(item => item !== null && item !== undefined);

        if (this.modalContainerRef && (!this.modals || this.modals.length === 0)) {
            this.destroyModalContainer();
        }
    }

    private openModalContainer(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
        const componentRef = factory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);
        this.modalContainerRef = componentRef;
    }

    private destroyModalContainer(): void {
        this.appRef.detachView(this.modalContainerRef.hostView);
        this.modalContainerRef.destroy();
        this.modalContainerRef = undefined;
    }

}
