import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormControlComponent, FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FD_LOCALE_SIGNAL, FdLanguage, resolveTranslationSignalFn } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-locale-change-example',
    templateUrl: './locale-change-example.component.html',
    imports: [ButtonComponent, SegmentedButtonComponent, FormsModule, FormControlComponent, FormLabelComponent],
    providers: [
        {
            provide: FD_LOCALE_SIGNAL,
            useValue: signal('en-US')
        }
    ]
})
export class LocaleChangeExampleComponent {
    /** Injected locale signal - controls date/number formatting */
    localeSignal = inject(FD_LOCALE_SIGNAL) as WritableSignal<string>;

    /** Current selected locale (for ngModel binding) */
    locale = this.localeSignal();

    /** Sample date to demonstrate locale-specific date formatting */
    sampleDate = new Date(2024, 11, 25, 14, 30); // December 25, 2024, 2:30 PM

    /** Sample number to demonstrate locale-specific number formatting */
    sampleNumber = 1234567.89;

    /** Count signal for pluralization demo */
    count = signal(1);

    /**
     * Custom translation resolver demonstrating pluralization rules.
     * Different locales have different pluralization rules:
     * - English: 0/2+ = "items", 1 = "item"
     * - Ukrainian: 1/21/31 = "предмет", 2-4/22-24 = "предмети", 0/5+/25+ = "предметів"
     * - Georgian: No special plural forms
     */
    translationResolver = resolveTranslationSignalFn({
        fdLang: {
            itemsCount: '{count, plural, =0 {No items} one {# item} few {# items (few)} other {# items}}'
        } as unknown as FdLanguage
    });

    /** Context for translation with reactive count */
    pluralizationContext = computed(() => ({ count: this.count() }));

    /** Translation signal showing locale-specific pluralization */
    itemsCountText = this.translationResolver('itemsCount' as any, this.pluralizationContext);

    /** Display current locale name */
    currentLocaleName = computed(() => {
        const loc = this.localeSignal();
        switch (loc) {
            case 'en-US':
                return 'English (US)';
            case 'uk-UA':
                return 'Ukrainian';
            case 'ka-GE':
                return 'Georgian';
            default:
                return loc;
        }
    });

    /**
     * Formatted date strings that update when locale changes.
     * We create new pipe instances with the current locale to format dates.
     */
    shortDate = computed(() => {
        const locale = this.localeSignal();
        const pipe = new DatePipe(locale);
        return pipe.transform(this.sampleDate, 'short');
    });

    mediumDate = computed(() => {
        const locale = this.localeSignal();
        const pipe = new DatePipe(locale);
        return pipe.transform(this.sampleDate, 'medium');
    });

    longDate = computed(() => {
        const locale = this.localeSignal();
        const pipe = new DatePipe(locale);
        return pipe.transform(this.sampleDate, 'long');
    });

    /**
     * Formatted number strings that update when locale changes.
     * We create new pipe instances with the current locale to format numbers.
     */
    decimalNumber = computed(() => {
        const locale = this.localeSignal();
        const pipe = new DecimalPipe(locale);
        return pipe.transform(this.sampleNumber, '1.2-2');
    });

    currencyNumber = computed(() => {
        const locale = this.localeSignal();
        const pipe = new CurrencyPipe(locale);
        return pipe.transform(this.sampleNumber, 'USD');
    });

    percentNumber = computed(() => {
        const locale = this.localeSignal();
        const pipe = new PercentPipe(locale);
        return pipe.transform(0.1234, '1.0-2');
    });

    /**
     * Change locale at runtime.
     * When the locale signal changes, all computed signals that depend on it
     * will automatically re-evaluate and update the formatted values.
     */
    changeLocale($event: string): void {
        this.localeSignal.set($event);
        this.locale = $event;
    }
}
