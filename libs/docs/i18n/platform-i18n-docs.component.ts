import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const translationCustomizationExampleComponentHtml =
    'i18n-translation-customization-example/i18n-translation-customization-example.component.html';
const translationCustomizationExampleComponentTs =
    'i18n-translation-customization-example/i18n-translation-customization-example.component.ts';
const translationCustomizationWrapper1Component =
    'i18n-translation-customization-example/translation-wrapper-1.component.ts';
const translationCustomizationWrapper2Component =
    'i18n-translation-customization-example/translation-wrapper-2.component.ts';
const languageChangeExampleComponentHtml = 'i18n-language-change-example/i18n-language-change-example.component.html';
const languageChangeExampleComponentTs = 'i18n-language-change-example/i18n-language-change-example.component.ts';

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
            code: getAssetFromModuleAssets(translationCustomizationExampleComponentHtml, 'shared/src/lib'),
            fileName: 'i18n-translation-customization-example'
        },
        {
            language: 'typescript',
            component: 'PlatformI18nTranslationCustomizationExampleComponent',
            code: getAssetFromModuleAssets(translationCustomizationExampleComponentTs, 'shared/src/lib'),
            fileName: 'i18n-translation-customization-example',
            name: 'Host component'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper1Component',
            code: getAssetFromModuleAssets(translationCustomizationWrapper1Component, 'shared/src/lib'),
            fileName: 'translation-wrapper-1',
            name: 'Wrapper component 1'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper2Component',
            code: getAssetFromModuleAssets(translationCustomizationWrapper2Component, 'shared/src/lib'),
            fileName: 'translation-wrapper-2',
            name: 'Wrapper component 2'
        }
    ];

    languageChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(languageChangeExampleComponentHtml, 'shared/src/lib'),
            fileName: 'i18n-language-change-example-example'
        },
        {
            language: 'typescript',
            component: 'PlatformLanguageChangeExampleComponent',
            code: getAssetFromModuleAssets(languageChangeExampleComponentTs, 'shared/src/lib'),
            fileName: 'i18n-language-change-example-example'
        }
    ];
}
