import { ComponentFactoryResolver, ApplicationRef, Injector, ComponentRef, Type, TemplateRef } from '@angular/core';
import { DynamicComponentConfig } from './dynamic-component-config';
/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
export declare class DynamicComponentService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    /** @hidden */
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param contentType Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param services Services that will be injected to the component.
     */
    createDynamicComponent<T>(contentType: TemplateRef<any> | Type<any> | string, componentType: Type<any>, config: DynamicComponentConfig, services?: any[]): ComponentRef<T>;
    /** Function that destroys dynamic component */
    destroyComponent(componentRef: ComponentRef<any>): void;
}
