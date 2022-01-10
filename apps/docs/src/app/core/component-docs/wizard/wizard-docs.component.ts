import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import wizardHtml from '!./examples/wizard-example.component.html?raw';
import wizardTs from '!./examples/wizard-example.component.ts?raw';
import wizardScss from '!./examples/wizard-example.component.scss?raw';
import wizardCustomizableHtml from '!./examples/wizard-customizable-example.component.html?raw';
import wizardCustomizableTs from '!./examples/wizard-customizable-example.component.ts?raw';
import wizardMobileHtml from '!./examples/wizard-mobile-example.component.html?raw';
import wizardMobileTs from '!./examples/wizard-mobile-example.component.ts?raw';
import wizardBranchingHtml from '!./examples/wizard-branching-example.component.html?raw';
import wizardBranchingTs from '!./examples/wizard-branching-example.component.ts?raw';
import wizardDialogHtml from '!./examples/wizard-dialog-example.component.html?raw';
import wizardDialogTs from '!./examples/wizard-dialog-example.component.ts?raw';
import wizardNgForHtml from '!./examples/wizard-ngfor-example.component.html?raw';
import wizardNgForTs from '!./examples/wizard-ngfor-example.component.ts?raw';

import wizardVisibleSummaryHtml from '!./examples/wizard-visible-summary-example.component.html?raw';
import wizardVisibleSummaryTs from '!./examples/wizard-visible-summary-example.component.ts?raw';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard-docs.component.html'
})
export class WizardDocsComponent {
    wizardExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardHtml,
            fileName: 'wizard-example',
            scssFileCode: wizardScss
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
            fileName: 'wizard-customizable-example',
            scssFileCode: wizardScss
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
            fileName: 'wizard-mobile-example',
            scssFileCode: wizardScss
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
            fileName: 'wizard-branching-example',
            scssFileCode: wizardScss
        },
        {
            language: 'typescript',
            code: wizardBranchingTs,
            fileName: 'wizard-branching-example',
            component: 'WizardBranchingExampleComponent'
        }
    ];

    wizardDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardDialogHtml,
            fileName: 'wizard-dialog-example',
            scssFileCode: wizardScss
        },
        {
            language: 'typescript',
            code: wizardDialogTs,
            fileName: 'wizard-dialog-example',
            component: 'WizardDialogExampleComponent'
        }
    ];

    wizardNgForExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardNgForHtml,
            fileName: 'wizard-ngfor-example',
            scssFileCode: wizardScss
        },
        {
            language: 'typescript',
            code: wizardNgForTs,
            fileName: 'wizard-ngfor-example',
            component: 'WizardNgForExampleComponent'
        }
    ];

    wizardVisibleSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: wizardVisibleSummaryHtml,
            fileName: 'wizard-visible-summary-example',
            scssFileCode: wizardScss
        },
        {
            language: 'typescript',
            code: wizardVisibleSummaryTs,
            fileName: 'wizard-visible-summary-example',
            component: 'WizardVisibleSummaryExampleComponent'
        }
    ];
}
