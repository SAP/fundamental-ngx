import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./variant-management-header/variant-management-header.component').then(
                (c) => c.VariantManagementHeaderComponent
            ),
        providers: [currentComponentProvider('variant-management'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./variant-management-docs.component').then((c) => c.VariantManagementDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.variantManagement } }
        ]
    }
];
