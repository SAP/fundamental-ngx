import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
        this.componentFactoryResolver = componentFactoryResolver;
    }

    close(result?) {
        this.modalRef.close(result);
        this.modalRef = null;
    }

    dismiss(reason?) {
        this.modalRef.dismiss(reason);
        this.modalRef = null;
    }

    open(modalType) {
        if (typeof modalType === 'object') { // template reference variable
            this.modalRef = modalType;
        } else if (typeof modalType === 'function') { // component as content
            const componentRef = this.componentFactoryResolver.resolveComponentFactory(modalType).create(this.injector);
            this.modalRef = (componentRef.instance as any).modal;
            this.modalRef.instance = componentRef.instance;
            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef < any > )
                .rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
            this.appRef.tick();
        }
        this.modalRef.open();
        return this.modalRef;
    }
}
