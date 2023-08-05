import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionSheetModule,  } from '@fundamental-ngx/core/action-sheet';
import { ActionSheetHeaderComponent } from './action-sheet-header/action-sheet-header.component';
import { ActionSheetDocsComponent } from './action-sheet-docs.component';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { examples } from './examples';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { moduleDeprecationsProvider } from '@fundamental-ngx/cdk/utils';

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
    declarations: [ActionSheetDocsComponent, ActionSheetHeaderComponent, examples],
    providers: [
        
        currentComponentProvider('action-sheet')
    ]
})
export class ActionSheetDocsModule {}
