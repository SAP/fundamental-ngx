import { ComponentRef, Inject, Injectable, Optional, TemplateRef, Type } from '@angular/core';
import { AlertComponent } from '../alert.component';
import { AlertContainerComponent } from '../alert-utils/alert-container.component';
import { ALERT_DEFAULT_CONFIG, AlertConfig } from '../alert-utils/alert-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { AlertRef } from '../alert-utils/alert-ref';

/**
 * Service used to dynamically generate an alert as an overlay.
 */
@Injectable()
export class AlertService {
    private alerts: ComponentRef<AlertComponent>[] = [];
    private alertContainerRef: ComponentRef<AlertContainerComponent>;

    /** @hidden */
    constructor(
        private dynamicComponentService: DynamicComponentService,
        @Optional() @Inject(ALERT_DEFAULT_CONFIG) private _defaultConfig: AlertConfig
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
    public open(content: TemplateRef<any> | Type<any> | string, alertConfig?: AlertConfig): AlertRef {

        alertConfig = this._applyDefaultConfig(alertConfig, this._defaultConfig || new AlertConfig());

        const alertRef: AlertRef = new AlertRef();
        alertRef.data = alertConfig.data;

        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent<AlertContainerComponent>(
                content,
                AlertContainerComponent,
                alertConfig,
                {services: [alertConfig]}
            );
        }

        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;

        const component = this.dynamicComponentService.createDynamicComponent<AlertComponent>(
            content,
            AlertComponent,
            alertConfig,
            {services: [alertRef, alertConfig]}
        );

        component.location.nativeElement.style.marginTop = '10px';

        // Subscription to close alert from ref
        const refSub = alertRef.afterDismissed.subscribe(() => {
            this.destroyAlertComponent(component);
            refSub.unsubscribe();
        });

        // Log new component
        this.alerts.push(component);
        return alertRef;
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

    /** @hidden Extends alert config using default values and returns JS DialogConfig object*/
    private _applyDefaultConfig(config: AlertConfig, defaultConfig: AlertConfig): AlertConfig {
        const newConfig = new AlertConfig();
        const mergedConfigs = {...defaultConfig, ...config};
        Object.keys(mergedConfigs).forEach(key => newConfig[key] = mergedConfigs[key]);

        return newConfig;
    }
}
