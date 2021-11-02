import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as selectModeHtml from '!raw-loader!./examples/select-mode-example/select-mode-example.component.html';
import * as selectModeTs from '!raw-loader!./examples/select-mode-example/select-mode-example.component.ts';

import * as selectProgressiveHtml from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.html';
import * as selectProgressiveScss from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.scss';
import * as selectProgressiveTs from '!raw-loader!./examples/select-programmatic-example/select-programmatic-example.component.ts';

import * as selectMobileHtml from '!raw-loader!./examples/select-mobile-example/select-mobile-example.component.html';
import * as selectMobileTs from '!raw-loader!./examples/select-mobile-example/select-mobile-example.component.ts';

import * as selectNestedHtml from '!raw-loader!./examples/select-nested-options/select-nested-options.component.html';
import * as selectNestedTs from '!raw-loader!./examples/select-nested-options/select-nested-options.component.ts';
import * as selectNestedScss from '!raw-loader!./examples/select-nested-options/select-nested-options.component.scss';

import * as customTriggerHtml from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.html';
import * as customTriggerTs from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.ts';
import * as customTriggerScss from '!raw-loader!./examples/select-custom-trigger/select-custom-trigger.component.scss';

import * as selectAddingHtml from '!raw-loader!./examples/select-adding-example/select-adding-example.component.html';
import * as selectAddingScss from '!raw-loader!./examples/select-adding-example/select-adding-example.component.scss';
import * as selectAddingTs from '!raw-loader!./examples/select-adding-example/select-adding-example.component.ts';

import * as selectFormHtml from '!raw-loader!./examples/select-forms/select-forms.component.html';
import * as selectFormTs from '!raw-loader!./examples/select-forms/select-forms.component.ts';

import * as selectMaxHeightHtml from '!raw-loader!./examples/select-height/select-max-height-example.component.html';
import * as selectMaxHeightTs from '!raw-loader!./examples/select-height/select-max-height-example.component.ts';

import * as selectSemanticStateHtml from '!raw-loader!./examples/select-semantic-state-example/select-semantic-state-example.component.html';
import * as selectSemanticStateTs from '!raw-loader!./examples/select-semantic-state-example/select-semantic-state-example.component.ts';

@Component({
    selector: 'fd-select-docs',
    templateUrl: './select-docs.component.html',
    styles: [
        `
            ul > li:not(:last-child) {
                margin-bottom: 0.5rem;
            }
        `
    ]
})
export class SelectDocsComponent {
    selectMode: ExampleFile[] = [
        {
            language: 'html',
            code: selectModeHtml,
            fileName: 'select-mode-example',
            typescriptFileCode: selectModeTs,
            component: 'SelectModeExampleComponent'
        }
    ];

    selectMobile: ExampleFile[] = [
        {
            language: 'html',
            code: selectMobileHtml,
            fileName: 'select-mobile-example'
        },
        {
            language: 'typescript',
            component: 'SelectMobileExampleComponent',
            code: selectMobileTs,
            fileName: 'select-mobile-example'
        }
    ];

    selectProgrammatic: ExampleFile[] = [
        {
            language: 'html',
            code: selectProgressiveHtml,
            fileName: 'select-programmatic-example',
            scssFileCode: selectProgressiveScss
        },
        {
            language: 'typescript',
            component: 'SelectProgrammaticExampleComponent',
            code: selectProgressiveTs,
            fileName: 'select-programmatic-example'
        }
    ];

    selectExtendedOptions: ExampleFile[] = [
        {
            language: 'html',
            code: selectNestedHtml,
            fileName: 'select-nested-options',
            typescriptFileCode: selectNestedTs,
            component: 'SelectNestedOptionsComponent',
            scssFileCode: selectNestedScss
        }
    ];

    customSelectTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: customTriggerHtml,
            fileName: 'select-custom-trigger',
            typescriptFileCode: customTriggerTs,
            component: 'SelectCustomTriggerComponent',
            scssFileCode: customTriggerScss
        }
    ];

    selectAdding: ExampleFile[] = [
        {
            language: 'html',
            code: selectAddingHtml,
            fileName: 'select-adding-example',
            scssFileCode: selectAddingScss
        },
        {
            language: 'typescript',
            component: 'SelectAddingExampleComponent',
            code: selectAddingTs,
            fileName: 'select-adding-example'
        }
    ];

    selectForm: ExampleFile[] = [
        {
            language: 'html',
            code: selectFormHtml,
            fileName: 'select-forms'
        },
        {
            language: 'typescript',
            component: 'SelectFormsComponent',
            code: selectFormTs,
            fileName: 'select-forms'
        }
    ];

    selectMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: selectMaxHeightHtml,
            fileName: 'select-max-height-example',
            typescriptFileCode: selectMaxHeightTs,
            component: 'SelectMaxHeightExampleComponent'
        }
    ];

    selectSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: selectSemanticStateHtml,
            fileName: 'select-semantic-state-example',
            typescriptFileCode: selectSemanticStateTs,
            component: 'SelectSemanticStateExampleComponent'
        }
    ];
}
