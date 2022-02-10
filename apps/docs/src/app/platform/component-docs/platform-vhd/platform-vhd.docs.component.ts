import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import basicVhdHtml from '!./platform-vhd-examples/platform-vhd-basic-example.component.html?raw';
import basicVhdTs from '!./platform-vhd-examples/platform-vhd-basic-example.component.ts?raw';

import strategyLabelsVhdHtml from '!./platform-vhd-examples/platform-vhd-strategy-labels-example.component.html?raw';
import strategyLabelsVhdTs from '!./platform-vhd-examples/platform-vhd-strategy-labels-example.component.ts?raw';

import tokenVhdHtml from '!./platform-vhd-examples/platform-vhd-token-example.component.html?raw';
import tokenVhdTs from '!./platform-vhd-examples/platform-vhd-token-example.component.ts?raw';

import inputVhdHtml from '!./platform-vhd-examples/platform-vhd-input-example.component.html?raw';
import inputVhdTs from '!./platform-vhd-examples/platform-vhd-input-example.component.ts?raw';

import multiInputVhdHtml from '!./platform-vhd-examples/platform-vhd-multi-input-example.component.html?raw';
import multiInputVhdTs from '!./platform-vhd-examples/platform-vhd-multi-input-example.component.ts?raw';

import mobileVhdHtml from '!./platform-vhd-examples/platform-vhd-mobile-example.component.html?raw';
import mobileVhdTs from '!./platform-vhd-examples/platform-vhd-mobile-example.component.ts?raw';

import loadingVhdHtml from '!./platform-vhd-examples/platform-vhd-loading-example.component.html?raw';
import loadingVhdTs from '!./platform-vhd-examples/platform-vhd-loading-example.component.ts?raw';

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

    loadingValueHelpDialog: ExampleFile[] = [
        {
            language: 'html',
            code: loadingVhdHtml,
            fileName: 'platform-vhd-loading-example'
        },
        {
            language: 'typescript',
            component: 'PlatformVhdLoadingExampleComponent',
            code: loadingVhdTs,
            fileName: 'platform-vhd-loading-example'
        }
    ];
}
