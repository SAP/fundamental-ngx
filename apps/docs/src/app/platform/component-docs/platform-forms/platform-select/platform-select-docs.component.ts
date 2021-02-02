import { Component } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

import * as selectModeHtml from '!raw-loader!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.html';
import * as selectModeTs from '!raw-loader!./platform-select-examples/platform-select-mode-example/platform-select-mode-example.component.ts';

import * as selectProgressiveHtml from '!raw-loader!./platform-select-examples/platform-select-programmatic-example/platform-select-programmatic-example.component.html';
import * as selectProgressiveScss from '!raw-loader!./platform-select-examples/platform-select-programmatic-example/platform-select-programmatic-example.component.scss';
import * as selectProgressiveTs from '!raw-loader!./platform-select-examples/platform-select-programmatic-example/platform-select-programmatic-example.component.ts';

import * as selectMobileHtml from '!raw-loader!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.html';
import * as selectMobileTs from '!raw-loader!./platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component.ts';

import * as selectNestedHtml from '!raw-loader!./platform-select-examples/platform-select-nested-options/platform-select-nested-options.component.html';
import * as selectNestedTs from '!raw-loader!./platform-select-examples/platform-select-nested-options/platform-select-nested-options.component.ts';
import * as selectNestedScss from '!raw-loader!./platform-select-examples/platform-select-nested-options/platform-select-nested-options.component.scss';

import * as customTriggerHtml from '!raw-loader!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.html';
import * as customTriggerTs from '!raw-loader!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.ts';
import * as customTriggerScss from '!raw-loader!./platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component.scss';

import * as selectAddingHtml from '!raw-loader!./platform-select-examples/platform-select-adding-example/platform-select-adding-example.component.html';
import * as selectAddingScss from '!raw-loader!./platform-select-examples/platform-select-adding-example/platform-select-adding-example.component.scss';
import * as selectAddingTs from '!raw-loader!./platform-select-examples/platform-select-adding-example/platform-select-adding-example.component.ts';

import * as selectFormHtml from '!raw-loader!./platform-select-examples/platform-select-forms/platform-select-forms.component.html';
import * as selectFormTs from '!raw-loader!./platform-select-examples/platform-select-forms/platform-select-forms.component.ts';

import * as selectMaxHeightHtml from '!raw-loader!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.html';
import * as selectMaxHeightTs from '!raw-loader!./platform-select-examples/platform-select-height/platform-select-max-height-example.component.ts';

import * as selectSemanticStateHtml from '!raw-loader!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.html';
import * as selectSemanticStateTs from '!raw-loader!./platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component.ts';

@Component({
    selector: 'fdp-select-docs',
    templateUrl: './platform-select-docs.component.html',
    styles: [`ul > li:not(:last-child) { margin-bottom: 0.5rem }`]
})
export class PlatformSelectDocsComponent {
    selectMode: ExampleFile[] = [
        {
            language: 'html',
            code: selectModeHtml,
            fileName: 'platform-select-mode-example',
            typescriptFileCode: selectModeTs,
            component: 'PlatformSelectModeExampleComponent'
        }
    ];

    selectMobile: ExampleFile[] = [
        {
            language: 'html',
            code: selectMobileHtml,
            fileName: 'platform-select-mobile-example',
        },
        {
            language: 'typescript',
            component: 'PlatformSelectMobileExampleComponent',
            code: selectMobileTs,
            fileName: 'platform-select-mobile-example',
        }
    ];

    selectProgrammatic: ExampleFile[] = [
        {
            language: 'html',
            code: selectProgressiveHtml,
            fileName: 'platform-select-programmatic-example',
            scssFileCode: selectProgressiveScss

        },
        {
            language: 'typescript',
            component: 'PlatformSelectProgrammaticExampleComponent',
            code: selectProgressiveTs,
            fileName: 'platform-select-programmatic-example'
        }
    ];

    selectExtendedOptions: ExampleFile[] = [
        {
            language: 'html',
            code: selectNestedHtml,
            fileName: 'platform-select-nested-options',
            typescriptFileCode: selectNestedTs,
            component: 'PlatformSelectNestedOptionsComponent',
            scssFileCode: selectNestedScss
        }
    ];

    customSelectTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: customTriggerHtml,
            fileName: 'platform-select-custom-trigger',
            typescriptFileCode: customTriggerTs,
            component: 'PlatformSelectCustomTriggerComponent',
            scssFileCode: customTriggerScss
        }
    ];

    selectAdding: ExampleFile[] = [
        {
            language: 'html',
            code: selectAddingHtml,
            fileName: 'platform-select-adding-example',
            scssFileCode: selectAddingScss
        },
        {
            language: 'typescript',
            component: 'PlatformSelectAddingExampleComponent',
            code: selectAddingTs,
            fileName: 'platform-select-adding-example'
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
            fileName: 'platform-select-max-height-example',
            typescriptFileCode: selectMaxHeightTs,
            component: 'PlatformSelectMaxHeightExampleComponent'
        }
    ];

    selectSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: selectSemanticStateHtml,
            fileName: 'platform-select-types-example',
            typescriptFileCode: selectSemanticStateTs,
            component: 'PlatformSelectTypesExampleComponent'
        }
    ];
}
