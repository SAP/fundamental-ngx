import { InjectionToken, Provider } from '@angular/core';

export const CURRENT_COMPONENT = new InjectionToken<string>('CURRENT_COMPONENT');

export function currentComponentProvider(component: string): Provider {
    return {
        provide: CURRENT_COMPONENT,
        useValue: component
    };
}
