import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_SIGNAL,
    FD_LANGUAGE_UKRAINIAN,
    FD_LOCALE_SIGNAL,
    FdLanguage,
    FdTranslatePipe,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fd-language-change-example',
    templateUrl: './language-change-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        },
        {
            provide: FD_LOCALE_SIGNAL,
            useFactory: () => signal(inject(LOCALE_ID))
        }
    ],
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        FormLabelComponent,
        PlatformTextAreaModule,
        FdTranslatePipe
    ]
})
export class LanguageChangeExampleComponent {
    /** Track selected language for segmented button */
    lang = 'en';

    /**
     * Resolve translations that will automatically update when language changes.
     * These signals are reactive - when langSignal changes, these automatically re-evaluate.
     */
    readonly dateInputLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
    readonly dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel');
    readonly calendarToggleLabel = resolveTranslationSignal('coreDatePicker.displayCalendarToggleLabel');

    /**
     * Computed signal showing current language and locale.
     * Automatically updates when langSignal or fdLocaleSignal change.
     */
    readonly currentLanguageInfo = computed(() => {
        const locale = this.fdLocaleSignal();
        // Detect language type based on first translation
        const firstTranslation = this.dateInputLabel();
        if (firstTranslation.startsWith('Custom:')) {
            return `Custom Language (Locale: ${locale})`;
        } else if (locale === 'uk-UA') {
            return `Ukrainian (Locale: ${locale})`;
        } else {
            return `English (Locale: ${locale})`;
        }
    });

    /** Inject the language signal so we can change it */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /** Inject the locale signal (affects date/number formatting) */
    private readonly fdLocaleSignal = inject(FD_LOCALE_SIGNAL) as WritableSignal<string>;

    /**
     * Change the application language at runtime.
     *
     * How it works:
     * 1. Call langSignal.set() to change the language
     * 2. All translations automatically update (signals propagate changes)
     * 3. No manual subscriptions needed - signals handle reactivity
     * 4. Locale affects date/number formatting (separate from translations)
     */
    changeLanguage(lang: 'custom' | 'en' | 'ua'): void {
        switch (lang) {
            case 'en':
                // Switch to English - all UI elements update automatically
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                this.fdLocaleSignal.set('en-US');
                break;
            case 'ua':
                // Switch to Ukrainian - all UI elements update automatically
                this.langSignal.set(FD_LANGUAGE_UKRAINIAN);
                this.fdLocaleSignal.set('uk-UA');
                break;
            case 'custom': {
                // Create a custom language by prefixing all English translations
                // This demonstrates you can provide any translation structure
                const custom = Object.fromEntries(
                    Object.entries(FD_LANGUAGE_ENGLISH).map(([component, translations]) => {
                        const customTranslations = Object.fromEntries(
                            Object.entries(translations).map(([key, value]) => [key, 'Custom: ' + value])
                        );
                        return [component, customTranslations];
                    })
                ) as any;
                this.langSignal.set(custom);
                this.fdLocaleSignal.set('en-US');
                break;
            }
        }
    }
}
