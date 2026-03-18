import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CodeExampleComponent,
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
    templateUrl: './changing-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        LanguageChangeExampleComponent,
        LocaleChangeExampleComponent,
        CustomLanguageExampleComponent,
        AutoDetectExampleComponent,
        LocaleOverrideExampleComponent
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
