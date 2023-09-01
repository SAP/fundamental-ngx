import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./tabs-header/tabs-header.component').then((c) => c.TabsHeaderComponent),
        providers: [currentComponentProvider('tabs'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./tabs-docs.component').then((c) => c.TabsDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.tabs } }
        ]
    }
];
