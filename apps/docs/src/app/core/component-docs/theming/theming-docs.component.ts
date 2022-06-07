import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import themeSwitcherSrc from '!./examples/theming-example.component.html?raw';
import themeUrlSrc from '!./examples/theming-url-example.component.html?raw';
import themeSwitcherSrcTs from '!./examples/theming-example.component.ts?raw';
import themeUrlSrcTs from '!./examples/theming-url-example.component.ts?raw';
import themeConfigSrcTs from '!./examples/custom-config-example.ts?raw';
import customThemesSrcTs from '!./examples/custom-theme-example.component.ts?raw';
import customThemesSrcHtml from '!./examples/custom-theme-example.component.html?raw';

@Component({
    selector: 'app-theming-docs',
    templateUrl: './theming-docs.component.html'
})
export class ThemingDocsComponent {
    themeConfigExample: ExampleFile = {
        language: 'typescript',
        code: themeConfigSrcTs
    };

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

    customThemesExample: ExampleFile[] = [
        {
            language: 'html',
            code: customThemesSrcHtml,
            fileName: 'custom-theme-example'
        },
        {
            language: 'typescript',
            code: customThemesSrcTs,
            fileName: 'custom-theme-example',
            component: 'CustomThemeExampleComponent'
        }
    ];
}
