import { TemplateRef, Type } from '@angular/core';
import { AlertConfig } from '../alert-utils/alert-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { AlertRef } from '../alert-utils/alert-ref';
/**
 * Service used to dynamically generate an alert as an overlay.
 */
export declare class AlertService {
    private dynamicComponentService;
    private alerts;
    private alertContainerRef;
    /** @hidden */
    constructor(dynamicComponentService: DynamicComponentService);
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     */
    hasOpenAlerts(): boolean;
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param content Content of the alert component.
     * @param alertConfig Configuration of the alert component.
     */
    open(content: TemplateRef<any> | Type<any> | string, alertConfig?: AlertConfig): AlertRef;
    /**
     * Dismisses all service-opened alerts.
     */
    dismissAll(): void;
    private destroyAlertComponent;
    private destroyAlertContainer;
}
