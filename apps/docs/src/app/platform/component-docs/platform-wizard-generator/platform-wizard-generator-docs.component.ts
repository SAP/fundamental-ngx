import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import defaultHtmlExample from '!./examples/wizard-generator-default-example.component.html?raw';
import defaultTsExample from '!./examples/wizard-generator-default-example.component.ts?raw';

import dialogHtmlExample from '!./examples/wizard-generator-dialog-example.component.html?raw';
import dialogTsExample from '!./examples/wizard-generator-dialog-example.component.ts?raw';

import customizableHtmlExample from '!./examples/wizard-generator-customizable-example.component.html?raw';
import customizableTsExample from '!./examples/wizard-generator-customizable-example.component.ts?raw';

import customizableEmbededHtmlExample from '!./examples/wizard-generator-customizable-embeded-example.component.html?raw';
import customizableEmbededTsExample from '!./examples/wizard-generator-customizable-embeded-example.component.ts?raw';

import conditionHtmlExample from '!./examples/wizard-generator-condition-example.component.html?raw';
import conditionTsExample from '!./examples/wizard-generator-condition-example.component.ts?raw';

import responsiveHtmlExample from '!./examples/wizard-generator-responsive-paddings-example.component.html?raw';
import responsiveTsExample from '!./examples/wizard-generator-responsive-paddings-example.component.ts?raw';

import responsiveDialogHtmlExample from '!./examples/wizard-generator-responsive-dialog-example.component.html?raw';
import responsiveDialogTsExample from '!./examples/wizard-generator-responsive-dialog-example.component.ts?raw';

import visibleSummaryHtmlExample from '!./examples/wizard-generator-visible-summary-example.component.html?raw';
import visibleSummaryTsExample from '!./examples/wizard-generator-visible-summary-example.component.ts?raw';

import visibleBranchingSummaryHtmlExample from '!./examples/wizard-generator-visible-summary-branching-example.component.html?raw';
import visibleBranchingSummaryTsExample from '!./examples/wizard-generator-visible-summary-branching-example.component.ts?raw';

import externalNavigationHtmlExample from '!./examples/wizard-generator-external-navigation-example.component.html?raw';
import externalNavigationTsExample from '!./examples/wizard-generator-external-navigation-example.component.ts?raw';

import summaryObjectsHtmlExample from '!./examples/wizard-generator-summary-objects-example.component.html?raw';
import summaryObjectsTsExample from '!./examples/wizard-generator-summary-objects-example.component.ts?raw';

import interactionHtmlExample from '!./examples/wizard-generator-onchange-example.component.html?raw';
import interactionTsExample from '!./examples/wizard-generator-onchange-example.component.ts?raw';

import whenConditionHtmlExample from '!./examples/wizard-generator-visibility-between-steps-example.component.html?raw';
import whenConditionTsExample from '!./examples/wizard-generator-visibility-between-steps-example.component.ts?raw';

import specialElementsHtmlExamples from '!./examples/wizard-generator-special-elements-example.component.html?raw';
import specialElementsTsExamples from '!./examples/wizard-generator-special-elements-example.component.ts?raw';
@Component({
    selector: 'fdp-platform-wizard-generator-docs',
    templateUrl: './platform-wizard-generator-docs.component.html'
})
export class PlatformWizardGeneratorDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: defaultHtmlExample,
            fileName: 'wizard-generator-default-example'
        },
        {
            language: 'typescript',
            code: defaultTsExample,
            fileName: 'wizard-generator-default-example',
            component: 'WizardGeneratorDefaultExampleComponent'
        }
    ];

    dialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: dialogHtmlExample,
            fileName: 'wizard-generator-dialog-example'
        },
        {
            language: 'typescript',
            code: dialogTsExample,
            fileName: 'wizard-generator-dialog-example',
            component: 'WizardGeneratorDialogExampleComponent'
        }
    ];

    customizableExample: ExampleFile[] = [
        {
            language: 'html',
            code: customizableHtmlExample,
            fileName: 'wizard-generator-customizable-example'
        },
        {
            language: 'typescript',
            code: customizableTsExample,
            fileName: 'wizard-generator-customizable-example',
            component: 'WizardGeneratorCustomizableExampleComponent'
        }
    ];

    customizableEmbededExample: ExampleFile[] = [
        {
            language: 'html',
            code: customizableEmbededHtmlExample,
            fileName: 'wizard-generator-customizable-embeded-example'
        },
        {
            language: 'typescript',
            code: customizableEmbededTsExample,
            fileName: 'wizard-generator-customizable-embeded-example',
            component: 'WizardGeneratorCustomizableEmbededExampleComponent'
        }
    ];

    branchingExample: ExampleFile[] = [
        {
            language: 'html',
            code: responsiveHtmlExample,
            fileName: 'wizard-generator-condition-example'
        },
        {
            language: 'typescript',
            code: conditionTsExample,
            fileName: 'wizard-generator-condition-example',
            component: 'WizardGeneratorConditionExampleComponent'
        }
    ];

    responsivePaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: conditionHtmlExample,
            fileName: 'wizard-generator-responsive-paddings-example'
        },
        {
            language: 'typescript',
            code: responsiveTsExample,
            fileName: 'wizard-generator-responsive-paddings-example',
            component: 'WizardGeneratorResponsivePaddingsExampleComponent'
        }
    ];

    visibleSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: visibleSummaryHtmlExample,
            fileName: 'wizard-generator-visible-summary-example'
        },
        {
            language: 'typescript',
            code: visibleSummaryTsExample,
            fileName: 'wizard-generator-visible-summary-example',
            component: 'WizardGeneratorVisibleSummaryExampleComponent'
        }
    ];

    visibleBranchingSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: visibleBranchingSummaryHtmlExample,
            fileName: 'wizard-generator-visible-summary-branching-example'
        },
        {
            language: 'typescript',
            code: visibleBranchingSummaryTsExample,
            fileName: 'wizard-generator-visible-summary-branching-example',
            component: 'WizardGeneratorVisibleSummaryBranchingExampleComponent'
        }
    ];

    responsiveDialogPaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: responsiveDialogHtmlExample,
            fileName: 'wizard-generator-responsive-dialog-example'
        },
        {
            language: 'typescript',
            code: responsiveDialogTsExample,
            fileName: 'wizard-generator-responsive-dialog-example',
            component: 'WizardGeneratorResponsiveDialogExampleComponent'
        }
    ];

    summaryObjectsExample: ExampleFile[] = [
        {
            language: 'html',
            code: summaryObjectsHtmlExample,
            fileName: 'wizard-generator-summary-objects-example'
        },
        {
            language: 'typescript',
            code: summaryObjectsTsExample,
            fileName: 'wizard-generator-summary-objects-example',
            component: 'WizardGeneratorSummaryObjectsExampleComponent'
        }
    ];

    externalNavigationObjectsExample: ExampleFile[] = [
        {
            language: 'html',
            code: externalNavigationHtmlExample,
            fileName: 'wizard-generator-external-navigation-example'
        },
        {
            language: 'typescript',
            code: externalNavigationTsExample,
            fileName: 'wizard-generator-external-navigation-example',
            component: 'WizardGeneratorExternalNavigationExampleComponent'
        }
    ];

    fieldsInteractionExample: ExampleFile[] = [
        {
            language: 'html',
            code: interactionHtmlExample,
            fileName: 'wizard-generator-onchange-example'
        },
        {
            language: 'typescript',
            code: interactionTsExample,
            fileName: 'wizard-generator-onchange-example',
            component: 'WizardGeneratorOnchangeExampleComponent'
        }
    ];

    fieldsVisibilityExample: ExampleFile[] = [
        {
            language: 'html',
            code: whenConditionHtmlExample,
            fileName: 'wizard-generator-onchange-example'
        },
        {
            language: 'typescript',
            code: whenConditionTsExample,
            fileName: 'wizard-generator-visibility-between-steps-example',
            component: 'WizardGeneratorVisibilityBetweenStepsExampleComponent'
        }
    ];
    specialElementsExample: ExampleFile[] = [
        {
            language: 'html',
            code: specialElementsHtmlExamples,
            fileName: 'wizard-generator-special-elements-example'
        },
        {
            language: 'typescript',
            code: specialElementsTsExamples,
            fileName: 'wizard-generator-special-elements-example',
            component: 'WizardGeneratorSpecialElementsExampleComponent'
        }
    ];
    specialElementsExamplesHTML: string;

    constructor() {}
}
