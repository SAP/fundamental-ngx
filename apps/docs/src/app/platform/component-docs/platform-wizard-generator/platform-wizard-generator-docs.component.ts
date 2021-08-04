import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import * as defaultWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-default-example.component.html';
import * as defaultWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-default-example.component.ts';

import * as dialogWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-dialog-example.component.html';
import * as dialogWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-dialog-example.component.ts';

import * as customizableWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-customizable-example.component.html';
import * as customizableWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-customizable-example.component.ts';

import * as customizableEmbededWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-customizable-embeded-example.component.html';
import * as customizableEmbededWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-customizable-embeded-example.component.ts';

import * as conditionWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-condition-example.component.html';
import * as conditionWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-condition-example.component.ts';

import * as responsiveWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-responsive-paddings-example.component.html';
import * as responsiveWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-responsive-paddings-example.component.ts';

import * as responsiveDialogWizardGeneratorHtmlExample from '!raw-loader!./examples/wizard-generator-responsive-dialog-example.component.html';
import * as responsiveDialogWizardGeneratorTsExample from '!raw-loader!./examples/wizard-generator-responsive-dialog-example.component.ts';

@Component({
    selector: 'fdp-platform-wizard-generator-docs',
    templateUrl: './platform-wizard-generator-docs.component.html'
})
export class PlatformWizardGeneratorDocsComponent {

    defaultExample: ExampleFile[] = [
        {
            language: 'html',
            code: defaultWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-default-example'
        },
        {
            language: 'typescript',
            code: defaultWizardGeneratorTsExample,
            fileName: 'wizard-generator-default-example',
            component: 'WizardGeneratorDefaultExampleComponent'
        }
    ];

    dialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: dialogWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-dialog-example'
        },
        {
            language: 'typescript',
            code: dialogWizardGeneratorTsExample,
            fileName: 'wizard-generator-dialog-example',
            component: 'WizardGeneratorDialogExampleComponent'
        }
    ];

    customizableExample: ExampleFile[] = [
        {
            language: 'html',
            code: customizableWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-customizable-example'
        },
        {
            language: 'typescript',
            code: customizableWizardGeneratorTsExample,
            fileName: 'wizard-generator-customizable-example',
            component: 'WizardGeneratorCustomizableExampleComponent'
        }
    ];

    customizableEmbededExample: ExampleFile[] = [
        {
            language: 'html',
            code: customizableEmbededWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-customizable-embeded-example'
        },
        {
            language: 'typescript',
            code: customizableEmbededWizardGeneratorTsExample,
            fileName: 'wizard-generator-customizable-embeded-example',
            component: 'WizardGeneratorCustomizableEmbededExampleComponent'
        }
    ];

    branchingExample: ExampleFile[] = [
        {
            language: 'html',
            code: responsiveWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-condition-example'
        },
        {
            language: 'typescript',
            code: conditionWizardGeneratorTsExample,
            fileName: 'wizard-generator-condition-example',
            component: 'WizardGeneratorConditionExampleComponent'
        }
    ];

    responsivePaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: conditionWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-responsive-paddings-example'
        },
        {
            language: 'typescript',
            code: responsiveWizardGeneratorTsExample,
            fileName: 'wizard-generator-responsive-paddings-example',
            component: 'WizardGeneratorResponsivePaddingsExampleComponent'
        }
    ];

    responsiveDialogPaddingsExample: ExampleFile[] = [
        {
            language: 'html',
            code: responsiveDialogWizardGeneratorHtmlExample,
            fileName: 'wizard-generator-responsive-dialog-example'
        },
        {
            language: 'typescript',
            code: responsiveDialogWizardGeneratorTsExample,
            fileName: 'wizard-generator-responsive-dialog-example',
            component: 'WizardGeneratorResponsiveDialogExampleComponent'
        }
    ];

    constructor() { }
}
