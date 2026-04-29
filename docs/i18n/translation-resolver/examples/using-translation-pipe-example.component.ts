import { Component, inject, signal, WritableSignal } from '@angular/core';
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
    FdTranslatePipe
} from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-using-translation-pipe-example',
    template: `
        <div class="fd-margin-bottom--md">
            <label fd-form-label>Select Language:</label>
            <fd-segmented-button [(ngModel)]="selectedLanguage" (ngModelChange)="changeLanguage($event)">
                <button fd-button label="English" value="english"></button>
                <button fd-button label="Français (French)" value="french"></button>
            </fd-segmented-button>
        </div>

        <fd-message-strip [type]="'information'" [dismissible]="false" class="fd-margin-bottom--md">
            <h4 class="fd-margin-top--none">Using <code>fdTranslate</code> Pipe in Templates</h4>
            <p class="fd-margin-bottom--md">
                The pipe returns a <code>Signal&lt;string&gt;</code>, so invoke it with <code>()</code>
            </p>

            <div
                class="fd-padding--sm fd-margin-bottom--md"
                style="background: var(--sapBackgroundColor); border-radius: 4px"
            >
                <div class="fd-margin-bottom--sm">Example 1: Inline heading and paragraph</div>
                <h4 class="fd-margin--none">{{ ('coreDatePicker.dateInputLabel' | fdTranslate)() }}</h4>
                <p class="fd-margin-top--sm fd-margin-bottom--none">
                    {{ ('coreDatePicker.dateRangeInputLabel' | fdTranslate)() }}
                </p>
            </div>

            <div
                class="fd-padding--sm fd-margin-bottom--md"
                style="background: var(--sapBackgroundColor); border-radius: 4px"
            >
                <div class="fd-margin-bottom--sm">Example 2: Button label</div>
                <button fd-button>
                    {{ ('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)() }}
                </button>
            </div>

            <div class="fd-padding--sm" style="background: var(--sapBackgroundColor); border-radius: 4px">
                <div class="fd-margin-bottom--sm">Example 3: Attribute binding (title tooltip and aria-label)</div>
                <button
                    fd-button
                    [title]="('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)()"
                    [attr.aria-label]="('coreDatePicker.displayCalendarToggleLabel' | fdTranslate)()"
                >
                    📅 Hover me to see tooltip
                </button>
            </div>
        </fd-message-strip>

        <fd-message-strip [type]="'information'" [dismissible]="false">
            <strong>Tip:</strong> Switch languages to see all translations update automatically. The pipe is great for
            simple inline translations!
        </fd-message-strip>
    `,
    imports: [
        FdTranslatePipe,
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        FormLabelComponent,
        MessageStripComponent
    ],
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class UsingTranslationPipeExampleComponent {
    /** Track selected language */
    selectedLanguage = 'english';

    /** Inject and track the language signal */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Change language to demonstrate pipe reactivity
     */
    changeLanguage(language: 'english' | 'french'): void {
        this.langSignal.set(language === 'english' ? FD_LANGUAGE_ENGLISH : FD_LANGUAGE_FRENCH);
    }
}
