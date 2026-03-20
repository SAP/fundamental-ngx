import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL, resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { DatePicker } from '@fundamental-ngx/ui5-webcomponents/date-picker';

/**
 * Demonstrates UI5 + FD language synchronization via the bridge.
 *
 * This example reads the app-level FD_LANGUAGE_SIGNAL (set by the toolbar language selector).
 * The bridge (provideUi5LanguageBridge in app.config.ts) watches FD_LOCALE_SIGNAL and calls
 * UI5's setLanguage() — so both the FD translated label and the UI5 Date Picker update together.
 *
 * Use the toolbar language selector (top-right translate icon) to see the effect.
 */
@Component({
    selector: 'ui5-i18n-basic-sample',
    templateUrl: './i18n-basic-sample.html',
    styleUrl: './i18n-basic-sample.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormLabelComponent, DatePicker]
})
export class I18nBasicSampleComponent {
    /** Read the app-level language signal (provided in app.config.ts) */
    protected readonly langSignal = inject(FD_LANGUAGE_SIGNAL);
    protected readonly localeSignal = inject(FD_LOCALE_SIGNAL);

    protected readonly languageName = computed(() => this.langSignal().name ?? 'Unknown');
    protected readonly dateInputLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
}
