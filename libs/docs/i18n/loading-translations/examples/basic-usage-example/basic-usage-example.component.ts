import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_POLISH,
    FD_LANGUAGE_SIGNAL,
    FD_LANGUAGE_UKRAINIAN,
    FdLanguage,
    FdTranslatePipe,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

/**
 * Example demonstrating loading built-in translations.
 * Shows how to switch between different pre-translated languages at runtime.
 */
@Component({
    selector: 'fd-basic-usage-example',
    templateUrl: './basic-usage-example.component.html',
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
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
export class BasicUsageExampleComponent {
    /** Track selected language option */
    selectedLanguage = 'english';

    /** Resolved translation signals */
    readonly dateInputLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
    readonly dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel');

    /** Language signal for changing languages */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Change the language to demonstrate loading different built-in translations
     */
    changeLanguage(language: 'english' | 'ukrainian' | 'polish' | 'french'): void {
        switch (language) {
            case 'english':
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                break;
            case 'ukrainian':
                this.langSignal.set(FD_LANGUAGE_UKRAINIAN);
                break;
            case 'polish':
                this.langSignal.set(FD_LANGUAGE_POLISH);
                break;
            case 'french':
                this.langSignal.set(FD_LANGUAGE_FRENCH);
                break;
        }
    }
}
