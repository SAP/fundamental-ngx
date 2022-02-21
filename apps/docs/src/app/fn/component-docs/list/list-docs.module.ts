import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListModule } from '@fundamental-ngx/fn/list';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { CheckboxModule } from '@fundamental-ngx/fn/checkbox';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ListHeaderComponent } from './list-header/list-header.component';
import { ListDocsComponent } from './list-docs.component';
import { examples } from './examples';

const routes: Routes = [
    {
        path: '',
        component: ListHeaderComponent,
        children: [
            { path: '', component: ListDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ListModule, ButtonModule, CheckboxModule],
    exports: [RouterModule],
    declarations: [examples, ListDocsComponent, ListHeaderComponent]
})
export class ListDocsModule {}
