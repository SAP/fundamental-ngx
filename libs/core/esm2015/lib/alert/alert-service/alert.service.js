/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { AlertComponent } from '../alert.component';
import { AlertContainerComponent } from '../alert-utils/alert-container.component';
import { AlertConfig } from '../alert-utils/alert-config';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { AlertRef } from '../alert-utils/alert-ref';
/**
 * Service used to dynamically generate an alert as an overlay.
 */
export class AlertService {
    /**
     * @hidden
     * @param {?} dynamicComponentService
     */
    constructor(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.alerts = [];
    }
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    hasOpenAlerts() {
        return this.alerts && this.alerts.length > 0;
    }
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    open(content, alertConfig = new AlertConfig()) {
        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);
        // Instantiate alert ref service
        /** @type {?} */
        const service = new AlertRef();
        service.data = alertConfig.data;
        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent(content, AlertContainerComponent, alertConfig);
        }
        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;
        /** @type {?} */
        const component = this.dynamicComponentService.createDynamicComponent(content, AlertComponent, alertConfig, [service]);
        component.location.nativeElement.style.marginTop = '10px';
        // Subscription to close alert from ref
        /** @type {?} */
        const refSub = service.afterDismissed.subscribe((/**
         * @return {?}
         */
        () => {
            this.destroyAlertComponent(component);
            refSub.unsubscribe();
        }));
        // Log new component
        this.alerts.push(component);
        return service;
    }
    /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    dismissAll() {
        this.alerts.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        ref => {
            this.destroyAlertComponent(ref);
        }));
    }
    /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    destroyAlertComponent(alert) {
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item !== null && item !== undefined));
        this.dynamicComponentService.destroyComponent(alert);
        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    }
    /**
     * @private
     * @return {?}
     */
    destroyAlertContainer() {
        this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    }
}
AlertService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AlertService.ctorParameters = () => [
    { type: DynamicComponentService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.alerts;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.alertContainerRef;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.dynamicComponentService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hbGVydC9hbGVydC1zZXJ2aWNlL2FsZXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxVQUFVLEVBSWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFNcEQsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBS3JCLFlBQ1ksdUJBQWdEO1FBQWhELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFMcEQsV0FBTSxHQUFtQyxFQUFFLENBQUM7SUFNakQsQ0FBQzs7Ozs7SUFLRyxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7OztJQU9NLElBQUksQ0FBQyxPQUE4QyxFQUFFLGNBQTJCLElBQUksV0FBVyxFQUFFO1FBRXBHLHNDQUFzQztRQUN0QyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzs7Y0FHdEQsT0FBTyxHQUFhLElBQUksUUFBUSxFQUFFO1FBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUVoQyxzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3JFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxXQUFXLENBQUMsQ0FDOUU7U0FDSjtRQUVELDhEQUE4RDtRQUM5RCxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDOztjQUVoRSxTQUFTLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLHNCQUFzQixDQUNoRCxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJFLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDOzs7Y0FHcEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUzs7O1FBQUMsR0FBRyxFQUFFO1lBQ2pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsQ0FBQyxFQUFDO1FBRUYsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBS00sVUFBVTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7OztJQUVPLHFCQUFxQixDQUFDLEtBQW1DO1FBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7O0lBRU8scUJBQXFCO1FBQ3pCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7OztZQS9FSixVQUFVOzs7O1lBTkYsdUJBQXVCOzs7Ozs7O0lBUTVCLDhCQUFvRDs7Ozs7SUFDcEQseUNBQWlFOzs7OztJQUk3RCwrQ0FBd0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdGFibGUsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBbGVydENvbXBvbmVudCB9IGZyb20gJy4uL2FsZXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4uL2FsZXJ0LXV0aWxzL2FsZXJ0LWNvbnRhaW5lci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWxlcnRDb25maWcgfSBmcm9tICcuLi9hbGVydC11dGlscy9hbGVydC1jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi8uLi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlJztcbmltcG9ydCB7IEFsZXJ0UmVmIH0gZnJvbSAnLi4vYWxlcnQtdXRpbHMvYWxlcnQtcmVmJztcblxuLyoqXG4gKiBTZXJ2aWNlIHVzZWQgdG8gZHluYW1pY2FsbHkgZ2VuZXJhdGUgYW4gYWxlcnQgYXMgYW4gb3ZlcmxheS5cbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFsZXJ0U2VydmljZSB7XG4gICAgcHJpdmF0ZSBhbGVydHM6IENvbXBvbmVudFJlZjxBbGVydENvbXBvbmVudD5bXSA9IFtdO1xuICAgIHByaXZhdGUgYWxlcnRDb250YWluZXJSZWY6IENvbXBvbmVudFJlZjxBbGVydENvbnRhaW5lckNvbXBvbmVudD47XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGR5bmFtaWNDb21wb25lbnRTZXJ2aWNlOiBEeW5hbWljQ29tcG9uZW50U2VydmljZVxuICAgICkge31cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgc29tZSBhbGVydHMgY3VycmVudGx5IG9wZW4uIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFzT3BlbkFsZXJ0cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWxlcnRzICYmIHRoaXMuYWxlcnRzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3BlbnMgYW4gYWxlcnQgY29tcG9uZW50IHdpdGggYSBjb250ZW50IG9mIHR5cGUgVGVtcGxhdGVSZWYsIENvbXBvbmVudCBUeXBlIG9yIFN0cmluZy5cbiAgICAgKiBAcGFyYW0gY29udGVudCBDb250ZW50IG9mIHRoZSBhbGVydCBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIGFsZXJ0Q29uZmlnIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFsZXJ0IGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgb3Blbihjb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+IHwgc3RyaW5nLCBhbGVydENvbmZpZzogQWxlcnRDb25maWcgPSBuZXcgQWxlcnRDb25maWcoKSk6IEFsZXJ0UmVmIHtcblxuICAgICAgICAvLyBHZXQgZGVmYXVsdCB2YWx1ZXMgZnJvbSBhbGVydCBtb2RlbFxuICAgICAgICBhbGVydENvbmZpZyA9IE9iamVjdC5hc3NpZ24obmV3IEFsZXJ0Q29uZmlnKCksIGFsZXJ0Q29uZmlnKTtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZSBhbGVydCByZWYgc2VydmljZVxuICAgICAgICBjb25zdCBzZXJ2aWNlOiBBbGVydFJlZiA9IG5ldyBBbGVydFJlZigpO1xuICAgICAgICBzZXJ2aWNlLmRhdGEgPSBhbGVydENvbmZpZy5kYXRhO1xuXG4gICAgICAgIC8vIElmIGVtcHR5IG9yIHVuZGVmaW5lZCBhbGVydCBhcnJheSwgY3JlYXRlIGNvbnRhaW5lclxuICAgICAgICBpZiAoIXRoaXMuYWxlcnRzIHx8IHRoaXMuYWxlcnRzLmxlbmd0aCA9PT0gMCB8fCAhdGhpcy5hbGVydENvbnRhaW5lclJlZikge1xuICAgICAgICAgICAgdGhpcy5hbGVydENvbnRhaW5lclJlZiA9IHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlRHluYW1pY0NvbXBvbmVudFxuICAgICAgICAgICAgICAgIDwgQWxlcnRDb250YWluZXJDb21wb25lbnQgPiAoY29udGVudCwgQWxlcnRDb250YWluZXJDb21wb25lbnQsIGFsZXJ0Q29uZmlnKVxuICAgICAgICAgICAgO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVmaW5lIENvbnRhaW5lciB0byBwdXQgYmFja2Ryb3AgYW5kIGNvbXBvbmVudCB0byBjb250YWluZXJcbiAgICAgICAgYWxlcnRDb25maWcuY29udGFpbmVyID0gdGhpcy5hbGVydENvbnRhaW5lclJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuY3JlYXRlRHluYW1pY0NvbXBvbmVudFxuICAgICAgICAgICAgPEFsZXJ0Q29tcG9uZW50Pihjb250ZW50LCBBbGVydENvbXBvbmVudCwgYWxlcnRDb25maWcsIFtzZXJ2aWNlXSk7XG5cbiAgICAgICAgY29tcG9uZW50LmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luVG9wID0gJzEwcHgnO1xuXG4gICAgICAgIC8vIFN1YnNjcmlwdGlvbiB0byBjbG9zZSBhbGVydCBmcm9tIHJlZlxuICAgICAgICBjb25zdCByZWZTdWIgPSBzZXJ2aWNlLmFmdGVyRGlzbWlzc2VkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lBbGVydENvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgcmVmU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExvZyBuZXcgY29tcG9uZW50XG4gICAgICAgIHRoaXMuYWxlcnRzLnB1c2goY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIHNlcnZpY2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzbWlzc2VzIGFsbCBzZXJ2aWNlLW9wZW5lZCBhbGVydHMuXG4gICAgICovXG4gICAgcHVibGljIGRpc21pc3NBbGwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWxlcnRzLmZvckVhY2gocmVmID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUFsZXJ0Q29tcG9uZW50KHJlZik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveUFsZXJ0Q29tcG9uZW50KGFsZXJ0OiBDb21wb25lbnRSZWY8QWxlcnRDb21wb25lbnQ+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWxlcnRzW3RoaXMuYWxlcnRzLmluZGV4T2YoYWxlcnQpXSA9IG51bGw7XG4gICAgICAgIHRoaXMuYWxlcnRzID0gdGhpcy5hbGVydHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gbnVsbCAmJiBpdGVtICE9PSB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmRlc3Ryb3lDb21wb25lbnQoYWxlcnQpO1xuXG4gICAgICAgIGlmICh0aGlzLmFsZXJ0Q29udGFpbmVyUmVmICYmICghdGhpcy5hbGVydHMgfHwgdGhpcy5hbGVydHMubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QWxlcnRDb250YWluZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZGVzdHJveUFsZXJ0Q29udGFpbmVyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmR5bmFtaWNDb21wb25lbnRTZXJ2aWNlLmRlc3Ryb3lDb21wb25lbnQodGhpcy5hbGVydENvbnRhaW5lclJlZik7XG4gICAgICAgIHRoaXMuYWxlcnRDb250YWluZXJSZWYgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG59XG4iXX0=