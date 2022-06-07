import { InjectionToken } from '@angular/core';
import { ThemingConfig } from './interfaces/theming-config.interface';

export const THEMING_CONFIG_TOKEN = new InjectionToken<Partial<ThemingConfig>>('FdThemingConfig');
