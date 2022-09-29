import { Injector, Type } from '@angular/core';
import { ComponentNgElementStrategy } from './custom-element-resolver/component-factory-strategy';

export interface WebQueryValue {
    value: any;
    options: WebComponentQueryOptions;
}

export const WebQueryRegistry: Map<Type<any>, { [key: string]: WebQueryValue }> = new Map();

export interface WebComponentQueryOptions {
    read?: 'element' | 'component';
}

export function WebComponentQuery(value: any, options: WebComponentQueryOptions = { read: 'component' }): any {
    return function (target: any, propertyKey: string) {
        const existingRegistry = WebQueryRegistry.get(target.constructor) || {};

        existingRegistry[propertyKey] = {
            value,
            options
        };

        WebQueryRegistry.set(target.constructor, existingRegistry);

        return;
        //
        // target['__fdWebComponentQueries'] = target['__fdWebComponentQueries'] || {};
        // target['__fdWebComponentQueries'][propertyKey] = {
        //     value,
        //     options
        // };

        // Object.defineProperty(target, propertyKey, {
        //     get: () => {
        //         if (!target.constructor.__fdWebComponent) {
        //             return target[`${propertyKey}_shadow`];
        //         }
        //
        //         if (!target[`${propertyKey}_shadow_query_list`]) {
        //             target[`${propertyKey}_shadow_query_list`] = new QueryList<any>(false);
        //         }
        //
        //         return target[`${propertyKey}_shadow_query_list`];
        //     },
        //     set: (setValue: any) => {
        //         if (target.constructor.__fdWebComponent) {
        //             return;
        //         }
        //         target[`${propertyKey}_shadow`] = setValue;
        //     }
        // });
        //
        // function notify(element: HTMLElement): void {
        //
        //     const root = element.shadowRoot ? element.shadowRoot : element;
        //
        //     const smt: QueryList<any> = target[propertyKey];
        //
        //     const items = getItems(root, value)
        //         .map((item) => {
        //             if (options.read === 'component') {
        //                 return item._ngElementStrategy ? item._ngElementStrategy.componentRef.instance : null;
        //             }
        //
        //             return item;
        //         }).filter(i => !!i);
        //
        //     // return;
        //
        //     if (equal(smt.toArray(), items)) {
        //         return;
        //     }
        //
        //     smt.reset(items);
        //     smt.notifyOnChanges();
        // }
        //
        // /**
        //  * Searches for the elements that fits the selector conditions
        //  * @param root Root element to search in
        //  * @param selector Either a string (Query Selector), or a Type.
        //  */
        // function getItems(root: HTMLElement | ShadowRoot, selector: string | Type<any>): Element[] | Type<any>[] {
        //     if (typeof selector === 'string') {
        //         return Array.from(root.querySelectorAll(selector));
        //     }
        //
        //     // Go through each item and check if it's the needed class
        //     const elements: FdWebComponentAlt[] = [];
        //
        //     root.querySelectorAll('*').forEach((element) => {
        //         if (!isFdWebComponentAlt(element)) {
        //             return;
        //         }
        //
        //         if (element.__fdInjector.get(selector, null, 2)) {
        //             elements.push(element);
        //         }
        //     });
        //
        //     return elements;
        // }
        //
        // defineLifecycle(target.constructor);
        //
        // if (target.constructor.__element) {
        //     target.constructor.__element.subscribe((element: HTMLElement) => {
        //
        //         notify(element);
        //
        //         const observer = new MutationObserver(() => {
        //             notify(element);
        //         });
        //
        //         const config = {
        //             attributes: true,
        //             childList: true,
        //             subtree: true
        //         };
        //
        //         observer.observe(element.shadowRoot ? element.shadowRoot : element, config);
        //     });
        // }
    };
}

export interface FdWebComponentAlt extends Element {
    __fdInjector: Injector;
    _ngElementStrategy: ComponentNgElementStrategy;
    __fdWebComponentSelector: string;
}

export function isFdWebComponentAlt(element: Element): element is FdWebComponentAlt {
    return !!element['__fdInjector'] && !!element['_ngElementStrategy'];
}
