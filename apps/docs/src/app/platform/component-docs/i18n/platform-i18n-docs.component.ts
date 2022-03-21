import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import translationCustomizationExampleComponentHtml from '!./platform-i18n-examples/i18n-translation-customization-example/i18n-translation-customization-example.component.html?raw';
import translationCustomizationExampleComponentTs from '!./platform-i18n-examples/i18n-translation-customization-example/i18n-translation-customization-example.component.ts?raw';
import translationCustomizationWrapper1Component from '!./platform-i18n-examples/i18n-translation-customization-example/translation-wrapper-1.component.ts?raw';
import translationCustomizationWrapper2Component from '!./platform-i18n-examples/i18n-translation-customization-example/translation-wrapper-2.component.ts?raw';
import languageChangeExampleComponentHtml from '!./platform-i18n-examples/i18n-language-change-example/i18n-language-change-example.component.html?raw';
import languageChangeExampleComponentTs from '!./platform-i18n-examples/i18n-language-change-example/i18n-language-change-example.component.ts?raw';

@Component({
    selector: 'app-button',
    templateUrl: './platform-i18n-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformI18nDocsComponent {
    basicUsageExample = {
        language: 'typescript',
        code: `import { FD_LANGUAGE, FdLanguage, FD_LANGUAGE_UKRAINIAN } from '@fundamental-ngx/i18n';

// app.module
@NgModule({
    // ...
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: of<FdLanguage>(FD_LANGUAGE_UKRAINIAN),
        },
    ],
})
export class AppModule {}`
    };

    translationCustomizationExample: ExampleFile[] = [
        {
            language: 'html',
            code: translationCustomizationExampleComponentHtml,
            fileName: 'i18n-translation-customization-example'
        },
        {
            language: 'typescript',
            component: 'PlatformI18nTranslationCustomizationExampleComponent',
            code: translationCustomizationExampleComponentTs,
            fileName: 'i18n-translation-customization-example'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper1Component',
            code: translationCustomizationWrapper1Component,
            fileName: 'translation-wrapper-1'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper2Component',
            code: translationCustomizationWrapper2Component,
            fileName: 'translation-wrapper-2'
        }
    ];

    languageChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: languageChangeExampleComponentHtml,
            fileName: 'i18n-language-change-example-example'
        },
        {
            language: 'typescript',
            component: 'PlatformLanguageChangeExampleComponent',
            code: languageChangeExampleComponentTs,
            fileName: 'i18n-language-change-example-example'
        }
    ];
}
