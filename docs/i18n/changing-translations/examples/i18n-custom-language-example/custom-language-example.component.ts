import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import {
    FD_LANGUAGE_ENGLISH,
    FD_LANGUAGE_SIGNAL,
    FdLanguage,
    FdTranslatePipe,
    resolveTranslationSignal
} from '@fundamental-ngx/i18n';
import { PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

/**
 * Example demonstrating how to create custom language objects.
 *
 * This shows three approaches:
 * 1. Using a built-in language (English)
 * 2. Creating a simple custom language with string interpolation
 * 3. Creating an advanced custom language with function-based translations
 */
@Component({
    selector: 'fd-custom-language-example',
    templateUrl: './custom-language-example.component.html',
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
export class CustomLanguageExampleComponent {
    /** Track selected language option */
    selectedLanguage = 'english';

    /** Resolved translation signals */
    readonly dateInputLabel = resolveTranslationSignal('coreDatePicker.dateInputLabel');
    readonly dateRangeLabel = resolveTranslationSignal('coreDatePicker.dateRangeInputLabel');

    /** Language signal for changing languages */
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL) as WritableSignal<FdLanguage>;

    /**
     * Custom language example #1: String interpolation
     * Uses template strings with {{ paramName }} for dynamic values
     *
     * Extends the base English language and overrides specific keys
     */
    private readonly customLanguageSimple: FdLanguage = {
        ...FD_LANGUAGE_ENGLISH,
        coreDatePicker: {
            ...FD_LANGUAGE_ENGLISH.coreDatePicker,
            dateInputLabel: 'Custom Date Field',
            dateRangeInputLabel: 'Custom Date Range Field',
            displayCalendarToggleLabel: 'Open Custom Calendar',
            valueStateSuccessMessage: 'Custom success message',
            valueStateInformationMessage: 'Custom value state information'
        },
        platformTextarea: {
            ...FD_LANGUAGE_ENGLISH.platformTextarea,
            counterMessageCharactersRemainingSingular: '1 character remaining',
            counterMessageCharactersRemainingPlural: '{count} characters remaining',
            counterMessageCharactersOverTheLimitSingular: '1 character over limit!',
            counterMessageCharactersOverTheLimitPlural: '{count} characters over limit!'
        },
        segmentedButton: {
            ...FD_LANGUAGE_ENGLISH.segmentedButton,
            groupRoleDescription: 'Custom selection group',
            buttonRoleDescription: 'Custom selectable option'
        }
    };

    /**
     * Custom language example #2: Function-based translations
     * Uses functions for complex logic like conditional pluralization
     *
     * Extends the base English language and overrides specific keys with functions
     */
    private readonly customLanguageAdvanced: FdLanguage = {
        ...FD_LANGUAGE_ENGLISH,
        coreDatePicker: {
            ...FD_LANGUAGE_ENGLISH.coreDatePicker,
            dateInputLabel: 'Smart Date Input',
            dateRangeInputLabel: 'Smart Date Range',
            displayCalendarToggleLabel: 'Toggle Calendar Widget',
            valueStateSuccessMessage: '✓ Date is valid',
            valueStateInformationMessage: 'ℹ Smart value state information'
        },
        platformTextarea: {
            ...FD_LANGUAGE_ENGLISH.platformTextarea,
            counterMessageCharactersRemainingSingular: '✓ One more character allowed',
            counterMessageCharactersRemainingPlural: (params) => {
                const count = +params.count;
                if (count <= 5) {
                    return `⚠ Only ${count} characters left!`;
                }
                return `✓ ${count} characters remaining`;
            },
            counterMessageCharactersOverTheLimitSingular: '✗ Too long by 1 character',
            counterMessageCharactersOverTheLimitPlural: (params) => {
                const count = +params.count;
                if (count <= 3) {
                    return `⚠ ${count} characters too many (please shorten)`;
                }
                return `✗ Way too long! Remove ${count} characters`;
            }
        },
        segmentedButton: {
            ...FD_LANGUAGE_ENGLISH.segmentedButton,
            groupRoleDescription: '✓ Smart selection group',
            buttonRoleDescription: '✓ Smart selectable option'
        }
    };

    /**
     * Change the language to demonstrate different custom translation approaches
     */
    changeLanguage(language: 'english' | 'simple' | 'advanced'): void {
        switch (language) {
            case 'english':
                this.langSignal.set(FD_LANGUAGE_ENGLISH);
                break;
            case 'simple':
                this.langSignal.set(this.customLanguageSimple);
                break;
            case 'advanced':
                this.langSignal.set(this.customLanguageAdvanced);
                break;
        }
    }
}
