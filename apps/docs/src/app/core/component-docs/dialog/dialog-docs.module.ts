import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { DialogDocsHeaderComponent } from './dialog-docs-header/dialog-docs-header.component';
import { DialogDocsComponent } from './dialog-docs.component';
import { DialogModule, DialogService, ListModule } from '@fundamental-ngx/core';
import { DialogExampleComponent } from './examples/component-based/dialog-example.component';
import { ComponentBasedDialogExampleComponent } from './examples/component-based/component-based-dialog-example.component';
import { TemplateBasedDialogExampleComponent } from './examples/template-based/template-based-dialog-example.component';
import { DialogConfigurationExample } from './examples/dialog-configuration/dialog-configuration-example.component';
import { DialogPositionExampleComponent } from './examples/dialog-position/dialog-position-example.component';
import { DialogMobileExampleComponent } from './examples/dialog-mobile/dialog-mobile-example.component';
import { DialogStackedExampleComponent } from './examples/stacked-dialogs/dialog-stacked-example.component';
import { FirstDialogExampleComponent } from './examples/stacked-dialogs/first-dialog-example.component';
import { SecondDialogExampleComponent } from './examples/stacked-dialogs/second-dialog-example.component';
import { DialogBackdropContainerExampleComponent } from './examples/dialog-backdrop-container/dialog-backdrop-container-example.component';
import { DialogComplexExampleComponent } from './examples/dialog-complex/dialog-complex-example.component';
import { DialogStateExample } from './examples/dialog-state/dialog-state-example.component';

const routes: Routes = [
    {
        path: '',
        component: DialogDocsHeaderComponent,
        children: [
            {path: '', component: DialogDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.dialog}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        DialogModule,
        ListModule
    ],
    exports: [RouterModule],
    declarations: [
        DialogStateExample,
        DialogDocsComponent,
        DialogExampleComponent,
        DialogDocsHeaderComponent,
        DialogConfigurationExample,
        FirstDialogExampleComponent,
        SecondDialogExampleComponent,
        DialogMobileExampleComponent,
        DialogComplexExampleComponent,
        DialogStackedExampleComponent,
        DialogPositionExampleComponent,
        TemplateBasedDialogExampleComponent,
        ComponentBasedDialogExampleComponent,
        DialogBackdropContainerExampleComponent
    ],
    entryComponents: [
        DialogExampleComponent,
        FirstDialogExampleComponent,
        SecondDialogExampleComponent,
        DialogStackedExampleComponent
    ],
    providers: [
        DialogService
    ]
})
export class DialogDocsModule {
}
