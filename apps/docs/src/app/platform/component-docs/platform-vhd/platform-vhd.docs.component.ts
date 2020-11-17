import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as basicVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-basic-example.component.html';
import * as basicVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-basic-example.component.ts';

import * as tokenVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-token-example.component.html';
import * as tokenVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-token-example.component.ts';

@Component({
    selector: 'app-platform-vhd',
    templateUrl: './platform-vhd.docs.component.html',

})
export class PlatformVhdDocsComponent {

    basicValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: basicVhdHtml,
            fileName: 'platform-vhd-basic-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdBasicExampleComponent',
            code: basicVhdTs,
            fileName: 'platform-vhd-basic-example'
        }
    ];

    tokenValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: tokenVhdHtml,
            fileName: 'platform-vhd-display-token-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdTokenExampleComponent',
            code: tokenVhdTs,
            fileName: 'platform-vhd-token-example'
        }
    ];
}
