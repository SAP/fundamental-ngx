import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';
import { examples } from './examples';

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
        ActionSheetModule,
        ActionSheetDocsComponent,
        ActionSheetHeaderComponent,
        examples
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('action-sheet')]
})
export class ActionSheetDocsModule {}
