import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { VariantManagementHeaderComponent } from './variant-management-header/variant-management-header.component';
import { VariantManagementDocsComponent } from './variant-management-docs.component';
import { examples } from './examples';
import { VariantManagementModule } from '@fundamental-ngx/platform/variant-management';
import { VariantManagementTableExampleComponent } from './examples/table/variant-management-table-example.component';
import { VariantManagementDynamicPageExampleComponent } from './examples/dynamic-page/variant-management-dynamic-page-example.component';

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
        BarModule
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        VariantManagementDocsComponent,
        VariantManagementHeaderComponent,
        VariantManagementTableExampleComponent,
        VariantManagementDynamicPageExampleComponent
    ],
    providers: [currentComponentProvider('variant-management')]
})
export class VariantManagementDocsModule {}
