import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { FocusableListDocsComponent } from './focusable-list-docs.component';
import { FocusableListHeaderComponent } from './focusable-list-header/focusable-list-header.component';
import { DefaultExampleComponent } from './examples/default-example/default-example.component';
import { FocusableListModule } from '@fundamental-ngx/fn/cdk';

const routes: Routes = [
    {
        path: '',
        component: FocusableListHeaderComponent,
        children: [
            {
                path: '',
                component: FocusableListDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FocusableListModule],
    exports: [RouterModule],
    declarations: [FocusableListHeaderComponent, FocusableListDocsComponent, DefaultExampleComponent]
})
export class FocusableListDocsModule {}
