import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
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
    styleUrl: './language-change-example.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
        // FD_LOCALE_SIGNAL auto-derives from language via linkedSignal — no manual provider needed
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
     * Locale auto-derives from the language's metadata — no manual coordination needed.
     */
    readonly currentLanguageInfo = computed(() => {
        const lang = this.langSignal();
        const locale = this.fdLocaleSignal();
        const name = lang.name ?? 'Unknown';
        return `${name} (Locale: ${locale})`;
    });

    /** Inject the language signal so we can change it */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /** Inject the locale signal read-only for display */
    private readonly fdLocaleSignal = inject(FD_LOCALE_SIGNAL);

    /**
     * Change the application language at runtime.
     *
     * How it works:
     * 1. Call langSignal.set() — that's all you need
     * 2. FD_LOCALE_SIGNAL auto-derives from language.locale (linkedSignal)
     * 3. All translations automatically update (signals propagate changes)
     * 4. If the UI5 bridge is active, UI5 components update too
     */
    changeLanguage(lang: 'custom' | 'en' | 'ua'): void {
        switch (lang) {
            case 'en':
                // One call — locale follows automatically
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                break;
            case 'ua':
                // One call — locale follows automatically
                this.langSignal.set(FD_LANGUAGE_UKRAINIAN);
                break;
            case 'custom': {
                // Create a custom language by prefixing all English translations
                const custom = Object.fromEntries(
                    Object.entries(FD_LANGUAGE_ENGLISH).map(([component, translations]) => {
                        if (typeof translations !== 'object' || translations === null) {
                            return [component, translations];
                        }
                        const customTranslations = Object.fromEntries(
                            Object.entries(translations).map(([key, value]) => [key, 'Custom: ' + value])
                        );
                        return [component, customTranslations];
                    })
                ) as any;
                // Add locale and name metadata so linkedSignal can derive the locale
                custom.locale = 'en';
                custom.name = 'Custom English';
                this.langSignal.set(custom);
                break;
            }
        }
    }
}
