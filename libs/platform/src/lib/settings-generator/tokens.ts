import { InjectionToken } from '@angular/core';
import { SettingsConfig } from './models/settings-config.model';

export const FDP_SETTINGS_GENERATOR_CONFIG = new InjectionToken<SettingsConfig>('FdpSettingsGeneratorConfig');
