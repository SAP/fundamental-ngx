import {
    ComponentFactoryResolver,
    Injectable,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
    TemplateRef,
    Type
} from '@angular/core';
import { DynamicComponentInjector } from './dynamic-component-injector';
import { DynamicComponentConfig } from './dynamic-component-config';

/**
 * Service used to dynamically generate components like modals/alerts/notifications
 */
@Injectable()
export class DynamicComponentService {

    /** @hidden */
    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _applicationRef: ApplicationRef,
        private _injector: Injector
    ) {}

    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param content Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param services Services that will be injected to the component.
     */
    public createDynamicComponent<T>(
        content: TemplateRef<any> | Type<any> | string | Object,
        componentType: Type<T>,
        config: DynamicComponentConfig,
        services?: any[]
    ): ComponentRef<T> {

        const dependenciesMap = this._createDependencyMap(services);
        const componentRef = this._createComponent<T>(componentType, dependenciesMap);
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
        services.forEach(service => dependencyMap.set(service.constructor, service));
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

    private _createComponent<V>(componentType: Type<V>, dependenciesMap: WeakMap<any, any>): ComponentRef<V> {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = componentFactory.create(new DynamicComponentInjector(this._injector, dependenciesMap));
        this._applicationRef.attachView(componentRef.hostView);
        return componentRef;
    }

    private _passExternalContent<V>(componentRef: ComponentRef<V>, content: TemplateRef<any> | Type<any> | string | Object) {
        if (componentRef.instance.hasOwnProperty('childContent')) {
            (componentRef.instance as any).childContent = content;
        }
    }
}
