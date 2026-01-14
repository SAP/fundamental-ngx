import { Directionality } from '@angular/cdk/bidi';
import { DestroyRef, effect, inject, Injectable, InjectionToken, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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
 * Service for managing bidirectional text direction using Angular signals.
 * Provides reactive state management for RTL/LTR text direction.
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   private bidiService = inject(BidiService);
 *
 *   protected readonly isRtl = this.bidiService.rtl;
 *   protected readonly direction = this.bidiService.dir;
 * }
 * ```
 */
@Injectable()
export class BidiService {
    /**
     * Signal representing the current text direction.
     * Emits 'rtl' for right-to-left or 'ltr' for left-to-right.
     */
    readonly dir: Signal<'rtl' | 'ltr'>;

    /**
     * Signal indicating whether the current direction is RTL.
     * True for right-to-left, false for left-to-right.
     */
    readonly rtl = signal(this._detectRtl());

    private readonly _cdk = inject(Directionality);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _injectedRtlLanguages = inject(RTL_LANGUAGE, { optional: true });

    constructor() {
        // Initialize dir signal
        this.dir = toSignal(this._cdk.change, {
            initialValue: this._cdk.value
        });

        // Sync rtl signal with CDK directionality changes
        effect(() => {
            this.rtl.set(this.dir() === 'rtl');
        });

        // Listen to CDK directionality changes
        const subscription = this._cdk.change.subscribe((direction) => {
            this.rtl.set(direction === 'rtl');
        });

        this._destroyRef.onDestroy(() => subscription.unsubscribe());
    }

    /**
     * Detects if RTL should be enabled based on browser language.
     * Checks navigator.language against the list of RTL languages.
     *
     * @returns true if the browser language is in the RTL language list
     */
    private _detectRtl(): boolean {
        const languages = this._injectedRtlLanguages || DefaultRtlLanguages;
        return languages.filter((language) => navigator.language.includes(language)).length > 0;
    }
}
