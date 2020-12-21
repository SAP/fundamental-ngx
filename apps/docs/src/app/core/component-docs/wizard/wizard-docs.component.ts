import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as wizardHtml from '!raw-loader!./examples/wizard-example.component.html';
import * as wizardTs from '!raw-loader!./examples/wizard-example.component.ts';
import * as wizardCustomizableHtml from '!raw-loader!./examples/wizard-customizable-example.component.html';
import * as wizardCustomizableTs from '!raw-loader!./examples/wizard-customizable-example.component.ts';
import * as wizardMobileHtml from '!raw-loader!./examples/wizard-mobile-example.component.html';
import * as wizardMobileTs from '!raw-loader!./examples/wizard-mobile-example.component.ts';
import * as wizardBranchingHtml from '!raw-loader!./examples/wizard-branching-example.component.html';
import * as wizardBranchingTs from '!raw-loader!./examples/wizard-branching-example.component.ts';
import * as wizardNgForHtml from '!raw-loader!./examples/wizard-ngfor-example.component.html';
import * as wizardNgForTs from '!raw-loader!./examples/wizard-ngfor-example.component.ts';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard-docs.component.html'
})
export class WizardDocsComponent {
    wizardExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardHtml,
            fileName: 'wizard-example'
        },
        {
            language: 'typescript',
            code: wizardTs,
            fileName: 'wizard-example',
            component: 'WizardExampleComponent'
        }
    ];

    wizardCustomizableExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardCustomizableHtml,
            fileName: 'wizard-customizable-example'
        },
        {
            language: 'typescript',
            code: wizardCustomizableTs,
            fileName: 'wizard-customizable-example',
            component: 'WizardCustomizableExampleComponent'
        }
    ];

    wizardMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardMobileHtml,
            fileName: 'wizard-mobile-example'
        },
        {
            language: 'typescript',
            code: wizardMobileTs,
            fileName: 'wizard-mobile-example',
            component: 'WizardMobileExampleComponent'
        }
    ];

    wizardBranchingExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardBranchingHtml,
            fileName: 'wizard-branching-example'
        },
        {
            language: 'typescript',
            code: wizardBranchingTs,
            fileName: 'wizard-branching-example',
            component: 'WizardBranchingExampleComponent'
        }
    ];

    wizardNgForExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardNgForHtml,
            fileName: 'wizard-ngfor-example'
        },
        {
            language: 'typescript',
            code: wizardNgForTs,
            fileName: 'wizard-ngfor-example',
            component: 'WizardNgForExampleComponent'
        }
    ];
}
