import { ComponentRef, EmbeddedViewRef, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { DynamicComponentConfig, DynamicComponentInjector } from '@fundamental-ngx/core';

/**
 * Service used to dynamically generate components like dialogs/alerts/notifications/popovers
 */
@Injectable()
export class CdkDynamicComponentService {


    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param content Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param inject  enables to provide preconfigured component injector and dependencies
     */
    public createDynamicComponent<T>(
        content: TemplateRef<any> | Type<any> | string | Object,
        componentType: Type<T>,
        config: DynamicComponentConfig,
        inject: { injector?: Injector; services?: any[] } = {}
    ): ComponentRef<T> {
        const { injector, services } = inject;
        const dependenciesMap = this._createDependencyMap(services);
        const componentRef = this._createComponent<T>(componentType, dependenciesMap, injector);
        this._passExternalContent<T>(componentRef, content);
        this._attachToContainer<T>(componentRef, config);

        return componentRef;
    }

    /** Function that destroys dynamic component */
    public destroyComponent(componentRef: ComponentRef<any>): void {
        this._applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    private _createDependencyMap(services: any[] = []): WeakMap<any, any> {
        const dependencyMap = new WeakMap();
        services
            .filter(service => !!service)
            .forEach((service) => dependencyMap.set(service.constructor, service));
        return dependencyMap;
    }

    private _attachToContainer<V>(componentRef: ComponentRef<V>, config: DynamicComponentConfig): void {
        const configObj = Object.assign({}, config);
        const componentEl = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        } else {
            document.body.appendChild(componentEl);
        }
    }

    private _createComponent<V>(
        componentType: Type<V>,
        dependenciesMap: WeakMap<any, any>,
        injector: Injector
    ): ComponentRef<V> {
        const dynamicComponentInjector = new DynamicComponentInjector(injector || this._injector, dependenciesMap);
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = componentFactory.create(dynamicComponentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return componentRef;
    }

    private _passExternalContent<V>(
        componentRef: ComponentRef<V>,
        content: TemplateRef<any> | Type<any> | string | Object
    ): void {
        if (componentRef.instance.hasOwnProperty('childContent')) {
            (componentRef.instance as any).childContent = content;
        }
    }
}
