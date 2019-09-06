/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector } from '@angular/core';
import { DynamicComponentInjector } from './dynamic-component-injector';
/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
export class DynamicComponentService {
    /**
     * @hidden
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    createDynamicComponent(contentType, componentType, config, services) {
        // Dynamically inject services to component
        /** @type {?} */
        const configMap = new WeakMap();
        if (services) {
            services.forEach((/**
             * @param {?} service
             * @return {?}
             */
            service => configMap.set(service.constructor, service)));
        }
        // Prepare component
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        /** @type {?} */
        const componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);
        // Assign component attributes
        /** @type {?} */
        const configObj = Object.assign({}, config);
        Object.keys(configObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        key => {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        }));
        componentRef.instance.childComponentType = contentType;
        // Render component
        /** @type {?} */
        const componentEl = (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        }
        else {
            document.body.appendChild(componentEl);
        }
        return componentRef;
    }
    /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    destroyComponent(componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}
DynamicComponentService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DynamicComponentService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DynamicComponentService.prototype.componentFactoryResolver;
    /**
     * @type {?}
     * @private
     */
    DynamicComponentService.prototype.appRef;
    /**
     * @type {?}
     * @private
     */
    DynamicComponentService.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBT3hFLE1BQU0sT0FBTyx1QkFBdUI7Ozs7Ozs7SUFHaEMsWUFDWSx3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0I7UUFGbEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQzNCLENBQUM7Ozs7Ozs7Ozs7SUFTRyxzQkFBc0IsQ0FDekIsV0FBa0QsRUFDbEQsYUFBd0IsRUFDeEIsTUFBOEIsRUFDOUIsUUFBZ0I7OztjQUlWLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRTtRQUMvQixJQUFJLFFBQVEsRUFBRTtZQUNWLFFBQVEsQ0FBQyxPQUFPOzs7O1lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQUMsQ0FBQTtTQUMzRTs7O2NBR0ssZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQzs7Y0FDdkYsWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Y0FHeEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxJQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUU7Z0JBQ2hCLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9DO1FBQ0wsQ0FBQyxFQUFDLENBQUM7UUFDSCxZQUFZLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQzs7O2NBR2pELFdBQVcsR0FBRyxtQkFBQSxDQUFDLG1CQUFBLFlBQVksQ0FBQyxRQUFRLEVBQXdCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQWU7UUFDL0YsSUFBSSxTQUFTLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtZQUNoQyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDMUM7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFHTSxnQkFBZ0IsQ0FBQyxZQUErQjtRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQTNESixVQUFVOzs7O1lBZFAsd0JBQXdCO1lBRXhCLGNBQWM7WUFDZCxRQUFROzs7Ozs7O0lBZ0JKLDJEQUEwRDs7Ozs7SUFDMUQseUNBQThCOzs7OztJQUM5QiwyQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBJbmplY3RhYmxlLFxuICAgIEFwcGxpY2F0aW9uUmVmLFxuICAgIEluamVjdG9yLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBDb21wb25lbnRSZWYsXG4gICAgVHlwZSwgVGVtcGxhdGVSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50SW5qZWN0b3IgfSBmcm9tICcuL2R5bmFtaWMtY29tcG9uZW50LWluamVjdG9yJztcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRDb25maWcgfSBmcm9tICcuL2R5bmFtaWMtY29tcG9uZW50LWNvbmZpZyc7XG5cbi8qKlxuICogU2VydmljZSB1c2VkIHRvIGR5bmFtaWNhbGx5IGdlbmVyYXRlIGNvbXBvbmVudHMgbGlrZSBtb2RhbHMvYWxlcnRzL25vdGlmaWNhdGlvbnNcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIER5bmFtaWNDb21wb25lbnRTZXJ2aWNlIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgICApIHt9XG5cbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IGNyZWF0ZXMgZHluYW1pYyBjb21wb25lbnQgYW5kIGluamVjdHMgc2VydmljZXMgdG8gYWxsb3cgY29tbXVuaWNhdGlvbiBiZXR3ZWVuIGNvbXBvbmVudCBhbmQgb3V0c2lkZVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZSBUeXBlIG9mIHRoZSBjb21wb25lbnQgY29udGVudFxuICAgICAqIEBwYXJhbSBjb21wb25lbnRUeXBlIFR5cGUgb2YgY29tcG9uZW50IHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICAgICAqIEBwYXJhbSBjb25maWcgQ29uZmlndXJhdGlvbiB0aGF0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBjb21wb25lbnQuXG4gICAgICogQHBhcmFtIHNlcnZpY2VzIFNlcnZpY2VzIHRoYXQgd2lsbCBiZSBpbmplY3RlZCB0byB0aGUgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVEeW5hbWljQ29tcG9uZW50PFQ+KFxuICAgICAgICBjb250ZW50VHlwZTogVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PiB8IHN0cmluZyxcbiAgICAgICAgY29tcG9uZW50VHlwZTogVHlwZTxhbnk+LFxuICAgICAgICBjb25maWc6IER5bmFtaWNDb21wb25lbnRDb25maWcsXG4gICAgICAgIHNlcnZpY2VzPzogYW55W11cbiAgICApOiBDb21wb25lbnRSZWY8VD4ge1xuXG4gICAgICAgIC8vIER5bmFtaWNhbGx5IGluamVjdCBzZXJ2aWNlcyB0byBjb21wb25lbnRcbiAgICAgICAgY29uc3QgY29uZmlnTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgaWYgKHNlcnZpY2VzKSB7XG4gICAgICAgICAgICBzZXJ2aWNlcy5mb3JFYWNoKHNlcnZpY2UgPT4gY29uZmlnTWFwLnNldChzZXJ2aWNlLmNvbnN0cnVjdG9yLCBzZXJ2aWNlKSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXBhcmUgY29tcG9uZW50XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRUeXBlKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUobmV3IER5bmFtaWNDb21wb25lbnRJbmplY3Rvcih0aGlzLmluamVjdG9yLCBjb25maWdNYXApKTtcbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAgIC8vIEFzc2lnbiBjb21wb25lbnQgYXR0cmlidXRlc1xuICAgICAgICBjb25zdCBjb25maWdPYmogPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgICAgICBPYmplY3Qua2V5cyhjb25maWdPYmopLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdkYXRhJykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZVtrZXldID0gY29uZmlnT2JqW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY2hpbGRDb21wb25lbnRUeXBlID0gY29udGVudFR5cGU7XG5cbiAgICAgICAgLy8gUmVuZGVyIGNvbXBvbmVudFxuICAgICAgICBjb25zdCBjb21wb25lbnRFbCA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKGNvbmZpZ09iai5jb250YWluZXIgIT09ICdib2R5Jykge1xuICAgICAgICAgICAgY29uZmlnT2JqLmNvbnRhaW5lci5hcHBlbmRDaGlsZChjb21wb25lbnRFbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbXBvbmVudEVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb21wb25lbnRSZWY7XG4gICAgfVxuXG4gICAgLyoqIEZ1bmN0aW9uIHRoYXQgZGVzdHJveXMgZHluYW1pYyBjb21wb25lbnQgKi9cbiAgICBwdWJsaWMgZGVzdHJveUNvbXBvbmVudChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB9XG5cbn1cbiJdfQ==