import { inject, InjectionToken, isDevMode, LOCALE_ID, signal, Signal, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';

import { FdLanguage } from '../models/fd-language';

// ===== PRIMARY SIGNAL-BASED TOKENS (Angular 21+) =====

/**
 * Signal-based language token for reactive translations.
 * Use this in new code for automatic change detection and zoneless compatibility.
 *
 * @example
 * ```ts
 * readonly language = inject(FD_LANGUAGE_SIGNAL);
 * readonly label = computed(() =>
 *   resolveTranslation(this.language(), 'coreButton.label')
 * );
 * ```
 */
export const FD_LANGUAGE_SIGNAL = new InjectionToken<WritableSignal<FdLanguage>>(
    'Language signal for @fundamental-ngx packages',
    {
        providedIn: 'root',
        factory: () => signal(FD_LANGUAGE_ENGLISH)
    }
);

/**
 * Signal-based locale token for formatting operations.
 * Use this in new code for automatic change detection.
 *
 * @example
 * ```ts
 * readonly locale = inject(FD_LOCALE_SIGNAL);
 * readonly formattedDate = computed(() =>
 *   formatDate(this.date, this.locale())
 * );
 * ```
 */
export const FD_LOCALE_SIGNAL = new InjectionToken<WritableSignal<string>>(
    'Locale signal for @fundamental-ngx packages',
    {
        providedIn: 'root',
        factory: () => {
            const localeId = inject(LOCALE_ID, { optional: true }) ?? 'en-US';
            return signal(localeId);
        }
    }
);

// ===== DEPRECATED OBSERVABLE TOKENS (BACKWARD COMPATIBILITY) =====

/**
 * @deprecated Use FD_LANGUAGE_SIGNAL instead for better performance and zoneless compatibility.
 * Observable-based language token (legacy). Will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * lang$ = inject(FD_LANGUAGE);
 *
 * // After
 * langSignal = inject(FD_LANGUAGE_SIGNAL);
 * // Or convert to Observable if needed:
 * lang$ = toObservable(inject(FD_LANGUAGE_SIGNAL));
 * ```
 */
export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>(
    'Language observable (deprecated - use FD_LANGUAGE_SIGNAL)',
    {
        providedIn: 'root',
        factory: () => {
            if (isDevMode()) {
                console.warn(
                    '[DEPRECATION] FD_LANGUAGE is deprecated and will be removed in a future version.\n' +
                        'Use FD_LANGUAGE_SIGNAL instead for better performance and zoneless compatibility.\n' +
                        'Migration: inject(FD_LANGUAGE_SIGNAL) instead of inject(FD_LANGUAGE)\n' +
                        'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
                );
            }
            // Automatically derives Observable from signal for backward compatibility
            const languageSignal = inject(FD_LANGUAGE_SIGNAL);
            return toObservable(languageSignal);
        }
    }
);

/**
 * @deprecated Use FD_LOCALE_SIGNAL instead for better performance and zoneless compatibility.
 * Observable-based locale token (legacy). Will be removed in a future version.
 *
 * Migration:
 * ```ts
 * // Before
 * locale$ = inject(FD_LOCALE);
 *
 * // After
 * localeSignal = inject(FD_LOCALE_SIGNAL);
 * // Or convert to Observable if needed:
 * locale$ = toObservable(inject(FD_LOCALE_SIGNAL));
 * ```
 */
export const FD_LOCALE = new InjectionToken<Observable<string>>(
    'Locale observable (deprecated - use FD_LOCALE_SIGNAL)',
    {
        providedIn: 'root',
        factory: () => {
            if (isDevMode()) {
                console.warn(
                    '[DEPRECATION] FD_LOCALE is deprecated and will be removed in a future version.\n' +
                        'Use FD_LOCALE_SIGNAL instead for better performance and zoneless compatibility.\n' +
                        'Migration: inject(FD_LOCALE_SIGNAL) instead of inject(FD_LOCALE)\n' +
                        'See: https://github.com/SAP/fundamental-ngx/blob/main/libs/i18n/MIGRATION.md'
                );
            }
            // Automatically derives Observable from signal for backward compatibility
            const localeSignal = inject(FD_LOCALE_SIGNAL);
            return toObservable(localeSignal);
        }
    }
);

// ===== HELPER TYPE FOR SIGNAL OR OBSERVABLE =====

/**
 * @internal
 * Helper type to accept both Signal and Observable for gradual migration
 */
export type SignalOrObservable<T> = Signal<T> | Observable<T>;
