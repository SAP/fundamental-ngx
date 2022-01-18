import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import standardlinkSrc from '!./platform-link-examples/platform-link-standard-example.component.html?raw';
import emphasizedlinkSrc from '!./platform-link-examples/platform-link-emphasized-example.component.html?raw';
import disabledlinkSrc from '!./platform-link-examples/platform-link-disabled-example.component.html?raw';
import disabledEmphasizedlinkSrc from '!./platform-link-examples/platform-link-disabled-emphasized-example.component.html?raw';
import invertedlinkSrc from '!./platform-link-examples/platform-link-inverted-example.component.html?raw';
import truncatedlinkSrc from '!./platform-link-examples/platform-link-truncated-example.component.html?raw';
import iconlinkSrc from '!./platform-link-examples/platform-link-icon-example.component.html?raw';

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
