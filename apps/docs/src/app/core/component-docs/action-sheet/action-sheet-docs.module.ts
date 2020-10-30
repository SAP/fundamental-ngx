import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionSheetModule } from '@fundamental-ngx/core';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';

const routes: Routes = [
    {
        path: '',
        component: ActionSheetHeaderComponent,
        children: [
            { path: '', component: ActionSheetDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionSheet } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        ActionSheetModule
    ],
    exports: [RouterModule],
    declarations: [
        ActionSheetDocsComponent,
        ActionSheetHeaderComponent,
        examples
    ]
})
export class ActionSheetDocsModule {}
