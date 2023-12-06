import { InjectionToken } from '@angular/core';
import { BaseThemingConfig } from './config';
import { ThemingConfig } from './interfaces/theming-config.interface';

export const THEMING_CONFIG_TOKEN = new InjectionToken<Partial<ThemingConfig>>('FdThemingConfig', {
    factory: () => new BaseThemingConfig()
});
