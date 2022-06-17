import { Component } from '@angular/core';

import barDefaultExampleHtml from '!./examples/bar-default-example.component.html?raw';
import barDefaultExampleTs from '!./examples/bar-default-example.component.ts?raw';
import barHeaderExampleHtml from '!./examples/bar-header-example.component.html?raw';
import barHeaderExampleTs from '!./examples/bar-header-example.component.ts?raw';
import barSubHeaderExampleHtml from '!./examples/bar-subheader-example.component.html?raw';
import barHeaderSubHeaderExampleHtml from '!./examples/bar-header-subheader-example.component.html?raw';
import barFooterExampleHtml from '!./examples/bar-footer-example.component.html?raw';
import barFloatingFooterExampleHtml from '!./examples/bar-floating-footer-example.component.html?raw';
import barPageExampleHtml from '!./examples/bar-page-example.component.html?raw';
import barPageExampleTs from '!./examples/bar-page-example.component.ts?raw';
import barPageResponsiveExampleHtml from '!./examples/bar-page-responsive-example.component.html?raw';
import barPageResponsiveExampleTs from '!./examples/bar-page-responsive-example.component.ts?raw';
import barWithTitleExampleHtml from '!./examples/bar-with-title-example.component.html?raw';
import barWithTitleExampleTs from '!./examples/bar-with-title-example.component.ts?raw';
import barCustomColorsExampleHtml from '!./examples/bar-custom-colors-example.component.html?raw';
import barCustomColorsExampleScss from '!./examples/bar-custom-colors-example.component.scss?raw';
import barCustomColorsExampleTs from '!./examples/bar-custom-colors-example.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-bar',
    templateUrl: './bar-docs.component.html'
})
export class BarDocsComponent {
    barDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-default-example',
            code: barDefaultExampleHtml
        },
        {
            language: 'typescript',
            code: barDefaultExampleTs,
            fileName: 'bar-default-example',
            component: 'BarDefaultExampleComponent'
        }
    ];

    barHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-example',
            code: barHeaderExampleHtml
        },
        {
            language: 'typescript',
            code: barHeaderExampleTs,
            fileName: 'bar-header-example',
            component: 'BarHeaderExampleComponent'
        }
    ];

    barSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-subheader-example',
            code: barSubHeaderExampleHtml
        }
    ];

    barHeaderSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-subheader-example',
            code: barHeaderSubHeaderExampleHtml
        }
    ];

    barFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-footer-example',
            code: barFooterExampleHtml
        }
    ];

    barFloatingFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-floating-footer-example',
            code: barFloatingFooterExampleHtml
        }
    ];

    barPageExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-example',
            code: barPageExampleHtml
        },
        {
            language: 'typescript',
            code: barPageExampleTs,
            fileName: 'bar-page-example',
            component: 'BarPageExampleComponent'
        }
    ];

    barPageResponsiveExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-responsive-example',
            code: barPageResponsiveExampleHtml
        },
        {
            language: 'typescript',
            code: barPageResponsiveExampleTs,
            fileName: 'bar-page-responsive-example',
            component: 'BarPageResponsiveExampleComponent'
        }
    ];
    barTitleExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-with-title-example',
            code: barWithTitleExampleHtml
        },
        {
            language: 'typescript',
            code: barWithTitleExampleTs,
            fileName: 'bar-with-title-example',
            component: 'BarWithTitleExampleComponent'
        }
    ];
    barCustomColorsExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-custom-colors-example',
            code: barCustomColorsExampleHtml,
            scssFileCode: barCustomColorsExampleScss
        },
        {
            language: 'typescript',
            code: barCustomColorsExampleTs,
            fileName: 'bar-custom-colors-example',
            component: 'BarCustomColorsExampleComponent'
        }
    ];
}
