import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as selectModeHtml from '!raw-loader!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.html';
import * as selectModeTs from '!raw-loader!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.ts';

import * as selectMobileHtml from '!raw-loader!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.html';
import * as selectMobileTs from '!raw-loader!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.ts';

import * as customTriggerHtml from '!raw-loader!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.html';
import * as customTriggerTs from '!raw-loader!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.ts';

import * as selectFormHtml from '!raw-loader!./platform-select-examples/platform-select-forms/platform-select-forms.component.html';
import * as selectFormTs from '!raw-loader!./platform-select-examples/platform-select-forms/platform-select-forms.component.ts';

import * as selectMaxHeightHtml from '!raw-loader!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.html';
import * as selectMaxHeightTs from '!raw-loader!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.ts';

import * as selectSemanticStateHtml from '!raw-loader!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.html';
import * as selectSemanticStateTs from '!raw-loader!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.ts';

import * as selectColumnsHtml from '!raw-loader!./platform-select-examples/platform-select-columns/platform-select-columns-example.component.html';
import * as selectColumnsTs from '!raw-loader!./platform-select-examples/platform-select-columns/platform-select-columns-example.component';

import * as selectNoneHtml from '!raw-loader!./platform-select-examples/platform-select-none/platform-select-none-example.component.html';
import * as selectNoneTs from '!raw-loader!./platform-select-examples/platform-select-none/platform-select-none-example.component';

import * as selectNoWrapHtml from '!raw-loader!./platform-select-examples/platform-select-nowrap/platform-select-nowrap-example.component.html';
import * as selectNoWrapTs from '!raw-loader!./platform-select-examples/platform-select-nowrap/platform-select-nowrap-example.component';

@Component({
    selector: 'fdp-select-docs',
    templateUrl: './platform-select-docs.component.html',
    styles: [
        `
            ul > li:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        `
    ]
})
export class PlatformSelectDocsComponent {
    selectMode: ExampleFile[] = [
        {
            language: 'html',
            code: selectModeHtml,
            fileName: 'platform-select-mode-example'
        },
        {
            language: 'typescript',
            fileName: 'platform-select-mode-example',
            code: selectModeTs,
            component: 'PlatformSelectModeExampleComponent'
        }
    ];

    selectColumns: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'platform-select-columns-example',
            code: selectColumnsHtml
        },
        {
            language: 'typescript',
            fileName: 'platform-select-columns-example',
            code: selectColumnsTs,
            component: 'PlatformSelectColumnsExampleComponent'
        }
    ];

    selectMobile: ExampleFile[] = [
        {
            language: 'html',
            code: selectMobileHtml,
            fileName: 'platform-select-mobile-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectMobileExampleComponent',
            code: selectMobileTs,
            fileName: 'platform-select-mobile-example'
        }
    ];

    selectNoWrap: ExampleFile[] = [
        {
            language: 'html',
            code: selectNoWrapHtml,
            fileName: 'platform-select-nowrap-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectNoWrapExampleComponent',
            code: selectNoWrapTs,
            fileName: 'platform-select-nowrap-example'
        }
    ];

    customSelectTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: customTriggerHtml,
            fileName: 'platform-select-custom-trigger'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectCustomTriggerComponent',
            code: customTriggerTs,
            fileName: 'platform-select-custom-trigger'
        }
    ];

    selectForm: ExampleFile[] = [
        {
            language: 'html',
            code: selectFormHtml,
            fileName: 'platform-select-forms'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectFormsComponent',
            code: selectFormTs,
            fileName: 'platform-select-forms'
        }
    ];

    selectMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: selectMaxHeightHtml,
            fileName: 'platform-select-max-height-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectMaxHeightExampleComponent',
            code: selectMaxHeightTs,
            fileName: 'platform-select-max-height-example'
        }
    ];

    selectNone: ExampleFile[] = [
        {
            language: 'html',
            code: selectNoneHtml,
            fileName: 'platform-select-none-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectNoneExampleComponent',
            code: selectNoneTs,
            fileName: 'platform-select-none-example'
        }
    ];

    selectSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: selectSemanticStateHtml,
            fileName: 'platform-select-max-height-example'
        },
        {
            language: 'typescript',
            component: 'PlatformSelectTypesExampleComponent',
            code: selectSemanticStateTs,
            fileName: 'platform-select-max-height-example'
        }
    ];
}
