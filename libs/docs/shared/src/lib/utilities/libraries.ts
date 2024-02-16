import { InjectionToken } from '@angular/core';

export type Libraries = 'cdk' | 'core' | 'platform' | 'datetime-adapter' | 'cx' | 'btp';

export const CURRENT_LIB = new InjectionToken<Libraries>('Current Library');
