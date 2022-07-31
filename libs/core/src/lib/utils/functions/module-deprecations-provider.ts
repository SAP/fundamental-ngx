import { FactorySansProvider, Provider } from '@angular/core';
import { ModuleDeprecations } from '../tokens/module-deprecations.token';

export function moduleDeprecationsProvider(classRef: any): Provider {
    return {
        provide: ModuleDeprecations,
        useClass: classRef,
        multi: true
    };
}

export function moduleDeprecationsFactory(factory: FactorySansProvider): Provider {
    return {
        provide: ModuleDeprecations,
        ...factory,
        multi: true
    };
}
