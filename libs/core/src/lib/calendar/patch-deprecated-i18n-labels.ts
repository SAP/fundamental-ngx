import { inject } from '@angular/core';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { Observable, map, startWith, switchMap, of } from 'rxjs';
import { CalendarI18nLabels } from './i18n/calendar-i18n-labels';

/**
 * Use deprecated `CalendarI18nLabels` to patch `FD_LANGUAGE` observable
 */
export function patchDeprecatedI18nLabels(): Observable<FdLanguage> {
    const deprecatedSymbol = inject(CalendarI18nLabels, { optional: true });
    if (deprecatedSymbol) {
        return inject(FD_LANGUAGE, { skipSelf: true }).pipe(
            switchMap((existingLang) => {
                if (!deprecatedSymbol.labelsChange) {
                    return of(existingLang);
                }
                return deprecatedSymbol.labelsChange.pipe(
                    startWith(null),
                    map(() => existingLang)
                );
            }),
            map((existingLang) => ({
                ...existingLang,
                coreCalendar: {
                    ...existingLang.coreCalendar,
                    ...deprecatedSymbol
                }
            }))
        );
    }
    return inject(FD_LANGUAGE, { skipSelf: true });
}
