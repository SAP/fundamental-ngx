import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./quick-view-docs-header/quick-view-docs-header.component').then(
                (c) => c.QuickViewDocsHeaderComponent
            ),
        providers: [currentComponentProvider('quick-view'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./quick-view-docs.component').then((c) => c.QuickViewDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.quickView } }
        ]
    }
];
