import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_GERMAN,
    FD_LANGUAGE_SIGNAL,
    FD_LANGUAGE_SPANISH,
    FdLanguage,
    FdTranslatePipe,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';

/**
 * Complete example showing all the concepts from the Getting Started guide
 */
@Component({
    selector: 'fd-getting-started-example',
    template: `
        <fd-message-strip [type]="'information'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">Choose a Language:</h4>
            <div class="fd-margin-bottom--sm sap-flex sap-flex--gap-small sap-flex--wrap">
                <button fd-button (click)="switchLanguage('english')">English</button>
                <button fd-button (click)="switchLanguage('spanish')">Español</button>
                <button fd-button (click)="switchLanguage('french')">Français</button>
                <button fd-button (click)="switchLanguage('german')">Deutsch</button>
            </div>
            <div>
                Current language: <strong>{{ currentLanguageName() }}</strong>
            </div>
        </fd-message-strip>

        <div class="fd-margin-bottom--md fd-padding--md example-bordered-card">
            <h4 class="fd-margin-top--none">Using <code>fdTranslate</code> Pipe (in template):</h4>
            <div class="fd-padding--sm example-info-panel">
                <div class="fd-margin-bottom--sm">
                    <code>{{ '{' }}{{ '{' }} ('coreDatePicker.dateInputLabel' | fdTranslate)() {{ '}' }}{{ '}' }}</code>
                </div>
                <div class="fd-text--bold example-highlight-text">
                    {{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}
                </div>
            </div>
        </div>

        <div class="fd-margin-bottom--md fd-padding--md example-bordered-card">
            <h4 class="fd-margin-top--none">Using <code>resolveTranslationSignal()</code> (in TypeScript):</h4>
            <div class="fd-padding--sm example-info-panel">
                <div class="fd-margin-bottom--sm">
                    <code>dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel')</code>
                </div>
                <div class="fd-text--bold example-highlight-text">
                    {{ dateRangeLabel() }}
                </div>
            </div>
        </div>

        <div class="fd-margin-bottom--md fd-padding--md example-bordered-card">
            <h4 class="fd-margin-top--none">Multiple Translations Example:</h4>
            <div class="fd-padding--sm fd-margin-bottom--sm example-info-panel">
                <strong>Date Input:</strong> {{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}
            </div>
            <div class="fd-padding--sm fd-margin-bottom--sm example-info-panel">
                <strong>Calendar Button:</strong> {{ ('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)() }}
            </div>
            <div class="fd-padding--sm example-info-panel">
                <strong>Date Range:</strong> {{ ('coreDatePicker.dateRangeInputLabel' | fdTranslate)() }}
            </div>
        </div>

        <fd-message-strip [type]="'information'" [dismissible]="false">
            <strong>Notice:</strong> All translations update automatically when you switch languages. No manual work
            needed!
        </fd-message-strip>
    `,
    styleUrl: './getting-started-example.component.scss',
    imports: [ButtonComponent, FormLabelComponent, FdTranslatePipe, MessageStripComponent],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class GettingStartedExampleComponent {
    /** Language name auto-reads from the signal's metadata */
    currentLanguageName = computed(() => this.langSignal().name ?? 'English');

    /** Example of using resolveTranslationSignal in TypeScript */
    dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel');

    /** Get access to the language signal */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Switch language and update all translations
     */
    switchLanguage(language: 'english' | 'spanish' | 'french' | 'german'): void {
        switch (language) {
            case 'english':
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                break;
            case 'spanish':
                this.langSignal.set(FD_LANGUAGE_SPANISH);
                break;
            case 'french':
                this.langSignal.set(FD_LANGUAGE_FRENCH);
                break;
            case 'german':
                this.langSignal.set(FD_LANGUAGE_GERMAN);
                break;
        }
    }
}
