import { computed, inject, Pipe, PipeTransform, Signal, untracked } from '@angular/core';
import { FdLanguageKeyIdentifier } from '../models';
import { FdLanguageKeyArgs } from '../models/fd-language-key';
import { FD_LANGUAGE_SIGNAL, TranslationResolver } from '../utils';

/**
 * Pure pipe that translates a key to a computed signal string.
 *
 * **IMPORTANT:** This pipe now returns a Signal<string> instead of a plain string.
 * Templates must call the signal to get the value: `{{ ('key' | fdTranslate)() }}`
 *
 * @example
 * ```html
 * <!-- Modern signal-based usage -->
 * <button>{{ ('coreButton.save' | fdTranslate)() }}</button>
 *
 * <!-- With arguments -->
 * <span>{{ ('coreList.itemCount' | fdTranslate: { count: items.length })() }}</span>
 * ```
 *
 * **Migration from Observable-based API:**
 * ```html
 * <!-- Before (Observable-based) -->
 * {{ 'coreButton.save' | fdTranslate }}
 *
 * <!-- After (Signal-based) -->
 * {{ ('coreButton.save' | fdTranslate)() }}
 * ```
 */
@Pipe({
    name: 'fdTranslate',
    pure: true, // Now pure - signal reactivity handles updates
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    /** @hidden */
    private readonly _langSignal = inject(FD_LANGUAGE_SIGNAL);

    /** @hidden */
    private readonly _resolver = new TranslationResolver();

    /**
     * Translate a key with arguments and, optionally, default value.
     *
     * @returns A computed signal that updates when language or arguments change
     */
    transform(
        key: FdLanguageKeyIdentifier | null,
        args?: FdLanguageKeyArgs | Record<string, any>,
        defaultValue = ''
    ): Signal<string> {
        if (!key) {
            // Return constant signal for null key
            return computed(() => defaultValue);
        }

        // Capture args in untracked context to avoid over-reactivity
        const capturedArgs = untracked(() => args);

        // Return computed signal that reacts to language changes
        return computed(() => {
            const lang = this._langSignal();
            return this._resolver.resolve(lang, key, capturedArgs as any) || defaultValue;
        });
    }
}
