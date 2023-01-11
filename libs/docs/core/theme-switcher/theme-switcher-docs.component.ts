import { Component } from '@angular/core';
import { DocsThemeService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ThemeServiceOutput } from '@fundamental-ngx/cdk/utils';

const themeSwitcherSrc = 'theme-switcher-example.component.html';
const themeUrlSrc = 'theme-url-example.component.html';
const themeSwitcherSrcTs = 'theme-switcher-example.component.ts';
const themeUrlSrcTs = 'theme-url-example.component.ts';

@Component({
    selector: 'app-theme-switcher-docs',
    templateUrl: './theme-switcher-docs.component.html'
})
export class ThemeSwitcherDocsComponent {
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

    constructor(private _docsThemeService: DocsThemeService) {}

    handleThemeChanged(theme: ThemeServiceOutput): void {
        this._docsThemeService.onThemeChange.next(theme);
    }
}
