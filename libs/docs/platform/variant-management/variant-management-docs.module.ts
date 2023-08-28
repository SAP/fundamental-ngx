import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { VariantManagementModule } from '@fundamental-ngx/platform/variant-management';
import { examples } from './examples';
import { VariantManagementDynamicPageExampleComponent } from './examples/dynamic-page/variant-management-dynamic-page-example.component';
import { VariantManagementTableExampleComponent } from './examples/table/variant-management-table-example.component';
import { VariantManagementDocsComponent } from './variant-management-docs.component';
import { VariantManagementHeaderComponent } from './variant-management-header/variant-management-header.component';

const routes: Routes = [
    {
        path: '',
        component: VariantManagementHeaderComponent,
        children: [
            { path: '', component: VariantManagementDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.variantManagement } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        VariantManagementModule,
        PlatformSmartFilterBarModule,
        PlatformTableModule,
        PlatformDynamicPageModule,
        BreadcrumbModule,
        ToolbarModule,
        BarModule,
        examples,
        VariantManagementDocsComponent,
        VariantManagementHeaderComponent,
        VariantManagementTableExampleComponent,
        VariantManagementDynamicPageExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('variant-management')]
})
export class VariantManagementDocsModule {}
