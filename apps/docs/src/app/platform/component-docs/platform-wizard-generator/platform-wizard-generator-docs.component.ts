import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as defaultHtmlExample from '!raw-loader!./examples/wizard-generator-default-example.component.html';
import * as defaultTsExample from '!raw-loader!./examples/wizard-generator-default-example.component.ts';

import * as dialogHtmlExample from '!raw-loader!./examples/wizard-generator-dialog-example.component.html';
import * as dialogTsExample from '!raw-loader!./examples/wizard-generator-dialog-example.component.ts';

import * as customizableHtmlExample from '!raw-loader!./examples/wizard-generator-customizable-example.component.html';
import * as customizableTsExample from '!raw-loader!./examples/wizard-generator-customizable-example.component.ts';

import * as customizableEmbededHtmlExample from '!raw-loader!./examples/wizard-generator-customizable-embeded-example.component.html';
import * as customizableEmbededTsExample from '!raw-loader!./examples/wizard-generator-customizable-embeded-example.component.ts';

import * as conditionHtmlExample from '!raw-loader!./examples/wizard-generator-condition-example.component.html';
import * as conditionTsExample from '!raw-loader!./examples/wizard-generator-condition-example.component.ts';

import * as responsiveHtmlExample from '!raw-loader!./examples/wizard-generator-responsive-paddings-example.component.html';
import * as responsiveTsExample from '!raw-loader!./examples/wizard-generator-responsive-paddings-example.component.ts';

import * as responsiveDialogHtmlExample from '!raw-loader!./examples/wizard-generator-responsive-dialog-example.component.html';
import * as responsiveDialogTsExample from '!raw-loader!./examples/wizard-generator-responsive-dialog-example.component.ts';

import * as visibleSummaryHtmlExample from '!raw-loader!./examples/wizard-generator-visible-summary-example.component.html';
import * as visibleSummaryTsExample from '!raw-loader!./examples/wizard-generator-visible-summary-example.component.ts';

import * as visibleBranchingSummaryHtmlExample from '!raw-loader!./examples/wizard-generator-visible-summary-branching-example.component.html';
import * as visibleBranchingSummaryTsExample from '!raw-loader!./examples/wizard-generator-visible-summary-branching-example.component.ts';

import * as externalNavigationHtmlExample from '!raw-loader!./examples/wizard-generator-external-navigation-example.component.html';
import * as externalNavigationTsExample from '!raw-loader!./examples/wizard-generator-external-navigation-example.component.ts';

import * as summaryObjectsHtmlExample from '!raw-loader!./examples/wizard-generator-summary-objects-example.component.html';
import * as summaryObjectsTsExample from '!raw-loader!./examples/wizard-generator-summary-objects-example.component.ts';

import * as interactionHtmlExample from '!raw-loader!./examples/wizard-generator-onchange-example.component.html';
import * as interactionTsExample from '!raw-loader!./examples/wizard-generator-onchange-example.component.ts';
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

    constructor() {}
}
