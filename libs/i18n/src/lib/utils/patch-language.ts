import { FactoryProvider, SkipSelf } from '@angular/core';
import { cloneDeep, merge } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FdLanguage, FdLanguagePatch } from '../models';
import { FD_LANGUAGE } from './tokens';

/**
 * DI utility function, that allows to override `FD_LANGUAGE` injection token with part of the language object, that is used globally
 * @param languagePatch part of the language object to be overriden, or a function that returns such object and receives existing language as a parameter
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
 *             // overriding only 3 out of all translation strings for textarea here
 *             // also function can be used to provide complex translation logic
 *             platformTextarea: {
 *                 counterMessageCharactersRemainingSingular: 'You can type 1 more character',
 *                 counterMessageCharactersRemainingPlural: 'You can type {{ count }} more characters',
 *                 counterMessageCharactersOverTheLimitPlural: (params) => {
 *                      if (params.count === 3) {
 *                          return `You can type three more characters`;
 *                      }
 *                      return `You can type ${params.count} more characters`;
 *                 }
 *             }
 *         })
 *     ]
 * })
 * export class SomeComponent {}
 * ```
 */
export function patchLanguage(
    languagePatch: FdLanguagePatch | ((lang: FdLanguage) => FdLanguagePatch)
): FactoryProvider {
    return {
        provide: FD_LANGUAGE,
        useFactory: (lang$: Observable<FdLanguage>) =>
            lang$.pipe(
                map((lang) =>
                    merge(cloneDeep(lang), typeof languagePatch === 'function' ? languagePatch(lang) : languagePatch)
                )
            ),
        deps: [[new SkipSelf(), FD_LANGUAGE]]
    };
}
