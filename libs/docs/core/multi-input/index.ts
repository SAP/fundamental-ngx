import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./multi-input-header/multi-input-header.component').then((c) => c.MultiInputHeaderComponent),
        providers: [currentComponentProvider('multi-input'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./multi-input-docs.component').then((c) => c.MultiInputDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];
