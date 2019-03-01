import {
    ComponentFactoryResolver,
    Injectable,
    ApplicationRef,
    Injector,
    ComponentRef,
    EmbeddedViewRef,
    TemplateRef,
    Type
} from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertContainerComponent } from './alert-container.component';
import { AlertConfig } from './alert-config';
import { AlertInjector } from './alert-injector';
import { AlertRef } from './alert-ref';

@Injectable()
export class AlertService {
    private alerts: ComponentRef<AlertComponent>[] = [];
    private alertContainerRef: ComponentRef<AlertContainerComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector) {

    }

    public hasOpenAlerts(): boolean {
        return this.alerts && this.alerts.length > 0;
    }

    public open(content: TemplateRef<any> | Type<any> | string, alertConfig?: AlertConfig): AlertRef {

        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0) {
            this.openAlertContainer();
        }

        // Config setup
        const configMap = new WeakMap();
        const alertRef = new AlertRef();
        alertRef.data = (alertConfig ? alertConfig.data : undefined);
        configMap.set(AlertRef, alertRef);

        // Prepare new component
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const componentRef = componentFactory.create(new AlertInjector(this.injector, configMap));
        componentRef.location.nativeElement.style.marginTop = '10px';
        this.appRef.attachView(componentRef.hostView);

        // Subscription to close alert from ref
        const refSub = alertRef.afterClosed.subscribe(() => {
            this.destroyAlertComponent(componentRef);
            refSub.unsubscribe();
        });

        // Prepare component data items
        const configObj = Object.assign({}, alertConfig);
        Object.keys(configObj).forEach(key => {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        });
        componentRef.instance.childComponentType = content;

        // Render new component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.alertContainerRef.location.nativeElement.appendChild(domElem);

        // Log new component
        this.alerts.push(componentRef);
        return alertRef;
    }

    public dismissAll(): void {
        this.alerts.forEach(ref => {
            this.destroyAlertComponent(ref);
        });
    }

    private destroyAlertComponent(alert: ComponentRef<AlertComponent>): void {
        this.appRef.detachView(alert.hostView);
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter(item => item !== null && item !== undefined);
        alert.destroy();

        if (!this.alerts || this.alerts.length === 0) {
            this.destroyAlertContainer();
        }
    }

    private openAlertContainer(): void {
        const factory = this.componentFactoryResolver.resolveComponentFactory(AlertContainerComponent);
        const componentRef = factory.create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        const domElement = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);
        this.alertContainerRef = componentRef;
    }

    private destroyAlertContainer(): void {
        this.appRef.detachView(this.alertContainerRef.hostView);
        this.alertContainerRef.destroy();
    }

    // open(content: any, options: NgbModalOptions = {}): NgbModalRef {
    //     const combinedOptions = Object.assign({}, this._config, options);
    //     return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
    // }

    // open(alertType, alertConfig?) {
    //     if (typeof alertType === 'object') { // template reference variable
    //         this.alertRef.push(alertType);
    //     } else if (typeof alertType === 'function') { // component as content
    //         const componentRef = this.componentFactoryResolver.resolveComponentFactory(alertType).create(this.injector);
    //         this.alertRef.push((componentRef.instance as any).alert);
    //         if (alertConfig) {
    //             Object.keys(alertConfig).forEach(key => (componentRef.instance[key] = alertConfig[key]));
    //         }
    //         this.alertRef[this.alertRef.length - 1].instance = componentRef.instance;
    //         this.appRef.attachView(componentRef.hostView);
    //         const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    //         document.body.appendChild(domElem);
    //         const subscription = this.alertRef[this.alertRef.length - 1].afterClosed.subscribe(() => {
    //             document.body.removeChild(domElem);
    //             this.removeSubscription(subscription);
    //         });
    //         this.appRef.tick();
    //     }
    //     this.alertRef[this.alertRef.length - 1].open();
    //     return this.alertRef[this.alertRef.length - 1];
    // }
    //
    // removeSubscription(subscription) {
    //     subscription.unsubscribe();
    // }
}
