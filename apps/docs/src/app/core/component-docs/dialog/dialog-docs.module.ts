import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogModule, DialogService, FormModule, InputGroupModule, ListModule } from '@fundamental-ngx/core';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { DialogDocsHeaderComponent } from './dialog-docs-header/dialog-docs-header.component';
import { DialogDocsComponent } from './dialog-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import {
    examples,
    DialogExampleComponent,
    DialogStackedExampleComponent,
    FirstDialogExampleComponent,
    SecondDialogExampleComponent
} from './examples';
import { A11yModule } from '@angular/cdk/a11y';

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
        SharedDocumentationPageModule,
        FormModule,
        ListModule,
        DialogModule,
        InputGroupModule,
        A11yModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        DialogDocsComponent,
        DialogDocsHeaderComponent
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
export class DialogDocsModule { }
