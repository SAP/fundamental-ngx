import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./data-source-header/data-source-header.component').then((c) => c.DataSourceHeaderComponent),
        providers: [currentComponentProvider('data-source'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./data-source-docs.component').then((c) => c.DataSourceDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dataSource } }
        ]
    }
];
