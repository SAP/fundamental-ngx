import { Provider, SkipSelf } from '@angular/core';
import { cloneDeep, merge } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FdLanguage } from '../models';
import { FD_LANGUAGE } from './tokens';

type FdLanguagePatch = { [K in keyof FdLanguage]?: Partial<FdLanguage[K]> };

/**
 * DI utility function, that allows to override `FD_LANGUAGE` injection token with part of the language object, that is used globally
 * @param languagePatch part of the language object to be overriden
 *
 * @example
 * ```typescript
 * import { patchLanguage } from '@fundamental-ngx/i18n';
 *
 * @Component({
 *    ...
 *    providers: [
 *         patchLanguage({
 *             // it's possible to partially override translations for component
 *             // overriding only 2 out of all translation strings for textarea here
 *             platformTextarea: {
 *                 counterMessageCharactersRemainingSingular: 'You can type 1 more character',
 *                 counterMessageCharactersRemainingPlural: 'You can type {{ count }} more characters'
 *             }
 *         })
 *     ]
 * })
 * export class SomeComponent {}
 * ```
 */
export function patchLanguage(languagePatch: FdLanguagePatch): Provider {
    return {
        provide: FD_LANGUAGE,
        useFactory: (lang$: Observable<FdLanguage>) => lang$.pipe(map((lang) => merge(cloneDeep(lang), languagePatch))),
        deps: [[new SkipSelf(), FD_LANGUAGE]]
    };
}
