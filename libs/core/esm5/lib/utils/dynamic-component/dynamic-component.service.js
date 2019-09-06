/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Injectable, ApplicationRef, Injector } from '@angular/core';
import { DynamicComponentInjector } from './dynamic-component-injector';
/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
var DynamicComponentService = /** @class */ (function () {
    /** @hidden */
    function DynamicComponentService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param contentType Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param services Services that will be injected to the component.
     */
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    DynamicComponentService.prototype.createDynamicComponent = /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @template T
     * @param {?} contentType Type of the component content
     * @param {?} componentType Type of component that should be rendered.
     * @param {?} config Configuration that will be passed to the component.
     * @param {?=} services Services that will be injected to the component.
     * @return {?}
     */
    function (contentType, componentType, config, services) {
        // Dynamically inject services to component
        /** @type {?} */
        var configMap = new WeakMap();
        if (services) {
            services.forEach((/**
             * @param {?} service
             * @return {?}
             */
            function (service) { return configMap.set(service.constructor, service); }));
        }
        // Prepare component
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        /** @type {?} */
        var componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);
        // Assign component attributes
        /** @type {?} */
        var configObj = Object.assign({}, config);
        Object.keys(configObj).forEach((/**
         * @param {?} key
         * @return {?}
         */
        function (key) {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        }));
        componentRef.instance.childComponentType = contentType;
        // Render component
        /** @type {?} */
        var componentEl = (/** @type {?} */ (((/** @type {?} */ (componentRef.hostView))).rootNodes[0]));
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        }
        else {
            document.body.appendChild(componentEl);
        }
        return componentRef;
    };
    /** Function that destroys dynamic component */
    /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    DynamicComponentService.prototype.destroyComponent = /**
     * Function that destroys dynamic component
     * @param {?} componentRef
     * @return {?}
     */
    function (componentRef) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    };
    DynamicComponentService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DynamicComponentService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return DynamicComponentService;
}());
export { DynamicComponentService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb21wb25lbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0gsd0JBQXdCLEVBQ3hCLFVBQVUsRUFDVixjQUFjLEVBQ2QsUUFBUSxFQUlYLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBTXhFO0lBR0ksY0FBYztJQUNkLGlDQUNZLHdCQUFrRCxFQUNsRCxNQUFzQixFQUN0QixRQUFrQjtRQUZsQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0IsQ0FBQztJQUVKOzs7Ozs7T0FNRzs7Ozs7Ozs7OztJQUNJLHdEQUFzQjs7Ozs7Ozs7O0lBQTdCLFVBQ0ksV0FBa0QsRUFDbEQsYUFBd0IsRUFDeEIsTUFBOEIsRUFDOUIsUUFBZ0I7OztZQUlWLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRTtRQUMvQixJQUFJLFFBQVEsRUFBRTtZQUNWLFFBQVEsQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLEVBQTNDLENBQTJDLEVBQUMsQ0FBQTtTQUMzRTs7O1lBR0ssZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQzs7WUFDdkYsWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7WUFHeEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7UUFBQyxVQUFBLEdBQUc7WUFDOUIsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO2dCQUNoQixZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsRUFBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxXQUFXLENBQUM7OztZQUdqRCxXQUFXLEdBQUcsbUJBQUEsQ0FBQyxtQkFBQSxZQUFZLENBQUMsUUFBUSxFQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFlO1FBQy9GLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7WUFDaEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDaEQ7YUFBTTtZQUNILFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVELCtDQUErQzs7Ozs7O0lBQ3hDLGtEQUFnQjs7Ozs7SUFBdkIsVUFBd0IsWUFBK0I7UUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDOztnQkEzREosVUFBVTs7OztnQkFkUCx3QkFBd0I7Z0JBRXhCLGNBQWM7Z0JBQ2QsUUFBUTs7SUF3RVosOEJBQUM7Q0FBQSxBQTdERCxJQTZEQztTQTVEWSx1QkFBdUI7Ozs7OztJQUk1QiwyREFBMEQ7Ozs7O0lBQzFELHlDQUE4Qjs7Ozs7SUFDOUIsMkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgSW5qZWN0YWJsZSxcbiAgICBBcHBsaWNhdGlvblJlZixcbiAgICBJbmplY3RvcixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgQ29tcG9uZW50UmVmLFxuICAgIFR5cGUsIFRlbXBsYXRlUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudEluamVjdG9yIH0gZnJvbSAnLi9keW5hbWljLWNvbXBvbmVudC1pbmplY3Rvcic7XG5pbXBvcnQgeyBEeW5hbWljQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi9keW5hbWljLWNvbXBvbmVudC1jb25maWcnO1xuXG4vKipcbiAqIFNlcnZpY2UgdXNlZCB0byBkeW5hbWljYWxseSBnZW5lcmF0ZSBjb21wb25lbnRzIGxpa2UgbW9kYWxzL2FsZXJ0cy9ub3RpZmljYXRpb25zXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29tcG9uZW50U2VydmljZSB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICAgKSB7fVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCBjcmVhdGVzIGR5bmFtaWMgY29tcG9uZW50IGFuZCBpbmplY3RzIHNlcnZpY2VzIHRvIGFsbG93IGNvbW11bmljYXRpb24gYmV0d2VlbiBjb21wb25lbnQgYW5kIG91dHNpZGVcbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGUgVHlwZSBvZiB0aGUgY29tcG9uZW50IGNvbnRlbnRcbiAgICAgKiBAcGFyYW0gY29tcG9uZW50VHlwZSBUeXBlIG9mIGNvbXBvbmVudCB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC5cbiAgICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24gdGhhdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgY29tcG9uZW50LlxuICAgICAqIEBwYXJhbSBzZXJ2aWNlcyBTZXJ2aWNlcyB0aGF0IHdpbGwgYmUgaW5qZWN0ZWQgdG8gdGhlIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlRHluYW1pY0NvbXBvbmVudDxUPihcbiAgICAgICAgY29udGVudFR5cGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT4gfCBzdHJpbmcsXG4gICAgICAgIGNvbXBvbmVudFR5cGU6IFR5cGU8YW55PixcbiAgICAgICAgY29uZmlnOiBEeW5hbWljQ29tcG9uZW50Q29uZmlnLFxuICAgICAgICBzZXJ2aWNlcz86IGFueVtdXG4gICAgKTogQ29tcG9uZW50UmVmPFQ+IHtcblxuICAgICAgICAvLyBEeW5hbWljYWxseSBpbmplY3Qgc2VydmljZXMgdG8gY29tcG9uZW50XG4gICAgICAgIGNvbnN0IGNvbmZpZ01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIGlmIChzZXJ2aWNlcykge1xuICAgICAgICAgICAgc2VydmljZXMuZm9yRWFjaChzZXJ2aWNlID0+IGNvbmZpZ01hcC5zZXQoc2VydmljZS5jb25zdHJ1Y3Rvciwgc2VydmljZSkpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVwYXJlIGNvbXBvbmVudFxuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50VHlwZSk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEeW5hbWljQ29tcG9uZW50SW5qZWN0b3IodGhpcy5pbmplY3RvciwgY29uZmlnTWFwKSk7XG4gICAgICAgIHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgICAgICAvLyBBc3NpZ24gY29tcG9uZW50IGF0dHJpYnV0ZXNcbiAgICAgICAgY29uc3QgY29uZmlnT2JqID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICAgICAgT2JqZWN0LmtleXMoY29uZmlnT2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnZGF0YScpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Vba2V5XSA9IGNvbmZpZ09ialtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNvbnRlbnRUeXBlO1xuXG4gICAgICAgIC8vIFJlbmRlciBjb21wb25lbnRcbiAgICAgICAgY29uc3QgY29tcG9uZW50RWwgPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGlmIChjb25maWdPYmouY29udGFpbmVyICE9PSAnYm9keScpIHtcbiAgICAgICAgICAgIGNvbmZpZ09iai5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29tcG9uZW50RWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb21wb25lbnRFbCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29tcG9uZW50UmVmO1xuICAgIH1cblxuICAgIC8qKiBGdW5jdGlvbiB0aGF0IGRlc3Ryb3lzIGR5bmFtaWMgY29tcG9uZW50ICovXG4gICAgcHVibGljIGRlc3Ryb3lDb21wb25lbnQoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8YW55Pik6IHZvaWQge1xuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgICAgIGNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgfVxuXG59XG4iXX0=