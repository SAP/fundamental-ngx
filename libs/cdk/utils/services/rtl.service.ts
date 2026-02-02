import { inject, Injectable, InjectionToken, signal, WritableSignal } from '@angular/core';

/**
 * Default RTL (Right-to-Left) language codes.
 *
 * Note: For Kurdish, we use 'ckb' (Central Kurdish/Sorani) which uses Arabic script.
 * The generic 'ku' code is not included as Kurmanji Kurdish uses Latin script (LTR).
 */
const DefaultRtlLanguages = [
    'ar', // Arabic
    'arc', // Aramaic
    'azb', // South Azerbaijani
    'bal', // Balochi
    'ckb', // Central Kurdish (Sorani)
    'dv', // Divehi (Maldivian)
    'fa', // Persian (Farsi)
    'glk', // Gilaki
    'he', // Hebrew
    'khw', // Khowar
    'ks', // Kashmiri
    'mzn', // Mazanderani
    'nqo', // N'Ko
    'pnb', // Western Punjabi (Shahmukhi)
    'ps', // Pashto
    'sd', // Sindhi
    'syr', // Syriac
    'ug', // Uyghur
    'ur', // Urdu
    'yi' // Yiddish
];

/** Injection token for overriding RTL languages. */
export const RTL_LANGUAGE = new InjectionToken<string[]>('RtlLanguage');

/**
 * Service for managing RTL (Right-to-Left) state.
 *
 * Uses signals for reactive state management and is fully compatible with zoneless change detection.
 * The language list is used to determine if RTL should be enabled at startup based on the browser's language.
 * Users can override the default RTL languages by providing the `RTL_LANGUAGE` injection token.
 *
 * @example
 * ```typescript
 * // Reading RTL state
 * readonly isRtl = computed(() => this._rtlService.rtl());
 *
 * // Updating RTL state
 * this._rtlService.rtl.set(true);
 * ```
 */
@Injectable()
export class RtlService {
    /**
     * Writable signal for RTL state.
     *
     * Read the current value: `rtl()`
     * Set a new value: `rtl.set(value)`
     * Update based on current value: `rtl.update(current => !current)`
     */
    readonly rtl: WritableSignal<boolean>;

    /**
     * Signal for RTL value.
     * @deprecated Use `rtl()` instead. This alias will be removed in a future version.
     */
    get rtlSignal(): WritableSignal<boolean> {
        return this.rtl;
    }

    /** @hidden */
    private readonly _injectedRtlLanguages = inject(RTL_LANGUAGE, { optional: true });

    constructor() {
        const rtlLanguages = this._injectedRtlLanguages || DefaultRtlLanguages;
        const isRtlLanguage = rtlLanguages.some((language) => navigator.language.includes(language));

        this.rtl = signal(isRtlLanguage);
    }
}
