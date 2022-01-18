import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import themeSwitcherSrc from '!./examples/theme-switcher-example.component.html?raw';
import themeUrlSrc from '!./examples/theme-url-example.component.html?raw';
import themeSwitcherSrcTs from '!./examples/theme-switcher-example.component.ts?raw';
import themeUrlSrcTs from '!./examples/theme-url-example.component.ts?raw';
import { DocsThemeService } from '../../../documentation/services/docs-theme.service';
import { ThemeServiceOutput } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'app-theme-switcher-docs',
    templateUrl: './theme-switcher-docs.component.html'
})
export class ThemeSwitcherDocsComponent {
    themeSwitcherExample: ExampleFile[] = [
        {
            language: 'html',
            code: themeSwitcherSrc,
            fileName: 'theme-switcher-example'
        },
        {
            language: 'typescript',
            code: themeSwitcherSrcTs,
            fileName: 'theme-switcher-example',
            component: 'ThemeSwitcherExampleComponent'
        }
    ];

    themeUrlExample: ExampleFile[] = [
        {
            language: 'html',
            code: themeUrlSrc,
            fileName: 'theme-url-example'
        },
        {
            language: 'typescript',
            code: themeUrlSrcTs,
            fileName: 'theme-url-example',
            component: 'ThemeUrlExampleComponent'
        }
    ];

    constructor(private _docsThemeService: DocsThemeService) {}

    handleThemeChanged(theme: ThemeServiceOutput): void {
        this._docsThemeService.onThemeChange.next(theme);
    }
}
