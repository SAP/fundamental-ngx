import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    ActionSheetCompactExampleComponent,
    ActionSheetCosyExampleComponent,
    ActionSheetMobileExampleComponent,
    ActionSheetHeaderComponent,
    ActionSheetDocsComponent,
    ApiComponent,
    SharedDocumentationPageModule,
    API_FILES
} from './index';
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
