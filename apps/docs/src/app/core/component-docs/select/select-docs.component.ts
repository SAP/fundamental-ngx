import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import selectModeHtml from '!./examples/select-mode-example/select-mode-example.component.html?raw';
import selectModeTs from '!./examples/select-mode-example/select-mode-example.component.ts?raw';

import selectProgressiveHtml from '!./examples/select-programmatic-example/select-programmatic-example.component.html?raw';
import selectProgressiveScss from '!./examples/select-programmatic-example/select-programmatic-example.component.scss?raw';
import selectProgressiveTs from '!./examples/select-programmatic-example/select-programmatic-example.component.ts?raw';

import selectMobileHtml from '!./examples/select-mobile-example/select-mobile-example.component.html?raw';
import selectMobileTs from '!./examples/select-mobile-example/select-mobile-example.component.ts?raw';

import selectNestedHtml from '!./examples/select-nested-options/select-nested-options.component.html?raw';
import selectNestedTs from '!./examples/select-nested-options/select-nested-options.component.ts?raw';
import selectNestedScss from '!./examples/select-nested-options/select-nested-options.component.scss?raw';

import customTriggerHtml from '!./examples/select-custom-trigger/select-custom-trigger.component.html?raw';
import customTriggerTs from '!./examples/select-custom-trigger/select-custom-trigger.component.ts?raw';
import customTriggerScss from '!./examples/select-custom-trigger/select-custom-trigger.component.scss?raw';

import selectAddingHtml from '!./examples/select-adding-example/select-adding-example.component.html?raw';
import selectAddingScss from '!./examples/select-adding-example/select-adding-example.component.scss?raw';
import selectAddingTs from '!./examples/select-adding-example/select-adding-example.component.ts?raw';

import selectFormHtml from '!./examples/select-forms/select-forms.component.html?raw';
import selectFormTs from '!./examples/select-forms/select-forms.component.ts?raw';

import selectMaxHeightHtml from '!./examples/select-height/select-max-height-example.component.html?raw';
import selectMaxHeightTs from '!./examples/select-height/select-max-height-example.component.ts?raw';

import selectSemanticStateHtml from '!./examples/select-semantic-state-example/select-semantic-state-example.component.html?raw';
import selectSemanticStateTs from '!./examples/select-semantic-state-example/select-semantic-state-example.component.ts?raw';

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
