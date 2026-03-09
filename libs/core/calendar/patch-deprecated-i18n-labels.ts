import { computed, inject, Signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FdLanguage } from '@fundamental-ngx/i18n';
import { CalendarI18nLabels } from './i18n/calendar-i18n-labels';

/**
 * Use deprecated `CalendarI18nLabels` to patch `FD_LANGUAGE_SIGNAL` signal
 */
export function patchDeprecatedI18nLabels(): Signal<FdLanguage> {
    const deprecatedSymbol = inject(CalendarI18nLabels, { optional: true });
    if (deprecatedSymbol) {
        const parentSignal = inject(FD_LANGUAGE_SIGNAL, { skipSelf: true });
        return computed(() => {
            const existingLang = parentSignal();
            return {
                ...existingLang,
                coreCalendar: {
                    ...existingLang.coreCalendar,
                    ...deprecatedSymbol
                }
            } as FdLanguage;
        });
    }
    return inject(FD_LANGUAGE_SIGNAL, { skipSelf: true });
}
