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
import { AutoDetectExampleComponent } from './examples/i18n-auto-detect-example/auto-detect-example.component';
import { CustomLanguageExampleComponent } from './examples/i18n-custom-language-example/custom-language-example.component';
import { LanguageChangeExampleComponent } from './examples/i18n-language-change-example/language-change-example.component';
import { LocaleChangeExampleComponent } from './examples/i18n-locale-change-example/locale-change-example.component';
import { LocaleOverrideExampleComponent } from './examples/i18n-locale-override-example/locale-override-example.component';

@Component({
    selector: 'fd-docs-i18n-changing-translations',
    templateUrl: './changing-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        CodeSnippetComponent,
        LanguageChangeExampleComponent,
        LocaleChangeExampleComponent,
        CustomLanguageExampleComponent,
        AutoDetectExampleComponent,
        LocaleOverrideExampleComponent
    ]
})
export class ChangingTranslationsDocsComponent {
    registerLanguagesExample: ExampleFile = {
        language: 'typescript',
        code: `import { ApplicationConfig } from '@angular/core';
import { provideFundamentalTranslations, FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    // Register only the languages your app supports (keeps the bundle small).
    // English is always available, so English-only apps need no registration.
    provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)
  ]
};`,
        fileName: 'app.config'
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

    autoDetectExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('i18n-auto-detect-example/auto-detect-example.component.html'),
            fileName: 'auto-detect-example'
        },
        {
            language: 'typescript',
            component: 'AutoDetectExampleComponent',
            code: getAssetFromModuleAssets('i18n-auto-detect-example/auto-detect-example.component.ts'),
            fileName: 'auto-detect-example'
        }
    ];

    localeOverrideExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('i18n-locale-override-example/locale-override-example.component.html'),
            fileName: 'locale-override-example'
        },
        {
            language: 'typescript',
            component: 'LocaleOverrideExampleComponent',
            code: getAssetFromModuleAssets('i18n-locale-override-example/locale-override-example.component.ts'),
            fileName: 'locale-override-example'
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

    customLanguageExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('i18n-custom-language-example/custom-language-example.component.html'),
            fileName: 'custom-language-example'
        },
        {
            language: 'typescript',
            component: 'CustomLanguageExampleComponent',
            code: getAssetFromModuleAssets('i18n-custom-language-example/custom-language-example.component.ts'),
            fileName: 'custom-language-example'
        }
    ];
}
