import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { WizardDocsComponent } from './wizard-docs.component';
import { WizardExampleComponent } from './examples/wizard-example.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';
import { BarModule, FormGroupModule, FormModule, RadioModule, WizardModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { WizardCustomizableExampleComponent } from './examples/wizard-customizable-example.component';
import { WizardMobileExampleComponent } from './examples/wizard-mobile-example.component';
import { WizardBranchingExampleComponent } from './examples/wizard-branching-example.component';

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
        FormModule
    ],
    exports: [RouterModule],
    declarations: [
        WizardHeaderComponent,
        WizardDocsComponent,
        WizardExampleComponent,
        WizardCustomizableExampleComponent,
        WizardMobileExampleComponent,
        WizardBranchingExampleComponent
    ]
})
export class WizardDocsModule {}
