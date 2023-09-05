import { InjectionToken, ValueProvider } from '@angular/core';

export const HAS_I18N = new InjectionToken<boolean>('Information whether the current component has i18n variables', {
    factory: () => false
});

export function hasI18nProvider(hasI18n: boolean): ValueProvider {
    return { provide: HAS_I18N, useValue: hasI18n };
}
