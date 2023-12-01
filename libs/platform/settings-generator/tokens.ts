import { InjectionToken } from '@angular/core';
import { SettingsConfig } from './models/settings-config.model';
import { SettingsGenerator } from './models/settings-generator.model';

export const FDP_SETTINGS_GENERATOR_CONFIG = new InjectionToken<SettingsConfig>('FdpSettingsGeneratorConfig');
export const FDP_SETTINGS_GENERATOR = new InjectionToken<SettingsGenerator>('FdpSettingsGenerator');
