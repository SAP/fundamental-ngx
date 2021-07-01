import { InjectionToken } from '@angular/core';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

export const MOBILE_CONFIG_TEST_TOKEN = new InjectionToken<MobileModeConfig>('TEST PURPOSES ONLY');
