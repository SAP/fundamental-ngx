import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SearchDocsComponent } from './search-docs.component';
import { examples } from './examples';
import { FormModule } from '@fundamental-ngx/fn/form';
import { SearchModule } from '@fundamental-ngx/fn/search';
import { ButtonModule } from '@fundamental-ngx/fn/button';

const routes: Routes = [
    {
        path: '',
        component: SearchHeaderComponent,
        children: [
            {
                path: '',
                component: SearchDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.search } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, ButtonModule, SearchModule],
    exports: [RouterModule],
    declarations: [examples, SearchHeaderComponent, SearchDocsComponent]
})
export class SearchDocsModule {}
