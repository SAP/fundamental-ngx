import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    I18nDocsComponent,
    SEARCH_FIELD_MOBILE_CONFIG,
    SharedDocumentationPageModule,
    currentComponentProvider,
    getI18nKey
} from '@fundamental-ngx/docs/shared';

import { PlatformSearchFieldModule } from '@fundamental-ngx/platform/search-field';
import { PlatformSearchFieldBasicExampleComponent } from './examples/platform-search-field-basic-example.component';
import { PlatformSearchFieldCategoriesExampleComponent } from './examples/platform-search-field-categories-example.component';
import { PlatformSearchFieldDataSourceExampleComponent } from './examples/platform-search-field-data-source-example.component';
import { PlatformSearchFieldMobileExampleComponent } from './examples/platform-search-field-mobile/platform-search-field-mobile-example.component';
import { PlatformSearchFieldDocsComponent } from './platform-search-field-docs.component';
import { PlatformSearchFieldHeaderComponent } from './platform-search-field-header/platform-search-field-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformSearchFieldHeaderComponent,
        children: [
            { path: '', component: PlatformSearchFieldDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.searchField } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformSearchField') }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformSearchFieldModule,
        PlatformSearchFieldDocsComponent,
        PlatformSearchFieldHeaderComponent,
        PlatformSearchFieldBasicExampleComponent,
        PlatformSearchFieldCategoriesExampleComponent,
        PlatformSearchFieldDataSourceExampleComponent,
        PlatformSearchFieldMobileExampleComponent
    ],
    exports: [RouterModule],
    providers: [
        { provide: MOBILE_MODE_CONFIG, useValue: SEARCH_FIELD_MOBILE_CONFIG, multi: true },
        currentComponentProvider('search-field')
    ]
})
export class PlatformSearchFieldDocsModule {}
