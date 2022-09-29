import { ComponentFactoryResolver, Injector, Type } from '@angular/core';

export function applyGenericMixins(derivedCtor: any, ...constructors: any[]): void {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            if (name === 'name') {
                return;
            }
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
            );
        });
    });
}

// This can live anywhere in your codebase:
export function applyWebComponentMixins(derivedCtor: any, ...constructors: any[]): void {
    // Create new anonymous class and extend it

    const newderivedCtor = new Function(`return class WebComponent_${derivedCtor.name} {}`)();

    applyGenericMixins(newderivedCtor, derivedCtor);

    derivedCtor = newderivedCtor;

    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype.constructor).forEach((name) => {
            if (name === 'ɵdir') {
                const value = baseCtor.prototype.constructor[name];
                if (value.hostAttrs) {
                    derivedCtor.prototype.constructor['ɵcmp'].hostAttrs = value.hostAttrs;
                }

                if (value.hostBindings) {
                    const oldHostBinding = derivedCtor.prototype.constructor['ɵcmp'].hostBindings;
                    derivedCtor.prototype.constructor['ɵcmp'].hostVars =
                        derivedCtor.prototype.constructor['ɵcmp'].hostVars + value.hostVars;
                    derivedCtor.prototype.constructor['ɵcmp'].hostBindings = (rf: any, ctx: any) => {
                        const ctorCtx = ctx.injector.get(baseCtor);
                        value.hostBindings(rf, ctorCtx);
                        if (oldHostBinding) {
                            oldHostBinding(rf, ctx);
                        }
                    };
                }
            }
        });
    });
}

export function applyModuleMixins(derivedCtor: Type<any>, ...baseCtors: Type<any>[]): void {
    baseCtors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor).forEach((name) => {
            if (name.startsWith('ɵ')) {
                derivedCtor[name] = baseCtor[name];
            }
        });
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    });
}

/**
 * Provide methods for scheduling the execution of a callback.
 */
export const scheduler = {
    /**
     * Schedule a callback to be called after some delay.
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    schedule(taskFn: () => void, delay: number): () => void {
        const id = setTimeout(taskFn, delay);
        return () => clearTimeout(id);
    },

    /**
     * Schedule a callback to be called before the next render.
     * (If `window.requestAnimationFrame()` is not available, use `scheduler.schedule()` instead.)
     *
     * Returns a function that when executed will cancel the scheduled function.
     */
    scheduleBeforeRender(taskFn: () => void): () => void {
        // TODO(gkalpak): Implement a better way of accessing `requestAnimationFrame()`
        //                (e.g. accounting for vendor prefix, SSR-compatibility, etc).
        if (typeof window === 'undefined') {
            // For SSR just schedule immediately.
            return scheduler.schedule(taskFn, 0);
        }

        if (typeof window.requestAnimationFrame === 'undefined') {
            const frameMs = 16;
            return scheduler.schedule(taskFn, frameMs);
        }

        const id = window.requestAnimationFrame(taskFn);
        return () => window.cancelAnimationFrame(id);
    }
};

/**
 * Convert a camelCased string to kebab-cased.
 */
export function camelToDashCase(input: string): string {
    return input.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

/**
 * Check whether the input is an `Element`.
 */
export function isElement(node: Node | null): node is Element {
    return !!node && node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Check whether the input is a function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

/**
 * Convert a kebab-cased string to camelCased.
 */
export function kebabToCamelCase(input: string): string {
    return input.replace(/-([a-z\d])/g, (_, char) => char.toUpperCase());
}

let _matches: (this: any, selector: string) => boolean;

/**
 * Check whether an `Element` matches a CSS selector.
 * NOTE: this is duplicated from @angular/upgrade, and can
 * be consolidated in the future
 */
export function matchesSelector(el: any, selector: string): boolean {
    if (!_matches) {
        const elProto = <any>Element.prototype;
        _matches =
            elProto.matches ||
            elProto.matchesSelector ||
            elProto.mozMatchesSelector ||
            elProto.msMatchesSelector ||
            elProto.oMatchesSelector ||
            elProto.webkitMatchesSelector;
    }
    return el.nodeType === Node.ELEMENT_NODE ? _matches.call(el, selector) : false;
}

/**
 * Test two values for strict equality, accounting for the fact that `NaN !== NaN`.
 */
export function strictEquals(value1: any, value2: any): boolean {
    return value1 === value2 || (value1 !== value1 && value2 !== value2);
}

/** Gets a map of default set of attributes to observe and the properties they affect. */
export function getDefaultAttributeToPropertyInputs(inputs: { propName: string; templateName: string }[]): {
    [key: string]: string;
} {
    const attributeToPropertyInputs: { [key: string]: string } = {};
    inputs.forEach(({ propName, templateName }) => {
        attributeToPropertyInputs[camelToDashCase(templateName)] = propName;
    });

    return attributeToPropertyInputs;
}

/**
 * Gets a component's set of inputs. Uses the injector to get the component factory where the inputs
 * are defined.
 */
export function getComponentInputs(
    component: Type<any>,
    injector: Injector
): { propName: string; templateName: string }[] {
    const componentFactoryResolver: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
    return componentFactory.inputs;
}
