import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as wizardHtml from '!raw-loader!./examples/wizard-example.component.html';
import * as wizardTs from '!raw-loader!./examples/wizard-example.component.ts';
import * as wizardScss from '!raw-loader!./examples/wizard-example.component.scss';
import * as wizardCustomizableHtml from '!raw-loader!./examples/wizard-customizable-example.component.html';
import * as wizardCustomizableTs from '!raw-loader!./examples/wizard-customizable-example.component.ts';
import * as wizardMobileHtml from '!raw-loader!./examples/wizard-mobile-example.component.html';
import * as wizardMobileTs from '!raw-loader!./examples/wizard-mobile-example.component.ts';
import * as wizardBranchingHtml from '!raw-loader!./examples/wizard-branching-example.component.html';
import * as wizardBranchingTs from '!raw-loader!./examples/wizard-branching-example.component.ts';
import * as wizardDialogHtml from '!raw-loader!./examples/wizard-dialog-example.component.html';
import * as wizardDialogTs from '!raw-loader!./examples/wizard-dialog-example.component.ts';
import * as wizardNgForHtml from '!raw-loader!./examples/wizard-ngfor-example.component.html';
import * as wizardNgForTs from '!raw-loader!./examples/wizard-ngfor-example.component.ts';

import * as wizardVisibleSummaryHtml from '!raw-loader!./examples/wizard-visible-summary-example.component.html';
import * as wizardVisibleSummaryTs from '!raw-loader!./examples/wizard-visible-summary-example.component.ts';

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
