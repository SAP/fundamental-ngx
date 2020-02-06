import { Component, OnInit } from '@angular/core';
import * as standardlinkSrc from '!raw-loader!./platform-link-examples/platform-link-standard-example.component.html';
import * as emphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-emphasized-example.component.html';
import * as disabledlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-example.component.html';
import * as disabledEmphasizedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-disabled-emphasized-example.component.html';
import * as invertedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-inverted-example.component.html';
import * as truncatedlinkSrc from '!raw-loader!./platform-link-examples/platform-link-truncated-example.component.html';
import * as iconlinkSrc from '!raw-loader!./platform-link-examples/platform-link-icon-example.component.html';
import * as linkTsCode from '!raw-loader!./platform-link-examples/platform-link-examples.component.ts';
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
            fileName: 'platform-link-standard-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkStandardExampleComponent'
        }
    ];

    emphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: emphasizedlinkSrc,
            fileName: 'platform-link-emphasized-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkEmphasizedExampleComponent'
        }
    ];

    disabledLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledlinkSrc,
            fileName: 'platform-link-disabled-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkDisabledExampleComponent'
        }
    ];

    disabledEmphasizedLink: ExampleFile[] = [
        {
            language: 'html',
            code: disabledEmphasizedlinkSrc,
            fileName: 'platform-link-disabled-emphasized-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkDisabledEmphasizedExampleComponent'
        }
    ];

    invertedLink: ExampleFile[] = [
        {
            language: 'html',
            code: invertedlinkSrc,
            fileName: 'platform-link-inverted-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkInvertedExampleComponent'
        }
    ];

    truncatedLink: ExampleFile[] = [
        {
            language: 'html',
            code: truncatedlinkSrc,
            fileName: 'platform-link-truncated-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkTruncatedExampleComponent'
        }
    ];

    iconLink: ExampleFile[] = [
        {
            language: 'html',
            code: iconlinkSrc,
            fileName: 'platform-link-icon-example',
            secondFile: 'platform-link-examples',
            typescriptFileCode: linkTsCode,
            component: 'PlatformLinkIconExampleComponent'
        }
    ];

    constructor() {}

    ngOnInit() {}
}
