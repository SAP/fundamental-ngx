import { Component, OnInit } from '@angular/core';
import * as standardlinkSrc from '!raw-loader!./platform-link-examples/platform-link-standard-example.component.html';
import * as standardlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-standard-example.component.ts';

import * as emphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-emphasized-example.component.html';
import * as emphasizedlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-emphasized-example.component.ts';

import * as disabledlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-example.component.html';
import * as disabledlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-disabled-example.component.ts';

import * as disabledEmphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-emphasized-example.component.html';
import * as disabledEmphasizedlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-disabled-emphasized-example.component.ts';

import * as invertedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-inverted-example.component.html';
import * as invertedlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-inverted-example.component.ts';

import * as truncatedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-truncated-example.component.html';
import * as truncatedlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-truncated-example.component.ts';

import * as iconlinkSrc from '!raw-loader!./platform-link-examples/platform-link-icon-example.component.html';
import * as iconlinkTsCode from '!raw-loader!./platform-link-examples/platform-link-icon-example.component.ts';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-link',
    templateUrl: './platform-link-docs.component.html',
    styleUrls: ['./platform-link-docs.component.scss']
})
export class PlatformLinkDocsComponent implements OnInit {
    standardLink: ExampleFile[] = [
        {
            language: 'html',
            code: standardlinkSrc,
            fileName: 'platform-link-standard-example'
        },
        {
            language: 'typescript',
            code: standardlinkTsCode,
            fileName: 'platform-link-standard-example',
            component: 'PlatformLinkStandardExampleComponent'
        }
    ];

    emphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: emphasizedlinkSrc,
            fileName: 'platform-link-emphasized-example'
        },
        {
            language: 'typescript',
            code: emphasizedlinkTsCode,
            fileName: 'platform-link-emphasized-example',
            component: 'PlatformLinkEmphasizedExampleComponent'
        }
    ];

    disabledLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledlinkSrc,
            fileName: 'platform-link-disabled-example'
        },
        {
            language: 'typescript',
            code: disabledlinkTsCode,
            fileName: 'platform-link-disabled-example',
            component: 'PlatformLinkDisabledExampleComponent'
        }
    ];

    disabledEmphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledEmphasizedlinkSrc,
            fileName: 'platform-link-disabled-emphasized-example'
        },
        {
            language: 'typescript',
            code: disabledEmphasizedlinkTsCode,
            fileName: 'platform-link-disabled-emphasized-example',
            component: 'PlatformLinkDisabledEmphasizedExampleComponent'
        }
    ];

    invertedLink: ExampleFile[] = [
        {
            language: 'html',
            code: invertedlinkSrc,
            fileName: 'platform-link-inverted-example'
        },
        {
            language: 'typescript',
            code: invertedlinkTsCode,
            fileName: 'platform-link-inverted-example',
            component: 'PlatformLinkInvertedExampleComponent'
        }
    ];

    truncatedLink: ExampleFile[] = [
        {
            language: 'html',
            code: truncatedlinkSrc,
            fileName: 'platform-link-truncated-example'
        },
        {
            language: 'typescript',
            code: truncatedlinkTsCode,
            fileName: 'platform-link-truncated-example',
            component: 'PlatformLinkTruncatedExampleComponent'
        }
    ];

    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: iconlinkSrc,
            fileName: 'platform-link-icon-example'
        },
        {
            language: 'typescript',
            code: iconlinkTsCode,
            fileName: 'platform-link-icon-example',
            component: 'PlatformLinkIconExampleComponent'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
