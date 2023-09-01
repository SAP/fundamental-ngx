import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./breadcrumb-header/breadcrumb-header.component').then((c) => c.BreadcrumbHeaderComponent),
        providers: [currentComponentProvider('breadcrumb'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./breadcrumb-docs.component').then((c) => c.BreadcrumbDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.breadcrumb } }
        ]
    }
];
