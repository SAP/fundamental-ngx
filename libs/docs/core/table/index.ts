import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./table-docs-header/table-docs-header.component').then((c) => c.TableDocsHeaderComponent),
        providers: [currentComponentProvider('table'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./table-docs.component').then((c) => c.TableDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
        ]
    }
];
