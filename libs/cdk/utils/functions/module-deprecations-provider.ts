import { FactorySansProvider, Provider } from '@angular/core';
import { ModuleDeprecations } from '../tokens/module-deprecations.token';

/** Module deprecations provider */
export function moduleDeprecationsProvider(classRef: any): Provider {
    return {
        provide: ModuleDeprecations,
        useClass: classRef,
        multi: true
    };
}

/** Module deprecations provider factory */
export function moduleDeprecationsFactory(factory: FactorySansProvider): Provider {
    return {
        provide: ModuleDeprecations,
        ...factory,
        multi: true
    };
}
