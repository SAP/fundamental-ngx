import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_FRENCH,
    FD_LANGUAGE_SIGNAL,
    FdLanguage,
    TranslationResolver
} from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-translation-resolver-basic-usage-example',
    template: `
        <div class="fd-margin-bottom--md">
            <label fd-form-label>Select Language:</label>
            <fd-segmented-button [(ngModel)]="selectedLanguage" (ngModelChange)="changeLanguage($event)">
                <button fd-button label="English" value="english"></button>
                <button fd-button label="Français (French)" value="french"></button>
            </fd-segmented-button>
        </div>

        <fd-message-strip [type]="'information'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">Reactive Translation (computed signal)</h4>
            <p class="fd-margin-bottom--sm">
                Uses <code>computed()</code> to create a reactive translation that automatically updates when language
                changes.
            </p>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <code>coreDatePicker.dateInputLabel:</code>
                <div class="fd-margin-top--tiny fd-text--bold" style="font-size: 1.1rem">
                    {{ coreDatePickerDateInputLabel() }}
                </div>
            </div>
        </fd-message-strip>

        <fd-message-strip [type]="'warning'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">One-time Synchronous Translation</h4>
            <p class="fd-margin-bottom--sm">Resolved once at initialization. Does NOT react to language changes.</p>
            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <code>coreDatePicker.dateInputLabel (sync):</code>
                <div class="fd-margin-top--tiny fd-text--bold" style="font-size: 1.1rem">
                    {{ coreDatePickerDateInputLabelSync }}
                </div>
            </div>
        </fd-message-strip>

        <fd-message-strip [type]="'information'" [dismissible]="false">
            <strong>Tip:</strong> Switch languages to see how the reactive translation updates automatically, while the
            synchronous one stays as English!
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
export class BasicUsageExampleComponent {
    /** Track selected language */
    selectedLanguage = 'english';

    /** Inject the language signal */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /** Create translation resolver instance */
    private readonly translationResolver = new TranslationResolver();

    /** Reactive translation using computed signal */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    coreDatePickerDateInputLabel = computed(() =>
        this.translationResolver.resolve(this.langSignal(), 'coreDatePicker.dateInputLabel')
    );

    /** One-time synchronous translation (not reactive to language changes) */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    coreDatePickerDateInputLabelSync = this.translationResolver.resolve(
        FD_LANGUAGE_ENGLISH,
        'coreDatePicker.dateInputLabel'
    );

    /**
     * Change language to demonstrate reactive vs non-reactive behavior
     */
    changeLanguage(language: 'english' | 'french'): void {
        this.langSignal.set(language === 'english' ? FD_LANGUAGE_ENGLISH : FD_LANGUAGE_FRENCH);
    }
}
