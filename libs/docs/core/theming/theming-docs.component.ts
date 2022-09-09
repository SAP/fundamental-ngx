import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const themeSwitcherSrc = 'theming-example.component.html';
const themeUrlSrc = 'theming-url-example.component.html';
const themeSwitcherSrcTs = 'theming-example.component.ts';
const themeUrlSrcTs = 'theming-url-example.component.ts';
const themeConfigSrcTs = 'custom-config-example.ts';
const customThemesSrcTs = 'custom-theme-example.component.ts';
const customThemesSrcHtml = 'custom-theme-example.component.html';

@Component({
    selector: 'app-theming-docs',
    templateUrl: './theming-docs.component.html'
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
