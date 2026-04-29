import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_POLISH,
    FD_LANGUAGE_SIGNAL,
    FdLanguage,
    resolveTranslationSignal,
    resolveTranslationSignalFn
} from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-translation-resolver-using-utility-functions-example',
    template: `
        <div class="fd-margin-bottom--md">
            <label fd-form-label>Select Language:</label>
            <fd-segmented-button [(ngModel)]="selectedLanguage" (ngModelChange)="changeLanguage($event)">
                <button fd-button label="English" value="english"></button>
                <button fd-button label="Polski (Polish)" value="polish"></button>
            </fd-segmented-button>
        </div>

        <fd-message-strip [type]="'information'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">Method 1: <code>resolveTranslationSignal()</code></h4>
            <p class="fd-margin-bottom--sm">
                <strong>Use in injection context.</strong> Simple one-liner that returns a reactive signal.
            </p>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <code>coreDatePicker.dateInputLabel:</code>
                <div class="fd-margin-top--tiny fd-text--bold" style="font-size: 1.1rem">
                    {{ coreDatePickerDateInputLabelSignal() }}
                </div>
            </div>
        </fd-message-strip>

        <fd-message-strip [type]="'information'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">Method 2: <code>resolveTranslationSignalFn()</code></h4>
            <p class="fd-margin-bottom--sm">
                <strong>Get a resolver function</strong> that can be used outside injection context (in methods,
                callbacks, etc.).
            </p>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <code>coreDatePicker.dateRangeInputLabel:</code>
                <div class="fd-margin-top--tiny fd-text--bold" style="font-size: 1.1rem">
                    {{ dateRangeInputLabelSignal() }}
                </div>
            </div>
        </fd-message-strip>

        <fd-message-strip [type]="'information'" [dismissible]="false">
            <strong>Tip:</strong> Switch languages to see both translations update automatically. These utility
            functions are the recommended approach for most use cases!
        </fd-message-strip>
    `,
    imports: [SegmentedButtonModule, FormsModule, ButtonComponent, FormLabelComponent, MessageStripComponent],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class UsingUtilityFunctionsExampleComponent {
    /** Track selected language */
    selectedLanguage = 'english';

    /**
     * Using resolveTranslationSignal() - simplest approach
     * Use this in injection context (class field initializers)
     */
    coreDatePickerDateInputLabelSignal = resolveTranslationSignal('coreDatePicker.dateInputLabel');

    /**
     * Using resolveTranslationSignalFn() - for use outside injection context
     * Get a factory function that can be called later in methods
     */
    translationSignalResolver = resolveTranslationSignalFn();

    dateRangeInputLabelSignal = this.translationSignalResolver('coreDatePicker.dateRangeInputLabel');

    /** Inject the language signal (this is provided by the component) */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Change language to demonstrate reactivity
     */
    changeLanguage(language: 'english' | 'polish'): void {
        this.langSignal.set(language === 'english' ? FD_LANGUAGE_ENGLISH : FD_LANGUAGE_POLISH);
    }
}
