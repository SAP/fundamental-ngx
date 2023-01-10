import { InjectionToken } from '@angular/core';

export type Libraries = 'core' | 'platform' | 'datetime-adapter' | 'fn' | 'cx';

export const CURRENT_LIB = new InjectionToken<Libraries>('Current Library');
