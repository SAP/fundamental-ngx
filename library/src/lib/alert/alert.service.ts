import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class AlertService {
    private alertRef = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {
        this.componentFactoryResolver = componentFactoryResolver;
    }

    close(result?) {
        this.alertRef.pop().handleClose(result, true);
    }

    dismiss(reason?) {
        this.alertRef.pop().dismiss(reason, true);
    }

    popAlert() {
        return this.alertRef.pop();
    }

    open(alertType, alertConfig?) {
        if (typeof alertType === 'object') { // template reference variable
            this.alertRef.push(alertType);
        } else if (typeof alertType === 'function') { // component as content
            const componentRef = this.componentFactoryResolver.resolveComponentFactory(alertType).create(this.injector);
            this.alertRef.push((componentRef.instance as any).alert);
            if (alertConfig) {
                Object.keys(alertConfig).forEach(key => (componentRef.instance[key] = alertConfig[key]));
            }
            this.alertRef[this.alertRef.length - 1].instance = componentRef.instance;
            this.appRef.attachView(componentRef.hostView);
            const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            document.body.appendChild(domElem);
            const subscription = this.alertRef[this.alertRef.length - 1].afterClosed.subscribe(() => {
                document.body.removeChild(domElem);
                this.removeSubscription(subscription);
            });
            this.appRef.tick();
        }
        this.alertRef[this.alertRef.length - 1].open();
        return this.alertRef[this.alertRef.length - 1];
    }

    removeSubscription(subscription) {
        subscription.unsubscribe();
    }
}
