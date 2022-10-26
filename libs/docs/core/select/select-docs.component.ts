import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const selectProgressiveScss = 'select-programmatic-example/select-programmatic-example.component.scss';
const selectNestedScss = 'select-nested-options/select-nested-options.component.scss';
const customTriggerScss = 'select-custom-trigger/select-custom-trigger.component.scss';
const selectAddingScss = 'select-adding-example/select-adding-example.component.scss';

const selectModeHtml = 'select-mode-example/select-mode-example.component.html';
const selectModeTs = 'select-mode-example/select-mode-example.component.ts';

const selectProgressiveHtml = 'select-programmatic-example/select-programmatic-example.component.html';
const selectProgressiveTs = 'select-programmatic-example/select-programmatic-example.component.ts';

const selectMobileHtml = 'select-mobile-example/select-mobile-example.component.html';
const selectMobileTs = 'select-mobile-example/select-mobile-example.component.ts';

const selectNestedHtml = 'select-nested-options/select-nested-options.component.html';
const selectNestedTs = 'select-nested-options/select-nested-options.component.ts';
const customTriggerHtml = 'select-custom-trigger/select-custom-trigger.component.html';
const customTriggerTs = 'select-custom-trigger/select-custom-trigger.component.ts';
const selectAddingHtml = 'select-adding-example/select-adding-example.component.html';
const selectAddingTs = 'select-adding-example/select-adding-example.component.ts';

const selectFormHtml = 'select-forms/select-forms.component.html';
const selectFormTs = 'select-forms/select-forms.component.ts';

const selectMaxHeightHtml = 'select-height/select-max-height-example.component.html';
const selectMaxHeightTs = 'select-height/select-max-height-example.component.ts';

const selectSemanticStateHtml = 'select-semantic-state-example/select-semantic-state-example.component.html';
const selectSemanticStateTs = 'select-semantic-state-example/select-semantic-state-example.component.ts';

const selectCustomComparatorHtml = 'select-custom-comparator-example/select-custom-comparator-example.component.html';
const selectCustomComparatorTs = 'select-custom-comparator-example/select-custom-comparator-example.component.ts';

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
            code: getAssetFromModuleAssets(selectModeHtml),
            fileName: 'select-mode-example',
            typescriptFileCode: getAssetFromModuleAssets(selectModeTs),
            component: 'SelectModeExampleComponent'
        }
    ];

    selectMobile: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectMobileHtml),
            fileName: 'select-mobile-example'
        },
        {
            language: 'typescript',
            component: 'SelectMobileExampleComponent',
            code: getAssetFromModuleAssets(selectMobileTs),
            fileName: 'select-mobile-example'
        }
    ];

    selectProgrammatic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectProgressiveHtml),
            fileName: 'select-programmatic-example',
            scssFileCode: getAssetFromModuleAssets(selectProgressiveScss)
        },
        {
            language: 'typescript',
            component: 'SelectProgrammaticExampleComponent',
            code: getAssetFromModuleAssets(selectProgressiveTs),
            fileName: 'select-programmatic-example'
        }
    ];

    selectExtendedOptions: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectNestedHtml),
            fileName: 'select-nested-options',
            typescriptFileCode: getAssetFromModuleAssets(selectNestedTs),
            component: 'SelectNestedOptionsComponent',
            scssFileCode: getAssetFromModuleAssets(selectNestedScss)
        }
    ];

    customSelectTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customTriggerHtml),
            fileName: 'select-custom-trigger',
            typescriptFileCode: getAssetFromModuleAssets(customTriggerTs),
            component: 'SelectCustomTriggerComponent',
            scssFileCode: getAssetFromModuleAssets(customTriggerScss)
        }
    ];

    selectAdding: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectAddingHtml),
            fileName: 'select-adding-example',
            scssFileCode: getAssetFromModuleAssets(selectAddingScss)
        },
        {
            language: 'typescript',
            component: 'SelectAddingExampleComponent',
            code: getAssetFromModuleAssets(selectAddingTs),
            fileName: 'select-adding-example'
        }
    ];

    selectForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectFormHtml),
            fileName: 'select-forms'
        },
        {
            language: 'typescript',
            component: 'SelectFormsComponent',
            code: getAssetFromModuleAssets(selectFormTs),
            fileName: 'select-forms'
        }
    ];

    selectMaxHeight: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectMaxHeightHtml),
            fileName: 'select-max-height-example',
            typescriptFileCode: getAssetFromModuleAssets(selectMaxHeightTs),
            component: 'SelectMaxHeightExampleComponent'
        }
    ];

    selectSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectSemanticStateHtml),
            fileName: 'select-semantic-state-example',
            typescriptFileCode: getAssetFromModuleAssets(selectSemanticStateTs),
            component: 'SelectSemanticStateExampleComponent'
        }
    ];

    selectCustomComparator: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectCustomComparatorHtml),
            fileName: 'select-custom-comparator-example'
        },
        {
            language: 'typescript',
            component: 'SelectCustomComparatorExample',
            code: getAssetFromModuleAssets(selectCustomComparatorTs),
            fileName: 'select-custom-comparator-example'
        }
    ];
}
