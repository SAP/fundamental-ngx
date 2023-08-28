import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepeatModule } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { FormGroupModule, FormModule } from '@fundamental-ngx/core/form';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TitleModule } from '@fundamental-ngx/core/title';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    SharedDocumentationModule,
    SharedDocumentationPageModule,
    currentComponentProvider
} from '@fundamental-ngx/docs/shared';
import { WizardLoadingExampleComponent } from './examples/loading/wizard-loading-example.component';
import { WizardBranchingExampleComponent } from './examples/wizard-branching-example.component';
import { WizardCustomizableExampleComponent } from './examples/wizard-customizable-example.component';
import { WizardDialogExampleComponent } from './examples/wizard-dialog-example.component';
import { WizardExampleComponent } from './examples/wizard-example.component';
import { WizardMobileExampleComponent } from './examples/wizard-mobile-example.component';
import { WizardNgForExampleComponent } from './examples/wizard-ngfor-example.component';
import { WizardVisibleSummaryExampleComponent } from './examples/wizard-visible-summary-example.component';
import { WizardDocsComponent } from './wizard-docs.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';

const routes: Routes = [
    {
        path: '',
        component: WizardHeaderComponent,
        children: [
            { path: '', component: WizardDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.wizard } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        WizardModule,
        SharedDocumentationPageModule,
        BarModule,
        RadioModule,
        FormGroupModule,
        FormModule,
        TitleModule,
        LayoutGridModule,
        DialogModule,
        A11yModule,
        SkeletonModule,
        RepeatModule,
        WizardHeaderComponent,
        WizardDocsComponent,
        WizardExampleComponent,
        WizardCustomizableExampleComponent,
        WizardMobileExampleComponent,
        WizardBranchingExampleComponent,
        WizardDialogExampleComponent,
        WizardNgForExampleComponent,
        WizardVisibleSummaryExampleComponent,
        WizardLoadingExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('wizard')]
})
export class WizardDocsModule {}
