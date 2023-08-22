import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { WizardLoadingExampleComponent } from './examples/loading/wizard-loading-example.component';
import { RouterLink } from '@angular/router';
import { WizardVisibleSummaryExampleComponent } from './examples/wizard-visible-summary-example.component';
import { WizardNgForExampleComponent } from './examples/wizard-ngfor-example.component';
import { WizardDialogExampleComponent } from './examples/wizard-dialog-example.component';
import { WizardBranchingExampleComponent } from './examples/wizard-branching-example.component';
import { WizardMobileExampleComponent } from './examples/wizard-mobile-example.component';
import { WizardCustomizableExampleComponent } from './examples/wizard-customizable-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { WizardExampleComponent } from './examples/wizard-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

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
const wizardLoadingHtml = 'loading/wizard-loading-example.component.html';
const wizardLoadingTs = 'loading/wizard-loading-example.component.ts';
const wizardVisibleSummaryHtml = 'wizard-visible-summary-example.component.html';
const wizardVisibleSummaryTs = 'wizard-visible-summary-example.component.ts';

@Component({
    selector: 'app-wizard',
    templateUrl: './wizard-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        WizardExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        WizardCustomizableExampleComponent,
        WizardMobileExampleComponent,
        WizardBranchingExampleComponent,
        WizardDialogExampleComponent,
        WizardNgForExampleComponent,
        WizardVisibleSummaryExampleComponent,
        RouterLink,
        WizardLoadingExampleComponent
    ]
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

    wizardLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(wizardLoadingHtml),
            fileName: 'wizard-loading-example',
            scssFileCode: getAssetFromModuleAssets(wizardScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(wizardLoadingTs),
            fileName: 'wizard-loading-example',
            component: 'WizardLoadingExampleComponent'
        }
    ];
}
