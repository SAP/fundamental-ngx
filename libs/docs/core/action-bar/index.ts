import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./action-bar-header/action-bar-header.component').then((c) => c.ActionBarHeaderComponent),
        providers: [currentComponentProvider('action-bar'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./action-bar-docs.component').then((c) => c.ActionBarDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.actionBar } }
        ]
    }
];
