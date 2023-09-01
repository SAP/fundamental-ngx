import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./truncate-docs-header/truncate-docs-header.component').then((c) => c.TruncateDocsHeaderComponent),
        providers: [currentComponentProvider('truncate'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./truncate-docs.component').then((c) => c.TruncateDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.truncate } }
        ]
    }
];
