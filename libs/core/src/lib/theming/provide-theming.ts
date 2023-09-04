import { Provider } from '@angular/core';
import { ThemingConfig } from './interfaces/theming-config.interface';
import { ThemingService } from './theming.service';
import { THEMING_CONFIG_TOKEN } from './tokens';

/**
 * Provides theming configuration
 * @param config
 */
export function provideTheming(config: Partial<ThemingConfig> = {}): Provider[] {
    return [
        ThemingService,
        {
            provide: THEMING_CONFIG_TOKEN,
            useValue: config
        }
    ];
}
