import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as standardlinkSrc from '!raw-loader!./platform-link-examples/platform-link-standard-example.component.html';
import * as emphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-emphasized-example.component.html';
import * as disabledlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-example.component.html';
import * as disabledEmphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-emphasized-example.component.html';
import * as invertedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-inverted-example.component.html';
import * as truncatedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-truncated-example.component.html';
import * as iconlinkSrc from '!raw-loader!./platform-link-examples/platform-link-icon-example.component.html';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html'
})
export class PlatformLinkDocsComponent {
    standardLink: ExampleFile[] = [
        {
            language: 'html',
            code: standardlinkSrc,
            fileName: 'platform-link-standard-example'
        }
    ];

    emphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: emphasizedlinkSrc,
            fileName: 'platform-link-emphasized-example'
        }
    ];

    disabledLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledlinkSrc,
            fileName: 'platform-link-disabled-example'
        }
    ];

    disabledEmphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledEmphasizedlinkSrc,
            fileName: 'platform-link-disabled-emphasized-example'
        }
    ];

    invertedLink: ExampleFile[] = [
        {
            language: 'html',
            code: invertedlinkSrc,
            fileName: 'platform-link-inverted-example'
        }
    ];

    truncatedLink: ExampleFile[] = [
        {
            language: 'html',
            code: truncatedlinkSrc,
            fileName: 'platform-link-truncated-example'
        }
    ];

    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: iconlinkSrc,
            fileName: 'platform-link-icon-example'
        }
    ];
}
