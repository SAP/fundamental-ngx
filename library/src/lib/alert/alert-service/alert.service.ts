import {
    Injectable,
    ComponentRef,
    TemplateRef,
    Type
} from '@angular/core';
import { AlertComponent } from '../alert.component';
import { AlertContainerComponent } from '../alert-utils/alert-container.component';
import { AlertConfig } from '../alert-utils/alert-config';
import { DynamicComponentRef } from '../../utils/dynamic-component/dynamic-component-ref';
import { DynamicComponentResult, DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';

/**
 * Service used to dynamically generate an alert as an overlay.
 */
@Injectable()
export class AlertService {
    private alerts: ComponentRef<AlertComponent>[] = [];
    private alertContainerRef: ComponentRef<AlertContainerComponent>;

    /** @hidden */
    constructor(
        private dynamicComponentService: DynamicComponentService
    ) {}

    /**
     * Returns true if there are some alerts currently open. False otherwise.
     */
    public hasOpenAlerts(): boolean {
        return this.alerts && this.alerts.length > 0;
    }

    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param content Content of the alert component.
     * @param alertConfig Configuration of the alert component.
     */
    public open(content: TemplateRef<any> | Type<any> | string, alertConfig: AlertConfig = new AlertConfig()): DynamicComponentRef {

        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);

        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent
                < AlertContainerComponent > (content, AlertContainerComponent, alertConfig).component
            ;
        }

        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;

        const component: DynamicComponentResult<AlertComponent> = this.dynamicComponentService.createDynamicComponent
            <AlertComponent>(content, AlertComponent, alertConfig);

        component.component.location.nativeElement.style.marginTop = '10px';

        // Subscription to close alert from ref
        const refSub = component.dynamicComponentReference.afterClosed.subscribe(() => {
            console.log(123);
            this.destroyAlertComponent(component.component);
            refSub.unsubscribe();
        }, () => {
            console.log(456);
            this.destroyAlertComponent(component.component);
            refSub.unsubscribe();
        });

        // Log new component
        this.alerts.push(component.component);
        return component.dynamicComponentReference;
    }

    /**
     * Dismisses all service-opened alerts.
     */
    public dismissAll(): void {
        this.alerts.forEach(ref => {
            this.destroyAlertComponent(ref);
        });
    }

    private destroyAlertComponent(alert: ComponentRef<AlertComponent>): void {
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter(item => item !== null && item !== undefined);
        this.dynamicComponentService.destroyComponent(alert);

        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    }

    private destroyAlertContainer(): void {
        this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    }

}
