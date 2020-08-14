import { InjectionToken } from '@angular/core';
import { MobileModeConfig } from '../interfaces/mobile-mode-config';

export const MOBILE_CONFIG_TEST_TOKEN = new InjectionToken<MobileModeConfig>('TEST PURPOSES ONLY');
