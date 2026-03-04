import { Component, inject, signal, WritableSignal } from '@angular/core';
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
            <div class="fd-margin-bottom--sm" style="display: flex; gap: 0.5rem; flex-wrap: wrap">
                <button fd-button (click)="switchLanguage('english')">English</button>
                <button fd-button (click)="switchLanguage('spanish')">Español</button>
                <button fd-button (click)="switchLanguage('french')">Français</button>
                <button fd-button (click)="switchLanguage('german')">Deutsch</button>
            </div>
            <div>
                Current language: <strong>{{ currentLanguageName }}</strong>
            </div>
        </fd-message-strip>

        <div
            class="fd-margin-bottom--md fd-padding--md"
            style="border: 1px solid var(--sapNeutralBorderColor); border-radius: 4px"
        >
            <h4 class="fd-margin-top--none">Using <code>fdTranslate</code> Pipe (in template):</h4>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <div class="fd-margin-bottom--sm">
                    <code>{{ '{' }}{{ '{' }} ('coreDatePicker.dateInputLabel' | fdTranslate)() {{ '}' }}{{ '}' }}</code>
                </div>
                <div class="fd-text--bold" style="font-size: 1.1rem">
                    {{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}
                </div>
            </div>
        </div>

        <div
            class="fd-margin-bottom--md fd-padding--md"
            style="border: 1px solid var(--sapNeutralBorderColor); border-radius: 4px"
        >
            <h4 class="fd-margin-top--none">Using <code>resolveTranslationSignal()</code> (in TypeScript):</h4>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <div class="fd-margin-bottom--sm">
                    <code>dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel')</code>
                </div>
                <div class="fd-text--bold" style="font-size: 1.1rem">
                    {{ dateRangeLabel() }}
                </div>
            </div>
        </div>

        <div
            class="fd-margin-bottom--md fd-padding--md"
            style="border: 1px solid var(--sapNeutralBorderColor); border-radius: 4px"
        >
            <h4 class="fd-margin-top--none">Multiple Translations Example:</h4>
            <div
                class="fd-padding--sm fd-margin-bottom--sm"
                style="background: var(--sapBackgroundColor); border-radius: 4px"
            >
                <strong>Date Input:</strong> {{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}
            </div>
            <div
                class="fd-padding--sm fd-margin-bottom--sm"
                style="background: var(--sapBackgroundColor); border-radius: 4px"
            >
                <strong>Calendar Button:</strong> {{ ('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)() }}
            </div>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <strong>Date Range:</strong> {{ ('coreDatePicker.dateRangeInputLabel' | fdTranslate)() }}
            </div>
        </div>

        <fd-message-strip [type]="'information'" [dismissible]="false">
            <strong>Notice:</strong> All translations update automatically when you switch languages. No manual work
            needed!
        </fd-message-strip>
    `,
    imports: [ButtonComponent, FormLabelComponent, FdTranslatePipe, MessageStripComponent],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class GettingStartedExampleComponent {
    /** Track current language name for display */
    currentLanguageName = 'English';

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
                this.currentLanguageName = 'English';
                break;
            case 'spanish':
                this.langSignal.set(FD_LANGUAGE_SPANISH);
                this.currentLanguageName = 'Español';
                break;
            case 'french':
                this.langSignal.set(FD_LANGUAGE_FRENCH);
                this.currentLanguageName = 'Français';
                break;
            case 'german':
                this.langSignal.set(FD_LANGUAGE_GERMAN);
                this.currentLanguageName = 'Deutsch';
                break;
        }
    }
}
