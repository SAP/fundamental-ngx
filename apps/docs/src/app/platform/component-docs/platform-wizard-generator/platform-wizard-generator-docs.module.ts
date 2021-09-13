import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformWizardGeneratorModule } from '@fundamental-ngx/platform/wizard-generator';
import { PlatformWizardGeneratorDocsComponent } from './platform-wizard-generator-docs.component';
import { PlatformWizardGeneratorHeaderComponent } from './platform-wizard-generator-header/platform-wizard-generator-header.component';
import { WizardGeneratorDefaultExampleComponent } from './examples/wizard-generator-default-example.component';
import { WizardGeneratorDialogExampleComponent } from './examples/wizard-generator-dialog-example.component';
import { WizardGeneratorConditionExampleComponent } from './examples/wizard-generator-condition-example.component';
import { WizardGeneratorCustomizableExampleComponent } from './examples/wizard-generator-customizable-example.component';
import { WizardGeneratorResponsivePaddingsExampleComponent } from './examples/wizard-generator-responsive-paddings-example.component';
import { WizardGeneratorResponsiveDialogExampleComponent } from './examples/wizard-generator-responsive-dialog-example.component';
import { WizardGeneratorVisibleSummaryExampleComponent } from './examples/wizard-generator-visible-summary-example.component';
import { WizardGeneratorVisibleSummaryBranchingExampleComponent } from './examples/wizard-generator-visible-summary-branching-example.component';
import { WizardGeneratorCustomizableEmbededExampleComponent } from './examples/wizard-generator-customizable-embeded-example.component';
import { WizardGeneratorSummaryObjectsExampleComponent } from './examples/wizard-generator-summary-objects-example.component';
import { WizardGeneratorExternalNavigationExampleComponent } from './examples/wizard-generator-external-navigation-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformWizardGeneratorHeaderComponent,
        children: [
            { path: '', component: PlatformWizardGeneratorDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.wizardGenerator } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformWizardGeneratorDocsComponent,
        PlatformWizardGeneratorHeaderComponent,
        WizardGeneratorDefaultExampleComponent,
        WizardGeneratorDialogExampleComponent,
        WizardGeneratorConditionExampleComponent,
        WizardGeneratorCustomizableExampleComponent,
        WizardGeneratorResponsivePaddingsExampleComponent,
        WizardGeneratorResponsiveDialogExampleComponent,
        WizardGeneratorVisibleSummaryExampleComponent,
        WizardGeneratorVisibleSummaryBranchingExampleComponent,
        WizardGeneratorCustomizableEmbededExampleComponent,
        WizardGeneratorSummaryObjectsExampleComponent,
        WizardGeneratorExternalNavigationExampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformWizardGeneratorModule,
        PlatformButtonModule,
        DialogModule,
        BarModule
    ]
})
export class PlatformWizardGeneratorDocsModule { }
