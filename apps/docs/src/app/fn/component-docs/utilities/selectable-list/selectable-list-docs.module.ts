import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { SelectableListDocsComponent } from './selectable-list-docs.component';
import { SelectableListHeaderComponent } from './selectable-list-header/selectable-list-header.component';

const routes: Routes = [
    {
        path: '',
        component: SelectableListHeaderComponent,
        children: [
            {
                path: '',
                component: SelectableListDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule],
    exports: [RouterModule],
    declarations: [SelectableListHeaderComponent, SelectableListDocsComponent]
})
export class SelectableListDocsModule {}
