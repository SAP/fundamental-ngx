import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { ActionSheetCompactExampleComponent } from './examples/action-sheet-compact/action-sheet-compact-example.component';
import { ActionSheetCosyExampleComponent } from './examples/action-sheet-cosy/action-sheet-cosy-example.component';
import { ActionSheetMobileExampleComponent } from './examples/action-sheet-mobile/action-sheet-mobile-example.component';
import {
    ActionSheetModule
} from '@fundamental-ngx/core';

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
        ActionSheetCompactExampleComponent,
        ActionSheetCosyExampleComponent,
        ActionSheetMobileExampleComponent
    ]
})
export class ActionSheetDocsModule {}
