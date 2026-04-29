import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_SIGNAL,
    FdLanguage,
    FdTranslatePipe,
    loadJson,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

/**
 * Example demonstrating loading translations from JSON-like objects.
 * Simulates what happens when you use loadJson() with a JSON file.
 */
@Component({
    selector: 'fd-json-loading-example',
    templateUrl: './json-loading-example.component.html',
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ],
    imports: [ButtonComponent, FormLabelComponent, PlatformTextAreaModule, FdTranslatePipe]
})
export class JsonLoadingExampleComponent {
    /** Track loading state */
    isLoading = false;
    currentLanguage = 'english';

    /** Resolved translation signals */
    readonly dateInputLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
    readonly dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel');

    /** Language signal for changing languages */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Simulated JSON content from a file
     * In a real app, this would come from: http.get('./assets/i18n/uk.json')
     */
    private readonly ukrainianJsonData = {
        'coreDatePicker.dateInputLabel': 'Введіть дату',
        'coreDatePicker.dateRangeInputLabel': 'Введіть діапазон дат',
        'coreDatePicker.displayCalendarToggleLabel': 'Відкрити календар',
        'platformTextarea.counterMessageCharactersRemainingSingular': '1 символ залишився',
        'platformTextarea.counterMessageCharactersRemainingPlural': '{count} символів залишилось',
        'platformTextarea.counterMessageCharactersOverTheLimitSingular': '1 символ перевищує ліміт',
        'platformTextarea.counterMessageCharactersOverTheLimitPlural': '{count} символів перевищує ліміт'
    };

    /**
     * Load translations from JSON
     * Simulates: http.get('./assets/i18n/uk.json').subscribe(json => ...)
     */
    loadFromJson(): void {
        this.isLoading = true;
        this.currentLanguage = 'ukrainian';

        // Simulate async loading delay
        setTimeout(() => {
            // Use loadJson helper to transform JSON into FdLanguage
            const ukrainianLanguage = loadJson(this.ukrainianJsonData);
            this.langSignal.set(ukrainianLanguage);
            this.isLoading = false;
        }, 500);
    }

    /**
     * Reset to English
     */
    resetToEnglish(): void {
        this.currentLanguage = 'english';
        this.langSignal.set(FD_LANGUAGE_ENGLISH);
    }
}
