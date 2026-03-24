import { ChangeDetectionStrategy, Component, computed, inject, LOCALE_ID } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL, FdLanguage } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-auto-detect-example',
    templateUrl: './auto-detect-example.component.html',
    styleUrl: './auto-detect-example.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutoDetectExampleComponent {
    /** The raw LOCALE_ID that Angular provides (from the browser or server config) */
    protected readonly browserLocale = inject(LOCALE_ID);

    /** The auto-detected language signal */
    protected readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    /** The auto-derived locale signal */
    protected readonly localeSignal = inject(FD_LOCALE_SIGNAL);

    /** Display the detected language name and locale */
    protected readonly detectedInfo = computed(() => {
        const lang: FdLanguage = this.langSignal();
        return {
            name: lang.name ?? 'Unknown',
            locale: this.localeSignal()
        };
    });
}
