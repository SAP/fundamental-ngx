import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformSearchFieldHeaderComponent } from './platform-search-field-header/platform-search-field-header.component';
import { PlatformSearchFieldDocsComponent } from './platform-search-field-docs.component';
import { PlatformSearchFieldBasicExampleComponent } from './platform-search-field-examples/platform-search-field-basic-example.component';
import { PlatformSearchFieldCategoriesExampleComponent } from './platform-search-field-examples/platform-search-field-categories-example.component';
import { PlatformSearchFieldDataSourceExampleComponent } from './platform-search-field-examples/platform-search-field-data-source-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformSearchFieldHeaderComponent,
        children: [
            { path: '', component: PlatformSearchFieldDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.searchField } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, PlatformSearchFieldModule],
    exports: [RouterModule],
    declarations: [
        PlatformSearchFieldDocsComponent,
        PlatformSearchFieldHeaderComponent,
        PlatformSearchFieldBasicExampleComponent,
        PlatformSearchFieldCategoriesExampleComponent,
        PlatformSearchFieldDataSourceExampleComponent
    ]
})
export class PlatformSearchFieldDocsModule {}
