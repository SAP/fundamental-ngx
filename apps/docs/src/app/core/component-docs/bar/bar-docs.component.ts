import { Component } from '@angular/core';

import * as barDefaultExampleHtml from '!raw-loader!./examples/bar-default-example.component.html';
import * as barDefaultExampleTs from '!raw-loader!./examples/bar-default-example.component.ts';
import * as barHeaderExampleHtml from '!raw-loader!./examples/bar-header-example.component.html';
import * as barHeaderExampleTs from '!raw-loader!./examples/bar-header-example.component.ts';
import * as barSubHeaderExampleHtml from '!raw-loader!./examples/bar-subheader-example.component.html';
import * as barHeaderSubHeaderExampleHtml from '!raw-loader!./examples/bar-header-subheader-example.component.html';
import * as barFooterExampleHtml from '!raw-loader!./examples/bar-footer-example.component.html';
import * as barFloatingFooterExampleHtml from '!raw-loader!./examples/bar-floating-footer-example.component.html';
import * as barPageExampleHtml from '!raw-loader!./examples/bar-page-example.component.html';
import * as barPageExampleTs from '!raw-loader!./examples/bar-page-example.component.ts';
import * as barPageResponsiveExampleHtml from '!raw-loader!./examples/bar-page-responsive-example.component.html';
import * as barPageResponsiveExampleTs from '!raw-loader!./examples/bar-page-responsive-example.component.ts';
import * as barWithTitleExampleHtml from '!raw-loader!./examples/bar-with-title-example.component.html';
import * as barWithTitleExampleTs from '!raw-loader!./examples/bar-with-title-example.component.ts';

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
}
