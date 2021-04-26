import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as platformFooterExampleHtml from '!raw-loader!./platform-page-footer-example/platform-page-footer-example.component.html';
import * as platformFooterWithIconHtml from '!raw-loader!./platform-page-footer-example/platform-page-footer-with-icon-example.component.html';
import * as platformFooterWithMultipleLineHtml from '!raw-loader!./platform-page-footer-example/platform-page-footer-multiple-line-example.component.html';

@Component({
    selector: 'fdp-platform-page-footer-docs',
    templateUrl: './platform-page-footer-docs.component.html'
})
export class PlatformPageFooterDocsComponent {
    PlatformDefaultFooter: ExampleFile[] = [
        {
            language: 'html',
            code: platformFooterExampleHtml,
            fileName: 'platform-footer-example'
        }
    ];
    PlatformMultiLineFooter: ExampleFile[] = [
        {
            language: 'html',
            code: platformFooterWithMultipleLineHtml,
            fileName: 'platform-footer-multiple-line-example'
        }
    ];
    PlatformWithIconFooter: ExampleFile[] = [
        {
            language: 'html',
            code: platformFooterWithIconHtml,
            fileName: 'platform-footer-with-icon-example'
        }
    ];
}
