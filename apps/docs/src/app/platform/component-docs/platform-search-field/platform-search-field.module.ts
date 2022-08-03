import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { SEARCH_FIELD_MOBILE_CONFIG } from '../../../documentation/utilities/consts';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformSearchFieldHeaderComponent } from './platform-search-field-header/platform-search-field-header.component';
import { PlatformSearchFieldDocsComponent } from './platform-search-field-docs.component';
import { PlatformSearchFieldBasicExampleComponent } from './platform-search-field-examples/platform-search-field-basic-example.component';
import { PlatformSearchFieldCategoriesExampleComponent } from './platform-search-field-examples/platform-search-field-categories-example.component';
import { PlatformSearchFieldDataSourceExampleComponent } from './platform-search-field-examples/platform-search-field-data-source-example.component';
import { PlatformSearchFieldMobileExampleComponent } from './platform-search-field-examples/platform-search-field-mobile/platform-search-field-mobile-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
        PlatformSearchFieldDataSourceExampleComponent,
        PlatformSearchFieldMobileExampleComponent
    ],
    providers: [
        { provide: MOBILE_MODE_CONFIG, useValue: SEARCH_FIELD_MOBILE_CONFIG, multi: true },
        platformContentDensityModuleDeprecationsProvider('fdp-search-field')
    ]
})
export class PlatformSearchFieldDocsModule {}
