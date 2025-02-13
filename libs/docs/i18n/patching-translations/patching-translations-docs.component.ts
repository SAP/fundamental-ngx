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
import { PlatformI18nTranslationCustomizationExampleComponent } from './examples/i18n-translation-customization-example/i18n-translation-customization-example.component';

@Component({
    templateUrl: './patching-translations-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        CodeSnippetComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        PlatformI18nTranslationCustomizationExampleComponent
    ]
})
export class PatchingTranslationsDocsComponent {
    translationCustomizationExampleFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(
                'i18n-translation-customization-example/i18n-translation-customization-example.component.html'
            ),
            fileName: 'i18n-translation-customization-example'
        },
        {
            language: 'typescript',
            component: 'PlatformI18nTranslationCustomizationExampleComponent',
            code: getAssetFromModuleAssets(
                'i18n-translation-customization-example/i18n-translation-customization-example.component.ts'
            ),
            fileName: 'i18n-translation-customization-example',
            name: 'Host component'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper1Component',
            code: getAssetFromModuleAssets('i18n-translation-customization-example/translation-wrapper-1.component.ts'),
            fileName: 'translation-wrapper-1',
            name: 'Wrapper component 1'
        },
        {
            language: 'typescript',
            component: 'TranslationWrapper2Component',
            code: getAssetFromModuleAssets('i18n-translation-customization-example/translation-wrapper-2.component.ts'),
            fileName: 'translation-wrapper-2',
            name: 'Wrapper component 2'
        }
    ];
}
