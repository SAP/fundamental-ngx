import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/fn/shared';
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
    declarations: [examples, SearchHeaderComponent, SearchDocsComponent],
    providers: [currentComponentProvider('search')]
})
export class SearchDocsModule {}
