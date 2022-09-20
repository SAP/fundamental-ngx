import { INJECTOR, Injector, Provider } from '@angular/core';

/**
 * Creates provider for ConsumerClass
 */
export function consumerProviderFactory<T = any>(
    ConsumerClass: new (injector: Injector, additionalConfig: any | undefined) => T,
    providedConfiguration?: any
): Provider {
    return {
        provide: ConsumerClass,
        useFactory: (injector: Injector) => new ConsumerClass(injector, providedConfiguration),
        deps: [INJECTOR]
    };
}
