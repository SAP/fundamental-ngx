import { Component } from '@angular/core';

import * as barDefaultExampleHtml from '!raw-loader!./examples/bar-default-example.component.html';
import * as barHeaderExampleHtml from '!raw-loader!./examples/bar-header-example.component.html';
import * as barSubHeaderExampleHtml from '!raw-loader!./examples/bar-subheader-example.component.html';
import * as barHeaderSubHeaderExampleHtml from '!raw-loader!./examples/bar-header-subheader-example.component.html';
import * as barFooterExampleHtml from '!raw-loader!./examples/bar-footer-example.component.html';
import * as barFloatingFooterExampleHtml from '!raw-loader!./examples/bar-floating-footer-example.component.html';
import * as barPageExampleHtml from '!raw-loader!./examples/bar-page-example.component.html';
import * as barPageResponsiveExampleHtml from '!raw-loader!./examples/bar-page-responsive-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';


@Component({
    selector: 'app-bar',
    templateUrl: './bar-docs.component.html',
})
export class BarDocsComponent {

    barDefaultExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-default-example',
            code: barDefaultExampleHtml,
        },
    ];

    barHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-example',
            code: barHeaderExampleHtml,
        },
    ];

    barSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-subheader-example',
            code: barSubHeaderExampleHtml,
        },
    ];

    barHeaderSubHeaderExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-header-subheader-example',
            code: barHeaderSubHeaderExampleHtml,
        },
    ];

    barFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-footer-example',
            code: barFooterExampleHtml,
        },
    ];

    barFloatingFooterExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-floating-footer-example',
            code: barFloatingFooterExampleHtml,
        },
    ];

    barPageExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-example',
            code: barPageExampleHtml,
        },
    ];

    barPageResponsiveExample: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'bar-page-responsive-example',
            code: barPageResponsiveExampleHtml,
        },
    ];

}
