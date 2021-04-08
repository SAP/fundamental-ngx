import { InjectionToken } from '@angular/core';

export const CONFIG_URL = new InjectionToken<string>('appShell.configUrl');
export const IS_APPSHELL_STANDALONE = new InjectionToken<string>('appShell.isStandalone');
export const REMOTE_BASE_URL = new InjectionToken<string>('appShell.remoteBaseUrl');
