import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CustomThemeExampleComponent } from './examples/custom-theme-example.component';
import { CodeSnippetComponent } from '../../shared/src/lib/core-helpers/code-snippet/code-snippet.component';
import { ThemingUrlExampleComponent } from './examples/theming-url-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ThemingExampleComponent } from './examples/theming-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
    standalone: true,
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
            fileName: 'theme-switcher-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(themeSwitcherSrcTs),
            fileName: 'theme-switcher-example',
            component: 'ThemeSwitcherExampleComponent'
        }
    ];

    themeUrlExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(themeUrlSrc),
            fileName: 'theme-url-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(themeUrlSrcTs),
            fileName: 'theme-url-example',
            component: 'ThemeUrlExampleComponent'
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
