import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const wizardScss = 'wizard-example.component.scss';

const wizardHtml = 'wizard-example.component.html';
const wizardTs = 'wizard-example.component.ts';
const wizardCustomizableHtml = 'wizard-customizable-example.component.html';
const wizardCustomizableTs = 'wizard-customizable-example.component.ts';
const wizardMobileHtml = 'wizard-mobile-example.component.html';
const wizardMobileTs = 'wizard-mobile-example.component.ts';
const wizardBranchingHtml = 'wizard-branching-example.component.html';
const wizardBranchingTs = 'wizard-branching-example.component.ts';
const wizardDialogHtml = 'wizard-dialog-example.component.html';
const wizardDialogTs = 'wizard-dialog-example.component.ts';
const wizardNgForHtml = 'wizard-ngfor-example.component.html';
const wizardNgForTs = 'wizard-ngfor-example.component.ts';

const wizardVisibleSummaryHtml = 'wizard-visible-summary-example.component.html';
const wizardVisibleSummaryTs = 'wizard-visible-summary-example.component.ts';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard-docs.component.html'
})
export class WizardDocsComponent {
    wizardExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardHtml),
            fileName: 'wizard-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardTs),
            fileName: 'wizard-example',
            component: 'WizardExampleComponent'
        }
    ];

    wizardCustomizableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardCustomizableHtml),
            fileName: 'wizard-customizable-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardCustomizableTs),
            fileName: 'wizard-customizable-example',
            component: 'WizardCustomizableExampleComponent'
        }
    ];

    wizardMobileExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardMobileHtml),
            fileName: 'wizard-mobile-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardMobileTs),
            fileName: 'wizard-mobile-example',
            component: 'WizardMobileExampleComponent'
        }
    ];

    wizardBranchingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardBranchingHtml),
            fileName: 'wizard-branching-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardBranchingTs),
            fileName: 'wizard-branching-example',
            component: 'WizardBranchingExampleComponent'
        }
    ];

    wizardDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardDialogHtml),
            fileName: 'wizard-dialog-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardDialogTs),
            fileName: 'wizard-dialog-example',
            component: 'WizardDialogExampleComponent'
        }
    ];

    wizardNgForExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardNgForHtml),
            fileName: 'wizard-ngfor-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardNgForTs),
            fileName: 'wizard-ngfor-example',
            component: 'WizardNgForExampleComponent'
        }
    ];

    wizardVisibleSummaryExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardVisibleSummaryHtml),
            fileName: 'wizard-visible-summary-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardVisibleSummaryTs),
            fileName: 'wizard-visible-summary-example',
            component: 'WizardVisibleSummaryExampleComponent'
        }
    ];
}
