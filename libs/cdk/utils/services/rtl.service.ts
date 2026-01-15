import { inject, Injectable, InjectionToken, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Default list of RTL (Right-to-Left) language codes.
 * These are common language codes that typically require RTL text direction.
 */
const DefaultRtlLanguages = [
    'ar',
    'arc',
    'ckb',
    'dv',
    'fa',
    'ha',
    'he',
    'khw',
    'ks',
    'ku',
    'pnb',
    'ps',
    'sd',
    'ug',
    'ur',
    'yi'
];

/**
 * Injection token for providing custom RTL language codes.
 * Use this to override the default list of RTL languages.
 *
 * @example
 * ```typescript
 * providers: [
 *   { provide: RTL_LANGUAGE, useValue: ['ar', 'he', 'fa'] }
 * ]
 * ```
 */
export const RTL_LANGUAGE = new InjectionToken<string[]>('RtlLanguage');

/**
 * Service for managing right-to-left (RTL) text direction.
 * Provides both legacy BehaviorSubject API and modern signal-based API.
 *
 * @example Modern signal-based usage (recommended):
 * ```typescript
 * export class MyComponent {
 *   private _rtlService = inject(RtlService);
 *   protected readonly isRtl = this._rtlService.rtlSignal;
 * }
 * ```
 */
@Injectable()
export class RtlService {
    /**
     * Signal indicating whether the current direction is RTL.
     * True for right-to-left, false for left-to-right.
     *
     * This is the recommended modern API for accessing RTL state.
     */
    readonly rtlSignal: WritableSignal<boolean>;

    /**
     * @deprecated Use rtlSignal instead for better performance and reactivity.
     * This property will be removed in a future major version.
     */
    rtl: BehaviorSubject<boolean>;

    private readonly _injectedRtlLanguages = inject(RTL_LANGUAGE, { optional: true });

    constructor() {
        const isRtl = this._detectRtl();

        this.rtlSignal = signal(isRtl);

        // Legacy BehaviorSubject for backward compatibility
        this.rtl = new BehaviorSubject(isRtl);
    }

    /**
     * Detects if RTL should be enabled based on browser language.
     * Checks navigator.language against the list of RTL languages.
     *
     * @returns true if the browser language is in the RTL language list
     */
    private _detectRtl(): boolean {
        const languages = this._injectedRtlLanguages || DefaultRtlLanguages;
        const browserLanguage = navigator.language;

        if (!browserLanguage) {
            return false;
        }

        return languages.some((language) => browserLanguage.includes(language));
    }
}
