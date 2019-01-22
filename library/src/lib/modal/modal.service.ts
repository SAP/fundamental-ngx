import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class ModalService {
    private modalRef = [];

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {
        this.componentFactoryResolver = componentFactoryResolver;
    }

    close(result?) {
        this.modalRef.pop().close(result, true);
    }

    dismiss(reason?) {
        this.modalRef.pop().dismiss(reason, true);
    }

    popModal() {
        return this.modalRef.pop();
    }

    open(modalType) {
        if (typeof modalType === 'object') { // template reference variable
            this.modalRef.push(modalType);
        } else if (typeof modalType === 'function') { // component as content
            const componentRef = this.componentFactoryResolver.resolveComponentFactory(modalType).create(this.injector);
            this.modalRef.push((componentRef.instance as any).modal);
            this.modalRef[this.modalRef.length - 1].instance = componentRef.instance;
            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef < any > )
                .rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
            this.appRef.tick();
        }
        this.modalRef[this.modalRef.length - 1].open();
        return this.modalRef[this.modalRef.length - 1];
    }

    getModalCount() {
        return this.modalRef.length;
    }
}
