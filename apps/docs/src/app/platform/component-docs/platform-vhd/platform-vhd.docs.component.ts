import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as basicVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-basic-example.component.html';
import * as basicVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-basic-example.component.ts';

import * as strategyLabelsVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-strategy-labels-example.component.html';
import * as strategyLabelsVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-strategy-labels-example.component.ts';

import * as tokenVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-token-example.component.html';
import * as tokenVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-token-example.component.ts';

import * as inputVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-input-example.component.html';
import * as inputVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-input-example.component.ts';

import * as multiInputVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-multi-input-example.component.html';
import * as multiInputVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-multi-input-example.component.ts';

import * as mobileVhdHtml from '!raw-loader!./platform-vhd-examples/platform-vhd-mobile-example.component.html';
import * as mobileVhdTs from '!raw-loader!./platform-vhd-examples/platform-vhd-mobile-example.component.ts';

@Component({
    selector: 'app-platform-vhd',
    templateUrl: './platform-vhd.docs.component.html'
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

    strategyLabelValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: strategyLabelsVhdHtml,
            fileName: 'platform-vhd-strategy-labels-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdStrategyLabelExampleComponent',
            code: strategyLabelsVhdTs,
            fileName: 'platform-vhd-strategy-labels-example'
        }
    ];

    tokenValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: tokenVhdHtml,
            fileName: 'platform-vhd-token-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdTokenExampleComponent',
            code: tokenVhdTs,
            fileName: 'platform-vhd-token-example'
        }
    ];

    inputValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: inputVhdHtml,
            fileName: 'platform-vhd-input-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdInputExampleComponent',
            code: inputVhdTs,
            fileName: 'platform-vhd-input-example'
        }
    ];

    multiInputValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: multiInputVhdHtml,
            fileName: 'platform-vhd-multi-input-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdMultiInputExampleComponent',
            code: multiInputVhdTs,
            fileName: 'platform-vhd-multi-input-example'
        }
    ];

    mobileValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: mobileVhdHtml,
            fileName: 'platform-vhd-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdMobileExampleComponent',
            code: mobileVhdTs,
            fileName: 'platform-vhd-mobile-example'
        }
    ];
}
