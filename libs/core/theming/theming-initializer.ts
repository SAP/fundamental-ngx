import { APP_INITIALIZER, FactoryProvider, inject } from '@angular/core';
import { ThemingService } from './theming.service';

/**
 * Initializes theming service
 */
export function themingInitializer(): FactoryProvider {
    return {
        provide: APP_INITIALIZER,
        useFactory: () => {
            const themingService = inject(ThemingService);
            return () => themingService.init();
        },
        multi: true
    };
}
