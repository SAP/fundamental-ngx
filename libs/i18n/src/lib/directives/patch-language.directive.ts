import { computed, Directive, inject, input, Signal } from '@angular/core';
import { merge } from '@fundamental-ngx/cdk/utils';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguagePatch } from '../models';
import { patchedObj } from '../utils';
import { FD_LANGUAGE_SIGNAL } from '../utils/tokens';

/**
 * Directive that patches the language for child components using signal composition.
 *
 * @example
 * ```html
 * <!-- Partial override for specific translations -->
 * <div [fdPatchLanguage]="{ platformButton: { save: 'Custom Save' } }">
 *   <button>{{ ('platformButton.save' | fdTranslate)() }}</button>
 * </div>
 *
 * <!-- Dynamic patch with function -->
 * <div [fdPatchLanguage]="patchFn">
 *   <!-- Child components get patched language -->
 * </div>
 * ```
 *
 * **How it works:**
 * 1. Injects parent language signal with SkipSelf
 * 2. Creates computed signal that merges parent + patch
 * 3. Provides the computed signal to children
 */
@Directive({
    selector: '[fdPatchLanguage]',
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useFactory: () => {
                const directive = inject(FdPatchLanguageDirective);
                return directive._patchedLanguageSignal;
            }
        }
    ],
    standalone: true
})
export class FdPatchLanguageDirective {
    /** Part of the language object to be overridden */
    readonly fdPatchLanguage = input.required<FdLanguagePatch | ((lang: FdLanguage) => FdLanguagePatch)>();

    /** @hidden Computed signal that merges parent language + patch */
    readonly _patchedLanguageSignal: Signal<FdLanguage> = computed(() => {
        const parentLang = this._parentLangSignal?.() || FD_LANGUAGE_ENGLISH;
        const patch = this.fdPatchLanguage();

        // Clone parent to avoid mutations
        const clonedParent = structuredClone(parentLang);

        // Apply patch
        const patchObj = patchedObj(parentLang, patch);

        // Merge and return
        return merge(clonedParent, patchObj as Partial<FdLanguage>);
    });

    /** @hidden Parent language signal (skip self to get parent's) */
    private readonly _parentLangSignal = inject(FD_LANGUAGE_SIGNAL, { skipSelf: true, optional: true });
}
