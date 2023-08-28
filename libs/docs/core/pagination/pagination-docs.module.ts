import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { PaginationDocsComponent } from './pagination-docs.component';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';

import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PaginationExampleComponent } from './examples/pagination-example.component';
import { PaginationMobileExampleComponent } from './examples/pagination-mobile/pagination-mobile-example.component';
import { PaginationPerPageExampleComponent } from './examples/pagination-per-page/pagination-per-page-example.component';
import { PaginationShowingExampleComponent } from './examples/pagination-showing-example.component';

const routes: Routes = [
    {
        path: '',
        component: PaginationHeaderComponent,
        children: [
            { path: '', component: PaginationDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.pagination } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PaginationModule,
        ToolbarModule,
        SelectModule,
        SegmentedButtonModule,
        PaginationDocsComponent,
        PaginationHeaderComponent,
        PaginationExampleComponent,
        PaginationShowingExampleComponent,
        PaginationPerPageExampleComponent,
        PaginationMobileExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('pagination')]
})
export class PaginationDocsModule {}
