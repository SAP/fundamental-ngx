import { DoBootstrap, Injector, NgModule, Type } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Subject } from 'rxjs';
import {
    ComponentNgElementStrategyFactory,
    FdWebComponent
} from './custom-element-resolver/component-factory-strategy';

export interface WebComponentOptions {
    selector: string;
}

export const DirectivesRegistry = new Map<string, Type<any>>();

@NgModule({
    imports: [BrowserModule],
    exports: []
})
export abstract class BaseWebComponentModule implements DoBootstrap {
    /**
     * Array of declared components that support web component wrapping
     */
    declarations: Type<any>[];

    /** @hidden */
    protected constructor(protected injector: Injector) {}

    /** @hidden */
    ngDoBootstrap(): void {
        this.declarations.forEach((declaration) => {
            this.generateWebComponent(declaration);
        });
    }

    /**
     * Method for automatic web component generation
     * @param component Component to wrap
     */
    protected generateWebComponent(component: Type<any>): void {
        if (!this.isWebComponent(component)) {
            return;
        }

        if (customElements.get(component.prototype.__fdWebComponentSelector)) {
            return;
        }

        const customElementConfig = {
            injector: this.injector,
            strategyFactory: new ComponentNgElementStrategyFactory(component, this.injector)
        };

        const element = createCustomElement(component, customElementConfig);
        customElements.define(component.prototype.__fdWebComponentSelector, element);
    }

    /**
     * Method for checking whether the component supports being wrapped as a web component
     * @param component Angular Component
     */
    protected isWebComponent(component: any): component is FdWebComponent {
        return !!component.prototype.__fdWebComponentSelector;
    }
}

export async function makeAngularWebComponent(module: Type<any>): Promise<void> {
    try {
        await platformBrowserDynamic().bootstrapModule(module);
    } catch (e) {
        console.error(e);
    }

    // WebComponentInitializerModule['ɵmod'].imports = [BrowserModule];
}

export function WebComponent(webComponentOptions: WebComponentOptions): (constructor: Type<any>) => void {
    return function (constructor) {
        constructor.prototype['__fdWebComponentSelector'] = webComponentOptions.selector;
        defineLifecycle(constructor);
    };
}

export function WebDirective(webDirectiveOptions: WebComponentOptions): (constructor: Type<any>) => void {
    return function (constructor) {
        constructor.prototype['__fdWebDirectiveSelector'] = webDirectiveOptions.selector;
        DirectivesRegistry.set(webDirectiveOptions.selector, constructor);
    };
}

/**
 * Adds lifecycle hooks for later usage.
 * @param constructor
 */
export function defineLifecycle(constructor: any): void {
    if (!Object.getOwnPropertyDescriptor(constructor.prototype, '__onDestroy$')) {
        Object.defineProperty(constructor.prototype, '__onDestroy$', { value: new Subject<void>() });

        constructor.prototype.__onDestroy = (): void => {
            constructor.prototype.__onDestroy$.next();
            constructor.prototype.__onDestroy$.complete();
        };
    }

    if (!Object.getOwnPropertyDescriptor(constructor, '__element')) {
        Object.defineProperty(constructor, '__element$', { value: new Subject<Element>() });
        Object.defineProperty(constructor, '__element', {
            get() {
                return this.__element$.asObservable();
            },
            set(value) {
                this.__element$.next(value);
            }
        });
    }
}
