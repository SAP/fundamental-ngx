import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_GERMAN,
    FD_LANGUAGE_SIGNAL,
    FD_LOCALE_SIGNAL,
    FdLanguage,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-locale-override-example',
    templateUrl: './locale-override-example.component.html',
    styleUrl: './locale-override-example.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ],
    imports: [ButtonComponent, SegmentedButtonModule, FormsModule, FormLabelComponent]
})
export class LocaleOverrideExampleComponent {
    /** Track selected language for segmented button */
    lang = 'en';

    /** Whether locale is currently overridden */
    protected readonly isOverridden = signal(false);

    /** A translated label to demonstrate language text */
    protected readonly saveLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');

    /** Inject signals */
    protected readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;
    protected readonly localeSignal = inject(FD_LOCALE_SIGNAL) as WritableSignal<string>;

    /** Current language name */
    protected readonly languageName = computed(() => this.langSignal().name ?? 'Unknown');

    /** Current locale */
    protected readonly currentLocale = computed(() => this.localeSignal());

    /** Sample date formatted according to current locale */
    protected readonly formattedDate = computed(() => {
        const locale = this.localeSignal();
        try {
            const pipe = new DatePipe(locale);
            return pipe.transform(new Date(2026, 2, 14), 'long') ?? '';
        } catch {
            return new Date(2026, 2, 14).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    });

    /** Change language — locale resets automatically (linkedSignal) */
    changeLanguage(lang: string): void {
        this.isOverridden.set(false);
        switch (lang) {
            case 'en':
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                break;
            case 'de':
                this.langSignal.set(FD_LANGUAGE_GERMAN);
                break;
            case 'fr':
                this.langSignal.set(FD_LANGUAGE_FRENCH);
                break;
        }
    }

    /** Override locale to Japanese — demonstrates independent locale control */
    overrideLocaleToJapanese(): void {
        this.localeSignal.set('ja-JP');
        this.isOverridden.set(true);
    }
}
