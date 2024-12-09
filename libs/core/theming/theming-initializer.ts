import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { ThemingService } from './theming.service';

/**
 * Initializes theming service
 */
export function themingInitializer(): EnvironmentProviders {
    return provideAppInitializer(() => {
        const initializerFn = (() => {
            const themingService = inject(ThemingService);
            return () => themingService.init();
        })();
        return initializerFn();
    });
}
