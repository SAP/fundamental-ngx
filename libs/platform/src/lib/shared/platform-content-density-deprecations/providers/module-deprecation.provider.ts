import { Provider } from '@angular/core';
import { DeprecatedContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { moduleDeprecationsFactory } from '@fundamental-ngx/core/utils';

export function platformContentDensityModuleDeprecationsProvider(selectorBase: string): Provider {
    return moduleDeprecationsFactory({
        useFactory: () => {
            const deprecation = new DeprecatedContentDensityDirective();
            deprecation.selectorBase = selectorBase;
            return deprecation;
        }
    });
}
