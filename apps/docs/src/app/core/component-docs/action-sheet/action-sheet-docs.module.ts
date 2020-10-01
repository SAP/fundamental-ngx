import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import {
    ActionSheetCompactExampleComponent,
    ActionSheetCozyExampleComponent,
    ActionSheetMobileExampleComponent
} from './examples/action-sheet-examples.component';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { ActionSheetModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ActionSheetModule],
    exports: [RouterModule],
    declarations: [
        ActionSheetDocsComponent,
        ActionSheetHeaderComponent,
        ActionSheetCompactExampleComponent,
        ActionSheetCozyExampleComponent,
        ActionSheetMobileExampleComponent
    ]
})
export class ActionSheetDocsModule {}
