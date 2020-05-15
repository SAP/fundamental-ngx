import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformSearchFieldHeaderComponent } from './platform-search-field-header/platform-search-field-header.component';
import { PlatformSearchFieldDocsComponent } from './platform-search-field-docs.component';

import { PlatformSearchFieldBasicExampleComponent } from './platform-search-field-examples/platform-search-field-basic-example.component';
import { PlatformSearchFieldCategoriesExampleComponent } from './platform-search-field-examples/platform-search-field-categories-example.component';
import { PlatformSearchFieldDataSourceExampleComponent } from './platform-search-field-examples/platform-search-field-data-source-example.component';

import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FundamentalNgxPlatformModule],
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
