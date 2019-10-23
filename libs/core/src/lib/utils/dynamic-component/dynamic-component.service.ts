import {
    ComponentFactoryResolver,
    Injectable,
    ApplicationRef,
    Injector,
    EmbeddedViewRef,
    ComponentRef,
    Type, TemplateRef
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
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    /**
     * Function that creates dynamic component and injects services to allow communication between component and outside
     * @param contentType Type of the component content
     * @param componentType Type of component that should be rendered.
     * @param config Configuration that will be passed to the component.
     * @param services Services that will be injected to the component.
     */
    public createDynamicComponent<T>(
        contentType: TemplateRef<any> | Type<any> | string | Object,
        componentType: Type<any>,
        config: DynamicComponentConfig,
        services?: any[]
    ): ComponentRef<T> {

        // Dynamically inject services to component
        const configMap = new WeakMap();
        if (services) {
            services.forEach(service => configMap.set(service.constructor, service))
        }

        // Prepare component
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        const componentRef = componentFactory.create(new DynamicComponentInjector(this.injector, configMap));
        this.appRef.attachView(componentRef.hostView);

        // Assign component attributes
        const configObj = Object.assign({}, config);
        Object.keys(configObj).forEach(key => {
            if (key !== 'data') {
                componentRef.instance[key] = configObj[key];
            }
        });
        componentRef.instance.childComponentType = contentType;

        // Render component
        const componentEl = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (configObj.container !== 'body') {
            configObj.container.appendChild(componentEl);
        } else {
            document.body.appendChild(componentEl);
        }

        return componentRef;
    }

    /** Function that destroys dynamic component */
    public destroyComponent(componentRef: ComponentRef<any>): void {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

}
