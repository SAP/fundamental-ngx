import { inject } from '@angular/core';
import { FD_LANGUAGE, FdLanguage } from '@fundamental-ngx/i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DynamicPageConfig } from './dynamic-page.config';

/**
 * Patch header i18n texts
 */
export function patchHeaderI18nTexts(config?: DynamicPageConfig): Observable<FdLanguage> {
    const lang$ = inject(FD_LANGUAGE, { skipSelf: true });
    if (config) {
        return lang$.pipe(
            map((lang) => ({
                ...lang,
                coreDynamicPage: {
                    ...config
                }
            }))
        );
    }
    return lang$;
}
