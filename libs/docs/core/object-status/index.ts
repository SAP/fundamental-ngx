import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./object-status-header/object-status-header.component').then((c) => c.ObjectStatusHeaderComponent),
        providers: [currentComponentProvider('object-status'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./object-status-docs.component').then((c) => c.ObjectStatusDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.objectStatus } }
        ]
    }
];
