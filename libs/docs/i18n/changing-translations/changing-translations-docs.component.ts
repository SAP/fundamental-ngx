import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
    CodeSnippetComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformI18nTranslationCustomizationExampleComponent } from '../patching-translations/examples/i18n-translation-customization-example/i18n-translation-customization-example.component';
import { LanguageChangeExampleComponent } from './examples/i18n-language-change-example/language-change-example.component';
import { LocaleChangeExampleComponent } from './examples/i18n-locale-change-example/locale-change-example.component';

@Component({
    templateUrl: './changing-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        PlatformI18nTranslationCustomizationExampleComponent,
        CodeExampleComponent,
        LanguageChangeExampleComponent,
        LocaleChangeExampleComponent
    ]
})
export class ChangingTranslationsDocsComponent {
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

    languageChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('i18n-language-change-example/language-change-example.component.html'),
            fileName: 'i18n-language-change-example-example'
        },
        {
            language: 'typescript',
            component: 'LanguageChangeExampleComponent',
            code: getAssetFromModuleAssets('i18n-language-change-example/language-change-example.component.ts'),
            fileName: 'i18n-language-change-example-example'
        }
    ];

    localeChangeExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('i18n-locale-change-example/locale-change-example.component.html'),
            fileName: 'locale-change-example'
        },
        {
            language: 'typescript',
            component: 'LocaleChangeExampleComponent',
            code: getAssetFromModuleAssets('i18n-locale-change-example/locale-change-example.component.ts'),
            fileName: 'locale-change-example'
        }
    ];
}
