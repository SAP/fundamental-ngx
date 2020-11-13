import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as themeSwitcherSrc from '!raw-loader!./examples/theme-switcher-example.component.html';
import * as themeUrlSrc from '!raw-loader!./examples/theme-url-example.component.html';
import * as themeSwitcherSrcTs from '!raw-loader!./examples/theme-switcher-example.component.ts';
import * as themeUrlSrcTs from '!raw-loader!./examples/theme-url-example.component.ts';


@Component({
    selector: 'app-theme-switcher-docs',
    templateUrl: './theme-switcher-docs.component.html'
})

export class ThemeSwitcherDocsComponent {

    themeSwitcherExample: ExampleFile[] = [
        {
            language: 'html',
            code: themeSwitcherSrc,
            fileName: 'theme-switcher-example',
            typescriptFileCode: themeSwitcherSrcTs,
            component: 'ThemeSwitcherExampleComponent'
        }
    ];

    themeUrlExample: ExampleFile[] = [
        {
            language: 'html',
            code: themeUrlSrc,
            fileName: 'theme-url-example',
            typescriptFileCode: themeUrlSrcTs,
            component: 'ThemeUrlExampleComponent'
        }
    ];

    themeUrlCode: ExampleFile = {
        language: 'typescript',
        code: themeUrlSrcTs
    };

}
