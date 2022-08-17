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

    translationExample = {
        language: 'typescript',
        code: `import { FdLanguage } from '@fundamental-ngx/i18n';

// Note, you're seeing the part of the language. Not putting the entire language object here for the sake of simplicity
export const CUSTOM_LANGUAGE: FdLanguage = {
    platformTextarea: {
        counterMessageCharactersRemainingSingular: 'You can type 1 more character',
        counterMessageCharactersRemainingPlural: 'You can type {{ count }} more characters',
        counterMessageCharactersOverTheLimitSingular: '1 character over the limit',
        counterMessageCharactersOverTheLimitPlural: (params) => {
            switch (+params.count) {
                case 2:
                    return 'Two charactes over the limit';
                case 3:
                    return 'Three charactes over the limit';
            }
            return \`\${params.count} characters over the limit\`;
        }
    },
}
        `
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
            fileName: 'i18n-translation-customization-example',
            name: 'Host component'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper1Component',
            code: translationCustomizationWrapper1Component,
            fileName: 'translation-wrapper-1',
            name: 'Wrapper component 1'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper2Component',
            code: translationCustomizationWrapper2Component,
            fileName: 'translation-wrapper-2',
            name: 'Wrapper component 2'
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
