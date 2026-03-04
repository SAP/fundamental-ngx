import { computed, inject, Signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FdLanguage } from '@fundamental-ngx/i18n';
import { DynamicPageConfig } from './dynamic-page.config';

/**
 * Patch header i18n texts
 */
export function patchHeaderI18nTexts(config?: DynamicPageConfig): Signal<FdLanguage> {
    const langSignal = inject(FD_LANGUAGE_SIGNAL, { skipSelf: true });
    if (config) {
        return computed(
            () =>
                ({
                    ...langSignal(),
                    coreDynamicPage: {
                        ...config
                    }
                }) as FdLanguage
        );
    }
    return langSignal;
}
