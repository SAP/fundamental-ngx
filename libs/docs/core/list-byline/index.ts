import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./list-byline-header/list-byline-header.component').then((c) => c.ListBylineHeaderComponent),
        providers: [currentComponentProvider('list-byline'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./list-byline-docs.component').then((c) => c.ListBylineDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.list } }
        ]
    }
];
