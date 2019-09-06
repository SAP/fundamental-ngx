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
var AlertService = /** @class */ (function () {
    /** @hidden */
    function AlertService(dynamicComponentService) {
        this.dynamicComponentService = dynamicComponentService;
        this.alerts = [];
    }
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     */
    /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    AlertService.prototype.hasOpenAlerts = /**
     * Returns true if there are some alerts currently open. False otherwise.
     * @return {?}
     */
    function () {
        return this.alerts && this.alerts.length > 0;
    };
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param content Content of the alert component.
     * @param alertConfig Configuration of the alert component.
     */
    /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    AlertService.prototype.open = /**
     * Opens an alert component with a content of type TemplateRef, Component Type or String.
     * @param {?} content Content of the alert component.
     * @param {?=} alertConfig Configuration of the alert component.
     * @return {?}
     */
    function (content, alertConfig) {
        var _this = this;
        if (alertConfig === void 0) { alertConfig = new AlertConfig(); }
        // Get default values from alert model
        alertConfig = Object.assign(new AlertConfig(), alertConfig);
        // Instantiate alert ref service
        /** @type {?} */
        var service = new AlertRef();
        service.data = alertConfig.data;
        // If empty or undefined alert array, create container
        if (!this.alerts || this.alerts.length === 0 || !this.alertContainerRef) {
            this.alertContainerRef = this.dynamicComponentService.createDynamicComponent(content, AlertContainerComponent, alertConfig);
        }
        // Define Container to put backdrop and component to container
        alertConfig.container = this.alertContainerRef.location.nativeElement;
        /** @type {?} */
        var component = this.dynamicComponentService.createDynamicComponent(content, AlertComponent, alertConfig, [service]);
        component.location.nativeElement.style.marginTop = '10px';
        // Subscription to close alert from ref
        /** @type {?} */
        var refSub = service.afterDismissed.subscribe((/**
         * @return {?}
         */
        function () {
            _this.destroyAlertComponent(component);
            refSub.unsubscribe();
        }));
        // Log new component
        this.alerts.push(component);
        return service;
    };
    /**
     * Dismisses all service-opened alerts.
     */
    /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    AlertService.prototype.dismissAll = /**
     * Dismisses all service-opened alerts.
     * @return {?}
     */
    function () {
        var _this = this;
        this.alerts.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) {
            _this.destroyAlertComponent(ref);
        }));
    };
    /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    AlertService.prototype.destroyAlertComponent = /**
     * @private
     * @param {?} alert
     * @return {?}
     */
    function (alert) {
        this.alerts[this.alerts.indexOf(alert)] = null;
        this.alerts = this.alerts.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item !== null && item !== undefined; }));
        this.dynamicComponentService.destroyComponent(alert);
        if (this.alertContainerRef && (!this.alerts || this.alerts.length === 0)) {
            this.destroyAlertContainer();
        }
    };
    /**
     * @private
     * @return {?}
     */
    AlertService.prototype.destroyAlertContainer = /**
     * @private
     * @return {?}
     */
    function () {
        this.dynamicComponentService.destroyComponent(this.alertContainerRef);
        this.alertContainerRef = undefined;
    };
    AlertService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AlertService.ctorParameters = function () { return [
        { type: DynamicComponentService }
    ]; };
    return AlertService;
}());
export { AlertService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9hbGVydC9hbGVydC1zZXJ2aWNlL2FsZXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDSCxVQUFVLEVBSWIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFLcEQ7SUFLSSxjQUFjO0lBQ2Qsc0JBQ1ksdUJBQWdEO1FBQWhELDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFMcEQsV0FBTSxHQUFtQyxFQUFFLENBQUM7SUFNakQsQ0FBQztJQUVKOztPQUVHOzs7OztJQUNJLG9DQUFhOzs7O0lBQXBCO1FBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7OztJQUNJLDJCQUFJOzs7Ozs7SUFBWCxVQUFZLE9BQThDLEVBQUUsV0FBNEM7UUFBeEcsaUJBaUNDO1FBakMyRCw0QkFBQSxFQUFBLGtCQUErQixXQUFXLEVBQUU7UUFFcEcsc0NBQXNDO1FBQ3RDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7OztZQUd0RCxPQUFPLEdBQWEsSUFBSSxRQUFRLEVBQUU7UUFDeEMsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRWhDLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDckUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxDQUM5RTtTQUNKO1FBRUQsOERBQThEO1FBQzlELFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7O1lBRWhFLFNBQVMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQ2hELE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7OztZQUdwRCxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTOzs7UUFBQztZQUM1QyxLQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLENBQUMsRUFBQztRQUVGLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0ksaUNBQVU7Ozs7SUFBakI7UUFBQSxpQkFJQztRQUhHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTzs7OztRQUFDLFVBQUEsR0FBRztZQUNuQixLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyw0Q0FBcUI7Ozs7O0lBQTdCLFVBQThCLEtBQW1DO1FBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBbkMsQ0FBbUMsRUFBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0RSxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQztJQUNMLENBQUM7Ozs7O0lBRU8sNENBQXFCOzs7O0lBQTdCO1FBQ0ksSUFBSSxDQUFDLHVCQUF1QixDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7SUFDdkMsQ0FBQzs7Z0JBL0VKLFVBQVU7Ozs7Z0JBTkYsdUJBQXVCOztJQXVGaEMsbUJBQUM7Q0FBQSxBQWpGRCxJQWlGQztTQWhGWSxZQUFZOzs7Ozs7SUFDckIsOEJBQW9EOzs7OztJQUNwRCx5Q0FBaUU7Ozs7O0lBSTdELCtDQUF3RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgSW5qZWN0YWJsZSxcbiAgICBDb21wb25lbnRSZWYsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVHlwZVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFsZXJ0Q29tcG9uZW50IH0gZnJvbSAnLi4vYWxlcnQuY29tcG9uZW50JztcbmltcG9ydCB7IEFsZXJ0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vYWxlcnQtdXRpbHMvYWxlcnQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbGVydENvbmZpZyB9IGZyb20gJy4uL2FsZXJ0LXV0aWxzL2FsZXJ0LWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB9IGZyb20gJy4uLy4uL3V0aWxzL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtY29tcG9uZW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgQWxlcnRSZWYgfSBmcm9tICcuLi9hbGVydC11dGlscy9hbGVydC1yZWYnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB0byBkeW5hbWljYWxseSBnZW5lcmF0ZSBhbiBhbGVydCBhcyBhbiBvdmVybGF5LlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRTZXJ2aWNlIHtcbiAgICBwcml2YXRlIGFsZXJ0czogQ29tcG9uZW50UmVmPEFsZXJ0Q29tcG9uZW50PltdID0gW107XG4gICAgcHJpdmF0ZSBhbGVydENvbnRhaW5lclJlZjogQ29tcG9uZW50UmVmPEFsZXJ0Q29udGFpbmVyQ29tcG9uZW50PjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgZHluYW1pY0NvbXBvbmVudFNlcnZpY2U6IER5bmFtaWNDb21wb25lbnRTZXJ2aWNlXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBzb21lIGFsZXJ0cyBjdXJyZW50bHkgb3Blbi4gRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYXNPcGVuQWxlcnRzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGVydHMgJiYgdGhpcy5hbGVydHMubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhbiBhbGVydCBjb21wb25lbnQgd2l0aCBhIGNvbnRlbnQgb2YgdHlwZSBUZW1wbGF0ZVJlZiwgQ29tcG9uZW50IFR5cGUgb3IgU3RyaW5nLlxuICAgICAqIEBwYXJhbSBjb250ZW50IENvbnRlbnQgb2YgdGhlIGFsZXJ0IGNvbXBvbmVudC5cbiAgICAgKiBAcGFyYW0gYWxlcnRDb25maWcgQ29uZmlndXJhdGlvbiBvZiB0aGUgYWxlcnQgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBvcGVuKGNvbnRlbnQ6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT4gfCBzdHJpbmcsIGFsZXJ0Q29uZmlnOiBBbGVydENvbmZpZyA9IG5ldyBBbGVydENvbmZpZygpKTogQWxlcnRSZWYge1xuXG4gICAgICAgIC8vIEdldCBkZWZhdWx0IHZhbHVlcyBmcm9tIGFsZXJ0IG1vZGVsXG4gICAgICAgIGFsZXJ0Q29uZmlnID0gT2JqZWN0LmFzc2lnbihuZXcgQWxlcnRDb25maWcoKSwgYWxlcnRDb25maWcpO1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlIGFsZXJ0IHJlZiBzZXJ2aWNlXG4gICAgICAgIGNvbnN0IHNlcnZpY2U6IEFsZXJ0UmVmID0gbmV3IEFsZXJ0UmVmKCk7XG4gICAgICAgIHNlcnZpY2UuZGF0YSA9IGFsZXJ0Q29uZmlnLmRhdGE7XG5cbiAgICAgICAgLy8gSWYgZW1wdHkgb3IgdW5kZWZpbmVkIGFsZXJ0IGFycmF5LCBjcmVhdGUgY29udGFpbmVyXG4gICAgICAgIGlmICghdGhpcy5hbGVydHMgfHwgdGhpcy5hbGVydHMubGVuZ3RoID09PSAwIHx8ICF0aGlzLmFsZXJ0Q29udGFpbmVyUmVmKSB7XG4gICAgICAgICAgICB0aGlzLmFsZXJ0Q29udGFpbmVyUmVmID0gdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVEeW5hbWljQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgPCBBbGVydENvbnRhaW5lckNvbXBvbmVudCA+IChjb250ZW50LCBBbGVydENvbnRhaW5lckNvbXBvbmVudCwgYWxlcnRDb25maWcpXG4gICAgICAgICAgICA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWZpbmUgQ29udGFpbmVyIHRvIHB1dCBiYWNrZHJvcCBhbmQgY29tcG9uZW50IHRvIGNvbnRhaW5lclxuICAgICAgICBhbGVydENvbmZpZy5jb250YWluZXIgPSB0aGlzLmFsZXJ0Q29udGFpbmVyUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5keW5hbWljQ29tcG9uZW50U2VydmljZS5jcmVhdGVEeW5hbWljQ29tcG9uZW50XG4gICAgICAgICAgICA8QWxlcnRDb21wb25lbnQ+KGNvbnRlbnQsIEFsZXJ0Q29tcG9uZW50LCBhbGVydENvbmZpZywgW3NlcnZpY2VdKTtcblxuICAgICAgICBjb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTBweCc7XG5cbiAgICAgICAgLy8gU3Vic2NyaXB0aW9uIHRvIGNsb3NlIGFsZXJ0IGZyb20gcmVmXG4gICAgICAgIGNvbnN0IHJlZlN1YiA9IHNlcnZpY2UuYWZ0ZXJEaXNtaXNzZWQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveUFsZXJ0Q29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICAgICAgICByZWZTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTG9nIG5ldyBjb21wb25lbnRcbiAgICAgICAgdGhpcy5hbGVydHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICByZXR1cm4gc2VydmljZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNtaXNzZXMgYWxsIHNlcnZpY2Utb3BlbmVkIGFsZXJ0cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZGlzbWlzc0FsbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbGVydHMuZm9yRWFjaChyZWYgPT4ge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95QWxlcnRDb21wb25lbnQocmVmKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95QWxlcnRDb21wb25lbnQoYWxlcnQ6IENvbXBvbmVudFJlZjxBbGVydENvbXBvbmVudD4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hbGVydHNbdGhpcy5hbGVydHMuaW5kZXhPZihhbGVydCldID0gbnVsbDtcbiAgICAgICAgdGhpcy5hbGVydHMgPSB0aGlzLmFsZXJ0cy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBudWxsICYmIGl0ZW0gIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuZGVzdHJveUNvbXBvbmVudChhbGVydCk7XG5cbiAgICAgICAgaWYgKHRoaXMuYWxlcnRDb250YWluZXJSZWYgJiYgKCF0aGlzLmFsZXJ0cyB8fCB0aGlzLmFsZXJ0cy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lBbGVydENvbnRhaW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95QWxlcnRDb250YWluZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHluYW1pY0NvbXBvbmVudFNlcnZpY2UuZGVzdHJveUNvbXBvbmVudCh0aGlzLmFsZXJ0Q29udGFpbmVyUmVmKTtcbiAgICAgICAgdGhpcy5hbGVydENvbnRhaW5lclJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbn1cbiJdfQ==