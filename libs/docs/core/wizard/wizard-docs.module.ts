import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ApiComponent,
    currentComponentProvider,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { WizardDocsComponent } from './wizard-docs.component';
import { WizardExampleComponent } from './examples/wizard-example.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';
import { WizardCustomizableExampleComponent } from './examples/wizard-customizable-example.component';
import { WizardMobileExampleComponent } from './examples/wizard-mobile-example.component';
import { WizardBranchingExampleComponent } from './examples/wizard-branching-example.component';
import { WizardDialogExampleComponent } from './examples/wizard-dialog-example.component';
import { WizardNgForExampleComponent } from './examples/wizard-ngfor-example.component';
import { DeprecatedWizardCompactDirective, WizardModule } from '@fundamental-ngx/core/wizard';
import { BarModule } from '@fundamental-ngx/core/bar';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { FormGroupModule, FormModule } from '@fundamental-ngx/core/form';
import { TitleModule } from '@fundamental-ngx/core/title';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { WizardVisibleSummaryExampleComponent } from './examples/wizard-visible-summary-example.component';
import { A11yModule } from '@angular/cdk/a11y';
import { moduleDeprecationsProvider, RepeatModule } from '@fundamental-ngx/core/utils';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { WizardLoadingExampleComponent } from './examples/loading/wizard-loading-example.component';

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
        RepeatModule
    ],
    exports: [RouterModule],
    declarations: [
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
    providers: [moduleDeprecationsProvider(DeprecatedWizardCompactDirective), currentComponentProvider('wizard')]
})
export class WizardDocsModule {}
