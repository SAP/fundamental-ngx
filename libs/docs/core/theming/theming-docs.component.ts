import { Component } from '@angular/core';
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
import { CustomThemeExampleComponent } from './examples/custom-theme-example.component';
import { ThemingExampleComponent } from './examples/theming-example.component';
import { ThemingUrlExampleComponent } from './examples/theming-url-example.component';

const themeSwitcherSrc = 'theming-example.component.html';
const themeUrlSrc = 'theming-url-example.component.html';
const themeSwitcherSrcTs = 'theming-example.component.ts';
const themeUrlSrcTs = 'theming-url-example.component.ts';
const themeConfigSrcTs = 'custom-config-example.ts';
const customThemesSrcTs = 'custom-theme-example.component.ts';
const customThemesSrcHtml = 'custom-theme-example.component.html';

@Component({
    selector: 'app-theming-docs',
    templateUrl: './theming-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ThemingExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        ThemingUrlExampleComponent,
        CodeSnippetComponent,
        CustomThemeExampleComponent
    ]
})
export class ThemingDocsComponent {
    themeConfigExample: ExampleFile = {
        language: 'typescript',
        code: getAssetFromModuleAssets(themeConfigSrcTs)
    };

    themeSwitcherExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(themeSwitcherSrc),
            fileName: 'theming-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(themeSwitcherSrcTs),
            fileName: 'theming-example',
            component: 'ThemingExampleComponent'
        }
    ];

    themeUrlExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(themeUrlSrc),
            fileName: 'theming-url-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(themeUrlSrcTs),
            fileName: 'theming-url-example',
            component: 'ThemingUrlExampleComponent'
        }
    ];

    customThemesExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customThemesSrcHtml),
            fileName: 'custom-theme-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customThemesSrcTs),
            fileName: 'custom-theme-example',
            component: 'CustomThemeExampleComponent'
        }
    ];
}
