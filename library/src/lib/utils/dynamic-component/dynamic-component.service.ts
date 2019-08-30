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
import { DynamicComponentRef } from './dynamic-component-ref';
import { DynamicComponentConfig } from './dynamic-component-config';

export interface DynamicComponentResult<T> {
    component: ComponentRef<T>,
    dynamicComponentReference: DynamicComponentRef
}

/**
 * Service used to dynamically generate a modal.
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
     * Function that creates dynamic component and injects DynamicComponentRef service to allow communication between component and outside
     */
    public createDynamicComponent<T>(
        contentType: TemplateRef<any> | Type<any> | string,
        componentType: Type<any>,
        config: DynamicComponentConfig
    ): DynamicComponentResult<T> {

        // Setup injectable data
        const configMap = new WeakMap();
        const popupRef = new DynamicComponentRef();
        popupRef.data = config.data;
        configMap.set(DynamicComponentRef, popupRef);

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

        return {component: componentRef, dynamicComponentReference: popupRef};
    }

    /** Function that destroys dynamic component */
    public destroyComponent(componentRef: ComponentRef<any>): void {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }

}
