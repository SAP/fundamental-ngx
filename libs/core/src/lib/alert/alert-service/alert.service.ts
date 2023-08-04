import { Injectable, ComponentRef, TemplateRef, Type } from '@angular/core';
import { AlertComponent } from '../alert.component';
import { AlertContainerComponent } from '../alert-utils/alert-container.component';
import { AlertConfig } from '../alert-utils/alert-config';
import { DynamicComponentService, warnOnce } from '@fundamental-ngx/cdk/utils';
import { AlertRef } from '../alert-utils/alert-ref';

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 *
 * Service used to dynamically generate an alert as an overlay.
 */
@Injectable()
export class AlertService {
    /** @hidden */
    private alerts: ComponentRef<AlertComponent>[] = [];

    /** @hidden */
    private alertContainerRef?: ComponentRef<AlertContainerComponent>;

    /** @hidden */
    constructor(private dynamicComponentService: DynamicComponentService) {
        warnOnce(
            'AlertService is deprecated since version 0.16.0 and will be removed in next release. Use MessageStripAlertService instead.'
        );
    }

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
    public open(
        content: TemplateRef<any> | Type<any> | string,
        alertConfig: AlertConfig = new AlertConfig()
    ): AlertRef {
        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);

        // Instantiate alert ref service
        const service: AlertRef = new AlertRef();
        service.data = alertConfig.data;

        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent<AlertContainerComponent>(
                content,
                AlertContainerComponent,
                alertConfig
            );
        }

        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;

        const component = this.dynamicComponentService.createDynamicComponent<AlertComponent>(
            content,
            AlertComponent,
            alertConfig,
            { services: [service, alertConfig] }
        );

        component.location.nativeElement.style.marginTop = '10px';

        // Subscription to close alert from ref
        const refSub = service.afterDismissed.subscribe(() => {
            this.destroyAlertComponent(component);
            refSub.unsubscribe();
        });

        // Log new component
        this.alerts.push(component);
        return service;
    }

    /**
     * Dismisses all service-opened alerts.
     */
    public dismissAll(): void {
        this.alerts.forEach((ref) => {
            this.destroyAlertComponent(ref);
        });
    }

    /** @hidden */
    private destroyAlertComponent(alert: ComponentRef<AlertComponent>): void {
        this.alerts = this.alerts.filter((item) => item && item !== alert);
        this.dynamicComponentService.destroyComponent(alert);

        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    }

    /** @hidden */
    private destroyAlertContainer(): void {
        this.alertContainerRef && this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    }
}
