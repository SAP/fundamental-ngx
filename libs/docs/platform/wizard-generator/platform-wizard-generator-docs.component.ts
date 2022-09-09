import { Component } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultHtmlExample = 'wizard-generator-default-example.component.html';
const defaultTsExample = 'wizard-generator-default-example.component.ts';

const dialogHtmlExample = 'wizard-generator-dialog-example.component.html';
const dialogTsExample = 'wizard-generator-dialog-example.component.ts';

const customizableHtmlExample = 'wizard-generator-customizable-example.component.html';
const customizableTsExample = 'wizard-generator-customizable-example.component.ts';

const customizableEmbededHtmlExample = 'wizard-generator-customizable-embeded-example.component.html';
const customizableEmbededTsExample = 'wizard-generator-customizable-embeded-example.component.ts';

const conditionHtmlExample = 'wizard-generator-condition-example.component.html';
const conditionTsExample = 'wizard-generator-condition-example.component.ts';

const responsiveHtmlExample = 'wizard-generator-responsive-paddings-example.component.html';
const responsiveTsExample = 'wizard-generator-responsive-paddings-example.component.ts';

const responsiveDialogHtmlExample = 'wizard-generator-responsive-dialog-example.component.html';
const responsiveDialogTsExample = 'wizard-generator-responsive-dialog-example.component.ts';

const visibleSummaryHtmlExample = 'wizard-generator-visible-summary-example.component.html';
const visibleSummaryTsExample = 'wizard-generator-visible-summary-example.component.ts';

const visibleBranchingSummaryHtmlExample = 'wizard-generator-visible-summary-branching-example.component.html';
const visibleBranchingSummaryTsExample = 'wizard-generator-visible-summary-branching-example.component.ts';

const externalNavigationHtmlExample = 'wizard-generator-external-navigation-example.component.html';
const externalNavigationTsExample = 'wizard-generator-external-navigation-example.component.ts';

const summaryObjectsHtmlExample = 'wizard-generator-summary-objects-example.component.html';
const summaryObjectsTsExample = 'wizard-generator-summary-objects-example.component.ts';

const interactionHtmlExample = 'wizard-generator-onchange-example.component.html';
const interactionTsExample = 'wizard-generator-onchange-example.component.ts';

const whenConditionHtmlExample = 'wizard-generator-visibility-between-steps-example.component.html';
const whenConditionTsExample = 'wizard-generator-visibility-between-steps-example.component.ts';

const specialElementsHtmlExamples = 'wizard-generator-special-elements-example.component.html';
const specialElementsTsExamples = 'wizard-generator-special-elements-example.component.ts';

@Component({
    selector: 'fdp-platform-wizard-generator-docs',
    templateUrl: './platform-wizard-generator-docs.component.html'
})
export class PlatformWizardGeneratorDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultHtmlExample),
            fileName: 'wizard-generator-default-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultTsExample),
            fileName: 'wizard-generator-default-example',
            component: 'WizardGeneratorDefaultExampleComponent'
        }
    ];

    dialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dialogHtmlExample),
            fileName: 'wizard-generator-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dialogTsExample),
            fileName: 'wizard-generator-dialog-example',
            component: 'WizardGeneratorDialogExampleComponent'
        }
    ];

    customizableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customizableHtmlExample),
            fileName: 'wizard-generator-customizable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customizableTsExample),
            fileName: 'wizard-generator-customizable-example',
            component: 'WizardGeneratorCustomizableExampleComponent'
        }
    ];

    customizableEmbededExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(customizableEmbededHtmlExample),
            fileName: 'wizard-generator-customizable-embeded-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(customizableEmbededTsExample),
            fileName: 'wizard-generator-customizable-embeded-example',
            component: 'WizardGeneratorCustomizableEmbededExampleComponent'
        }
    ];

    branchingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(responsiveHtmlExample),
            fileName: 'wizard-generator-condition-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(conditionTsExample),
            fileName: 'wizard-generator-condition-example',
            component: 'WizardGeneratorConditionExampleComponent'
        }
    ];

    responsivePaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(conditionHtmlExample),
            fileName: 'wizard-generator-responsive-paddings-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(responsiveTsExample),
            fileName: 'wizard-generator-responsive-paddings-example',
            component: 'WizardGeneratorResponsivePaddingsExampleComponent'
        }
    ];

    visibleSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(visibleSummaryHtmlExample),
            fileName: 'wizard-generator-visible-summary-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(visibleSummaryTsExample),
            fileName: 'wizard-generator-visible-summary-example',
            component: 'WizardGeneratorVisibleSummaryExampleComponent'
        }
    ];

    visibleBranchingSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(visibleBranchingSummaryHtmlExample),
            fileName: 'wizard-generator-visible-summary-branching-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(visibleBranchingSummaryTsExample),
            fileName: 'wizard-generator-visible-summary-branching-example',
            component: 'WizardGeneratorVisibleSummaryBranchingExampleComponent'
        }
    ];

    responsiveDialogPaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(responsiveDialogHtmlExample),
            fileName: 'wizard-generator-responsive-dialog-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(responsiveDialogTsExample),
            fileName: 'wizard-generator-responsive-dialog-example',
            component: 'WizardGeneratorResponsiveDialogExampleComponent'
        }
    ];

    summaryObjectsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(summaryObjectsHtmlExample),
            fileName: 'wizard-generator-summary-objects-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(summaryObjectsTsExample),
            fileName: 'wizard-generator-summary-objects-example',
            component: 'WizardGeneratorSummaryObjectsExampleComponent'
        }
    ];

    externalNavigationObjectsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(externalNavigationHtmlExample),
            fileName: 'wizard-generator-external-navigation-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(externalNavigationTsExample),
            fileName: 'wizard-generator-external-navigation-example',
            component: 'WizardGeneratorExternalNavigationExampleComponent'
        }
    ];

    fieldsInteractionExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactionHtmlExample),
            fileName: 'wizard-generator-onchange-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(interactionTsExample),
            fileName: 'wizard-generator-onchange-example',
            component: 'WizardGeneratorOnchangeExampleComponent'
        }
    ];

    fieldsVisibilityExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(whenConditionHtmlExample),
            fileName: 'wizard-generator-onchange-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(whenConditionTsExample),
            fileName: 'wizard-generator-visibility-between-steps-example',
            component: 'WizardGeneratorVisibilityBetweenStepsExampleComponent'
        }
    ];
    specialElementsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(specialElementsHtmlExamples),
            fileName: 'wizard-generator-special-elements-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(specialElementsTsExamples),
            fileName: 'wizard-generator-special-elements-example',
            component: 'WizardGeneratorSpecialElementsExampleComponent'
        }
    ];
    specialElementsExamplesHTML: string;

    constructor() {}
}
