import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { FormModule } from '@fundamental-ngx/core/form';
import { ListModule } from '@fundamental-ngx/core/list';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

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
