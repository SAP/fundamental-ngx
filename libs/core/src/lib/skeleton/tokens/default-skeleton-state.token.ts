import { InjectionToken } from '@angular/core';

export const DEFAULT_SKELETON_STATE = new InjectionToken<boolean>('Default global skeleton state', {
    factory: () => false
});
