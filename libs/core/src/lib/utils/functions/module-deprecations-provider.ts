import { Provider } from '@angular/core';
import { ModuleDeprecations } from '../tokens/module-deprecations.token';

export function moduleDeprecationsProvider(classRef: any): Provider {
    return {
        provide: ModuleDeprecations,
        useClass: classRef,
        multi: true
    };
}
