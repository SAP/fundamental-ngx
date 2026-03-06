import { computed, FactoryProvider, Signal, SkipSelf } from '@angular/core';
import { FdLanguage, FdLanguagePatch, FlatFdLanguage } from '../models';
import { flattenTranslations } from './flatten-translations';
import { flatToHierarchy } from './load-json';
import { FD_LANGUAGE_SIGNAL } from './tokens';

export const patchedObj = (
    lang: FdLanguage,
    patch: FdLanguagePatch | ((lang: FdLanguage) => FdLanguagePatch)
): FdLanguagePatch => (typeof patch === 'function' ? patch(lang) : patch);

/**
 * DI utility function that allows overriding `FD_LANGUAGE_SIGNAL` injection token with a patched language.
 *
 * **Modern signal-based API** - Returns a computed signal that reacts to parent language changes.
 *
 * @param languagePatch - Part of the language object to be overridden, or a function that returns such object and receives existing language as a parameter
 *
 * @example
 * ```typescript
 * import { patchLanguage } from '@fundamental-ngx/i18n';
 *
 * @Component({
 *    selector: 'my-component',
 *    template: '{{ ('platformTextarea.label' | fdTranslate)() }}',
 *    standalone: true,
 *    providers: [
 *         patchLanguage({
 *             // Partially override translations for this component
 *             // Overriding only 3 out of all translation strings for textarea here
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
 *
 * **Function patch for dynamic patching:**
 * ```typescript
 * providers: [
 *     patchLanguage((lang) => ({
 *         platformButton: {
 *             save: lang.platformButton.save.toUpperCase() // Transform parent value
 *         }
 *     }))
 * ]
 * ```
 */
export function patchLanguage(
    languagePatch: FdLanguagePatch | ((lang: FdLanguage) => FdLanguagePatch)
): FactoryProvider {
    return {
        provide: FD_LANGUAGE_SIGNAL,
        useFactory: (parentLangSignal: Signal<FdLanguage>) =>
            computed(() => {
                const lang = parentLangSignal();
                const original = flattenTranslations(lang) as FlatFdLanguage;
                const patch = flattenTranslations(patchedObj(lang, languagePatch));
                return flatToHierarchy({
                    ...original,
                    ...patch
                });
            }),
        deps: [[new SkipSelf(), FD_LANGUAGE_SIGNAL]]
    };
}
