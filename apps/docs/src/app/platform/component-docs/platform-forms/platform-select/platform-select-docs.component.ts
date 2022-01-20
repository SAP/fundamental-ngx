import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import selectModeHtml from '!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.html?raw';
import selectModeTs from '!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.ts?raw';

import selectMobileHtml from '!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.html?raw';
import selectMobileTs from '!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.ts?raw';

import customTriggerHtml from '!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.html?raw';
import customTriggerTs from '!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.ts?raw';

import selectFormHtml from '!./platform-select-examples/platform-select-forms/platform-select-forms.component.html?raw';
import selectFormTs from '!./platform-select-examples/platform-select-forms/platform-select-forms.component.ts?raw';

import selectMaxHeightHtml from '!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.html?raw';
import selectMaxHeightTs from '!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.ts?raw';

import selectSemanticStateHtml from '!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.html?raw';
import selectSemanticStateTs from '!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.ts?raw';

import selectColumnsHtml from '!./platform-select-examples/platform-select-columns/platform-select-columns-example.component.html?raw';
import selectColumnsTs from '!./platform-select-examples/platform-select-columns/platform-select-columns-example.component?raw';

import selectNoneHtml from '!./platform-select-examples/platform-select-none/platform-select-none-example.component.html?raw';
import selectNoneTs from '!./platform-select-examples/platform-select-none/platform-select-none-example.component?raw';

import selectNoWrapHtml from '!./platform-select-examples/platform-select-nowrap/platform-select-nowrap-example.component.html?raw';
import selectNoWrapTs from '!./platform-select-examples/platform-select-nowrap/platform-select-nowrap-example.component?raw';

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
