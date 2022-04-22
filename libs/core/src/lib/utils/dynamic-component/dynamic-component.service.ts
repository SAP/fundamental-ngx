import {
    ComponentFactoryResolver,
    Injectable,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
    TemplateRef,
    Type,
    Compiler,
    NgModuleFactory,
    ViewContainerRef
} from '@angular/core';
import { DynamicComponentInjector } from './dynamic-component-injector';
import { DynamicComponentConfig } from './dynamic-component-config';

/**
 * Service used to dynamically generate components like dialogs/alerts/notifications
 */
@Injectable()
export class DynamicComponentService {
    /** @hidden */
    constructor(
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _applicationRef: ApplicationRef,
        private readonly _injector: Injector,
        private readonly _compiler: Compiler
    ) {}

    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param content Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param inject  enables to provide preconfigured component injector and dependencies
     */
    public createDynamicComponent<T>(
        content: TemplateRef<any> | Type<any> | string | Record<string, any>,
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

    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param content Type of the component content
     * @param moduleType Type of module that should be compiled.
     * @param componentType Type of component that should be rendered.
     * @param containerRef The container that the dynamic component is appended to.
     * @param injector enables to provide preconfigured component injector
     */
    async createDynamicModule<M, C>(
        content: TemplateRef<any> | Type<any> | string | Record<string, any>,
        moduleType: Type<M> | NgModuleFactory<M>,
        componentType: Type<C>,
        containerRef: ViewContainerRef,
        injector?: Injector
    ): Promise<ComponentRef<C>> {
        const moduleFactory =
            moduleType instanceof NgModuleFactory ? moduleType : await this._compiler.compileModuleAsync<M>(moduleType);
        const moduleRef = moduleFactory.create(injector || this._injector);
        const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(componentType);

        containerRef.clear();

        const componentRef: ComponentRef<C> = containerRef.createComponent(componentFactory);

        this._passExternalContent<C>(componentRef, content);

        return componentRef;
    }

    /** Function that destroys dynamic component */
    public destroyComponent(componentRef: ComponentRef<any>): void {
        this._applicationRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

    private _createDependencyMap(services: any[] = []): WeakMap<any, any> {
        const dependencyMap = new WeakMap();
        services.filter((service) => !!service).forEach((service) => dependencyMap.set(service.constructor, service));
        return dependencyMap;
    }

    private _attachToContainer<V>(componentRef: ComponentRef<V>, config: DynamicComponentConfig): void {
        const configObj = Object.assign({}, config);
        const componentEl = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (configObj.container !== 'body') {
            configObj.container?.appendChild(componentEl);
        } else {
            document.body.appendChild(componentEl);
        }
    }

    private _createComponent<V>(
        componentType: Type<V>,
        dependenciesMap: WeakMap<any, any>,
        injector?: Injector
    ): ComponentRef<V> {
        const dynamicComponentInjector = new DynamicComponentInjector(injector || this._injector, dependenciesMap);
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = componentFactory.create(dynamicComponentInjector);
        this._applicationRef.attachView(componentRef.hostView);
        return componentRef;
    }

    private _passExternalContent<V>(
        componentRef: ComponentRef<V>,
        content: TemplateRef<any> | Type<any> | string | Record<string, any>
    ): void {
        if (Object.prototype.hasOwnProperty.call(componentRef.instance, 'childContent')) {
            (componentRef.instance as any).childContent = content;
        }
    }
}
